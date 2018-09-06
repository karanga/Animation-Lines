import React, { Component } from 'react';
import paper from 'paper';
import Immutable from 'immutable';

export default class SquareView extends Component {
        
      constructor(props) {
        super(props);
        
        //this.onMouseDown = this.onMouseDown.bind(this);
        //this.onFrame = this.onFrame.bind(this);
        this.state = { 
          seconds: 0,
          CanvasName: props.CanvasName,
          CircleColor: props.CircleColor,
          xS: 0, 
          yS: 0, 
          xC: 0, 
          yC: 0
        };
      }
    
    
      relativeCoordinatesForEvent(mouseEvent) {
        
          const boundingRect = this.refs.drawArea.getBoundingClientRect();
    
          this.setState({ xS: mouseEvent.clientX - boundingRect.left , yS: mouseEvent.clientY - boundingRect.top  });
         
          return new Immutable.Map({
            x: mouseEvent.clientX - boundingRect.left,
            y: mouseEvent.clientY - boundingRect.top,
          });
        
        
      }
    
      onMouseMove(e)
      {
        
        //const point = this.relativeCoordinatesForEvent(e);
    
        this.setState({ xC: e.clientX , yC: e.clientY  });
    
      }
    
      onMouseDown(e) {
        // Add a segment to the path at the position of the mouse:
        this.setState({ xC: e.clientX , yC:e.clientY  });
    
        this.setState((prevState) => ({
          seconds: prevState.seconds + 1,
          path: prevState.path
        }));
        
      }
    
      
      componentDidMount(){
    
        var myCanvas = document.getElementById(this.state.CanvasName);

        var myPaper =  new paper.PaperScope();

        var xVal = 0;
        var yVal = 0;
        
        myPaper.setup(myCanvas);
        
         myPaper.project.currentStyle = {
           
        };
    
        //---- Blobs
    
        var ballPositions = [[200,200], [300, 250], [300, 150]];
    
        //var handle_len_rate = 2.4;
         var circles = [];
        var radius = 100;
        for (var i = 0, l = ballPositions.length; i < l; i++) {
          
    
    
          var circle = new Circle(ballPositions[i][0],ballPositions[i][1], radius);
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
    function Circle(x,y,r) {
      this.x = x;
      this.y = y;
      this.r = r;
    }

    function Arc(pMiddle,p0,p1) {
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
        return new Point(fp.x+xRot,fp.y+yRot);
      }
    
    
    
    
        myPaper.view.onMouseMove = function onMouseMove(event) {
          
          circles[0].x = event.point.x;
          circles[0].y = event.point.y;
          
        }
    
        myPaper.Path.Circle({
            center: new paper.Point(100, 100),
            radius: 50,
            strokeColor: 'black',
            strokeWidth: 1
            
          });

          const gridWidth = 80;
          const gridHeight = 40;
          const gridSize = 20;
        
          for (var i = 0; i < gridWidth; i++) {
            for (var j = 0; j < gridHeight; j++) {

                var myRect1 = myPaper.Path.Rectangle(new paper.Point(0 + (gridSize * i),0 + (gridSize * j)), new paper.Size(gridSize,gridSize));

                myRect1.strokeColor = 'black';
                myRect1.strokeWidth = 1;
              
                if ((i == xVal) && (j == yVal))
                {
                    myRect1.fillColor = 'green';
                }


            }
        }
    
        myPaper.view.onFrame = function(event)
        {
         
          //myPaper.project.activeLayer.removeChildren();
    
          var myRect1 = myPaper.Path.Rectangle(new paper.Point(0 + (gridSize * xVal),0 + (gridSize * yVal)), new paper.Size(gridSize,gridSize));

            myRect1.strokeColor = 'black';
            myRect1.strokeWidth = 1;
            
            myRect1.fillColor = 'white';
          


          

            xVal++;
            
            if (xVal == gridWidth)
            {
                xVal = 0;
                yVal++;

                if (yVal == gridHeight)
                {
                    yVal = 0;
                }
            }
          
            myRect1 = myPaper.Path.Rectangle(new paper.Point(0 + (gridSize * xVal),0 + (gridSize * yVal)), new paper.Size(gridSize,gridSize));

            myRect1.strokeColor = 'black';
            myRect1.strokeWidth = 1;
            
            myRect1.fillColor = 'green';
            

            }
        
            // render
            myPaper.view.draw();
           
      }
           
    
      render(){
    
        return <div id="wrapper"  ref="drawArea" className="drawArea">
                  {/* onMouseMove={this.onMouseMove.bind(this)}
                  onMouseDown={this.onMouseDown.bind(this)}> */}
                <canvas id={this.state.CanvasName} className="canvasFull" >
                    
                </canvas>
                  
              </div>;
      }
    
    };