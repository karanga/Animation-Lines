import React, { Component } from 'react';
import paper from 'paper';

export default class CircleSimple extends Component {
        

  constructor(props) {
    super(props);
    console.log(props.CanvasName);
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

    var fcv = this.state.CircleColor;

    //---- Blobs

    var ballPositions = [[100, 100]];

    //var handle_len_rate = 2.4;
    var circles = [];
    var radius = 30;
    for (var i = 0, l = ballPositions.length; i < l; i++) {



      var circle = new Circle(ballPositions[i][0],ballPositions[i][1], radius);
      circles.push(circle);
    }
        
      
    // Define a circle centered at (x,y) with radius r
    function Circle(x,y,r) {
      this.x = x;
      this.y = y;
      this.r = r;
    }
       
    myPaper.view.onFrame = function(event)
    {
       myPaper.project.activeLayer.removeChildren();
    
      //console.log("Cs" + circles[0].x);
      for (i = 0; i < circles.length; i++) {
        paper.Path.Circle({
          center: new paper.Point(circles[i].x, circles[i].y),
          radius: 200,
          strokeColor: 'black',
          strokeWidth: 20,
          fillColor: fcv
          
        });
      
      }
      
    }
    
        
    
        
    // render
    myPaper.view.draw();
    
        
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