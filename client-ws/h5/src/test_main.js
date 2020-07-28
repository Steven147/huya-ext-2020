class Main {
    constructor() {
        this.readyList = [];
        this.players = [];

        const app = (this.app = new PIXI.Application({
            antialias: true, width: 375, height: 600
        }));

        document.body.appendChild(app.view);
        app.stage.interactive = true;
        app.renderer.backgroundColor = 0x000000;

        PIXI.loader
            .add("img/01.jpg")
            .add("img/02.jpg")
            .add("img/03.jpg")
            .add("img/04.jpg")
            .load(() => this.setup());
    }

    setup(){
        this.button();
    }

    button(){
        const { app, emotion, classfy, statistics, setup } = this;

        var button1 = new PIXI.Sprite(PIXI.loader.resources["img/01.jpg"].texture);
        button1.buttonMode = true;
        button1.interactive = true;
        button1.position.set(0, 0);
        button1.scale.set(0.23,0.23);
        app.stage.addChild(button1);
        button1.on('pointerdown', onButtonDown1)
      
        var button2 = new PIXI.Sprite(PIXI.loader.resources["img/02.jpg"].texture);
        button2.buttonMode = true;
        button2.interactive = true;
        button2.position.set(94, 0);
        button2.scale.set(0.23,0.23);
        app.stage.addChild(button2);
        button2.on('pointerdown', onButtonDown2)
      
        var button3 = new PIXI.Sprite(PIXI.loader.resources["img/03.jpg"].texture);
        button3.buttonMode = true;
        button3.interactive = true;
        button3.position.set(186, 0);
        button3.scale.set(0.23,0.23);
        app.stage.addChild(button3);
        button3.on('pointerdown', onButtonDown3)
      
        var button4 = new PIXI.Sprite(PIXI.loader.resources["img/04.jpg"].texture);
        button4.buttonMode = true;
        button4.interactive = true;
        button4.position.set(280, 0);
        button4.scale.set(0.23,0.23);
        app.stage.addChild(button4);
        button4.on('pointerdown', onButtonDown4)

        function onButtonDown1(){
            this.isdown = true;
            app.stage.removeChildren();
            setup();
            emotion();
          }
          
          function onButtonDown2(){
            this.isdown = true;
            app.stage.removeChildren();
            setup();
            classfy();
          }
          
          function onButtonDown3(){
            this.isdown = true;
            app.stage.removeChildren();
            setup();
            statistics();
          }
          
          function onButtonDown4(){
            this.isdown = true;
            app.stage.removeChildren();
            setup();
            introduction(); 
          }
          
          function start(){
            emotion();
          }
          
          start();
    }

    emotion(){
        var that = this
        const  app  = that;

        /* script_emotion.js*/ 
        var w = 375;
        var h = 375;
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
            {t:180, r:(cx-30),  d:40, s:40, c:C[4]},
            {t:80, r:(cx-40),  d:20, s:40, c:C[4]},
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

        const ctx = new PIXI.Graphics();
        app.stage.addChild(ctx);
        ctx.x = 0;
        ctx.y = 50;

        function draw() {
        var i, j, k, xd, yd, d, ring, ringLength, ringLength2, particle, p2;

        ctx.clear();
        ctx.beginFill(0x000000);
        ctx.drawRect(0, 0 , w, h);
        ctx.endFill();

        for (i = 0; i < ringsLength; i++) {
            ring = rings[i];
            ringLength = ring.length;
            ringLength2 = ringLength - 100;
            
            for (j = 0; j < ringLength; j++) {
            particle = ring[j];

            particle.x = cx + particle.R * sin(PI_HALF + particle.pos);
            particle.y = cy + particle.R * cos(PI_HALF + particle.pos);
            particle.pos += particle.s;

            ctx.beginFill(particle.c,0.3);
            ctx.drawCircle(particle.x, particle.y, particle.r)
            ctx.endFill();

            for (k = 0; k < ringLength2; k++) {
                p2 = ring[k];

                yd = p2.y - particle.y;
                xd = p2.x - particle.x;
                d = ((xd * xd) + (yd * yd));

                if (d < particle.d2) {
                ctx.beginFill(p2.c,1);
                ctx.lineStyle(lineWidth, p2.c, 1);
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.closePath();
                ctx.endFill();
                }
            }
            }
        }
        }

        /* index_emotion.js*/

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

        const ctx2 = new PIXI.Graphics();
        app.stage.addChild(ctx2);

        ctx2.x = 187.5;
        ctx2.y = 237.5;

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

        function index_emotion() {
        
            ctx2.clear();
            ctx2.scale.set(160/ 2, 160 / 2);
            
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
                ctx2.drawCircle(x * w, y * w, w / 60);
                ctx2.endFill();
            }
        };

        /* mark_emotion.js*/

        var w_adj = 20;
        var h_adj = 0;
        var num_positive = 50;
        var num_negative = 50;
        var rate_positive = 50;
        var rate_negative = 50;

        const ctx3 = new PIXI.Graphics();
        app.stage.addChild(ctx3);
        ctx3.x = 50;
        ctx3.y = 425;

        ctx3.beginFill(0xFF7700, 1);
        ctx3.drawCircle(25, 8, 8);
        ctx3.endFill();

        ctx3.beginFill(0x20E9E9, 1);
        ctx3.drawCircle(25, 38, 8);
        ctx3.endFill();

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
        Text1.x = 100;
        Text1.y = 425;
        app.stage.addChild(Text1);

        const Text1_1 = new PIXI.Text(num_positive+"条", style);
        Text1_1.x = 190;
        Text1_1.y = 425;
        app.stage.addChild(Text1_1);

        const Text1_2 = new PIXI.Text(rate_positive+"%", style);
        Text1_2.x = 250;
        Text1_2.y = 425;
        app.stage.addChild(Text1_2);



        const Text2 = new PIXI.Text('negative', style);
        Text2.x = 100;
        Text2.y = 455;
        app.stage.addChild(Text2);

        const Text2_1 = new PIXI.Text(num_negative+"条", style);
        Text2_1.x = 190;
        Text2_1.y = 455;
        app.stage.addChild(Text2_1);

        const Text2_2 = new PIXI.Text(rate_negative+"%", style);
        Text2_2.x = 250;
        Text2_2.y = 455;
        app.stage.addChild(Text2_2);

        function loop_emotion() {
        draw();
        index_emotion();
        requestAnimationFrame(loop_emotion);
        }

        loop_emotion();
    }

    classfy(){
        const { app } = this;

        /* script_classfy.js*/ 
        var w = 375;
        var h = 375;
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
            {t:180, r:(cx-30),  d:40, s:40, c:C[4]},
            {t:80, r:(cx-40),  d:20, s:40, c:C[4]},
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

        const ctx = new PIXI.Graphics();
        app.stage.addChild(ctx);
        ctx.x = 0;
        ctx.y = 50;

        function draw() {
        var i, j, k, xd, yd, d, ring, ringLength, ringLength2, particle, p2;

        ctx.clear();
        ctx.beginFill(0x000000);
        ctx.drawRect(0, 0 , w, h);
        ctx.endFill();

        for (i = 0; i < ringsLength; i++) {
            ring = rings[i];
            ringLength = ring.length;
            ringLength2 = ringLength - 100;
            
            for (j = 0; j < ringLength; j++) {
            particle = ring[j];

            particle.x = cx + particle.R * sin(PI_HALF + particle.pos);
            particle.y = cy + particle.R * cos(PI_HALF + particle.pos);
            particle.pos += particle.s;

            ctx.beginFill(particle.c,0.3);
            ctx.drawCircle(particle.x, particle.y, particle.r)
            ctx.endFill();

            for (k = 0; k < ringLength2; k++) {
                p2 = ring[k];

                yd = p2.y - particle.y;
                xd = p2.x - particle.x;
                d = ((xd * xd) + (yd * yd));

                if (d < particle.d2) {
                ctx.beginFill(p2.c,1);
                ctx.lineStyle(lineWidth, p2.c, 1);
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.closePath();
                ctx.endFill();
                }
            }
            }
        }
        }

        /*index_classfy*/

        Util = {};
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

        Tween = {};
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

        var H = 375;
        var W = 375;
        var circle_r = 160;

        const ctx2 = new PIXI.Graphics();
        app.stage.addChild(ctx2);
        ctx2.x = 0;
        ctx2.y = 0;

        let cursor = new Vector(W/2,H/2+50);
        function mousemove(event) {
        cursor.x = event.pageX - canvas.offsetLeft;
        cursor.y = event.pageY - canvas.offsetTop;
        }

        class Point {
        constructor(x, y, token_number, num_number ) {
            this.position = new Vector(x, y);
            this.acceleration = new Vector(0, 0).fromAngle(Util.random(0,2*Math.PI));
            this.velocity = new Vector(0, 0);
            this.radius = 10 + 25*num_number/100;
            this.zone = this.radius + 40;
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

        var w_adj = 20;
        var h_adj = 0;
        var content1 = "content1";
        var content2 = "content2";
        var content3 = "content3";
        var content4 = "content4";
        var content5 = "content5";
        var num1 = 20;
        var num2 = 20;
        var num3 = 20;
        var num4 = 20;
        var num5 = 20;
        var rate1 = 20;
        var rate2 = 20;
        var rate3 = 20;
        var rate4 = 20;
        var rate5 = 20;

        const ctx3 = new PIXI.Graphics();
        app.stage.addChild(ctx3);
        ctx3.x = 0;
        ctx3.y = 0;

        ctx3.beginFill(0xFF3333, 1);
        ctx3.drawCircle(25+50, 420+8, 8);
        ctx3.endFill();

        ctx3.beginFill(0x00BBFF, 1);
        ctx3.drawCircle(25+50, 420+38, 8);
        ctx3.endFill();

        ctx3.beginFill(0xFFFF00, 1);
        ctx3.drawCircle(25+50, 420+68, 8);
        ctx3.endFill();

        ctx3.beginFill(0x00FF00, 1);
        ctx3.drawCircle(25+50, 420+98, 8);
        ctx3.endFill();

        ctx3.beginFill(0xFF3EFF, 1);
        ctx3.drawCircle(25+50, 420+128, 8);
        ctx3.endFill();

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
        Text1.x = 100;
        Text1.y = 420;
        app.stage.addChild(Text1);

        const Text1_1 = new PIXI.Text(num1+"条", style);
        Text1_1.x = 190;
        Text1_1.y = 420;
        app.stage.addChild(Text1_1);

        const Text1_2 = new PIXI.Text(rate1+"%", style);
        Text1_2.x = 250;
        Text1_2.y = 420;
        app.stage.addChild(Text1_2);



        const Text2 = new PIXI.Text(content2, style);
        Text2.x = 100;
        Text2.y = 450;
        app.stage.addChild(Text2);

        const Text2_1 = new PIXI.Text(num2+"条", style);
        Text2_1.x = 190;
        Text2_1.y = 450;
        app.stage.addChild(Text2_1);

        const Text2_2 = new PIXI.Text(rate2+"%", style);
        Text2_2.x = 250;
        Text2_2.y = 450;
        app.stage.addChild(Text2_2);



        const Text3 = new PIXI.Text(content3, style);
        Text3.x = 100;
        Text3.y = 480;
        app.stage.addChild(Text3);

        const Text3_1 = new PIXI.Text(num3+"条", style);
        Text3_1.x = 190;
        Text3_1.y = 480;
        app.stage.addChild(Text3_1);

        const Text3_2 = new PIXI.Text(rate3+"%", style);
        Text3_2.x = 250;
        Text3_2.y = 480;
        app.stage.addChild(Text3_2);



        const Text4 = new PIXI.Text(content4, style);
        Text4.x = 100;
        Text4.y = 510;
        app.stage.addChild(Text4);

        const Text4_1 = new PIXI.Text(num4+"条", style);
        Text4_1.x = 190;
        Text4_1.y = 510;
        app.stage.addChild(Text4_1);

        const Text4_2 = new PIXI.Text(rate4+"%", style);
        Text4_2.x = 250;
        Text4_2.y = 510;
        app.stage.addChild(Text4_2);



        const Text5 = new PIXI.Text(content5, style);
        Text5.x = 100;
        Text5.y = 540;
        app.stage.addChild(Text5);

        const Text5_1 = new PIXI.Text(num5+"条", style);
        Text5_1.x = 190;
        Text5_1.y = 540;
        app.stage.addChild(Text5_1);

        const Text5_2 = new PIXI.Text(rate5+"%", style);
        Text5_2.x = 250;
        Text5_2.y = 540;
        app.stage.addChild(Text5_2);


        function loop_classfy() {
        draw();
        index_classfy();
        requestAnimationFrame(loop_classfy);
        }

        loop_classfy();
    }

    statistics(){
        const { app } = this;

        /* script_statistics.js*/ 
        var w = 375;
        var h = 375;
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
                {t:180, r:(cx-30),  d:40, s:40, c:C[4]},
            {t:80, r:(cx-40),  d:20, s:40, c:C[4]},
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
        
        const ctx = new PIXI.Graphics();
        app.stage.addChild(ctx);
        ctx.x = 0;
        ctx.y = 50;
        
        function draw() {
            var i, j, k, xd, yd, d, ring, ringLength, ringLength2, particle, p2;
        
            ctx.clear();
            ctx.beginFill(0x000000);
            ctx.drawRect(0, 0 , w, h);
            ctx.endFill();
        
            for (i = 0; i < ringsLength; i++) {
            ring = rings[i];
            ringLength = ring.length;
            ringLength2 = ringLength - 100;
            
            for (j = 0; j < ringLength; j++) {
                particle = ring[j];
        
                particle.x = cx + particle.R * sin(PI_HALF + particle.pos);
                particle.y = cy + particle.R * cos(PI_HALF + particle.pos);
                particle.pos += particle.s;
        
                ctx.beginFill(particle.c,0.3);
                ctx.drawCircle(particle.x, particle.y, particle.r)
                ctx.endFill();
        
                for (k = 0; k < ringLength2; k++) {
                p2 = ring[k];
        
                yd = p2.y - particle.y;
                xd = p2.x - particle.x;
                d = ((xd * xd) + (yd * yd));
        
                if (d < particle.d2) {
                    ctx.beginFill(p2.c,1);
                    ctx.lineStyle(lineWidth, p2.c, 1);
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.closePath();
                    ctx.endFill();
                }
                }
            }
            }
        }
        
        /*index_statistics*/
        
        Util = {};
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
        
        Tween = {};
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
        
        var H = 375;
        var W = 375;
        var circle_r = 160;
        
        const ctx2 = new PIXI.Graphics();
        app.stage.addChild(ctx2);
        ctx2.x = 0;
        ctx2.y = 0;
        
        let cursor = new Vector(W/2,H/2+50);
        function mousemove(event) {
            cursor.x = event.pageX - canvas.offsetLeft;
            cursor.y = event.pageY - canvas.offsetTop;
        }
        
        class Point {
            constructor(x, y, token_number, num_number ) {
            this.position = new Vector(x, y);
            this.acceleration = new Vector(0, 0).fromAngle(Util.random(0,2*Math.PI));
            this.velocity = new Vector(0, 0);
            this.radius = 10 + 25*num_number/100;
            this.zone = this.radius + 40;
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
        
        function index_statistics() {
        
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
        
        var w_adj = 20;
        var h_adj = 0;
        var content1 = "content1";
        var content2 = "content2";
        var content3 = "content3";
        var content4 = "content4";
        var content5 = "content5";
        var num1 = 20;
        var num2 = 20;
        var num3 = 20;
        var num4 = 20;
        var num5 = 20;
        var rate1 = 20;
        var rate2 = 20;
        var rate3 = 20;
        var rate4 = 20;
        var rate5 = 20;
        
        const ctx3 = new PIXI.Graphics();
        app.stage.addChild(ctx3);
        ctx3.x = 0;
        ctx3.y = 0;
        
        ctx3.beginFill(0xFF3333, 1);
        ctx3.drawCircle(25+50, 420+8, 8);
        ctx3.endFill();
        
        ctx3.beginFill(0x00BBFF, 1);
        ctx3.drawCircle(25+50, 420+38, 8);
        ctx3.endFill();
        
        ctx3.beginFill(0xFFFF00, 1);
        ctx3.drawCircle(25+50, 420+68, 8);
        ctx3.endFill();
        
        ctx3.beginFill(0x00FF00, 1);
        ctx3.drawCircle(25+50, 420+98, 8);
        ctx3.endFill();
        
        ctx3.beginFill(0xFF3EFF, 1);
        ctx3.drawCircle(25+50, 420+128, 8);
        ctx3.endFill();
        
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
        Text1.x = 100;
        Text1.y = 420;
        app.stage.addChild(Text1);
        
        const Text1_1 = new PIXI.Text(num1+"条", style);
        Text1_1.x = 190;
        Text1_1.y = 420;
        app.stage.addChild(Text1_1);
        
        const Text1_2 = new PIXI.Text(rate1+"%", style);
        Text1_2.x = 250;
        Text1_2.y = 420;
        app.stage.addChild(Text1_2);
        
        
        
        const Text2 = new PIXI.Text(content2, style);
        Text2.x = 100;
        Text2.y = 450;
        app.stage.addChild(Text2);
        
        const Text2_1 = new PIXI.Text(num2+"条", style);
        Text2_1.x = 190;
        Text2_1.y = 450;
        app.stage.addChild(Text2_1);
        
        const Text2_2 = new PIXI.Text(rate2+"%", style);
        Text2_2.x = 250;
        Text2_2.y = 450;
        app.stage.addChild(Text2_2);
        
        
        
        const Text3 = new PIXI.Text(content3, style);
        Text3.x = 100;
        Text3.y = 480;
        app.stage.addChild(Text3);
        
        const Text3_1 = new PIXI.Text(num3+"条", style);
        Text3_1.x = 190;
        Text3_1.y = 480;
        app.stage.addChild(Text3_1);
        
        const Text3_2 = new PIXI.Text(rate3+"%", style);
        Text3_2.x = 250;
        Text3_2.y = 480;
        app.stage.addChild(Text3_2);
        
        
        
        const Text4 = new PIXI.Text(content4, style);
        Text4.x = 100;
        Text4.y = 510;
        app.stage.addChild(Text4);
        
        const Text4_1 = new PIXI.Text(num4+"条", style);
        Text4_1.x = 190;
        Text4_1.y = 510;
        app.stage.addChild(Text4_1);
        
        const Text4_2 = new PIXI.Text(rate4+"%", style);
        Text4_2.x = 250;
        Text4_2.y = 510;
        app.stage.addChild(Text4_2);
        
        
        
        const Text5 = new PIXI.Text(content5, style);
        Text5.x = 100;
        Text5.y = 540;
        app.stage.addChild(Text5);
        
        const Text5_1 = new PIXI.Text(num5+"条", style);
        Text5_1.x = 190;
        Text5_1.y = 540;
        app.stage.addChild(Text5_1);
        
        const Text5_2 = new PIXI.Text(rate5+"%", style);
        Text5_2.x = 250;
        Text5_2.y = 540;
        app.stage.addChild(Text5_2);
        
        
        function loop_statistics() {
            draw();
            index_statistics();
            requestAnimationFrame(loop_statistics);
        }
        
        loop_statistics();
    }
}


new Main();