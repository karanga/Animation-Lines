import React, { Component } from 'react';
import paper from 'paper';

export default class SmoothCurve extends Component {
        

  constructor(props) {
    super(props);
    //console.log(props.CanvasName);
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
          
  componentDidMount(){

    var myCanvas = document.getElementById(this.state.CanvasName);

    var myPaper =  new paper.PaperScope();
    
    myPaper.setup(myCanvas);

    var circle = paper.Path.Circle({
      center: new paper.Point(100, 100),
      radius: 50,
      strokeColor: 'black',
      strokeWidth: 20
    });


    // createjs.Tween.get( circle.center, { loop: true } )
    // .to( { x: 300 }, 1000, createjs..Tween.Ease.quadOut )
    // .call( function() {
    //   console.log( 'done!' );
    // } );
  
    // var update = function() {
    //   myPaper.view.draw();
    // }


  
    // createjs.Tween.Ticker.setFPS( 60 );
    // createjs.Tween.Ticker.addEventListener( 'tick', update );

    // var flightPaths = [];

    // flightPaths.push([[0,0], [25,75], [400, 400]]);

    // var smoothedFlights = getCurvePoints(flightPaths,0.5,16);
    
    // function getCurvePoints(pts, tension, numOfSegments) {
      
    //   // use input value if provided, or use a default value   
    //   tension = (typeof tension != 'undefined') ? tension : 1.5;
    //   numOfSegments = numOfSegments ? numOfSegments : 8;
  
    //   var _pts = [], res = [],    // clone array
    //       x, y,           // our x,y coords
    //       t1x, t2x, t1y, t2y, // tension vectors
    //       c1, c2, c3, c4,     // cardinal points
    //       st, t, i;       // steps based on num. of segments
  
    //   // clone array so we don't change the original
    //   //_pts = pts.splice();

    //   _pts.push(pts[0][0]);
  
    //   console.log(numOfSegments);

    //   for (i = 0; i < pts[0].length; i++)
    //   {
    //     _pts.push(pts[0][i]);
    //     console.log(pts[0][i]);
    //   }

    //   _pts.push(pts[pts[0].length - 1]);
    //   // The algorithm require a previous and next point to the actual point array.
    //   // If open, duplicate first points to befinning, end points to end
      
  
    //   // ok, lets start..

    //   console.log(pts.length + "," + _pts.length);
  

    //   for (i=1; i < (_pts.length - 3); i++) {
    //     for (t=0; t <= numOfSegments; t++) {

    //         // calc tension vectors
    //         t1x = (_pts[i+1][0] - _pts[i-1][0]) * tension;
    //         t2x = (_pts[i+2][0] - _pts[i][0]) * tension;

    //         t1y = (_pts[i+1][1] - _pts[i-1][1]) * tension;
    //         t2y = (_pts[i+2][1] - _pts[i][1]) * tension;

    //         // calc step
    //         st = t / numOfSegments;

    //         // calc cardinals
    //         c1 =   2 * Math.pow(st, 3)  - 3 * Math.pow(st, 2) + 1; 
    //         c2 = -(2 * Math.pow(st, 3)) + 3 * Math.pow(st, 2); 
    //         c3 =       Math.pow(st, 3)  - 2 * Math.pow(st, 2) + st; 
    //         c4 =       Math.pow(st, 3)  -     Math.pow(st, 2);

    //         // calc x and y cords with common control vectors
    //         x = c1 * _pts[i][0]    + c2 * _pts[i+1][0] + c3 * t1x + c4 * t2x;
    //         y = c1 * _pts[i][1]  + c2 * _pts[i+1][1] + c3 * t1y + c4 * t2y;

    //         //store points in array
    //         res.push([x,y]);

    //         console.log(res[res.length - 1]);
    //       }

    //     }
    
  
    //   return res;
    // }
       
  //   myPaper.view.onFrame = function(event)
  //   {
  //      myPaper.project.activeLayer.removeChildren();

  //     //  for (var t = 0; t < flightPaths.length; t++)
  //     //  {
  //     //       var flightPath = new paper.Path({
  //     //           segments: flightPaths[t],
  //     //           strokeColor: 'lightgray',
  //     //           dashArray: [10, 12]
  //     //       });
  //     //       //flightPath.smooth();
  //     //   }
    
        
  //       var smoothPath = new paper.Path({
  //           segments: smoothedFlights,
  //           strokeColor: 'red',
  //           //dashArray: [10, 12]
  //       });
  //       //flightPath.smooth();
        
      
  //   }
    
        
    
        
  //   // render
  //   myPaper.view.draw();
    
        
   }
    
        
    
        
          
        
    
  render(){

    return <div id="wrapper"  ref="drawArea" className="drawArea">
              {/* onMouseMove={this.onMouseMove.bind(this)}
              onMouseDown={this.onMouseDown.bind(this)}> */}
            <canvas id={this.state.CanvasName} className="canvasFull">
                
                  </canvas>
                  {this.state.CanvasName}
          </div>;
  }
    
};