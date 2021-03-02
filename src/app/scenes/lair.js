import React from 'react';
import { render } from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

//Bootsrap Components
import { Col } from "react-bootstrap";
import { Tabs } from "react-bootstrap";
import { Tab } from "react-bootstrap";

//scenes
import { WorldMap } from "./worldMap";
import { Hoard } from "./hoard";
import { Hibernate } from "./hibernate";
import { Evolve } from "./evolve";

//Components
import { EntityCard } from "../components/entityCard";
import { EntityLair } from "../components/entityLair";
import { Pane } from "../components/pane"
import { Link } from "../components/link";
import { Back } from "../components/prev";
import { Stat } from "../components/stat";
import { Icon } from "../components/icon";

export class Lair extends React.Component {
  constructor(props){
    super(props);
    this.optionStyle = {
      paddingLeft:"3px"
    }
    this.tabStyle = {
      backgroundColor: "#343c44",
      border:"1px black solid",
      padding:"8px",
      height:"200px"
    }
    this.state = {
      favFilter:null,
      filter:null,
      favSort:null,
      sort:null,
    }
  }
  mount(){
    return(
      <Lair app={this.props.app}/>
    )
  }
  getParty(sort, favourites, filter){
    var ret = [];
    var index = 0;
    for(var entity of this.props.app.world.getParty(sort, favourites, filter)){
      ret.push(<EntityLair entity={entity} expand={false} key={index} healthMode={"text"}/>)
      index++;
    }
    return ret;
  }
  render() {
    this.favParty = this.getParty(this.state.favSort,true,this.state.favFilter);
    this.party = this.getParty(this.state.sort,false,this.state.filter);
    return (
      <div style={{paddingLeft:"8px",paddingRight:"8px",}}>
        <div style={{textAlign:"center"}}>
          <p><i>
            The lair is the hub and center of the game. Here the player can rest, manage their inventory and party, evolve and venture out into the world.
          </i></p>
          <div>
            <Link scene={WorldMap} app={this.props.app} style={this.optionStyle}>Exit Lair</Link> |
            <Link scene={WorldMap} app={this.props.app} style={this.optionStyle}>Excavate</Link> |
            <Link scene={Hibernate} app={this.props.app} style={this.optionStyle} />
          </div>
        </div>
        <hr style={{width:"80%"}}/>
        <div style={{display:"flex"}}>
          <div>
            <div style={{border:"1px solid black", padding:"10px", backgroundColor:"rgb(52, 60, 68)",marginRight:"20px",width:"250px"}}>
              <div>Space 30/55</div>
              <div><b>Chambers</b></div>
              <div><Icon src={require("../icon/svg/hearts.svg")} color={"pink"}/><Link scene={Evolve} app={this.props.app} style={this.optionStyle} >Main Cavern</Link></div>
              <div><Icon src={require("../icon/svg/hearts.svg")} color={"pink"}/><Link scene={Evolve} app={this.props.app} style={this.optionStyle} >Party Chamber</Link></div>
              <div><Icon src={require("../icon/svg/open-treasure-chest.svg")}/><Link scene={Hoard} app={this.props.app} style={this.optionStyle} >Hoard Room</Link></div>
              <div><Icon src={require("../icon/svg/dna2.svg")}/><Link scene={Evolve} app={this.props.app} style={this.optionStyle} >Evolution Den</Link></div>
              <div><b>Expansions</b></div>
              <a>Chemical Vault</a><br/>
              <a>Ancient Hollow</a><br/>
              <div style={{color:"grey"}}>--Excavate--</div>
              <div><b>Rooms</b></div>
              <a>Ventiliation Shaft</a><br/>
              <a>Fungal Grove</a><br/>
              <a>Trash Mound</a><br/>
              <a>Ley lines</a><br/>
              <div style={{color:"grey"}}>--Excavate--</div>
              <div><b>Defences</b></div>
              <a>False Ends</a><br/>
              <a>Acid Lake</a><br/>
              <a>Hidden Entrance</a><br/>
              <a>Poison Fog</a><br/>
              <a>Monster Den</a><br/>
              <div style={{color:"grey"}}>--Excavate--</div>
            </div>
          </div>
          <div style={{flexGrow:1, width:"100%"}}>
            <div><h1>{this.props.app.world.player.alias}</h1></div>
            {this.favParty.length>0?
              <div>
                Favourites <a>Name</a> | <a>Age</a> | <a>Tags</a>
                {this.favParty}
              </div>
              :""
            }
            {this.party.length>0?
              <div>
                Party <a>Name</a> | <a>Age</a> | <a>Tags</a>
                {this.party}
              </div>
              :<Pane><i>No party members</i></Pane>
            }
          </div>
        </div>
      </div>
    );
  }
}
