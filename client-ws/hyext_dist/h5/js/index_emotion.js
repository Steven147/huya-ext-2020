let app = new PIXI.Application({ antialias: true, width: 200, height: 200});
document.body.appendChild(app.view);

app.stage.interactive = true;
app.renderer.backgroundColor = 0x000000;


var particles = [];
var sum_pre = Math.random()*101;
const sum = parseInt(sum_pre);
const sum_max = 100;
const sum_min = 0;
var numberList = new Array(sum);

for (var i=0;i<numberList.length;i++){
  numberList[i] = Math.random()*101;
}

for (var i = 0; i<sum ;i++){
  var token_number = numberList[i];
  if(token_number > 50){
    particles.push([
      Math.random() * Math.PI * 1,
      Math.random() * Math.PI * 1, 
      0xFF7700
    ])
  }
  else{
    particles.push([
      Math.random() * Math.PI * 1,
      Math.random() * Math.PI * 1, 
      0x20E9E9
    ])
  }
} 


const ctx = new PIXI.Graphics();
app.stage.addChild(ctx);

ctx.x = 200 / 2;
ctx.y = 200 / 2;

window.app = app;
app.renderer.plugins.interaction.on('pointerdown', onPointerDown);

function onPointerDown() {
    graphics.lineStyle(Math.random() * 30, Math.random() * 0xFFFFFF, 1);
    graphics.moveTo(Math.random() * 200, Math.random() * 200);
    graphics.bezierCurveTo(
        Math.random() * 200, Math.random() * 200,
        Math.random() * 200, Math.random() * 200,
        Math.random() * 200, Math.random() * 200,
    );
}

let count = 0;

app.ticker.add(() => {
  count += 1;
  ctx.clear();
  ctx.scale.set(200 / 2, 200 / 2);
  
  ctx.beginFill(0x000000,0.5);
  ctx.drawRect(-12+count, -2+count, 20, 4);
  ctx.endFill();

  var x, y, z, w, t, p, r = .7,
      f = 1;

  for (var i = 0; p = particles[i++];) {
      t = Date.now() / 8000 * (i % 1 ? 1 : -1);
      x = r * Math.sin(p[0] + t) * Math.cos(p[1] + t);
      y = r * Math.cos(p[0] + t);
      z = r * Math.sin(p[0] + t) * Math.sin(p[1] + t);
      w = f / (f - z);
      
      ctx.beginFill(p[2], w / 4);
      ctx.drawCircle(x * w, y * w, w / 60);
      ctx.endFill();

  }
});