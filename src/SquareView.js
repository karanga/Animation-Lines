import React, { Component } from 'react';
import paper from 'paper';
import Immutable from 'immutable';
import Square from './shapes/square.js';
import Triangle from './shapes/triangle.js';
import RedsBloodCell from './shapes/redbloodcell.js';
import WhiteBloodCell from './shapes/whitebloodcell.js';
import KeyboardEventHandler from 'react-keyboard-event-handler';

export default class SquareView extends Component {
  constructor(props) {
    super(props);

    //this.onMouseDown = this.onMouseDown.bind(this);
    //this.onFrame = this.onFrame.bind(this);
    //this.onKeyDown = this.onKeyDown.bind(this);
    this.state = {
      seconds: 0,
      CanvasName: props.CanvasName,
      CircleColor: props.CircleColor,
      xS: 0,
      yS: 0,
      xC: 0,
      yC: 0,
      key: '0',
      vx: 0,
      vy: 0
    };
  }

  relativeCoordinatesForEvent(mouseEvent) {
    const boundingRect = this.refs.drawArea.getBoundingClientRect();

    this.setState({
      xS: mouseEvent.clientX - boundingRect.left,
      yS: mouseEvent.clientY - boundingRect.top
    });

    return new Immutable.Map({
      x: mouseEvent.clientX - boundingRect.left,
      y: mouseEvent.clientY - boundingRect.top
    });
  }

  onMouseMove(e) {
    //const point = this.relativeCoordinatesForEvent(e);

    this.setState({ xC: e.clientX, yC: e.clientY });
    //console.log('mouse move');
  }

  onMouseDown(e) {
    // Add a segment to the path at the position of the mouse:
    this.setState({ xC: e.clientX, yC: e.clientY });

    this.setState(prevState => ({
      seconds: prevState.seconds + 1,
      path: prevState.path
    }));
  }

  // SetKey(key) {
  //   this.setState({ vx: this.state.vx + 0.5 });
  //   console.log(this.state.vx);
  // }

  componentDidMount() {
    var myCanvas = document.getElementById(this.state.CanvasName);

    var myPaper = new paper.PaperScope();
    var currentPlayer = 0;
    var squares = [];

    var triangles = [];
    var numberOfTriangles = 1;

    var redCells = [];
    var numberOfRedCells = 20;

    var whiteCells = [];
    var numberOfWhiteCells = 5;

    var numberOfSquares = 1;
    var gridSizeInt = 10;

    var vStart = new paper.Point(0.5, 0.5);

    for (var i = 0; i < numberOfSquares; i++) {
      for (var j = 0; j < numberOfSquares; j++) {
        var square = new Square(i, j, 50);

        square.Init(gridSizeInt, gridSizeInt);

        squares.push(square);
      }
    }

    myPaper.setup(myCanvas);

    myPaper.project.currentStyle = {};

    //---- Triangles

    for (var ii = 0; ii < numberOfTriangles; ii++) {
      var isHit = true;

      var r = 40;

      while (isHit) {
        console.log('get new point:' + ii);
        var newPoint = new paper.Point(
          r * 2 + Math.random() * (myPaper.view.size.width - r * 4),
          r * 2 + Math.random() * (myPaper.view.size.height - r * 4)
        );

        isHit = false;

        for (j = 0; j < triangles.length; j++) {
          if (IsCollision(triangles[j].p, newPoint, r, r)) {
            isHit = true;
            console.log('collision');
            break;
          }
        }
      }

      console.log('create triangle');
      var triangle = new Triangle(
        newPoint,
        r,
        r / 2,
        new paper.Point(Math.random(), Math.random()),
        myPaper
      );

      triangles.push(triangle);
    }

    //---- Red Cells
    for (ii = 0; ii < numberOfRedCells; ii++) {
      var isHit = true;

      var r = 15;

      while (isHit) {
        console.log('get new point:' + ii);
        var newPoint = new paper.Point(
          r * 2 + Math.random() * (myPaper.view.size.width - r * 4),
          r * 2 + Math.random() * (myPaper.view.size.height - r * 4)
        );

        isHit = false;

        for (j = 0; j < triangles.length; j++) {
          if (IsCollision(triangles[j].p, newPoint, triangles[j].s, r)) {
            isHit = true;
            console.log('collision triangle');
            break;
          }
        }

        for (j = 0; j < redCells.length; j++) {
          if (IsCollision(redCells[j].p, newPoint, r, r)) {
            isHit = true;
            console.log('collision red cell');
            break;
          }
        }
      }

      console.log('create red cell');
      var redCell = new RedsBloodCell(
        newPoint,
        r,
        r / 2,
        new paper.Point(Math.random(), Math.random()),
        myPaper
      );

      redCells.push(redCell);
    }

    //---- White Cells
    for (ii = 0; ii < numberOfWhiteCells; ii++) {
      var isHit = true;

      var r = 20;

      while (isHit) {
        console.log('get new point:' + ii);
        var newPoint = new paper.Point(
          r * 2 + Math.random() * (myPaper.view.size.width - r * 4),
          r * 2 + Math.random() * (myPaper.view.size.height - r * 4)
        );

        isHit = false;

        for (j = 0; j < triangles.length; j++) {
          if (IsCollision(triangles[j].p, newPoint, triangles[j].s, r)) {
            isHit = true;
            console.log('collision triangle');
            break;
          }
        }

        for (j = 0; j < redCells.length; j++) {
          if (IsCollision(redCells[j].p, newPoint, r, r)) {
            isHit = true;
            console.log('collision red cell');
            break;
          }
        }

        for (j = 0; j < whiteCells.length; j++) {
          if (IsCollision(whiteCells[j].p, newPoint, r, r)) {
            isHit = true;
            console.log('collision white cell');
            break;
          }
        }
      }

      console.log('create white cell');
      var whiteCell = new WhiteBloodCell(
        newPoint,
        r,
        r / 2,
        new paper.Point(Math.random() * 2 - 2, Math.random() * 2 - 2),
        myPaper
      );

      whiteCells.push(whiteCell);
    }

    //---- Blobs

    var ballPositions = [[200, 200], [300, 250], [300, 150]];

    //var handle_len_rate = 2.4;
    var circles = [];
    var radius = 100;
    for (var i = 0, l = ballPositions.length; i < l; i++) {
      var circle = new Circle(ballPositions[i][0], ballPositions[i][1], radius);
      circles.push(circle);
    }

    //console.log(circles[0].x);

    var EPS = 0.0000001;

    // Let a point be a pair: (x, y)
    function Point(x, y) {
      this.x = x;
      this.y = y;
    }

    // Define a circle centered at (x,y) with radius r
    function Circle(x, y, r) {
      this.x = x;
      this.y = y;
      this.r = r;
    }

    function Arc(pMiddle, p0, p1) {
      this.pMiddle = pMiddle;
      this.p0 = p0;
      this.p1 = p1;
    }

    // Due to double rounding precision the value passed into the Math.acos
    // function may be outside its domain of [-1, +1] which would return
    // the value NaN which we do not want.
    function acossafe(x) {
      if (x >= +1.0) return 0;
      if (x <= -1.0) return Math.PI;
      return Math.acos(x);
    }

    function displayPoint(p) {
      myPaper.Path.Circle({
        center: p,
        radius: 20,
        strokeColor: 'blue',
        fillColor: 'blue'
      });
    }

    function displayArc(pMiddle, p0, p1) {
      // ARC
      var myFirstArc = new paper.Path.Arc(p1, pMiddle, p0);
      myFirstArc.strokeColor = 'black';
      myFirstArc.strokeWidth = 10;
    }

    // Rotates a point about a fixed point at some angle 'a'
    function rotatePoint(fp, pt, a) {
      var x = pt.x - fp.x;
      var y = pt.y - fp.y;
      var xRot = x * Math.cos(a) + y * Math.sin(a);
      var yRot = y * Math.cos(a) - x * Math.sin(a);
      return new Point(fp.x + xRot, fp.y + yRot);
    }

    myPaper.view.onMouseMove = function onMouseMove(event) {
      circles[0].x = event.point.x;
      circles[0].y = event.point.y;
    };

    var tool = new paper.Tool();

    tool.onKeyDown = function(event) {
      if (event.key == 'a') {
        triangles[currentPlayer].v.x += -0.5;
      }

      if (event.key == 's') {
        triangles[currentPlayer].v.x += 0.5;
      }

      if (event.key == 'w') {
        triangles[currentPlayer].v.y += -0.5;
      }

      if (event.key == 'z') {
        triangles[currentPlayer].v.y += 0.5;
      }

      if (event.key == 'space') {
        triangles[currentPlayer].v.x = 0;
        triangles[currentPlayer].v.y = 0;
      }

      CalcRotationTriangles(currentPlayer);
    };

    function IsCollision(p0, p1, r0, r1) {
      var xDiff2 = (p0.x - p1.x) * (p0.x - p1.x);
      var yDiff2 = (p0.y - p1.y) * (p0.y - p1.y);

      var lDiff = Math.sqrt(xDiff2 + yDiff2);

      //console.log('Collision Test', lDiff, r0 + r1, lDiff < r0 + r1);

      return lDiff < r0 + r1;
    }

    function DoCollisionTriangles() {
      for (i = 0; i < numberOfTriangles; i++) {
        triangles[i].Move();

        var size = myPaper.view.size;

        var p0 = triangles[i].p;
        var v0 = triangles[i].v;

        //console.log(size.x);

        var pre = new paper.Point(p0.x, p0.y);

        pre.x += v0.x;
        pre.y += v0.y;

        if (pre.x < triangles[i].s || pre.x > size.width - triangles[i].s) {
          triangles[i].v.x *= -1;
        } else if (
          pre.y < triangles[i].s ||
          pre.y > size.height - triangles[i].s
        ) {
          triangles[i].v.y *= -1;
        }

        CalcRotationTriangles(i);
      }

      for (i = 0; i < numberOfTriangles; i++) {
        p0 = triangles[i].p;

        for (j = i; j < numberOfTriangles; j++) {
          var p1 = triangles[j].p;

          if (IsCollision(p0, p1, triangles[i].s, triangles[j].s)) {
            triangles[i].v.x *= -1;
            triangles[i].v.y *= -1;

            triangles[j].v.x *= -1;
            triangles[j].v.y *= -1;
          }
        }

        for (j = 0; j < numberOfRedCells; j++) {
          var p1 = redCells[j].p;

          if (IsCollision(p0, p1, redCells[j].s, triangles[i].s)) {
            triangles[i].v.x *= -1;
            triangles[i].v.y *= -1;

            redCells[j].v.x *= -1;
            redCells[j].v.y *= -1;
          }
        }

        for (j = 0; j < numberOfWhiteCells; j++) {
          var p1 = whiteCells[j].p;

          if (IsCollision(p0, p1, whiteCells[j].s, triangles[i].s)) {
            triangles[i].v.x *= -1;
            triangles[i].v.y *= -1;

            whiteCells[j].v.x *= -1;
            whiteCells[j].v.y *= -1;
          }
        }
      }
    }

    function DoCollisionRedCells() {
      for (i = 0; i < numberOfRedCells; i++) {
        redCells[i].Move();

        var size = myPaper.view.size;

        var p0 = redCells[i].p;
        var v0 = redCells[i].v;

        //console.log(size.x);

        var pre = new paper.Point(p0.x, p0.y);

        pre.x += v0.x;
        pre.y += v0.y;

        if (pre.x < redCells[i].s || pre.x > size.width - redCells[i].s) {
          redCells[i].v.x *= -1;
        } else if (
          pre.y < redCells[i].s ||
          pre.y > size.height - redCells[i].s
        ) {
          redCells[i].v.y *= -1;
        }

        CalcRotationRedCells(i);
      }

      for (i = 0; i < numberOfRedCells; i++) {
        p0 = redCells[i].p;

        for (j = i; j < numberOfRedCells; j++) {
          var p1 = redCells[j].p;

          if (IsCollision(p0, p1, redCells[i].s, redCells[j].s)) {
            redCells[i].v.x *= -1;
            redCells[i].v.y *= -1;

            redCells[j].v.x *= -1;
            redCells[j].v.y *= -1;
          }
        }
      }
    }

    function DoCollisionWhiteCells() {
      for (i = 0; i < numberOfWhiteCells; i++) {
        whiteCells[i].Move();

        var size = myPaper.view.size;

        var p0 = whiteCells[i].p;
        var v0 = whiteCells[i].v;

        //console.log(size.x);

        var pre = new paper.Point(p0.x, p0.y);

        pre.x += v0.x;
        pre.y += v0.y;

        if (pre.x < whiteCells[i].s || pre.x > size.width - whiteCells[i].s) {
          whiteCells[i].v.x *= -1;
        } else if (
          pre.y < whiteCells[i].s ||
          pre.y > size.height - whiteCells[i].s
        ) {
          whiteCells[i].v.y *= -1;
        }

        CalcRotationWhiteCells(i);
      }

      for (i = 0; i < numberOfWhiteCells; i++) {
        p0 = whiteCells[i].p;

        for (j = 0; j < numberOfRedCells; j++) {
          var p1 = redCells[j].p;

          if (IsCollision(p0, p1, whiteCells[i].s, redCells[j].s)) {
            whiteCells[i].v.x *= -1;
            whiteCells[i].v.y *= -1;

            redCells[j].v.x *= -1;
            redCells[j].v.y *= -1;
          }
        }

        for (j = i; j < numberOfWhiteCells; j++) {
          var p1 = whiteCells[j].p;

          if (IsCollision(p0, p1, whiteCells[i].s, whiteCells[j].s)) {
            whiteCells[i].v.x *= -1;
            whiteCells[i].v.y *= -1;

            whiteCells[j].v.x *= -1;
            whiteCells[j].v.y *= -1;
          }
        }
      }
    }

    function CalcRotationTriangles(i) {
      if (triangles[i].v.x > 0) {
        triangles[i].r = 1;
      } else if (triangles[i].v.x < 0) {
        triangles[i].r = -1;
      } else {
        triangles[i].r = 0;
      }

      triangles[i].r *= Math.abs(triangles[i].r) / 0.5;
    }

    function CalcRotationRedCells(i) {
      if (redCells[i].v.x > 0) {
        redCells[i].r = 1;
      } else if (redCells[i].v.x < 0) {
        redCells[i].r = -1;
      } else {
        redCells[i].r = 0;
      }

      redCells[i].r *= Math.abs(redCells[i].r) / 0.5;
    }

    function CalcRotationWhiteCells(i) {
      if (whiteCells[i].v.x > 0) {
        whiteCells[i].r = 1;
      } else if (whiteCells[i].v.x < 0) {
        whiteCells[i].r = -1;
      } else {
        whiteCells[i].r = 0;
      }

      whiteCells[i].r *= Math.abs(whiteCells[i].r) / 0.5;
    }

    for (i = 0; i < numberOfTriangles; i++) {
      triangles[i].Draw();
    }

    for (i = 0; i < numberOfRedCells; i++) {
      redCells[i].Draw();
    }

    for (i = 0; i < numberOfWhiteCells; i++) {
      whiteCells[i].Draw();
    }

    myPaper.view.onFrame = function(event) {
      DoCollisionTriangles();

      DoCollisionRedCells();

      DoCollisionWhiteCells();

      myPaper.view.draw();
    };
  }

  render() {
    return (
      <div>
        <div
          id="wrapper"
          ref="drawArea"
          className="drawArea"
          onMouseMove={this.onMouseMove.bind(this)}
          onMouseDown={this.onMouseDown.bind(this)}>
          <canvas id={this.state.CanvasName} className="canvasFull" />
        </div>
        {/* <KeyboardEventHandler
          handleKeys={['a', 's', 'w', 'd']}
          onKeyEvent={(key, e) => {
            this.SetKey(key);
          }}
        /> */}
      </div>
    );
  }
}
