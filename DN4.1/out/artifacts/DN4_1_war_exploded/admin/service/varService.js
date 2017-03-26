//获取现场下的变量列表
function getSiteVars(siteId,params,isAsync,callback,context){
    schneider.Ajax.request({
        url: "/api/vars/"+siteId,
        type: "GET",
        parameters: params,
        async:isAsync,
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}

//获取变量列表根据条件
function getSiteVarsList(siteId,params,isAsync,callback,context){
    schneider.Ajax.request({
        url: "/api/varslist/"+siteId,
        type: "GET",
        parameters: params,
        async:isAsync,
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}

//获取现场下所有趋势分组
function getTrends(siteId,params,isAsync, callback, context) {
    schneider.Ajax.request({
        url: "api/trend_settings/"+siteId,
        type: "GET",
        parameters: params,
        async:isAsync,
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}

//创建趋势组
function addTrend(siteId,params,isAsync, requestData,callback, context) {
    schneider.Ajax.request({
        url: "api/trend_settings/"+siteId,
        type: "POST",
        parameters: params,
        async:isAsync,
        traditional: true,
        contentType:"application/json;charset=utf-8",
        data:JSON.stringify(requestData),
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}

//修改趋势组
function editTrend(siteId, groupId,params,isAsync, requestData,callback, context) {
    schneider.Ajax.request({
        url:"api/trend_settings/"+siteId+"/"+groupId,
        type: "PUT",
        parameters: params,
        async:isAsync,
        traditional: true,
        contentType:"application/json;charset=utf-8",
        data:JSON.stringify(requestData),
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}

//获取现场下特定趋势组信息
function getTrend(siteId, groupId,params,isAsync,callback, context) {
    schneider.Ajax.request({
        url:"api/trend_settings/"+siteId+"/"+groupId,
        type: "GET",
        parameters: params,
        async:isAsync,
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}

//删除趋势组
function deleteTrend(siteId, groupId,params,isAsync) {
    schneider.Ajax.request({
        url:"api/trend_settings/"+siteId+"/"+groupId,
        type: "delete",
        async:isAsync,
        parameters: params,
        success: function(data) {
        }
    });
}