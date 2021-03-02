import React from 'react';
import { render } from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

export class Events extends React.Component {
  constructor(props){
    super(props);
  }
  getText(range){
    if(this.props.eventLog && this.props.eventLog.length > 0){
      var length = this.props.eventLog.length
      var ret = [];
      range = range?range:length
      for(var i = length - 1; i!==length-range-1; i--){
        ret.push(<div key={"log"+i}>{this.props.eventLog[i]}</div>);
      }
    }
    return ret;
  }
  render(){
    return(
      <div>
        {this.getText(this.props.range)}
      </div>
    )
  }
}
