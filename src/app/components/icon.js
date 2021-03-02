import React from 'react';
import { render } from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

export class Icon extends React.Component {
  constructor(props){
    super(props);
    this.style = {}
    this.style.width = this.props.width?this.props.width:"20px";
  }
  render(){
    return(
      <span>
        <img src={this.props.src} style={this.props.style?this.props.style:this.style}/>
      </span>
    )
  }
}
