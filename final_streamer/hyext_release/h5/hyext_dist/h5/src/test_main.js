const isHyExt = getIsHyExt();
window.__isAnchor = getIsAnchor();
// window.__isAnchor = true;
window.__isMobile = isHyExt && !!~window.navigator.userAgent.indexOf('Mobile');

class Main {
    constructor() {
        this.readyList = [];
        this.players = [];
        this.timer = null;

        this.buttonState = 4;

        const width = (this.width = window.innerWidth);
        const height = (this.height = window.innerHeight);

        const app = (this.app = new PIXI.Application({
            width: width,
            height: width*459/405,
            antialias: true
        }));

        document.body.style.margin = 0;
        document.body.style.fontSize = 0;

        document.body.appendChild(app.view);

        this.payload_211 = [[],[]];
        this.payload_222 = {};
    
        app.stage.interactive = true;
        app.renderer.backgroundColor = 0x000000;

        console.log("生成wss对象 !");
        const wss = (this.wss = new Wss({  main: this }));

        PIXI.loader
            .add("img/01.jpg")
            .add("img/02.jpg")
            .add("img/03.jpg")
            .add("img/04.jpg")
            .add("img/05.jpg")
            .add("img/06.jpg")
            .add("img/07.jpg")
            .add("img/08.jpg")
            .add("img/09.jpg")
            .add("img/10.jpg")
            .add("img/11.jpg")
            .add("img/12.png")
            .load(() => {this.setup();this.send();wss.C2SRequestTable();wss.C2SRequestCount();})
    }

    setup(){
        this.button();
        this.button_statis();
        this.introduction();
        this.amplify();
    }

    button(){
        const { app } = this;

        app.stage.removeChildren();

        var button1 = new PIXI.Sprite(PIXI.loader.resources["img/01.jpg"].texture);
        button1.buttonMode = true;
        button1.interactive = true;
        button1.position.set(0, -0.9);
        button1.scale.set(0.18,0.18);
        app.stage.addChild(button1);
        button1.on('pointerdown', () => this.onButtonDown1())
      
        var button2 = new PIXI.Sprite(PIXI.loader.resources["img/02.jpg"].texture);
        button2.buttonMode = true;
        button2.interactive = true;
        button2.position.set(73, 0);
        button2.scale.set(0.18,0.18);
        app.stage.addChild(button2);
        button2.on('pointerdown', () => this.onButtonDown2())
      
        var button4 = new PIXI.Sprite(PIXI.loader.resources["img/04.jpg"].texture);
        button4.buttonMode = true;
        button4.interactive = true;
        button4.position.set(292, 0);
        button4.scale.set(0.18,0.18);
        app.stage.addChild(button4);
        button4.on('pointerdown', () => this.onButtonDown4())

        var button5 = new PIXI.Sprite(PIXI.loader.resources["img/06.jpg"].texture);
        button5.buttonMode = true;
        button5.interactive = true;
        button5.position.set(219, 0);
        button5.scale.set(0.18,0.18);
        app.stage.addChild(button5);
        button5.on('pointerdown', () => this.onButtonDown5())
    }

    button_statis(){
        const { app} = this;
      
        var button3 = new PIXI.Sprite(PIXI.loader.resources["img/03.jpg"].texture);
        button3.buttonMode = true;
        button3.interactive = true;
        button3.position.set(146, 0);
        button3.scale.set(0.18,0.18);
        app.stage.addChild(button3);
        button3.on('pointerdown', () => this.onButtonDown3())
      
    }

    onButtonDown1(){
        const { app,wss } = this;
        this.buttonState = 1;
        wss.C2SRequestTable();
        app.stage.removeChildren();
        this.button();
        this.button_statis({});
        this.emotion();
        this.amplify();

    }

    onButtonDown2(){
        const { app,wss } = this;
        this.buttonState = 2;
        wss.C2SRequestTable();
        app.stage.removeChildren();
        this.button();
        this.button_statis({});
        this.classfy();
        this.amplify();

    }

    onButtonDown3(){
        const { app,wss } = this;
        this.buttonState = 3;
        wss.C2SRequestCount();
        app.stage.removeChildren();
        this.button();
        this.button_statis();
        this.statistics();
        this.amplify();

    }

    onButtonDown4(){
        const { app } = this;
        this.buttonState = 4;
        app.stage.removeChildren();
        this.button();
        this.button_statis({});
        this.introduction();
        this.amplify();

    }  

    onButtonDown5(){
        const { app } = this;
        this.buttonState = 5;
        app.stage.removeChildren();
        this.button();
        this.button_statis({});
        this.setControl();
        this.amplify();

    }  

    emotion(){
        const  {app}  = this;

        var num_positive = 0;
        var num_negative = 0;
        var rate_positive = 0;
        var rate_negative = 0;
        var hot_number = 0;

        var payload = this.payload_211;

        var emotion_List = [];
        var length0 = payload[0].length;
        for(var i = 0; i < length0 ; ++i){
            emotion_List[i] = payload[0][i].情感;
        }

        for(var j = 0; j < emotion_List.length; ++j){
            if(emotion_List[j] > 0.5){
                ++num_positive;
            }
            else{
                ++num_negative;
            }
        }

        var color_rect = [0,0,0,0,0,0,0];
        for(var j = 0; j < emotion_List.length; ++j){
            if(emotion_List[j] < 0.14){
                color_rect[0] +=1;
            }
            if(emotion_List[j] >= 0.14 && emotion_List[j] < 0.28){
                color_rect[1] +=1;
            }
            if(emotion_List[j] >= 0.28 && emotion_List[j] < 0.42){
                color_rect[2] +=1;
            }
            if(emotion_List[j] >= 0.42 && emotion_List[j] < 0.56){
                color_rect[3] +=1;
            }
            if(emotion_List[j] >= 0.56 && emotion_List[j] < 0.70){
                color_rect[4] +=1;
            }
            if(emotion_List[j] >= 0.70 && emotion_List[j] < 0.84){
                color_rect[5] +=1;
            }
            if(emotion_List[j] >= 0.84 && emotion_List[j] < 1.0){
                color_rect[6] +=1;
            }
        }


        var num_sum = num_negative + num_positive;
        if(num_sum == 0){
            rate_positive = 0;
            rate_negative = 0;
        }
        else{
            rate_positive = 100*num_positive/(num_negative+num_positive);
            rate_negative = 100 - rate_positive;
        }

        var rate_rect = [];
        for(var j = 0; j < 7; ++j){
            if(num_sum == 0){
                rate_rect[j] = 0;
            }
            else{
                rate_rect[j] = color_rect[j]/num_sum;
            }
        }
    

        /* script_emotion.js*/ 
        var w = 350;
        var h = 350;
        var cx = (w / 2);
        var cy = (h / 2);
        var rings = [];
        var ringsLength = 0;

        var PI = Math.PI;
        var PI_HALF = PI / 2;
        var cos = Math.cos
        var sin = Math.sin;
        var random = Math.random;

        var lineWidth = 0.2;
        var C = ["0xABF8FF", "0xE76B76", "0x1D2439", "0x4F3762", "0x67F9FF", "0x0C0F18"];
        var Color = ["0x00334E", "0x145374", "0x5588a3", "0xf1bc31", "0xe25822", "0xb22222", "0x7c0a02"];
        var colorClassfyNumber= [0,50,100,300,600,900,1200]
  
        if(num_sum >= colorClassfyNumber[0] && num_sum < colorClassfyNumber[1]){
            var data = [
                [
                    {t:180, r:(cx-30),  d:40, s:40, c:Color[0]},
                     {t:80, r:(cx-40),  d:20, s:40, c:Color[0]},
                     {t:20, r:(cx-50), d:20, s:40, c:C[2]},
                     {t:40, r:(cx-60), d:20, s:40, c:C[2]},
                  ],
                  [
                    {t:160, r:(cx-70), d:40, s:20, c:C[2]},
                     {t:20, r:(cx-80), d:30, s:60, c:C[2]},
                  ],
            ];
            hot_number = 1;
        }
        if(num_sum >= colorClassfyNumber[1] && num_sum < colorClassfyNumber[2]){
            var data = [
                [
                    {t:180, r:(cx-30),  d:40, s:40, c:Color[1]},
                     {t:80, r:(cx-40),  d:20, s:40, c:Color[1]},
                     {t:20, r:(cx-50), d:20, s:40, c:C[2]},
                     {t:40, r:(cx-60), d:20, s:40, c:C[2]},
                  ],
                  [
                    {t:160, r:(cx-70), d:40, s:20, c:C[2]},
                     {t:20, r:(cx-80), d:30, s:60, c:C[2]},
                  ],
            ];
            hot_number = 2;
        }
        if(num_sum >= colorClassfyNumber[2] && num_sum < colorClassfyNumber[3]){
            var data = [
                [
                    {t:180, r:(cx-30),  d:40, s:40, c:Color[2]},
                     {t:80, r:(cx-40),  d:20, s:40, c:Color[2]},
                     {t:20, r:(cx-50), d:20, s:40, c:C[2]},
                     {t:40, r:(cx-60), d:20, s:40, c:C[2]},
                  ],
                  [
                    {t:160, r:(cx-70), d:40, s:20, c:C[2]},
                     {t:20, r:(cx-80), d:30, s:60, c:C[2]},
                  ],
            ];
            hot_number = 3;
        }
        if(num_sum >= colorClassfyNumber[3] && num_sum < colorClassfyNumber[4]){
            var data = [
                [
                    {t:180, r:(cx-30),  d:40, s:40, c:Color[3]},
                     {t:80, r:(cx-40),  d:20, s:40, c:Color[3]},
                     {t:20, r:(cx-50), d:20, s:40, c:C[2]},
                     {t:40, r:(cx-60), d:20, s:40, c:C[2]},
                  ],
                  [
                    {t:160, r:(cx-70), d:40, s:20, c:C[2]},
                     {t:20, r:(cx-80), d:30, s:60, c:C[2]},
                  ],
            ];
            hot_number = 4;
        }
        if(num_sum >= colorClassfyNumber[4] && num_sum < colorClassfyNumber[5]){
            var data = [
                [
                    {t:180, r:(cx-30),  d:40, s:40, c:Color[4]},
                     {t:80, r:(cx-40),  d:20, s:40, c:Color[4]},
                     {t:20, r:(cx-50), d:20, s:40, c:C[2]},
                     {t:40, r:(cx-60), d:20, s:40, c:C[2]},
                  ],
                  [
                    {t:160, r:(cx-70), d:40, s:20, c:C[2]},
                     {t:20, r:(cx-80), d:30, s:60, c:C[2]},
                  ],
            ];
            hot_number = 5;
        }
        if(num_sum >= colorClassfyNumber[5] && num_sum < colorClassfyNumber[6]){
            var data = [
                [
                    {t:180, r:(cx-30),  d:40, s:40, c:Color[5]},
                     {t:80, r:(cx-40),  d:20, s:40, c:Color[5]},
                     {t:20, r:(cx-50), d:20, s:40, c:C[2]},
                     {t:40, r:(cx-60), d:20, s:40, c:C[2]},
                  ],
                  [
                    {t:160, r:(cx-70), d:40, s:20, c:C[2]},
                     {t:20, r:(cx-80), d:30, s:60, c:C[2]},
                  ],
            ];
            hot_number = 6;
        }
        if(num_sum >= colorClassfyNumber[6]){
            var data = [
                [
                    {t:180, r:(cx-30),  d:40, s:40, c:Color[6]},
                     {t:80, r:(cx-40),  d:20, s:40, c:Color[6]},
                     {t:20, r:(cx-50), d:20, s:40, c:C[2]},
                     {t:40, r:(cx-60), d:20, s:40, c:C[2]},
                  ],
                  [
                    {t:160, r:(cx-70), d:40, s:20, c:C[2]},
                     {t:20, r:(cx-80), d:30, s:60, c:C[2]},
                  ],
            ];
            hot_number = 7;
        }
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
            speed = random() / orbit.s;
            speed = i % 2 ? speed : speed * -1;
            color = orbit.c;
            opacity = orbit.o;

            ring.push(new P(radius, distance, speed, color, opacity));

            radius = distance = speed = color = opacity = null;
            }
        });
  
        rings.push(ring);
        });

        var ringsLength = rings.length;

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
        ctx_line.y = 20;

        const ctx = new PIXI.Graphics();
        app.stage.addChild(ctx);
        ctx.x = 0;
        ctx.y = 20;

        var ctxList = [];

        function draw() {
            var i, j, k, xd, yd, d, ring, ringLength, ringLength2, particle, p2;
          
            ctx.beginFill(0x000000,0);
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

          function loop_update() {
            var i, j, k, xd, yd, d, ring, ringLength, ringLength2, particle, p2, particle_circle;
            ctx_line.clear();
          
            for (i = 0; i < ringsLength; i++) {
              ring = rings[i];
              ringLength = ring.length;
              ringLength2 = ringLength - 100;
              var ctxList_column = ctxList[i];
          
              
              for (j = 0; j < ringLength; j++) {
                particle = ring[j];
                particle_circle = ctxList_column[j];
          
                particle.x = cx + particle.R * sin(PI_HALF + particle.pos);
                particle.y = cy + particle.R * cos(PI_HALF + particle.pos);
                particle.pos += particle.s;
          
                particle_circle.x = particle.x ;
                particle_circle.y = particle.y+20 ;
          
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
          }

        /* index_emotion.js*/

        var particles = [];
        const sum = num_negative + num_positive;
        var numberList = new Array(sum);

        for (var i=0;i<numberList.length;i++){
            numberList[i] = emotion_List[i];
        }

        for (var i = 0; i<sum ;i++){
        var token_number = numberList[i];
            if(token_number < 0.14){
                particles.push([
                    Math.random() * Math.PI * 1,
                    Math.random() * Math.PI * 1, 
                    Color[0]
                ])
            }
            if(token_number >= 0.14 && token_number < 0.28){
                particles.push([
                    Math.random() * Math.PI * 1,
                    Math.random() * Math.PI * 1, 
                    Color[1]
                ])
            }
            if(token_number >= 0.28 && token_number < 0.42){
                particles.push([
                    Math.random() * Math.PI * 1,
                    Math.random() * Math.PI * 1, 
                    Color[2]
                ])
            }
            if(token_number >= 0.42 && token_number < 0.56){
                particles.push([
                    Math.random() * Math.PI * 1,
                    Math.random() * Math.PI * 1, 
                    Color[3]
                ])
            }
            if(token_number >= 0.56 && token_number < 0.70){
                particles.push([
                    Math.random() * Math.PI * 1,
                    Math.random() * Math.PI * 1, 
                    Color[4]
                ])
            }
            if(token_number >= 0.70 && token_number < 0.84){
                particles.push([
                    Math.random() * Math.PI * 1,
                    Math.random() * Math.PI * 1, 
                    Color[5]
                ])
            }
            if(token_number >= 0.84 && token_number < 1.0){
                particles.push([
                    Math.random() * Math.PI * 1,
                    Math.random() * Math.PI * 1, 
                    Color[6]
                ])
            }
        } 

        const ctx2 = new PIXI.Graphics();
        app.stage.addChild(ctx2);

        ctx2.x = 177.5;
        ctx2.y = 177.5+10;

        function index_emotion() {
        
            ctx2.clear();
            ctx2.scale.set(150/ 2, 150 / 2);
            
            ctx2.beginFill(0x000000,0);
            ctx2.drawRect(-12, -2, 20, 4);
            ctx2.endFill();
        
            var x, y, z, w, t, p, r = .7,
                f = 1;
        
            for (var i = 0; p = particles[i++];) {
                t = Date.now() / 8000 * (i % 1 ? 1 : -1);
                x = r * Math.sin(p[0] + t) * Math.cos(p[1] + t);
                y = r * Math.cos(p[0] + t);
                z = r * Math.sin(p[0] + t) * Math.sin(p[1] + t);
                w = f / (f - z);
                
                ctx2.beginFill(p[2], w / 4);
                ctx2.drawCircle(x * w, y * w, w/50);
                ctx2.endFill();
            }
        };

        /* mark_emotion.js*/

        var y_adj = -80;
        var x_adj = 0;

        const ctx3 = new PIXI.Graphics();
        app.stage.addChild(ctx3);
        ctx3.x = 40+x_adj;
        ctx3.y = 425+y_adj;

        var tmp1 = [];
        var tmp2 = [];
        var total_length = 100;


        tmp1[0] = 0;
        tmp2[0] = total_length*rate_rect[0] + 25;
        if(length0 > 0){
            ctx3.beginFill(Color[0], 1);
            ctx3.drawRect(tmp1[0], 8, tmp2[0], 18);
            ctx3.endFill();
        }

        for(var i = 1; i < 7; ++i){
            tmp1[i] = tmp1[i-1] + tmp2[i-1];
            tmp2[i] = total_length*rate_rect[i] + 25;
            if(length0 > 0){
                ctx3.beginFill(Color[i], 1);
                ctx3.drawRect(tmp1[i], 8, tmp2[i], 18);
                ctx3.endFill();  
            }
        }

       
        const style = new PIXI.TextStyle({
            fontFamily: "黑体",
            fontSize: 13,
            fontWeight: 'bold',
            fill: "#ffffff", 
            stroke: "#ffffff",
            strokeThickness: 0,
            wordWrap: true,
            wordWrapWidth: 440,
        });

        const style_hot = new PIXI.TextStyle({
            fontFamily: "黑体",
            fontSize: 22,
            fontWeight: 'bold',
            fill: Color[hot_number-1], 
            stroke: Color[hot_number-1],
            strokeThickness: 0,
            wordWrap: true,
            wordWrapWidth: 440,
        });

        const Text1 = new PIXI.Text('negative', style);
        Text1.x = 40 ;
        Text1.y = 453+y_adj;
        app.stage.addChild(Text1);

        const Text2 = new PIXI.Text('positive', style);
        Text2.x = 260;
        Text2.y = 453+y_adj;
        app.stage.addChild(Text2);

        const Text3 = new PIXI.Text("弹幕总数:"+num_sum+"条", style);
        Text3.x = 130;
        Text3.y = 453+y_adj;
        app.stage.addChild(Text3);

        const Text4 = new PIXI.Text("热度等级: \"LV", style);
        Text4.x = 124;
        Text4.y = 470+y_adj;
        app.stage.addChild(Text4);

        const Text5 = new PIXI.Text(hot_number, style_hot);
        Text5.x = 215;
        Text5.y = 467+y_adj;
        app.stage.addChild(Text5);

        const Text6 = new PIXI.Text("\"", style);
        Text6.x = 228;
        Text6.y = 470+y_adj;
        app.stage.addChild(Text6);
        


        const style_rate = new PIXI.TextStyle({
            fontFamily: "黑体",
            fontSize: 9,
            fontWeight: 'bold',
            fill: "#ffffff", 
            stroke: "#ffffff",
            strokeThickness: 0,
            wordWrap: true,
            wordWrapWidth: 440,
        });

        const text_rate0 = new PIXI.Text(parseInt(100*rate_rect[0]) + "%", style_rate);
        text_rate0.x = 30 + tmp1[0] + tmp2[0]/2;
        text_rate0.y = 438+y_adj;
        app.stage.addChild(text_rate0);

        const text_rate1 = new PIXI.Text(parseInt(100*rate_rect[1]) + "%", style_rate);
        text_rate1.x = 30 + tmp1[1] + tmp2[1]/2;
        text_rate1.y = 438+y_adj;
        app.stage.addChild(text_rate1);

        const text_rate2 = new PIXI.Text(parseInt(100*rate_rect[2]) + "%", style_rate);
        text_rate2.x = 30 + tmp1[2] + tmp2[2]/2;
        text_rate2.y = 438+y_adj;
        app.stage.addChild(text_rate2);

        const text_rate3 = new PIXI.Text(parseInt(100*rate_rect[3]) + "%", style_rate);
        text_rate3.x = 30 + tmp1[3] + tmp2[3]/2;
        text_rate3.y = 438+y_adj;
        app.stage.addChild(text_rate3);

        const text_rate4 = new PIXI.Text(parseInt(100*rate_rect[4]) + "%", style_rate);
        text_rate4.x = 30 + tmp1[4] + tmp2[4]/2;
        text_rate4.y = 438+y_adj;
        app.stage.addChild(text_rate4);

        const text_rate5 = new PIXI.Text(parseInt(100*rate_rect[5]) + "%", style_rate);
        text_rate5.x = 30 + tmp1[5] + tmp2[5]/2;
        text_rate5.y = 438+y_adj;
        app.stage.addChild(text_rate5);

        const text_rate6 = new PIXI.Text(parseInt(100*rate_rect[6]) + "%", style_rate);
        text_rate6.x = 30 + tmp1[6] + tmp2[6]/2;
        text_rate6.y = 438+y_adj;
        app.stage.addChild(text_rate6);



        function loop_emotion() {
            loop_update();
            index_emotion();
            requestAnimationFrame(loop_emotion);
        }

        loop_emotion();
    }

    classfy(){
        const { app } = this;

        var payload = this.payload_211;

        var color_classfy = [ 0xE76B76, 0x4F3762, 0x67F9FF, 0xf1bc31, 0xe25822, 0xb22222, 0x7c0a02];
        var content = [];
        var num_classfy = [];
        var num_relative = [];
        var rate_classfy = [];
        var sum_classfy = 0;
        var length0 = payload[1].length;
        for(var i = 0; i < 6; ++i){
            if(i < length0){
                content[i] = payload[1][i].内容;
                num_classfy[i] = payload[1][i].数量;
                num_relative[i] = payload[1][i].相对数量;
                sum_classfy += num_classfy[i];
            }
            else{
                content[i] = 0;
                num_classfy[i] = 0;
                num_relative[i] = 0;
                sum_classfy += 0;
            }
        }
        
        for(var i = 0; i < 6; ++i){
            if(i < length0){
                if(sum_classfy == 0){
                    rate_classfy[i] = 0;
                }
                else{
                    rate_classfy[i] = parseInt(100*num_classfy[i]/sum_classfy);
                }
            }
            else{
                rate_classfy[i] = 0;
            }
        }

        /* script_classfy.js*/ 
        var w = 350;
        var h = 350;
        var cx = (w / 2);
        var cy = (h / 2);
        var rings = [];
        var ringsLength = 0;

        var PI = Math.PI;
        var PI_HALF = PI / 2;
        var cos = Math.cos;
        var sin = Math.sin;
        var random = Math.random;

        var lineWidth = 0.2;
        var C = ["0xABF8FF", "0xE76B76", "0x1D2439", "0x4F3762", "0x67F9FF", "0x0C0F18"];
        var Color = ["0x00334E", "0x145374", "0x5588a3", "0xf1bc31", "0xe25822", "0xb22222", "0x7c0a02"];
        
        var data = [
        /* ring {t:total_particles, r:radius, d:distance, s:speed, c:color} */

        [
            {t:120, r:(cx-50),  d:40, s:40, c:C[0]},
           {t:80, r:(cx-60),  d:20, s:40, c:C[0]},
           {t:20, r:(cx-70), d:20, s:40, c:C[2]},
           {t:40, r:(cx-80), d:20, s:40, c:C[2]},
        ],
        [
            {t:100, r:(cx-90), d:40, s:20, c:C[2]},
           {t:20, r:(cx-100), d:30, s:60, c:C[2]},
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
            speed = random() / orbit.s;
            speed = i % 2 ? speed : speed * -1;
            color = orbit.c;
            opacity = orbit.o;

            ring.push(new P(radius, distance, speed, color, opacity));

            radius = distance = speed = color = opacity = null;
            }
        });
        
        rings.push(ring);
        });

        var ringsLength = rings.length;

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
          
            ctx.beginFill(0x000000,0);
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

          function loop_update() {
            var i, j, k, xd, yd, d, ring, ringLength, ringLength2, particle, p2, particle_circle;
            ctx_line.clear();
          
            for (i = 0; i < ringsLength; i++) {
              ring = rings[i];
              ringLength = ring.length;
              ringLength2 = ringLength - 100;
              var ctxList_column = ctxList[i];
          
              
              for (j = 0; j < ringLength; j++) {
                particle = ring[j];
                particle_circle = ctxList_column[j];
          
                particle.x = cx + particle.R * sin(PI_HALF + particle.pos);
                particle.y = cy + particle.R * cos(PI_HALF + particle.pos);
                particle.pos += particle.s;
          
                particle_circle.x = particle.x ;
                particle_circle.y = particle.y+0 ;
          
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
          }

        /*index_classfy*/

        var Util = {};
        Util.timeStamp = function() {
            return window.performance.now();
        };
        Util.random = function(min, max) {
        return min + Math.random() * (max - min);
        };
        Util.map = function(a, b, c, d, e) {
        return (a - b) / (c - b) * (e - d) + d;
        };
        Util.lerp = function(value1, value2, amount) {
        return value1 + (value2 - value1) * amount;
        };
        Util.array2D = function(tableau, array_width){
            var result = [];
            for (var i = 0; i < tableau.length; i += array_width) result.push(tableau.slice(i, i + array_width));
            return result;
        };
        Util.threeAngle = function(p0,p1,p2){
            var b = Math.pow(p1.x-p0.x,2) + Math.pow(p1.y-p0.y,2),
                a = Math.pow(p1.x-p2.x,2) + Math.pow(p1.y-p2.y,2),
                c = Math.pow(p2.x-p0.x,2) + Math.pow(p2.y-p0.y,2);
            return Math.acos( (a+b-c) / Math.sqrt(4*a*b) );
        }

        var Tween = {};
        Tween.linear = function(currentTime, start, degreeOfChange, duration) {
        return degreeOfChange * currentTime / duration + start;
        };
        Tween.easeInOutQuad = function(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
        };
        Tween.easeInOutExpo = function(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        t--;
        return c / 2 * (-Math.pow(2, -10 * t) + 2) + b;
        };

        class Vector{
            constructor(x,y){
                this.x = x || 0;
                this.y = y || 0;
            }
            set(x,y){
                this.x = x;
                this.y = y;
            }
        reset(){
                this.x = 0;
                this.y = 0;
        }
            fromAngle(angle){
                let x = Math.cos(angle),
                    y = Math.sin(angle);
                return new Vector(x,y);
            }
            add(vector){
                this.x += vector.x;
                this.y += vector.y;
            }
            sub(vector){
                this.x -= vector.x;
                this.y -= vector.y;
            }
            mult(scalar){
                this.x *= scalar;
                this.y *= scalar;
            }
            div(scalar){
                this.x /= scalar;
                this.y /= scalar;
            }
            dot(vector){
                return vector.x * this.x + vector.y * this.y;
            }
            limit(limit_value){
                if(this.mag() > limit_value) this.setMag(limit_value);
            }
            mag(){
                return Math.hypot(this.x,this.y);
            }
            setMag(new_mag){
                if(this.mag() > 0){
                    this.normalize();
                }else{
                    this.x = 1;
                    this.y = 0;
                }
                this.mult(new_mag);
            }
            normalize(){
                let mag = this.mag();
                if(mag > 0){
                    this.x /= mag;
                    this.y /= mag;
                }
            }
            heading(){
                return Math.atan2(this.x,this.y);
            }
            setHeading(angle){
                let mag = this.mag();
                this.x = Math.cos(angle) * mag;
                this.y = Math.sin(angle) * mag;
            }
            dist(vector){
                return new Vector(this.x - vector.x,this.y - vector.y).mag();
            }
            angle(vector){
                return Math.atan2(vector.y - this.y, vector.x - this.x);
            }	
            copy(){
                return new Vector(this.x,this.y);
            }
        }

        var H = 350;
        var W = 350;
        var circle_r = 150;

        const ctx2 = new PIXI.Graphics();
        app.stage.addChild(ctx2);
        ctx2.x = 0;
        ctx2.y = 0;

        let cursor = new Vector(W/2,H/2);
        function mousemove(event) {
        cursor.x = event.pageX - canvas.offsetLeft;
        cursor.y = event.pageY - canvas.offsetTop;
        }

        class Point {
        constructor(x, y, c_number, num_number ) {
            this.position = new Vector(x, y);
            this.acceleration = new Vector(0, 0).fromAngle(Util.random(0,2*Math.PI));
            this.velocity = new Vector(0, 0);
            this.radius = 5 + 45*num_number;
            this.zone = this.radius + 40;
            this.c = c_number;
            this.min_radius = 0.8 * this.radius;
            this.max_radius = this.radius;
            this.num_number = num_number;
        }
        display() {
            
            var color = this.c;

            ctx2.beginFill(color,Util.map(this.radius, this.min_radius, this.max_radius, 1, 0.3))
            ctx2.drawCircle(this.position.x, this.position.y, this.radius)
            ctx2.endFill();
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


        let points = [];

        for (let i = 0; i < length0; i++) {
            points.push(new Point(cursor.x,cursor.y,color_classfy[i],num_relative[i]));
        }

        function index_classfy() {
        
            ctx2.clear();
            ctx2.beginFill(0x000000,0);
            ctx2.drawRect(0, 0, W, H);
            ctx2.endFill();


            points.forEach(point => {
                point.detection(points);
            });
            points.forEach(point => {
                point.display();
                point.bound();
                point.integrate();
            });
        }

        /* mark_classfy.js*/

        var ctx_classfy = [];
        var y_adj = -115;
        var x_adj = -10;

        const ctx_0 = new PIXI.Graphics();
        ctx_0.beginFill(color_classfy[0], 1);
        ctx_0.drawCircle(75+x_adj, 425+y_adj, 6);
        ctx_0.endFill();
        ctx_classfy.push(ctx_0);

        const ctx_1 = new PIXI.Graphics();
        ctx_1.beginFill(color_classfy[1], 1);
        ctx_1.drawCircle(75+x_adj, 445+y_adj, 6);
        ctx_1.endFill();
        ctx_classfy.push(ctx_1);

        const ctx_2 = new PIXI.Graphics();
        ctx_2.beginFill(color_classfy[2], 1);
        ctx_2.drawCircle(75+x_adj, 465+y_adj, 6);
        ctx_2.endFill();
        ctx_classfy.push(ctx_2);

        const ctx_3 = new PIXI.Graphics();
        ctx_3.beginFill(color_classfy[3], 1);
        ctx_3.drawCircle(75+x_adj, 485+y_adj, 6);
        ctx_3.endFill();
        ctx_classfy.push(ctx_3);

        const ctx_4 = new PIXI.Graphics();
        ctx_4.beginFill(color_classfy[4], 1);
        ctx_4.drawCircle(75+x_adj, 505+y_adj, 6);
        ctx_4.endFill();
        ctx_classfy.push(ctx_4);

        const ctx_5 = new PIXI.Graphics();
        ctx_5.beginFill(color_classfy[5], 1);
        ctx_5.drawCircle(75+x_adj, 525+y_adj, 6);
        ctx_5.endFill();
        ctx_classfy.push(ctx_5);


        const style = new PIXI.TextStyle({
            fontFamily: "黑体",
            fontSize: 12,
            fontWeight: 'bold',
            fill: "#ffffff", 
            stroke: "#ffffff",
            strokeThickness: 0,
            wordWrap: true,
            wordWrapWidth: 440,
        });

        var Text = [];
        var Text_num = [];
        var Text_rate = [];

        const Text0 = new PIXI.Text(content[0], style);
        Text0.x = 100+x_adj;
        Text0.y = 420+y_adj;
        Text.push(Text0);
        const Text_num0 = new PIXI.Text(num_classfy[0]+"条", style);
        Text_num0.x = 270+x_adj;
        Text_num0.y = 420+y_adj;
        Text_num.push(Text_num0);
        const Text_rate0 = new PIXI.Text(rate_classfy[0]+"%", style);
        Text_rate0.x = 320+x_adj;
        Text_rate0.y = 420+y_adj;
        Text_rate.push(Text_rate0);

        const Text1 = new PIXI.Text(content[1], style);
        Text1.x = 100+x_adj;
        Text1.y = 440+y_adj;
        Text.push(Text1);
        const Text_num1 = new PIXI.Text(num_classfy[1]+"条", style);
        Text_num1.x = 270+x_adj;
        Text_num1.y = 440+y_adj;
        Text_num.push(Text_num1);
        const Text_rate1 = new PIXI.Text(rate_classfy[1]+"%", style);
        Text_rate1.x = 320+x_adj;
        Text_rate1.y = 440+y_adj;
        Text_rate.push(Text_rate1);

        const Text2 = new PIXI.Text(content[2], style);
        Text2.x = 100+x_adj;
        Text2.y = 460+y_adj;
        Text.push(Text2);
        const Text_num2 = new PIXI.Text(num_classfy[2]+"条", style);
        Text_num2.x = 270+x_adj;
        Text_num2.y = 460+y_adj;
        Text_num.push(Text_num2);
        const Text_rate2 = new PIXI.Text(rate_classfy[2]+"%", style);
        Text_rate2.x = 320+x_adj;
        Text_rate2.y = 460+y_adj;
        Text_rate.push(Text_rate2);

        const Text3 = new PIXI.Text(content[3], style);
        Text3.x = 100+x_adj;
        Text3.y = 480+y_adj;
        Text.push(Text3);
        const Text_num3 = new PIXI.Text(num_classfy[3]+"条", style);
        Text_num3.x = 270+x_adj;
        Text_num3.y = 480+y_adj;
        Text_num.push(Text_num3);
        const Text_rate3 = new PIXI.Text(rate_classfy[3]+"%", style);
        Text_rate3.x = 320+x_adj;
        Text_rate3.y = 480+y_adj;
        Text_rate.push(Text_rate3);

        const Text4 = new PIXI.Text(content[4], style);
        Text4.x = 100+x_adj;
        Text4.y = 500+y_adj;
        Text.push(Text4);
        const Text_num4 = new PIXI.Text(num_classfy[4]+"条", style);
        Text_num4.x = 270+x_adj;
        Text_num4.y = 500+y_adj;
        Text_num.push(Text_num4);
        const Text_rate4 = new PIXI.Text(rate_classfy[4]+"%", style);
        Text_rate4.x = 320+x_adj;
        Text_rate4.y = 500+y_adj;
        Text_rate.push(Text_rate4);

        const Text5 = new PIXI.Text(content[5], style);
        Text5.x = 100+x_adj;
        Text5.y = 520+y_adj;
        Text.push(Text5);
        const Text_num5 = new PIXI.Text(num_classfy[5]+"条", style);
        Text_num5.x = 270+x_adj;
        Text_num5.y = 520+y_adj;
        Text_num.push(Text_num5);
        const Text_rate5 = new PIXI.Text(rate_classfy[5]+"%", style);
        Text_rate5.x = 320+x_adj;
        Text_rate5.y = 520+y_adj;
        Text_rate.push(Text_rate5);



        for(var i=0; i < 6; ++i){
            if(i < length0){
                app.stage.addChild(Text[i]);
                app.stage.addChild(Text_num[i]);
                app.stage.addChild(Text_rate[i]);
                app.stage.addChild(ctx_classfy[i]);
            }
        }
        

        function loop_classfy() {
        loop_update();
        index_classfy();
        requestAnimationFrame(loop_classfy);
        }

        loop_classfy();
    }

    statistics(){
        const { app } = this;

        var payload = this.payload_222;

        var color_classfy = [ 0xE76B76, 0x4F3762, 0x67F9FF, 0xf1bc31, 0xe25822, 0xb22222, 0x7c0a02];
        var content = [];
        var num_classfy = [];
        var num_relative = [];
        var rate_classfy = [];
        var sum_classfy = 0;
        var length0 = payload.数量;
        var beginTime = payload.begin_time;
        var endTime = payload.end_time;
            
        if(1 <= length0){
            content[0] = payload.内容1;
            num_classfy[0] = payload.数量1;
            num_relative[0] = payload.相对数量1;
            sum_classfy += num_classfy[0];
        }
        if(2 <= length0){
            content[1] = payload.内容2;
            num_classfy[1] = payload.数量2;
            num_relative[1] = payload.相对数量2;
            sum_classfy += num_classfy[1];
        }
        if(3 <= length0){
            content[2] = payload.内容3;
            num_classfy[2] = payload.数量3;
            num_relative[2] = payload.相对数量3;
            sum_classfy += num_classfy[2];
        }
        if(4 <= length0){
            content[3] = payload.内容4;
            num_classfy[3] = payload.数量4;
            num_relative[3] = payload.相对数量4;
            sum_classfy += num_classfy[3];
        }
        if(5 <= length0){
            content[4] = payload.内容5;
            num_classfy[4] = payload.数量5;
            num_relative[4] = payload.相对数量5;
            sum_classfy += num_classfy[4];
        }
        
        for(var i = 0; i < 6; ++i){
            if(i < length0){
                if(sum_classfy == 0){
                    rate_classfy[i] = 0;
                }
                else{
                    rate_classfy[i] = parseInt(100*num_classfy[i]/sum_classfy);
                }
            }
            else{
                rate_classfy[i] = 0;
            }
        }

        /* script_statistics.js*/ 
        var w = 350;
        var h = 350;
        var cx = (w / 2);
        var cy = (h / 2);
        var rings = [];
        var ringsLength = 0;

        var PI = Math.PI;
        var PI_HALF = PI / 2;
        var cos = Math.cos;
        var sin = Math.sin;
        var random = Math.random;

        var lineWidth = 0.2;
        var C = ["0xABF8FF", "0xE76B76", "0x1D2439", "0x4F3762", "0x67F9FF", "0x0C0F18"];
        var Color = ["0x00334E", "0x145374", "0x5588a3", "0xf1bc31", "0xe25822", "0xb22222", "0x7c0a02"];
        
        var data = [
        /* ring {t:total_particles, r:radius, d:distance, s:speed, c:color} */

        [
            {t:120, r:(cx-50),  d:40, s:40, c:C[0]},
           {t:80, r:(cx-60),  d:20, s:40, c:C[0]},
           {t:20, r:(cx-70), d:20, s:40, c:C[2]},
           {t:40, r:(cx-80), d:20, s:40, c:C[2]},
        ],
        [
            {t:100, r:(cx-90), d:40, s:20, c:C[2]},
           {t:20, r:(cx-100), d:30, s:60, c:C[2]},
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
            speed = random() / orbit.s;
            speed = i % 2 ? speed : speed * -1;
            color = orbit.c;
            opacity = orbit.o;

            ring.push(new P(radius, distance, speed, color, opacity));

            radius = distance = speed = color = opacity = null;
            }
        });
        
        rings.push(ring);
        });

        var ringsLength = rings.length;

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
          
            ctx.beginFill(0x000000,0);
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

          function loop_update() {
            var i, j, k, xd, yd, d, ring, ringLength, ringLength2, particle, p2, particle_circle;
            ctx_line.clear();
          
            for (i = 0; i < ringsLength; i++) {
              ring = rings[i];
              ringLength = ring.length;
              ringLength2 = ringLength - 100;
              var ctxList_column = ctxList[i];
          
              
              for (j = 0; j < ringLength; j++) {
                particle = ring[j];
                particle_circle = ctxList_column[j];
          
                particle.x = cx + particle.R * sin(PI_HALF + particle.pos);
                particle.y = cy + particle.R * cos(PI_HALF + particle.pos);
                particle.pos += particle.s;
          
                particle_circle.x = particle.x ;
                particle_circle.y = particle.y+0 ;
          
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
          }

        /*index_statistics*/

        var Util = {};
        Util.timeStamp = function() {
            return window.performance.now();
        };
        Util.random = function(min, max) {
        return min + Math.random() * (max - min);
        };
        Util.map = function(a, b, c, d, e) {
        return (a - b) / (c - b) * (e - d) + d;
        };
        Util.lerp = function(value1, value2, amount) {
        return value1 + (value2 - value1) * amount;
        };
        Util.array2D = function(tableau, array_width){
            var result = [];
            for (var i = 0; i < tableau.length; i += array_width) result.push(tableau.slice(i, i + array_width));
            return result;
        };
        Util.threeAngle = function(p0,p1,p2){
            var b = Math.pow(p1.x-p0.x,2) + Math.pow(p1.y-p0.y,2),
                a = Math.pow(p1.x-p2.x,2) + Math.pow(p1.y-p2.y,2),
                c = Math.pow(p2.x-p0.x,2) + Math.pow(p2.y-p0.y,2);
            return Math.acos( (a+b-c) / Math.sqrt(4*a*b) );
        }

        var Tween = {};
        Tween.linear = function(currentTime, start, degreeOfChange, duration) {
        return degreeOfChange * currentTime / duration + start;
        };
        Tween.easeInOutQuad = function(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
        };
        Tween.easeInOutExpo = function(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        t--;
        return c / 2 * (-Math.pow(2, -10 * t) + 2) + b;
        };

        class Vector{
            constructor(x,y){
                this.x = x || 0;
                this.y = y || 0;
            }
            set(x,y){
                this.x = x;
                this.y = y;
            }
        reset(){
                this.x = 0;
                this.y = 0;
        }
            fromAngle(angle){
                let x = Math.cos(angle),
                    y = Math.sin(angle);
                return new Vector(x,y);
            }
            add(vector){
                this.x += vector.x;
                this.y += vector.y;
            }
            sub(vector){
                this.x -= vector.x;
                this.y -= vector.y;
            }
            mult(scalar){
                this.x *= scalar;
                this.y *= scalar;
            }
            div(scalar){
                this.x /= scalar;
                this.y /= scalar;
            }
            dot(vector){
                return vector.x * this.x + vector.y * this.y;
            }
            limit(limit_value){
                if(this.mag() > limit_value) this.setMag(limit_value);
            }
            mag(){
                return Math.hypot(this.x,this.y);
            }
            setMag(new_mag){
                if(this.mag() > 0){
                    this.normalize();
                }else{
                    this.x = 1;
                    this.y = 0;
                }
                this.mult(new_mag);
            }
            normalize(){
                let mag = this.mag();
                if(mag > 0){
                    this.x /= mag;
                    this.y /= mag;
                }
            }
            heading(){
                return Math.atan2(this.x,this.y);
            }
            setHeading(angle){
                let mag = this.mag();
                this.x = Math.cos(angle) * mag;
                this.y = Math.sin(angle) * mag;
            }
            dist(vector){
                return new Vector(this.x - vector.x,this.y - vector.y).mag();
            }
            angle(vector){
                return Math.atan2(vector.y - this.y, vector.x - this.x);
            }	
            copy(){
                return new Vector(this.x,this.y);
            }
        }

        var H = 350;
        var W = 350;
        var circle_r = 150;

        const ctx2 = new PIXI.Graphics();
        app.stage.addChild(ctx2);
        ctx2.x = 0;
        ctx2.y = 0;

        let cursor = new Vector(W/2,H/2);
        function mousemove(event) {
        cursor.x = event.pageX - canvas.offsetLeft;
        cursor.y = event.pageY - canvas.offsetTop;
        }

        class Point {
        constructor(x, y, c_number, num_number ) {
            this.position = new Vector(x, y);
            this.acceleration = new Vector(0, 0).fromAngle(Util.random(0,2*Math.PI));
            this.velocity = new Vector(0, 0);
            this.radius = 5 + 45*num_number;
            this.zone = this.radius + 40;
            this.c = c_number;
            this.min_radius = 0.8 * this.radius;
            this.max_radius = this.radius;
            this.num_number = num_number;
        }
        display() {
            
            var color = this.c;

            ctx2.beginFill(color,Util.map(this.radius, this.min_radius, this.max_radius, 1, 0.3))
            ctx2.drawCircle(this.position.x, this.position.y, this.radius)
            ctx2.endFill();
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


        let points = [];

        for (let i = 0; i < length0; i++) {
            points.push(new Point(cursor.x,cursor.y,color_classfy[i],num_relative[i]));
        }

        function index_classfy() {
        
            ctx2.clear();
            ctx2.beginFill(0x000000,0);
            ctx2.drawRect(0, 0, W, H);
            ctx2.endFill();


            points.forEach(point => {
                point.detection(points);
            });
            points.forEach(point => {
                point.display();
                point.bound();
                point.integrate();
            });
        }

        /* mark_statistics.js*/

        var ctx_classfy = [];
        var y_adj = -100;
        var y0_adj = -30;
        var x_adj = -10;

        const ctx_0 = new PIXI.Graphics();
        ctx_0.beginFill(color_classfy[0], 1);
        ctx_0.drawCircle(75+x_adj, 485+y_adj+y0_adj, 6);
        ctx_0.endFill();
        ctx_classfy.push(ctx_0);

        const ctx_1 = new PIXI.Graphics();
        ctx_1.beginFill(color_classfy[1], 1);
        ctx_1.drawCircle(75+x_adj, 505+y_adj+y0_adj, 6);
        ctx_1.endFill();
        ctx_classfy.push(ctx_1);

        const ctx_2 = new PIXI.Graphics();
        ctx_2.beginFill(color_classfy[2], 1);
        ctx_2.drawCircle(75+x_adj, 525+y_adj+y0_adj, 6);
        ctx_2.endFill();
        ctx_classfy.push(ctx_2);

        const ctx_3 = new PIXI.Graphics();
        ctx_3.beginFill(color_classfy[3], 1);
        ctx_3.drawCircle(75+x_adj, 545+y_adj+y0_adj, 6);
        ctx_3.endFill();
        ctx_classfy.push(ctx_3);

        const ctx_4 = new PIXI.Graphics();
        ctx_4.beginFill(color_classfy[4], 1);
        ctx_4.drawCircle(75+x_adj, 565+y_adj+y0_adj, 6);
        ctx_4.endFill();
        ctx_classfy.push(ctx_4);

        const ctx_5 = new PIXI.Graphics();
        ctx_5.beginFill(color_classfy[5], 1);
        ctx_5.drawCircle(75+x_adj, 585+y_adj+y0_adj, 6);
        ctx_5.endFill();
        ctx_classfy.push(ctx_5);


        const style = new PIXI.TextStyle({
            fontFamily: "黑体",
            fontSize: 12,
            fontWeight: 'bold',
            fill: "#ffffff", 
            stroke: "#ffffff",
            strokeThickness: 0,
            wordWrap: true,
            wordWrapWidth: 440,
        });

        var Text = [];
        var Text_num = [];
        var Text_rate = [];

        const Text_beginTime = new PIXI.Text("统计开始时间："+beginTime, style);
        Text_beginTime.x = 75+x_adj;
        Text_beginTime.y = 410+y_adj;
        app.stage.addChild(Text_beginTime);

        const Text_endTime = new PIXI.Text("统计结束时间："+endTime, style);
        Text_endTime.x = 75+x_adj;
        Text_endTime.y = 430+y_adj;
        app.stage.addChild(Text_endTime);

        const Text0 = new PIXI.Text(content[0], style);
        Text0.x = 100+x_adj;
        Text0.y = 480+y_adj+y0_adj;
        Text.push(Text0);
        const Text_num0 = new PIXI.Text(num_classfy[0]+"条", style);
        Text_num0.x = 270+x_adj;
        Text_num0.y = 480+y_adj+y0_adj;
        Text_num.push(Text_num0);
        const Text_rate0 = new PIXI.Text(rate_classfy[0]+"%", style);
        Text_rate0.x = 320+x_adj;
        Text_rate0.y = 480+y_adj+y0_adj;
        Text_rate.push(Text_rate0);

        const Text1 = new PIXI.Text(content[1], style);
        Text1.x = 100+x_adj;
        Text1.y = 500+y_adj+y0_adj;
        Text.push(Text1);
        const Text_num1 = new PIXI.Text(num_classfy[1]+"条", style);
        Text_num1.x = 270+x_adj;
        Text_num1.y = 500+y_adj+y0_adj;
        Text_num.push(Text_num1);
        const Text_rate1 = new PIXI.Text(rate_classfy[1]+"%", style);
        Text_rate1.x = 320+x_adj;
        Text_rate1.y = 500+y_adj+y0_adj;
        Text_rate.push(Text_rate1);

        const Text2 = new PIXI.Text(content[2], style);
        Text2.x = 100+x_adj;
        Text2.y = 520+y_adj+y0_adj;
        Text.push(Text2);
        const Text_num2 = new PIXI.Text(num_classfy[2]+"条", style);
        Text_num2.x = 270+x_adj;
        Text_num2.y = 520+y_adj+y0_adj;
        Text_num.push(Text_num2);
        const Text_rate2 = new PIXI.Text(rate_classfy[2]+"%", style);
        Text_rate2.x = 320+x_adj;
        Text_rate2.y = 520+y_adj+y0_adj;
        Text_rate.push(Text_rate2);

        const Text3 = new PIXI.Text(content[3], style);
        Text3.x = 100+x_adj;
        Text3.y = 540+y_adj+y0_adj;
        Text.push(Text3);
        const Text_num3 = new PIXI.Text(num_classfy[3]+"条", style);
        Text_num3.x = 270+x_adj;
        Text_num3.y = 540+y_adj+y0_adj;
        Text_num.push(Text_num3);
        const Text_rate3 = new PIXI.Text(rate_classfy[3]+"%", style);
        Text_rate3.x = 320+x_adj;
        Text_rate3.y = 540+y_adj+y0_adj;
        Text_rate.push(Text_rate3);

        const Text4 = new PIXI.Text(content[4], style);
        Text4.x = 100+x_adj;
        Text4.y = 560+y_adj+y0_adj;
        Text.push(Text4);
        const Text_num4 = new PIXI.Text(num_classfy[4]+"条", style);
        Text_num4.x = 270+x_adj;
        Text_num4.y = 560+y_adj+y0_adj;
        Text_num.push(Text_num4);
        const Text_rate4 = new PIXI.Text(rate_classfy[4]+"%", style);
        Text_rate4.x = 320+x_adj;
        Text_rate4.y = 560+y_adj+y0_adj;
        Text_rate.push(Text_rate4);



        for(var i=0; i<length0; ++i){
            app.stage.addChild(Text[i]);
            app.stage.addChild(Text_num[i]);
            app.stage.addChild(Text_rate[i]);
            app.stage.addChild(ctx_classfy[i]);
        }
        

        function loop_classfy() {
        loop_update();
        index_classfy();
        requestAnimationFrame(loop_classfy);
        }

        loop_classfy();
    }

    introduction(){
        const { app } = this;
        var logo = new PIXI.Sprite(PIXI.loader.resources["img/12.png"].texture);
        logo.buttonMode = true;
        logo.interactive = true;
        logo.position.set(-5, 41);
        logo.scale.set(0.55,0.55);
        app.stage.addChild(logo);
    }

    setControl(){
        const { app } = this;

        var input = new PIXI.TextInput({
            input: {
                fontFamily: "黑体",
                fontSize: '15px',
                padding: '10px',
                width: '120px',
                color: '#000000'
            },
            box: {
                default: {fill: 0xE8E9F3, rounded: 12, stroke: {color: 0xCBCEE0, width: 3}},
                focused: {fill: 0xE1E3EE, rounded: 12, stroke: {color: 0xABAFC6, width: 3}},
                disabled: {fill: 0xDBDBDB, rounded: 12}
            }
        })
        input.placeholder = '输入分类阈值';
        input.x = 110;
        input.y = 130;
        input.pivot.x = input.width/2;
        input.pivot.y = input.height/2;
        app.stage.addChild(input);


        var x0 = 20;
        var y0 = 40;
        
        var input1 = new PIXI.TextInput({
            input: {
                fontFamily: "黑体",
                fontSize: '15px',
                padding: '7px',
                width: '180px',
                color: '#000000'
            },
            box: {
                default: {fill: 0xE8E9F3, rounded: 12, stroke: {color: 0xCBCEE0, width: 3}},
                focused: {fill: 0xE1E3EE, rounded: 12, stroke: {color: 0xABAFC6, width: 3}},
                disabled: {fill: 0xDBDBDB, rounded: 12}
            }
        })
        input1.placeholder = '输入统计内容1';
        input1.x = 120+x0;
        input1.y = 200+y0;
        input1.pivot.x = input1.width/2;
        input1.pivot.y = input1.height/2;
        app.stage.addChild(input1);

        var input2 = new PIXI.TextInput({
            input: {
                fontFamily: "黑体",
                fontSize: '15px',
                padding: '7px',
                width: '180px',
                color: '#000000'
            },
            box: {
                default: {fill: 0xE8E9F3, rounded: 12, stroke: {color: 0xCBCEE0, width: 3}},
                focused: {fill: 0xE1E3EE, rounded: 12, stroke: {color: 0xABAFC6, width: 3}},
                disabled: {fill: 0xDBDBDB, rounded: 12}
            }
        })
        input2.placeholder = '输入统计内容2';
        input2.x = 120+x0;
        input2.y = 250+y0;
        input2.pivot.x = input2.width/2;
        input2.pivot.y = input2.height/2;
        app.stage.addChild(input2);


        var input3 = new PIXI.TextInput({
            input: {
                fontFamily: "黑体",
                fontSize: '15px',
                padding: '7px',
                width: '180px',
                color: '#000000'
            },
            box: {
                default: {fill: 0xE8E9F3, rounded: 12, stroke: {color: 0xCBCEE0, width: 3}},
                focused: {fill: 0xE1E3EE, rounded: 12, stroke: {color: 0xABAFC6, width: 3}},
                disabled: {fill: 0xDBDBDB, rounded: 12}
            }
        })
        input3.placeholder = '输入统计内容3';
        input3.x = 120+x0;
        input3.y = 300+y0;
        input3.pivot.x = input3.width/2;
        input3.pivot.y = input3.height/2;
        app.stage.addChild(input3);


        var input4 = new PIXI.TextInput({
            input: {
                fontFamily: "黑体",
                fontSize: '15px',
                padding: '7px',
                width: '180px',
                color: '#000000'
            },
            box: {
                default: {fill: 0xE8E9F3, rounded: 12, stroke: {color: 0xCBCEE0, width: 3}},
                focused: {fill: 0xE1E3EE, rounded: 12, stroke: {color: 0xABAFC6, width: 3}},
                disabled: {fill: 0xDBDBDB, rounded: 12}
            }
        })
        input4.placeholder = '输入统计内容4';
        input4.x = 120+x0;
        input4.y = 350+y0;
        input4.pivot.x = input4.width/2;
        input4.pivot.y = input4.height/2;
        app.stage.addChild(input4);



        var button_1 = new PIXI.Sprite(PIXI.loader.resources["img/07.jpg"].texture);
        button_1.buttonMode = true;
        button_1.interactive = true;
        button_1.position.set(260, 260);
        button_1.scale.set(0.16,0.16);
        app.stage.addChild(button_1);
        button_1.on('pointerdown', () => this.start(input1.text,input2.text,input3.text,input4.text))

        var button_2 = new PIXI.Sprite(PIXI.loader.resources["img/08.jpg"].texture);
        button_2.buttonMode = true;
        button_2.interactive = true;
        button_2.position.set(260, 340);
        button_2.scale.set(0.16,0.16);
        app.stage.addChild(button_2);
        button_2.on('pointerdown', () => this.stop())

        var button_3 = new PIXI.Sprite(PIXI.loader.resources["img/09.jpg"].texture);
        button_3.buttonMode = true;
        button_3.interactive = true;
        button_3.position.set(30,45);
        button_3.scale.set(0.30,0.30);
        app.stage.addChild(button_3);

        var button_4 = new PIXI.Sprite(PIXI.loader.resources["img/10.jpg"].texture);
        button_4.buttonMode = true;
        button_4.interactive = true;
        button_4.position.set(30,150);
        button_4.scale.set(0.32,0.32);
        app.stage.addChild(button_4);

        var button_5 = new PIXI.Sprite(PIXI.loader.resources["img/11.jpg"].texture);
        button_5.buttonMode = true;
        button_5.interactive = true;
        button_5.position.set(230, 100);
        button_5.scale.set(0.30,0.30);
        app.stage.addChild(button_5);
        button_5.on('pointerdown', () => this.setControlButton(input.text))

        
    }

    start(input1,input2,input3,input4){
        const { wss } = this;
        
        var keyword = "{";

        if(input1 != ""){
            keyword += "1:'"+input1+"',";
        }
        if(input2 != ""){
            keyword += "2:'"+input2+"',";
        }
        if(input3 != ""){
            keyword += "3:'"+input3+"',";
        }
        if(input4 != ""){
            keyword += "4:'"+input4+"'";
        }
        keyword += "}";

        wss.C2SSetKeyword(keyword);
        alert("开始统计！")

    }

    stop(){
        const { wss } = this;
        wss.C2SStopCount();
        alert("结束统计！")
    }

    setControlButton(input){
        const { wss } = this;
        var threshold = "{'threshold':"+input+"}";
        console.log(threshold);
        alert("成功修改阈值！")
    }
    
    amplify(){
        const { app } = this;
        app.stage.scale.set(window.innerWidth / 375,window.innerWidth / 375)
    }

    send(){
        const { wss } = this;
        this.timer = setInterval(() => {
            wss.C2SRequestTable();
            wss.C2SRequestCount();
            if(this.buttonState == 1){this.onButtonDown1();console.log("更新1页面");}
            if(this.buttonState == 2){this.onButtonDown2();console.log("更新2页面");}
            if(this.buttonState == 3){this.onButtonDown3();console.log("更新3页面");}
            if(this.buttonState == 4){this.onButtonDown4();console.log("更新4页面");}
            if(this.buttonState == 5){this.onButtonDown5();console.log("更新5页面");}
            
        }, 60 * 1000);
    }

    update_payload_211(payload){
        this.payload_211 = payload;
    }

    update_payload_222(payload){
        this.payload_222 = payload;
    }

    preparation(){
        const { app } = this;
        let style = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 26,
            fill: "white",
             dropShadow: true,
            dropShadowColor: "#3372A6",
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
          });

        const Text1 = new PIXI.Text('加载中。。。', style);
        Text1.x = 130;
        Text1.y = 220;
        app.stage.addChild(Text1);
    }

    test(){
        const { app } = this;

        payload = this.payload_211

        var aaa = payload[1][0].内容.length;

        let style = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 10,
            fill: "white",
             dropShadow: true,
            dropShadowColor: "#3372A6",
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
          });

        const Text1 = new PIXI.Text(aaa, style);
        Text1.x = 50;
        Text1.y = 500;
        app.stage.addChild(Text1);
    }
}



//先在浏览器端完成一个发送到渲染到流程

// const isHyExt = getIsHyExt();
// window.__isAnchor = getIsAnchor();
// // window.__isAnchor = true;
// window.__isMobile = isHyExt && !!~window.navigator.userAgent.indexOf('Mobile');

class Wss{
    constructor({ jwt, main }){
      this.main = main;
      // 根据传入数据生成websocket-server对象
      const wssInstance = (this.wssInstance = getWebSocket(
        `ws://106.52.117.231:9090/ws`
      ));
      wssInstance.binaryType = 'arraybuffer'
      wssInstance.onopen = this.onopen.bind(this);
      wssInstance.onmessage = this.onmessage.bind(this);
      wssInstance.onclose = this.onclose.bind(this);
    }
  
    onopen(event) {
    //   this.C2SRequestTable();// 暂时是onopen触发！！！
    //   this.C2SRequestCount();
    }
    C2SRequestTable() {
      console.log( `C2SRequestTable (定时触发)请求情绪、分类表格`);
      this.send({
          "protocol": 111,
          "payload": "{}"
      });
    }
    C2SSetThreshold(threshold) {
      console.log( `(主播按键触发)发送阈值，调整分类精度`);
      this.send({
          "protocol": 112,
          "payload": JSON.stringify(threshold)
      });
    }
    C2SSetKeyword(keyword) {
      console.log( `(主播按键触发)发送关键词，请求开始统计`);
      this.send({
          "protocol": 121,
          "payload": JSON.stringify(keyword)
      });
    }
    C2SRequestCount() {
      console.log( `C2SRequestCount (定时触发)请求统计结果`);
      this.send({
          "protocol": 122,
          "payload": "{}"
      });
    }
    C2SStopCount() {
      console.log( `(主播按键触发)停止统计结果`);
      this.send({
          "protocol": 123,
          "payload": "{}"
      });
    }
    
  
    onmessage(event) {
      const { main } = this;
      const { data } = event;
      const { protocol, payload } = JSON.parse(data);
      // const _payload = payload ? JSON.parse(payload) : {};
      console.log(this.deProtocol(protocol))
      switch (~~protocol) {
        case 211:
          console.log(payload);
          this.main.update_payload_211(payload);
          //this.main.button(payload);
          //this.main.button_statis({});
          //this.main.emotion(payload);
          //this.main.setup(payload);
          //this.main.test();
          break;
        case 222:
          console.log(payload);
          this.main.update_payload_222(payload);
          //this.main.button([[],[]]);
          //this.main.button_statis(payload);
          //this.main.statistics(payload);

          break;
        default:
          break;
      }
    }
    onclose(event) {
      console.log("链接关闭 !");
    }
    send(obj) {
      this.wssInstance.send(JSON.stringify(obj));
      console.log("发送成功 !");
    } 
    deProtocol(protocol){
      switch (~~protocol) {
        case 211:
          return 'S2CTableContent 返回表格内容'
        case 222:
          return 'S2CCountContent 返回统计结果'
        default:
          return
      }
    }
  }

  
  //全局函数
  function getWebSocket(url) {
    if (getIsHyExt()) {
        return new hyExt.WebSocket(url);
    } else {
        return new WebSocket(url);
    }
  }
  
  function getIsHyExt() {
    return !!window.hyExt;
  }
  
  function getIsAnchor() {
    return !!~window.__HYEXT_TYPE.indexOf('anchor');
  }
  
function setWPx(value) {
    return value * window.innerWidth / 375;
}

function setHPx(value) {
    return value * window.innerHeight / 667;
}

new Main();