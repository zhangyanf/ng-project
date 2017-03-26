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
 * 根据条件加载设备列表
 * @param isAsync
 * @param params
 * @param callback
 * @param context
 */

function loadDeviceByCondition(isAsync,params, callback, context) {
    schneider.Ajax.request({
        url: "/api/assets",
        type: "GET",
        parameters:params,
        async:isAsync,
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}

function loadDeviceByCondition2(isAsync,params, callback, context) {
    schneider.Ajax.request({
        url: "/api/assets",
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
 * 根据id获取设备
 * @param isAsync
 * @param id
 * @param param
 * @param callback
 * @param context
 */
function getDeviceById(isAsync,id,params, callback, context) {
    schneider.Ajax.request({
        url: "/api/assets/"+id,
        type: "GET",
        parameters:params,
        async:isAsync,
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}

/**
 * 根据设备id获取本设备下的部件列表
 * @param params
 * @param callback
 * @param context
 */
function loadDevice_parts(Did,params, callback, context) {
        schneider.Ajax.request({
            url: "/api/assets/"+Did+"/parts",
            type: "GET",
            parameters:params,
            success: function(data) {
            callback.call(context || this, data);
    }
  });
}
/**
 * 根据部件id获取部件信息
 * @param mId
 * @param params
 * @param callback
 * @param context
 */
function getPartsInfoById(DId,query, callback, context) {
      schneider.Ajax.request({
        url: "/api/assets/"+DId+"/parts/list",
        type: "POST",
        data: query,
        success: function(data) {
        callback.call(context || this, data);
    }
  });
}

/**
 * 查询设备下的所有的部件
 * @param isAsync
 * @param asset_id
 * @param params
 * @param callback
 * @param context
 */
function getAllPart(isAsync,asset_id,params,callback, context) {
    schneider.Ajax.request({
        url: "/api/assets/"+asset_id+"/parts",
        type: "GET",
        async:isAsync,
        parameters:params,
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}

/**
 * 根据部件id获取部件信息
 * @param deviceId
 * @param params
 * @param query
 * @param callback
 * @param context
 */
function getPartInfoById(partId,params,callback,context){
    schneider.Ajax.request({
        url: "/api/assets/parts/"+partId,
        type: "GET",
        parameters:params, 
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}
/**
 * 获取维护历史列表
 * @param params
 * @param callback
 * @param context
*/
function loadAllHistory(params,callback, context) {
      schneider.Ajax.request({
        url: "api/asset_parts_record",
        type: "GET",
        parameters:params,
        success: function(data) {
        callback.call(context || this, data);
    }
  });
 }
 /**
  * 维护部件API
  * @param params
  * @param callback
  * @param context
 */
function partsMaintain(DId,params, callback, context) {
          schneider.Ajax.request({
            url: "/api/assets/"+DId+"/parts/maintain",
            type: "PUT",
            data:JSON.stringify(params),
            success: function(data) {
            callback.call(context || this, data);
    }
  });
}

/**
 * 维护部件API
 * @param params
 * @param callback
 * @param context
 */
function partsMaintain(requestData,params,isAsync, callback, context) {
    schneider.Ajax.request({
        url: "/api/parts/repair",
        type: "POST",
        async:isAsync,
        parameters:params,
        data:JSON.stringify(requestData),
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}

/**
 * 获取部件的维护历史记录
 * @param params
 * @param callback
 * @param context
 */
function loadPartsMaintainHistory(params,callback, context) {
    schneider.Ajax.request({
        url: "api/parts/logs",
        type: "GET",
        parameters:params,
        success: function(data) {
            callback.call(context || this, data);
        }
    });
}