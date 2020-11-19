import paper from 'paper';

export default class Triangle {
  constructor(p, s, l, v, myPaper) {
    this.p = p;
    this.s = s;
    this.l = l;
    this.v = v;
    this.r = 1;
    this.myPaper = myPaper;

    //console.log(this.p.x);
  }

  Draw = function() {
    var arm1 = new this.myPaper.Path({
      strokeColor: 'black',
      strokeWidth: 2,
      strokeCap: 'round'
    });

    //----- Needs to be in radian
    var angleInRads = (60.0 * Math.PI) / 180.0;
    var h = Math.sin(angleInRads) * this.s;

    var midh = Math.tan(angleInRads / 2) * (this.s / 2);

    var legh = Math.sin(angleInRads) * (this.s / 2);
    var legw = Math.cos(angleInRads) * (this.s / 2);

    var leglineh = Math.sin(angleInRads / 2) * this.l;
    var leglinew = Math.cos(angleInRads / 2) * this.l;

    var bladeh0 = Math.sin(angleInRads) * this.l;
    var bladew0 = Math.cos(angleInRads) * this.l;

    var bladeh0 = Math.sin(angleInRads) * this.l;
    var bladew0 = Math.cos(angleInRads) * this.l;

    // console.log(h);
    //console.log(midh);

    var midy = this.p.y - h + midh;

    arm1.add(new paper.Point(this.p.x, midy));
    arm1.add(new paper.Point(this.p.x + this.s / 2, midy + h));
    arm1.add(new paper.Point(this.p.x - this.s / 2, midy + h));
    arm1.add(new paper.Point(this.p.x, midy));

    var centre1 = this.myPaper.Path.Circle({
      center: this.p,
      radius: h,
      strokeColor: 'green'
    });

    var centre = this.myPaper.Path.Circle({
      center: this.p,
      radius: 1,
      strokeColor: 'blue',
      fillColor: 'blue'
    });

    this.group = new paper.Group();

    var pleg0 = new paper.Point(this.p.x + this.s / 2 - legw, midy + h - legh);
    var plegLine0 = new paper.Point(
      this.p.x + this.s / 2 - legw + leglinew,
      midy + h - legh - leglineh
    );

    var leg0 = this.myPaper.Path.Circle({
      center: pleg0,
      radius: 4,
      strokeColor: 'green'
    });

    var pleg1 = new paper.Point(this.p.x, midy + h);

    var plegLine1 = new paper.Point(this.p.x, pleg1.y + this.l);

    var leg1 = this.myPaper.Path.Circle({
      center: pleg1,
      radius: 4,
      strokeColor: 'red'
    });

    var pleg2 = new paper.Point(this.p.x - this.s / 2 + legw, midy + h - legh);

    var plegLine2 = new paper.Point(
      this.p.x - (this.s / 2 - legw + leglinew),
      midy + h - legh - leglineh
    );

    var leg2 = this.myPaper.Path.Circle({
      center: pleg2,
      radius: 4,
      strokeColor: 'red'
    });

    var legLine0 = new this.myPaper.Path({
      strokeColor: 'purple',
      strokeWidth: 2,
      strokeCap: 'round'
    });

    legLine0.add(pleg0);
    legLine0.add(plegLine0);

    var legLine1 = new this.myPaper.Path({
      strokeColor: 'purple',
      strokeWidth: 2,
      strokeCap: 'round'
    });

    legLine1.add(new paper.Point(this.p.x, midy + h));
    legLine1.add(new paper.Point(this.p.x, midy + h + this.l));

    var legLine2 = new this.myPaper.Path({
      strokeColor: 'purple',
      strokeWidth: 2,
      strokeCap: 'round'
    });

    legLine2.add(
      new paper.Point(this.p.x - this.s / 2 + legw, midy + h - legh)
    );
    legLine2.add(
      new paper.Point(
        this.p.x - this.s / 2 + legw - leglinew,
        midy + h - legh - leglineh
      )
    );

    var l1 = this.l / 1.3;
    var l2 = this.l / 1.4;

    var w0 = Math.cos(angleInRads / 2) * l1;
    var h0 = Math.sin(angleInRads / 2) * l1;

    var w1 = Math.cos(angleInRads) * l2;
    var h1 = Math.sin(angleInRads) * l2;

    var pBladeCentre0 = new paper.Point(pleg0.x + w0, pleg0.y - h0);
    var pBladeCentre1 = new paper.Point(pleg1.x, pleg1.y + l1);
    var pBladeCentre2 = new paper.Point(pleg2.x - w0, pleg2.y - h0);

    var pBlade0p0 = new paper.Point(pBladeCentre0.x - w1, pBladeCentre0.y - h1);
    var pBlade0p1 = new paper.Point(pBladeCentre0.x + w1, pBladeCentre0.y + h1);

    var pBlade1p0 = new paper.Point(pBladeCentre1.x - l2, pBladeCentre1.y);
    var pBlade1p1 = new paper.Point(pBladeCentre1.x + l2, pBladeCentre1.y);

    var pBlade2p0 = new paper.Point(pBladeCentre2.x - w1, pBladeCentre2.y + h1);
    var pBlade2p1 = new paper.Point(pBladeCentre2.x + w1, pBladeCentre2.y - h1);

    var bladeCenter0 = this.myPaper.Path.Circle({
      center: pBladeCentre0,
      radius: 4,
      strokeColor: 'blue'
    });

    var bladeCenter1 = this.myPaper.Path.Circle({
      center: pBladeCentre1,
      radius: 4,
      strokeColor: 'blue'
    });

    var bladeCenter2 = this.myPaper.Path.Circle({
      center: pBladeCentre2,
      radius: 4,
      strokeColor: 'blue'
    });

    var bladeStart0 = this.myPaper.Path.Circle({
      center: pBlade0p0,
      radius: 4,
      strokeColor: 'blue'
    });

    var bladeEnd0 = this.myPaper.Path.Circle({
      center: pBlade0p1,
      radius: 4,
      strokeColor: 'green'
    });

    var bladeStart1 = this.myPaper.Path.Circle({
      center: pBlade1p0,
      radius: 4,
      strokeColor: 'purple'
    });

    var bladeEnd1 = this.myPaper.Path.Circle({
      center: pBlade1p1,
      radius: 4,
      strokeColor: 'green'
    });

    var bladeStart2 = this.myPaper.Path.Circle({
      center: pBlade2p0,
      radius: 4,
      strokeColor: 'blue'
    });

    var bladeEnd2 = this.myPaper.Path.Circle({
      center: pBlade2p1,
      radius: 4,
      strokeColor: 'green'
    });

    var legEnd0 = this.myPaper.Path.Circle({
      center: plegLine0,
      radius: 4,
      strokeColor: 'blue'
    });

    var legEnd1 = this.myPaper.Path.Circle({
      center: plegLine1,
      radius: 4,
      strokeColor: 'green'
    });

    var legEnd2 = this.myPaper.Path.Circle({
      center: plegLine2,
      radius: 4,
      strokeColor: 'red',
      fillColor: 'blue'
    });

    var blade0 = new paper.Path.Arc(pBlade0p0, plegLine0, pBlade0p1);
    blade0.strokeColor = 'black';
    blade0.strokeWidth = 1;

    var blade1 = new paper.Path.Arc(pBlade1p0, plegLine1, pBlade1p1);
    blade1.strokeColor = 'red';
    blade1.strokeWidth = 1;

    var blade2 = new paper.Path.Arc(pBlade2p0, plegLine2, pBlade2p1);
    blade2.strokeColor = 'black';
    blade2.strokeWidth = 1;

    //this.group.addChild(this.triangle);
    this.group.addChild(centre1);
    this.group.addChild(arm1);
    this.group.addChild(centre);
    this.group.addChild(leg0);
    this.group.addChild(leg1);
    this.group.addChild(leg2);
    this.group.addChild(legLine0);
    this.group.addChild(legLine1);
    this.group.addChild(legLine2);
    this.group.addChild(blade0);
    this.group.addChild(blade1);
    this.group.addChild(blade2);

    this.group.addChild(bladeCenter0);
    this.group.addChild(bladeStart0);
    this.group.addChild(bladeEnd0);
    this.group.addChild(legEnd0);

    this.group.addChild(bladeCenter1);
    this.group.addChild(bladeStart1);
    this.group.addChild(bladeEnd1);
    this.group.addChild(legEnd1);

    this.group.addChild(bladeCenter2);
    this.group.addChild(bladeStart2);
    this.group.addChild(bladeEnd2);
    this.group.addChild(legEnd2);
  };

  Move = function() {
    this.p.x += this.v.x;
    this.p.y += this.v.y;
    this.group.position = this.p;
    this.group.rotate(this.r);
  };
}
