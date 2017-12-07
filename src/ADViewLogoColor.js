import React, { Component } from 'react';
import paper from 'paper';

export default class ADViewLogoColor extends Component {
        

  constructor(props) {
    super(props);
    console.log(props.CanvasName);
    //this.onMouseDown = this.onMouseDown.bind(this);
    //this.onFrame = this.onFrame.bind(this);
    this.state = { 
      CanvasName: props.CanvasName
    };
  }
          
  componentDidMount(){

    var myCanvas = document.getElementById(this.state.CanvasName);

    var myPaper =  new paper.PaperScope();
    
    myPaper.setup(myCanvas);

    var fcv = this.state.CircleColor;
    var sizeSquare = 20;
    //---- Blobs

    var squarePositions = [];
    var currentPosition = [];
    
    for (var k = 0; k < 7; k++)
    {
        squarePositions.push([100, 50 + (k * (sizeSquare + 10))]);
    }


    for (k = 0; k < 7; k++)
    {
        squarePositions.push([130, (60 + sizeSquare) + (k * (sizeSquare + 10))]);
    }

    for (k = 0; k < 7; k++)
    {
        squarePositions.push([160, 20 + (k * (sizeSquare + 10))]);
    }

    var logoText = [];

   
    var newTextPoint = new Labelinfo(65.0, 190.0, 'a');
    logoText.push(newTextPoint);

    newTextPoint = new Labelinfo(210.0, 190.0, 'd');
    logoText.push(newTextPoint);
       
    //var handle_len_rate = 2.4;
    var squares = [];
    
    for (var i = 0; i < squarePositions.length; i++) {

      var square = new Square(new paper.Point(squarePositions[i][0], squarePositions[i][1]), sizeSquare);
      squares.push(square);

    }    

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

    var steps = 60;

    var colorGreen = 60;

    var colorTarget = 202;

    var line = 0;

    myPaper.view.onFrame = function(event)
    {
       myPaper.project.activeLayer.removeChildren();
    
        if (colorGreen + 1 <= colorTarget)
            colorGreen++;

        if (colorGreen == colorTarget)
        {
            if (line < 3) line++;

            colorGreen = 60;
        }

        for (i = 0; i < (7 * line); i++) {
            var sq = paper.Path.Rectangle(squares[i].topLeft,squares[i].bottomRight);
            sq.fillColor = new paper.Color(60/256, colorTarget/256, 94/256);
        }

        if (line < 3)
        {
            for (i = (7 * line); i < 7 + (line * 7); i++) {
                var sq = paper.Path.Rectangle(squares[i].topLeft,squares[i].bottomRight);
                sq.fillColor = new paper.Color(60/256, colorGreen/256, 94/256);
            }

            for (i = 7 + (line * 7); i < squares.length; i++) {
                var sq = paper.Path.Rectangle(squares[i].topLeft,squares[i].bottomRight);
                sq.fillColor = new paper.Color(60/256, 60/256, 94/256);
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

    return <div id="wrapper"  ref="drawArea" className="drawArea">
              {/* onMouseMove={this.onMouseMove.bind(this)}
              onMouseDown={this.onMouseDown.bind(this)}> */}
            <canvas id={this.state.CanvasName} className="canvasFull">
                
                  </canvas>
                
          </div>;
  }
    
};