/*
*1.获取机器列表(取id列表)
 */
function getAPI_machines(params,callback,context) {
    schneider.Ajax.request({
        url: "/api/machines",
        type: "GET",
        dataType: "json",
        parameters:params,
        success: function (data) {
            callback.call(context || this,data);
        }
    });
}
/*
 *2.获取机器列表
 */
function postAPI_machines_list(requestData,params,callback,context) {
    schneider.Ajax.request({
        url: '/api/machines/list',
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
 *3.获取安装现场集合
 */
function getAPI_sites(params,callback,context) {
    schneider.Ajax.request({
        url: "/api/sites",
        type: "GET",
        dataType: "json",
        parameters:params,
        success: function (data) {
            callback.call(context || this,data);
        }
    });
}
/*
 *4.获取机器详细信息
 */
function getAPI_machines_$ID(mId,params,callback,context) {
    schneider.Ajax.request({
        url: "/api/machines/"+mId,
        type: "GET",
        dataType: "json",
        parameters:params,
        success: function (data) {
            callback.call(context || this,data);
        }
    });
}
/*
 *5.获取机器类型集合
 */
function getAPI_models(params,callback,context){
    schneider.Ajax.request({
        url: "/api/models",
        type: "GET",
        dataType: "json",
        parameters:params,
        success: function (data) {
            callback.call(context || this,data);
        }
    });
}
/*
 *6.创建控制器
 */
function postAPI_machines(requestData,params,callback,context) {
    schneider.Ajax.request({
        url: '/api/machines/',
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        traditional: true,
        data: JSON.stringify(requestData),
        parameters:params,
        success: function (data) {
            callback.call(context || this,data);
        }
    });
}
/*
* 7.更新控制器信息
*/
function putAPI_machines_$ID(mID,requestData,params,callback,context) {
    schneider.Ajax.request({
        url: "/api/machines/" + mID,
        type: "PUT",
        contentType: "application/json;charset=utf-8",
        traditional: true,
        data: JSON.stringify(requestData),
        parameters:params,
        success: function (data) {
            callback.call(context || this,data);
        }
    });
}
/*
* 8.删除控制器
* */
function deleteAPI_machines_$ID(id,params) {
    schneider.Ajax.request({
        url: "/api/machines/" + id,
        type: "DELETE",
        dataType: "json",
        async: false,
        parameters:params,
        success: function (data) {

        }
    });
}