import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

import Style from '../style/style.css'

//Motion
import { Motion, spring} from 'react-motion'

//Engine
import { Entity, Humanoid, generateHuman } from "../engine/entity"
import { generateText } from "../engine/eventTextManager"
import { CombatEngine } from "../engine/combat"

//Bootsrap Components
import { Col } from "react-bootstrap";
import { Tabs } from "react-bootstrap";
import { Tab } from "react-bootstrap";

//scenes
import { CombatResults } from "./combatResults";

//Components
import { EntityCard } from "../components/entityCard"
import { Pane } from "../components/pane"
import { Link } from "../components/link";
import { Back } from "../components/prev";
import { Stat } from "../components/stat";
import { Icon } from "../components/icon";
import { Ability } from "../components/ability";
import { AbilityGroup } from "../components/abilityGroup";
import { Events } from "../components/events"
import { Queue } from "../components/queue"

export class Combat extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      turn:0,
      ready:true,
      animationClass:"",
    }
    this.outstandingAnimation = 0;
    //Combat Records
    this.eventLog = props.eventLog?[props.eventLog]:["You face 2 wolves"];
    this.events = [];
    this.eventPane = null;

    ///////TEMP//////
    var entity1 = generateHuman({
      str:3,
      agi:3,
      wil:3,
      sex:"male",
    })
    var entity2 = generateHuman({
      str:3,
      agi:3,
      wil:3,
      sex:"male",
    })
    var entity3 = generateHuman({
      str:3,
      agi:3,
      wil:3,
      sex:"male",
    })
    var entity4 = generateHuman({
      str:3,
      agi:3,
      wil:3,
      sex:"male",
    })
    var entity5 = generateHuman({
      str:3,
      agi:3,
      wil:3,
      sex:"female",
    })
    var combatParams = {
      player:this.props.app.world.player,
      friendlyEntities:[entity3],
      enemyEntities:[entity1, entity2],
    }
    ///////TEMP//////
    this.props.app.combat = new CombatEngine(combatParams);

    //Styles
    this.tabStyle = {
      backgroundColor: "rgba(0,0,0,0.6)",
      border:"1px black solid",
      padding:"8px",
      height:"200px",
      textAlign:"bottom"
    }
    this.cardCol= {
      marginRight:"5px",
      marginBottom:"10px",
      maxWidth:"400px",
      width:"100%"
    }
    this.eventCol= {
      marginRight:"5px",
      marginBottom:"10px",
      width:"100%"
    }
    //Entities
    this.entities = [];
    //Abilities
    this.ability = null;
    this.activeButton = null;

    //Curr turn
    this.currentEntity = null;
    this.attacker = null;
    this.attackerCard = null;
    //Event Parameters
    this.targets = [];
    this.abilityButtons = [];

    this.activeAllies = 0;
    this.activeEnemies = 0;

    this.status = "continue"

  }
  mount(params){
    return(
      <Combat app={this.props.app} params={params}/>
    )
  }
  getEntities(){
    var ret = [];
    var index = 0;
    for(var entity of this.props.app.combat.getEntities()){
      console.assert(index === entity.id, index, entity.id)
      ret.push(<EntityCard combat={this} entity={entity} key={entity.id}/>);
      index++;
    }
    return ret;
  }
  selectAttacker(attacker, comp){
    //Deselect current attacker
    if(this.attackerCard) this.attackerCard.setState({class:""});
    this.attackerCard = null;
    this.attacker = null;
    this.targets = [];
    this.selectAbility();
    //Select new attacker
    if(this.attacker !== null){
      comp.setState({class:"activeCard"});
      this.attacker = attacker;
    }
  }
  selectAbility(ability, comp){
    //Deselect current ability
    console.log("SELECT ABILITY",ability, comp.state)
    if(this.activeButton) this.activeButton.setState({selected:false});
    this.activeButton = null;
    this.ability = ability;
    this.targets = [];
    for(var card of this.entities){
      card.setState({targetable:false});
    }
    //Select new ability
    if(ability !== null){
      comp.setState({selected:true});
      this.ability = ability;
      this.activeButton = comp;
      if (ability.targets % ability.targets === 0){
        for(var card of this.entities){
          if(ability.targetable(this.attacker, card.props.entity)){
            card.setState({targetable:true});
          }
        }
      } else {
        for(var card of this.entities){
          this.activeButton = comp;
          if(this.ability.targets === "all"){
            this.targets.push(card.props.entity);
          } else if (this.ability.targets === "enemies" && card.props.entity.faction !== this.currEntity.faction) {
            this.targets.push(card.props.entity);
          } else if (this.ability.targets === "allies" && card.props.entity.faction === this.currEntity.faction){
            this.targets.push(card.props.entity);
          } else if (this.ability.targets === "self") {
            this.targets.push(this.currEntity);
          }
        }
        this.endTurn();
      }
    }
  }
  selectTarget(target, comp){
    console.log("SELECT TARGET",target, comp)
    if(comp.state.targeted){
      let index = this.targets.indexOf(target);
      this.targets.splice(index, 1);
      comp.setState({targeted:false});
    } else if(comp.state.targetable){
      this.targets.push(target);
      comp.setState({targeted:true});
      if(this.targets.length === this.ability.targets){
        this.endTurn();
      }
    }
  }
  endTurn(){
    var action = {
      attacker: this.attacker,
      targets: this.targets,
      ability: this.ability,
    }
      console.log("END TURN", action);
    //Resolve turn
    var response = this.props.app.combat.resolveTurn(action);
    //Set eventtext
    this.events.push(response);
    this.eventLog.push(generateText(response));
    this.beginTurn();
    this.setState({
      turn:this.state.turn+1,
    })
  }
  beginTurn(){
    console.log("BEGIN TURN");
    //Set state to initial
    this.props.app.combat.beginTurn();
    if(this.activeButton) this.activeButton.setState({selected:false});
    this.ability = null;
    this.activeButton = null;
    this.targets = [];

    for(var card of this.entities){
      card.setState({targetable:false, targeted:false, animationClass:""});
      //card.animate(this);
    }
  }
  aiTurn(){
    var attacker = this.props.app.combat.whoseTurn();
    var targets =attacker.faction?this.props.app.combat.getEntities(1):this.props.app.combat.getEntities(1);
    var i = Math.round(Math.random()*(targets.length-1));
    this.attacker = attacker;
    this.targets = [targets[i]];
    this.ability = attacker.abilities.get("attack");
    this.endTurn();
  }
  render() {
    if(this.currEntity ) this.currEntity.turn = false;
    this.currEntity = this.props.app.combat.whoseTurn();
    this.currEntity.turn = true;
    this.attacker = this.currEntity;
    return (
      <div>
        <div style={{display:"flex"}} className={this.state.animationClass?this.state.animationClass:""}>
          <div style={this.cardCol}>
            {this.props.app.combat.getEntities(1).map((entity)=>{
              return(<EntityCard combat={this} entity={entity} key={entity.id}/>);
            })}
          </div>
          <div style={this.eventCol}>
            <Tabs id="news-tabs" style={{marginBottom:"5px",borderBottom:"black 1px solid !important"}}>
              <Tab eventKey={1} title="Combat Text" style={this.tabStyle}>
                <Events eventLog={this.eventLog}  range={1}/>
              </Tab>
              <Tab eventKey={2} title="Combat History" style={this.tabStyle}>
                <Events eventLog={this.eventLog}/>
              </Tab>
              <Queue style={{borderTop:"none"}} queue={this.props.app.combat.queue.queue}/>
            </Tabs>
            {this.currEntity.faction !== 1?<a href={"javascript:void(0)"} onClick={this.aiTurn.bind(this)}>{this.props.app.combat.whoseTurn().alias+"'s turn"}</a>:
             <AbilityGroup entity={this.currEntity} combat={this}/>}
             {this.props.app.combat.status()==="defeat"?<Link scene={CombatResults} app={this.props.app} replace={true}>Defeat</Link>:
              this.props.app.combat.status()==="victory"?<Link scene={CombatResults} app={this.props.app} replace={true}>Victory</Link>:""
             }
          </div>
          <div style={this.cardCol}>
            {this.props.app.combat.getEntities(0).map((entity)=>{
              return(<EntityCard combat={this} entity={entity} key={entity.id}/>);
            })}
          </div>
        </div>
        <ul>
          <li><Back app={this.props.app}/></li>
        </ul>
      </div>
    );
  }
}
