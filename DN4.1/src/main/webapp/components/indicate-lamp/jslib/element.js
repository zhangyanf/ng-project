//define(function(require) {
    var AgentCanvasTool = {
        initialize: function(options) { 
            this.drawable = options.drawable;
            this.initModule();
//			this.initNum = 0;
        },
        initModule: function() {
            var data = this.drawable.getData();
        },
        onDataChanage: function(varValue,drawable) {
//			if(this.initNum == 0){
//				this.initNum = 1;
//			}else if(this.initNum == 1){
//				this.initNum = 2;
//			}else{
//				this.initNum = 0;
//			}
            var self = this;
            self.drawable = drawable;
            var images = this.drawable.images;
            var isMatch = false;

            $.each(images,function(index,img){
                if(varValue == img.image_variable_value){
                    isMatch = true;
                    self.drawable.setImage(0, {el: img.el,name:img.name}, false);
                }
            });

           if(!isMatch){
               self.drawable.setImage(0, {el: 'yellow-lamp',name:'yellow-lamp'}, false);
           }

            // if (varValue == 1) {
            //     this.drawable.setImage(0, {el: 'green-lamp'}, false);
            // } else if (varValue == 0) {
            //     this.drawable.setImage(0, {el: 'red-lamp'}, false);
            // } else {
            //     this.drawable.setImage(0, {el: 'yellow-lamp'}, false);
            // }
        },
        destroy: function() {
            if (this.layout && (!this.layout.destroyed))
                this.layout.destroy();
        }
    };
//    return AgentCanvasTool;
//});