import React from 'react';
import { render } from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
//Bootsrap Components
import { Col } from "react-bootstrap";
import { Tabs } from "react-bootstrap";
import { Tab } from "react-bootstrap";
import { Panel } from "react-bootstrap";
//Components
import { Back } from "../components/prev";
import { Pane } from "../components/pane";
import { EntityCard } from "../components/entityCard";

export class CombatResults extends React.Component {
  constructor(props){
    super(props);
    this.style = {
      display:"flex",
    }

    this.tabStyle = {
      backgroundColor: "#343c44",
      border:"1px black solid",
      padding:"8px",
      textAlign:"bottom",
    }
    this.colStyle = {
      flexGrow:1,
      padding:"5px",
      marginRight:"5px",
    }
    this.colEndStyle = {
      flexGrow:1,
      padding:"5px",
    }
    this.state = {
      open: 0,
    }
    this.reward = this.props.app.combat.getReward();
  }
  mount(params){
    return (<CombatResults app={this.props.app} params={params}/>)
  }
  cleanUp(){
    var world = this.props.app.world;
    var player = world.player;
    for(var entity of this.reward.prisoner){
      this.props.app.world.party.push(entity.__proto__);
    }
    player.evp.setBase(this.reward.evp);
  }
  render() {
    console.log(this.reward);
    return (
      <div>
        <div style={{textAlign:"center"}}>
          <h1 style={{textTransform:"capitalize"}}>{this.props.app.combat.status()}</h1>
          <div style={{fontStyle:"italic"}}>
            This part of the scene will describe the end combat narrtive. For example. <br/><br/> The dust settles and the haze of combat fades. You stand atop the corpse of your enemies, the victor.
          </div>
          <div>
            <Back app={this.props.app} onclick={this.cleanUp.bind(this)}>Claim your reward</Back>
          </div>
          <div>
          EVP <span style={{color:"grey"}} onClick={()=> this.setState({ openEVP: !this.state.openEVP })}><span style={{color:"gold"  }}>{this.reward.evp}</span>[+]</span>
          <Panel collapsible expanded={this.state.openEVP}>
            <div style={{paddingLeft:"20px", display:"flex", flexDirection:"column"}}>
              <div>Bandit <span style={{color:"gold",float:"right"}}>1</span></div>
              <div>Wolf <span style={{color:"gold",float:"right"}}>5</span></div>
              <div>Dragon <span style={{color:"gold",float:"right"}}>25</span></div>
            </div>
          </Panel>
          </div>
          <div>
            <a className={this.state.open===0?"disabled":""} onClick={()=>{this.setState({open:0})}}>Captured</a> | <a className={this.state.open===1?"disabled":""} onClick={()=>{this.setState({open:1})}}>Party</a> | <a className={this.state.open===2?"disabled":""} onClick={()=>{this.setState({open:2})}}>Statistics</a>
          </div>
        </div>
        <hr style={{width:"80%"}}/>
        <div style={{display:this.state.open===0?"flex":"none", transition:"all 0.25s"}} >
          <div style={this.colStyle}>
            {
              this.reward.prisoner.map((entity)=>{
                return (<EntityCard expand={false} entity={entity} key={entity.id}/>)
              })
            }
          </div>
        </div>
        <div style={{display:this.state.open===1?"flex":"none", transition:"all 0.25s"}} >
          <div style={this.colStyle}>
            {
              this.props.app.combat.getEntities(1).map((entity)=>{
                return (<EntityCard expand={false} entity={entity} key={entity.id}/>)
              })
            }
          </div>
        </div>
        <div style={{display:this.state.open===2?"flex":"none", transition:"all 0.25s"}} >
          <div style={this.colStyle}>
            Damage deal<br/>
            Healing done<br/>
            Most damage<br/>
            Most healing<br/>
          </div>
        </div>

      </div>
    );
  }
}
