import React, { Component } from 'react';
import paper from 'paper';
import Bezier from 'bezier-js';
import Immutable from 'immutable';

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

        
  }
          
  componentDidMount(){

    var myCanvas = document.getElementById(this.state.CanvasName);

    var myPaper =  new paper.PaperScope();
    
    myPaper.setup(myCanvas);

    var fcv = this.state.CircleColor;
    var sizeSquare = 20;
    //---- Blobs

    var squarePositions = [];
    var flightPaths = [];
    var currentPosition = [];
    var bezierCurves = [];
    var curve;

    

    var textFlightPaths = [];
    var textBezierCurves = [];

    textFlightPaths.push([[25.0,-30.0], [75.0,125.0], [0.0,175.0], [65.0, 190.0]]);

    textFlightPaths.push([[360.0,-30.0], [255.0,25.0], [225.0,75.0], [210.0, 190.0]]);

    var lineBezier = [];

    for (var k = 0; k < 2; k++)
    {
        curve = new Bezier(
            textFlightPaths[k][0][0],textFlightPaths[k][0][1], 
            textFlightPaths[k][1][0],textFlightPaths[k][1][1],  
            textFlightPaths[k][2][0],textFlightPaths[k][2][1] ,
            textFlightPaths[k][3][0],textFlightPaths[k][3][1]);
    
            var lut = curve.getLUT(100);
                        
            textBezierCurves.push(lut);

    }

    for (k = 0; k < 7; k++)
    {
        squarePositions.push([0, 0]);
        flightPaths.push([[0,0], [75,25], [25,75], [100, 50 + (k * (sizeSquare + 10))]]);
        
    }

    lineBezier = [];

    for (k = 0; k < 7; k++)
    {
        curve = new Bezier(
            flightPaths[k][0][0],flightPaths[k][0][1], 
            flightPaths[k][1][0],flightPaths[k][1][1],  
            flightPaths[k][2][0],flightPaths[k][2][1] ,
            flightPaths[k][3][0],flightPaths[k][3][1]);

            lut = curve.getLUT(100);
            
            lineBezier.push(lut);
    }

    bezierCurves.push(lineBezier);

    lineBezier = [];

    for (k = 0; k < 7; k++)
    {
        squarePositions.push([140, 0]);
        flightPaths.push([[140,0], [100,125], [25,75], [130, (60 + sizeSquare) + (k * (sizeSquare + 10))]]);
      
    }

    for (k = 0; k < 7; k++)
    {
        curve = new Bezier(
            flightPaths[k + 7][0][0],flightPaths[k + 7][0][1], 
            flightPaths[k + 7][1][0],flightPaths[k + 7][1][1],  
            flightPaths[k + 7][2][0],flightPaths[k + 7][2][1] ,
            flightPaths[k + 7][3][0],flightPaths[k + 7][3][1]);

            lut = curve.getLUT(100);
            
            lineBezier.push(lut);
    }

    bezierCurves.push(lineBezier);

    lineBezier = [];

    for (k = 0; k < 7; k++)
    {
        squarePositions.push([180, 0]);

        flightPaths.push([[300,0], [375,25], [325,225], [160, 20 + (k * (sizeSquare + 10))]]);
    

    }
   
    for (k = 0; k < 7; k++)
    {
        curve = new Bezier(
            flightPaths[k + 14][0][0],flightPaths[k + 14][0][1], 
            flightPaths[k + 14][1][0],flightPaths[k + 14][1][1],  
            flightPaths[k + 14][2][0],flightPaths[k + 14][2][1] ,
            flightPaths[k + 14][3][0],flightPaths[k + 14][3][1]);
    
            lut = curve.getLUT(100);

            lineBezier.push(lut);

    }

    bezierCurves.push(lineBezier);

    //console.log(bezierCurves);

    var bezierControlPoint0 = new paper.Point();

    var logoText = [];

    var labelVal = 'a';
    
    for (i = 0; i < 2; i++)
    {
        if (i == 1) labelVal = 'd'
        var newTextPoint = new Labelinfo((180 * i), -30, labelVal);
        logoText.push(newTextPoint);
    }
    
    //var handle_len_rate = 2.4;
    var squares = [];
    
    for (var i = 0; i < squarePositions.length; i++) {

      var square = new Square(new paper.Point(squarePositions[i][0], squarePositions[i][1]), sizeSquare);
      squares.push(square);

      //console.log(square);
    }    

    // for (i = 0; i < 2; i++)
    // {
    //     console.log("a:" + logoText[i].textPosX);
    // }


    function Labelinfo(textPosX, textPosY, textAD) {
        this.textPosX = textPosX;
        this.textPosY = textPosY;
        this.textAD = textAD;

    }
         
    // Define a circle centered at (x,y) with radius r
    function Square(topLeft, width) {
      this.topLeft = topLeft;
      this.width = width;
      this.bottomRight = new paper.Point(topLeft.x + width, topLeft.y + width);
    }

    var steps = 5;

    var dX       = 0;
    var dY       = 0;


    var currentPosition = 1;
    var currentTextPos = 0;
    var delay = 0;

    myPaper.view.onMouseMove = function onMouseMove(event) {
        bezierControlPoint0 = event.point;
        //console.log(bezierControlPoint0);
      }

      myPaper.view.onMouseDown = function onMouseDown(event) {
        
        currentPosition = 1;
        currentTextPos = 0;
      }
        
    myPaper.view.onFrame = function(event)
    {
       myPaper.project.activeLayer.removeChildren();

       var controlPointP0 = new paper.Path.Circle();
       controlPointP0.position = new paper.Point(10,10);;
       controlPointP0.strokeColor = new paper.Color(0.6);
       controlPointP0.radius = 100;

       var path2 = new paper.Path.Circle({
            center: bezierControlPoint0,
            radius: 6,
            fillColor: 'white',
            strokeColor: new paper.Color(0.7),
            strokeWidth: 4
        });
    
    //    for (var t = 0; t < flightPaths.length; t++)
    //    {
    //         var flightPath = new paper.Path({
    //             segments: flightPaths[t],
    //             strokeColor: 'lightgray',
    //             dashArray: [10, 12]
    //         });
    //         flightPath.smooth();
    //     }

        dX = 0;
        dY = 0;
    
        for (var line = 0; line < 3; line++)
        {

            for (var j = 0; j < 7; j++)
            {

                dX = (bezierCurves[line][j][currentPosition].x - squares[j + (line * 7)].topLeft.x)/steps;
                dY = (bezierCurves[line][j][currentPosition].y - squares[j + (line * 7)].topLeft.y)/steps;

                //console.log(dX & ", " & dY);
                squares[j + (line * 7)].topLeft.x += dX;
                squares[j + (line * 7)].topLeft.y += dY;

                squares[j + (line * 7)].bottomRight.x = squares[j + (line * 7)].topLeft.x + squares[j + (line * 7)].width;
                squares[j + (line * 7)].bottomRight.y = squares[j + (line * 7)].topLeft.y + squares[j + (line * 7)].width;

                if (Math.abs(dX) < 1 && Math.abs(dY) < 1 && Math.abs(dX) > 0 && Math.abs(dY) > 0)
                {
                    dX = 0;
                    dY = 0;

                    //console.log(currentPosition);
                    if (currentPosition < bezierCurves[line][j].length - 1)
                        currentPosition++;
                    
                    if (currentPosition == bezierCurves[line][j].length - 1)
                        if (currentTextPos == 0) currentTextPos = 1;
                }
            }
        
            for (i = 0; i < squares.length; i++) {
                var sq = paper.Path.Rectangle(squares[i].topLeft,squares[i].bottomRight);
                sq.fillColor = '#3cca5e';
            }
        }

        // for (i = 0; i < 2; i++)
        // {
        //     console.log("b:" & logoText[i].textPosX);
        //     //console.log(textBezierCurves[i]);
        // }
    
        //console.log(currentTextPos);

        if (currentTextPos > 0)
        {
            steps = 2;
            console.log(currentTextPos);
        
            for (line = 0; line < 2; line++)
            {
                
                //dx not beingf set
                dX = (textBezierCurves[line][currentTextPos].x - logoText[line].textPosX)/steps;
                dY = (textBezierCurves[line][currentTextPos].y - logoText[line].textPosY)/steps;

                logoText[line].textPosX += dX;
                logoText[line].textPosY += dY;

                //console.log(dX);
                //console.log(textBezierCurves[line][currentTextPos]);
                //console.log(logoText[line].textPosX);
                if (Math.abs(dX) < 1 && Math.abs(dY) < 1 && Math.abs(dX) > 0 && Math.abs(dY) > 0)
                {
                    dX = 0;
                    dY = 0;

                    
                    if (currentTextPos < textBezierCurves[line].length - 1)
                        currentTextPos++;
                
                }
                
            }

            
        }

        for (i = 0; i < logoText.length; i++)
        {
            var textA = new paper.PointText(new paper.Point(logoText[i].textPosX, logoText[i].textPosY));
            textA.justification = 'center';
            textA.fillColor = '#454a54';
            textA.content = logoText[i].textAD;
            textA.fontSize = "72pt";
        }
        
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