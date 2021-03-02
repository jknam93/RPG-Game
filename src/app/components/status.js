import React from 'react';
import { render } from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

export class Status extends React.Component {
  constructor(props){
    super(props);
    this.style = {
      textTransform:"capitalize",
    }
    var status = this.props.status
    this.style.color =
        status ==="good" ? "#008000" :
        status ==="unconscious" ? "#FFA500" :
        status ==="broken" ? "#FFA500" :
        status ==="fled" ? "#ffff00" :
        status ==="dead" ? "#8b0000" :
        "white"
  }
  render() {


    return (
      <span style={this.style}>
        {this.props.status}
      </span>

    );
  }
}
