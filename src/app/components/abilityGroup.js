import React from 'react';
import { render } from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

//Bootstrap Components
import { Tabs } from 'react-bootstrap';
import { Tab } from 'react-bootstrap';

//Engine
import { Ability } from './ability';

export class AbilityGroup extends React.Component {
  constructor(props){
    super(props);
    this.tabStyle = {
    }
  }
  renderAbilities(abilities){
    var ret = [];
    for(var ability of abilities){
      ret.push(
          <Ability
            ability={ability}
            combat={this.props.combat}
            key={ability.code}
          />
      )
    }
    return ret;
  }
  render(){
    var abilities = new Map();
    for(var [code,ability] of this.props.entity.abilities){
      var list = abilities.get(ability.category);
      if (list === undefined){
        list = [];
        abilities.set(ability.category, list);
      }
      list.push(ability);
    }
    return(
      <div>
        <Tabs id="news-tabs" style={{marginBottom:"5px",borderBottom:"black 1px solid !important"}}>
          {abilities.get(0)!==undefined?
            <Tab eventKey={1} title="Basic">
            {this.renderAbilities(abilities.get(0))}
          </Tab>:""}
          {abilities.get(1)!==undefined?
          <Tab eventKey={2} title="Special">
            {this.renderAbilities(abilities.get(1))}
          </Tab>:""}
          {abilities.get(2)!==undefined?
          <Tab eventKey={3} title="Normal">
            {this.renderAbilities(abilities.get(2))}
          </Tab>:""}
          {abilities.get(3)!==undefined?
          <Tab eventKey={4} title="Poison">
            {this.renderAbilities(abilities.get(3))}
          </Tab>:""}
          {abilities.get(4)!==undefined?
          <Tab eventKey={5} title="Magic">
            {this.renderAbilities(abilities.get(4))}
          </Tab>:""}
        </Tabs>
      </div>
    )
  }
}
