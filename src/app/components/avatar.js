import React from 'react';
import { render } from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

export class Avatar extends React.Component {
  constructor(props){
    super(props);
    this.style = {
      width:"70px",
      padding:"3px",
    }
  }
  render(){
    return(
      <div>
        <img src={this.props.src} style={this.props.style?this.props.style:this.style}/>
      </div>
    )
  }
}
