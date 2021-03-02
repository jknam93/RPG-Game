import React from 'react';
import { render } from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

export class Stat extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div style={this.props.style}>
        {this.props.label?(<span style={this.props.labelStyle}>{this.props.label}: </span>):""}<span style={this.props.valueStyle}>{this.props.stat.getCurr()}</span>
      </div>
    )
  }
}
