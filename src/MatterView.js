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

    // create an engine
    var engine = Engine.create();

    engine.world.gravity.y = 0;
    engine.world.friction = 0;

    var canvas = document.getElementById(this.state.CanvasName);

    var embeedded = document.getElementById(this.state.CanvasParent);

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    // create a renderer
    var render = Render.create({
      element: embeedded,
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

    function Point(x, y) {
      this.x = x;
      this.y = y;
    }

    function IsCollision(p0, p1, r0, r1) {
      var xDiff2 = (p0.x - p1.x) * (p0.x - p1.x);
      var yDiff2 = (p0.y - p1.y) * (p0.y - p1.y);

      var lDiff = Math.sqrt(xDiff2 + yDiff2);

      return lDiff < r0 + r1;
    }

    window.addEventListener('resize', function() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    var boxWidth = canvas.width - 20; //1600
    var boxHeight = canvas.height - 20; //800;
    var lineSize = 5;
    var startX = (canvas.width - boxWidth) / 2;
    var startY = (canvas.height - boxHeight) / 2;

    var xLeft = startX;
    var xRight = startX + boxWidth;
    var yTop = startY + lineSize / 2;
    var yBottom = startY + boxHeight - lineSize / 2;

    // create two boxes and a ground
    var wallLeft = Bodies.rectangle(
      xLeft,
      startY + boxHeight / 2,
      lineSize,
      boxHeight,
      {
        isStatic: true
      }
    );
    var wallRight = Bodies.rectangle(
      xRight,
      startY + boxHeight / 2,
      lineSize,
      boxHeight,
      {
        isStatic: true
      }
    );
    var wallTop = Bodies.rectangle(
      startX + boxWidth / 2,
      yTop,
      boxWidth,
      lineSize,
      {
        isStatic: true
      }
    );
    var wallBottom = Bodies.rectangle(
      startX + boxWidth / 2,
      yBottom,
      boxWidth,
      lineSize,
      {
        isStatic: true
      }
    );

    var worldObjects = [wallLeft, wallRight, wallTop, wallBottom];

    //---- Cells
    var redCells = [];
    var numberOfRedCells = 250;
    var i, j;

    for (var i = 0; i < numberOfRedCells; i++) {
      var isHit = true;

      var r = 15;

      while (isHit) {
        console.log('get new point:' + i);
        var newPoint = new Point(
          xLeft + r * 2 + Math.random() * (boxWidth - r * 4),
          yTop + r * 2 + Math.random() * (boxHeight - r * 4)
        );

        isHit = false;

        for (j = 0; j < redCells.length; j++) {
          if (
            IsCollision(new Point(redCells[j].x, redCells[j].y), newPoint, r, r)
          ) {
            isHit = true;
            console.log('collision red cell');
            break;
          }
        }
      }

      console.log('create red cell');
      var redCell = new Bodies.circle(newPoint.x, newPoint.y, r, {
        restitution: 1,
        density: 1,
        friction: 0,
        frictionAir: 0,
        inertia: Infinity,
        render: {
          // fillStyle: 'red',
          // strokeStyle: 'red',
          // lineWidth: 1
          sprite: {
            texture: 'redcell.png',
            xScale: 0.5,
            yScale: 0.5
          }
        }
      });

      if (i == 0) {
        redCell.render.sprite.texture = 'greencell.png';
      }

      Matter.Body.setVelocity(redCell, {
        x: -10 + Math.random() * 20,
        y: -10 + Math.random() * 20
      });
      Matter.Body.setAngularVelocity(redCell, (Math.random() * Math.PI) / 16);
      Matter.Body.setMass(redCell, 1);
      redCells.push(redCell);

      worldObjects.push(redCell);
    }

    // add all of the bodies to the world
    World.add(engine.world, worldObjects);

    // run the engine
    Engine.run(engine);

    // run the renderer
    Render.run(render);
  }

  render() {
    return (
      <div>
        <div id="wrapper" ref="drawArea" className="drawArea">
          <canvas id={this.state.CanvasName} className="canvasFull" />
        </div>
      </div>
    );
  }
}
