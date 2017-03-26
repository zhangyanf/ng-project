/**
 * Created by lpc on 2017-02-17.
 */

//获取维修状态数量及订单类型统计
function getOverviewData(params, isAsync, callback, context) {
    schneider.Ajax.request({
        url: "/api/repair/report/workorder/overview",
        type: "get",
        async: isAsync,
        dataType: 'json',
        parameters: params,
        success: function (data) {
            callback.call(context || this, data);
        }
    });
}

//获取设备故障原因及数量
function getDeviceFailureData(params,isAsync, callback, context) {
    schneider.Ajax.request({
        url: "/api/repair/report/alarms/verview",
        type: "get",
        async: isAsync,
        dataType: 'json',
        parameters: params,
        success: function (data) {
            callback.call(context || this, data);
        }
    });
}

//获取设备报修数量情况
function getDeviceRepairData(params, isAsync, callback, context) {
    schneider.Ajax.request({
        url: "/api/repair/report/repair/trend",
        type: "get",
        async: isAsync,
        dataType: 'json',
        parameters: params,
        success: function (data) {
            callback.call(context || this, data);
        }
    });
}

//工作量
function getWorkorderData(params, isAsync, callback, context) {
    schneider.Ajax.request({
        url: "api/repair/report/repair/workload",
        type: "get",
        async: isAsync,
        dataType: 'json',
        parameters: params,
        success: function (data) {
            callback.call(context || this, data);
        }
    });
}

//接单/工作响应时长分布
function getDistributionData(params, isAsync, callback, context) {
    schneider.Ajax.request({
        url: "api/repair/report/repair/workorder/distribution",
        type: "get",
        async: isAsync,
        dataType: 'json',
        parameters: params,
        success: function (data) {
            callback.call(context || this, data);
        }
    });
}

//设备类型工单统计
function getDeviceTypes(params, isAsync, callback, context) {
    schneider.Ajax.request({
        url: "/api/repair/report/repair/device_types",
        type: "get",
        async: isAsync,
        dataType: 'json',
        parameters: params,
        success: function (data) {
            callback.call(context || this, data);
        }
    });
}

//设备工单统计
function getDeviceInfos(params, isAsync, callback, context) {
    schneider.Ajax.request({
        url: "/api/repair/report/repair/assets",
        type: "get",
        async: isAsync,
        dataType: 'json',
        parameters: params,
        success: function (data) {
            callback.call(context || this, data);
        }
    });
}

