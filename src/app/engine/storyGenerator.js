var StoryGenerators = new Map();
var GenericAbilityLibrary = new Map();
var GenericEffectLibrary = new Map();
ColorEntity = function(entity, env){
	var elem = $("<span>"+entity.alias+"</span>");
	if(env.isFriendly(entity)){
		elem.css("color",Colour.friendlyActive);
	} else {
		elem.css("color",Colour.enemyActive);
	}
	return elem;
}
ColorEffect = function(effect, env){
	var elem = $("<span>"+effect.code+"</span>");
	elem.css("color",Colour[effect.type]);
	return elem;
}
NoStory = function(){};
GenericAbility = function(event, env){
	var lines = [];
	var entity = event.entity;
	if(event.success){
		for(var target of event.targets){
			var line = $("<div></div>");
			var entity = event.entity ;
			var entityName = ColorEntity(entity, env);
			line.append(entityName);
			line.append(" uses "+event.ability.code+" on " );
			line.append(ColorEntity(target, env));
			lines.push(line);
		}
	} else {
			var line = $("<div></div>");
		var entityName = ColorEntity(entity, env);
		line.append(entityName);
		line.append(" misses "+event.ability.code+"." );
		lines.push(line);
	}
	return lines;
}

GenericEffectGain = function(event, env){
	var lines = [];
	var effect = event.effect;
	var targets = event.targets;
	var entity = event.entity ;
	if(event.success){
		for(var target of targets){
			var entityName = ColorEntity(entity, env);
			var abilityLine = $("<div></div>");
			var entity = event.entity ;
			var targetName = ColorEntity(target, env);
			abilityLine.append(entityName);
			abilityLine.append(" uses "+event.ability.code+" on " );
			abilityLine.append(targetName);
			lines.push(abilityLine);
			var targetName = ColorEntity(target, env);
			var effectLine = $("<div></div>");
			effectLine.append(targetName);
			effectLine.append(" gains ");
			effectLine.append(ColorEffect(effect, env));
			lines.push(effectLine);
		}
	} else {
		var line = $("<div></div>");
		var entityName = ColorEntity(entity, env);
		line.append(entityName);
		line.append(" misses "+event.ability.code+"." );
		lines.push(line);
	}
	return lines;
}
GenericAttack = function(event, env){
	// var ret = {
	// 		type: "ability",
	// 		ability: this,
	// 		entity: attacker,
	// 		target: target,
	// 		roll: roll,
	// 		hitModifier: hitModifier,
	// 		dodgeModifier: dodgeModifier,
	// 		hitChance: hitChance,
	// 		damage: damage,
	// 		success:success,
	// 		response: response,
	// 	}

	var roll = event.roll;
	var hitChance = event.hitChance;
	var ret = "ERROR";
	var entity = event.entity;
	var poessesive = entity.descriptor.possesiveDeterminer;
	var limb = event.weapon;
	var target = event.target;
	var damage = Math.round(event.damage,-1);
	var line = $("<div></div>");
	var entityName = ColorEntity(entity, env);
	var targetName = ColorEntity(target, env);
	if(event.success){
		line.append(entityName);
		line.append(" attacks ");
		line.append(targetName);
		line.append(" with "+poessesive+" "+limb.weapon.name+" for "+damage+"");
		if(event.response.reduction > 0){
			var reduction = event.response.reduction;
			line.append("(-"+reduction+")");
		}

		line.append(" damage.");
	} else {
		line.append(entityName);
		line.append(" misses ");
		line.append(targetName);
		line.append(".");
	}
	return line;
}
GenericFlee = function(event, env){
	var roll = event.roll;
	var enemyRoll = event.enemyRoll;
	var ret = "ERROR";
	var entity = event.entity;
	var line = $("<div></div>");
	var entityName = ColorEntity(entity, env);
	if(roll >= enemyRoll){
		line.append(entityName);
		line.append(" runsaway!");
		ret = entityName+" runsaway!";
	} else {
		line.append(entityName);
		line.append(" fails to flee!");
	}
	return line;
}
GenericSkip = function(event, env){
	var line = $("<div></div>");
	line.append(ColorEntity(event.entity, env));
	line.append(" skips "+event.entity.descriptor.possesiveDeterminer+" turn.");
	return line;
}
GenericGrab = function(event, env){
	var lines = [];
	var roll = event.roll;
	var hitChance = event.hitChance;
	var ret = "ERROR";
	var entity = event.entity;
	var target = event.target;
	var damage = event.damage;
	var line = $("<div></div>");
	var entityName = ColorEntity(entity, env);
	var targetName = ColorEntity(target, env);
	lines.push(line);
	if(roll <= hitChance){
		line.append(entityName);
		line.append(" coils "+entity.descriptor.pronoun+" self around ");
		line.append(targetName);
		line.append(".");
	} else {
		line.append(entityName);
		line.append(" attempts to coil "+entity.descriptor.pronoun+" self around ");
		line.append(targetName);
		line.append(" but fails.");
	}
	lines.push(line);
	return lines;
}
// GenericAbilityLibrary.set("attack", genericAttack);
// GenericAbilityLibrary.set("flee", genericFlee);

GenericEffectTrigger = function(event, env){
	var ret = "";
	return ret;
}
GenericPoison = function(event, env){
	var line = $("<div></div>");
	var entity = event.entity;
	var effect = event.effect;
	var damage = effect.damage;
	line.append(ColorEffect(effect,env));
	line.append(" deals ")
	line.append(damage);
	line.append(" damage to ")
	line.append(ColorEntity(entity,env));
	line.append(".");
	return line;
}
GenericStun = function(event, env){
	var line = $("<div></div>");
	var entity = event.entity;
	var effect = event.effect;
	line.append(ColorEntity(entity,env));
	line.append(" is ");
	var effectName = ColorEffect(effect,env);
	effectName.append("ed");
	line.append(effectName);
	line.append(" and cannot make an action. ")
	return line;
}
GenericGrabbed = function(event, env){
	var lines = [];
	var line = $("<div></div>");
	var canAction = event.action
	var entity = event.entity;
	var grabber = event.grabber;
	var effect = event.effect;
	var success = event.success;
	line.append(ColorEntity(entity,env));
	line.append(" trashes wildy in ");
	var grabberName = ColorEntity(grabber,env);
	line.append(grabberName);
	line.append("'s grasp.")
	lines.push(line);
	if(success){
		var line = $("<div></div>");
		line.append("With a determined yank, ")
		var entityName = ColorEntity(entity,env);
		line.append(entityName);
		line.append(" manages to free "+entity.descriptor.pronoun+"self.");
		lines.push(line);
	} else {
		var line = $("<div></div>");
		var entityName = ColorEntity(entity,env);
		line.append(entityName);
		line.append(" manages to tire "+entity.descriptor.pronoun+" self in the process.");
	}
	lines.push(line);
	return lines;
}
GenericRelease = function(event, env){
	var line = $("<div></div>");
	var entity = event.entity;
	var grabber = event.grabber;
	var grabberName = ColorEntity(grabber,env);
	line.append(grabberName);
	line.append(" releases ");
	var entityName = ColorEntity(entity,env);
	line.append(entityName);
	line.append(" from its grasp.");
	return line;
}
CombatText = class CombatText {
	constructor(entity){
		var abilities = new Map();
		var effects = new Map();
	}
	generate(event, env){
		var ret = "NOT A KNOWN EVENT"
		if(event.type == "ability" ){
			var code = event.ability.code;
			ret = this.abilities.get(code);
			if(!ret){
				ret = GenericAbilityLibrary.get(code);
				if(!ret){
					ret = GenericAbility(event, env);
				}
			}
		} else if (event.type == "effect"){
			var code = event.ability.code;
			ret = this.effect.get(code);
			if(!ret){
				ret = GenericEffectLibrary.get(code);
				if(!ret){
					ret = GenericEffect(event, env);
				}
			}
		}
		return ret;
	}
}
