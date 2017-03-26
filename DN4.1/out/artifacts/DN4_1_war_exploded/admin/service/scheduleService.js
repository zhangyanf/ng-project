/**
 * Created by zengqiang on 2017/1/6.
 */

/**
 * 1.获取预防性计划列表
 * */
function get_api_schedule(params,callback,context) {
    schneider.Ajax.request({
        url: "/api/schedule",
        type: "GET",
        dataType: "json",
        parameters:params,
        success: function (data) {
            callback.call(context || this,data);
        }
    });
}

/**
 * 2.查看预防性计划
 * */
function get_api_schedule_id(id,params,callback,context) {
    schneider.Ajax.request({
        url: "/api/schedule/"+id,
        type: "GET",
        dataType: "json",
        parameters:params,
        success: function (data) {
            callback.call(context || this,data);
        }
    });
}

/**
 * 3.创建预防性计划
 * */
function post_api_schedule(params,bodyData,callback,context) {
    schneider.Ajax.request({
        url: '/api/schedule',
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        traditional: true,
        data: JSON.stringify(bodyData),
        parameters:params,
        success: function (data) {
            callback.call(context || this,data);
        }
    });
}

/**
 * 4.修改预防性计划
 * */
function put_api_schedule(id,params,bodyData,callback,context) {
    schneider.Ajax.request({
        url: "/api/schedule/" + id,
        type: "PUT",
        contentType: "application/json;charset=utf-8",
        traditional: true,
        data: JSON.stringify(bodyData),
        parameters:params,
        success: function (data) {
            callback.call(context || this,data);
        },
        error:function (errordata) {
            callback.call(context || this,errordata);
        }
    });
}
/**
 * 关闭工单
 * @param isAsync
 */
function close_api_schedule(isAsync,wo_id ,bodyData,callback,context) {
    schneider.Ajax.request({
        url: "/api/schedule/workorder/"+wo_id,
        type: "PUT",
        contentType: "application/json;charset=utf-8",
        traditional: true,
        data: JSON.stringify(bodyData),
        async:isAsync,
        success: function (data) {
            callback.call(context || this,data);
        }
    });
}

/**
 * 删除计划
 * */
function delete_api_schedule(id,params) {
    schneider.Ajax.request({
        url: "/api/schedule/" + id,
        type: "DELETE",
        dataType: "json",
        async: false,
        parameters:params,
        success: function (data) {

        }
    });
}

/**
 * 查询设备列表
 * */
function get_api_devices(params,callback,context) {
    schneider.Ajax.request({
        url: "/api/assets",
        type: "GET",
        dataType: "json",
        parameters:params,
        success: function (data) {
            callback.call(context || this,data);
        }
    });
}