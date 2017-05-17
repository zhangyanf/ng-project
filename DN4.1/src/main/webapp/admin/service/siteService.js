/**
 * 全局api
 * @param {type} params
 * @param {type} callback
 * @param {type} context
 * @returns {undefined}
 */
function getOverview(params,isAsync,callback,context){
    schneider.Ajax.request({
        url: "/api/overview",
        type: "GET",
        parameters: params,
        async:isAsync,
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}
/**
 * 查询某个现场概览api
 * @param {type} id
 * @param {type} params
 * @param {type} isAsync
 * @param {type} callback
 * @param {type} context
 * @returns {undefined}
 */
function getSiteOverview(id,params,isAsync,callback,context){
    schneider.Ajax.request({
        url: "/api/overview/"+id+"/site",
        type: "GET",
        parameters: params,
        async:isAsync,
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}
function getAlarmsOverview(id,params,isAsync,callback,context){
    schneider.Ajax.request({
        url: "/alarms2/statistic",
        type: "GET",
        parameters: params,
        async:isAsync,
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}
/*
 * 获取现场列表
 * @param {type} params
 * @param {type} callback
 * @param {type} context
 * @returns {undefined}
 */
function loadAllSite(params, callback, context) {
    schneider.Ajax.request({
        url: "/api/sites",
        type: "GET",
        parameters: params,
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}
function loadAllSite_listAll(params, callback, context) {
    schneider.Ajax.request({
        url: "/api/sites/listAll",
        type: "GET",
        parameters: params,
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}


/**
 * 搜索现场（支持同步异步的控制）
 * @param isAsync
 * @param params
 * @param callback
 * @param context
 */
function searchSiteList(isAsync, params, callback, context) {
    schneider.Ajax.request({
        url: "/api/sites",
        type: "GET",
        parameters: params,
        async:isAsync,
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}

function searchSiteList2(isAsync, params, callback, context) {
    schneider.Ajax.request({
        url: "/api/sites",
        type: "GET",
        parameters: params,
        async:isAsync,
        success: function(data) {
            callback.call(context || this, data);
        },
        error: function(data) {
            callback.call(context || this, data);
        }
    });
}
/*
 * 获取现场详情
 * @param {type} id
 * @param {type} params
 * @param {type} callback
 * @param {type} context
 * @returns {undefined}
 */
function getSiteById(id, params, callback, context) {
    schneider.Ajax.request({
        url: "/api/sites/" + id,
        type: "GET",
        parameters: params,
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}
/*
 *
 * @param {type} aliasJson
 * @param {type} callback
 * @param {type} context
 * @returns {undefined}
 */
function getTransformDevice(aliasJson, callback, context) {
    schneider.Ajax.request({
        url: "/api/sites/list/device_alias",
        type: "POST",
        data: aliasJson,
        parameters: {
            limit: 0
        },
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}
/**
 * 获取实时数据
 * @param {type} devices
 * @param {type} callback
 * @param {type} context
 * @returns {undefined}
 */
function getScadaVarData(devices, callback, context) {
    schneider.Ajax.request({
        url: "api/rt_data",
        type: "POST",
        data: devices,
        parameters: {
            limit: 0
        },
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}
/*========================
 *封装增加现场API
 **/
function addSite(async, params, addDataObject, callback, context) {
    schneider.Ajax.request({
        url: "/api/sites",
        type: "POST",
        async:async,
        parameters: params,
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(addDataObject),
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}
/*========================
 *封装删除现场API
 **/
function deleteSite(params, id) {
    schneider.Ajax.request({
        url: "/api/sites/" + id,
        type: "DELETE",
        async:false,
        parameters: params,
        //contentType: "application/json;charset=utf-8",
        success: function(data) {

        }
    });
}
/*===========================
*2016-08-27 By Lee李杰
*封装 *更新现场信息* API
**/
function updateSite( async,params, updateData, id, callback, context) {
    schneider.Ajax.request({
        url: "api/sites/" + id,
        type: "PUT",
        async:async,
        parameters: params,
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify( updateData),
        success: function(data) {
            callback.call(context||this,data);
        }
    });
}

//根据现场名查询网关信息
function getByName( name,isAsync, callback, context) {
    schneider.Ajax.request({
        url: "/api/sites?name="+name+"&verbose=1",
        type: "GET",
        async:isAsync,
        success: function(data) {
            callback.call(context||this,data);
        }
    });
}

//根据现场id获取该现场下的网关
function getGatewayBySiteId(params,callback,context) {
    schneider.Ajax.request({
        url: "/api/devices",
        type: "GET",
        parameters: params,
        success: function(data) {
            callback.call(context||this,data);
        }
    });
}

//解绑
function jiebang(gatewayId,params,requestData,callback,context) {
    schneider.Ajax.request({
        url: "api/devices/" + gatewayId,
        type: "PUT",
        parameters: params,
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify( requestData),
        success: function(data) {
            callback.call(context||this,data);
        }
    });
}
//获取现场下的scada
/*
*根据现场ID来得到对应的scada
 */
function getCanvasBySiteId(siteId, params, callback, context) {
    schneider.Ajax.request({
        url: "/api/sites/" + siteId + "/scada",
        type: "GET",
        parameters: params,
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}
/*
 * 获取scada //全局监控画面列表get
 * @param {type} params
 * @param {type} callback
 * @param {type} context
 * @returns {undefined}
 */
function getScadaViews(params, callback, context) {
    schneider.Ajax.request({
        url: "/api/scada_views",
        type: "GET",
        parameters: params,
        success: function(data) {
            callback.call(context || this, data);
        }
    });
    // http://office.j3r0lin.com:8000/api/scada_views?cursor=0&limit=0&verbose=1&access_token=d6012d9f4c1add324914f5fd3375d38c
}
/*=============================
*2016-10-17 Lee李杰
*WebScada调用的相关的API
*==============================*/
/*=============================
*创建现场监控scada画面
**/
function addScada( params, addScadaData,siteId, callback, context){
    schneider.Ajax.request({
        url: "/api/sites/"+siteId+"/scada",
        type: "POST",
        parameters: params,
        contentType: "application/json;charset=utf-8;",
        data: JSON.stringify( addScadaData),
        success: function( data) {
            callback.call( context || this, data);
        }
    });
}
/*=============================
*更新现场监控scada画面, 编辑
**/
function updateScada( params, updateData, siteId, callback, context) {
    schneider.Ajax.request({
        url: "/api/sites/"+siteId+"/scada",
        type: "PUT",
        parameters: params,
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify( updateData),
        success: function( data) {
            callback.call( context || this, data);
        }
    });
}
/*============================
*删除现场监控画面
**/
function deleteScada( params, siteId, callback, context) {
    schneider.Ajax.request({
        url: "/api/sites/"+siteId+"/scada",
        type: "DELETE",
        parameters: params,
        success: function( data) {
            callback.call( context || this, data);
        }
    });
}
/*=========================
*获取全局监控画面 根据现场id
**/
function getGlobalScadaInfoByScadaId( params, siteId, callback, context) {
    schneider.Ajax.request({
        url: "/api/scada_views/"+siteId,
        type: "GET",
        parameters: params,
        success: function( data) {
            callback.call( context || this, data);
        }
    });
}
/*=======================
*创建全局监控画面
**/
function addGlobalScada( params, addScadaData, callback, context){
    schneider.Ajax.request({
        url: "api/scada_views",
        type: "POST",
        parameters: params,
        contentType: "application/json;charset=utf-8;",
        data: JSON.stringify( addScadaData),
        success: function( data) {
            callback.call( context || this, data);
        }
    });
}
/*=======================
*更新全局监控画面
**/
function updateGlobalScada( params, id, updateScadaData, callback, context) {
    schneider.Ajax.request({
        url: "api/scada_views/"+id,
        type: "PUT",
        parameters: params,
        contentType: "application/json;charset=utf-8;",
        data: JSON.stringify( updateScadaData),
        success: function( data) {
            callback.call( context || this, data);
        }
    });
}
/*========================
*删除现场监控画面
**/
function deleteGlobalScada( params, id, callback, context) {
    schneider.Ajax.request({
        url: "api/scada_views/" + id,
        type: "DELETE",
        parameters: params,
        contentType: "application/json;charset=utf-8;",
        success: function( data) {
            callback.call( context || this, data);
        }
    });
}
/*=======================
*获取自定义监控组件
**/
function getScadaComponents( params, callback, context) {
    schneider.Ajax.request( {
        url: "api/scada_components",
        type: "GET",
        parameters: params,
        contentType: "application/json;charset=utf-8;",
        success: function( data) {
            callback.call( context || this, data);
        }
    });
}
/*=====================
*获取单个自定义监控组件
**/
function getScadaComponentsById( params, id, callback, context) {
    schneider.Ajax.request({
        url: "api/scada_components/"+id,
        type: "GET",
        parameters: params,
        contentType: "application/json;charset=utf-8;",
        success: function(data) {
            callback.call( context || this, data);
        }
    });
}
/*====================
*创建自定义监控组件
**/
function addScadaComponents( params, addScadaComponentsDada, callback, context) {
    schneider.Ajax.request( {
        url: "api/scada_components",
        type: "POST",
        parameters: params,
        contentType: "application/json;charset=utf-8;",
        data: { content: addScadaComponentsDada},
        success: function(data) {
            callback.call( context || this, data);
        }
    });
}
/*===================
*更新自定义监控组件
**/
function updataScadaComponents( params, updateScadaComponentsData, id, callback, context) {
    schneider.Ajax.request({
        url: "api/scada_components/"+ id,
        type: "PUT",
        parameters: params,
        contentType: "application/json;charset=utf-8;",
        data:{ content: updataScadaComponentsData},
        success: function( data) {
            callback.call( context || this, data);
        }
    });
}
/*=====================
*删除自定义监控组件
**/
function deleteScadaComponents( params, id, callback, context) {
    schneider.Ajax.request( {
        url: "api/scada_components/"+id,
        type: "DELETE",
        parameters: params,
        contentType: "application/json;charset=utf-8;",
        success: function( data) {
            callback.call( context || this, data);
        }
    });
}
/*====================
*得到Scada下具体设备的实时数据
**/
function getScadaVarListData( params, id, api, callback, context){
    schneider.Ajax.request({
        url: "api/"+api+"/"+id+"/rt_data",
        type: "GET",
        parameters: params,
        contentType: "application/json;charset=utf-8;",
        success: function(data) {
            callback.call( context || this, data);
        }
    });
}
// this is about device on site
//添加设备
function addDevice(async,requestData, callback, context) {
    schneider.Ajax.request({
        url: "api/assets",
        type: "post",
        async:async,
        traditional: true,
        contentType: "application/json;charset=utf-8;",
        data: JSON.stringify( requestData),
        success: function( data) {
            callback.call( context || this, data);
        }
    });
}

//获取现场下的设备列表
function getDevicesOfSite( params,async,callback, context) {
    schneider.Ajax.request({
        url: "api/assets",
        type: "get",
        async:async,
        parameters: params,
        success: function( data) {
            callback.call( context || this, data);
        }
    });
}

//校验设备序列号是否存在
function isExistDeviceSerial( params,isAsync,callback, context) {
    schneider.Ajax.request({
        url: "api/person/assets",
        type: "get",
        async:isAsync,
        parameters: params,
        success: function( data) {
            callback.call( context || this, data);
        }
    });
}

//更新设备信息
function updateDevice(async,id,requestData, callback, context) {
    schneider.Ajax.request({
        url: "api/assets/"+id,
        type: "put",
        async:async,
        contentType: "application/json;charset=utf-8;",
        data: JSON.stringify( requestData),
        success: function( data) {
            callback.call( context || this, data);
        }
    });
}
//获取机型信息
function getVarsByModelId( modelId, params, isAsync, callback, context) {
    schneider.Ajax.request({
            url: "api/models/"+modelId,
            type: "GET", 
            parameters: params,
            async:isAsync, 
            contentType: "application/json;charset=utf-8;",
            success: function(data) {
             callback.call(context || this, data);
       } 
    });
}
//获取机型列表
function getAPI_machines(params,callback,context) {
    schneider.Ajax.request({
        url: "/api/machines",
        type: "GET",
        dataType: "JSON",
        parameters:params,
        contentType: "application/json;charset=utf-8;",
        success: function (data) {
            callback.call(context || this,data);
        }
    });
}
//变量编辑API
function varEditData( param, varData, callback, context) {
    schneider.Ajax.request({
        url: "/vapi/var/write",
        type: "GET",
        dataType: "JSON",
        data: JSON.stringify( varData),
        contentType: "application/json;charset=utf-8",
        success: function( data) {
            callback.call( context || this, data);
        }
    });
}
//设备列表
function loadAllDevice(params, callback, context) {
    schneider.Ajax.request({
        url: "/api/assets",
        type: "GET",
        parameters:params,
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}
//获取所有维护人员信息
function getAllMaintainer(params, callback, context) {
    schneider.Ajax.request({
        url: "/api/maintainer",
        type: "GET",
        parameters:params,
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}

//删除设备
function deleteDevice(id, callback, context) {
    schneider.Ajax.request({
        url: "api/assets/"+id,
        type: "DELETE",
        success: function( data) {
            callback.call(context || this, data);
        }
    });
}
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
// judge the file has or not;
function judgeFile( params, id, callback, context,errorCallback) {
    schneider.Ajax.request({
        url: "/api/file/"+ id ,
        type: "GET",
        // dataType: "json",
        // contentType:"application/json",
        parameters: params,
        success: function(data) {
            callback.call(context || this, data);
        },
        error:function (data) {
           errorCallback.call(context || this, data);
        }
    });
};
//文件删除
function deleteFile( params, id, callback, context) {
    schneider.Ajax.request( {
        url: "/api/file/" + id,
        type: "DELETE",
        parameters: params,
        contentType: "application/json;charset=utf-8;",
        success: function( data) {
            callback.call( context || this, data);
        }
    });
}
//get real time data
//siteId: site id
//params: params ={varIds:varId}
function rt_data(siteId,params,callback, context) {
      schneider.Ajax.request({
            url: "api/site_rt_data/"+siteId,
            type: "GET",
            dataType: "json",
            contentType:"application/json",
            parameters: params,
            success: function(data) {
             callback.call(context || this, data);
       }
    });
};
/**
 * 获取设备列表
 * @param params
 * @param callback
 * @param context
 */
function loadAllDevice(params, callback, context) {
      schneider.Ajax.request({
          url: "/api/assets",
          type: "GET",
          parameters:params,
          success: function(data) {
          callback.call(context || this, data);
    }
  });
}

/**
 * 获取某个现场的所有信息
 * */
function getAllSiteInfoBySiteid(id,params, callback, context) {
    schneider.Ajax.request({
        url: "/api/sites/infoAll/"+id,
        type: "GET",
        parameters:params,
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}