/************************************************
 * Copyright(C), InHand Networks All Rights Reserved
 * 变量弹出框
 * 2016-11-07
 * @author Lee李杰
 * description "元器件详细信息"
 */
define(function(require) {
    require("./base/lang/zh-cn");
    // var Configure = require("./Configure");
    var Board = require("../pandect/components/canvas/Board");
    var Utils = require("../pandect/utils/Helper");
    // require("../pandect/components/canvas/Global");
    var AgentCanvasTool = require("./AgentCanvasToolProperty");
    var var_info_save = null;
    var variateForm = {
        //初始化函数
        initialize: function(options) {
            // console.log("variateForm options,", options);
            /**
             * options 说明 尤其是drawable
             * drawable.a / drawable.address ==> formula , varId --> array
             * drawable.animatorData ==> array
             * drawable.board ==> objext
             * drawable.endPoints == > 端点 array
             * drawable.es ==> array
             * drawable.event / drawable.events
             * drawable.flowTo ==> 0/1
             * drawable.flowValut ==》number
             * drawable.h ==> number
             * drawable.height ==> number
             * drawable.id ==> number
             * drawable.images ==> array
             * drawable.is ==> array
             * drawable.m ==> object
             * drawable.titles ==> array
             * drawable.ts ==> array
             * drawable.type ==> number
             * drawable.variableValueflow: number
             * drawable.variableValuestop: number
             * drawable.w ==> number
             * drawable.width ==> number
             * drawable.writeVarable ==> boolean
             * drawable.x ==> number
             * drawable.y ==> number
             * drawable.z ==> number
             * drawable.siteId ==> string
             * drawable.siteList ==>array
             */
            this.renderTo = options.renderTo;
            this.drawable = options.drawable;
            // console.log("init ............this.drawable", this.drawable);
            this.siteList = options.siteList;
            this.siteId = options.siteId;
            this.infoBoard = options.infoBoard;
            $("#editVarBox").show();
            $("#editVarBox").modal({
                backdrop: 'static',
                keyboard: false,
                show: true
            });
            $(".editScadaName").hide();
            $("#editVarBox").show();
            $(".varEditBoxHeader").hide();
            $(".content-moulde").hide();
            // $(".content-moulde-property").hide();
            $("#customImageGridTitle_content table").hide();
            $(".content-header-var li a").removeClass('navsActive');
            $(".content-header-var li").removeClass('active');
            $("#optionTable input").val("");
            $("#optionTable select option").removeAttr("selected");
            $("#expression").text("");
            $("#this_for_temp").empty();
            $(".formErrorContent").remove();
            $(".no_data").hide();
            $(".tool-edit").hide();
            $("#optionTable input").removeAttr( "checked");
            $("#var_list_box input").prop( "checked", false);
            this.initComponent();
            this.changePanel();
            this.onAffirm();
            this.onCancel();
            file_id = null;
            temp_cus_data = {};
            locale.render( { element: "#editVarBox"});
        },
        //初始化面板组件
        initComponent: function() {
            var self = this;
            //控制器对象
            var disabled = null;
            var pipeFlag = null;
            var pipeCo = null;
            if (self.drawable.machine) {
                disabled = "hidden";
                pipeFlag = "hidden";
                pipeCo = "hidden";
            } else {
                disabled = "combo";
                pipeFlag = "button";
                pipeCo = "textfield";
            }
            var customColumns = [];
            var customTitle = "";
            if (self.drawable.type == 8) {
                customTitle = "animatorImageGridTitle";
                customColumns = [];
            } else if (self.drawable.type == 9) {
                customTitle = "animatorImageGridTitle";
                //
            } else {
                customTitle = "customImageGridTitle";
            }
            $("#optionTable .content-moulde-property").hide();
            $("#properties_content").show();
            //函数加载
            if (self.drawable.machine) { //
                /*if( self.global == 1) {*/
                $(".expressionHeader").addClass('active').show();
                $("#expressionHeader").addClass('navsActive');
                $(".variableSetHeader").show();
                /*$(".basicTabTitleHeader").show();
                $(".titleGridTitleHeader").show();
                $(".imageGridTitleHeader").show();*/
                $(".propertiesHeader").show();
                $(".linkHeader").show();
                $("#expression_content").show();
                //函数加载
                self.expression();
                self.variableSet();
                self.basicTabTitle();
                self.titleGridTitle();
                self.imageGridTitle();
                self.linkShow();
                /* }*/
            } else {
                if (self.drawable.type == 1 || self.drawable.type == 3) {
                    $(".expressionHeader").addClass('active').show();
                    $("#expressionHeader").addClass('navsActive');
                    /*$(".basicTabTitleHeader").show();
                    $(".titleGridTitleHeader").show();
                    $(".imageGridTitleHeader").show();*/
                    $(".propertiesHeader").show();
                    $(".linkHeader").show();
                    $("#expression_content").show();
                    //函数加载
                    self.expression();
                    self.basicTabTitle();
                    self.titleGridTitle();
                    self.imageGridTitle();
                    self.linkShow();
                } else if (self.drawable.type == 2 ) {
                    $(".customImageGridTitleHeader").addClass('active').show();
                    $("#customImageGridTitleHeader").addClass('navsActive');
                    $("#customImageGridTitle_content").show();
                    // $(".linkHeader").show();
                    $("#this_type_other").show();
                    //函数加载
                    self.customImageGridTitle();
                } else if (self.drawable.type == 5) {
                    $(".expressionHeader").addClass('active').show();
                    $("#expressionHeader").addClass('navsActive');
                    $(".scaleTitleHeader").show();
                    $(".linkHeader").show();
                    $("#expression_content").show();
                    //函数加载
                    self.expression();
                    self.scaleTitle();
                    self.imageGridTitle();
                    //self.titleGridTitle();
                    self.customImageGridTitle();
                    self.linkShow();
                } else if (self.drawable.type == 6) {
                    //console.log("type == 6,", self.drawable);
                    /*$(".basicTabTitleHeader").addClass('active').show();
                    $("#basicTabTitleHeader").addClass('navsActive');
                    $(".titleGridTitleHeader").show();
                    $(".imageGridTitleHeader").show();*/
                    $(".propertiesHeader").addClass('active').show();
                    $("#propertiesHeader").addClass('navsActive');
                    $(".linkHeader").show();
                    $("#properties_content").show();
                    $("#basicTabTitle_content").show();
                    $("#titleGridTitle_content").show();
                    $("#imageGridTitle_content").show();
                    //函数加载
                    self.basicTabTitle();
                    self.titleGridTitle();
                    self.imageGridTitle();
                    self.linkShow();
                } else if (self.drawable.type == 7) {
                    $(".expressionHeader").addClass('active').show();
                    $("#expressionHeader").addClass('navsActive');
                    $(".variableSetHeaderr").show();
                    /*$(".basicTabTitlePipeFormHeader").show();*/
                    $(".propertiesHeader").show();
                    $(".linkHeader").show();
                    $("#expression_content").show();
                    //函数加载
                    self.expression();
                    self.variableSet();
                    self.pipeForm();
                    self.linkShow();
                } else if (self.drawable.type == 8) {
                    $(".expressionHeader").addClass('active').show();
                    $("#expressionHeader").addClass('navsActive');
                    $(".customImageGridTitleHeader").show();
                    $(".linkHeader").show();
                    $("#expression_content").show();
                    //函数加载
                    self.expression();
                    self.customImageGridTitle();
                    self.linkShow();
                } else if (self.drawable.type == 9) {
                    $(".customImageGridTitleHeader").addClass('active').show();
                    $("#customImageGridTitleHeader").addClass('navsActive');
                    $("#customImageGridTitle_content").show();
                    $(".linkHeader").show();
                    $("#this_type_9").show();
                    //函数加载
                    self.customImageGridTitle();
                    self.linkShow();
                } else /*if( self.drawable.type == 10) {
                     $(".propertiesHeader").addClass('active').show();
                    $("#propertiesHeader").addClass('navsActive');
                    $(".endPointGridHeader").show();
                    $(".linkHeader").show();
                    $("#properties_content").show();
                    $("#basicTabTitle_content").show();
                    $("#titleGridTitle_content").show();
                    // $("#imageGridTitle_content").show();
                    //函数加载
                    self.basicTabTitle();
                    self.titleGridTitle();
                    // self.imageGridTitle();
                    self.endPointGridTitle();
                    self.linkShow();
                } else */{
                    /*$(".basicTabTitleHeader").addClass('active').show();
                    $("#basicTabTitleHeader").addClass('navsActive');
                    $(".titleGridTitleHeader").show();
                    $(".imageGridTitleHeader").show();*/
                    $(".propertiesHeader").addClass('active').show();
                    $("#propertiesHeader").addClass('navsActive');
                    // $(".endPointGridHeader").show();
                    $(".linkHeader").show();
                    $("#properties_content").show();
                    $("#basicTabTitle_content").show();
                    $("#titleGridTitle_content").show();
                    $("#imageGridTitle_content").show();
                    //函数加载
                    self.basicTabTitle();
                    self.titleGridTitle();
                    self.imageGridTitle();
                    self.endPointGridTitle();
                    self.linkShow();
                }
            }
        },
        // show expression
        expression: function() {
            //表达式
            //id="varDevice"
            var self = this;
            $("#varDevice").empty();
            $("#select_formula_box").empty();
            $("#select_var_box").empty();
            //是否可写的显示
            if (this.drawable.writeVarable == true) {
                $("#var_writeble").prop("checked", true);
            } else {
                $("#var_writeble").prop("checked", false);
            }
            //基本变量
            var siteList = this.siteList;
            var varInfos = this.drawable.address;
            //console.log("this is varInfos, varInfos,", varInfos);
            var current_site_id = self.siteId;
            $("#var_list_box").empty();
            $("#show_var_detail_info").empty();
            //console.log( siteId,"test in expression");
            getSiteVars( current_site_id, null, false,function(data) {
                //console.log("this is var data,", data, ",data.result,", data.result);
                var self = this;
                if( data.result) {
                    var var_groups = data.result.groups;
                    // console.log( "var_groups in Variables,", var_groups);
                    for( var i = 0; i < var_groups.length; i++ ) {
                        var current_group = var_groups[i];
                        var current_group_name = current_group.name;
                        var current_group_name_1 = current_group_name.replace(/\s/g, "_");
                        var current_group_vars = current_group.vars;
                        $("#var_list_box").append("<li class='mol-xs-12' id=" + current_group_name_1 + ">" +
                                                    "<a class='mol-xs-12'>" + current_group_name + "</a>" +
                                                    "<ul class='treeview_menu mol-xs-12'>" +
                                                    "</ul>" +
                                                  "</li>");
                        show_var_list( var_groups, current_group);
                    }
                } else {
                    $("#optionTable").find(".no_data").remove();
                    $("#optionTable").append("<form class='form-group no_data' align='center'>"+ locale.get({lang:"no_variable"}) +"</form>");
                }
            }, this);
            function show_var_list( var_groups, current_group) {
                // console.log("current_group_vars in show_var_list,", current_group);
                var self = this;
                var current_group_name = current_group.name;
                var current_group_name_1 = current_group_name.replace(/\s/g, "_");
                var current_group_vars = current_group.vars;
                var var_array_length = current_group_vars.length;
                for( var j = 0; j < current_group_vars.length; j++) {
                    // console.log(" current_group_vars in for ,", current_group_vars[j]);
                    var origin_id = current_group_vars[j].id;
                    var input_id = current_group_vars[j].id.replace(/\s/g, "_");
                    // console.log("origin_id, ", origin_id, ", input_id,", input_id);
                    $("#"+ current_group_name_1 +" ul.treeview_menu").append( "<li>" +
                            "<input style='margin-left:3px;' type='radio' id="+ input_id + current_group_vars[j].address  +" />" +
                            "<span style='margin-left:5px;'>" + current_group_vars[j].desc + "</span>" +
                        "</li>");
                    if( origin_id == varInfos) {
                        // console.log("varInfos, ", varInfos);
                        var temp_input_id = input_id + current_group_vars[j].address;
                        //console.log("temp_input_id,",temp_input_id);
                        $("#" + temp_input_id + "").prop('checked', true);
                        //var_infos_id = current_group_vars[j].id;
                        //console.log("self.var_infos_id , current",var_infos_id );
                        show_var_details( current_group_vars[j]);
                    }
                }
                //tree
                $("ul.treeview_menu li:last-child").css("background-position-y","-1766px");
                $("#var_list_box .treeview_menu li").unbind("click").click( function(e) {
                    //console.log("input id,", $(this).find("input").attr("id"));
                    var current_click_input = $(this).find("input").attr("id");
                    $("#var_list_box input").prop("checked", false);
                    $("#" + current_click_input + "").prop("checked", true);
                    //console.log("var_groups in show_var_details,", var_groups);
                    for( var x = 0; x < var_groups.length; x++) {
                        var vars_vars = var_groups[x].vars;
                        //var names = var_groups[x].name;
                        //console.log("vars_vars,", vars_vars);
                        for( var k = 0; k < vars_vars.length; k++) {
                            //console.log("detail., vars_vars, ", vars_vars[k]);
                            var input_id = vars_vars[k].id.replace(/\s/g, "_");
                            //console.log("input_id,",input_id);
                            var all_id_one = input_id + vars_vars[k].address;
                            //console.log( "all_id_one,", all_id_one);
                            if( all_id_one == current_click_input) {
                                //console.log( "bingo");
                                //var_infos_id = vars_vars[k].id;
                                //console.log("self.var_infos_id , unbind,", var_infos_id );
                                show_var_details( vars_vars[k]);
                            }
                        }
                    }
                });
            }
            function show_var_details( current_group_vars_info){
                //console.log("show_var_details, current_group_vars_info",current_group_vars_info);
                var self = this;
                var_info_save = current_group_vars_info;
                //console.log("var_infos,", this.var_infos);
                $("#show_var_detail_info").empty();
                if( current_group_vars_info.desc != undefined) {
                    var detail_desc = current_group_vars_info.desc;
                    $("#show_var_detail_info").append( "<div class='form-group'>" +
                                                            "<label class='col-xs-4'>" + locale.get("var_desc") + "</label>" +
                                                            "<div class='form-group'>" + detail_desc + "</div>" +
                                                          "</div>");
                }
                if( current_group_vars_info.id  != undefined) {
                    var detail_id = current_group_vars_info.id;
                    $("#show_var_detail_info").append( "<div class='form-group'>" +
                                                            "<label class='col-xs-4'>" + locale.get("varible_id") + "</label>" +
                                                            "<div class='form-group'>" + detail_id + "</div>" +
                                                          "</div>");
                }
                if( current_group_vars_info.address != undefined) {
                    var detail_address = current_group_vars_info.address;
                    $("#show_var_detail_info").append( "<div class='form-group'>" +
                                                            "<label class='col-xs-4'>" + locale.get("register_address") + "</label>" +
                                                            "<div class='form-group'>" + detail_address + "</div>" +
                                                          "</div>");
                }
                if( current_group_vars_info.unit != undefined) {
                    var detail_unit = current_group_vars_info.unit;
                    $("#show_var_detail_info").append( "<div class='form-group'>" +
                                                            "<label class='col-xs-4'>" + locale.get("unit") + "</label>" +
                                                            "<div class='form-group'>" + detail_unit + "</div>" +
                                                          "</div>");
                }
                if( current_group_vars_info.controllerId != undefined) {
                    var detail_controllerId = current_group_vars_info.controllerId;
                    $("#show_var_detail_info").append( "<div class='form-group'>" +
                                                            "<label class='col-xs-4'>" + locale.get("controller_id") + "</label>" +
                                                            "<div class='form-group'>" + detail_address + "</div>" +
                                                          "</div>");
                }
                if( current_group_vars_info.level != undefined) {
                    var detail_level = current_group_vars_info.level;
                    $("#show_var_detail_info").append( "<div class='form-group'>" +
                                                            "<label class='col-xs-4'>" + locale.get("level") + "</label>" +
                                                            "<div class='form-group'>" + detail_level + "</div>" +
                                                          "</div>");
                }
                if( current_group_vars_info.pollingInterval != undefined) {
                    var detail_pollingInterval = current_group_vars_info.pollingInterval;
                    $("#show_var_detail_info").append("<div class='form-group'>" +
                                                            "<label class='col-xs-4' style='font-size:16px;font-weight:bold;'>" + locale.get("polling_interval") + "</label>" +
                                                            "<div class='form-group'>" + detail_pollingInterval + "</div>" +
                                                          "</div>" );
                }
                if( current_group_vars_info.expression != undefined) {
                    var detail_expression = current_group_vars_info.expression;
                    $("#show_var_detail_info").append("<div class='form-group'>" +
                                                            "<label class='col-xs-4' style='font-size:16px;font-weight:bold;'>" + locale.get("expression") + "</label>" +
                                                            "<div class='form-group'>" + detail_expression + "</div>" +
                                                          "</div>");
                }
                if( current_group_vars_info.writeable != undefined) {
                    var detail_writeable = current_group_vars_info.writeable;
                    /*if( detail_writeable) {*/
                        detail_writeable = "yesText";
                    /*} else {
                        detail_writeable = "noText";
                    }*/
                    $("#show_var_detail_info").append( "<div class='form-group'>" +
                                                            "<label class='col-xs-4'>" + locale.get("writeble") + "</label>" +
                                                            "<div class='form-group'>" + locale.get(""+ detail_writeable + "") + "</div>" +
                                                          "</div>");
                }
                if( current_group_vars_info.siteId != undefined) {
                    var detail_site_id = current_group_vars_info.siteId;
                    $("#show_var_detail_info").append( "<div class='form-group'>" +
                                                            "<label class='col-xs-4'>" + locale.get("site") + "Id" + "</label>" +
                                                            "<div class='form-group'>" + detail_site_id + "</div>" +
                                                          "</div>");
                }
                if( current_group_vars_info.type != undefined) {
                    var detail_type = current_group_vars_info.type;
                    $("#show_var_detail_info").append( "<div class='form-group'>" +
                                                            "<label class='col-xs-4'>" + locale.get("type") + "</label>" +
                                                            "<div class='form-group'>" + detail_type + "</div>" +
                                                          "</div>");
                }
                if( current_group_vars_info.group != undefined) {
                    var detail_group = current_group_vars_info.group;
                    $("#show_var_detail_info").append( "<div class='form-group'>" +
                                                            "<label class='col-xs-4'>" + locale.get("group") + "</label>" +
                                                            "<div class='form-group'>" + detail_group + "</div>" +
                                                          "</div>");
                }
                if( current_group_vars_info.calc_mode != undefined) {
                    var detail_calc_mode = current_group_vars_info.calc_mode;
                    $("#show_var_detail_info").append( "<div class='form-group'>" +
                                                            "<label class='col-xs-4'>" + locale.get("calc_mode") + "</label>" +
                                                            "<div class='form-group'>" + detail_calc_mode + "</div>" +
                                                          "</div>");
                }
                if( current_group_vars_info.warning != undefined) {
                    var detail_warning = current_group_vars_info.warning;
                    var detail_warning_expression = detail_warning.expression;
                    var detail_warning_code = detail_warning.code;
                    var detail_warning_level = detail_warning.level;
                    $("#show_var_detail_info").append( "<div class='form-group'>" +
                                                            "<label class='col-xs-4'>" + locale.get("warning") + "</label>" +
                                                            "<div class='col-xs-8'>" +
                                                                "<div class='form-group col-xs-12'>" +
                                                                    "<label class='col-xs-5'>" + locale.get("expression") + "</label>" +
                                                                    "<div class='form-group col-xs-7'>" + detail_warning_expression + "</div>" +
                                                                "</div>"+
                                                                "<div class='form-group col-xs-12'>" +
                                                                    "<label class='col-xs-5'>" + locale.get("code") + "</label>" +
                                                                    "<div class='form-group col-xs-7'>" + detail_warning_code + "</div>" +
                                                                "</div>"+
                                                                "<div class='form-group col-xs-12'>" +
                                                                    "<label class='col-xs-5'>" + locale.get("level") + "</label>" +
                                                                    "<div class='form-group col-xs-8'>" + detail_warning_level + "</div>" +
                                                                "</div>"+
                                                            "</div>" +
                                                          "</div>");
                }
                if( current_group_vars_info.trigger != undefined) {
                    var detail_trigger = current_group_vars_info.trigger;
                    $("#show_var_detail_info").append( "<div class='form-group'>" +
                                                            "<label class='col-xs-4'>" + locale.get("trigger") + "</label>" +
                                                            "<div class='form-group'>" + detail_trigger + "</div>" +
                                                          "</div>");
                }
            }
        },
        //expression save
        expressionSave: function() {
            //表达式保存
            var self = this;
            // console.log("<var_info_save></var_info_save> in expressionData,,", var_info_save);
            if ( var_info_save && var_info_save != "") {
                var expressionData = var_info_save.id;
            } else {
                var expressionData = "";
            }
            return expressionData;
        },
        // variableSet
        variableSet: function() {
            //变量值设置
            var self = this;
            var flowBasic = self.drawable && self.drawable.flowTo ? self.drawable.flowTo : "1"; //1 正向
            if (flowBasic == "1") {
                $("#flow_to option.forward").attr("selected", "selected");
            } else {
                $("#flow_to option.backward").attr("selected", "selected");
            }
            $("#flow_to").bind("change", function() {
                self.drawable.flowTo = $(this).val();
            });
            // 管道颜色
            var color1 = self.drawable.pipeColor ? self.drawable.pipeColor : "#000000";
            $("#pipe_color").val( color1);
            $('#pipe_color_select i').css( "background-color", "" + color1 + "");
            ////console.log('self.drawable && self.drawable.pipeColor ? self.drawable.pipeColor : "#000000"', color1);
            // 颜色选择
            $('#pipe_color_select').colorpicker();
            //流向颜色
            var color2 = self.drawable.flowColor ? self.drawable.flowColor : "#000000";
            $("#flow_color").val( color2);
            //颜色选择
            $("#flow_color_select").unbind("click").click(function(event) {
                ////console.log("flow_color_show");
            });
            $('#flow_color_select i').css( "background-color", "" + color2 + "");
            $("#flow_color_select").colorpicker();
            //动态
            var variableValueflow = self.drawable && self.drawable.variableValueflow ? self.drawable.variableValueflow : 1;
            // $("#variableflow_select option").attr("selected","");
            if (variableValueflow == "1" || variableValueflow == "大于") {
                $("#variableflow_select option.flow_bigger").attr("selected", "selected");
            } else if (variableValueflow == "2" || variableValueflow == "等于") {
                $("#variableflow_select option.flow_equal").attr("selected", "selected");
            } else {
                $("#variableflow_select option.flow_small").attr("selected", "selected");
            }
            $("#variableflow_select").bind("change", function() {
                self.drawable.variableValueflow = $(this).find('option:selected').attr("value");
            });
            var flowValue = self.drawable.flowValue ? self.drawable.flowValue : 0;
            $("#flow_value").val( flowValue);
            var variableValuestop = self.drawable.variableValuestop;
            if (variableValuestop == "1" || variableValuestop == "大于") {
                $("#variableflow_stop_select option.stop_bigger").attr("selected", "selected");
            } else if (variableValuestop == "2" || variableValuestop == "等于") {
                $("#variableflow_stop_select option.stop_equal").attr("selected", "selected");
            } else {
                $("#variableflow_stop_select option.stop_small").attr("selected", "selected");
            }
            $("#variableflow_stop_select").bind("change", function() {
                self.drawable.variableValuestop = $(this).find('option:selected').attr("value");
                ////console.log("test", $(this).find('option:selected').attr("value"));
            });
            var stopValue = self.drawable.stopValue ? self.drawable.stopValue : 0;
            $("#stop_value").val( stopValue);
        },
        //variableSet sava
        variableSetSave: function() {
            //变量值设置保存
            var self = this;
            var flowTo = $("#flow_to option:selected").val();
            if(!flowTo) {
                flowTo = "1";
            }
            var pipeColor = $("#pipe_color").val();
            if( !pipeColor) {
                pipeColor = "#000000";
            }
            var flowColor = $("#flow_color").val();
            if( !flowColor) {
                flowColor = "#000000";
            }
            var variableValueflow = $("#variableflow_select option:selected").val();
            if( !variableValueflow) {
                variableValueflow = "2";
            }
            variableValueflow = parseFloat(variableValueflow);
            var variableValuestop = $("#variableflow_stop_select option:selected").val();
            if( !variableValuestop) {
                variableValuestop = "2";
            }
            variableValuestop = parseFloat(variableValuestop);
            var flow_value = $("#flow_value").val();
            var flowValue = parseFloat( flow_value);
            var stop_value = $("#stop_value").val();
            var stopValue = parseFloat( stop_value);
            var variableData = {
                flowTo: flowTo,
                pipeColor: pipeColor,
                flowColor: flowColor,
                variableValueflow: variableValueflow,
                variableValuestop: variableValuestop,
                flowValue: flowValue,
                stopValue: stopValue
            };
            // console.log("variableSetSave,", variableData);
            return variableData;
        },
        //basicTabTitle 位置
        basicTabTitle: function() {
            //位置
            var self = this;
            if (self.drawable) {
                //x坐标
                if (self.drawable.x) {
                    var tab_x = self.drawable.x;
                } else {
                    var tab_x = 0;
                }
                $("#x_coordinate").val(tab_x);
                $("#x_coordinate").bind("change", function() {
                    //$(this).val().test(/^\d+$/);
                    // console.log("this value x_coordinate,", $(this).val());
                    self.drawable.x = $(this).val();
                });
                //y坐标
                if (self.drawable.y) {
                    var tab_y = self.drawable.y;
                } else {
                    var tab_y = 0;
                }
                $("#y_coordinate").val(tab_y);
                $("#y_coordinate").bind("change", function() {
                    //$(this).val().test(/^\d+$/);
                    self.drawable.y = $(this).val();
                });
                //宽度
                if (self.drawable.width) {
                    var tab_width = self.drawable.width;
                } else {
                    var tab_width = 0;
                }
                //高度度
                if (self.drawable.height) {
                    var tab_height = self.drawable.height;
                } else {
                    var tab_height = 1;
                }
                var proportion = tab_width / tab_height;
                $("#basic_width").val(tab_width);
                $("#basic_height").val(tab_height);
                $("#basic_width").bind( "change", function() {
                    //$(this).val().test(/^[1-9]\d*(\.\d+)?$/);
                    $("#basic_height").val( Math.round( $(this).val() / proportion ));
                    self.drawable.width = $(this).val();
                });
                $("#basic_height").bind( "change", function() {
                    //$(this).val().test(/^[1-9]\d*(\.\d+)?$/);
                    $("#basic_width").val( Math.round( $(this).val() * proportion ));
                    self.drawable.height = $(this).val();
                });
                //显示比例值
                if (self.drawable.displayScale) {
                    var display_scale = self.drawable.displayScale;
                } else {
                    var display_scale = 100;
                }
                //console.log("display_scale,", display_scale);
                $("#basic_display_scale option").each(function(index, el) {
                    //console.log(this,"in each option");
                    if( $(this).val() == display_scale) {
                        $(this).prop('selected', 'selected');
                    }
                });
                $("#basic_display_scale").bind("change", function() {
                    self.drawable.displayScale = $(this).val();
                });
            }
        },
        //basicTabTitle save
        basicTabTitleSave: function() {
            //位置 保存
            var self = this;
            var x = $("#x_coordinate").val();
            if( !x) {
                x = 0;
            }
            var y = $("#y_coordinate").val();
            if( !y ) {
                y = 0;
            }
            var width = $("#basic_width").val();
            if( !width) {
                width = 0;
            }
            var height = $("#basic_height").val();
            if( !height) {
                height = 0;
            }
            var displayScale = $("#basic_display_scale").val();
            if( !displayScale ) {
                displayScale = 100;
            }
            x = parseFloat(x);
            y = parseFloat(y);
            width = parseFloat(width);
            height = parseFloat(height);
            displayScale = parseFloat(displayScale);
            var basicTabData = {
                x: x,
                y: y,
                width: width,
                height: height,
                displayScale: displayScale
            };
            return basicTabData;
        },
        //PipeForm 位置
        pipeForm: function() {
            //管道对象
            var self = this;
            var widthValue = null;
            var heightValue = null;
            if (self.drawable.m) {
                //管道 pipe
                if (self.drawable.m.pipeTo || self.drawable.m.pipeTo == 0) {
                    if (self.drawable.m.pipeTo == 1) {
                        widthValue = self.drawable && self.drawable.pipeW ? self.drawable.pipeW : 452;
                        heightValue = self.drawable && self.drawable.pipeH ? self.drawable.pipeH : 20;
                    } else if (self.drawable.m.pipeTo == 0) {
                        widthValue = self.drawable && self.drawable.pipeW ? self.drawable.pipeW : 20;
                        heightValue = self.drawable && this.drawable.pipeH ? self.drawable.pipeH : 452;
                    }
                }
            }
            ////console.log("widthValue", widthValue, "heightValue", heightValue);
            $("#x_coordinate_pipe").val(self.drawable ? self.drawable.x : 0);
            $("#x_coordinate_pipe").bind("change", function() {
                //$(this).val().test(/^\d+$/);
                self.drawable.x = $(this).val();
            });
            $("#y_coordinate_pipe").val(self.drawable ? self.drawable.y : 0);
            $("#y_coordinate_pipe").bind("change", function() {
                //$(this).val().test(/^\d+$/);
                self.drawable.y = $(this).val();
            });
            $("#basic_width_pipe").val(widthValue);
            $("#basic_width_pipe").bind("change", function() {
                //$(this).val().test(/^[1-9]\d*(\.\d+)?$/);
                self.drawable.pipeW = $(this).val();
            });
            $("#basic_height_pipe").val(heightValue);
            $("#basic_height_pipe").bind("change", function() {
                //$(this).val().test(/^[1-9]\d*(\.\d+)?$/);
                self.drawable.pipeH = $(this).val();
            });
        },
        //pipeForm save
        pipeFormSave: function() {
            //pipeForm 位置保存
            var self = this;
            var x = $("#x_coordinate_pipe").val();
            if( !x) {
                x = 0;
            }
            var y = $("#y_coordinate_pipe").val();
            if( !y) {
                y = 0;
            }
            var pipeW = $("#basic_width_pipe").val();
            if( !pipeW) {
                if (self.drawable.m.pipeTo || self.drawable.m.pipeTo == 0) {
                    if (self.drawable.m.pipeTo == 1) {
                        pipeW = 452;
                    } else if (self.drawable.m.pipeTo == 0) {
                        pipeW = 20;
                    }
                }
            }
            var pipeH = $("#basic_height_pipe").val();
            if( !pipeH) {
                if (self.drawable.m.pipeTo || self.drawable.m.pipeTo == 0) {
                    if (self.drawable.m.pipeTo == 1) {
                        pipeH = 20;
                    } else if (self.drawable.m.pipeTo == 0) {
                        pipeH = 452;
                    }
                }
            }
            x = parseFloat(x);
            y = parseFloat(y);
            pipeW = parseFloat(pipeW);
            pipeH = parseFloat(pipeH);
            var pipeData = {
                x: x,
                y: y,
                pipeW: pipeW,
                pipeH: pipeH
            };
            //console.log("pipeFormSave,", pipeData);
            return pipeData;
        },
        //titleGridTitle 文字
        titleGridTitle: function() {
            //文字
            var self = this;
            $("#titleGridTitle_table_body").empty();
            if( self.drawable.type == 5) {
                $("#titleGridTitle_table_body").hide();
            } else {
                $("#titleGridTitle_table_body").show();
            }
            if( !self.drawable && !self.drawable.titles) {
                $("#optionTable").find(".no_data").remove();
                $("#optionTable").append("<form class='form-group no_data' align='center'>"+ locale.get({lang:"no_variable"}) +"</form>");
            }
            var titleGridTitle = self.drawable ? self.drawable.titles : [""];
            console.log( "titleGridTitle,", titleGridTitle );
            if (titleGridTitle && titleGridTitle != null  && titleGridTitle.length && titleGridTitle.length > 0) {
                $("#titleGridTitle_table_body").empty();
                for (var i = 0; i < titleGridTitle.length; i++) {
                    var text = titleGridTitle[i].text ? titleGridTitle[i].text : "";
                    var x = titleGridTitle[i].x ? titleGridTitle[i].x : "0";
                    var y = titleGridTitle[i].y ? titleGridTitle[i].y : "0";
                    var bold = titleGridTitle[i].bold ? titleGridTitle[i].bold : false;
                    var bold_value = null;
                    if( bold ) {
                        bold_value = 1;
                    } else {
                        bold_value = 0;
                    }
                    var size = titleGridTitle[i].size ? titleGridTitle[i].size : "12";
                    var font = titleGridTitle[i].font ? titleGridTitle[i].font : "Arial";
                    var color = titleGridTitle[i].color ? titleGridTitle[i].color : "";
                    var align = titleGridTitle[i].align ? titleGridTitle[i].align : "";
                    var deleteType = titleGridTitle[i].deleteType ? titleGridTitle[i].deleteType : "0";
                    var rotation = titleGridTitle[i].rotation ? titleGridTitle[i].rotation : "";
                    var titleGridTitleContent = "<tr id='titleGrid" + i + "'>" +
                        "<td align='center'>" +
                        "<input type='checkbox' id='title" + i + "'/>" +
                        "</td>" +
                        "<td>" +
                        "<input type='text' class='form-control input-sm' id='text" + i + "' value='" + text + "'\/\>" +
                        "</td>" +
                        "<td>" +
                        "<input type='text'  id='x" + i + "' value='" + x + "' class='validate[number] form-control input-sm'/>" +
                        "</td>" +
                        "<td>" +
                        "<input type='text'  id='y" + i + "' value='" + y + "' class='validate[number] form-control input-sm'/>" +
                        "</td>" +
                        "<td>" +
                            "<select id='bold" + i +"' class='form-control input-sm'>" +
                                "<option value="+ bold_value+"></option>" +
                            "</select>"+
                        "</td>" +
                        "<td>" +
                        "<input type='text' id='size" + i + "' value='" + size + "' class='validate[number] form-control input-sm'/>" +
                        "</td>" +
                        "<td>" +
                        "<input type='text' id='font" + i + "' value='" + font + "' class='validate[number] form-control input-sm'/>" +
                        "</td>" +
                        "<td>" +
                        "<input type='text' id='color" + i + "' value='" + color + "' class='form-control input-sm'/>" +
                        "</td>" +
                        "<td>" +
                        "<input type='text' id='align" + i + "' value='" + align + "' class='form-control input-sm'/>" +
                        "</td>" +
                        "<td  style='display:none;'>" +
                        "<input type='text' id='deleteType" + i + "' value='" + deleteType + "' class='form-control input-sm'/>" +
                        "</td>" +
                        "<td  style='display:none;'>" +
                        "<input type='text' id='rotation" + i + "' value='" + rotation + "' class='form-control input-sm'/>" +
                        "</td>" +
                        "</tr>";
                    $("#titleGridTitle_table_body").append(titleGridTitleContent);
                    $("#text" + i + "").val( text);
                    if( bold_value == 1) {
                        $("#bold"+ i +"").find('option').text( locale.get("yesText")).attr('selected', 'selected');
                        $("#bold"+ i +"").append( "<option value='0'>" + locale.get("noText") + "</option>");
                    } else {
                        $("#bold"+ i +"").find('option').text( locale.get("noText")).attr('selected', 'selected');
                        $("#bold"+ i +"").append( "<option value='1'>" + locale.get("yesText") + "</option>");
                    }
                }
            } else {
                console.log( "test titleGridTitle == null;");
                var no_data_html = "<tr class='no_data'><td align='center' colspan='9'>" + locale.get({lang:"no_data"}) + "</td></tr>";
                $("#titleGridTitle_table_body").append( no_data_html);
            }
            //新增
            var addFlag = 1;
            $("#add_title_grid_title").on( "click", function(event) {
                if( $("#titleGridTitle_table_body tr.no_data td").text() == locale.get({lang:"no_data"}) ) {
                    $("#titleGridTitle_table_body").empty();
                }
                var titleGridTitleContentAdd = "<tr id='titleGridAdd" + addFlag + "'>" +
                    "<td align='center'>" +
                    "<input type='checkbox' id='titleAdd" + addFlag + "' />" +
                    "</td>" +
                    "<td>" +
                    "<input type='text' id='textAdd" + addFlag + "' value='' class='form-control input-sm'/>" +
                    "</td>" +
                    "<td>" +
                    "<input type='text' id='xAdd" + addFlag + "' value='' class='validate[number] form-control input-sm'/>" +
                    "</td>" +
                    "<td>" +
                    "<input type='text' id='yAdd" + addFlag + "' value='' class='validate[number] form-control input-sm'/>" +
                    "</td>" +
                    "<td>" +
                        "<select id='boldAdd" + i +"' class='form-control input-sm'>" +
                                "<option value='1'>" + locale.get("yesText") +"</option>" +
                                "<option value='0'>" + locale.get("noText") +"</option>" +
                        "</select>"+
                    "</td>" +
                    "<td>" +
                    "<input type='text' id='sizeAdd" + addFlag + "' value='' class='validate[number] form-control input-sm'/>" +
                    "</td>" +
                    "<td>" +
                    "<input type='text' id='fontAdd" + addFlag + "' value='' class='validate[number] form-control input-sm'/>" +
                    "</td>" +
                    "<td>" +
                    "<input type='text' id='colorAdd" + addFlag + "' value='' class='form-control input-sm'/>" +
                    "</td>" +
                    "<td>" +
                    "<input type='text' id='alignAdd" + addFlag + "' value='' class='form-control input-sm'/>" +
                    "</td>" +
                    "<td style='display:none;'>" +
                    "<input type='text' id='deleteType" + addFlag + "' value='0' class='form-control input-sm'/>" +
                    "</td>" +
                    "<td style='display:none;'>" +
                    "<input type='text' id='rotation" + addFlag + "' value='' class='form-control input-sm'/>" +
                    "</td>" +
                    "</tr>";
                $("#titleGridTitle_table_body").append(titleGridTitleContentAdd);
                addFlag++;
            });
            //删除
            $("#delete_title_grid_title").on("click", function(event) {
                var delete_title_checked = $( "#titleGridTitle_table_body input:checked");
                if( delete_title_checked.length > 0 ) {
                    delete_title_checked.each( function() {
                        var ids = $(this).attr("id");
                        var target = ids.charAt(ids.length - 1);
                        $("#titleGrid" + target + "").remove();
                        $("#titleGridAdd" + target + "").remove();
                    });
                } else {
                    errorTipDis("please_select_at_least_one_config_item")
                }
            });
            locale.render( { element: "#editVarBox"});
        },
        //titleGridTitle Save
        titleGridTitleSave: function() {
            //titleGridTitle 文字保存
            var self = this;
            ////console.log( $("#titleGridTitle_table_body tr").length);
            var titleData = [];
            $("#titleGridTitle_table_body").find('tr').each(function(index, el) {
                $("#this_for_temp").empty();
                $("#this_for_temp").append(el);
                var tempId = $("#this_for_temp tr").attr("id");
                //文字
                var second = $("#" + tempId + " :nth-child(2) input").val();
                if( !second) {
                    second = "";
                }
                //x
                var third = $("#" + tempId + " :nth-child(3) input").val();
                if( !third) {
                    third = 160;
                }
                //y
                var forth = $("#" + tempId + " :nth-child(4) input").val();
                if( !forth) {
                    forth = 160;
                }
                //blod
                var fifth = $("#" + tempId + " :nth-child(5) select").find('option:selected').val();
                if( fifth == 1) {
                    fifth = true;
                } else {
                    fifth = false;
                }
                //size
                var sixth = $("#" + tempId + " :nth-child(6) input").val();
                if( !sixth) {
                    sixth = "12"
                }
                //
                var seventh = $("#" + tempId + " :nth-child(7) input").val();
                if( !seventh) {
                    seventh = "Arial";
                }
                var eighth = $("#" + tempId + " :nth-child(8) input").val();
                if( !eighth) {
                    eighth = "#111";
                }
                var nineth = $("#" + tempId + " :nth-child(9) input").val();
                if( !nineth) {
                    nineth = "";
                }
                var tenth = $("#" + tempId + " :nth-child(10) input").val();
                if ( !tenth) {
                    tenth = "";
                }
                var eleventh = $("#" + tempId + " :nth-child(11) input").val();
                if( !eleventh) {
                    eleventh = "";
                }
                tenth = parseFloat(tenth);
                third = parseFloat( third);
                forth = parseFloat( forth);
                sixth = parseFloat( sixth);
                var tempObj = {
                    deleteType: tenth,
                    text: second,
                    x: third,
                    y: forth,
                    bold: fifth,
                    size: sixth,
                    font: seventh,
                    color: eighth,
                    align: nineth,
                    rotation: eleventh
                };
                if( tempObj.text == "") {
                    return ;
                }
                titleData.push(tempObj);
            });
            return titleData;
        },
        //imageGridTitle
        imageGridTitle: function() {
            //图片
            var self = this;
            $("#imageGridTitle_table_body").empty();
            $("#imageGridTitle_table_body").show();
            if( self.drawable.type == 5 || self.drawable.type == 10) {
                $("#imageGridTitle_content").hide();
                $("#imageGridTitle_table_body").hide();
            }
            if( !self.drawable && !self.drawable.images) {
                $("#optionTable").find(".no_data").remove();
                $("#optionTable").append("<form class='form-group no_data' align='center'>"+ locale.get({lang:"no_variable"}) +"</form>");
            }
            var imageGridTitle = self.drawable ? self.drawable.images : [];
            // console.log( "imageGridTitle,", imageGridTitle);
            if (imageGridTitle && imageGridTitle.length) {
                for (var i = 0; i < imageGridTitle.length; i++) {
                    // console.log( imageGridTitle[i], "test");
                    var el = imageGridTitle[i].el ? imageGridTitle[i].el : "";
                    var name = imageGridTitle[i].name ? imageGridTitle[i].name : "";
                    if( self.drawable.type != 10) {
                        name = el;
                    }
                    var width = imageGridTitle[i].width ? imageGridTitle[i].width : "";
                    var height = imageGridTitle[i].height ? imageGridTitle[i].height : "";
                    var wpercent = imageGridTitle[i].wpercent ? imageGridTitle[i].wpercent : 0;
                    var hpercent = imageGridTitle[i].hpercent ? imageGridTitle[i].hpercent : 0;
                    //以下两个不需要显示
                    var deleteType = imageGridTitle[i].deleteType ? imageGridTitle[i].deleteType : "";
                    var rotation = imageGridTitle[i].rotation ? imageGridTitle[i].rotation : "";

                    var optVal = "";
                    //判断是否是灯，是则添加值判断列
                    var colorValStr = '<td style="display: none;"></td>';
                    if(self.drawable.url=='components/indicate-lamp/'){
                        var colorVal = imageGridTitle[i].image_variable_value ? imageGridTitle[i].image_variable_value : "";
                        if(colorVal !="1" && colorVal != "0"){
                            optVal = "other";
                        }else{
                            optVal = colorVal;
                        }
                        $("#image_variable_value").show();
                        colorValStr = '<td>' +
                            '<select id="image_variable_select'+i+'" class="form-control input-sm">' +
                            '<option value="1" >1</option>' +
                            '<option value="0">0</option>' +
                            '<option value="other">'+locale.get("other")+'</option>' +
                            '</select>' +
                            '</td>'
                    }else{
                        $("#image_variable_value").hide();
                    }
                    var imageGridTitleContent = "<tr id='imageGrid" + i + "'>" +
                        "<td align='center'>" +
                        "<input type='checkbox' id='" + el + "' style='display:none'/>" +
                        "</td>" +
                        "<td>" +
                        "<input type='text' id='el" + i + "' value='" + name + "' class='form-control input-sm' readonly/>" +
                        "</td>" + colorValStr+
                        "<td style='display:none;'>" +
                        "<input type='text' id='image_width" + i + "' value='" + width + "' class='validate[number] form-control input-sm'/>" +
                        "</td>" +
                        "<td style='display:none;'>" +
                        "<input type='text' id='image_height" + i + "' value='" + height + "' class='validate[number] form-control input-sm'/>" +
                        "</td>" +
                        "<td style='display:none;'>" +
                        "<input type='text' id='image_wpercent" + i + "' value='" + wpercent + "' class='validate[number] form-control input-sm'/>" +
                        "</td>" +
                        "<td style='display:none;'>" +
                        "<input type='text' id='image_hpercent" + i + "' value='" + hpercent + "' class='validate[number] form-control input-sm'/>" +
                        "</td>" +
                        "<td style='display:none;'>" +
                        "<input type='text' id='image_deleteType" + i + "' value='" + deleteType + "' class='form-control input-sm'/>" +
                        "</td>" +
                        "<td style='display:none;'>" +
                        "<input type='text' id='image_rotation" + i + "' value='" + rotation + "' class='form-control input-sm'/>" +
                        "</td>" +
                        "</tr>";
                    $("#imageGridTitle_table_body").append(imageGridTitleContent);
                    $("#el" + i + "").val( name);
                    if(optVal!=""){
                        $("#image_variable_select"+i).val(optVal);
                    }
                }
            }
            //新增
            var addFlag = 1;
            $("#add_image_grid_title")/*.unbind("click").click(*/.unbind( "click").bind( "click", function(event) {
                var imageGridTitleContent = "<tr id='imageGridAdd" + addFlag + "'>" +
                    "<td align='center'>" +
                    "<input type='checkbox' id='image" + addFlag + "'/>" +
                    "</td>" +
                    "<td>" +
                    "<input type='text' id='elAdd" + addFlag + "' class='form-control input-sm'/>" +
                    "</td>" +
                    "<td>" +
                    "<input type='text' id='image_widthAdd" + addFlag + "' class='validate[number] form-control input-sm'/>" +
                    "</td>" +
                    "<td>" +
                    "<input type='text' id='image_heightAdd" + addFlag + "' class='validate[number] form-control input-sm'/>" +
                    "</td>" +
                    "<td>" +
                    "<input type='text' id='image_wpercentAdd" + addFlag + "' class='validate[number] form-control input-sm'/>" +
                    "</td>" +
                    "<td>" +
                    "<input type='text' id='image_hpercentAdd" + addFlag + "' class='validate[number] form-control input-sm'/>" +
                    "</td>" +
                    "<td style='display:none;'>" +
                    "<input type='text' id='image_deleteTypeAdd" + i + "' value='0' class='form-control input-sm'/>" +
                    "</td>" +
                    "<td style='display:none;'>" +
                    "<input type='text' id='image_rotationAdd" + i + "' value='' class='form-control input-sm'/>" +
                    "</td>" +
                    "</tr>";
                $("#imageGridTitle_table_body").append(imageGridTitleContent);
                addFlag++;
            });
            //删除delete_image_grid_title
            //
            $("#delete_image_grid_title").unbind("click").click(function(event) {
                // console.log( "this is delete_image_grid_title,", $("#delete_image_grid_title input:checked"));
                var delete_image_checked = $("#imageGridTitle_table_body input:checked");
                // console.log( "delete_image_checked", delete_image_checked);
                if( delete_image_checked.length > 0 ) {
                    delete_image_checked.each( function() {
                        var ids = $(this).attr( "id");
                        var target = ids.charAt(ids.length - 1);
                        $("#imageGrid" + target + "").remove();
                        $("#imageGridAdd" + target + "").remove();
                    });
                } else { 
                    errorTipDis("please_select_at_least_one_config_item")
                }
            });
        },
        //imageGridTitle Save
        imageGridTitleSave: function() {
            //图片保存
            var self = this;
            var test = 1;
            var imageData = [];
            $("#imageGridTitle_table_body").find('tr').each(function(index, el) {
                $("#this_for_temp").empty();

                $("#this_for_temp").append(el);
                var tempId = $("#this_for_temp tr").attr("id");
                var first = $("#" + tempId + " :first").find( "input").attr( "id");
                // console.log( " first,", first);
                var second = $("#" + tempId + " :nth-child(2) input").val();
                if( !second) {
                    second = "";
                }
                var third = $("#" + tempId + " :nth-child(4) input").val();
                if( !third) {
                    third = 160;
                }
                var forth = $("#" + tempId + " :nth-child(5) input").val();
                if( !forth) {
                    forth = 160;
                }
                var fifth = $("#" + tempId + " :nth-child(6) input").val();
                if( !fifth) {
                    fifth = 0;
                }
                var sixth = $("#" + tempId + " :nth-child(7) input").val();
                if( !sixth) {
                    sixth = 0;
                }
                var seventh = $("#" + tempId + " :nth-child(8) input").val();
                if( !seventh) {
                    seventh = "";
                }
                var eighth = $("#" + tempId + " :nth-child(9) input").val();
                if( !eighth) {
                    eighth = "";
                }

                var image_variable_value = $("#" + tempId + " :nth-child(3) select").val();
                if( !image_variable_value) {
                    image_variable_value = "";
                }
                third = parseFloat(third);
                forth = parseFloat(forth);
                fifth = parseFloat( fifth);
                sixth = parseFloat( sixth);
                seventh = parseFloat( seventh);
                var tempObj = {
                    el: first,
                    name: second,
                    // width: third,
                    // height: forth,
                    wpercent: fifth,
                    hpercent: sixth,
                    deleteType: seventh,
                    rotation: eighth,
                    image_variable_value:image_variable_value,
                    dom:document.getElementById('canvas-image-' + first)
                };
                imageData.push(tempObj);
            });
            // console.log("imageData in imageGridTitleSave,", imageData);
            return imageData;
        },
        //customImageGridTitle
        customImageGridTitle: function() {
            //自定义组件
            var self = this;
            $("#customImageGrid_table_body_other").empty();
            $("#customImageGrid_table_body_9").empty();
            $("#customImageGrid_table_body_8").empty();
            if( self.drawable.type == 5) {
                $("#customImageGrid_table_body_other").hide();
                $("#customImageGrid_table_body_9").hide();
                $("#customImageGrid_table_body_8").hide();
            }
            if( !self.drawable && !self.drawable.animatorData) {
                $("#optionTable").find(".no_data").remove();
                $("#optionTable").append("<form class='form-group no_data' align='center'>"+ locale.get({lang:"no_variable"}) +"</form>");
            }
            var customImageGridTitle = self.drawable ? self.drawable.animatorData : [];
            //console.log("customImageGridTitle,",customImageGridTitle);
            if (customImageGridTitle && customImageGridTitle.length) {
                if (self.drawable.type == 8) {
                    //console.log("customImageGridTitle[i] before for ", customImageGridTitle[0]);
                    for (var i = 0; i < customImageGridTitle.length; i++) {
                        //console.log("customImageGridTitle[i] after for,", customImageGridTitle[i]);
                        var el = customImageGridTitle[i].el ? customImageGridTitle[i].el : "";
                        var width = customImageGridTitle[i].width ? customImageGridTitle[i].width : 0;
                        var height = customImageGridTitle[i].height ? customImageGridTitle[i].height : 0;
                        var animatorMin = customImageGridTitle[i].animatorMin ? customImageGridTitle[i].animatorMin : 0;
                        var animatorMinEqual = customImageGridTitle[i].animatorMinEqual ? customImageGridTitle[i].animatorMinEqual : 0;
                        var animatorMax = customImageGridTitle[i].animatorMax ? customImageGridTitle[i].animatorMax : 0;
                        var animatorMaxEqual = customImageGridTitle[i].animatorMaxEqual ? customImageGridTitle[i].animatorMaxEqual : 0;
                        //不显示
                        var type = self.drawable.type ? self.drawable.type : 8;
                        //console.log("height,",height);
                        $("#customImageGrid_table_body_8").append( "<tr id='customImage" + i + "'>" +
                            "<td align='center'>" +
                                "<input type='checkbox' id='checked" + i + "'/>" +
                            "</td>" +
                            "<td>" +
                            "<input type='text' id='customEl" + i + "' value='" + el + "' class='form-control input-sm'/>" +
                            "</td>" +
                            "<td style='display:none'>" +
                            "<input type='text' id='image_width" + i + "' value='" + width + "' class='validate[number] form-control input-sm'/>" +
                            "</td>" +
                            "<td style='display:none'>" +
                            "<input type='text' id='image_height" + i + "' value='" + height + "' class='validate[number] form-control input-sm'/>" +
                            "</td>" +
                            "<td>" +
                            "<input type='text' id='animatorMin" + i + "' value='" + animatorMin + "' class='validate[number] form-control input-sm'/>" +
                        "</td>" +
                            "<td>" +
                            "<input type='text' id='animatorMinEqual" + i + "' value='" + animatorMinEqual + "' class='validate[number] form-control input-sm'/>" +
                        "</td>" +
                            "<td>" +
                            "<input type='text' id='animatorMax" + i + "' value='" + animatorMax + "' class='validate[number] form-control input-sm'/>" +
                        "</td>" +
                            "<td>" +
                            "<input type='text' id='animatorMaxEqual" + i + "' value='" + animatorMaxEqual + "' class='validate[number] form-control input-sm'/>" +
                        "</td>" +
                            "<td style='display:none;'>" +
                            "<input id='type" + i + "' value='" + type + "' class='form-control input-sm'/>" +
                        "</td>" +
                            "</tr>");
                    }
                } else if (self.drawable.type == 9) {
                    for (var i = 0; i < customImageGridTitle.length; i++) {
                        var el = customImageGridTitle[i].el ? customImageGridTitle[i].el : "";
                        var width = self.drawable.width ? self.drawable.width : 100;
                        var height = self.drawable.height ? self.drawable.height : 100;
                        var duration = customImageGridTitle[i].duration ? customImageGridTitle[i].duration : 1;
                        //不显示
                        var type = self.drawable.type ? self.drawable.type : 9;
                        //console.log("test");
                        $("#customImageGrid_table_body_9").append( "<tr id='customImage" + i + "'>" +
                            "<td align='center'>" +
                                "<input type='checkbox' id='checked" + i + "'/>" +
                            "</td>" +
                            "<td>" +
                            "<input type='text' id='customEl" + i + "' value='" + el + "' class='form-control input-sm'/>" +
                            "</td>" +
                            "<td>" +
                            "<input type='text' id='image_width" + i + "' value='" + width + "' class='validate[number] form-control input-sm'/>" +
                            "</td>" +
                            "<td>" +
                            "<input type='text' id='image_height" + i + "' value='" + height + "' class='validate[number] form-control input-sm'/>" +
                            "</td>" +
                            "<td>" +
                            "<input type='text' id='duration" + i + "' value='" + duration + "' class='validate[number] form-control input-sm'/>" +
                            "</td>" +
                            "<td style='display:none;'>" +
                            "<input id='type" + i + "' value='" + type + "' class='form-control input-sm'/>" +
                        "</td>" +
                            "</tr>");
                    }
                } else {
                    for (var i = 0; i < customImageGridTitle.length; i++) {
                        var el = customImageGridTitle[i].el ? customImageGridTitle[i].el : "";
                        var width = customImageGridTitle[i].width ? customImageGridTitle[i].width : 0;
                        var height = customImageGridTitle[i].height ? customImageGridTitle[i].height : 0;
                        //不显示
                        var type = self.drawable.type ? self.drawable.type : 2;
                        $("#customImageGrid_table_body_other").append( "<tr id='customImage" + i + "'>" +
                            "<td align='center'>" +
                                "<input type='checkbox' id='checked" + i + "'/>" +
                            "</td>" +
                            "<td>" +
                            "<input type='text' id='customEl" + i + "' value='" + el + "' class='form-control input-sm'/>" +
                            "</td>" +
                            "<td>" +
                            "<input type='text' id='image_width" + i + "' value='" + width + "' class='validate[number] form-control input-sm'/>" +
                            "</td>" +
                            "<td>" +
                            "<input type='text' id='image_height" + i + "' value='" + height + "' class='validate[number] form-control input-sm'/>" +
                            "</td>" +
                            "<td style='display:none;'>" +
                            "<input id='type" + i + "' value='" + type + "' class='form-control input-sm'/>" +
                        "</td>" +
                            "</tr>");
                    }
                }
            }
            //上传
            //初始化
            //插件引入
            //var btnId = $(self).attr("id");
            ////console.log("btnId,", btnId);
            if (this.image_uploader) {
                this.image_uploader.destroy();
            }
            // file's name
            var image_name = null;
            // the url of files uploader
            // var uploader_url = '/api/file?filename=' + files[0].name + '&access_token=' + schneider.Ajax.getAccessToken() + '&timeout=' + (Date.parse(new Date()) / 1000 + 604800);
            var image_uploader = new plupload.Uploader({
                browse_button: 'upload_picture',
                autoUpload: true,
                filters: [{
                    title: 'Image files',
                    extensions: 'jpg,png'
                }],
                maxFileSize: '10240kb',
                multipart: false,
                multi_selection: false,
                file_data_name: 'filename',
                // resize: {
                //     width: 100,
                //     height: 100,
                //     crop: true,
                //    quality: 100
                // },
                runtimes: 'gears,flash,silverlight,browserplus,html5',
                url: '',
                flash_swf_url: 'plugins/plupload-2.1.9/js/Moxie.swf',
                silverlight_xap_url: 'plugins/plupload-2.1.9/js/Moxie.xap',
                init: {
                    FilesAdded: function(uploader, files) {
                        // console.log("BeforeUpload, up, file,", uploader, ",", files);
                        $("#overlay").show();
                        uploader.setOption('url', '/api/file?filename=' + files[0].name + '&access_token=' + schneider.Ajax.getAccessToken() /*+ '&timeout=' + (Date.parse(new Date()) / 1000 + 604800))*/ );
                        if (files[0]) {
                            img_name = files[0].name.substring(0, files[0].name.lastIndexOf("."));
                        }
                        image_uploader.start();
                    },
                    FileUploaded: function(uploader, file, response) {
                        var response = response.response;
                        var response = JSON.parse(response);
                        var file_name = file.name.split(".")[0];
                        // console.log( " this is file,", file);
                        // console.log( " this is uploader,", uploader);
                        // console.log( " this is response,", response);
                        if (response.result && response.result._id) {
                            var img_id = response.result._id;
                            if (img_id) {
                                file_id = img_id;
                                // console.log("test in uploader,", file_id );
                                if( self.drawable.type == 8) {
                                    var type_8 = "<tr id='" + img_id + "'>" +
                                                    "<td align='center'>" +
                                                        "<input type='checkbox' id='add" + img_id + "'>" +
                                                    "</td>" +
                                                    "<td>" +
                                                        "<input type='text' id='elAdd" + img_id + "' value='" + file_name + "' class='form-control input-sm'/>" +
                                                    "</td>" +
                                                    "<td style='display:none'>" +
                                                        "<input type='text' id='imageAdd_width" + img_id + "'  class='validate[number] form-control input-sm'/>" +
                                                    "</td>" +
                                                    "<td style='display:none'>" +
                                                        "<input type='text' id='imageAdd_height" + img_id + "'  class='validate[number] form-control input-sm'/>" +
                                                    "</td>" +
                                                    "<td>" +
                                                        "<input type='text' id='animatorMinAdd" + img_id + "' value='0' class='validate[number] form-control input-sm'/>" +
                                                    "</td>" +
                                                        "<td>" +
                                                        "<input type='text' id='animatorMinEqualAdd" + img_id + "' value='0' class='validate[number] form-control input-sm'/>" +
                                                    "</td>" +
                                                        "<td>" +
                                                        "<input type='text' id='animatorMaxAdd" + img_id + "' value='0' class='validate[number] form-control input-sm'/>" +
                                                    "</td>" +
                                                    "<td>" +
                                                        "<input type='text' id='animatorMaxEqualAdd" + img_id + "' value='0' class='validate[number] form-control input-sm'/>" +
                                                    "</td>" +
                                                    "<td style='display:none;'>" +
                                                        "<input id='type" + img_id + "' value='8' class='form-control input-sm'/>" +
                                                    "</td>" +
                                                "</tr>";
                                    $("#customImageGrid_table_body_8").append( type_8);
                                    temp_cus_data = type_8;
                                } else if( self.drawable.type == 9) {
                                    var type_9 = "<tr id='" + img_id + "'>" +
                                                    "<td align='center'>" +
                                                        "<input type='checkbox' id='add" + img_id + "' />" +
                                                    "</td>" +
                                                    "<td>" +
                                                        "<input type='text' id='elAdd" + img_id + "' value='" + file_name + "' class='form-control input-sm'/>" +
                                                    "</td>" +
                                                    "<td style='display:none'>" +
                                                        "<input type='text' id='image_width" + img_id + "'  class='validate[number] form-control input-sm' />" +
                                                    "</td>" +
                                                    "<td style='display:none'>" +
                                                        "<input type='text' id='image_height" + img_id + "'  class='validate[number] form-control input-sm' style='display:none'/>" +
                                                    "</td>" +
                                                    "<td>" +
                                                        "<input type='text' id='duration" + img_id + "' value='1' class='validate[number] form-control input-sm'/>" +
                                                    "</td>" +
                                                    "<td style='display:none;'>" +
                                                        "<input id='type" + img_id + "' value='9' class='form-control input-sm'/>" +
                                                    "</td>" +
                                                "</tr>";
                                    $("#customImageGrid_table_body_9").append( type_9);
                                    temp_cus_data = type_9;
                                } else {
                                    var type_other = "<tr id='" + img_id + "'>" +
                                                        "<td align='center'>" +
                                                            "<input type='checkbox' id='add" + img_id + "'>" +
                                                        "</td>" +
                                                        "<td>" +
                                                            "<input type='text' id='customAddEl" + img_id + "' value='" + file_name + "' class='form-control input-sm'/>" +
                                                        "</td>" +
                                                        "<td style='display:none'>" +
                                                            "<input type='text' id='imageAdd_width" + img_id + "'  value='100' readonly='readonly' class='validate[number] form-control input-sm'/>" +
                                                        "</td>" +
                                                        "<td style='display:none'>" +
                                                            "<input type='text' id='imageAdd_height" + img_id + "'  value='100' readonly='readonly' class='validate[number] form-control input-sm'/>" +
                                                        "</td>" +
                                                        "<td style='display:none;'>" +
                                                            "<input id='typeAdd" + i + "' value='2' class='form-control input-sm'/>" +
                                                        "</td>" +
                                                    "</tr>";
                                    $("#customImageGrid_table_body_other").append( type_other);
                                    temp_cus_data = type_other;
                                }
                            }
                        }
                        $("#overlay").hide();
                        $("#customImageGrid_table_body_other input[type='checkbox']").on( "click", function() {
                            var selected_curr = $("#customImageGrid_table_body_other tr td input[type='checkbox']:checked");
                            var all_tr = $("#customImageGrid_table_body_other tr");
                            // console.log( "test, selected_curr,", selected_curr, ", all_tr,", all_tr);
                            if( selected_curr.length < all_tr.length) {
                                $("#custom-all").prop( "checked", false);
                            }
                            if( selected_curr.length == all_tr.length) {
                                $("#custom-all").prop( "checked", true);
                            }
                        });
                        $("#customImageGrid_table_body_9 input[type='checkbox']").on( "click", function() {
                            var selected_curr = $("#customImageGrid_table_body_9 tr td input[type='checkbox']:checked");
                            var all_tr = $("#customImageGrid_table_body_9 tr");
                            // console.log( "test, selected_curr,", selected_curr, ", all_tr,", all_tr);
                            if( selected_curr.length < all_tr.length) {
                                $("#custom-all").prop( "checked", false);
                            }
                            if( selected_curr.length == all_tr.length) {
                                $("#custom-all").prop( "checked", true);
                            }
                        });
                        $("#customImageGrid_table_body_8 input[type='checkbox']").on( "click", function() {
                            var selected_curr = $("#customImageGrid_table_body_8 tr td input[type='checkbox']:checked");
                            var all_tr = $("#customImageGrid_table_body_8 tr");
                            // console.log( "test, selected_curr,", selected_curr, ", all_tr,", all_tr);
                            if( selected_curr.length < all_tr.length) {
                                $("#custom-all").prop( "checked", false);
                            }
                            if( selected_curr.length == all_tr.length) {
                                $("#custom-all").prop( "checked", true);
                            }
                        });
                    },
                    Error: function(up, err) {
                        var err_code = err.code + "";
                        if (code === "-600") {
                            var maxSize = up.settings.max_file_size / 1024;
                            if (maxSize >= 1) {
                                var _maxSize = maxSize / 1024;
                                if (_maxSize >= 1) {
                                    err.text = locale.get(code) + parseInt(_maxSize) + "MB";
                                } else {
                                    err.text = locale.locale.get(code) + parseInt(maxSize) + "KB";
                                }
                            } else {
                                err.text = locale.get(code) + maxSize + "KB";
                            }
                        } else {
                            err.text = locale.get(code);
                        }
                        dialog.render({text: err.text });
                    }
                }
            });
            image_uploader.init();
            //删除
            $("#delete_upload_picture").unbind("click").click(function(event) {
                if( self.drawable.type == "8") {
                     var ids = $("#customImageGrid_table_body_8 input:checked");
                } else if( self.drawable.type == "9") {
                    var ids = $("#customImageGrid_table_body_9 input:checked");
                } else {
                    var ids = $("#customImageGrid_table_body_other input:checked");
                }
                if( ids.length > 0) {
                    dialog.render( {
                        lang: "affirm_delete",
                        buttons: [{
                            lang: "yes",
                            click: function() {
                                // console.log( "ids,", ids);
                                ids.each( function() {
                                    var del_id = $(this).attr( "id");
                                    var target_id = del_id.slice( 3);
                                    // console.log( "target_id", target_id);
                                    $("#" + target_id + "").remove();
                                });
                                $("#custom-all").prop( "checked", false);
                                dialog.close();
                            }
                        },{
                            lang: "no",
                            click:function() {
                                dialog.close();
                            }
                            }],
                        close: function() {
                            dialog.close();
                        }
                    });
                } else {
                    errorTipDis( "please_select_at_least_one_config_item");
                }
            });
            $("#custom-all").on( "click", function( e) {
                var selected = $("#customImageGrid_table_body_other tr td input[type='checkbox']:checked");
                var all_tr = $("#customImageGrid_table_body_other tr");
                if( all_tr.length > 0) {
                    if( selected.length < all_tr.length) {
                        $("#customImageGrid_table_body_other tr td input").prop( "checked", true);
                        $("#custom-all").prop( "checked", true);
                    } else {
                        $("#customImageGrid_table_body_other tr td input").prop( "checked", false);
                        $("#custom-all").prop( "checked", false);
                    }
                }
            });
        },
        //customImageGridTitle Save
        customImageGridTitleSave: function() {
            //自定义图片保存
            var self = this;
            var customData = [];
            var type = self.drawable.type;
            if (type == 8) {
                $("#customImageGrid_table_body_8").find('tr').each(function(index, el) {
                    $("#this_for_temp").empty();
                    $("#this_for_temp").append(el);
                    var target_id = $(this).attr("id");
                    var tempId = $("#this_for_temp tr").attr("id");
                    var first = $("#" + tempId + " :nth-child(2) input").val();
                    if( !first) {
                        first = "";
                    }
                    var second = $("#" + tempId + " :nth-child(3) input").val();
                    if( !second) {
                        second = 0;
                    }
                    var third = $("#" + tempId + " :nth-child(4) input").val();
                    if( !third) {
                        third = 0;
                    }
                    var forth = $("#" + tempId + " :nth-child(5) input").val();
                    if( !forth) {
                        forth = 0;
                    }
                    var fifth = $("#" + tempId + " :nth-child(6) input").val();
                    if( !fifth) {
                        fifth = 0;
                    }
                    var sixth = $("#" + tempId + " :nth-child(7) input").val();
                    if( !sixth) {
                        sixth = 0;
                    }
                    var seventh = $("#" + tempId + " :nth-child(8) input").val();
                    if( !seventh) {
                        seventh = 0;
                    }
                    var eighth = $("#" + tempId + " :nth-child(9) input").val();
                    second = parseFloat( second);
                    third = parseFloat( third);
                    forth = parseFloat( forth);
                    fifth = parseFloat( fifth);
                    sixth = parseFloat( sixth);
                    seventh = parseFloat( seventh);
                    eighth = parseFloat( eighth);
                    var tempObj = {
                        _id: target_id,
                        el: first,
                        // width: second,
                        // height: third,
                        animatorMin: forth,
                        animatorMinEqual: fifth,
                        animatorMax: sixth,
                        animatorMaxEqual: seventh,
                        type: eighth,
                        dom: document.getElementById('canvas-image-' + target_id)
                    };
                    customData.push(tempObj);
                });
            } else if (type == 9) {
                $("#customImageGrid_table_body_9").find('tr').each(function(index, el) {
                    $("#this_for_temp").empty();
                    $("#this_for_temp").append(el);
                    var tempId = $("#this_for_temp tr").attr("id");
                    var target_id = $(this).attr("id");
                    var first = $("#" + tempId + " :nth-child(2) input").val();
                    if( !first) {
                        first = "";
                    }
                    var second = $("#" + tempId + " :nth-child(3) input").val();
                    if( !second) {
                        second = 0;
                    }
                    var third = $("#" + tempId + " :nth-child(4) input").val();
                    if( !third) {
                        third = 0;
                    }
                    var forth = $("#" + tempId + " :nth-child(5) input").val();
                    if( !forth) {
                        forth = 1;
                    }
                    var fifth = $("#" + tempId + " :nth-child(6) input").val();
                    second = parseFloat( second);
                    third = parseFloat(third);
                    // duration = parseFloat(duration);
                    fifth = parseFloat( fifth);
                    var tempObj = {
                        _id: target_id,
                        el: first,
                        // width: self.drawable.width,
                        // height: self.drawable.height,
                        duration: forth,
                        type: fifth,
                        dom: document.getElementById( 'canvas-image-' + target_id)
                    };
                    customData.push(tempObj);
                });
            } else {
                $("#customImageGrid_table_body_other").find('tr').each(function(index, el) {
                    $("#this_for_temp").empty();
                    $("#this_for_temp").append(el);
                    var tempId = $("#this_for_temp tr").attr("id");
                    var target_id = $(this).attr("id");
                    var first = $("#" + tempId + " :nth-child(2) input").val();
                    if( !first) {
                        first = "";
                    }
                    var second = $("#" + tempId + " :nth-child(3) input").val();
                    if( !second) {
                        second = 0;
                    }
                    var third = $("#" + tempId + " :nth-child(4) input").val();
                    if( !third) {
                        third = 0;
                    }
                    var forth = $("#" + tempId + " :nth-child(5) input").val();
                    second = parseFloat(second);
                    third = parseFloat( third);
                    var tempObj = {
                        _id: target_id,
                        el: first,
                        // width: second,
                        // height: third,
                        type: 10,
                        dom: document.getElementById("canvas-image-"+first)
                    };
                    customData.push(tempObj);
                });
            }
            console.log( ",customData ", customData);
            return customData;
        },
        //endPointGridTitle
        endPointGridTitle: function() {
            //端点
            var self = this;
            if( !self.drawable && !self.drawable.endPoints) {
                $("#optionTable").find(".no_data").remove();
                $("#optionTable").append("<form class='form-group no_data' align='center'>"+ locale.get({lang:"no_variable"}) +"</form>");
            }
            var endPointGridTitle = self.drawable ? self.drawable.endPoints : [];
            if (endPointGridTitle && endPointGridTitle.length) {
                for (var i = 0; i < endPointGridTitle.length; i++) {
                    $("#x_end_point").val(endPointGridTitle[i].x ? endPointGridTitle[i].x : "0");
                    $("#x_end_point").bind("change", function(e) {
                        //$(this).val().test(/^[0-9]*[1-9][0-9]*$/);
                        endPointGridTitle[i].x = $(this).val();
                    });
                    $("#y_end_point").val(endPointGridTitle[i].y ? endPointGridTitle[i].y : "0");
                    $("#y_end_point").bind("change", function(e) {
                        //$(this).val().test(/^[0-9]*[1-9][0-9]*$/);
                        endPointGridTitle[i].y = $(this).val();
                    });
                    $("#font_size_end_point").val(endPointGridTitle[i].rs ? endPointGridTitle[i].rs : "12px").attr("disabled", "disabled");
                    $("#border_color_end_point").val(endPointGridTitle[i].cl ? endPointGridTitle[i].cl : "white").attr("disabled", "disabled");
                    $("#fill_color_end_point").val(endPointGridTitle[i].fs ? endPointGridTitle[i].fs : "white").attr("disabled", "disabled");
                }
            }
        },
        //endPointGridTitle save
        endPointGridTitleSave: function() {
            //端点保存
            var self = this;
            var x = $("#x_end_point").val();
            if( !x) {
                x = 0;
            }
            var y = $("#y_end_point").val();
            if( !y) {
                y = 0;
            }
            var rs = $("#font_size_end_point").val();
            var cl = $("#border_color_end_point").val();
            var fs = $("#fill_color_end_point").val();
            var endPointData = [];
            x = parseFloat( x);
            y = parseFloat( y);
            var endPointDataTemp = {
                x: x,
                y: y,
                rs: rs,
                cl: cl,
                fs: fs
            };
            endPointData.push( endPointDataTemp);
            return endPointData;
        },
        //scaleTitle
        scaleTitle: function() {
            //刻度
            var self = this;
            $("#min_value").val(self.drawable.minValue ? self.drawable.minValue : 0);
            $("#min_value").bind('change', function(event) {
                self.drawable.minValue = $(this).val();
            });
            $("#max_value").val(self.drawable.maxValue ? self.drawable.maxValue : 100);
            $("#max_value").bind("change", function() {
                self.drawable.maxValue = $(this).val();
            });
            $("#aliquots").val(self.drawable.aliquots ? self.drawable.aliquots : 5);
            $("#aliquots").bind("change", function() {
                self.drawable.aliquots = $(this).val();
            });
            var display_scale = null;
            if( self.drawable.displayScale) {
                display_scale = self.drawable.displayScale;
            } else {
                display_scale = 100;
            }
            $("#display_scale option").each(function(index, el) {
                    if( $(this).val() == display_scale) {
                        $(this).prop('selected', 'selected');
                    }
                });
            $("#display_scale").bind("change", function() {
                self.drawable.displayScale = $(this).val();
            });
        },
        //scaleTitle save
        scaleTitleSave: function() {
            //刻度保存
            var self = this;
            var min_value = $("#min_value").val();
            if( !min_value) {
                min_value = 0;
            }
            var max_value = $("#max_value").val();
            if( !max_value) {
                max_value = 100;
            }
            var aliquots = $("#aliquots").val();
            if( !aliquots) {
                aliquots = 5;
            }
            var display_scale = $("#display_scale option").val();
            if( !display_scale) {
                display_scale = 100;
            }
            min_value = parseFloat( min_value);
            max_value = parseFloat(max_value);
            aliquots = parseFloat(aliquots);
            display_scale = parseFloat(display_scale);
            var scaleData = {
                min_value: min_value,
                max_value: max_value,
                aliquots: aliquots,
                display_scale: display_scale
            };
            //console.log("scaleTitle scaleData,", scaleData);
            return scaleData;
        },
        // Link Show
        linkShow: function() {
            var self = this;
            var current_site_id = self.siteId;
            $(".link-box").hide();
            // $("#link_content button").removeClass('btn-primary');
            $("#link-title input").prop( "checked", false);
            if( self.drawable && self.drawable.link) {
                // console.log("this.siteId,", this.siteId, "self.siteId,", self.siteId);
                $("#link_content input").val("");
                $("#link_content textarea").val("");
                $("#state_box input").prop( "checked", false);
                var links = self.drawable.link;
                // console.log( "links,", links);
                if( links.state && links.state == 1) {
                    $("#yes_link").prop( "checked", true);
                    // console.log(" links information,", links);
                    // outter link
                    if( links.type == "outter") {
                        // $("#outter_link").addClass('btn-primary');
                        $("#outter_link").prop( "checked", true);
                        $("#outter_box").show();
                        var linkInfo = links.linkInfo;
                        $("#outter_name").val( linkInfo.name);
                        $("#outter_link_link").val( linkInfo.link);
                        $("#outter_des").val( linkInfo.des);
                    } else {
                        // inner
                        // $("#inner_link").addClass('btn-primary');
                        $("#inner_link").prop( "checked", true);
                        $("#inner_name").val( links.linkInfo.name);
                        $("#inner_des").val( links.linkInfo.des);
                        $("#inner_box").show();
                    }
                } else {
                    $("#no_link").prop( "checked", true);
                    // $("#default_link").addClass('btn-primary');
                    $("#default_box").show();
                }
            } else {
                $("#link_content input").val("");
                $("#link_content textarea").val("");
                $("#no_link").prop( "checked", true);
            }
            // get scada
            getCanvasBySiteId( current_site_id, null, function( data){
                if( data.result) {
                    //
                    // console.log( "Current data.result.content, ", data.result.content);
                    $("#current_scada_link").empty();
                    var scada_data = data.result.content;
                    for( var i = 0; i < scada_data.length; i++) {
                        if( self.drawable.link && self.drawable.link.type == "inner") {
                            if( scada_data[i].canvasId == self.drawable.link.linkInfo.link) {
                                $( "#current_scada_link").append("<option value=" + scada_data[i].canvasId + ">" + scada_data[i].canvasText + "</option>");
                                $( "#current_scada_link").find( "option[value=" + scada_data[i].canvasId + "]").attr( "selected", true);
                            } else {
                                $( "#current_scada_link").append("<option value=" + scada_data[i].canvasId + ">" + scada_data[i].canvasText + "</option>");
                            }
                        } else {
                            $( "#current_scada_link").append( "<option value=" + scada_data[i].canvasId + ">" + scada_data[i].canvasText + "</option>");
                            $( "#current_scada_link").eq(0).attr( "selected", true);
                        }
                    }
                    // $("#current_scada_link option").eq(0).attr( "selected", true);
                } else {
                    //
                }
            }, this);
            /*$("##current_scada_link").bind( "change", function() {

            });*/
            $(".link-title input").on( "click", function(e) {
                //console.log();
                $(".link-title input").prop( "checked", false);
                $(this).prop( "checked", true);
                $(".link-box").hide();
                if( $(this).attr( "id") == "no_link") {
                    $("#default_box").show();
                } else if( $(this).attr( "id") == "outter_link") {
                    $("#outter_box").show();
                } else if( $(this).attr( "id") == "inner_link") {
                    $("#inner_box").show();
                }
            });
            /*$(".link-button").unbind("click").click(function(event) {
                var current_button = $(this).attr("id");
                $(".link-title button").removeClass('btn-primary').removeAttr('current');
                $(this).addClass('btn-primary').attr( "current", "current");
                $(".link-box").hide();
                if( current_button == "outter_link") {
                    // $(".link-box").hide();
                    $("#outter_box").show();
                } else if( current_button == "inner_link") {
                    // $(".link-box").hide();
                    $("#inner_box").show();
                } else if( current_button == "default_link") {
                    $("#default_box").show();
                }
            });
            $("#state_box .link_state").unbind( "click").click( function() {
                $("#state_box .link_state").prop('checked', false);
                $(this).prop( "checked", true);
            });*/
        },
        // Link Save
        linkSave: function() {
            var self = this;
            var linkData = {};
            // judge current link type : our or inner
            if( /*$("#outter_link").attr('current') == "current"*/ $("#outter_link").prop( "checked") == true) {
                var save_type = "outter_link";
                var outter_name = $("#outter_name").val();
                var outter_link_val = $("#outter_link_link").val();
                var outter_des = $("#outter_des").val();
                var outter = {
                    name: outter_name,
                    link: outter_link_val,
                    des: outter_des
                };
                linkData = {
                    linkInfo: outter,
                    type: "outter"
                };
            } else {
                var save_type = "inner_link";
                var inner_name = $("#inner_name").val();
                var current_scada_link = $("#current_scada_link").val();
                var inner_des = $("#inner_des").val();
                var inner = {
                    name: inner_name,
                    link: current_scada_link,
                    des: inner_des
                };
                linkData = {
                    linkInfo: inner,
                    type: "inner"
                };
            }
            if( $("#no_link").prop( "checked") == true ) {
                linkData = {};
                linkData.state = 0;
            } else {
                linkData.state = 1;
            }
            // console.log( " linkData,", linkData);
            return linkData;
        },
        //change show event
        changePanel: function() {
            var self = this;
            $(".content-header-var li a").unbind("click").click(function(event) {
                $(".content-header-var li a").removeClass('navsActive');
                $("#optionTable").find(".no_data").remove();
                $("#optionTable .content-moulde").hide();
                var this_btn = $(this).attr("id");
                $(this).addClass('navsActive');
                if (this_btn == "expressionHeader") {
                    // console.log("test, self.expression,", self.expression());
                    self.expression();
                    $("#expression_content").show();
                }
                if (this_btn == "variableSetHeader") {
                    $("#variableSet_content").show();
                }
                /*if (this_btn == "basicTabTitleHeader") {
                    $("#properties_content").show();
                }
                if (this_btn == "titleGridTitleHeader") {
                    self.titleGridTitle();
                    $("#titleGridTitle_content").show();
                }
                if (this_btn == "imageGridTitleHeader") {
                    self.imageGridTitle();
                    $("#imageGridTitle_content").show();
                }*/
                if (this_btn == "customImageGridTitleHeader") {
                    self.customImageGridTitle();
                    $("#customImageGridTitle_content").show();
                    if (self.drawable.type == 8) {
                        $("#this_type_8").show();
                        if( temp_cus_data ) {
                            $("#customImageGrid_table_body_8").append( temp_cus_data);;
                        }
                    } else if( self.drawable.type == 9) {
                        $("#this_type_9").show();
                        if( temp_cus_data ) {
                            $("#customImageGrid_table_body_9").append( temp_cus_data);;
                        }
                    } else {
                        $("#this_type_other").show();
                        if( temp_cus_data ) {
                            $("#customImageGrid_table_body_other").append( temp_cus_data);;
                        }
                    }
                }
                if (this_btn == "scaleTitleHeader") {
                    $("#scaleTitle_content").show();
                }
                if (this_btn == "endPointGridHeader") {
                    self.endPointGridTitle();
                    $("#endPointGrid_content").show();
                }
                /*if (this_btn == "basicTabTitlePipeFormHeader") {
                    $("#basicTabTitle_pipeForm_content").show();
                }*/
                if( this_btn == "linkHeader") {
                    $("#link_content").show();
                }
                if( this_btn == "propertiesHeader") {
                    $("#optionTable .content-moulde-property").hide();
                    $("#properties_content").show();
                    // console.log( "test, type,", self.drawable.type);
                    if( self.drawable.machine) {
                        $("#basicTabTitle_content").show();
                        $("#titleGridTitle_content").show();
                        $("#imageGridTitle_content").show();
                    } else {
                        if( self.drawable.type == 1 || self.drawable.type == 3) {
                            $("#basicTabTitle_content").show();
                            $("#titleGridTitle_content").show();
                            self.titleGridTitle();
                            $("#imageGridTitle_content").show();
                        } else if( self.drawable.type == 6) {
                            $("#basicTabTitle_content").show();
                            $("#titleGridTitle_content").show();
                            $("#imageGridTitle_content").show();
                        } else if( self.drawable.type == 7) {
                            $("#basicTabTitle_pipeForm_content").show();
                        } else if( self.drawable.type == 10){
                            $("#basicTabTitle_content").show();
                            $("#titleGridTitle_content").show();
                        }
                        else {
                            $("#basicTabTitle_content").show();
                            $("#titleGridTitle_content").show();
                            $("#imageGridTitle_content").show();
                        }
                    }
                }
            });
        },
        //保存
        onAffirm: function() {
            var self = this;
            self.currentDrawable = this.drawable;
            self.infoBoard = this.infoBoard;
            self.siteId = this.siteId;
            //console.log("test in onAffirm, infoBoard,", self.infoBoard);
            $("#var_submit_sel").unbind("click").click(function(event) {
                //console.log("event in onAffirm,", event);
                $("#editVarBox").hide();
                $(".modal-backdrop").remove();
                //保存监听
                //数据返回
                //数据保存
                var expressionData = null;
                var variableData = null;
                var basicTabData = null;
                var pipeData = null;
                var titleData = null;
                var imageData = null;
                var customData = null;
                var endPointData = null;
                var scaleData = null;
                var linkData = null;

                //保存类型判断
                if (self.currentDrawable.type == 8) {
                    expressionData = self.expressionSave();
                    customData = self.customImageGridTitleSave();
                    //console.log(" customData in onAffirm of type == 8", customData);
                    //对自定义画面中的值进行校验
                    animatorData = [];
                    defaultCount = 0;
                    noMaxCount = 0;
                    noMinCount = 0;
                    //console.log("  customData.............. ",customData)
                    for (var i = 0; i < customData.length; i++) {
                        //customData.dom = document.getElementById("canvas-image-" + customData[i].el);
                        if (!customData.animatorMax && !customData.animatorMin) {
                            defaultCount++;
                        } else if (!customData.animatorMax && !!customData.animatorMin) {
                            noMaxCount++;
                        } else if (!!customData.animatorMax && !customData.animatorMin) {
                            noMinCount++;
                        }
                    }
                    self.currentDrawable.images = [];
                    //表达式
                    self.currentDrawable.address = null;
                    self.currentDrawable.address = expressionData;
                    //animatorData
                    self.currentDrawable.animatorData = customData;
                    /*if( customData.length != 0) {
                        if( customData[0].height != 0 || customData[0].height != "" || customData[0].height != undefined) {
                            self.currentDrawable.height = customData[0].height;
                            self.currentDrawable.h = customData[0].height;
                        }
                        if( customData[0].width != 0 || customData[0].width != "" || customData[0].width != undefined) {
                            self.currentDrawable.width = customData[0].width;
                            self.currentDrawable.w = customData[0].width;
                        }
                    }*/
                    var var_id = expressionData;
                    var site_id = self.siteId;
                } else if (self.currentDrawable.type == 9 || self.drawable.type == 2) {
                    customData = self.customImageGridTitleSave();
                    /*for (var i = 0; i < customData.length; i++) {
                        customData.dom = document.getElementById("canvas-image-" + customData[i].el);
                    }*/
                    // console.log(" customData on onAffirm,", customData);
                    //console.log( "customData dom, type = 9,", customData);
                    //console.log("currentDrawable in type == 2,", self.currentDrawable);
                    self.currentDrawable.animatorData = customData;
                    self.currentDrawable.images = [];
                    //console.log("self.currentDrawable.animatorDat, there type == 2,", self.currentDrawable.animatorData);
                    if( self.drawable.type == 2) {
                        self.currentDrawable.type == 10;
                    }
                    /*if( customData.length != 0) {
                        if( customData[0].height != 0 || customData[0].height != "" || customData[0].height != undefined) {
                            self.currentDrawable.height = customData[0].height;
                            self.currentDrawable.h = customData[0].height;
                        }
                        if( customData[0].width != 0 || customData[0].width != "" || customData[0].width != undefined) {
                            self.currentDrawable.width = customData[0].width;
                            self.currentDrawable.w = customData[0].width;
                        }
                    }*/
                    //console.log("after, undefined, currentDrawable,", self.currentDrawable);
                } else if (self.currentDrawable.type == 5) {
                    imageData = self.imageGridTitleSave();
                    titleData = self.titleGridTitleSave();
                    expressionData = self.expressionSave();
                    customData = self.customImageGridTitleSave();
                    scaleData = self.scaleTitleSave();
                    //console.log("type= 5, imageData,",imageData);
                   /* for (var i = 0; i < imageData.length; i++) {
                        imageData.dom = document.getElementById("canvas-image-" + imageData[i].el);
                    }*/
                    // console.log( "customData dom, type = 5,", customData);
                    self.currentDrawable.images = imageData;
                    // self.currentDrawable.titles = titleData;
                    self.currentDrawable.address = null;
                    self.currentDrawable.address = expressionData;
                    self.currentDrawable.custom = customData;
                    self.currentDrawable.minValue = scaleData.min_value;
                    self.currentDrawable.maxValue = scaleData.max_value;
                    self.currentDrawable.aliquots = scaleData.aliquots;
                    self.currentDrawable.displayScale = scaleData.display_scale;
                    /*if( imageData.length != 0) {
                        if( imageData[0].height != 0 || imageData[0].height != "" || imageData[0].height != undefined) {
                            self.currentDrawable.height = imageData[0].height;
                            self.currentDrawable.h = imageData[0].height;
                        }
                        if( imageData[0].width != 0 || imageData[0].width != "" || imageData[0].width != undefined) {
                            self.currentDrawable.width = imageData[0].width;
                            self.currentDrawable.w = imageData[0].width;
                        }
                    }
                    console.log( "imageData on type = 5,", imageData);
                    if( customData.length != 0) {
                        if( customData[0].height != 0 || customData[0].height != "" || customData[0].height != undefined) {
                            self.currentDrawable.height = customData[0].height;
                            self.currentDrawable.h = customData[0].height;
                        }
                        if( customData[0].width != 0 || customData[0].width != "" || customData[0].width != undefined) {
                            self.currentDrawable.width = customData[0].width;
                            self.currentDrawable.w = customData[0].width;
                        }
                    }*/
                    var var_id = expressionData;
                    var site_id = self.siteId;
                } else if ( self.currentDrawable.type == 7){
                    expressionData = self.expressionSave();
                    variableData = self.variableSetSave();
                    pipeData = self.pipeFormSave();
                    self.currentDrawable.address = null;
                    self.currentDrawable.address = expressionData;
                    self.currentDrawable.flowTo = variableData.flowTo;
                    self.currentDrawable.pipeColor = variableData.pipeColor;
                    self.currentDrawable.flowColor = variableData.flowColor;
                    self.currentDrawable.variableValueflow = variableData.variableValueflow;
                    self.currentDrawable.variableValuestop = variableData.variableValuestop;
                    self.currentDrawable.flowValue = variableData.flowValue;
                    self.currentDrawable.stopValue = variableData.stopValue;
                    self.currentDrawable.x = pipeData.x;
                    self.currentDrawable.y = pipeData.y;
                    self.currentDrawable.pipeW = pipeData.pipeW;
                    self.currentDrawable.pipeH = pipeData.pipeH;
                    var var_id = expressionData;
                    var site_id = self.siteId;
                } else {
                    imageData = self.imageGridTitleSave();
                    titleData = self.titleGridTitleSave();
                    endPointData = self.endPointGridTitleSave();
                    expressionData = self.expressionSave();
                    customData = self.customImageGridTitleSave();
                    // for (var i = 0; i < imageData.length; i++) {
                    //     imageData.dom = document.getElementById("canvas-image-" + imageData[i].el);
                    // }
                    //console.log( "customData dom, type = other,", customData);
                    basicTabData = self.basicTabTitleSave();
                    self.currentDrawable.x = basicTabData.x;
                    self.currentDrawable.y = basicTabData.y;
                    self.currentDrawable.width = basicTabData.width;
                    self.currentDrawable.height = basicTabData.height;
                    self.currentDrawable.displayScale = basicTabData.displayScale;
                    self.currentDrawable.images = imageData;
                    self.currentDrawable.titles = titleData;
                    self.currentDrawable.endPoints = endPointData;
                    self.currentDrawable.address = null;
                    self.currentDrawable.address = expressionData;
                    self.currentDrawable.custom = customData;
                    // console.log( "imageData on onAffirm,other,", imageData);
                    /*if( customData.length != 0) {
                        if( customData[0].height != 0 || customData[0].height != "" || customData[0].height != undefined) {
                            self.currentDrawable.height = customData[0].height;
                            self.currentDrawable.h = customData[0].height;
                        }
                        if( customData[0].width != 0 || customData[0].width != "" || customData[0].width != undefined) {
                            self.currentDrawable.width = customData[0].width;
                            self.currentDrawable.w = customData[0].width;
                        }
                    }
                    if( imageData.length != 0) {
                        if( imageData[0].height != 0 || imageData[0].height != "" || imageData[0].height != undefined) {
                            self.currentDrawable.height = imageData[0].height;
                            self.currentDrawable.h = imageData[0].height;
                        }
                        if( imageData[0].width != 0 || imageData[0].width != "" || imageData[0].width != undefined) {
                            self.currentDrawable.width = imageData[0].width;
                            self.currentDrawable.w = imageData[0].width;
                        }
                    }*/
                    var var_id = expressionData;
                    var site_id = self.siteId;
                }
                linkData = self.linkSave();
                self.currentDrawable.link = linkData;
                //面板加载
                self.infoBoard.sortDrawables();
                self.infoBoard.redrawCanvas();

                //console.log("  self.infoBoard ",self.infoBoard)
                ///self.infoBoard.resizeDrawableCanvas();
                var custom = self.currentDrawable.custom;
                //自定义组件
                var animator = self.currentDrawable.animatorData;
                self.animatorData = self.currentDrawable.animatorData;
                $("#animator_image_div").remove();
                var imageDiv = document.createElement("div");
                imageDiv.id = "animator_image_div";
                imageDiv.style.display = "none";
                //custom 判断
                if (custom && custom.length > 0) {
                    for (var i = 0; i < custom.length; i++) {
                        var param = {
                            limit: 0,
                            verbose: 100
                        };
                        addScadaComponents(param, custom[i], function(data) {
                            //console.log("addScadaComponents in custom data,", data);
                            var src = "" + "/api/file/" + data.result.content._id + "?access_token=" + schneider.Ajax.getAccessToken();
                            var img = '<img id="canvas-image-' + data.result.content._id + '" src="' + src + '" style="width:' + data.result.content.width + ';height:' + data.result.content.height + '">'
                            $("#nts-module-common-canvas-global-resources").append(img);
                        }, this);
                    }
                }
                //animator 判断
                // console.log("animator, animator, animator,", animator);
                if (animator && animator.length > 0) {
                    for (var i = 0; i < animator.length; i++) {
                        //console.log(animator[i], "animator[i]");
                        var param = {
                            limit: 0,
                            verbose: 100
                        };
                        addScadaComponents(param, animator[i], function(data) {
                            //console.log("addScadaComponents in animator data,", data);
                            var src = "" + "/api/file/" + data.result.content._id + "?access_token=" + schneider.Ajax.getAccessToken();
                            var img = '<img id="canvas-image-' + data.result.content._id + '" src="' + src + '" style="width:' + data.result.content.width + '; height:' + data.result.content.height + ';"/>';
                            $("#nts-module-common-canvas-global-resources").append(img);
                        }, this);
                        self.currentDrawable.drawAnimator();
                        document.body.appendChild(imageDiv);
                        /*var animatorObj = new Object();
                        animatorObj.type = "n";
                        animatorObj.data = animator;*/
                    }
                }
                if (self.currentDrawable.type == "2") {
                    self.infoBoard.deleteSelections();
                    var toolObject = {
                        selector: "#agentcanvas-info",
                        agentCanvasDraw: this,
                        global: 0
                    };
                    AgentCanvasTool.initialize( toolObject);
                }
                 console.log( "this is last self.currentDrawable,", self.currentDrawable);
                /*var toolConfigItems = Configure.drawablePrototypes.items; //数组
                //console.log("toolConfigItems after add", toolConfigItems);
                var itemsObject = {};
                for (var i = 0; i < toolConfigItems.length; i++) {
                    var configItem = toolConfigItems[i];
                    itemsObject[configItem._id] = configItem.items;
                }*/
                //console.log("itemsObject",itemsObject);
                // AgentCanvasTool.initialize();
                // AgentCanvasTool.renderMouseOver();
                // AgentCanvasTool.renderMouseDown();
                // AgentCanvasTool.renderMouseOut();
                /*if( self.currentDrawable.type == "2") {
                    $("#item_href_1 a.agent-title").click();
                }*/
                /*self.infoBoard.sortDrawables();
                self.infoBoard.redrawCanvas();*/
            });
        },
        //取消
        onCancel: function() {
            var self = this;
            var current_type = self.drawable.type;
            var infoBoard = self.infoBoard;
            var drawable_t = self.drawable;
            // console.log("current_type in onCancel,", current_type, ",drawable_t,", drawable_t);
            $("#close_var_modal_bottom").unbind("click").click( function(event) {
                doIt( current_type, infoBoard, drawable_t);
                if( file_id) {
                    deleteFile( null, file_id, function(data) {
                        //console.log("there is deleteFile,", data);
                    }, this);
                }
                $("#overlay").hide();
            });
            $("#close_var_modal_top").unbind("click").click(function(event) {
                doIt( current_type, infoBoard, drawable_t);
                if( file_id) {
                    deleteFile( null, file_id, function(data) {
                        //console.log("there is deleteFile,", data);
                    }, this);
                }
                $("#overlay").hide();
            });
            function doIt( current_type, infoBoard, drawable_t) {
                var current_type = current_type;
                infoBoard = infoBoard;
                // console.log( " this is drawable_t,", drawable_t);
                if( current_type == 5 || current_type == 8 || current_type ==9 ) {
                    //console.log("this is 'if' in onCancel,");
                    if( typeof(drawable_t.aliquots) == undefined) {
                        infoBoard.deleteSelections();
                    }
                } else if( current_type == 2){
                    //console.log("this is 'else' in onCancel,");
                    infoBoard.deleteSelections();
                }
            }
        }
    };
    return variateForm;
});