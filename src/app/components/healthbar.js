import React from 'react';
import { render } from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

export class HealthBar extends React.Component {
  constructor(props){
    super(props);

  }
  render(){
    var stat = this.props.pool;
    var percent = stat.curr;
    var value = Math.round(stat.getCurr(), -1);
    var max = Math.round(stat.getMax());
    var color = props.color?props.color:"green"
    percent = Math.max(0, percent) * 100;
    percent =  Math.min(percent, 100);
    this.outer = {
      width:"100%",
      backgroundColor: "red",
    }
    this.inner = {
      width:percent+"%",
      backgroundColor: color,
    }
    return(
      <div style={this.outer}>
        <div style={this.inner}>
          {this.props.label?this.props.label+": ":""}{this.props.pool.getCurr()}/{this.props.pool.getMax()}
        </div>
      </div>
    )
  }
}
