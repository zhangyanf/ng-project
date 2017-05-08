/*
 *1.获取所有用户的ID
 */
function searchAPI2_users(params,isAsync,callback,context) {
    schneider.Ajax.request({
        url: "/api2/users",
        type: "GET",
        dataType: "json",
        parameters:params,
        async : isAsync,
        success: function (data) {
            callback.call(context || this,data);
        }
    });
}

/**
 * 根据条件查询用户
 * @param params
 * @param isAsync
 * @param callback
 * @param context
 */
function searchAPI2_users2(params,isAsync,callback,context) {
    schneider.Ajax.request({
        url: "/api/users2",
        type: "GET",
        dataType: "json",
        parameters:params,
        async : isAsync,
        success: function (data) {
            callback.call(context || this,data);
        }
    });
}

/*
 *2.获取所有用户信息
 */
function searchAPI2_users_list(params, requestData,callback,context) {
    schneider.Ajax.request({
        url: '/api2/users/list',
        type: "POST",
        parameters:params,
        contentType: 'application/json; charset=utf-8',
        traditional: true,
        data: JSON.stringify(requestData),
        success: function (data) {
            callback.call(context || this,data);
        }
    });
}
/*
 *3.获取角色列表，标识
 */
function searchAPI2_roles(params,callback,context) {
    schneider.Ajax.request({
        url: "/api2/roles",
        type: "GET",
        dataType: "json",
        parameters:params,
        success: function (data) {
            callback.call(context || this,data);
        }
    });
}
/*
 *4.获取无标签的用户资源_id
 */
// function searchAPI_tags_none_resources(params,callback,context) {
//     schneider.Ajax.request({
//         url: "/api/tags/none/resources",
//         type: "GET",
//         dataType: "json",
//         parameters:params,
//         success: function (data) {
//             callback.call(context || this,data);
//         }
//     });
// }
/*
 *5.获取所有标签资源
 */
// function searchAPI_userTags(params,callback,context) {
//     schneider.Ajax.request({
//         url: "/api/user_tags",
//         type: "GET",
//         parameters:params,
//         dataType: "json",
//         success: function (data) {
//             callback.call(context || this,data);
//         }
//     });
// }
/*
 *6.获取指定标签下的资源（用户资源）
 */
// function searchAPI_tags_$ID_resources(params, tabId,callback,context) {
//     schneider.Ajax.request({
//         url: "/api/tags/" + tabId + "/resources",
//         type: "GET",
//         parameters:params,
//         dataType: "json",
//         success: function (data) {
//             callback.call(context || this,data);
//         }
//     });
// }
/*
 *7.删除用户
 */
function deleteAPI2_users_$ID(params, ID) {
    schneider.Ajax.request({
        url: "/api2/users/" + ID,
        type: "DELETE",
        parameters:params,
        dataType: "json",
        async: false,
        success: function (data) {

        }
    });
}
/*
 *8.创建用户
 */
function postAPI2_users(params, requestData,callback,context) {
    schneider.Ajax.request({
        url: "/api2/users",
        type: "POST",
        parameters:params,
        contentType: "application/json;charset=utf-8",
        traditional: true,
        data: JSON.stringify(requestData),
        success: function (data) {
            callback.call(context || this,data);
        }
    });
}
/*
 *9.修改用户信息
 */
function putAPI2_users_$ID(params, ID, requestData,callback,context) {
    schneider.Ajax.request({
        url: "/api2/users/" + ID,
        type: "PUT",
        parameters:params,
        contentType: "application/json;charset=utf-8",
        traditional: true,
        data: JSON.stringify(requestData),
        success: function (data) {
            callback.call(context || this,data);
        }
    });
}
/*
 *10.获取验证码
 */
function getAPI_captchas(params,callback,context) {
    schneider.Ajax.request({
        url: "/api/captchas",
        parameters:params,
        type: "GET",
        dataType: "json",
        success: function (data) {
            callback.call(context || this,data);
        }
    });
}
/*
 *11.重置密码
 */
function putAPI2_users_$ID_resetPassword(ID, requestData, params,callback,context) {
    schneider.Ajax.request({
        url: "/api2/users/" + ID + "/reset_password",
        type: "PUT",
        parameters:params,
        contentType: "application/json;charset=utf-8",
        traditional: true,
        data: JSON.stringify(requestData),
        success: function (data) {
            callback.call(context || this,data);
        }
    });
}
/*
 *12.获取所选用户的标签资源，查出已有标签和为拥有标签
 */
// function postAPI_resources_tags(params,requestData,callback,context) {
//     schneider.Ajax.request({
//         url: "/api/resources_tags",
//         type: "POST",
//         parameters:params,
//         contentType: "application/json;charset=utf-8",
//         traditional: true,
//         data: JSON.stringify(requestData),
//         success: function (data) {
//             callback.call(context || this,data);
//         }
//     });
// }
function getAPI2_user_this(params,callback,context){
    schneider.Ajax.request({
        url: "/api2/users/this",
        type: "GET",
        parameters:params, 
        success: function (data) {
            callback.call(context || this,data);
        }
    });
}

function getAPI2_user_this2(isAsync,params,callback,context){
    schneider.Ajax.request({
        url: "/api2/users/this",
        type: "GET",
        parameters:params,
        async:isAsync,
        success: function (data) {
            callback.call(context || this,data);
        }
    });
}

/*
 *12.获取用户所属角色的权限信息
 */
function getOauth2_get_token_info(callback,context){
    schneider.Ajax.request({
        url: "/oauth2/get_token_info",
        type: "GET",
        success: function (data) {
            callback.call(context || this,data);
        }
    });
}

/*
* 13.根据ip获取地理位置信息
* */
function get_location_ip(params,callback,context) {
    schneider.Ajax.request({
        url: "/api/common/location/ip",
        type: "GET",
        parameters:params,
        success: function (data) {
            callback.call(context || this,data);
        }
    });
}

/*
* 获取机构信息
* */
function get_api2_orgizations_this(params,callback,context) {
    schneider.Ajax.request({
        url: "/api2/organizations/this",
        type: "GET",
        parameters:params,
        success: function (data) {
            callback.call(context || this,data);
        }
    });
}