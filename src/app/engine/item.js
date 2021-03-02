export class Inventory {
	constructor(){
		this.items = new Map();
		this.equipment = [];
		this.currency = 0;
	}
	add(item){
		var itemType = item.constructor.name;
		if(itemType == "weapon" || itemType == "armour"){
			this.addEquipment(item);
		} else {
			this.addItem(item);
		}
	}
	addItem(item){
		var preExisting = this.items.get(item.name);
		if(preExisting){
			preExisting.quantity++;
		} else {
			var slot = {
				item: item,
				quantity: 1,
			}
		}
	}
	addItemWrapper(wrapper){
		var preExisting = this.items.get(item.name);
		if(preExisting){
			preExisting.quantity+= wrapper.quantity;
		} else {
			this.items.set(wrapper.name, wrapper);
		}
	}
	addEquipment(equipment){
		this.equipment.push(equipment);
	}
	getItem(name){
		return this.items.get(name);
	}
	getItems(type){
		var ret = new Map();
		if(type){
			for(var [name, item] in this.items){
				ret.set(name, item);
			}
		} else {
			ret = this.items
		}
		return ret;
	}
	geteEquipments(type){
		var ret = new Map();
		if(type){
			for(var [name, equipment] in this.equipment){
				ret.set(name, eqipment);
			}
		} else {
			ret = this.items
		}
		return ret;
	}
	getEquipment(index){
		return this.equipment[index];
	}
	removeItem(name){
		var itemWrapper = this.items.get(name);
		itemWrapper.quantity--;
		if(itemWrapper.quantity <= 0){
			this.items.delete(name);
		}
		return itemWrapper.quantity;
	}
	removeEquipmentByRef(ref){
		var index = this.equipment.indexOf(ref);
		this.equipment.splice(index, 1);
	}
	removeEquipmentByIndex(index){
		this.equipment.splice(index, 1);
	}
	getValue(){
		var value = 0;
		for(var [name, itemWrapper] of this.items){
			value += itemWrapper.item.getValue() * item.quanity;
		}
		for(var equipment of this.equipment){
			value += eqipment.getValue();
		}
	}
	getCurrency(){
		return this.currency;
	}
	setCurrency(value){
		currency += value;
		return this.getCurrency();
	}
}
//Item
//A item class
export class Item {
	constructor(itemName, value, weight, type, id){
  	if(arguments[0] === undefined) return;
		this.id = id;
		this.type = type;
		this.alias = itemName;
		this.value = value;
		this.weight = {
			base: weight,
			bonus: 0,
			modifier: 1,
			getMax: function(){
				return (this.max + this.bonus) * this.modifier;
			},
			getCurr: function(){
				return this.getMax() * this.curr;
			}
		}
	}
	getValue(){
		return this.value;
	}
	destroy(){
		IdGen.reclaimId(this.id);
		delete this.id;
	}
}
export class WolfFang extends Item {
	constructor(){
		super("Wolf fang", 2, 2)
	}
}
//Weapon
export class Weapon extends Item {
	constructor(weaponName, value, minDamage, maxDamage, slot, durability, weight, type){
  	if(arguments[0] === undefined) return;
		super(weaponName, value, weight, type);
		console.assert(!isNaN(value));
		console.assert(!isNaN(minDamage));
		console.assert(!isNaN(maxDamage));
		console.assert(!isNaN(durability));
		console.assert(!isNaN(weight));
		this.minDamage = minDamage;
		this.maxDamage = maxDamage;
		this.bonus = 0;
		this.modifier = 1;

		this.durability = {
			max: durability,
			curr: 1,
			bonus: 0,
			modifier: 1,
			getMax: function(){
				return (this.max + this.bonus) * this.modifier;
			},
			getCurr: function(){
				return this.getMax() * this.curr;
			},
			set: function(value){
				var damage = 1;
				if(value){
					damage = value;
				}
				this.curr -= damage/this.max;
				return this.getCurr();
			}
		}
		//Slot can be:
		//Mainhand - can only fill the mainhand slot
		//Offhand - can only fill the offhand slot
		//1 hand - can fill both slots
		//2 hand - fills both slots
		this.slot = slot;
	}
	getDurability(){
		return this.durability.getCurr();
	}
	setDurability(value){
		return this.durability.set(value);
	}
	getMax(){
		return (this.maxDamage + this.bonus) * this.modifier;
	}
	getMin(){
		return (this.minDamage + this.bonus) * this.modifier;
	}
	getDamage(){
		console.assert(!isNaN(this.getMax()));
		console.assert(!isNaN(this.getMin()));
		var range = this.getMax() - this.getMin();
		var roll = Math.random() * range + this.getMin();
		console.assert(!isNaN(roll));
		return roll;
	}
	equip(humanoid, slot){
		console.log(slot)
		slot.weapon = this;
	}
	unequip(humanoid){
	}
}
export class Shield extends Weapon {
	constructor(weaponName, value, minDamage, maxDamage, slot, durability, weight, armour){
  	if(arguments[0] === undefined) return;
		super(weaponName, value, minDamage, maxDamage, slot, durability, weight);

		this.armour = {
			base: armour,
			bonus: 0,
			modifier: 1,
			getMax: function(){
				return (this.max + this.bonus) * this.modifier;
			},
			getCurr: function(){
				return this.getMax() * this.curr;
			}
		}
	}
}
//Armour
export class Armour extends Item {
	constructor(armourName, value, armour, slot, durability, weight, type){
  	if(arguments[0] === undefined) return;
		super(armourName, value, weight,type);
		this.durability = {
			max: durability,
			curr: 1,
			bonus: 0,
			modifier: 1,
			getMax: function(){
				return (this.max + this.bonus) * this.modifier;
			},
			getCurr: function(){
				return this.getMax() * this.curr;
			},
			set: function(value){
				var damage = 1;
				if(value){
					damage = value;
				}
				this.curr -= damage/this.max;
				return this.getCurr();
			}
		}
		this.armour = {
			base: armour,
			bonus: 0,
			modifier: 1,
			getCurr: function(){
				return (this.base + this.bonus) * this.modifier;
			}
		}
		//Slot can be:
		//Mainhand - can only fill the mainhand slot
		//Offhand - can only fill the offhand slot
		//1 hand - can fill both slots
		//2 hand - fills both slots
		this.slot = slot;
	}
	equip(humanoid){
		humanoid.armour[this.slot] = this;
	}
	unequip(humanoid){
		humanoid.armour[this.slot] = null;
	}
}
export class BodyPart {
	constructor(name, scale){
  	if(arguments[0] === undefined) return;
		this.alias = name;
		this.scale = scale;
	}
	getDamage(){
		return this.scale;
	}
}
export class Fist extends BodyPart {
	constructor(){
		super("Fist", 0.2);
	}
}
export class Claw extends BodyPart {
	constructor(){
		super("Claw", 1.5);
	}
}
export class Tentacle extends BodyPart {
	constructor(){
		super("Tentacle", 1);
	}
}

// Sword = new Weapon("Sword", 1, 0.5, 1, "onehand", 10, 1,"sword");
// OtherSword = new Weapon("Sword", 1, 0.5, 1, "onehand", 10, 1,"sword");
//
// GreatSword = new Weapon("Greatsword", 2, 3, 3, "twohands", 10, 1,"sword");
// OakShield = new Shield("Oaken Shield", 1, 0, 1, "offhand", 10, 1, 1);
//
// Helmet = new Armour("Helmet", 1, 1, "head", 10, 1,"leather");
// Cuirass = new Armour("Cuirass", 1, 1, "body", 10, 1,"leather");
// Greaves = new Armour("Greaves", 1, 1, "legs", 10, 1,"leather");
// Boots = new Armour("Boots", 1, 1, "feet", 10, 1,"leather");
// Gauntlet = new Armour("Gauntlet", 1, 1, "hands", 10, 1,"leather");
// LeatherBelt = new Armour("Leather Belt", 1, 1, "waist", 10, 1,"leather");
