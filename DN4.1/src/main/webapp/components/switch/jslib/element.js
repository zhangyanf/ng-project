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
//				this.initNum = 0;
//			} 
            this.drawable = drawable;
            if (varValue == 1) {
                this.drawable.setImage(0, {el: 'switch-on'}, false);
            } else if (varValue == 0) {
                this.drawable.setImage(0, {el: 'switch-off'}, false);
            }
        },
        destroy: function() {
            if (this.layout && (!this.layout.destroyed))
                this.layout.destroy();
        }
    };
//    return AgentCanvasTool;
//});