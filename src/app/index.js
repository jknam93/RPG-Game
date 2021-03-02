import React from 'react';
import { render } from 'react-dom';
import { unmountComponentAtNode } from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

//Engine
import { World } from "./engine/world";
import { Entity, Humanoid } from "./engine/world";

//Scenes
import { MainMenu } from "./scenes/mainMenu";

//Components
import { TopBar } from "./components/topBar";

import { Combat } from "./scenes/combat"///////


class App  {
  constructor(props){
    this.world = null;
    this.combat = null;
    this.states = [(new MainMenu({app: this, key:1})).mount()];


    //  this.world = new World({
    //   player:{
    //     name:"Player",
    //     agi:3,
    //     str:3,
    //     wil:3
    //   },
    // })
    // this.states = [new Combat({app: this, key:1}).mount()];

  }
  
  top(){
    return this.states[this.states.length-1];
  }
  pop(load, render){
    this.states.pop();
    if(render===undefined||render) this.render();
    return this.top();
  }
  push(state, render){
    this.states.push(state)
    if(render===undefined||render) this.render();
    return this.top();
  }
  changeState(state, render){
    var numStates = this.states.length;
    this.states[numStates-1] = state;
    if(render===undefined||render) this.render();
    return this.top();
  }
  render() {
    render(<TopBar app={this}/>, window.document.getElementById('top'));
    return render(this.top(), window.document.getElementById('app'));
  }
}
var app = new App();
app.render();
