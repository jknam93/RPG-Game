import React from 'react';
import { render } from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

export class Link extends React.Component {
  constructor(props){
    super(props);
  }
  goto(){
    if (this.props.onClick) this.props.onClick();
    var params = this.props.params?this.props.params:{};
    var app = this.props.app;
    if(this.props.replace){
      app.changeState((new this.props.scene({app:app, params:params})).mount());
    } else {
      app.push((new this.props.scene({app:app, params:params})).mount());
    }
  }
  render() {
    return (
      <a onClick={this.goto.bind(this)} href={"#"+this.props.scene.name} style={{display:"inline-block"}}>
        <div style={this.props.style}>
          {this.props.children?this.props.children:this.props.scene.name}
        </div>
      </a>
    );
  }
}
