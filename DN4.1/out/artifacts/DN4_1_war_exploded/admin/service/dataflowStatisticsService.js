/*
* 1.
* */
function postAPI_traffic_month_list(params,requestData,callback,context) {
    schneider.Ajax.request({
        url: '/api/traffic_month/list',
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        traditional: true,
        parameters:params,
        data: JSON.stringify(requestData),
        success: function (data) {
            callback.call(context || this,data);
        }
    });
}
/*
* 2.
* */
function getAPI_traffic_day(params,callback,context) {
    schneider.Ajax.request({
        url: '/api/traffic_day',
        type: "GET",
        dataType: 'json',
        parameters:params,
        success: function (data) {
            callback.call(context || this,data);
        }
    });
}
/*
* 3.每日统计图获取数据
* */
function postAPI_traffic(params,sendData,callback,context) {
    schneider.Ajax.request({
        url: "/api/traffic",
        type: "POST",
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        traditional: true,
        parameters:params,
        data: JSON.stringify(sendData),
        success: function (data) {
            callback.call(context || this,data);
        }
    });
}