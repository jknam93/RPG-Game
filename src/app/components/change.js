import React from 'react';
import { render } from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

export class Change extends React.Component {
  constructor(props){
    super(props);
  }
  goto(){
    if (this.props.onClick) this.props.onClick();
    var params = !this.props.params?{}:this.props.params;
    var app = this.props.app;
    params.app = this.props.app;
    app.changeState(new this.props.scene(params));
  }
  render() {
    return (
      <a onClick={this.goto.bind(this)}>
        {this.props.children?this.props.children:this.props.scene.name}
      </a>
    );
  }
}
