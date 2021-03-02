import React from 'react';
import { render } from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';


export class Back extends React.Component {
  constructor(props){
    super(props);
  }
  back(){
    var app = this.props.app;
    if(this.props.onclick) this.props.onclick();
    app.pop();
  }
  render() {
    return (
      <a onClick={this.back.bind(this)}>
        {this.props.children?this.props.children:"Back"}
      </a>
    );
  }
}
