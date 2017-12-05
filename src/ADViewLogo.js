import React, { Component } from 'react';
import paper from 'paper';
import Bezier from 'bezier-js';

export default class ADViewLogo extends Component {
        

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

    var squarePositions = [];
    var flightPaths = [];
    var currentPosition = [];
    var bezierCurves = [];
    var curve;

    for (var k = 0; k < 7; k++)
    {
        squarePositions.push([0, 0]);
        flightPaths.push([[0,0], [75,25], [25,75], [100, 100 + (k * 40)]]);
        
    }

    var lineBezier = [];

    for (k = 0; k < 7; k++)
    {
        curve = new Bezier(
            flightPaths[k][0][0],flightPaths[k][0][1], 
            flightPaths[k][1][0],flightPaths[k][1][1],  
            flightPaths[k][2][0],flightPaths[k][2][1] ,
            flightPaths[k][3][0],flightPaths[k][3][1]);

            var lut = curve.getLUT(100);
            
            lineBezier.push(lut);
    }

    bezierCurves.push(lineBezier);

    lineBezier = [];

    for (k = 0; k < 7; k++)
    {
        squarePositions.push([140, 0]);
        flightPaths.push([[140,0], [100,125], [25,75], [140, 140 + (k * 40)]]);
      
    }

    for (k = 0; k < 7; k++)
    {
        curve = new Bezier(
            flightPaths[k + 7][0][0],flightPaths[k + 7][0][1], 
            flightPaths[k + 7][1][0],flightPaths[k + 7][1][1],  
            flightPaths[k + 7][2][0],flightPaths[k + 7][2][1] ,
            flightPaths[k + 7][3][0],flightPaths[k + 7][3][1]);

            var lut = curve.getLUT(100);
            
            lineBezier.push(lut);
    }

    bezierCurves.push(lineBezier);

    lineBezier = [];

    for (k = 0; k < 7; k++)
    {
        squarePositions.push([180, 0]);

        flightPaths.push([[300,0], [375,25], [325,225], [180, 60 + (k * 40)]]);
    

    }
   
    for (k = 0; k < 7; k++)
    {
        curve = new Bezier(
            flightPaths[k + 14][0][0],flightPaths[k + 14][0][1], 
            flightPaths[k + 14][1][0],flightPaths[k + 14][1][1],  
            flightPaths[k + 14][2][0],flightPaths[k + 14][2][1] ,
            flightPaths[k + 14][3][0],flightPaths[k + 14][3][1]);
    
            var lut = curve.getLUT(100);

            lineBezier.push(lut);

    }

    bezierCurves.push(lineBezier);

    
    //var handle_len_rate = 2.4;
    var squares = [];
    var sizeSquare = 30;
    for (var i = 0, l = squarePositions.length; i < l; i++) {

      var square = new Square(new paper.Point(squarePositions[i][0], squarePositions[i][1]), sizeSquare);
      squares.push(square);
    }    
    
      
    // Define a circle centered at (x,y) with radius r
    function Square(topLeft, width) {
      this.topLeft = topLeft;
      this.width = width;
      this.bottomRight = new paper.Point(topLeft.x + width, topLeft.y + width);
    }

    var steps = 30;

    var dX       = 0;
    var dY       = 0;


    var currentPosition = 1;
    var delay = 0;
        
    myPaper.view.onFrame = function(event)
    {
       myPaper.project.activeLayer.removeChildren();
    
    //    for (var t = 0; t < flightPaths.length; t++)
    //    {
    //         var flightPath = new paper.Path({
    //             segments: flightPaths[t],
    //             strokeColor: 'lightgray',
    //             dashArray: [10, 12]
    //         });
    //         flightPath.smooth();
    //     }

        for (var j = 0; j < squares.length; j++)
        {

            
            
            dX = (flightPaths[j][currentPosition][0] - squares[j].topLeft.x)/steps;
            dY = (flightPaths[j][currentPosition][1] - squares[j].topLeft.y)/steps;

           // console.log(dX + ", " + dY);
            squares[j].topLeft.x += dX;
            squares[j].topLeft.y += dY;

            squares[j].bottomRight.x = squares[j].topLeft.x + squares[j].width;
            squares[j].bottomRight.y = squares[j].topLeft.y + squares[j].width;

            if (dX < 1 && dY < 1 && dX > 0 && dY > 0)
            {
                dX = 0;
                dY = 0;

                console.log(currentPosition);
                if (currentPosition < 3)
                    currentPosition++;
            }
        }
       
        for (i = 0; i < squares.length; i++) {
            var sq = paper.Path.Rectangle(squares[i].topLeft,squares[i].bottomRight);
            sq.fillColor = 'green';
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