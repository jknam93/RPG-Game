//Engine
import { Entity } from "./entity"
//Manages entity turns
//More initiative = more turns
//
class Queue {
	constructor(params){
		this.goal = params.goal?params.goal:100;
		this.queue = [];
		this.progress = new Map();
		this.queueSize = params.queueSize?params.queueSize:6;
		this.randomModifier = params.randomModifier?params.randomModifier:4;
		if(params.entities.length > 0){
			for(var entity of params.entities){
				this.progress.set(entity, 0);
			}
			this.update();
		}
	}
	head(remove){
		var ret = this.queue[0];
		if(remove) {this.queue.splice(0, 1);this.update()};
		return ret;
	}
	add(entity){
		this.progress.set(entity,0);
		this.update();
	}
	remove(entity){
		this.progress.delete(entity);
		for(var i = this.queue.indexOf(entity); i !== -1; i = this.queue.indexOf(entity)){
			this.queue.splice(i, 1);
		}
		this.update();
	}
	update(){
		var count = 0;
		while (this.queue.length < this.queueSize){
			if (count > 1000) { alert("ERROR: QUEUE LOOP"); return;};count++;
			for(var [entity, value] of this.progress){
				if(entity.status !== "good") {
					this.remove(entity);
					break;
				}
				var randomModifier = Math.random() * this.randomModifier;
				value += Math.sqrt(entity.initiative.getCurr()) + randomModifier;
				if(value >= this.goal){
					this.queue.push(entity);
					value %= this.goal;
				}
				this.progress.set(entity,value);
			}
		}
	}
}
export class CombatEngine {
	constructor(params){
		this.player = params.player;
		if(params.friendlyEntities.indexOf(this.player === -1)){
		 	params.friendlyEntities = [params.player].concat(params.friendlyEntities);
		 }
		var id = 0;
		var entities = [];
    params.friendlyEntities.map(function(entity){
			entities.push({__proto__:entity,id:id++,faction:1});
		});
    params.enemyEntities.map(function(entity){
			entities.push({__proto__:entity,id:id++,faction:0});
		});
		this.entities = entities;
		this.queue = new Queue({
			entities:this.entities,
		});
	}
	getEntities(faction){
		var retSet = [];
		for(var entity of this.entities){
			if(faction === undefined || entity.faction === faction){
				retSet.push(entity);
			}
		}
		return retSet;
	}
	getPlayer(){
		return this.player;
	}
	entitiesLeft(faction){
		var entities = this.getEntities(faction);
		var count = 0;
		for(var entity of entities){
			if(entity.status == "good") count++;
		}
		return count;
	}
	status(){
		var allyDefeat = this.entitiesLeft(1) === 0;
		var enemyDefeat = this.entitiesLeft(0) === 0;
		return allyDefeat && enemyDefeat?"draw":allyDefeat?"defeat":enemyDefeat?"victory":"continue";
	}
	whoseTurn(){
		return this.queue.head();
	}
	getLoot(){
		var loots = [];
		for(var enemy of this.enemyEntities){
			if(enemy.status != "fled" && enemy.status !="good"){
				var lootTable = enemy.loot;
				for(var [item, chance] of lootTable){
					var roll = Math.random();
					if(roll <= chance){
						loots.push(item);
					}
				}
			}
		}
		return loots;
	}
	beginTurn(){
		this.queue.head(true);
	}
  resolveTurn(action){
		var attacker = action.attacker,targets = action.targets,ability = action.ability;
		console.assert(targets !== undefined, "ERROR: Targets not defined");
		console.assert(attacker !== undefined, "ERROR: Attacker not defined");
		console.assert(ability !== undefined, "ERROR: Ability not defined");
    console.assert(attacker.hp.getCurr() >= 0, "ERROR: Attacker "+attacker.alias+" has no HP", attacker);
    console.assert(attacker.sp.getCurr() >= 0, "ERROR: Attacker "+attacker.alias+" has no SP", attacker);
		//Check if there is any actions that prevents entity from taking an action
		//Check if entity is grabbed by anothe entity
		//	True: Struggle Success: Do action, Fail: Skip
		//	False: Do action
		var response = {
			effect: attacker.tick(this),
			cannotAction: attacker.cannotAction(),
		}
    if(response.cannotAction.length === 0) {
			response.event = attacker.activate(ability, targets, this);
		}
    response.status = this.status();
		console.log("RESPONSE",response)
    return response;
  }
	getLoot(){ return []}
	getEvp(){
		var total = 0;
		for(var enemy of this.getEntities(0)){
			var evp = enemy.evpReward?enemy.evpReward:enemy.str.getCurr() + enemy.agi.getCurr() + enemy.wil.getCurr();
			if(enemy.status === "fled"){
				evp *= 0.5;
			}
			enemy.evpReward = evp;
			total += evp;
		}
		return total;
	}
	getRenown(){return 0;}
	getPrisoners(){
		var prisoners = [];
		for(var enemy of this.getEntities(0)){
			if(enemy.status === "unconscious"){
				prisoners.push(enemy);
			}
		}
		return prisoners;
	}
	getReward(){
		return {
			evp:this.getEvp(),
			prisoner:this.getPrisoners(),
			renown:this.getRenown(),
		}
	}
	cleanUp(){
		for(var entity of this.getEntities()){
			entity.cleanUp(this);
		}
	}
	// resolveTurn(action){
	// 	this.extraTurn = false;
  //   this.action = action?action:this.action;
	// 	var attacker = this.action.attacker;
	// 	var targets = this.action.targets;
	// 	this.instance = [];
  //
	// 	//Status Check
	// 	var canAction = attacker.canAction();
	// 	//Trigger effects currently on attacker
	// 	var effectText = attacker.tick(this);
	// 	this.instance = this.instance.concat(effectText);
	// 	var dead = this.isDead(attacker);
  //
  //
	// 	if(!dead){
	// 		//Struggle against any grabber
	// 		var struggleText = attacker.struggle(this);
	// 		this.instance = this.instance.concat(struggleText);
  //
	// 		//Perform queued ability
	// 		var ability = this.action.ability;
	// 		var resultText = attacker.activate(ability, targets, this);
	// 		//Charge stamina
  //
	// 		//Check if any targets has died
	// 		for(var target of targets){
	// 			this.isDead(target);
	// 		}
	// 		//Check if the attacker has died
	// 		this.isDead(attacker);
	// 	}
  //
	// 	//Check if combat over
  //
	// 	// Cleanup
	// 	var stamCost = (this.action.ability.stamCost != 0)
	// 		* (this.stamPenalty+this.action.ability.stamCost);
	// 	this.whoseTurn().damageStamina(stamCost);
	// 	this.stamPenalty++;
  //
	// 	this.usedAgents.push(attacker);
  //
	// 	this.round.push(this.instance);
	// 	this.actionRecord.push(this.action);
  //
	// 	this.instance.push(resultText);
	// 	var notEnoughStam =  attacker.stamina.getCurr() < this.stamPenalty
	// 	var notEnoughAgents = this.whoseTurn().agents
	// 		&& this.usedAgents.length == this.whoseTurn().agents.length;
	// 	var skipped = !canAction || this.action.ability == null
	// 		|| this.action.ability.code == "Skip" || this.action.ability.code == "Flee"
	// 	var agentCheck =  !this.whoseTurn().agents
	// 		|| notEnoughStam || notEnoughAgents
	// 	if(skipped || !this.whoseTurn().agents || notEnoughStam || notEnoughAgents){
	// 		this.queue.pop();
	// 		this.turn++;
	// 		this.stamPenalty = 0;
	// 		this.usedAgents = [];
	// 		var overload = this.whoseTurn().stamina.getCurr()/2;
	// 		this.whoseTurn().stamina.replenish();
	// 		this.whoseTurn().damageStamina(-overload)
	// 		this.roundRecord.push(this.round);
	// 		this.round = [];
  //
	// 	}
	// }
}
//Action Declaration
//Turn object holding information for what should be done this turn
//Params
//Entity attacker
//String ability
//Array<Entity> targets
class Action {
	constructor(attacker, ability, targets){
		this.attacker = attacker;
		this.ability = ability;
		this.targets = targets;
	}
}
