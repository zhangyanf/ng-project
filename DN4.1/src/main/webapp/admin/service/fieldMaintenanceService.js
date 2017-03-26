/**
 * Created by lpc on 2017-02-07.
 */

// 查询字段信息
function serachFieldMaintenance(params,isAsync,callback,context) {
    schneider.Ajax.request({
        url: "/api/public/settings",
        type: "get",
        async : isAsync,
        dataType:'json',
        parameters:params,
        success:function(data) {
            callback.call(context || this, data);
        }
    });
}

// 根据key值查询字段详细信息
function serachFieldForKey(params,isAsync,callback,context) {
    schneider.Ajax.request({
        url: "/api/public/settings/key",
        type: "get",
        async : isAsync,
        dataType:'json',
        parameters:params,
        success:function(data) {
            callback.call(context || this, data);
        }
    });
}

// 根据key值修改字段详细信息
function updateFieldForKey(params,data,isAsync,callback,context) {
    schneider.Ajax.request({
        url: "/api/public/settings",
        type: "post",
        async : isAsync,
        dataType:'json',
        data: data,
        parameters:params,
        success:function(data) {
            callback.call(context || this, data);
        }
    });
}