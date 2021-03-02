import React from 'react';
import { render } from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';


export class Pane extends React.Component {
  constructor(props){
    super(props);
    this.style = {
      backgroundColor:"#343c44",
      border:"black 1px solid",
    }
  }
  render() {
    return (
      <div style={Object.assign(this.style, this.props.style)}>
        {this.props.children}
      </div>
    );
  }
}
