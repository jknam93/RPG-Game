import React from 'react';
import { render } from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

//Components
import { Back } from "../components/prev";

export class LairUpgrade extends React.Component {
  constructor(props){
    super(props);
  }
  back(){
    var app = this.props.app;
    app.pop();
  }
  render() {
    return (
      <div>
        <div><h1>Upgrade Lair</h1></div>
        <ul>
          <li><Back app={this.props.app}/></li>
        </ul>
      </div>
    );
  }
}
