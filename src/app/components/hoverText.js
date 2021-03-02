import React from 'react';
import { render } from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

//scenes
import { Lair } from "./lair"

//Engine
import { World } from "../engine/world"

//Components
import { Back } from "../components/prev";
import { Link } from "../components/link";

export class MainMenu extends React.Component {
  render() {
    return (
      <div style = {this.style}>
        <div><h1>The Game</h1></div>
        <ul style={{listStyle:"none"}}>
          <li><Link onClick={this.newGame.bind(this)} scene={Lair} app={this.props.app}>New Game</Link></li>
          <li><a onClick={this.continueGame.bind(this)}>Continue</a></li>
          <li><a onClick={this.loadGame.bind(this)}>Load</a></li>
          <li><a onClick={this.options.bind(this)}>Options</a></li>
        </ul>
      </div>
    );
  }
}5
