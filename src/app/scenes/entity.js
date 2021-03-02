import React from 'react';
import { render } from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

//Bootsrap Components
import { Col } from "react-bootstrap";
import { Tabs } from "react-bootstrap";
import { Tab } from "react-bootstrap";

//Components
import { Pane } from "../components/pane"
import { Link } from "../components/link";
import { Back } from "../components/prev";
import { Stat } from "../components/stat";

export class Evolve extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div>
        <div><h1>Character</h1></div>
        <div>
          <Col md={4}>
            <img width={"20px"}/>
          </Col>
          <Col md={4}>
            <Stat/>
            <Stat/>
            <Stat/>
          </Col>
          <Col md={4}>
            <Stat/>
            <Stat/>
            <Stat/>
          </Col>
        </div>
        <div>
          <col md={8}>
            <col md={6}>
              Offense
            </col>
            <col md={6}>
              Defence
            </col>
          </col>
          <col md={4}>
            
          </col>
        </div>
        <ul>
          <li><Back app={this.props.app}/></li>
        </ul>
      </div>
    );
  }
}
