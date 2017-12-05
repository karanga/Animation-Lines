import React, { Component } from 'react';
import paper from 'paper';
import Immutable from 'immutable';

export default class PaperView extends Component {
    
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
        
        myPaper.setup(myCanvas);
            
        //var myCanvasName = this.state.CanvasName;
    
        myPaper.project.currentStyle = {
          //fillColor: 'black'
          
        };
    
        //---- Blobs
    
        var ballPositions = [[255, 129], [610, 73], [486, 363],
        [117, 459], [484, 726], [843, 306], [789, 615], [1049, 82],
        [1292, 428], [1117, 733], [1352, 86], [92, 798]];
    
        var handle_len_rate = 2.4;
        var circlePaths = [];
        var radius = 50;
        for (var i = 0, l = ballPositions.length; i < l; i++) {
          var circlePath = new paper.Path.Circle({
            center: ballPositions[i],
            radius: radius,
            strokeColor: 'black',
            fillColor: 'black'
            
          });
          circlePaths.push(circlePath);
        }
        
        var largeCircle = new paper.Path.Circle({
          center: [676, 433],
          radius: 100,
          strokeColor: 'black',
          fillColor: 'black'
        });
        circlePaths.push(largeCircle);
    
    
        //----------------------------------------------------------
       
        var width = myPaper.view.size.width;
        //var height = paper.view.size.height;
    
        //var count = 400;
        
        // The amount of segment points we want to create:
        var amount = 5;
    
        // The maximum height of the wave:
        var heightWave = 100;
    
        var lineCount = 1;
    
        // Create a new path and style it:
        // var paths = [];
        
        // for( var j =0 ; j < lineCount; j++)
        // {
        //   paths.push(new paper.Path(
        //   {
        //         // 80% black:
        //         strokeColor: 'Red',
        //         strokeWidth: 10,
        //         strokeCap: 'square',
        //         closed: false
        //   }));
        // }
    
    
        // Add 5 segment points to the path spread out
        // over the width of the view:
        // for (i = 0; i <= amount; i++) {
        //   for (j= 0; j < lineCount; j++) {
        //     paths[j].add(new paper.Point((i / amount) * width, heightWave));
        //   }
        // }
    
        // var symbol = new paper.Symbol(path);
    
        // for (var i = 0; i < 2; i++) {
        //   // The center position is a random point in the view:
        //   var center = [path.x, Math.random() * height];
        //   var placedSymbol = symbol.place(center);
          
        // }
    
        // Select the path, so we can see how it is constructed:
        //path.selected = true;
    
        myPaper.view.onMouseMove = function onMouseMove(event) {
          largeCircle.position = event.point;
          generateConnections(circlePaths);
        }
    
        var connections = new paper.Group();
    
        function generateConnections(paths) {
          // Remove the last connection paths:
          connections.children = [];
         
          for (var i = 0, l = paths.length; i < l; i++) {
            for (var j = i - 1; j >= 0; j--) {
              var path = metaball(paths[i], paths[j], 0.5, handle_len_rate, 300);
              if (path) {
                connections.appendTop(path);
                path.removeOnMove();
              }
            }
          }
    
        }
        
        generateConnections(circlePaths);
    
        function metaball(ball1, ball2, v, handle_len_rate, maxDistance) {
          var center1 = ball1.position;
          var center2 = ball2.position;
    
          //console.log(ball1.bounds.width / 2);
    
          var radius1 = ball1.bounds.width / 2;
          var radius2 = ball2.bounds.width / 2;
          var pi2 = Math.PI / 2;
          var d = center1.getDistance(center2);
          var u1, u2;
    
          
          if (radius1 === 0 || radius2 === 0)
            return;
    
            
          if (d > maxDistance || d <= Math.abs(radius1 - radius2)) {
            return;
          } 
          else if (d < radius1 + radius2) { // case circles are overlapping
            u1 = Math.acos((radius1 * radius1 + d * d - radius2 * radius2) /
                (2 * radius1 * d));
            u2 = Math.acos((radius2 * radius2 + d * d - radius1 * radius1) /
                (2 * radius2 * d));
          } else {
            u1 = 0;
            u2 = 0;
          }
        
          var angle1 = center2.subtract(center1).getAngleInRadians();
          var angle2 = Math.acos((radius1 - radius2) / d);
    
         
    
          var angle1a = angle1 + u1 + (angle2 - u1) * v;
          var angle1b = angle1 - u1 - (angle2 - u1) * v;
          var angle2a = angle1 + Math.PI - u2 - (Math.PI - u2 - angle2) * v;
          var angle2b = angle1 - Math.PI + u2 + (Math.PI - u2 - angle2) * v;
          var p1a = center1.add(getVector(angle1a, radius1));
          var p1b = center1.add(getVector(angle1b, radius1));
          var p2a = center2.add(getVector(angle2a, radius2));
          var p2b = center2.add(getVector(angle2b, radius2));
        
          // define handle length by the distance between
          // both ends of the curve to draw
          var totalRadius = (radius1 + radius2);
    
          
          var d2 = Math.min(v * handle_len_rate, (p1a.subtract(p2a)).length / totalRadius);
          
          // case circles are overlapping:
          d2 *= Math.min(1, d * 2 / (radius1 + radius2));
          //console.log(radius1 + ', ' + radius2 + ', ' + d2);
          
          radius1 *= d2;
          radius2 = radius2 * d2;
         
          var path = new paper.Path(
            {
              segments:  [p1a, p2a, p2b, p1b],
              style: ball1.style,
              closed: true
            });
    
            path.smooth();
    
                
          var segments = path.segments;
          segments[0].handleOut = getVector(angle1a - pi2, radius1);
          segments[1].handleIn = getVector(angle2a + pi2, radius2);
    
          segments[2].handleOut = getVector(angle2b - pi2, radius2);
          segments[3].handleIn = getVector(angle1b + pi2, radius1);
          return path;
        }
        
        // ------------------------------------------------
        function getVector(radians, length) {
          return new paper.Point({
            // Convert radians to degrees:
            angle: radians * 180 / Math.PI,
            length: length
          });
        }
    
        myPaper.view.onFrame = function(event)
        {
              
          // for (var j =0; j < lineCount; j++){
    
          
          //   for (var i = 0; i <= amount; i++) {
          //     var segment = paths[j].segments[i];
            
          //       // A cylic value between -1 and 1
          //       var sinus = Math.sin(event.time * 3 + i);
                
          //       // Change the y position of the segment point:
          //       segment.point.y = sinus * heightWave + 100 + (j * 50);
          //   }
          //   // Uncomment the following line and run the script again
          //   // to smooth the path:
          //   paths[j].smooth();
          // }
          
        }
    
        
        // render
        myPaper.view.draw();
    
        
      }
    
      render(){
    
        return <div id="wrapper"  ref="drawArea" className="drawArea"
                  onMouseMove={this.onMouseMove.bind(this)}
                  onMouseDown={this.onMouseDown.bind(this)}>
                <canvas id={this.state.CanvasName} className="canvasFull"> </canvas>
                  
              </div>;
      }
    
    };