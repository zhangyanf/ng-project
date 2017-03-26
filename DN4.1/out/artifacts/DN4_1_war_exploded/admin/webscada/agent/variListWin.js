/*===================================
*变量列表
**/
define(function(require) {
    require("./base/lang/zh-cn");
    var Utils = require("../pandect/utils/Helper");
    Ext.ns('Nts.Module.Common.Agent');
    Nts.Module.Common.Agent.VariList = function(config, handler, scope) {
        Ext.applyIf(config, {
            lang: Lang.Module.Common.Agent.AgentDrawableProperty,
            maximizable: false,
            minimizable: false,
            closable: true,
            constrainHeader: true,
            modal: true, //表示弹出窗口后，父窗口能否有效
            width: 580,
            height: 320
        });

        Nts.Module.Common.Agent.VariList.superclass.constructor.call(this, config);
        Ext.QuickTips.init();
    };

    Ext.extend(Nts.Module.Common.Agent.VariList, Ext.Window, {
        lang: null,
        formulaPanel: null,
        selVarCallback: null,
        drawable: null,
        img_name: null,
        img_id: null,
        src: null,
        //		deviceList:null,
        siteId: null,
        siteList: null,
        global: null,
        initComponent: function() {
            var self = this;
            this.varTypes = [
                locale.get({
                    lang: "var_BIT_0"
                }),
                locale.get({
                    lang: "var_WORD_1"
                }),
                locale.get({
                    lang: "var_DWORD_2"
                }),
                locale.get({
                    lang: "var_FLOAT_3"
                }),
                locale.get({
                    lang: "var_STRING_4"
                }),
                locale.get({
                    lang: "var_BYTE_5"
                }),
                locale.get({
                    lang: "var_BYTE_ARRAY_6"
                }),
                locale.get({
                    lang: "var_IPV4_4BYTE_7"
                }),
                locale.get({
                    lang: "var_NOW_SECONDS_8"
                }),
                locale.get({
                    lang: "var_NOW_MILLISECOND_9"
                }),
                locale.get({
                    lang: "var_INTEGER_10"
                }),
                locale.get({
                    lang: "var_PERCENTAGE_11"
                }),
                locale.get({
                    lang: "var_TIME_STRING_12"
                }),
                locale.get({
                    lang: "var_INTEGER_ARRAY_REFERENCE_13"
                }),
                locale.get({
                    lang: "var_SIGNED_INTEGER_14"
                }),
                locale.get({
                    lang: "var_UNSIGNED_INTEGER_15"
                }),
                locale.get({
                    lang: "var_MAC_16"
                }),
                locale.get({
                    lang: "var_IP_PORT_17"
                }),
                locale.get({
                    lang: "var_URL_STRING_18"
                })
            ];

            this.variateGrid = this.createGridPanel({
                name: 'variateGrid',
                id: "variateGrid",
                title: locale.get({
                    lang: "variablesTitle"
                }),
                tbar: true,
                sm: true,
                items: [],
                columns: [{
                    dataIndex: 'varName',
                    header: locale.get({
                        lang: "history_device_var"
                    }),
                    width: 210,
                    defaultValue: 'New',
                    sortable: true
                }, {
                    dataIndex: 'varType',
                    header: locale.get({
                        lang: "history_device_var_type"
                    }),
                    width: 150,
                    defaultValue: 0,
                    sortable: true
                }, {
                    dataIndex: 'units',
                    header: locale.get({
                        lang: "history_device_var_units"
                    }),
                    width: 150,
                    defaultValue: 0,
                    sortable: true
                }, { //newSite
                    dataIndex: 'varId',
                    header: '',
                    width: 100,
                    hidden: true,
                    hideable: false
                }, {
                    dataIndex: 'deviceId',
                    header: '',
                    width: 100,
                    hidden: true,
                    hideable: false
                }, {
                    dataIndex: 'vid',
                    header: '',
                    width: 100,
                    hidden: true,
                    hideable: false
                }]
            });


            var self = this;

            Ext.applyIf(this, {
                iconCls: 'icon-property',
                title: locale.get({
                    lang: "select_var"
                }),
                layout: 'fit',

                items: {
                    //xtype:'form',
                    //height: 201,
                    xtype: 'tabpanel',
                    activeTab: 0,
                    id: 'optionTable',
                    frame: false,
                    bodyBorder: false,
                    border: false,
                    deferredRender: false,
                    resizeTabs: true,
                    tabWidth: 100,
                    minTabWidth: 30,
                    items: [this.variateGrid]
                },
                buttons: [{
                    iconCls: 'icon-ok',
                    text: locale.get({
                        lang: "okText"
                    }),
                    handler: this.onOK,
                    scope: this
                }, {
                    iconCls: 'icon-cancel',
                    text: locale.get({
                        lang: "cancelText"
                    }),
                    handler: this.onCancel,
                    scope: this
                }],
                listeners: {
                    'afterrender': function() {
                        Utils.randomCenterWindow(this, 20, 20);
                        Utils.delayCall(this.onAfterRender, this, 100);
                        var siteId = null;
                        //填充全局   现场下拉框
                        var siteStore = new Ext.data.SimpleStore({
                            fields: ['id', 'name'],
                            data: this.siteList
                        });
                        Ext.getCmp('siteComb').clearValue();
                        Ext.getCmp('siteComb').store = siteStore;
                        if (Ext.getCmp('siteComb').view) { //刷新视图,避免视图值与实际值不相符
                            Ext.getCmp('siteComb').view.setStore(siteStore);
                        }
                        if (this.siteList) {
                            if (this.siteId) {
                                siteId = Ext.isArray(this.drawable.address) && Ext.isArray(this.drawable.address[0].varId) && this.drawable.address[0].varId.length > 0 ? this.drawable.address[0].varId[0].split("_")[0] : this.siteId;
                            } else {
                                var idFirst = this.siteList[0];
                                var id = idFirst[0];
                                siteId = Ext.isArray(this.drawable.address) && Ext.isArray(this.drawable.address[0].varId) && this.drawable.address[0].varId.length > 0 ? this.drawable.address[0].varId[0].split("_")[0] : id;
                            }
                            Ext.getCmp('siteComb').setValue(siteId);
                            this.onSelectSite(siteId);
                        }
                    }
                }
            });

            Nts.Module.Common.Agent.VariList.superclass.initComponent.call(this);
        },
        createGridPanel: function(config) {
            var self = this;
            var fields = [];
            var columns = [];
            var defaultValues = {};
            if (config.items && config.items.length > 0 && this.drawable.type == '1' && config.deleteType) {
                for (var i = 0; i < config.items.length; i++) {
                    config.items[i].deleteType = 1;
                    if (i == 1) {
                        break;
                    }
                }
            }


            //其它工具按钮
            var tbarTool = [];
            var editable = null;
            var readOnly = null;

            //判断是否是全局的还是现场的
            if (self.global == 1) {
                editable = true;
                readOnly = false;
            } else {
                editable = false;
                readOnly = true;
            }

            //现场选择
            var variateTbar = [locale.get({
                    lang: "site"
                }), {
                    xtype: 'combo',
                    id: 'siteComb',
                    store: new Ext.data.SimpleStore({
                        fields: ['id', 'name'],
                        data: this.siteList
                    }),
                    mode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    triggerAction: 'all',
                    emptyText: locale.get({
                        lang: "please_select_site"
                    }),
                    editable: editable,
                    readOnly: readOnly,
                    listeners: {
                        'select': function() {
                            var siteId = this.getValue();
                            self.onSelectSite(siteId);
                        }
                    }
                },
                locale.get({
                    lang: "device"
                }), {
                    xtype: 'combo',
                    id: "deviceComb",
                    store: new Ext.data.Store(),
                    mode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    triggerAction: 'all',
                    emptyText: locale.get({
                        lang: "please_select_device"
                    }),
                    listeners: {
                        'select': function() {
                            var deviceId = this.getValue().split("_")[0];
                            var moduleId = this.getValue().split("_")[1];
                            self.onSelectDevice(moduleId, deviceId);
                        }
                    }
                },
                locale.get({
                    lang: "writeble"
                }), {
                    xtype: 'checkbox',
                    id: "writeVarable",
                    mode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    //			                        triggerAction: 'all',
                    handler: this.getGridAction(config.name, this.getWriteVarableAction, this),
                    scope: this
                }
            ];
            if (config.tbar) {
                tbarTool = variateTbar;
            }
            var sm = null;
            if (config.sm) {

                sm = new Ext.grid.CheckboxSelectionModel();
                columns.push(sm);
            }
            for (var i = 0; i < config.columns.length; i++) {
                var column = config.columns[i];
                fields.push(column.dataIndex);
                columns.push(Ext.apply({}, column));
                defaultValues[column.dataIndex] = column.defaultValue;
            }

            var store = new Ext.data.JsonStore({
                fields: fields,
                root: 'rows'
            });
            var grid = new Ext.grid.EditorGridPanel({
                iconCls: 'icon-grid',
                title: config.title,
                store: store,
                columns: columns,
                height: 450,
                sm: sm,
                defaultValues: defaultValues,
                tbar: tbarTool
            });

            store.loadData({
                rows: config.items || []
            });
            return grid;
        },
        getGridAction: function(name, callback, scope, params) {
            return function() {
                callback.call(scope, scope[name], params);
            };
        },
        //选择是否可写方法
        getWriteVarableAction: function(grid) {
            var self = this;
            var formulas = {};
            var variateSelected = grid.getSelectionModel().getSelected();
            if (variateSelected) {
                self.drawable.writeVarable = true;
            } else {
                self.drawable.writeVarable = false;
                Ext.getCmp('writeVarable').setValue(false)
                dialog.render({
                    lang: "please_select_var"
                });
            }
            //			console.log("self.drawable",self.drawable);

        },
        //获取现场列表,选择现场
        onSelectSite: function(siteId) {
            var self = this;
            var deviceList = [];

            service.getDeviceList(siteId, function(data) {
                var deviceResult = data.result;
                //获取drawable里已保存的变量信息
                var siteId_alias_varId = [];
                if (self.global == 1) {
                    if (self.drawable.address && Ext.isArray(self.drawable.address) && Ext.isArray(self.drawable.address[0].varId) && self.drawable.address[0].varId.length > 0) {
                        siteId_alias_varId = self.drawable.address[0].varId[0].split("_");
                    }
                } else {
                    if (self.drawable.address && Ext.isArray(self.drawable.address)) {
                        if (Ext.isArray(self.drawable.address[0].varId) && self.drawable.address[0].varId.length > 0) {
                            siteId_alias_varId = self.drawable.address[0].varId[0].split("_");
                        }
                        //siteId_alias_varId=self.drawable.address[0].varId.split("_");
                    }
                }
                var deviceName = null;
                var deviceAlias = null;
                var varObj = {}; //key:设备列表      value:modelId
                for (var i = 0; i < deviceResult.length; i++) {
                    varObj[deviceResult[i].alias] = deviceResult[i].modelId;
                    var list = [];
                    if (deviceResult[i].alias) {
                        list.push(deviceResult[i].alias + "_" + deviceResult[i].modelId);
                    } else {
                        list.push("gw_" + deviceResult[i].modelId);
                    }
                    list.push(deviceResult[i].name);
                    deviceList.push(list);

                    if (deviceResult[i].alias) {
                        if (deviceResult[i].alias == siteId_alias_varId[1]) {
                            deviceName = deviceResult[i].name;
                            deviceAlias = deviceResult[i].alias;
                        }
                    } else {
                        deviceAlias = "gw";
                    }
                }

                var deviceStore = new Ext.data.SimpleStore({
                    fields: ['id', 'name'],
                    data: deviceList
                });
                Ext.getCmp('deviceComb').clearValue();
                Ext.getCmp('deviceComb').store = deviceStore;
                if (Ext.getCmp('deviceComb').view) { //刷新视图,避免视图值与实际值不相符
                    Ext.getCmp('deviceComb').view.setStore(deviceStore);
                }
                Ext.getCmp('deviceComb').enable();
                //设备下拉框回显设备名称
                Ext.getCmp('deviceComb').setValue(Ext.isArray(self.drawable.address) && self.drawable.address[0].varId ? deviceName : (deviceResult[0] ? deviceResult[0].name : ""));
                //显示变量列表
                if (siteId_alias_varId.length > 0 && deviceName) {
                    self.onSelectDevice(Ext.isArray(self.drawable.address) && self.drawable.address[0] ? varObj[siteId_alias_varId[1]] : deviceResult[0].modelId, Ext.isArray(self.drawable.address) && self.drawable.address[0].varId ? siteId_alias_varId[1] : deviceAlias);
                } else {
                    if (deviceResult.length > 0) {
                        var alias = null;
                        if (deviceResult[0].alias) {
                            alias = deviceResult[0].alias;
                        } else {
                            alias = "gw";
                        }
                        Ext.getCmp('deviceComb').setValue(deviceResult[0].name);
                        self.onSelectDevice(deviceResult[0].modelId, alias);

                    }
                }

            });
        },
        //获取设备列表,选择设备
        onSelectDevice: function(_modelId, alias) {
            var self = this;
            self.modelId = _modelId;
            self.deviceId = alias;
            cloud.Ajax.request({
                url: "api/models/" + _modelId,
                parameters: {
                    limit: 0,
                    verbose: 100
                },
                success: function(data) {
                    self.varResults = data.result.varInfo;
                    self.selectDeviceCallBack(self.varResults, alias, _modelId);
                }
            });
        },
        //选择设备回调函数
        selectDeviceCallBack: function(varResults, alias, _modelId, formula) {
            var self = this;
            var varList = [],
                checkedList = [];
            for (var i = 0; i < varResults.length; i++) {
                for (var j = 0; j < varResults[i].vars.length; j++) {
                    var siteId = Ext.getCmp('siteComb').getValue();
                    var _varId = siteId + "_" + alias + "_" + varResults[i].vars[j]._id;
                    varList.push({
                        vid: varResults[i]._id,
                        varId: _varId,
                        deviceId: alias + "_" + _modelId,
                        varName: varResults[i].vars[j].name,
                        varType: self.varTypes[parseInt(varResults[i].vars[j].vType)],
                        varvalue: varResults[i].vars[j].paramValue,
                        units: varResults[i].vars[j].unit || "",
                    });
                }
            }

            self.variateGrid.getStore().loadData({
                rows: varList || []
            });



            //选中列表的一行或者多行
            var total = self.variateGrid.getStore().getCount();

            var deviceId_varId = Ext.isArray(self.drawable.address) ? self.drawable.address[0].varId : null;
            if (deviceId_varId && deviceId_varId.length > 0) {
                for (var i = 0; i < deviceId_varId.length; i++) {
                    for (var j = 0; j < total; j++) {
                        var varId = self.variateGrid.getStore().getAt(j).get('varId');
                        if (varId == deviceId_varId[i]) {
                            self.variateGrid.getSelectionModel().selectRow(j, true);
                        }
                    }
                }
            }
        },
        onOK: function() {
            if (this.drawable.type == 5) {
                var self = this;
                var variateSelected = null;
                var variate = [];
                var varObj = {};
                if (self.global == 1) {
                    variateSelected = this.variateGrid.getSelectionModel().getSelections();
                    if (variateSelected && variateSelected.length > 0) {
                        var varList = [];
                        for (var i = 0; i < variateSelected.length; i++) {
                            varList.push(variateSelected[i].get('varId'));
                        }
                        varObj.varId = varList;
                    }
                } else {
                    // variateSelected=this.variateGrid.getSelectionModel().getSelected();
                    variateSelected = this.variateGrid.getSelectionModel().getSelections();
                    var varList = [];
                    for (var i = 0; i < variateSelected.length; i++) {
                        varList.push(variateSelected[i].get('varId'));
                    }
                    varObj.varId = varList;
                }
                variate.push(varObj);

                Ext.apply(this.drawable, {
                    address: variate,
                });
                if (this.selVarCallback) {
                    this.selVarCallback.fn.call(this.selVarCallback.scope, this);
                }

                this.close();
            } else {
                var self = this;
                var variateSelected = null;
                var variate = [];
                var varObj = {};
                if (self.global == 1) {
                    variateSelected = this.variateGrid.getSelectionModel().getSelections();
                    if (variateSelected && variateSelected.length > 0) {
                        var varList = [];
                        for (var i = 0; i < variateSelected.length; i++) {
                            varList.push(variateSelected[i].get('varId'));
                        }
                        varObj.varId = varList;
                    }
                } else {
                    //获取选中grid的行
                    variateSelected = this.variateGrid.getSelectionModel().getSelections();
                    var varList = [];
                    for (var i = 0; i < variateSelected.length; i++) {
                        //获取选中grid的列
                        varList.push(variateSelected[i].get('varId'));
                    }
                    varObj.varId = varList;
                }
                variate.push(varObj);
                Ext.apply(this.drawable, {
                    address: variate
                });

                if (this.selVarCallback) {
                    this.selVarCallback.fn.call(this.selVarCallback.scope, this);
                }

                this.close();
            }

        },

        onCancel: function() {
            if (this.drawable.type == 5) {
                if (this.cancelCallback) {
                    this.cancelCallback.fn.call(this.cancelCallback.scope, this);
                }
            } else if (this.drawable.type == 2) {
                if (this.userdefineCallback) {
                    this.userdefineCallback.fn.call(this.userdefineCallback.scope, this);
                }
            }
            this.close();
        }
    });



});