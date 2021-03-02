import {generateHuman, Entity, Humanoid } from "./entity"

export class World {
  constructor(params){
    this.player = new Entity(params.player);
    this.factions = new Map();
    this.entities = new Map();
    this.party = [];

    this.addParty(generateHuman({
      str:3,
      agi:3,
      wil:3,
      sex:"male",
    }), true);
    this.addParty(generateHuman({
      str:3,
      agi:3,
      wil:3,
      sex:"male",
    }));
    this.addParty(generateHuman({
      str:3,
      agi:3,
      wil:3,
      sex:"male",
    }));
  }
  getDate(){
    return "16th November 2016";
  }
  addParty(entity, favourite, tag){
    this.party.push({
      __proto__:entity,
      favourite: favourite?true:false,
      tag:tag?tag:"",
      joined:this.getDate(),
    })
  }
  //@sort what to sort by
  // -Joined
  // -Value
  // -Loyalty
  // -Status
  // -Health
  getParty(sort, favourites, filter){
    var ret = [];
    for(var entity of this.party){
      if((favourites === undefined || entity.favourite === favourites) &&(!filter || filter(entity))){
        ret.push(entity);
      }
    }
    if(sort) ret.sort(sort);
    return ret;
  }
}
