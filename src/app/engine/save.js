//Engine
import * as Entity from "./entity";
import * as World from "./world";
import * as Ability from "./ability";
import * as Item from "./item";

//Scenes
import { MainMenu } from "../scenes/mainMenu";
import { Lair } from "../scenes/lair";
import { WorldMap } from "../scenes/WorldMap";

var modules = [
  Entity,
  World,
  Ability,
  Item
]
var conList = new Map();
for(var mod of modules){
  for(var key in mod){
    conList.set(key, mod[key]);
  }
}
var sceneList = new Map();
sceneList.set("MainMenu", MainMenu);
sceneList.set("Lair", Lair);
sceneList.set("WorldMap", WorldMap);

var saveIdCurr = 0;

export function save(obj, slot){
  if(!slot) slot = 0;
  var entityMap = new Map();
  var world =  JSON.stringify(encodeSave(obj.world, entityMap));
  console.log(entityMap)
  for(var [id,entity] of entityMap){
    console.log(entity.saveId);
    entity.saveId = undefined;
    delete entity.saveId;
    entity.alias = "steve"
    console.log(entity.saveId);
  }
  console.log(obj.world)
  var date = new Date();
  var meta =  JSON.stringify({date: date.getTime(),name: obj.world.player.alias,});
  var states = JSON.stringify(obj.states.map((state)=>{return state.type.name}));
  localStorage.setItem("save-world-"+slot, world);
  localStorage.setItem("save-meta-"+slot, meta);
  localStorage.setItem("save-state-"+slot, states);
}
export function load(app, slot){
  if(!slot) slot = 0;
  var world = decodeSave(JSON.parse(localStorage.getItem("save-world-"+slot)));
  var meta =  JSON.parse(localStorage.getItem("save-meta-"+slot));
  var stateNames = JSON.parse(localStorage.getItem("save-state-"+slot));
  console.assert(world !== undefined, "ERROR: World not defined");
  console.assert(meta !== undefined, "ERROR: Meta not defined");
  console.assert(stateNames !== undefined, "ERROR: State not defined");

  app.world = world;
  var states = [];
  for(var stateName of stateNames){
    var cons = sceneList.get(stateName);
    var scene = new cons({app:app})
    states.push(scene.mount());
  }
  app.states = states;
  console.log("SAVEOBJ", JSON.parse(localStorage.getItem("save-world-"+slot)))
  console.log("PARTY", world.party)
  app.render();
}
var encodeSave = function(obj, entityMap){
  if(!entityMap){
    entityMap = new Map();
  }
  var saveObj = null;
  if(obj === null || obj === undefined || obj.constructor == Number || obj.constructor == String || obj.constructor == Boolean) {
    saveObj = obj;
  } else if(obj.constructor == Array) {
    saveObj = [];
    for(var value of obj){
      saveObj.push(encodeSave(value));
    }
  } else if(obj.constructor == Function) {
    saveObj = {
      cons:obj.constructor.name,
      code:obj.toString(),
    };

  } else if(obj.constructor == Map) {
    saveObj = {
      cons:obj.constructor.name,
      key:[],
      value:[],
    };
    for(var [key,value] of obj){
      saveObj.key.push(encodeSave(key, entityMap));
      saveObj.value.push(encodeSave(value, entityMap));
    }
    //Object ccase
  }  else {
    if(obj.saveId === undefined) {
      obj.saveId = saveIdCurr++;
    };
    if(saveIdCurr > 100) {return 1}
    var entityId = obj.saveId;
    if(entityMap.get(entityId)){
      saveObj = {
        saveId:entityId,
      };
    } else {
      if(entityId){
        entityMap.set(entityId, obj);
        console.log(entityMap.get(entityId));
      }
      saveObj = {
        cons:obj.constructor.name,
      };
      for(var key in obj){
        saveObj[key]=encodeSave(obj[key], entityMap)
      }
    }
  }
  return saveObj;
}

var decodeSave = function(saveObj, entityMap){

  if(saveObj.alias === "Marie Smith"){
    console.log(saveObj);
  }
  if(!entityMap){
    if(saveObj.alias === "Marie Smith") console.log(1)
    entityMap = new Map();
  }
  var obj = null;
  if(saveObj === null || saveObj === undefined || saveObj.constructor == Number || saveObj.constructor == String || saveObj.constructor == Boolean) {
    if(saveObj.alias === "Marie Smith") console.log(2)
    obj = saveObj;
  } else if(saveObj.constructor == Array) {
    if(saveObj.alias === "Marie Smith") console.log(3)
    obj = [];
    for(var value of saveObj){
      obj.push(decodeSave(value, entityMap));
    }
  } else if(saveObj.cons == "Function"){
    if(saveObj.alias === "Marie Smith") console.log(4)
    eval("obj = "+saveObj.code);
  } else if(saveObj.cons == "Map"){
    if(saveObj.alias === "Marie Smith") console.log(5)
    obj = new Map();
    for(var i = 0; i != saveObj.key.length; i++){
      obj.set(decodeSave(saveObj.key[i], entityMap),decodeSave(saveObj.value[i], entityMap));
    }
  } else {
    if(saveObj.alias === "Marie Smith") console.log(6)
    var id = saveObj.saveId;
    if(id && entityMap.get(id)){
      if(saveObj.alias === "Marie Smith") console.log(61)
      obj = entityMap.get(id);
    } else {
      if(saveObj.alias === "Marie Smith") console.log(62)
      obj = {};
      if(saveObj.constructor != "Object"){
        if(saveObj.alias === "Marie Smith") console.log(621)
        var cons = conList.get(saveObj.cons);
        if(saveObj.alias === "Marie Smith"){
          console.log(saveObj);
          console.log(saveObj.hp.cons, conList.get(saveObj.hp.cons))
        }
        obj.__proto__ = cons.prototype;
      }
      if(id){
        if(saveObj.alias === "Marie Smith") console.log(622)
        entityMap.set(id, obj);
      }
      for(var key in saveObj){
        if(key !== "cons" ){
          obj[key] = decodeSave(saveObj[key], entityMap);
        }
      }
    }
  }
  //console.log(saveObj, obj)
  return obj;
}
var hexEncode = function(str){
    var hex, i;
    var result = "";
    for (i=0; i<str.length; i++) {
        hex = str.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
    }
    return result
}
var hexDecode = function(str){
    var j;
    var hexes = str.match(/.{1,4}/g) || [];
    var back = "";
    for(j = 0; j<hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }
    return back;
}
