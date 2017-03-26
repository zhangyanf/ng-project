// 获取列表角色ID
function getListRoleIds(params,callback,context) {
    schneider.Ajax.request({
        url: "/api2/roles",
        type: "get",
        parameters:params,
        success:function(data) {
            callback.call(context || this,data);
        }
    });
}
// 获取列表角色信息
function getListRoleInfo(params,requestData,callback,context) {
    schneider.Ajax.request({
        url: "/api2/roles/list",
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

// 创建角色
function createRole(requestData,callback,context) {
    schneider.Ajax.request({
        url: "/api2/roles",
        type: "post",
        traditional: true,
        contentType:"application/json;charset=utf-8",
        data:JSON.stringify(requestData),
        success:function(data) {
            callback.call(context || this,data);
        }
    });
}

// 获取角色信息
function getRoleInfo(id,callback,context) {
    schneider.Ajax.request({
        url: "/api2/roles/"+id+"?verbose=50",
        type: "get",
        success:function(data) {
            callback.call(context || this,data);
        }
    });
}

// 编辑角色
function editRole(id,requestData,callback,context) {
    schneider.Ajax.request({
        url: "/api2/roles/"+id,
        type: "put",
        traditional: true,
        contentType:"application/json;charset=utf-8",
        data:JSON.stringify(requestData),
        success:function(data) {
            callback.call(context || this,data);
        }
    });
}

// 删除角色
function deleteRole(id,callback,context) {
    schneider.Ajax.request({
        url: "/api2/roles/"+id,
        type: "delete",
        success:function(data) {
            callback.call(context || this, data);
        },
        error:function (errorData) {
            callback.call(context || this, errorData);
        }
    });
}

// 查询角色
function serachRole(params,isAsync,callback,context) {
    schneider.Ajax.request({
        url: "/api2/roles",
        type: "get",
        async : isAsync,
        dataType:'json',
        parameters:params,
        success:function(data) {
            callback.call(context || this,data);
        }
    });
}
