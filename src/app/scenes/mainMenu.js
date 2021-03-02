import React from 'react';
import { render } from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

//Motion
import { Motion, spring} from 'react-motion'

//scenes
import { Lair } from "./lair"

//Engine
import { World } from "../engine/world"
//Components
import { Pane } from "../components/pane";
import { Back } from "../components/prev";
import { Link } from "../components/link";

export class MainMenu extends React.Component {
  constructor(props){
    super(props);
    this.style = {
      textAlign:"center",
      listStyle:"none",
      marginRight:"auto",
      marginLeft:"auto",
      width:"600px",
    }
  }
  mount(){
    return(
      <MainMenu app={this.props.app}/>
    )
  }
  newGame(){
    var app = this.props.app;
     this.props.app.world = new World({
      player:{
        alias:"Player",
        agi:3,
        str:3,
        wil:3
      },
    })
  }
  continueGame(){
    load(this,0);
  }
  loadGame(){
  }
  options(){
  }
  render() {
    return (
      <Pane style={this.style}>
        <div><h1>The Game</h1></div>
        <ul style={{listStyle:"none",padding:"0px"}}>
          <li><Link onClick={this.newGame.bind(this)} scene={Lair} app={this.props.app}>New Game</Link></li>
          <li><a onClick={this.continueGame.bind(this)}>Continue</a></li>
          <li><a onClick={this.loadGame.bind(this)}>Load</a></li>
          <li><a onClick={this.options.bind(this)}>Options</a></li>
        </ul>
      </Pane>
    );
  }
}
