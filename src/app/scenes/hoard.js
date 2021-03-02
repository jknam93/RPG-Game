import React from 'react';
import { render } from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

//Bootstrap Components
import { Glyphicon } from "react-bootstrap"
import { Panel } from "react-bootstrap"

//Components
import { HealthBar } from '../Components/healthbar';
import { HealthText } from '../Components/healthText';
import { Avatar } from '../Components/avatar';
import { Status } from '../Components/status';
import { Stat } from '../Components/stat';


import { humanFemale } from '../images/imagePack'
export class Hoard extends React.Component {
  constructor(props){
    super(props);
  }
  back(){
    var app = this.props.app;
    app.pop();
  }
  mount(){
    return(
      <Hoard app={this.props.app}/>
    )
  }
  render() {
    return (
      <div>
        <div><h1>Demo Page</h1></div>
        <div style={{display:"flex",flexDirection:"column"}}>
          <div style={{textAlign:"center"}}><h1>Vesper the Magnificent</h1></div>
          <div style={{display:"flex"}}><sup style={{flexGrow:1, textAlign:"right"}}>Strength 10</sup><sup style={{flexGrow:1,textAlign:"center"}}>Agility 10</sup><sup style={{flexGrow:1,textAlign:"left"}}>Willpower 10</sup></div>
          <div style={{display:"flex"}}><span style={{flexGrow:1}}>Health 10/ 10</span><span style={{flexGrow:1,textAlign:"center"}}>Stamina 10/10</span><span style={{flexGrow:1,textAlign:"right"}}>Mana 10/10</span></div>
          <div style={{display:"flex", border:"1px solid black"}}><span style={{flexGrow:1}}>Evolution points 10</span><span style={{flexGrow:1,textAlign:"center"}}>Renown 10</span><span style={{flexGrow:1,textAlign:"right"}}>Prestige 10</span></div>
          <div style={{display:"flex"}}><a style={{flexGrow:1}}>Party</a><a style={{flexGrow:1, textAlign:"center"}}>Inventory</a><a style={{flexGrow:1,textAlign:"center"}}>Character</a><a style={{flexGrow:1, textAlign:"right"}}>Keep</a></div>
          <div style={{display:"flex"}}><a style={{flexGrow:1,textAlign:"center"}}>Exit</a><a style={{flexGrow:1,textAlign:"center"}}>Rest</a></div>
        </div>
        <ul>
          <li><a onClick={this.back.bind(this)}>Back</a></li>
        </ul>
      </div>
    );
  }
}
