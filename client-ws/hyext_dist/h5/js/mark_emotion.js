let app = new PIXI.Application({ antialias: true, width: 600, height: 600});
document.body.appendChild(app.view);

app.stage.interactive = true;
app.renderer.backgroundColor = 0x000000;
    
w_adj = 20;
h_adj = 0;
num_positive = 50;
num_negative = 50;
rate_positive = 50;
rate_negative = 50;


const ctx = new PIXI.Graphics();
app.stage.addChild(ctx);
ctx.x = 0;
ctx.y = 0;

ctx.beginFill(0xFF7700, 1);
ctx.drawCircle(25, 8, 8);
ctx.endFill();

ctx.beginFill(0x20E9E9, 1);
ctx.drawCircle(25, 38, 8);
ctx.endFill();

const style = new PIXI.TextStyle({
    fontFamily: "黑体",
    fontSize: 16,
    fontWeight: 'bold',
    fill: "#ffffff", 
    stroke: "#ffffff",
    strokeThickness: 0,
    wordWrap: true,
    wordWrapWidth: 440,
});

const Text1 = new PIXI.Text('positive', style);
Text1.x = 50;
Text1.y = 0;
app.stage.addChild(Text1);

const Text1_1 = new PIXI.Text(num_positive+"条", style);
Text1_1.x = 140;
Text1_1.y = 0;
app.stage.addChild(Text1_1);

const Text1_2 = new PIXI.Text(rate_positive+"%", style);
Text1_2.x = 200;
Text1_2.y = 0;
app.stage.addChild(Text1_2);



const Text2 = new PIXI.Text('negative', style);
Text2.x = 50;
Text2.y = 30;
app.stage.addChild(Text2);

const Text2_1 = new PIXI.Text(num_negative+"条", style);
Text2_1.x = 140;
Text2_1.y = 30;
app.stage.addChild(Text2_1);

const Text2_2 = new PIXI.Text(rate_negative+"%", style);
Text2_2.x = 200;
Text2_2.y = 30;
app.stage.addChild(Text2_2);

