import React from 'react';
import { render } from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

export class HealthText extends React.Component {
  constructor(props){
    super(props);
    this.fromColor = this.props.fromColor?this.props.fromColor:{
      r:0,
      g:255,
      b:0,
    }
    this.toColor = this.props.toColor?this.props.toColor:{
      r:255,
      g:0,
      b:0,
    }


  }
  render(){
    // var stat = this.props.pool;
    // var percent = (100 - stat.curr)/100;
    // var value = Math.round(stat.getCurr(), -1);
    // var max = Math.round(stat.getMax());
    // var color = this.props.color?props.color:"green"
    // percent = Math.max(Math.min(percent, 1),0);
    //
    //
    // var color = {
    //   r:Math.round(this.fromColor.r + (this.fromColor.r - this.toColor.r)*percent),
    //   g:Math.round(this.fromColor.g + (this.fromColor.g - this.toColor.g)*percent),
    //   b:Math.round(this.fromColor.b + (this.fromColor.b - this.toColor.b)*percent),
    // }
    // this.style = {
    //   color:"rgb("+color.r +","+color.g+","+color.b+")",
    // }

    var percent = this.props.pool.curr;
    var senseLevel = this.props.level?this.props.level:0;

    var curr = Math.round(this.props.pool.getCurr())
    var max = this.props.pool.getMax()
    if(senseLevel === 1){
      if (percent >=0){
        var style = {
          color: "rgb("+this.fromColor.r+","+this.fromColor.g+","+this.fromColor.b+")",
        }
      } else {
        var style = {
          color: "rgb("+this.toColor.r+","+this.toColor.g+","+this.toColor.b+")",
        }
      };
      var display = <span style={style}>{curr+"/"+max}</span>
    } else {
      if(this.props.status === "fled"){

      } else if(percent === 100){
        var display = <span style={{color:"#1B5E20"}}>Uncathed</span>
      } else if (percent < 75 && percent >= 50){
        var display = <span style={{color:"#33691E"}}>Hurt</span>
      } else if (percent < 50 && percent >= 25){
        var display = <span style={{color:"#F57F17"}} >Injured</span>
      } else if (percent < 25 && percent > 0){
        var display = <span style={{color:"#E65100"}} >Brink of death</span>
      } else {
        var display = <span style={{color:"red"}} >Dead</span>
      }
    }



    return(
      <div>
        {this.props.label?this.props.label+": ":""}{display}
      </div>
    )
  }
}
