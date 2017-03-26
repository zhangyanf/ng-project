define(function(require) {
        //var cloud = require("cloud/base/cloud");
        //var html = require("./editVar.html");
        //var layout = require("cloud/lib/plugin/jquery.layout");
        //var Button = require("cloud/components/button");
        var service = require("../../../service");

        var editVarForm = {
            initialize: function(/*$super,*/ options) {
                /*$super(options);*/
                this.moduleName = "varBox";
                console.log("initialize var,", options);
                this.elements = {
                    content: {
                        id: "editVar-form-content",
                        "class": null
                    }
                };
                this.siteList = options.siteList;
                this.siteId = options.siteId;
                this.varId = options.varId;
                this.alias = options.alias;
                this.service = service;
                this.modelId = null;
                this.varType = null;
                this.plcId = "";
                this.deviceId = "";
                this.plcName = "";
                this.gatewayId = "";
                this.varName = ""
                this.varVal = "";
                this.form = "#editVar-form-wrapper";
                this.searchObj = null;
                this._render();
            },

            _render: function() {

                this._renderHtml();
                /*this._renderLayout();
                this._renderButtons();*/
                this._init();
            },
            _init: function() {
                var self = this;
                if (self.alias == "gw") { //网关
                    self.service.getDeviceList(self.siteId, function(data) {
                        var deviceResult = data.result;
                        for (var i = 0; i < deviceResult.length; i++) {
                            self.modelId = deviceResult[i].modelId;
                            self.plcId = deviceResult[i].plcId;
                            self.deviceId = deviceResult[i]._id;
                            self.plcName = deviceResult[i].name;
                            self.gatewayId = deviceResult[i].gatewayId;
                            //显示变量列表
                            self.getModel(self.modelId);
                        }
                    }, this);
                } else { //机型
                    self.service.getMachinesList(self.siteId, function(data) {
                        var deviceResult = data.result;
                        for (var i = 0; i < deviceResult.length; i++) {
                            self.modelId = deviceResult[i].modelId;
                            self.plcId = deviceResult[i].plcId;
                            self.deviceId = deviceResult[i]._id;
                            self.plcName = deviceResult[i].name;
                            self.gatewayId = deviceResult[i].gatewayId;
                            //显示变量列表
                            self.getModel(self.modelId);
                        }
                    }, this);
                }
            },
            getModel: function(modelId) {
                $("#editVar-form-device-name").val(this.plcName);
                var varId = this.varId;
                this.service.getModelInfo(modelId, function(data) {
                    var varInfo = data.result.varInfo;
                    for (var i = 0; i < varInfo.length; i++) {
                        var vars = varInfo[i].vars;
                        for (var i = 0; i < vars.length; i++) {
                            if (vars[i]._id == varId) {
                                var varType = vars[i].type; //变量类型;
                                var varName = vars[i].name; //变量名称 
                                $("#editVar-form-var-id").val(varId);
                                $("#editVar-form-var-name").val(varName);
                                $("#editVar-form-var-type").val(varType);
                                break;
                            }
                        }
                    }
                });
            },
            // 加载Html
            _renderHtml: function() {
                this.element.html(html);
                var htmls = '<form id="editVar-form-wrapper">' +
                                '<div class="row">' +
                                    '<div class="col-xs-12">' +
                                        '<div class="col-xs-4">' +
                                            '<span class="editVar-form-table" lang="text:varible_id"></span>:' +
                                        '</div>' +
                                        '<div class="col-xs-8">' +
                                            '<input type="text" name="editVar-form-var-id" id="editVar-form-var-id">' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="col-xs-12">' +
                                        '<div class="col-xs-4">' +
                                            '<span class="editVar-form-table" lang="text:varible_name"></span>' +
                                        '</div>' +
                                        '<div class="col-xs-8">' +
                                            '<input type="text" name="editVar-form-var-name" id="editVar-form-var-name">' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="col-xs-12">' +
                                        '<div class="col-xs-4">' +
                                            +'<span class="editVar-form-table" lang="text:history_device_name"></span>' +
                                        '</div>' +
                                        '<div class="col-xs-8">' +
                                            '<input type="text" name="editVar-form-device-name" id="editVar-form-device-name">' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="col-xs-12">' +
                                        '<div class="col-xs-4">' +
                                            '<span class="editVar-form-table" lang="text:history_device_var"></span>' +
                                        '</div>' +
                                        '<div class="col-xs-8">' +
                                            '<input type="text" name="editVar-form-var-val" id="editVar-form-var-val">' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="col-xs-12">' +
                                        '<div class="col-xs-6">' +
                                            '<button type="button" class="btn btn-primary" data-toggle="button" id="varSubmit" lang="text:submit"></button>' +
                                        '</div>' +
                                        '<div class="col-xs-6">' +
                                            '<button type="button" class="btn close" data-toggle="button" data-dismiss="modal" aria-label="Close" lang="text:cancel"></button>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</form>';
                $("#editVar-form-content").append(htmls);
            },


            /*_renderLayout: function() {
                var self = this;
                self.layout = this.element.find('#editVar-form').layout({
                    defaults: {
                        paneClass: "pane",
                        togglerClass: "cloud-layout-toggler",
                        resizerClass: "cloud-layout-resizer",
                        spacing_open: 1,
                        spacing_closed: 1,
                        togglerLength_closed: 50,
                        resizable: false,
                        slidable: false
                    },
                    center: {
                        paneSelector: "#" + self.elements.content.id
                    }
                });
            },
            _renderButtons: function() {
                var self = this;
                this.submitBtn = new Button({
                    container: "#editVar-form-bottom",
                    text: locale.get("submit"),
                    lang: "{title:submit,text:submit}",
                    imgCls: "cloud-icon-yes",
                    events: {
                        click: function() {
                            self.editVar();
                        }
                    }
                });
                this.cancelBtn = new Button({
                    container: "#editVar-form-bottom",
                    text: locale.get("cancel"),
                    lang: "{title:cancel,text:cancel}",
                    imgCls: "cloud-icon-no",
                    events: {
                        click: function() {
                            self.fire("closeWindow", "cancel");
                        }
                    }
                });

            },*/
            //提交表单
            editVar: function() {
                var self = this;
                self._getSearchCondition();
                self.mask();

                service.editVar(self.searchObj, function(data) {
                    var resul = data.result;
                    self.unmask();
                    if (resul.result == "ok") {
                        self.fire("closeWindow", "edit", self.varVal);
                    } else if (resul.result == "timeout") {
                        self.fire("nochangeWindow", "timeout", resul.reason);
                    } else {
                        self.fire("nochangeWindow", "error", resul.reason);
                    }

                }, this);
            },

            _getSearchCondition: function() {
                var self = this;
                var varVal = $("#editVar-form-var-val").val();
                self.varVal = varVal;

                self.varType = $("#editVar-form-var-type").val();
                self.searchObj = {
                    varValue: varVal,
                    varId: self.varId,
                    gwId: self.gatewayId,
                    deviceId: self.deviceId,
                    varType: self.varType,
                    plcId: self.plcId,
                    plcName: self.plcName
                };
                //							console.log("  self.searchObj     ",self.searchObj )
            },
            destroy: function() {
                /*this.layout.destroy();*/
                this.element.empty();
                this.elements = null;
            }
        };

    return editVarForm;

});