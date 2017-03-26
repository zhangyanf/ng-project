/**
 * 获取网关简要信息
 */
function getGatewaySimpleInfo(params,callback,context) {
    schneider.Ajax.request({
        url: "/api/devices",
        type: "GET",
        parameters: params,
        success:function(data) {
            callback.call(context || this,data);
        }
    });
}

/**
 * 获取网关详情信息
 */
function getGatewayOverviewInfo(params,resourceIds,callback,context) {
    schneider.Ajax.request({
        url: "/api/devices/overview?verbose="+params.verbose+"&limit="+params.limit,
        type: "post",
        parameters: params,
        traditional: true,
        contentType:"application/json;charset=utf-8",
        data:JSON.stringify({"resourceIds": resourceIds}),
        success:function(data) {
            callback.call(context || this,data);
        }
    });
}

/**
 * 搜索
 */
function searchGateway(isAsync,params,callback,context) {
    schneider.Ajax.request({
        url: "/api/devices",
        type: "get",
        async:isAsync,
        parameters: params,
        success:function(data) {
            callback.call(context || this,data);
        }
    });
}

/**
 * 获取现场数据
 */
function getSites(params,callback,context) {
    schneider.Ajax.request({
        url: "/api/sites",
        type: "GET",
        parameters: params,
        success:function(data) {
            callback.call(context || this,data);
        }
    });
}


/**
 * 获取机型数据
 */
function getModels(params,callback,context) {
    schneider.Ajax.request({
        url: "/api/models",
        type: "GET",
        parameters: params,
        success:function(data) {
            callback.call(context||this,data);
        }
    });
}

/**
 * 查看现场详情
 */
function watch_site_data(params,_id,callback,context) {
    schneider.Ajax.request({
        url:"../api/sites/"+_id,
        type:"get",
        dataType:"json",
        data:params,
        success:function(data) {
            callback.call(context||this,data);
        }
    });
}

/**
 *删除网关
 */
function deleteGateway(id) {
    schneider.Ajax.request({
        url:"/api/devices/"+id,
        type:"delete",
        dataType:"json",
         async:false,
        success:function(data) {

        }
    });
}

/**
 *下载导入手机文件模板
 */
function download_phoneFile_model(params,callback,context) {
    schneider.Ajax.request({
        url:"../api2/users/this",
        type:"get",
        dataType:"json",
        data:params,
        success:function(data) {
            callback.call(context||this,data);
        }
    });
}

/**
 *导出网关数据
 */
function import_gateway(params,callback,context) {
    schneider.Ajax.request({
        url:"../api/devices_export",
        type:"post",
        dataType:"json",
        contentType: 'application/json; charset=utf-8',
        traditional: true,
        data: JSON.stringify({deviceIds: params}),
        success:function(data) {
            callback.call(context||this,data);
        }
    });
}

/**
 *下载批量导入网关模板文件
 */
function download_import_tempfile(params,callback,context) {
    schneider.Ajax.request({
        url:"../api2/users/this",
        type:"get",
        dataType:"json",
        data:params,
        success:function(data) {
            callback.call(context||this,data);
        }
    });
}

/**
 *提交-批量导入手机号
 */
function submit_batch_import_phoneNumber(params,callback,context) {
    schneider.Ajax.request({
        url:"../api/imsi?verbose="+params.verbose+"&file_id="+params.file_id,
        type:"post",
        dataType:"json",
        success:function(data) {
            callback.call(context||this,data);
        }
    });
}

/**
 *设置月流量告警
 */
function set_month_warning(async,id,requestData,callback,context) {
    schneider.Ajax.request({
        url: "/api/alarmCfg/"+id+"/set",
        type: "post",
        async:async,
        traditional: true,
        contentType:"application/json;charset=utf-8",
        data:JSON.stringify(requestData),
        success:function(data) {
            callback.call(context||this,data);
        }
    });
}

/**
 *批量导入网关
 */
function batch_import_gateway(params,requestData,callback,context) {
    schneider.Ajax.request({
        url: "/api/devices/batch_add",
        type: "post",
        traditional: true,
        parameters:params,
        contentType:"application/json;charset=utf-8",
        data:JSON.stringify(requestData),
        success:function(data) {
            callback.call(context || this,data);
        }
    });
}

/**
 *新增网关
 */
function  createGateway(async, params,requestData,callback,context) {
    schneider.Ajax.request({
        url: "/api/devices",
        type: "post",
        async:async,
        traditional: true,
        parameters:params,
        contentType:"application/json;charset=utf-8",
        data:JSON.stringify(requestData),
        success:function(data) {
            callback.call(context || this,data);
        }
    });
}

/**
 *编辑网关
 */
function editGateway(async, gID,requestData,callback,context) {
    schneider.Ajax.request({
        url: "/api/devices/"+gID,
        type: "put",
        async:async,
        traditional: true,
        contentType:"application/json;charset=utf-8",
        data:JSON.stringify(requestData),
        success:function(data) {
            callback.call(context || this,data);
        }
    });
}

/**
 *查看一个网关详情信息
 */
function getOneGatewayOverviewInfo(gID,callback,context) {
    schneider.Ajax.request({
        url: "/api/devices/"+gID+"?verbose=100",
        type: "get",
        success:function(data) {
            callback.call(context || this,data);
        }
    });
}

/**
 *查看一个网关月流量预警信息
 */
function getMonthAlarmInfo(gID,callback,context) {
    schneider.Ajax.request({
        url: "/api/alarmCfg/"+gID,
        type: "get",
        success:function(data) {
            callback.call(context || this,data);
        }
    });
}
/**********网关管理********/
function  getwayManage(params,query,callback,context) {
    schneider.Ajax.request({
        url: "/api/devices/list",
        type: "POST",
        parameters:params,
        data: query,
        success:function(data) {
            callback.call(context || this,data);
        }
    });
}
//文件删除
function deleteFile( params, id, callback, context) {
    schneider.Ajax.request( {
        url: "api/file/"+id,
        type: "DELETE",
        parameters: params,
        contentType: "application/json;charset=utf-8;",
        success: function( data) {
            callback.call( context || this, data);
        }
    });
}
/***************网关管理----设备升级----保存按钮********/
function saveFile( params, query, callback, context) {
    schneider.Ajax.request( {
        url: "api2/tasks",
        type: "POST",
        parameters: params,
        data:query,
        contentType: "application/json;charset=utf-8;",
        success: function( data) {
            callback.call( context || this, data);
        }
    });
}
