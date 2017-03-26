//define(function(require) {
//	require("/cloud/base/cloud");
    /*require("./requestNextAnimationFrame");*/
    var AgentCanvasTool = {
        initialize: function(options) { 
            this.drawable = options.drawable;
            this.canvasHeight = this.drawable.board.canvas.height;//画布的高度
            this.canvasWidth = this.drawable.board.canvas.width;//画布的宽度
            this.bigCircle = null;                           //大的红色的标识弧的圆 
            this.smallCircle = null;							 //小的红色的标识弧的圆 
            this.contrarotate = false;							//是否为逆时针
            this.flag1 = 0;                                     //大弧的起始位置
            this.flag2 = 0.7;									//大弧的结束位置
            this.smallFlag1 = 0;								//小弧的起始位置
            this.smallFlag2 = 0.7;								//小弧的结束位置
            this.render();
        },
        render: function() {
            this.manaDrawable();
            this.initModule();
            //this.drawArc();
            //this.onDataChanage(0);
            /*this.initRequestNextAnimationFrame();*/
        },
        manaDrawable: function() {
            if (this.drawable.board.sortedDrawables) {
                for (var i = 0; i < this.drawable.board.sortedDrawables.length; i++) {
                    var draw = this.drawable.board.sortedDrawables[i];
                    if (this.drawable.id == draw.id) {
                        var bigCircle = this.bigCircle;
                        var smallCircle = this.bigCircle;
                        var conveyer = {};
                        conveyer.bigCircle = bigCircle;
                        conveyer.smallCircle = smallCircle;
                        this.drawable.conveyer = conveyer;
                    }
                }
            }
        },
        initModule: function() {
            var bigWidth = this.drawable.width * 0.21;
            var bigHeight = this.drawable.height * 0.45;
            var smallWidth = this.drawable.width * 0.89;
            var smallHeight = this.drawable.height * 0.48;
            //if(!this.drawable.images[0].rotation){
            this.bigCircle = {
                x: this.drawable.x + bigWidth,
                y: this.drawable.y + bigHeight,
                radius: this.drawable.width * 0.16
            };
            this.smallCircle = {
                x: this.drawable.x + smallWidth,
                y: this.drawable.y + smallHeight,
                radius: this.drawable.width * 0.1
            };
            /*}else{
             if(this.drawable.images[0].rotation/90 == 1){
             
             
             this.bigCircle.x = this.drawable.x - bigHeight;
             this.bigCircle.y = this.drawable.y + bigWidth;
             this.smallCircle.x = this.drawable.x - smallHeight;
             this.smallCircle.y = this.drawable.y + smallWidth;
             }else if(this.drawable.images[0].rotation/90 == 2){
             this.bigCircle.x = this.drawable.x - bigWidth;
             this.bigCircle.y = this.drawable.y - bigHeight;
             this.smallCircle.x = this.drawable.x - smallWidth;
             this.smallCircle.y = this.drawable.y - smallHeight;
             
             
             }else if(this.drawable.images[0].rotation/90 == 3){
             this.bigCircle.x = this.drawable.x + bigHeight;
             this.bigCircle.y = this.drawable.y - bigWidth;
             this.smallCircle.x = this.drawable.x + smallHeight;
             this.smallCircle.y = this.drawable.y - smallWidth;
             
             }else{
             this.bigCircle = {
             x: this.drawable.x + bigWidth,
             y: this.drawable.y + bigHeight,
             radius:this.drawable.width*0.16
             };
             this.smallCircle = {
             x: this.drawable.x + smallWidth,
             y:this.drawable.y + smallHeight,
             radius:this.drawable.width*0.1
             };
             }*/
            //}

            //this.drawable.board.canvas.ctx2d.save();
        },
        /*initRequestNextAnimationFrame:function(){
         var self = this;
         var animate=function() {
         self.drawArc();
         window.requestNextAnimationFrame(animate);
         }
         window.requestNextAnimationFrame(animate);
         },*/
        onDataChanage: function(varValue,drawable) {
            var self = this;
            this.drawable = drawable;
            if (this.converyInterval) {
                window.clearInterval(self.converyInterval);
            }
            this.startChange(varValue);
        },
        change: function() {
            if (this.contrarotate == true) {
                this.flag1 = this.flag1 - 0.2;
                this.flag2 = this.flag2 - 0.2;
                this.smallFlag1 = this.smallFlag1 - 0.2 * (this.bigCircle.radius) / (this.smallCircle.radius);
                this.smallFlag2 = this.smallFlag2 - 0.2 * (this.bigCircle.radius) / (this.smallCircle.radius);
                while (this.smallFlag1 <= 0) {
                    this.smallFlag1 = this.smallFlag1 + 2;
                }
                while (this.smallFlag2 <= 0) {
                    this.smallFlag2 = this.smallFlag2 + 2;
                }
                while (this.flag2 <= 0) {
                    this.flag2 = this.flag2 + 2;
                }
                while (this.flag1 <= 0) {
                    this.flag1 = this.flag1 + 2;
                }
                /*this.flag1 = this.flag1 - 0.2;
                 this.flag2 = this.flag2 - 0.2;
                 this.smallFlag1 = this.smallFlag1 - 0.2*(this.bigCircle.radius)/(this.smallCircle.radius);
                 this.smallFlag2 = this.smallFlag2 - 0.2*(this.bigCircle.radius)/(this.smallCircle.radius);*/
            } else {
                this.flag1 = this.flag1 + 0.2;
                this.flag2 = this.flag2 + 0.2;
                this.smallFlag1 = this.smallFlag1 + 0.2 * (this.bigCircle.radius) / (this.smallCircle.radius);
                this.smallFlag2 = this.smallFlag2 + 0.2 * (this.bigCircle.radius) / (this.smallCircle.radius);
                while (this.smallFlag1 >= 2) {
                    this.smallFlag1 = this.smallFlag1 - 2;
                }
                while (this.smallFlag2 >= 2) {
                    this.smallFlag2 = this.smallFlag2 - 2;
                }
                while (this.flag2 >= 2) {
                    this.flag2 = this.flag2 - 2;
                }
                while (this.flag1 >= 2) {
                    this.flag1 = this.flag1 - 2;
                }
            }
            this.reDraw();
            this.drawArc();
        },
        reDraw: function() {
            this.drawable.board.canvas.ctx2d.save();
            this.drawable.board.canvas.ctx2d.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            this.drawable.board.redrawCanvas();
            this.drawable.board.canvas.ctx2d.restore();
        },
        startChange: function(varValue) {
            var self = this;
            var value = this.drawable.criticalValue;
            //this.converyInterval =setInterval(function(){
            //var varValue = parseInt(Math.random()*(value*2));
            if (this.interval) {
                window.clearInterval(self.interval);
            }
            if (varValue == value) {
                this.drawArc();
            } else {
                if (varValue > value) {
                    self.contrarotate = true;
                } else {
                    self.contrarotate = false;
                }
                self.converyInterval = setInterval(function() {
                    self.change();
                }, 100);
            }
            //},10000);
        },
        drawArc: function() {
            this.initModule();
            var RING_INNER_RADIUS = 10;
            var TICK_WIDTH = 10;
            this.drawable.board.canvas.ctx2d.beginPath();
            this.drawable.board.canvas.ctx2d.save();
            this.drawable.board.canvas.ctx2d.strokeStyle = 'red';
            this.drawable.board.canvas.ctx2d.lineWidth = 5;
            this.drawable.board.canvas.ctx2d.arc(this.bigCircle.x, this.bigCircle.y, this.bigCircle.radius * 2 / 3 + RING_INNER_RADIUS - TICK_WIDTH, this.flag1 * Math.PI, Math.PI * this.flag2, false);
            this.drawable.board.canvas.ctx2d.stroke();
            this.drawable.board.canvas.ctx2d.restore();


            this.drawable.board.canvas.ctx2d.beginPath();
            this.drawable.board.canvas.ctx2d.save();
            this.drawable.board.canvas.ctx2d.strokeStyle = 'red';
            this.drawable.board.canvas.ctx2d.lineWidth = 5;
            this.drawable.board.canvas.ctx2d.arc(this.smallCircle.x, this.smallCircle.y, this.smallCircle.radius * 2 / 3 + RING_INNER_RADIUS - TICK_WIDTH, this.smallFlag1 * Math.PI, Math.PI * this.smallFlag2, false);
            this.drawable.board.canvas.ctx2d.stroke();
            this.drawable.board.canvas.ctx2d.save();
            this.drawable.board.canvas.ctx2d.restore();

        },
        clearTimer: function() {
            var self = this;
            if (this.converyInterval) {
                window.clearInterval(self.converyInterval);
            }
            if (this.interval) {
                window.clearInterval(self.interval);
            }

        },
        destroy: function() {
            window.clearInterval(this.converyInterval);
        }
    };
//    return AgentCanvasTool;
//});