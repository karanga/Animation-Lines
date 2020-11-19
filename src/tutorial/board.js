import React, { Component } from 'react';
import TSquare from './tsquare.js';
export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 'b'
    };
  }

  renderSquare(i) {
    return (
      <TSquare
        value={this.state.key}
        onClick={() => this.handleClick(i)}
        onKeyDown={event => this.handleKey('f')}
      />
    );
  }

  handleClick(i) {
    console.log('hit');
    this.setState({ key: 'a' });
  }

  handleKey(key) {
    console.log('key');
    this.setState({ key: key });
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
