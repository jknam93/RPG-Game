var scale = function(value){
	var ret = value > 200 ? 100 : value <= 0? 0 : Math.sqrt(100^2 - (value - 200)^2);
	return ret;
}

export class Ability{
	constructor(params){
		this.code = "ABILITY";
		this.targets = "self";
		this.icon = require("../icon/svg/crossed-swords.svg");
		this.cost = 1;
		this.category = 0;
		this.description = "A usable abibility";
	}
	targetable(){
		return true;
	}
 }
export class Attack extends Ability {
	constructor(params){
		super(params);
		this.targets = 1;
		this.code = "attack";
		this.icon = require("../icon/svg/crossed-swords.svg");
		this.category = 0;
		this.description = "Deals physical damage";
	}
	targetable(attacker, target, env){
		return attacker.faction !== target.faction && attacker !== target;
	}
	activate(attacker, targets, env){
		var target = targets[0];
		var ap = scale(attacker.ap.getCurr());
		var hit = scale(attacker.hit.getCurr());
		var dodge = scale(target.dodge.getCurr());

		var roll = Math.min(Math.max(Math.random()*100 + hit - dodge + 50, 10),90);
		var damage = ap;
		var response = null;
		var success = roll >= 50;
		if(success){
			response = target.damageHealth(ap,"physical");
		}
		var ret = {
			code: this.code,
			category: this.category,
			attacker: attacker,
			targets: targets,
			damage: damage,
			roll: roll,
			success: success,
			response: response,
			affected: targets,
		}

		return ret;
	}
}
export class Skip extends Ability {
	constructor(params){
		super(params);
		this.targets = 0;
		this.code = "skip";
		this.icon = require("../icon/svg/cancel.svg");
		this.category = 0;
		this.description = "Skip your current turn";
	}
	activate(attacker, targets, env){
		var ret = {
			code: this.code,
			category: this.category,
			attacker: attacker,
		}
		return ret;
	}
}
export class Flee extends Ability {
	constructor(params){
		super(params);
		this.targets = "enemies";
		this.code = "flee";
		this.icon = require("../icon/svg/flying-flag.svg");
		this.category = 0;
		this.description = "Attempt to flee from combat";
	}
	activate(attacker, targets, env){
		var init = scale(attacker.initiative.getCurr());

		var roll = Math.min(Math.max(Math.random()*100 + init + 50, 10),90);
		var success = true;
		for(var target of targets){
			let init = scale(target.initiative.getCurr());
			let opposeRoll = Math.min(Math.max(Math.random()*100 + init + 50, 10),90);
			success = roll >= opposeRoll;
			if  (!success) break;
		}
		if(success){
			attacker.status = "fled";
			env.queue.remove(attacker);
		}
		var ret = {
			code: this.code,
			category: this.category,
			attacker: attacker,
			roll: roll,
			success: success,
			affected: targets,
		}
		return ret;
	}
}
