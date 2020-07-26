let app = new PIXI.Application({ antialias: true, width: 375, height: 400});
document.body.appendChild(app.view);

app.stage.interactive = true;
app.renderer.backgroundColor = 0x000000;

H = 375;
W = 400;
circle_r = 160;

const ctx = new PIXI.Graphics();
app.stage.addChild(ctx);
ctx.x = 0;
ctx.y = 0;

let cursor = new Vector(W/2,H/2);
function mousemove(event) {
  cursor.x = event.pageX - canvas.offsetLeft;
  cursor.y = event.pageY - canvas.offsetTop;
}

class Point {
  constructor(x, y, token_number, num_number ) {
    this.position = new Vector(x, y);
    this.acceleration = new Vector(0, 0).fromAngle(Util.random(0,TWO_PI));
    this.velocity = new Vector(0, 0);
    this.radius = 10 + 25*num_number/100;
    this.zone = this.radius + 80;
    this.c = Util.random(0,360);
    this.min_radius = 0.7 * this.radius;
    this.max_radius = this.radius;
    this.token_number = token_number;
    this.num_number = num_number;
  }
  display() {
    
    var color

    if(this.token_number == 0 ){
      color = 0xFF3333;
    }
    else if(this.token_number == 10){
      color = 0x00BBFF;
    }
    else if(this.token_number == 20){
      color = 0xFFFF00;
    }
    else if(this.token_number == 30){
      color = 0x00FF00;
    }
    else if(this.token_number == 40){
      color = 0xFF3EFF;
    }

    ctx.beginFill(color,Util.map(this.radius, this.min_radius, this.max_radius, 1, 0.3))
    ctx.drawCircle(this.position.x, this.position.y, this.radius)
    ctx.endFill();
  }

  integrate() {
    let force  = new Vector(0,0).fromAngle(this.position.angle(cursor));
    force.setMag(0.1);
    this.addForce(force);
    
    this.radius = Util.map(this.velocity.mag(), 0, 2, this.min_radius, this.max_radius);
    this.velocity.add(this.acceleration);
    //this.velocity.mult(0.98);
    this.velocity.limit(2);
    this.position.add(this.velocity);
    this.acceleration.reset();
  }
  addForce(force) {
    this.acceleration.add(force);
  }
  detection(others) {
    for (let i = 0; i < others.length; i++) {
      let other = others[i];
      if (this === other) continue;
      let dist = this.position.dist(other.position),
        max_dist = this.zone + other.radius;
      if ( max_dist - dist >= 0) {
        let angle = other.position.angle(this.position);
        let force = new Vector().fromAngle(angle);
        force.setMag(Util.map(dist, 0, max_dist, 0.2, 0));
        this.addForce(force);
      }
    }
  }
  bound() {
    let dist = this.position.dist(cursor);
    if (dist > W/3) {
      let force = new Vector(0,0).fromAngle(this.position.angle(cursor));
      force.setMag(Util.map(dist,0,W/3,0,0.02));
      this.addForce(force);
    }
  }
}

var sum_pre = Math.random()*8+1;
const sum = parseInt(sum_pre);
const sum_max = 8;
const sum_min = 0;
var numberList = new Array(5);

for (var i=0;i<numberList.length;i++){
  numberList[i] = Math.random()*101;
}

let points = [];

for (let i = 0; i < numberList.length; i++) {
  points.push(new Point(cursor.x,cursor.y,10*i,numberList[i]));
}

//ctx.fillStyle = "#000";
//ctx.fillRect(0,logo_H,W,H);


function loop() {
 
  ctx.clear();
  ctx.beginFill(0x000000,0.26);
  ctx.drawRect(0, 0, W, H);
  ctx.endFill();


  points.forEach(point => {
    point.detection(points);
  });
  points.forEach(point => {
    point.display();
    //point.bound();
    point.integrate();
  });
  requestAnimationFrame(loop);
}
loop();
