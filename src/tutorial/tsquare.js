import React, { Component } from 'react';

export default class TSquare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  render() {
    return (
      <button
        className="tsquare"
        onClick={() => this.props.onClick()}
        onKeyDown={event => this.props.onKeyDown(event.key)}>
        {this.props.value}
      </button>
    );
  }
}
