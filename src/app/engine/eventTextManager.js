import React from 'react';
import { render } from 'react-dom';

export function generateText(response){
  var ret;
  if (response.event.code === "attack"){
    ret = <div><b>{response.event.attacker.alias}</b> attacks <b>{response.event.targets[0].alias}</b> for <b>{Math.round(response.event.damage)}</b></div>
  } else if (response.event.code === "flee"){
    if(response.event.success){
      ret = <div><b>{response.event.attacker.alias}</b> flees from combat</div>
    } else {
      ret = <div><b>{response.event.attacker.alias}</b> attemps to flee from combat but is stopped</div>
    }
  } else if (response.event.code === "skip"){
      ret = <div><b>{response.event.attacker.alias}</b> skips its turn</div>
  } else {
    ret = <div><b>{response.event.attacker.alias}</b> uses <b>{response.event.code}</b> on <b>{response.event.targets[0].alias}</b></div>
  }
  return ret;
}

function attackText(event){

}
