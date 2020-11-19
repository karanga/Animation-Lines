import paper from 'paper';

export default class RedBloodCell {
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
    var centre1 = this.myPaper.Path.Circle({
      center: this.p,
      radius: this.s,
      strokeColor: 'red'
    });

    var centre = this.myPaper.Path.Circle({
      center: this.p,
      radius: this.s - this.l,
      strokeColor: 'red',
      fillColor: 'red'
    });

    this.group = new paper.Group();

    //this.group.addChild(this.triangle);
    this.group.addChild(centre1);
    this.group.addChild(centre);
  };

  Move = function() {
    this.p.x += this.v.x;
    this.p.y += this.v.y;
    this.group.position = this.p;
    this.group.rotate(this.r);
  };
}
