import React from 'react';
import { render } from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

import{ Tab, Tabs, Panel } from 'react-bootstrap';

import{load, save} from '../engine/save'

export class TopBar extends React.Component {
  constructor(props){
    super(props);
    this.style = {
      width:"100%",
      background:"#FFCC00"
    }

    this.state = {
      open: false
    };
    this.information = null;
  }
  renderInformation(){
    var app = this.props.app;
    console.log("CURR SCENE", app.top());
    console.log("SCENES", app.states);
    console.log("WORLD", app.world);
  }
  render() {
    return (
      <div style={{position:"fixed", left:0, top:0, width:"100%"}}>
        <button onClick={this.renderInformation.bind(this)}>States</button>
        <button onClick={save.bind(this.props.app,this.props.app,1)}>Save</button>
        <button onClick={load.bind(this.props.app,this.props.app,1)}>Load</button>
      </div>
    );
  }
}
