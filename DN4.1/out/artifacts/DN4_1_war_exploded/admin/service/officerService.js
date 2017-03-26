/**
 * 新增通知人员
 * @param async
 * @param params
 * @param addDataObject
 * @param callback
 * @param context
 */
function addOfficer(isAsync, addDataObject, callback, context) {
    schneider.Ajax.request({
        url: "/api/maintainer",
        type: "POST",
        async:isAsync,
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(addDataObject),
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}
/**
 * 获取通知人员列表
 * @param params
 * @param callback
 * @param context
 */
function getAllOfficers(isAsync,params, callback, context) {
    schneider.Ajax.request({
        url: "/api/maintainer",
        type: "GET",
        async:isAsync,
        parameters: params,
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}

/**
 * 删除通知人员
 * @param isAsync
 * @param callback
 * @param context
 */
function deleteOfficer(isAsync,id,callback,context) {
    schneider.Ajax.request({
        url: "/api/maintainer/"+id,
        type: "delete",
        async:isAsync,
        success:function(data) {
            callback.call(context || this, data);
        }
    });
}

/**
 * 编辑通知人员
 * @param isAsync
 * @param id
 * @param requestData
 * @param callback
 * @param context
 */
function editOfficer(isAsync,id,requestData,callback,context) {
    schneider.Ajax.request({
        url: "/api/maintainer/"+id,
        type: "put",
        async:isAsync,
        traditional: true,
        contentType:"application/json;charset=utf-8",
        data:JSON.stringify(requestData),
        success:function(data) {
            callback.call(context || this,data);
        }
    });
}

/**
 * 根据Id获取通知人员
 * @param isAsync
 * @param id
 * @param callback
 * @param context
 */
function getOfficerById(isAsync,id,callback,context) {
    schneider.Ajax.request({
        url: "/api/maintainer/"+id+"?verbose=100",
        type: "get",
        async:isAsync,
        success:function(data) {
            callback.call(context || this,data);
        }
    });
}