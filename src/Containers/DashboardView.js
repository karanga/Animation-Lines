import React, { Component } from 'react';

export default class MatterView extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        seconds: 0,
        CanvasName: props.CanvasName,
        CurrentTime : new Date().toLocaleTimeString()
      };
    }

    componentDidMount() {
    this.timerID = setInterval(
        () => this.tick(),
        1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
      }
        
    tick() {
        this.setState({
            CurrentTime: new Date().toLocaleTimeString()
        });
    }

    render() {
        return <h1>Hello, Craig Time is {this.state.CurrentTime}</h1>;
    }

}
