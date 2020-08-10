let app = new PIXI.Application({ antialias: true, width: 600, height: 600});
document.body.appendChild(app.view);

app.stage.interactive = true;
app.renderer.backgroundColor = 0x000000;


w = 600;
h = 600;
cx = (w / 2);
cy = (h / 2);
rings = [];
ringsLength = 0;

PI = Math.PI;
PI_HALF = PI / 2;
cos = Math.cos;
sin = Math.sin;
random = Math.random;

lineWidth = 0.2;
C = ["0xABF8FF", "0xE76B76", "0x1D2439", "0x4F3762", "0x67F9FF", "0x0C0F18"];
Color = ["0x00334E", "0x145374", "0x5588a3", "0xf1bc31", "0xe25822", "0xb22222", "0x7c0a02"];
  
data = [
  [
    {t:180, r:(cx-30),  d:40, s:40, c:Color[6]},
     {t:80, r:(cx-40),  d:20, s:40, c:Color[6]},
     {t:20, r:(cx-50), d:20, s:40, c:C[2]},
     {t:40, r:(cx-60), d:20, s:40, c:C[2]},
  ],
  [
    {t:160, r:(cx-70), d:40, s:20, c:C[2]},
     {t:20, r:(cx-80), d:30, s:60, c:C[2]},
     {t:40, r:(cx-90), d:40, s:60, c:C[2]},
  ],
  [
    {t:40, r:(cx-170), d:40, s:20, c:C[5]},
     {t:20, r:(cx-180), d:20, s:10, c:C[5]},
  ],

];

data.forEach(function(group) {
  var ring = [];
  
  group.forEach(function(orbit, i) {
    var total_particles, index;
    
    total_particles = orbit.t;
    index = 0;
    
    for (; index < total_particles; index++) {
      var radius, distance, speed, color, opacity;

      radius = orbit.r;
      distance = orbit.d;
      speed = 2*random() / orbit.s;
      speed = i % 2 ? speed : speed * -1;
      color = orbit.c;
      opacity = orbit.o;

      ring.push(new P(radius, distance, speed, color, opacity));

      radius = distance = speed = color = opacity = null;
    }
  });
  
  rings.push(ring);
});

ringsLength = rings.length;

/* */
function P(radius, distance, speed, color) {
  this.a = PI / 180;
  this.d = distance;
  this.d2 = (this.d * this.d);
  this.x = cx + radius * cos(this.a);
  this.y = cy + radius * sin(this.a);
  this.c = color;
  this.r = (random() * 8);
  this.R = random() > 0.5 ? radius : radius - 5;
  this.s = speed*1.5;
  this.pos = random() * 360;
}

const ctx_line = new PIXI.Graphics();
app.stage.addChild(ctx_line);
ctx_line.x = 0;
ctx_line.y = 0;

const ctx = new PIXI.Graphics();
app.stage.addChild(ctx);
ctx.x = 0;
ctx.y = 0;

var ctxList = [];

function draw() {
  var i, j, k, xd, yd, d, ring, ringLength, ringLength2, particle, p2;

  ctx.beginFill(0x000000);
  ctx.drawRect(0, 0 , w, h);
  ctx.endFill();

  for (i = 0; i < ringsLength; i++) {
    ring = rings[i];
    ringLength = ring.length;
    ringLength2 = ringLength - 100;
    var ctxList_column = [];
    
    for (j = 0; j < ringLength; j++) {
      particle = ring[j];

      particle.x = cx + particle.R * sin(PI_HALF + particle.pos);
      particle.y = cy + particle.R * cos(PI_HALF + particle.pos);
      particle.pos += particle.s;

      var ctx_circle = new PIXI.Graphics();
      app.stage.addChild(ctx_circle);
      ctx_circle.x = particle.x;
      ctx_circle.y = particle.y;
      ctx_circle.beginFill(particle.c,0.3);
      ctx_circle.drawCircle(0, 0, particle.r)
      ctx_circle.endFill();

      ctxList_column.push(ctx_circle);
    }

    ctxList.push(ctxList_column);

  }

}

draw();

function loop() {
  var i, j, k, xd, yd, d, ring, ringLength, ringLength2, particle, p2, particle_circle;
  ctx_line.clear();

  for (i = 0; i < ringsLength; i++) {
    ring = rings[i];
    ringLength = ring.length;
    ringLength2 = ringLength - 100;
    ctxList_column = ctxList[i];

    
    for (j = 0; j < ringLength; j++) {
      particle = ring[j];
      particle_circle = ctxList_column[j]

      particle.x = cx + particle.R * sin(PI_HALF + particle.pos);
      particle.y = cy + particle.R * cos(PI_HALF + particle.pos);
      particle.pos += particle.s;

      particle_circle.x = particle.x ;
      particle_circle.y = particle.y ;

      for (k = 0; k < ringLength2; k++) {
        p2 = ring[k];

        yd = p2.y - particle.y;
        xd = p2.x - particle.x;
        d = ((xd * xd) + (yd * yd));
      
        if (d < particle.d2) {
          ctx_line.beginFill(p2.c,1);
          ctx_line.lineStyle(lineWidth, p2.c, 1);
          ctx_line.moveTo(particle.x, particle.y);
          ctx_line.lineTo(p2.x, p2.y);
          ctx_line.closePath();
          ctx_line.endFill();
        }
      }
    }
  }
  requestAnimationFrame(loop);
}

loop();



  
