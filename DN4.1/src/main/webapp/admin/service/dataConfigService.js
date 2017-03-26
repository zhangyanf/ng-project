/**
 * Created by th on 2016/11/22.
 */


// 获取现场下所有变量
function getVars(siteId, callback, context) {
    schneider.Ajax.request({
        url: "api/vars/"+siteId,
        type: "GET",
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}

//获取现场下所有趋势分组
function getTrends(siteId, callback, context) {
    schneider.Ajax.request({
        url: "api/trend_settings/"+siteId,
        type: "GET",
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}

//创建趋势组
function addTrend(siteId, requestData,callback, context) {
    schneider.Ajax.request({
        url: "api/trend_settings/"+siteId,
        type: "post",
        traditional: true,
        contentType:"application/json;charset=utf-8",
        data:JSON.stringify(requestData),
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}

//修改趋势组
function editTrend(siteId, groupId, requestData,callback, context) {
    schneider.Ajax.request({
        url:"api/trend_settings/"+siteId+"/"+groupId,
        type: "put",
        traditional: true,
        contentType:"application/json;charset=utf-8",
        data:JSON.stringify(requestData),
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}

//获取现场下特定趋势组信息
function getTrend(siteId, groupId, callback, context) {
    schneider.Ajax.request({
        url:"api/trend_settings/"+siteId+"/"+groupId,
        type: "get",
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}

//删除趋势组
function deleteTrend(async,siteId, groupId) {
    schneider.Ajax.request({
        url:"api/trend_settings/"+siteId+"/"+groupId,
        type: "delete",
        async:async,
        success: function(data) {
        }
    });
}