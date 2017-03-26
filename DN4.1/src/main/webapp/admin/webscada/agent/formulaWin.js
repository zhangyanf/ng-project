/*============================
*公式面板
**/
define(function(require) {
    require("./base/lang/zh-cn");
    var Utils = require("../pandect/utils/Helper");
    Ext.ns('Nts.Module.Common.Agent');
    Nts.Module.Common.Agent.FormulaList = function(config, handler, scope) {
        Ext.applyIf(config, {
            maximizable: false,
            minimizable: false,
            closable: true,
            constrainHeader: true,
            modal: true, //表示弹出窗口后，父窗口能否有效
            width: 580,
            height: 320
        });

        Nts.Module.Common.Agent.FormulaList.superclass.constructor.call(this, config);
        Ext.QuickTips.init();
    };

    Ext.extend(Nts.Module.Common.Agent.FormulaList, Ext.Window, {
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

            this.formulaGrid = this.createGridPanel({
                name: 'variateGrid',
                id: "variateGrid",
                title: locale.get({
                    lang: "history_device_var_formula"
                }),
                tbar: true,
                sm: true,
                items: [],
                columns: [{
                    dataIndex: 'formulaName',
                    header: locale.get({
                        lang: "history_device_var_formula"
                    }),
                    width: 100,
                    sortable: true
                }, {
                    dataIndex: 'description',
                    header: locale.get({
                        lang: "formula_desc"
                    }),
                    width: 250,
                    sortable: true
                }, {
                    dataIndex: 'eg',
                    header: locale.get({
                        lang: "formula_eg"
                    }), //公式范例
                    width: 180,
                    sortable: true
                }]
            });


            var self = this;
            var formulaList = [{
                    formulaName: "F_bms()",
                    description: "屏蔽乱码",
                    eg: "F_bms(_53f6fd0e2cdc08479d543557_gw_300001)"
                }, {
                    formulaName: "ToString()",
                    description: "将结果转换为字符串",
                    eg: "ToString(_53f6fd0e2cdc08479d543557_gw_300001)"
                }
            ];
            self.formulaGrid.getStore().loadData({
                rows: formulaList || []
            });
            Ext.applyIf(this, {
                iconCls: 'icon-property',
                title: locale.get({
                    lang: "select_formula"
                }),
                layout: 'fit',
                items: {
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
                    items: [this.formulaGrid]
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
                    }
                }
            });

            Nts.Module.Common.Agent.FormulaList.superclass.initComponent.call(this);
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
            var sm = null;
            if (config.sm) {
                sm = new Ext.grid.CheckboxSelectionModel({
                    singleSelect: true
                });
                columns.push(sm);
            }
            for (var i = 0; i < config.columns.length; i++) {
                var column = config.columns[i];
                fields.push(column.dataIndex);
                columns.push(Ext.apply({}, column));
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
            });

            store.loadData({
                rows: config.items || []
            });
            return grid;
        },
        onOK: function() {
            var self = this;
            var variateSelected = null;
            var formulaName = null;
            variateSelected = this.formulaGrid.getSelectionModel().getSelected();
            if (variateSelected) {
                formulaName = variateSelected.get('formulaName');
            }
            if (this.selVarCallback) {
                this.selVarCallback.fn.call(this.selVarCallback.scope, formulaName);
            }

            this.close();

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