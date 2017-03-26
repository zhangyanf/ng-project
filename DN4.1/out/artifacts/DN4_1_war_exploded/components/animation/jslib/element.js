//define(function(require) { 
var AgentCanvasTool = {
    initialize: function(options) {
        this.drawable = options.drawable;
        this.data = null;
        this.index = 0;       //当前显示的图片在图片数组中的位置
        this.interval = null;
        this.drawable.images = [];   //当前画布中要显示的图片
        this.render();
    },
    render: function() {
        //this.initFirstImage();
        this.initImages();
        this.onChanage();
    },
    initFirstImage: function() {
        var image = {el: "animation", t: '0'};
        this.drawable.images.push(image);
        this.drawable.setImage(0, {el: "animation"}, true);
    },
    initImages: function() {
        var self = this;
        this.imagesPainters = [];
        var data = this.drawable.animatorData;
        if (data != null) {
            for (var i = 0; i < data.length; i++) {
                var image = {el: data[i]._id, t: '0', _id: data[i]._id};
                if (!data[i].animatorMin && !data[i].animatorMax) {
                    self.defaultImage = image;
                }
                this.drawable.images.push(image);
            }
            this.data = data;
        }
    },
    onChanage: function() {
        var self = this;
        if (this.data != null && this.data.length > 0) {
            var duration = (self.data[self.index]).duration;
            if (!duration) {
                duration = 1;
            }
            setTimeout(self.changeImage, duration * 1000, self);
        }
    },
    changeImage: function(self) {
        self.drawable.setImage(0, {el: self.data[self.index]._id}, true);
        self.index = self.index + 1;
        if (self.index >= self.data.length) {
            self.index = 0;
        }
        if (self.data.length > 1) {
            self.onChanage();
        }

    },
    reDraw: function() {
        var canvasHeight = this.drawable.board.canvas.height;//画布的高度
        var canvasWidth = this.drawable.board.canvas.width;//画布的宽度
        this.drawable.board.canvas.ctx2d.save();
        this.drawable.board.canvas.ctx2d.clearRect(0, 0, canvasWidth, canvasHeight);
        this.drawable.board.redrawCanvas();
        this.drawable.board.canvas.ctx2d.restore();
    },
    destroy: function() {
        window.clearInterval(this.interval);
    }
};
//    return AgentCanvasTool;
//});