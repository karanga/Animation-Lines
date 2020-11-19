import paper from 'paper';

export default class Square {
  constructor(x, y, gridSizeInt) {
    this.myRect1 = null;
    this.x = x;
    this.y = y;
    this.oldX = x;
    this.oldY = y;
    this.ix = 0.0;
    this.iy = 0.0;
    this.intX = x;
    this.intY = y;
    this.incrementX = 1;
    this.incrementY = 1;
    this.isMovingX = false;
    this.isMovingY = false;
    this.vx = 0.6;
    this.vy = 0.3;
    this.gridSize = gridSizeInt;
    this.gridSizeInt = 10;
    this.Stopped = true;
    this.innerRing = [0, 0, 0, 0, 0, 0, 0, 0];
    this.outerRing = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    this.innerRingOffsetX = [-1, 0, 1, 1, 1, 0, -1, -1];
    this.innerRingOffsetY = [-1, -1, -1, 0, 1, 1, 1, 0];

    //inner
    //0 1 2
    //7   3
    //6 5 4
    this.innerLeft = [0, 7, 6];
    this.innerRight = [2, 3, 4];
    this.innerTop = [0, 1, 2];
    this.innerBot = [6, 5, 4];

    //outer
    //0  1  2  3  4
    //15          5
    //14          6
    //13          7
    //12 11 10 9  8
    this.outerLeft = [0, 15, 14, 13, 12];
    this.outerRight = [4, 5, 6, 7, 8];
    this.outerTop = [0, 1, 2, 3, 4];
    this.outerBot = [12, 11, 10, 9, 8];
  }

  SetInner = function(index, v) {
    this.innerRing[index].v = v;
  };

  SetOuter = function(index, v) {
    this.outerRing[index].v = v;
  };

  ShowInner = function() {
    var myLayout = '';

    for (var i = 0; i < 8; i++) {
      myLayout += this.innerRing[i];
    }

    console.log(myLayout);
  };

  StoppedVal = function() {
    return this.Stopped;
  };

  SetStopped = function(isStopped) {
    this.Stopped = isStopped;
  };

  Move = function() {
    this.ix += this.vx / 3.0;
    //console.log(this.ix + ',' + this.vx + ',' + this.incrementX);
    this.iy += this.vy / 3.0;

    var isMoveX = false;
    var isMoveY = false;

    if (!this.isMovingX) {
      if (Math.abs(this.ix) >= Math.abs(this.incrementX)) {
        this.oldX = this.x;
        this.ix = 0.0;
        this.isMovingX = true;
      }
    }

    if (!this.isMovingY) {
      if (Math.abs(this.iy) >= Math.abs(this.incrementY)) {
        this.oldY = this.y;
        this.iy = 0.0;
        this.isMovingY = true;
      }
    }

    var stoppedX = false;
    var stoppedY = false;

    if (
      this.isMovingX &&
      ((this.incrementX > 0 &&
        Math.abs(this.x) >= Math.abs(this.oldX + this.incrementX - this.vx)) ||
        (this.incrementX < 0 &&
          Math.abs(this.x) <= Math.abs(this.oldX + this.incrementX - this.vx)))
    ) {
      this.isMovingX = false;
      this.intX += this.incrementX;
      this.x = this.intX;
    }

    if (
      this.isMovingY &&
      ((this.incrementY > 0 &&
        Math.abs(this.y) >= Math.abs(this.oldY + this.incrementY - this.vy)) ||
        (this.incrementY < 0 &&
          Math.abs(this.y) <= Math.abs(this.oldY + this.incrementY - this.vy)))
    ) {
      this.isMovingY = false;
      this.intY += this.incrementY;
      this.y = this.intY;
    }

    this.Init(this.gridSizeInt, this.gridSizeInt);

    if (this.isMovingX) {
      this.x += this.vx;
    }

    if (this.isMovingY) {
      this.y += this.vy;
    }

    this.myRect1.position = new paper.Point(
      25 + this.gridSize * this.x,
      25 + this.gridSize * this.y
    );

    if (this.vx > 0) {
      //---- bottom Limit
      if (this.innerRing[3] == 2) {
        stoppedX = true;
      }
    } else {
      if (this.intX <= 0) {
        stoppedX = true;
      }
    }

    if (this.vy > 0) {
      //---- bottom Limit
      if (this.innerRing[5] == 2) {
        stoppedY = true;
      }
    } else {
      if (this.intY <= 0) {
        stoppedY = true;
      }
    }

    this.Stopped = stoppedX || stoppedY;

    if (stoppedX) {
      this.vx *= -1;
      this.incrementX *= -1;
    }

    if (stoppedY) {
      this.vy *= -1;
      this.incrementY *= -1;
    }
  };

  Clear = function(myPaper) {
    // var myRect1 = myPaper.Path.Rectangle(
    //   new paper.Point(0 + this.gridSize * this.x, 0 + this.gridSize * this.y),
    //   new paper.Size(this.gridSize, this.gridSize)
    // );
    // myRect1.strokeColor = 'black';
    // myRect1.strokeWidth = 1;
    // myRect1.fillColor = 'white';
  };

  Draw = function(myPaper) {
    this.myRect1 = myPaper.Path.Rectangle(
      new paper.Point(0 + this.gridSize * this.x, 0 + this.gridSize * this.y),
      new paper.Size(this.gridSize, this.gridSize)
    );

    this.myRect1.strokeColor = 'black';
    this.myRect1.strokeWidth = 1;
    this.myRect1.fillColor = 'red';
  };

  DrawInners = function(myPaper) {
    for (var i = 0; i < 8; i++) {
      var xVal = this.x + this.innerRingOffsetX[i];
      var yVal = this.y + this.innerRingOffsetY[i];

      if (this.innerRing[i] === 2) {
        var myRect1 = myPaper.Path.Rectangle(
          new paper.Point(0 + this.gridSize * xVal, 0 + this.gridSize * yVal),
          new paper.Size(this.gridSize, this.gridSize)
        );

        myRect1.strokeColor = 'black';
        myRect1.strokeWidth = 1;
        myRect1.fillColor = 'purple';
      } else {
        var myRect1 = myPaper.Path.Rectangle(
          new paper.Point(0 + this.gridSize * xVal, 0 + this.gridSize * yVal),
          new paper.Size(this.gridSize, this.gridSize)
        );

        myRect1.strokeColor = 'black';
        myRect1.strokeWidth = 1;
        myRect1.fillColor = 'lightgreen';
      }
    }
  };

  Init = function(w, h) {
    var i = 0;
    //if (x is on edge then inner left)
    for (i = 0; i < 8; i++) {
      this.innerRing[i] = 0;
    }

    if (this.intX == 0) {
      for (i = 0; i < 3; i++) {
        this.innerRing[this.innerLeft[i]] = 2;
      }
    }

    //if x one in from left
    if (this.intX == 1) {
      for (i = 0; i < 5; i++) {
        this.outerRing[this.outerLeft[i]] = 2;
      }
    }

    //---- If y on top
    if (this.intY == 0) {
      for (i = 0; i < 3; i++) {
        this.innerRing[this.innerTop[i]] = 2;
      }
    }

    //---- if y near top
    if (this.intY == 1) {
      for (i = 0; i < 5; i++) {
        this.outerRing[this.outerTop[i]] = 2;
      }
    }

    if (this.intX == w - 1) {
      for (i = 0; i < 3; i++) {
        this.innerRing[this.innerRight[i]] = 2;
      }
    }

    if (this.intX == w - 2) {
      for (var i = 0; i < 5; i++) {
        this.outerRing[this.outerRight[i]] = 2;
      }
    }

    if (this.intY == h - 1) {
      for (var i = 0; i < 3; i++) {
        this.innerRing[this.innerBot[i]] = 2;
      }
    }

    if (this.intY == h - 2) {
      for (var i = 0; i < 5; i++) {
        this.outerRing[this.outerBot[i]] = 2;
      }
    }

    //this.ShowInner();
  };
}
