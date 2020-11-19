import React, { Component } from 'react';
import Matter from 'matter-js';

export default class MatterView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: 0,
      CanvasName: props.CanvasName,
      CanvasParent: props.Parent
    };
  }

  componentDidMount() {
    var Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies;

      //var body = document.querySelector("body");


    // create an engine
    var engine = Engine.create(); //body);

    engine.world.gravity.y = 0;
    engine.world.friction = 0;


    var canvas = document.getElementById(this.state.CanvasName);

    var embeedded = document.getElementById(this.state.CanvasParent);

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    //create a renderer
    var render = Render.create({
      element: embeedded, //document.body,
      engine: engine,
      pixelRatio: 'auto',
      canvas: canvas,
      options: {
        width: canvas.width,
        height: canvas.height,
        wireframes: false,
        showAngleIndicator: true,
        background: 'white'
      }
    });

    var square = Matter.Bodies.rectangle(200, 100, 100, 100, {
        // specify options here
    });

    //worldObjects.push(square);

    // add all of the bodies to the world
    World.add(engine.world, square);

    // run the engine
    Engine.run(engine);

    // run the renderer
    Render.run(render);
  }

  render() {
    return (
      <div>
        <div id="wrapper" ref="drawArea" className="drawArea">
          <canvas id={this.state.CanvasName}  className="canvasFull" />
        </div>
      </div>
    );
  }
}
