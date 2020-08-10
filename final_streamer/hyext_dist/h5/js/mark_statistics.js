let app = new PIXI.Application({ antialias: true, width: 600, height: 600});
document.body.appendChild(app.view);

app.stage.interactive = true;
app.renderer.backgroundColor = 0x000000;
    
w_adj = 20;
h_adj = 0;
content1 = "content1";
content2 = "content2";
content3 = "content3";
content4 = "content4";
content5 = "content5";
num1 = 20;
num2 = 20;
num3 = 20;
num4 = 20;
num5 = 20;
rate1 = 20;
rate2 = 20;
rate3 = 20;
rate4 = 20;
rate5 = 20;


const ctx = new PIXI.Graphics();
app.stage.addChild(ctx);
ctx.x = 0;
ctx.y = 0;

ctx.beginFill(0xFF3333, 1);
ctx.drawCircle(25, 8, 8);
ctx.endFill();

ctx.beginFill(0x00BBFF, 1);
ctx.drawCircle(25, 38, 8);
ctx.endFill();

ctx.beginFill(0xFFFF00, 1);
ctx.drawCircle(25, 68, 8);
ctx.endFill();

ctx.beginFill(0x00FF00, 1);
ctx.drawCircle(25, 98, 8);
ctx.endFill();

ctx.beginFill(0xFF3EFF, 1);
ctx.drawCircle(25, 128, 8);
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

const Text1 = new PIXI.Text(content1, style);
Text1.x = 50;
Text1.y = 0;
app.stage.addChild(Text1);

const Text1_1 = new PIXI.Text(num1+"条", style);
Text1_1.x = 140;
Text1_1.y = 0;
app.stage.addChild(Text1_1);

const Text1_2 = new PIXI.Text(rate1+"%", style);
Text1_2.x = 200;
Text1_2.y = 0;
app.stage.addChild(Text1_2);



const Text2 = new PIXI.Text(content2, style);
Text2.x = 50;
Text2.y = 30;
app.stage.addChild(Text2);

const Text2_1 = new PIXI.Text(num2+"条", style);
Text2_1.x = 140;
Text2_1.y = 30;
app.stage.addChild(Text2_1);

const Text2_2 = new PIXI.Text(rate2+"%", style);
Text2_2.x = 200;
Text2_2.y = 30;
app.stage.addChild(Text2_2);



const Text3 = new PIXI.Text(content3, style);
Text3.x = 50;
Text3.y = 60;
app.stage.addChild(Text3);

const Text3_1 = new PIXI.Text(num3+"条", style);
Text3_1.x = 140;
Text3_1.y = 60;
app.stage.addChild(Text3_1);

const Text3_2 = new PIXI.Text(rate3+"%", style);
Text3_2.x = 200;
Text3_2.y = 60;
app.stage.addChild(Text3_2);



const Text4 = new PIXI.Text(content4, style);
Text4.x = 50;
Text4.y = 90;
app.stage.addChild(Text4);

const Text4_1 = new PIXI.Text(num4+"条", style);
Text4_1.x = 140;
Text4_1.y = 90;
app.stage.addChild(Text4_1);

const Text4_2 = new PIXI.Text(rate4+"%", style);
Text4_2.x = 200;
Text4_2.y = 90;
app.stage.addChild(Text4_2);



const Text5 = new PIXI.Text(content5, style);
Text5.x = 50;
Text5.y = 120;
app.stage.addChild(Text5);

const Text5_1 = new PIXI.Text(num5+"条", style);
Text5_1.x = 140;
Text5_1.y = 120;
app.stage.addChild(Text5_1);

const Text5_2 = new PIXI.Text(rate5+"%", style);
Text5_2.x = 200;
Text5_2.y = 120;
app.stage.addChild(Text5_2);