/**
 * 获取机构下令牌
 */
function getToken(params,callback,context) {
    schneider.Ajax.request({
        url: "/api/api_key",
        type: "GET",
        parameters: params,
        success:function(data) {
            callback.call(context||this,data);
        }
    });
}

/**
 *获取机构详情信息
 */
function getOrganizationInfo(params,callback,context) {
    schneider.Ajax.request({
        url: "/api2/organizations/this",
        type: "GET",
        parameters: params,
        success:function(data) {
            callback.call(context||this,data);
        }
    });
}

/**
 *重置令牌
 */
function resetToken(params,callback,context) {
    schneider.Ajax.request({
        url: "/api/api_key/"+params.keyCode,
        type: "put",
        parameters: params,
        success:function(data) {
            callback.call(context||this,data);
        }
    });
}

/**
 *申请令牌
 */
function applyToken(params,callback,context) {
    schneider.Ajax.request({
        url: "/api/api_key",
        type: "post",
        parameters: params,
        success:function(data) {
            callback.call(context||this,data);
        }
    });
}

/**
 *编辑机构信息
 */
function editOrganizationInfo(params,requestData,callback,context) {
    schneider.Ajax.request({
        url: "/api2/organizations/this",
        type: "put",
        parameters: params,
        traditional: true,
        contentType:"application/json;charset=utf-8",
        data:JSON.stringify(requestData),
        success:function(data) {
            callback.call(context||this,data);
        }
    });
}