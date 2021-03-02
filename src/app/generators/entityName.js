export function getName(gender, race, nationality){
  var givenNames = race==="human"?names[race][nationality][gender].names:names[race][gender].names;
  var lastNames = race==="human"?names[race][nationality][gender].surnames:names[race][gender].surnames;
  var givenNameIndex = Math.round(Math.random()*(givenNames.length-1));
  var givenName = givenNames[givenNameIndex];
  var lastNameIndex = Math.round(Math.random()*(lastNames.length-1));
  var lastName = lastNames[lastNameIndex];
var name = givenName + (lastName?" " + lastName:"");
  return name;
}

export var names = {
  human: {
    Cedrige:{
      male:{
        names: ["John","Bob","Tony","Paul","Peyrt"],
        surnames:["Black","Brown","White","Grey"]
      },
      female:{
        names: ["John","Bob","Tony","Paul","Peyrt"],
        surnames:["Black","Brown","White","Grey"]
      },
      other:{
        names: {},
        surnames:{}
      },
    },
    Aethumbria:{
      male:{
        names: ["John","Bob","Tony","Paul","Peyrt"],
        surnames:["Black","Brown","White","Grey"]
      },
      female:{
        names: ["John","Bob","Tony","Paul","Peyrt"],
        surnames:["Black","Brown","White","Grey"]
      },
      other:{
        names: {},
        surnames:{}
      },
    },
    Fleurraine:{
      male:{
        names: ["John","Bob","Tony","Paul","Peyrt"],
        surnames:["Black","Brown","White","Grey"]      
      },
      female:{
        names: ["John","Bob","Tony","Paul","Peyrt"],
        surnames:["Black","Brown","White","Grey"]   
      },
      other:{
        names: {},
        surnames:{}
      },
    },
    Waldberge:{
      male:{
        names: ["John","Bob","Tony","Paul","Peyrt"],
        surnames:["Black","Brown","White","Grey"]   
      },
      female:{
        names: ["John","Bob","Tony","Paul","Peyrt"],
        surnames:["Black","Brown","White","Grey"]   
      },
      other:{
        names: {},
        surnames:{}
      },
    },
    Snjorleid:{
      male:{
        names: ["John","Bob","Tony","Paul","Peyrt"],
        surnames:["Black","Brown","White","Grey"]   
      },
      female:{
        names: ["John","Bob","Tony","Paul","Peyrt"],
        surnames:["Black","Brown","White","Grey"]   
      },
      other:{
        names: {},
        surnames:{}
      },
    },
    other:{
      male:{
        names: {},
        surnames:{}
      },
      female:{
        names: {},
        surnames:{}
      },
      other:{
        names: {},
        surnames:{}
      },
    }
  },
  elf:{
    male:{
        names: ["John","Bob","Tony","Paul","Peyrt"],
        surnames:["Black","Brown","White","Grey"]   
    },
    female:{
        names: ["John","Bob","Tony","Paul","Peyrt"],
        surnames:["Black","Brown","White","Grey"]   
    },
    other:{
      names: {},
      surnames:{}
    },
  },
  dwarf:{
    male:{
      names: {},
      surnames:{}
    },
    female:{
      names: {},
      surnames:{}
    },
    other:{
      names: {},
      surnames:{}
    },
  },
}
