import React from 'react';
import { render } from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';


export class Pane extends React.Component {
  constructor(props){
    super(props);
    this.style = {
      backgroundColor:"#343c44",
      border:"black 1px solid",
      padding:"8px",
      marginBottom:"5px"
    }
    this.legendStyle = {
      fontWeight:"bold",
      border:"1px solid black",
      backgroundColor: "#323232",
      padding: "3px 6px"
    }
  }
  render() {
    return (
      <fieldSet style={Object.assign(this.style, this.props.style)}>
        {this.props.legend?(
          <legend style={this.legendStyle}>{this.props.legend}</legend>
        ):""}
        {this.props.children}
      </fieldSet>
    );
  }
}
