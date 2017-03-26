/**
 * 根据条件获取告警列表
 * @param params
 * @param callback
 * @param context
 */
function loadAllAlarm(params, callback, context) {
    schneider.Ajax.request({
        url: "/api/alarms2",
        type: "GET",
        parameters: params,
        success: function (data) {
            callback.call(context || this, data);
        }
    });
}
/**
 * 根据告警id获取告警信息
 * @param mId
 * @param params
 * @param callback
 * @param context
 */
function getAlarmInfoById(mId, params, callback, context) {
    schneider.Ajax.request({
        url: "/api/alarms2/" + mId,
        type: "GET",
        parameters: params,
        success: function (data) {
            callback.call(context || this, data);
        }
    });
}
//导出数据
function reportsForms(params, query, callback, context) {
    schneider.Ajax.request({
        url: "/api/reports/forms",
        type: "POST",
        dataType: 'json',
        parameters: params,
        data: query,
        success: function (data) {
            callback.call(context || this, data);
        }
    });
}
/**
 * 生成告警报表
 * @param params
 * @param query
 * @param callback
 * @param context
 */
function reportsAlarmForms(params, query, callback, context) {
    schneider.Ajax.request({
        url: "/api/alarms2/report_forms",
        type: "POST",
        dataType: 'json',
        parameters: params,
        data: query,
        success: function (data) {
            callback.call(context || this, data);
        }
    });

}
/**
 * 确认告警api
 * @param mId
 * @param params
 * @param async
 * @param callback
 * @param context
 */
function confirmAlarm(mId, params, async, callback, context) {
    schneider.Ajax.request({
        url: "/api/alarms2/" + mId,
        type: "PUT",
        async: async,
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(params),
        success: function (data) {
            callback.call(context || this, data);
        }
    });
}
function loadWarningInfo_2_async(mId, callback, context) {
    schneider.Ajax.request({
        url: "/api/alarms2/" + mId,
        type: "DELETE",
        async: false,
        success: function (data) {
            callback.call(context || this, data);
        }
    });
}
