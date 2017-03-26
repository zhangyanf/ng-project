//define(function(require){
//	require("/cloud/base/cloud");
//	require("/cloud/lib/plugin/jquery.qtip");
	var AgentCanvasTool = {
                           initialize:function(options){  
			this.drawable = options.drawable;
			this.data = null;
			this.interval  = null;
			this.defaultImage = null;
			this.render();
		},
		render:function(){
			this.initFirstImage();
			this.initImages();
			//this.onDataChanage(10);
		},
		initFirstImage:function(){
			this.drawable.images = [];   //当前画布中要显示的图片
			var image = {el:"animation",t:'0'};
			this.drawable.images.push(image);
			this.drawable.setImage(0, {el: "animation"}, true);
		},
		initImages:function(){
			var self = this;
			this.imagesPainters = [];
			var data = this.drawable.animatorData;
			if(data!=null){
				for(var i =0;i<data.length;i++){
					var image = {el:data[i]._id,t:'0',_id:data[i]._id};
					if(!data[i].animatorMin&&!data[i].animatorMax){
						self.defaultImage = image;
					}
					this.drawable.images.push(image);
				}
				this.data = data;
			}
		},
    onDataChanage: function(varValue,drawable) {
            var self = this;
            self.drawable = drawable;
			var flag = -1;
			var maxEqual = false; //不等于最大值
			var minEqual = false; //不等于最小值
			//this.interval = setInterval(function() {
				//console.log("2222222222222");
				//在选择匹配条件的记录时，优先选择第一种。
				//varValue = parseInt(Math.random()*(25));
				if(self.data!=null&&self.data.length!=0){
					for(var i=0;i<self.data.length;i++){
						if(self.data[i].animatorMinEqual&&self.data[i].animatorMinEqual==1){
							minEqual = true;
						}
						if(self.data[i].animatorMaxEqual&&self.data[i].animatorMaxEqual==1){
							maxEqual = true;
						}
						//最大值存在，最小值不存在,那么只要varValue小于最大值即可
						if(!self.data[i].animatorMin
								&&!!self.data[i].animatorMax
								&&(maxEqual?varValue<=self.data[i].animatorMax:varValue<self.data[i].animatorMax)){
							flag =i;
							break;
						}
						//最小值存在，最大值不存在,那么只要varValue大于最小值即可
						else if(!!self.data[i].animatorMin
								&&!self.data[i].animatorMax
								&&(minEqual?self.data[i].animatorMin<=varValue:self.data[i].animatorMin<varValue)){
							flag =i;
							break;
						}
						//最小值存在，最大值存在,那么只要varValue大于等于最小值,小于最大值即可
						else if(!!self.data[i].animatorMin
								&&!!self.data[i].animatorMax
								&&(maxEqual?varValue<=self.data[i].animatorMax:varValue<self.data[i].animatorMax)
								&&(minEqual?self.data[i].animatorMin<=varValue:self.data[i].animatorMin<varValue)){
							flag =i;
							break;
						}
					}
				}
				if(flag == -1&&self.defaultImage!=null){
					self.drawable.setImage(0, {el: self.defaultImage.el}, true);
					/*self.Animator.start(0);*/
				}else if(flag!= -1){
					self.drawable.setImage(0, {el: self.data[flag]._id}, true);
					/*self.Animator.start(i);*/
				}
			//},1000);
		},
		reDraw:function(){ 
			var canvasHeight=this.drawable.board.canvas.height;//画布的高度
			var canvasWidth=this.drawable.board.canvas.width;//画布的宽度
			this.drawable.board.canvas.ctx2d.save();
			this.drawable.board.canvas.ctx2d.clearRect(0, 0, canvasWidth, canvasHeight);
			this.drawable.board.redrawCanvas();
			this.drawable.board.canvas.ctx2d.restore();
		},
		reDraw:function(){ 
			var canvasHeight=this.drawable.board.canvas.height;//画布的高度
			var canvasWidth=this.drawable.board.canvas.width;//画布的宽度
			this.drawable.board.canvas.ctx2d.save();
			this.drawable.board.canvas.ctx2d.clearRect(0, 0, canvasWidth, canvasHeight);
			this.drawable.board.redrawCanvas();
			this.drawable.board.canvas.ctx2d.restore();
		},
		destroy:function(){
			window.clearInterval(this.interval);
		}
	};
//	return AgentCanvasTool;
//});