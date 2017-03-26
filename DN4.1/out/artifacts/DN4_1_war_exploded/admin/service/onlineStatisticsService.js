
/*
 *1.获取网关列表
 */
function getAPI_devices(params,callback,context) {
    schneider.Ajax.request({
        url:"/api/devices",
        type:"GET",
        dataType:"json",
        parameters:params,
        success: function (data) {
            callback.call(context || this,data);
        }
    });
}
/*
*2.在线统计数据
 */
function postAPI_online_stat_list(params,requestData,callback,context) {
    schneider.Ajax.request({
        url:"/api/online_stat/list",
        type:"POST",
        dataType:"json",
        contentType:"application/json; charset=utf-8",
        traditional: true,
        parameters:params,
        data:JSON.stringify(requestData),
        success:function (data) {
            callback.call(context || this,data);
        }
    });
}
/*
* 3.获取用户信息
* */
function getAPI2_users_this(params,callback,context) {
    schneider.Ajax.request({
        url: "/api2/users/this",
        type: "GET",
        dataType: 'json',
        parameters:params,
        success: function (data) {
            callback.call(context || this,data);
        }
    });
}
/*
* 4.统计信号数据
* */
function postAPI2_signal(params,requestData,callback,context) {
    schneider.Ajax.request({
        url:"/api2/signal",
        type:"POST",
        dataType:"json",
        contentType:"application/json; charset=utf-8",
        traditional: true,
        parameters:params,
        data:JSON.stringify(requestData),
        success:function (data) {
            callback.call(context || this,data);
        }
    });
}
/*
*5. 统计在线数据
* */
function postAPI_online_tendency(params,requestData,callback,context) {
    schneider.Ajax.request({
        url:"/api/online_tendency",
        type:"POST",
        dataType:"json",
        contentType:"application/json; charset=utf-8",
        traditional: true,
        parameters:params,
        data:JSON.stringify(requestData),
        success:function (data) {
            callback.call(context || this,data);
        }
    });
}
/*
 * 6.导出excel
 * */
function getAPI_reports_forms(requestData,callback,context) {
    schneider.Ajax.request({
        url: "/api/reports/forms",
        type: "POST",
        dataType: 'json',
        data:JSON.stringify(requestData),
        success: function (data) {
            callback.call(context || this,data);
        }
    });
}