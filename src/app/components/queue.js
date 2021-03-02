import React from 'react';
import { render } from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

//Components
import { Pane } from "../components/pane"

export class Queue extends React.Component {
  constructor(props){
    super(props);
    this.style = {
      border:"black 1px solid",
      backgroundColor:"#343c44",
    }
  }
  render(){
    Object.assign(this.style, this.props.style);
    return(
      <div style={this.style} className={"queueContainer"}>
        { this.props.queue.map((entity, index)=>{
          var style = {
            borderLeft:"1px solid grey",
            paddingLeft:"5px",
            paddingRight:"5px",
          };
          if(index === 0){
            style.fontWeight = "bold";
            style.borderLeft = "none";
          }
          return <span className={"queueItem"} style={style} key={"queue"+index}>{entity.alias}</span>
        })}
      </div>
    )
  }
}
