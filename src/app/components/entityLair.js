import React from 'react';
import { render } from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

//Motion
import { Motion, spring} from 'react-motion'

//Bootstrap Components
import { Glyphicon } from "react-bootstrap"
import { Panel } from "react-bootstrap"

//Components
import { HealthBar } from '../Components/healthbar';
import { HealthText } from '../Components/healthText';
import { Avatar } from '../Components/avatar';
import { Status } from '../Components/status';
import { Stat } from '../Components/stat';

export class EntityLair extends React.Component {
  constructor(props){
    super(props);
    this.className = "";
    this.state = {
      open: 0,
    };
    this.style = {}
    this.containerStyle = {
      marginBottom:"5px",
    }
    Object.assign(this.style, this.props.style);
    this.titleStyle={}
    Object.assign(this.titleStyle, this.props.titleStyle);
    this.moreStyle={
      marginLeft:"auto",
      marginRight:"auto",
      borderRadius:"6px 6px 0px 0px",
      width:"30%",
      height:"13px",
      fontSize:"12px",
      textAlign:"center",
      backgroundColor:"rgba(30, 30, 30, 1)",
      color:"black",
      cursor:"pointer",
    }
    Object.assign(this.moreStyle, this.props.moreStyle);
    if(props.width){
      this.style.width = props.width;
    }
    if(props.width ||  this.style.width ) this.containerStyle.width  = this.style.width;
    if(props.height ||  this.style.height ) this.containerStyle.height  = this.style.height;
    this.onClick=null;
    console.log(this.props.combat)
    if(this.props.combat) this.props.combat.entities.push(this);
  }
  render(){
    var className = "entityCard";
    return(
        <div style={this.style}
          className={className}
          onClick={this.props.combat?this.props.combat.selectTarget.bind(this.props.combat, this.props.entity, this):null}
          id={"card"+this.props.entity.id}
        >
          <div className={this.statusClass}>
            <div style={this.titleStyle} className={"entityCardTitle"}>
              <div style={{flexGrow:1}}>
                <b>{this.props.entity.alias}&nbsp;</b>
              </div>
              <div >
                  <HealthText pool={this.props.entity.hp} fromColor={{r:0,g:128,b:0}}/>
                {/*}
                <HealthText pool={this.props.entity.sp} fromColor={{r:218,g:165,b:32}} label={"Stamina"}/>
                <HealthText pool={this.props.entity.mp} fromColor={{r:0,g:136,b:255}} label={"Morale"}/>
                */}
              </div>
            </div>
            <div style={{display:"flex",}}>
              <div style={{textAlign:"center"}}>
                <Avatar src={this.props.entity.avatar}/>
              </div>
              <div style={{marginTop:"5px",width:"100%"}} className={"entityCardBody"}>
                <div style={{display:"flex"}}>
                  <Stat stat={this.props.entity.str} label={"Strength"} valueStyle={{color:"grey"}} labelStyle={{color:"#d50000"}} style={{flexGrow:1,textAlign:"center"}} />
                  <Stat stat={this.props.entity.agi} label={"Agility"} valueStyle={{color:"grey"}} labelStyle={{color:"#FFAB00"}} style={{flexGrow:1,textAlign:"center"}}/>
                  <Stat stat={this.props.entity.wil} label={"Willpower"} valueStyle={{color:"grey"}} labelStyle={{color:"#0D47A1"}} style={{flexGrow:1,textAlign:"center"}}/>
                </div>
                <div>
                  <a className={this.state.open===0?"disabled":""} onClick={()=>{this.setState({open:0})}}>Verbose</a> | <a className={this.state.open===1?"disabled":""} onClick={()=>{this.setState({open:1})}}>Condense</a>
                </div>
                <div style={{display:this.state.open===0?"flex":"none"}}>
                  In hac habitasse platea dictumst. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus felis sem, congue sit amet ex eget, elementum cursus turpis. Nullam a felis commodo, efficitur tellus a, interdum elit. Suspendisse turpis nulla, tincidunt id justo ac, tincidunt euismod justo. Nam vel enim posuere, condimentum massa egestas, vulputate lorem. Donec condimentum diam quam, quis tempor libero ornare egestas. Suspendisse et suscipit magna. Phasellus sodales imperdiet imperdiet. Fusce non mauris rutrum, tincidunt risus sed, consequat enim. Aliquam vel tortor tincidunt, venenatis lacus quis, convallis nisl. Praesent leo erat, iaculis vitae sapien vel, tristique pellentesque risus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce sollicitudin vel sapien tempus placerat.
                </div>
                <div style={{display:this.state.open===1?"flex":"none"}}>

                </div>
              </div>
            </div>
          </div>
          {this.props.expand===undefined||this.props.expand?
            <Panel collapsible expanded={this.state.open}>
              <h4>Base</h4>
              <Stat stat={this.props.entity.str} label="Strength" labelStyle={{color:"grey"}}/>
              <Stat stat={this.props.entity.agi} label="Agility" labelStyle={{color:"grey"}}/>
              <Stat stat={this.props.entity.wil} label="Willpower" labelStyle={{color:"grey"}}/>
              <div style={{display:"flex"}}>
                <div style={{flexGrow:1}}>
                  <h4>Offense</h4>
                </div>
                <div style={{flexGrow:1}}>
                  <h4>Defence</h4>
                </div>
              </div>
            </Panel>
            :""
          }
          {this.props.expand===undefined||this.props.expand?
            <div style={this.moreStyle} onClick={ ()=> this.setState({ open: !this.state.open })}>
              <Glyphicon glyph="option-horizontal" />
            </div>
            :""
          }
          {this.props.children}
        </div>
    )
  }
}
