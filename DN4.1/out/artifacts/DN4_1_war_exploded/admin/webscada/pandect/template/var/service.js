define(function(require) {
    //require("cloud/base/cloud");
    var Service = { 
        loadTagUrl : "api/site_tags",//获取现场标签的URL
        type : "site",
        resourceType : 14,
        initialize : function() {
            this.map = $H(this.map);
        },
        //获取网关列表
        getDeviceList: function(id, callback,context) {
			cloud.Ajax.request({
				url:"api/devices",
				type:"get",
				parameters:{
					limit:0,
					site_id:id,
					verbose:100
				},
				success:function(data){
					callback.call(context || this,data);
				}
			});
		},
		//获取机型列表
		getMachinesList: function(id, callback,context) {
			cloud.Ajax.request({
				url:"api/machines",
				type:"get",
				parameters:{
					limit:0,
					site_id:id,
					verbose:100
				},
				success:function(data){
					callback.call(context || this,data);
				}
			});
		},
		//获取机型信息
		getModelInfo: function(_modelId,callback,context){
			var self = this; 
			cloud.Ajax.request({
				url:"api/models/"+_modelId,
				parameters:{
					limit:0,
					verbose:100
				},
				success:function(data){
					callback.call(context || this,data);
				}
			});
		},
		editVar:function(varObj,callback,context){
			var self = this; 
			console.log(varObj )
			cloud.Ajax.request({
				url:"vapi/var/write",
				type:"get",
				parameters:varObj, 
				success:function(data){
					callback.call(context || this,data);
				}
			});
		}
    };
    return new Service();
})