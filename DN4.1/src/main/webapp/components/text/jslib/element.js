//define(function(require) {
//	require("/cloud/base/cloud"); 
    var AgentCanvasTool = {
        initialize: function(options) { 
            this.drawable = options.drawable;
            this.initModule();
        },
        initModule: function() {
            var data = this.drawable.getData();
//            console.log("initModule data ",data);
        },
        onDataChanage: function(varValue, drawable) { 
            this.drawable = drawable;
            this.drawable.setTitle(1, {text: String.format('{0}{1}', varValue, '')}, false);
            
        },
        destroy: function() {
            if (this.layout && (!this.layout.destroyed))
                this.layout.destroy();
        }
    };
//    return AgentCanvasTool;
//});




