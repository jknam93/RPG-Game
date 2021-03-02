//generators
import { getName } from "../generators/entityName"
//abilities
import { humanFemale } from "../images/imagePack"
import { humanMale } from "../images/imagePack"
import { Attack } from "./ability"
import { Flee } from "./ability"
import { Skip } from "./ability"
export class Entity {
	constructor(params){
		this.alias = params.alias?params.alias:"Enemy";
		this.status = params.status?params.status:"good";
		this.type =  params.type?params.type:"entity"

		this.abilities = new Map();
		var attack = new Attack();
		var flee = new Flee();
		var skip = new Skip();
		this.abilities.set(attack.code, attack);
		this.abilities.set(flee.code, flee);
		this.abilities.set(skip.code, skip);

		//Effects are temporary changes to the character and only persist through
		//combat
		this.effects = new Map(); //only affects combat
		this.worldEffects = new Map();//World effects persist through overworld
		this.traits = new Map();		//Traits are bonuses that are innate/genetic to the entity
		this.skills = new Map();//SKills can be learned or gotten

		this.id = params.id;

		//Base
		this.str = new StatusPoints({base: params.str});
		this.agi = new StatusPoints({base: params.agi});
		this.wil = new StatusPoints({base: params.wil});

		//hitpoints
		this.hp = new StatusPool({owner:this,modifier:1,strScale:5,});
		this.sp = new StatusPool({owner:this,modifier:1,agiScale:5,});
		this.mp = new StatusPool({owner:this,modifier:1,wilScale:5,});

		//Offence
		this.ap = new DerivedStatusPoints({owner: this,modifier:1,strScale:1,});
		this.hit = new DerivedStatusPoints({owner:this,agiScale:1,})
		this.initiative =  new DerivedStatusPoints({owner:this,agiScale: 1,});

		//Defence
		this.dodge = new DerivedStatusPoints({owner: this, modifier:1, agiScale:1});
		this.gradResist = new DerivedStatusPoints({owner: this, modifier:1, strScale:1});

		this.grabber = new Map();

		this.avatar = params.avatar?params.avatar:require("../icon/player.png");

		this.inventory = new Map();
		// this.armour = {
		// 	bonus: 0,
		// 	modifier: 1,
		// 	getCurr: function(){
		// 		return this.bonus * this.modifier;
		// 	}
		// }
		// var claw = new BodyWeaponClaw(this);
		// this.weapons = {
		// 	bodyweapon: new WeaponSlot(1,1),
		// }
		// this.weapons.bodyweapon.weapon = claw;
		this.loot = new Map();
		// this.inventory = new Inventory();
		this.prestige = new StatusPoints({base: 10});
		this.evp = new StatusPoints({base: 10});
		this.rep = new StatusPoints({base: 10});
		this.reputation = 0;
		// this.genital = params.sex=="male"?new Penis({owner:this}):params.sex=="female"?new Vagina({owner:this}):null;

		this.capturable = params.capturable?params.capturable:false;
	}
	heal(){
		var healAmount = this.health.getMax()/2;
		this.health.setCurr(healAmount);
		return healAmount;
	}
	getName(){
		var ret = this.alias;
		if(this.otherName) ret = this.otherName;
			return ret;
		}
	getRenown(){
		var rank = "nobody";
		if(this.renown >= 1700){
			rank = "saint";
		} else if(this.renown >= 1200){
			rank = "paragon"
		} else if(this.renown >= 700){
			rank = "hero"
		} else if(this.renown >= 300){
			rank = "champion"
		} else if(this.renown >= 100){
			rank = "adventurer"
		} else if(this.renown <= -100){
			rank = "scoundrel"
		} else if(this.renown <= -300){
			rank = "blackguard"
		} else if(this.renown <= -700){
			rank = "villain"
		} else if(this.renown <= -1200){
			rank="monster"
		} else if(this.renown <= -1700){
			rank="evil incarnate"
		}
		return rank;
	}
	getRenownValue(){
		return this.renown;
	}
	//Activates an ability belonging to this entity by name
	activate(action, targets, env){
		var ret = action.activate(this, targets, env);
		return ret;
	}
	damageHealth(damage, type){
		var reduction = 0;
		if(type=="physical"){
			//reduction = Math.round(damage * scale(this.armour.getCurr())/100,-1);
			//damage -= reduction;
		}
		this.hp.setCurr(damage);
		if(this.hp.getCurr() <= 0){
			this.status=this.capturable?"unconscious":"dead";
		}
		var event = {
			reduction: reduction,
			status: this.status,
		}
		return event;
	}
	damageStamina(damage, type){
		this.stamina.setCurr(damage);
		if(this.stamina.curr <= 0){
		//this.status="unconscious";
		}
		return this.stamina.curr;
	}
	damageMorale(damage, type){
		this.morale.setCurr(damage);
		if(this.health.getCurr() + Constant.epsilon <= 0 ||
		 this.health.getCurr() - Constant.epsilon <= 0
		){
		this.status="fled";
		}
		return this.morale.curr;
	}
	//Activates effects beloning to this entity
	tick(env){
		var ret = []
		for(var [code,effect] of this.effects){
			var text = effect.activate(this, env)
			ret.push(text);
		}
		return ret;
	}
	equip(){
	}
	struggle(env){
		var ret = [];
		for(var [grabber,grab] of this.grabber){
			ret = ret.concat(grab.activate(this, env));
		}
		return ret;
	}
	cannotAction(){
		var reasons = [];
		if(this.hp.getCurr() <=0){
			return ["hp"];
		} else if (this.sp.getCurr() <=0 /*|| this.mp.getCurr*/){
			return ["sp"];
		}
		for(var [code,effect] of this.effects){
			if(!effect.canAction(this)){
				ret = false;
				reasons.push(effect);
			}
		}
		return reasons;
	}
	cleanUp(env){
		this.stamina.replenish();
		for(var effect of this.effects){
			effect.remove(this, env);
		}
		for(var [key,	grab] of this.grabber){
			grab.remove(grab.target, env);
		}
	}
	isGrabbed(){
		var ret = false;
		if(this.grabber.length > 0){
			ret = true;
		}
		return ret;
	}
	isArmed(){
		return false;
	}
	isArmored(){
		return (this.armour.getCurr != 0)
	}
}

var scale = function(value){
	var ret = value > 200 ? 100 : value <= 0? 0 : Math.sqrt(100^2 - (value - 200)^2);
	return ret;
}
class WeaponSlot {
	constructor(hitScale, dmgScale){
  	if(arguments[0] === undefined) return;
		this.hitScale = hitScale;
		this.dmgScale = dmgScale;
		this.weapon = null;

	}
	isArmed(){
		return (this.weapon != null)
	}
	getDamage(){
		var ret = this.dmgScale * this.weapon.getDamage();
		return ret;
	}
	getHitRating(){
		return this.hitScale;
	}
}
//Status points are base level stats that are used to calculate the value of
//other stats
export class StatusPoints {
	constructor(params){
		this.base = params.base;
		this.modifier = params.modifier?params.modifier:1;
		this.bonus = params.bonus?params.bonus:0;
	}
	getCurr(){
		var value = (this.base + this.bonus)*this.modifier;
		return Math.max(0, value);
	}
	setBase(value){
		this.base += value;
		return this.base;
	}
	setBonus(value){
		this.bonus += value;
		return this.bonus;
	}
	setModifier(value){
		this.modifier += value;
		return this.modifier;
	}
	getBase(){
		return this.bonus;
	}
	getBonus(){
		return this.bonus;
	}
	getModifier(){
		return this.modifier;
	}
	getBaseCost(){
		return this.base * 4;
	}
	getModifierCost(){
		return (this.base * 100)^2;
	}
}
//Derived stats are sem inmutable and derive their stats from a statusPoints
//object
export class DerivedStatusPoints {
	constructor(params){
		this.owner = params.owner; //CHANGE
		//type, name, value
		this.baseSource = [];
		this.modifierSource = [];
		this.agiScaleSource = [];
		this.strScaleSource = [];
		this.wilScaleSource = [];

		this.bonus = params.bonus?params.bonus:0;
		this.base = params.base?params.base:0;
		this.modifier = params.modifier?params.modifier:1;
		this.strScale = params.strScale?params.strScale:0;
		this.agiScale = params.agiScale?params.agiScale:0;
		this.wilScale = params.wilScale?params.wilScale:0;
	}
	getCurr(){
		var entity = this.owner;
		var agiBonus = entity.agi.getCurr() * this.agiScale;
		var strBonus = entity.str.getCurr() * this.strScale;
		var wilBonus = entity.wil.getCurr() * this.wilScale;
		var value = (agiBonus + strBonus + wilBonus + this.base +this.bonus ) * this.modifier;
		return Math.max(0, value);
		return 10;
	}
	setModifier(value){
		this.modifier += value;
		return this.modifier;
	}
	addModifier(value, source){
		this.modifier += value;
		return this.modifier;
	}
	setBase(value){
		this.base += value
		return this.base;
	}
	setBonus(value){
		this.bonus += value;
		return this.bonus;
	}
	setStrScale(value){
		this.strScale += value;
		return this.strScale;
	}
	setAgiScale(value){
		this.agiScale += value;
		return this.agiScale;
	}
	setWilScale(value){
		this.wilScale += value;
		return this.wilScale;
	}
	getModifier(value){
		return this.modifier;
	}
	getBase(){
		return this.base;
	}
	getBonus(value){
		return this.bonus;
	}
	getStrScale(value){
		return this.strScale;
	}
	getAgiScale(value){
		return this.agiScale;
	}
	getWilScale(value){
		return this.wilScale;
	}
	getBaseCost(){
		return this.base * 2 + 1;
	}
	getModifierCost(){
		return (this.base * 100)^2;
	}
}
//Status pools represent stats that are often changed
export class StatusPool extends DerivedStatusPoints {
	constructor(params){
		super(params);
	  this.curr = 100;
	}
	getCurr(){
		var value = (this.getMax() * this.curr)/100;
		return Math.max(0, value);
	}
	getMax(){
		var entity = this.owner;
		var agiBonus = entity.agi.getCurr() * this.agiScale;
		var strBonus = entity.str.getCurr() * this.strScale;
		var wilBonus = entity.wil.getCurr() * this.wilScale;
		var value = (agiBonus + strBonus + wilBonus + this.base +this.bonus ) * this.modifier;
		return Math.max(1, value);
	}
	setCurr(value){
		var change = value/this.getMax();
		this.curr -= change*100;
		return this.curr;
	}
	replenish(){
		this.curr = 1;
		return this.getCurr();
	}
}
export class Humanoid extends Entity {
	constructor(params){
		super(params);
		this.capturable = true;
		if(params.sex === "female"){
			this.avatar = humanFemale[Math.round(Math.random()*24)+1];
		} else if(params.sex === "male"){
			this.avatar = humanMale[Math.round(Math.random()*24)+1];
		}
	}
}
export function generateHuman(params, nationality){
	if(nationality === undefined) {
		let nationalities = [ "Cedrige"];
		nationality = nationalities[Math.round(Math.random() * (nationalities.length-1))	]
	}
	if(params.sex === "female"){
		params.avatar = humanFemale[Math.round(Math.random()*24)+1];
		params.capturable = true;
	} else if(params.sex === "male"){
		params.avatar = humanMale[Math.round(Math.random()*24)+1];
		params.capturable = true;
	}
	if(params.alias === undefined) params.alias = getName("female", "human", nationality);

	var entity = new Entity(params);
	entity.capturable = true;
	if(nationality){
		entity.nationality = nationality;
	} else {

	}

	return entity;
}
