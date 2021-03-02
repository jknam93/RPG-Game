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

export class EntityCard extends React.Component {
  constructor(props){
    super(props);
    this.className = "";
    this.state = {
      open: false,
      targetable:false,
      targeted:false,
      animationQueue:[],
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
    var style = this.state.animationQueue[this.state.animationQueue.length - 1];
    style = style?style:{marginLeft:0}
    var className = "entityCard";
    className += this.props.className?" "+this.props.className:"";
    className += this.props.entity.turn?" turn":" notTurn";
    className += this.props.entity.faction === 1?" ally":" enemy";
    className += " "+this.props.entity.status;
    className += this.state.targetable?" targetable":"";
    className += this.state.targeted?" targeted":"";
    return(
      <Motion style={style} key={this.props.entity.id} onRest={()=>{console.log("Hi")}}>
        {({marginLeft, marginRight})=>
          <div style={Object.assign(this.style, {marginLeft:marginLeft, marginRight: marginRight})}
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
                  {
                    this.props.entity.status === "fled"? <div style={{color:"yellow"}}>Fled</div>:
                    this.props.entity.capturable && this.props.entity.hp.curr <= 0? <div style={{color:"yellow"}}>Unconscious</div>:
                    <HealthText pool={this.props.entity.hp} fromColor={{r:0,g:128,b:0}}/>
                  }
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
                <div style={{marginTop:"5px",display:"flex",width:"100%"}} className={"entityCardBody"}>
                  <div style={{flexGrow:1}}>
                    <Stat stat={this.props.entity.ap} label={"Attack"} valueStyle={{color:"grey"}}/>
                    <Stat stat={this.props.entity.hit} label={"Hit Rating"} valueStyle={{color:"grey"}}/>
                    <Stat stat={this.props.entity.dodge} label={"Dodge"} valueStyle={{color:"grey"}}/>
                    <Stat stat={this.props.entity.ap} label={"Armour"} valueStyle={{color:"grey"}}/>
                  </div>
                </div>

                 {this.props.entity.turn?<Glyphicon glyph="pawn"/>:""}
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
        }
      </Motion>
    )
  }
}
