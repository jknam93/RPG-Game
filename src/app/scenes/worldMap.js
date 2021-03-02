import React from 'react';
import { render } from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

//scenes
import { Combat } from "./combat"

//Components
import { Back } from "../components/prev";
import { Link } from "../components/link";
import { Pane } from "../components/pane"


export class WorldMap extends React.Component {
  constructor(props){
    super(props);
  }
  mount(){
    return(
      <WorldMap app={this.props.app}/>
    )
  }
  combat(){
    var app = this.props.app;
    app.push(new Combat({app:app}));
  }
  render() {
    return (
      <div>
        <div><h1>World</h1></div>
        <Pane>
          <div>
          <ul>
            <li><Link scene={Combat} app={this.props.app}/></li>
            <li><Back app={this.props.app}/></li>
          </ul>
          <p>
            This section will display a map of the world, highlighting the current location of the lair.
          </p>
          <p>
            Places of interest will be represented by clickable icons. Places of interest can be:
          </p>
          <ul>
            <li>Citices</li>
            <li>Towns</li>
            <li>Entities</li>
            <li>Rival Lairs</li>
            <li>Quest Locations</li>
          </ul>
          <p>
            Clicking on these icons will present events or move the character into a local map area.
          </p>
          </div>
        </Pane>

      </div>
    );
  }
}
