

//获取实时数据列表中的变量值
function rt_data(siteId,params,callback, context) {
      schneider.Ajax.request({
            url: "api/site_rt_data/"+siteId,
            type: "GET",
            dataType: "json",
            contentType:"application/json",
            parameters: params,
            success: function(data) {
             callback.call(context || this, data);
       }

});
};
//获取现场下的变量列表
function getSiteVars_list(siteId,params,isAsync,callback,context){
    schneider.Ajax.request({
        url: "api/varslist/"+siteId,
        type: "GET",
        parameters: params,
        async:isAsync,
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}

//获取atm业务数据历史记录
function getAtmData(params,callback,context) {
    schneider.Ajax.request({
        url: "api/atm/data",
        type: "GET",
        parameters: params, 
        success: function(data) {
            callback.call(context || this, data);
        }
    })
}

//获取atm业务数据  统计数据
function getAtmDataSummary(params,callback,context) {
    schneider.Ajax.request({
        url: "api/atm/data/summary",
        type: "GET",
        parameters: params, 
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}