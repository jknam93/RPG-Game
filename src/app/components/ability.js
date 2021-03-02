import React from 'react';
import { render } from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { Col } from "react-bootstrap"

import { Icon } from "./icon"

export class Ability extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selected:false,
    }
    this.style = {
      border:"1px black solid",
      backgroundColor:"#343c44",
      textTransform:"capitalize",
      marginBottom:"-1px",
      cursor:"pointer",
      display:"flex",
      width:"100%",
      padding: "8px 8px 0px 8px",
      transition: "box-shadow 0.2s ease-in-out",
    }
    this.iconStyle={
      order:1,
    }
    this.codeStyle={
      order:2,
      flexGrow:2,
      paddingLeft:"15px",
      paddingRight:"5px",
    }
    this.costStyle={
      order:3,
      color:"gold",
    }
  }
  render(){
    var className = this.props.className?this.props.className:"abilityButton";
    className += this.state.selected?" selected":"";
    return(
      <div style={this.style}
           className={className}
           onClick={this.props.combat.selectAbility.bind(this.props.combat, this.state.selected?null:this.props.ability, this)}>
        <div style={this.iconStyle}>
          <Icon src={this.props.ability.icon} width={40}/>
        </div>
        <div style={this.codeStyle}>
          <div>{this.props.ability.code}</div>
          <sup><i>{this.props.ability.description}</i></sup>
        </div>
        <div style={this.costStyle}>
          {this.props.ability.cost}
        </div>
      </div>
    )
  }
}
