
/**
 * 查询工单列表
 * @param isAsync
 * @param params
 * @param callback
 * @param context
 */
function getOrderList(isAsync,params,callback,context) {
    schneider.Ajax.request({
        url: "/api/workorder",
        type: "GET",
        parameters:params,
        async:isAsync,
        success: function(data) {
            callback.call(context || this, data);
        },
        error: function(data) {
            callback.call(context || this, data);
        }
    });
}

/**
 * 创建工单
 * @param isAsync
 * @param requestData
 * @param callback
 * @param context
 */
function addOrder(isAsync,requestData, callback, context) {
    schneider.Ajax.request({
        url: "/api/workorder",
        type: "POST",
        async:isAsync,
        contentType:"application/json;charset=utf-8",
        data:JSON.stringify(requestData),
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}

/**
 * 编辑工单
 * @param isAsync
 * @param id
 * @param requestData
 * @param callback
 * @param context
 * @constructor
 */
function editOrder(isAsync,id,requestData, callback, context) {
    schneider.Ajax.request({
        url: "/api/workorder/"+id,
        type: "PUT",
        async:isAsync,
        contentType:"application/json;charset=utf-8",
        data:JSON.stringify(requestData),
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}

/**
 * 删除工单
 * @param isAsync
 * @param id
 * @param callback
 * @param context
 */
function deleteOrder(isAsync,id,callback, context) {
    schneider.Ajax.request({
        url: "/api/workorder/"+id,
        type: "DELETE",
        async:isAsync,
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}

/**
 * 获取工单详情
 * @param isAsync
 * @param id
 * @param callback
 * @param context
 */

function getOrderDetail(isAsync,id, callback, context) {
    schneider.Ajax.request({
        url: "/api/workorder/"+id,
        type: "GET",
        async:isAsync,
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}


/**
 * 查看工单维修记录列表
 * @param params
 * @param callback
 * @param context
 */
function getOrderLogs(params,callback,context){
    schneider.Ajax.request({
        url: "/api/worklog",
        type: "GET",
        parameters:params,
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}

/**
 * 查看工单维修记录详情
 * @param callback
 * @param context
 */
function getOrderLogInfo(logId,callback,context){
    schneider.Ajax.request({
        url: "/api/worklog/"+logId,
        type: "GET" ,
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}

/**
 * 新增工单维修记录
 * @param callback
 * @param context
 */
function addOrderLogInfo(requestData,callback,context){
    schneider.Ajax.request({
        url: "/api/worklog",
        type: "POST" ,
        contentType:"application/json;charset=utf-8",
        data:JSON.stringify(requestData),
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}
/**
 * 修改工单维修记录
 * @param callback
 * @param context
 */
function updateOrderLogInfo(logId,requestData,callback,context){
    schneider.Ajax.request({
        url: "/api/worklog/"+logId,
        type: "PUT" ,
        contentType:"application/json;charset=utf-8",
        data:JSON.stringify(requestData),
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}

function delOrderLogInfo(isAsync,logId,callback,context){
    schneider.Ajax.request({
        url: "/api/worklog/"+logId,
        type: "DELETE" ,
        async:isAsync,
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}