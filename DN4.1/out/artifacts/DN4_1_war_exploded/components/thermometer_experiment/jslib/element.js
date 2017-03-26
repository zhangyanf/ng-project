//define(function(require) {
var AgentCanvasTool = {
    initialize: function(options) {
        this.drawable = options.drawable;
        this.divTextValue = -20;
        this.height = null;
        this.canvasHeight = this.drawable.board.canvas.height;//画布的高度
        this.canvasWidth = this.drawable.board.canvas.width;//画布的宽度
        this.rangeHeight = this.drawable.displayScale ? parseInt((this.drawable.displayScale / 100) * 189) : 189;
        this.top = null;
        this.refreshTimerId = null;//定时器
        this.flag = false; //判断变量是否有值
        this.flagmin = false;
        this.render();
    },
    render: function() {
        this.manaDrawable();
        this.initModule();
    },
    manaDrawable: function() {
        if (this.drawable.board.sortedDrawables) {
            for (var i = 0; i < this.drawable.board.sortedDrawables.length; i++) {
                var draw = this.drawable.board.sortedDrawables[i];
                if (this.drawable.id == draw.id) {
                    var tempreture = {
                        value: this.divTextValue
                    };
                    var thermometer_experiment = {};
                    thermometer_experiment.tempreture = tempreture;
                    this.drawable.thermometer_experiment = thermometer_experiment;
                }
            }
        }
        if (this.drawable.thermometer_experiment == undefined) {
            var tempreture = {
                value: this.divTextValue
            };
            var thermometer_experiment = {};
            thermometer_experiment.tempreture = tempreture;
            this.drawable.thermometer_experiment = thermometer_experiment;
        }
    },
    initModule: function() {

        this.drawable.board.canvas.ctx2d.save();
        if (!this.drawable.board.editable && this.flag) {//如果不在工程界面且变量有值
            this.drawTemperatureBar();//画温度汞柱
        }
        this.drawable.board.canvas.ctx2d.restore();
    },
    //画温度汞柱
    drawTemperatureBar: function() {
        var self = this;
        var width = self.drawable.displayScale ? parseInt((self.drawable.displayScale / 100) * self.drawable.width) : self.drawable.width;
        var div_width = self.drawable.displayScale ? parseInt((self.drawable.displayScale / 100) * 12) : 12;
        if (self.height) {
        } else {
            self.height = 0;
        }
        this.pipe = new Pipe(self.drawable.x + width / 2 - 2, self.drawable.height - 45 - self.height + self.drawable.y, div_width, self.height);

        this.draw(this.pipe);
    },
    //画温度值
    drawTemperature: function(varValue) {
        // this.drawable.board.canvas.ctx2d.globalCompositeOperation = "source-over";
        this.drawable.board.canvas.ctx2d.font = "14px";
        this.drawable.board.canvas.ctx2d.fillStyle = '#e10011';
        this.drawable.board.canvas.ctx2d.fillText(varValue + "℃", this.pipe.rectX + 40, this.pipe.rectY);
    },
    draw: function(obj) {
        // this.drawable.board.canvas.ctx2d.save();
        // console.log("test,", this.drawable.board.canvas.ctx2d);
        // this.drawable.board.canvas.ctx2d.globalCompositeOperation = "source-over";
        this.drawable.board.canvas.ctx2d.fillStyle = "#e10011";
        this.drawable.board.canvas.ctx2d.linewidth = 0;
        this.drawable.board.canvas.ctx2d.fillRect( obj.rectX, obj.rectY, obj.rectW, obj.rectH);
        // console.log(" this.refreshTimerId on draw,", this.refreshTimerId);
        if (!this.refreshTimerId) {
            if (this.divTextValue) {
                this.drawTemperature(this.divTextValue);
            }
        }
    },
    onDataChanage: function(varValue, drawable) {
        var self = this;
        this.drawable = drawable;
        // this.drawable.setImage(0, {el: 'thermometer_experiment'}, false);
        if (!this.drawable.board.editable) {
            if (this.refreshTimerId) {
                this.clearTimer();
                // self.reDraw();
            }
            this.refreshTimerId = setInterval(function() {
                self.change(varValue);
            }, 30);
        }

    },
    change: function(varValue) {
        var self = this;
        var width = self.drawable.displayScale ? parseInt((self.drawable.displayScale / 100) * self.drawable.width) : self.drawable.width;
        var div_width = self.drawable.displayScale ? parseInt((self.drawable.displayScale / 100) * 12) : 12;
        var range = self.rangeHeight / (self.drawable.maxValue - self.drawable.minValue);

        if (self.height) {
        } else {
            self.height = 0;
        }


        if (varValue > self.drawable.maxValue) {//变量的值超过温度计的最大值
            if (parseInt(self.height) == (self.drawable.maxValue - self.drawable.minValue) * range || (parseInt(self.height) + 1) == (self.drawable.maxValue - self.drawable.minValue) * range) {
                self.divTextValue = varValue;
                this.clearTimer();
                //显示温度
                // self.drawTemperature(varValue);
                self.flag = true;
            } else if (parseInt(self.height) < (self.drawable.maxValue - self.drawable.minValue) * range - 1) {
                self.height += range;
                self.divTextValue = parseInt(self.divTextValue) + 1;

            } else {

                this.clearTimer();
                //显示温度
                // self.drawTemperature(varValue);
            }
        } else if (varValue < self.drawable.minValue) {//变量的值小于温度计的最小值
            self.divTextValue = varValue;
            if (self.flagmin) {
                this.drawable.defaultValue = parseInt(this.drawable.minValue);
                self.flagmin = false;
            }

            this.clearTimer();
            //显示温度
            // self.drawTemperature(varValue);
        } else {
            if (parseInt(self.height) == parseInt((varValue - self.drawable.minValue) * range)) {
                self.divTextValue = varValue;

                this.clearTimer();
                //显示温度
                // self.drawTemperature(varValue);
            } else if (parseInt(self.height) < parseInt((varValue - self.drawable.minValue) * range)) {
                if ((parseInt(self.height) + range) > parseInt((varValue - self.drawable.minValue) * range)) {
                    self.height = parseInt((varValue - self.drawable.minValue) * range);
                    self.divTextValue = varValue;
                } else {
                    self.height += range;
                    self.divTextValue = parseInt(self.divTextValue) + 1;
                }

            } else if (parseInt(self.height) > parseInt((varValue - self.drawable.minValue) * range)) {
                if ((parseInt(self.height) - range) < parseInt((varValue - self.drawable.minValue) * range)) {
                    self.height = parseInt((varValue - self.drawable.minValue) * range);
                    self.divTextValue = varValue;
                } else {
                    self.height = self.height - range;
                    if (self.flag) {
                        self.divTextValue = self.drawable.maxValue;
                        self.flag = false;
                    }
                    self.divTextValue = parseInt(self.divTextValue) - 1;
                }

            }
        }
        self.pipe = new Pipe(self.drawable.x + width / 2 - 2, self.drawable.height - 45 - self.height + self.drawable.y, div_width, self.height);
        // console.log(" self.pipe in change,", self.pipe);

        self.draw( self.pipe);

        // this.reDraw();
    },
    reDraw: function() {
        this.drawable.board.canvas.ctx2d.save();
        this.drawable.board.canvas.ctx2d.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.drawable.board.redrawCanvas();
        this.drawable.board.canvas.ctx2d.restore();
    },
    clearTimer: function() {
        window.clearInterval(this.refreshTimerId);
        this.refreshTimerId = null;
    },
    destroy: function() {
        this.clearTimer();
        if (this.layout && (!this.layout.destroyed)) {
            this.layout.destroy();
        }
    }
};
//    return AgentCanvasTool;
//});