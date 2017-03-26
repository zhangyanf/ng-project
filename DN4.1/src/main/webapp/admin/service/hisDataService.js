 
//获取历史趋势中的变量值
function history_data(siteId,params,callback, context) {
      schneider.Ajax.request({
            url: "api/site_data/"+siteId,
            type: "GET",
            dataType: "json",
            parameters: params,
            contentType:"application/json",
            success: function(data) {
             callback.call(context || this, data);
       }
    });
};
//获取历史趋势 统计数据
function history_statistic_data(siteId,params,callback, context) {
    schneider.Ajax.request({
        url: "api/trend_statistic/"+siteId,
        type: "GET",
        dataType: "json",
        parameters: params,
        contentType:"application/json",
        success: function(data) {
            callback.call(context || this, data);
        }
    });
};