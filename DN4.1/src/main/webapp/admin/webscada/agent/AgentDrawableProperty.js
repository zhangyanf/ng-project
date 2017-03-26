define(function(require){
	// require("cloud/lib/plugin/jquery.layout");
	// var Toolbar = require("cloud/components/toolbar");
    var Board = require("../pandect/components/canvas/Board");
    //require("../agent/Configure");
	require("../pandect/utils/Helper");
	// require("../plugin/jquery.qtip.min");
	require("./AgentDrawableFromProperty");
	// var Button = require("cloud/components/button");
	// var AgentCanvasManager = require("./AgentCanvasManager");
    // var propertyManager= require("../agent/propertyManager");
	var AgentCanvasTool = require("./AgentCanvasToolProperty");
	// var Configure = require("./Configure");
	var AgentDrawableFromProperty = require("./AgentDrawableFromProperty");
	locale.render({element: "body"});
	Ext.ns('Nts.Module.System.Agent');
    // var service = require("../../service/siteService");
	var AgentDrawablePanel = {
		initialize:function( options){
			this.moduleName = "agentcanvas-center";
			// console.log("initialize options,", options);
			// $super(options);
			this.id = "agentcanvas-center";
			this.element = $("#" + this.id);
			this.elements={
					toolbar:this.id+"-toolbar",
					content:this.id+"-content",
					canvas:this.id+"-canvas",
					timescroll:this.id+"-time",
					imagesdiv:"nts-module-common-canvas-global-resources"
			};
			this.canvasOptions = {
			};
			// console.log( "this ",this);
			// console.log( "this panel", AgentDrawablePanel);
			this.sendData = options;
			this.allScadaData = [];
			this.canvasOptions[this.siteid] = null;
			this.siteid = options.siteid;
			// this.sitename = null;
			this.sitename = options.sitename;
			this.newScadaData = options.newScadaData;
			this.siteList = options.siteList;
			//this.service = options.service;
			this.selectedCnavasId = options.selectedScadaId;
			// console.log( "before AgentCanvasTool initialize",AgentCanvasTool);
			var toolObject = {
				selector: "#agentcanvas-info",
				agentCanvasDraw: this,
				global: 0
			};
			// console.log("THIS IS TEST ON AgentDrawableProperty.js, toolObject,", toolObject, ", this, ", this)
			AgentCanvasTool.initialize( toolObject);
			this.appUrl = "../pandect/template/scadaview";
			this.toolbar = null;
			this.Canvastoolbar = null;
			this.agentCanvasTool= null;
			$("#toolbar").empty();
			$("#multiselectEdit").empty();
			$("#canvas-edit").hide();
			$("#content_header_scada").empty().height("26");
			$("#toolbar-search-box").show();
			this._render();
		},

		_render:function(){
			this.draw();
			//this.renderLayout();
			this.renderToolbar();
			this.renderScadaViewPanel();
			this.renderScadaViewSort();
			this.renderScadaViewData();
			//this.renderCreateFrom();
			//this.renderEditFrom();
			this.infoBoard.canvas.el.on('dblclick', this.onBoardDblClick, this);
			// this.renderSiteName();
			this.renderCanvasToolbar();
			// this.renderSiteName_div( this.sitename);
			//this.renderRefreshTime();
		},
		draw:function(){
			$("#agentcanvas-center-toolbar").empty();
			// console.log( this.elements.toolbar);
			// console.log("initialize draw, this.sitename,", this.sitename);
			var html = "<div id="+this.elements.toolbar+" class="+this.elements.toolbar+"></div>"+
					   "<div id="+this.elements.content+" class="+this.elements.content+" style=\"height:auto\">"+
					   "<div id=\"scada-comp-101\" style=\"height:100%;\"></div>"+
					   "<div id=\"scada-comp-103\" style=\"height:100%;overflow-x:hidden;overflow-y:hidden;\"><div id='siteName' style='text-align:center;font-weight:bold;font-size:18px;'>"+this.sitename+"</div></div>"+//此处放的现场名称
					   "<div id="+this.elements.canvas+" class="+this.elements.canvas+" style=\"height:100%\"></div>"+
					   "<div id=\"scada-comp-102\" style=\"height:100%;\"></div>"+
					   "</div>"+
					   "<div id=" + this.elements.timescroll + " class=" + this.elements.timescroll + "></div>";
			this.element.append(html);
		},
		renderSiteName:function(){
			var self = this;
            var $htmls = $("<div></div>" +
                "<div id='siteName' style='text-align:center;font-weight:bold;font-size:18px;'>" +
                "</div>"
            );
            $("#scada-comp-103").append($htmls);
		},
		renderSiteName_div: function (siteName) {
            //火狐不支持innerText，支持textContent
            if (document.getElementById('siteName').innerText) {
                document.getElementById('siteName').innerText = siteName;
            } else {
                document.getElementById('siteName').textContent = siteName;
            }
        },
		onText:function(){
			var inputText=$("#textEdits").val();
			if(inputText){//不能为空
				if(inputText.length <= 30){
					this.infoBoard.selectedDrawables[0].editText=$("#textEdits").val();
					this.infoBoard.redrawCanvas();
					$("#canvas-edit").hide();
				}else{ 
					errorTipDis("tag_length_only_in")
				}
			}else{ 
				errorTipDis("textEdit_cannot_be_empty")
			}
		},
		onTime:function(){
			var self = this;
			var time = $("#refresh").val();
			var reg = /^[0-9]*[1-9][0-9]*$/;
			if(!time.empty()){
				if(!(reg.test(time))){ 
					errorTipDis("must_be_a_positive_integer");
				}else{
					if(time < 5){ 
						errorTipDis("refresh_time_xz");
						$("#refresh").val("5");
					}else{
						$("#toolbar-scada-time-button").data("qtip").hide();
					}
				}
			}else{
				errorTipDis("refresh_time_cannot_be_empty"); 
			}
		},
		//
		//上方编辑面板
		renderToolbar:function(){
			var self = this;
			var site_id = this.siteid;
			var site_name = this.sitename;
			// console.log( "site_name,", site_name);
			// console.log("site_id,", site_id);
			var agentCenterToolbar = '<form id="toolbar-search-box" style="width:auto;height:5px">' +
                                        '<label style="margin:auto 10px auto 10px"><span lang="text:scada;">画面</span></label>' +
                                        '<select id="multiselectEdit" autocomplete="off">' +
                                        '</select>' +
                                        '<div class="editScadaName">' +
											'<div class="editScadaName-body">' +
												'<span style="margin-left: 3px;height: 17px">' +
												locale.get({lang:"frames_name"}) +
												'</span>' +
												'<input type="text" id="edit-canvas-name" style="margin-top:3px;" >' +
												'<div style="width:100%" class="tool-edit">' +
													'<a class="glyphicon glyphicon-ok text-light-blue" id="editScadaNameSave" lang="title:save" style="margin-left: 10px;padding: 2px;border: 0px solid transparent;"></a>' +
													'<a class="glyphicon glyphicon-remove text-light-blue pull-right" id="editScadaNameCancle" lang="title:cancle" style="margin-right: 10px;padding: 2px;border: 0px solid transparent;"></a>' +
												'</div>' +
											'</div>' +
										'</div>'+
                                        '<span id="toolbar-scada-editScada-button" class="glyphicon glyphicon-edit text-light-blue" lang="title:edit" style="cursor: pointer;margin-left:10px;"></span>' +
                                        '<span id="split" style="padding-left:10px;margin-right:2px;">|</span>' +
                                    '</form>' +
                                    '<div class="cloud-toolbar-leftcontainer">' +
                                        '<a id="toolbar-scada-new-button" lang="title:new_scada">' +
                                            '<i class="glyphicon glyphicon-plus text-light-blue"></i>' +
                                        '</a>' +
                                        '<a id="toolbar-scada-del-button" lang="title:delete_scada">' +
                                            '<i class="glyphicon glyphicon-minus text-light-blue"></i>' +
                                        '</a>' +
                                        '<a id="toolbar-scada-copyTo-button" lang="title:copy_from_the_other_site">' +
                                            '<i class="glyphicon glyphicon-import text-light-blue"></i>' +
                                        '</a>' +
                                        '<a id="toolbar-scada-copyOther-button" lang="title:application_to_other_site">' +
                                            '<i class="glyphicon glyphicon-export text-light-blue"></i>' +
                                        '</a>' +
                                        '<a id="toolbar-scada-time-button" lang="title:refresh_time">' +
                                            '<i class="glyphicon glyphicon-time text-light-blue"></i>' +
                                        '</a>' +
                                        '<a id="toolbar-scada-save-button" lang="title:save">' +
                                            '<i class="glyphicon glyphicon-ok text-light-blue"></i>' +
                                        '</a>' +
                                        '<a id="toolbar-scada-cancle-button" lang="title:cancel">' +
                                            '<i class="glyphicon glyphicon-remove"></i>' +
                                        '</a>' +
                                        '<div class="addScadaNameContent">' +
											'<div class="addScadaNameContent-body tool-edit">' +
												'<span style="margin-left: 3px;height: 17px">' +
												locale.get({lang:"frames_name"}) +
												'</span>' +
												'<input type="text" id="new-canvas-name" style="margin-top:3px;">' +
												'<div style="width:100%">' +
													'<a class="glyphicon glyphicon-ok text-light-blue" id="newScadaNameSave" lang="title:save" style="margin-left: 10px;padding: 2px;border: 0px solid transparent;"></a>' +
													'<a class="glyphicon glyphicon-remove text-light-blue pull-right" id="newScadaNameCancle" lang="title:cancle" style="margin-right: 10px;padding: 2px;border: 0px solid transparent;"></a>' +
												'</div>' +
											'</div>' +
										'</div>' +
										'<div class="refreshTimeBox">'+
											'<div class="refreshTimeBox-body tool-edit">' +
												'<span style="margin-left: 3px;height: 17px">' +
												locale.get({lang:"refresh_time"}) +
												'</span>' +
												'<input type="text" id="refresh" style="margin-top:3px;">' +
												'<div style="width:100%">' +
													'<a class="glyphicon glyphicon-ok text-light-blue" id="refreshTimeSave" lang="title:save" style="margin-left: 10px;padding: 2px;border: 0px solid transparent;"></a>' +
													'<a class="glyphicon glyphicon-remove text-light-blue pull-right" id="refreshTimeCancle" lang="title:cancle" style="margin-right: 10px;padding: 2px;border: 0px solid transparent;"></a>' +
												'</div>' +
											'</div>' +
										'</div>'+
                                    '</div>' +
                                    '<div class="cloud-toolbar-rightcontainer">' +
                                        '<div class="cloud-toolbar-item">' +
                                            '<div id="notice-bar-timer" class="cloud-toolbar-item-content">' +
                                                '<ul style="list-style: none;">' +
                                                    '<li style="width:190px">' +
                                                        '<p style="background:#1EAB38;color:#fff;text-align:center;" id="timer"></p>' +
                                                    '</li>' +
                                                '</ul>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="ui-helper-clearfix"></div>';
            $("#agentcanvas-center-toolbar").append(agentCenterToolbar);
            locale.render({element: "#agentcanvas-center-toolbar"});
			//给组态画面下拉框绑定事件
			// console.log( "mul's break");
			$("#multiselectEdit").bind('change', function () {
				$("#canvas-edit").hide();
				/*$(this).find('option').removeAttr('selected');
				 console.log("this in bind,", this);
				$(this).attr('selected', 'selected');*/
				// console.log("current_val in bind,", $(this).val());
				var current_val = $(this).val();
				// console.log( "current_val,", current_val);
				var selectedId = null;
				$("#multiselectEdit option").prop( "selected", "");
				$("#multiselectEdit option").each(function(index, el) {
					// $("#multiselectEdit").find('option').removeAttr('selected');
					if( $(this).val() == current_val) {
						//$("#multiselectEdit").find('option').removeAttr('selected');
						// console.log("this in if,", this);
						// $(this).attr('selected', 'selected');
						$(this).prop( "selected", "selected");
						// console.log("selectedId in for ,", $("#multiselectEdit").find("option:selected").val());
						selectedId = $("#multiselectEdit").find("option:selected").val();
					}
				});
				//var selectedId = $("#multiselectEdit").find("option:selected").val();
				// console.log("selectedId in bind,",selectedId);
				//当前选择的canvas画面
				self.canvasOptions[self.selectedCnavasId] = self.infoBoard.getData();
				self.selectedCnavasId = selectedId;
				var canvas = self.infoBoard.canvas.dom;
				self.infoBoard.sortedDrawables = null;
				self.infoBoard.canvas.ctx2d.clearRect( 0, 0, canvas.width, canvas.height);
				var canvasData = self.canvasOptions[selectedId];
				self.infoBoard.loadData( canvasData);
				// console.log( "test multiselectEdit'data,", canvasData);
				/*$("#multiselectEdit option").each(function(index, el) {
					if( $(this).val() != selectedId) {
						$(this).removeAttr("selected");
					}
				});*/
				// console.log( "this is this.sitename,", this.sitename);
	        });
	        //点击编辑scada名称
	        $("#toolbar-scada-editScada-button").unbind("click").click( function() {
	        	$(".addScadaNameContent").hide();
	        	$(".refreshTimeBox").hide();
	        	var selectedName=null;
				var selectedId = $("#multiselectEdit").val();
				selectedName=$("#multiselectEdit").find("option[value="+selectedId+"]").text();
				$("#edit-canvas-name").val(selectedName);
	        	self.onEdit();
	        });
			//点击增加scada事件
			$("#toolbar-scada-new-button").unbind("click").click( function(event) {
				// console.log( $(".addScadaNameContent").attr("class"),"biu");
				// console.log( "add Event");
				$(".addScadaNameContent").show();
				$(".addScadaNameContent-body").show();
				$(".editScadaName").hide();
				$(".refreshTimeBox").hide();
				//点击保存新画面名称
				$("#newScadaNameSave").unbind("click").click( function(event) {
					// console.log("sass");
					$(".addScadaNameContent").hide();
					self.onCreate();
				});
				//点击取消
				$("#newScadaNameCancle").unbind("click").click( function(event) {
					$(".addScadaNameContent").hide();
				});
			});

			//删除画面
			$("#toolbar-scada-del-button").unbind("click").click(function(){
				$("#canvas-edit").hide();
				dialog.render({
    				lang:"affirm_delete",
    				buttons: [{
    					lang:"affirm",
    					click:function(){
    						//获取当前被选中的画面
    						var task_state_id=$("#multiselectEdit").find("option:selected").val();
    						//将该画面删除
    						$("#multiselectEdit option").each(function() {
    							  if ($(this).val() == task_state_id) {
    							      $(this).remove();  //删除当前画面
    							      delete self.canvasOptions[task_state_id];
    							      var canvas = self.infoBoard.canvas.dom;
    							      self.infoBoard.sortedDrawables=[];
    							      self.infoBoard.canvas.ctx2d.clearRect(0,0,canvas.width,canvas.height);
    							      // console.log( "delete");
    							      if($('#multiselectEdit option').length>0){
    							    	  $("#multiselectEdit option[index='0']").attr("selected", "selected");//默认让第一个画面被选中
        							      var selectedId = $("#multiselectEdit").find("option:selected").val();
        							      var canvasData = self.canvasOptions[selectedId];
        							      //  console.log("canvasData in delete scada,", canvasData);
        							      self.infoBoard.loadData(canvasData);
    							      } else {
    							      	// console.log("siteId,", site_id);
    							      }
    							  }
    						});
    						if( $("#multiselectEdit option").length == 0) {
    							$("#multiselectEdit").append('<option value="'+site_id+'" selected="selected">'+ self.sitename +'</option>')
    						}
    						dialog.close();
    					}
    				},
    				{
    					lang:"cancel",
    					click:function(){
    						dialog.close();
    					}
    				}]
    			});
			});
			//get current limit && page
			var current_limit = sessionStorage.getItem("current_limit");
        	var current_page = sessionStorage.getItem("current_page");
        	//  console.log("get session Item, current_limit,", current_limit, ", current_page,", current_page);
			//取消当前编辑操作
			//点击**编辑取消** 按钮
		    $("#toolbar-scada-cancle-button").unbind("click").click( function(event) {
		    	$("#canvas-edit").hide();
		    	//$("#content_header_scada").show();
		        dialog.render({
		            lang: "affirm_cancel",
		            buttons: [ {lang: "yes", click: function() {
		                            $("#agentcanvas").hide();
		                            $("#scadaview-template").show();
		                            $("#pcontent").load("admin/site/config_siteList.html",function(){
							            //liveSiteList( current_page , current_limit);
							            $(".content").height( $(window).height());
							            set_$tcontentHeight();
							        });
		                            //loadSiteInfo(this.siteid);
		                            /*var current_canvas = self.canvasOptions[$("#multiselectEdit option:selected").val()];
		                            if( current_canvas == null) {
		                            	var current_site_name = $("#multiselectEdit").val();
		                            	$("#pcontent").load("admin/site/config_siteList.html",function(){
									        //liveSiteList( current_page, current_limit);
									        $(".content").height( $(window).height());
									 	});
		                            } else {
		                            	$("#pcontent").load("admin/scadaviewEdit.html",function(){
									        loadSiteInfo( self.siteid);
									        $(".content").height( $(window).height());
									        set_$tcontentHeight();
									 	});
		                            }
		                            $(".addScadaNameContent").hide();
		                            $(".editScadaName").hide();*/
		                            dialog.close();
		                        }},
		                        {lang: "no", click: function() {
		                            dialog.close();
		                        }}],
		            close: function() {
		                dialog.close();
		            }
		        });
		    });
		    /*
           * “从其他现场复制”和“复制到其他现场”，应该是整体替换现场的所有画面，不是追加
           */
            var siteId = this.siteid;
            //从其他现场复制
            $("#toolbar-scada-copyTo-button").unbind("click").click(function(){
            	// console.log("biu");
            	$(".addScadaNameContent").hide();
				$(".editScadaName").hide();
				$(".refreshTimeBox").hide();
            	$("#copyBox").attr("flag","copyTo");
		        $(".copyTo").show();
		        $(".toCopy").hide();
		        $("#copyBox").show();
		        $('#copyBox').modal({backdrop: 'static', keyboard: false, show: true});
		        // console.log("copy from other, siteId,", siteId);
		        //调用一个全局的现场列表函数
		        copyScada( siteId);
			});

            //应用到其他现场
            $("#toolbar-scada-copyOther-button").unbind("click").click(function(){
            	$("#copyBox").attr("flag","copyOther");
            	$(".addScadaNameContent").hide();
				$(".editScadaName").hide();
				$(".refreshTimeBox").hide();
		        $(".copyTo").hide();
		        $(".toCopy").show();
		        $("#copyBox").show();
		        $('#copyBox').modal({backdrop: 'static', keyboard: false, show: true});
		        // console.log("copy to other,siteId,", siteId);
            	copyScada( siteId);
            });
            //刷新时间
            $("#toolbar-scada-time-button").unbind("click").click( function() {
            	$(".addScadaNameContent").hide();
				$(".editScadaName").hide();
				$(".refreshTimeBox").show();
				// console.log("this is self.newScadaData,", self.newScadaData);
				if( $("#refresh").val()) {
					// console.log();
				} else {
					if( self.newScadaData && self.newScadaData.length > 0) {
						if( self.newScadaData[0].refreshInterval) {
							$("#refresh").val( self.newScadaData[0].refreshInterval);
						} else {
							$("#refresh").val("10");
						}
					} else {
						$("#refresh").val("10");
					}
				}
				$("#refreshTimeSave").unbind("click").click( function(){
					var time = $("#refresh").val();
					// console.log( "this is refersh time", time);
					var reg = /^\+?[1-9][0-9]*$/;
					if(time) {
						// console.log("reg test,", reg.test(time));
						if( !(reg.test(time))) { 
							errorTipDis("must_be_a_positive_integer");
						} else {
							if( time < 5 ) { 
								errorTipDis("refresh_time_xz");
            					$("#refresh").val("5");
							} else {
								$(".refreshTimeBox").hide();
							}
						}
					} else {
						errorTipDis("refresh_time_cannot_be_empty");
					}
				});
				$("#refreshTimeCancle").unbind("click").click( function() {
					$(".refreshTimeBox").hide();
				});
            });
			//保存更改后的现场
			$("#toolbar-scada-save-button").unbind("click").click(function(){
				$("#canvas-edit").hide();
				// console.log( "click");
				//$("#content_header_scada").show();
				dialog.render({
    				lang:"affirm_save",
    				buttons: [{
    					lang:"affirm",
    					click:function(){
    						dialog.close();
    						allScadaData = [];
    						$("#multiselectEdit option").each(function() {
    							// console.log("test this,", this);
    							 console.log("after test, $(this).attr,", $(this).val() ,$(this).attr("selected"));
    							if( $(this).val() == $("#multiselectEdit").val() /*$(this).attr("selected") && $(this).attr("selected") != undefined*/){
    								var selected = $(this).val();
    								var selectText = $(this).text();
    								var canvasData = self.infoBoard.getData();
    								canvasData.canvasId = selected;
    								canvasData.canvasText = selectText;
    								canvasData.refreshInterval = $("#refresh").val();
    								self.allScadaData.push(canvasData);
    							}else{
    								var selectId = $(this).val();
    								var selectText = $(this).text();
    								var canvasData = self.canvasOptions[selectId];
    								canvasData.canvasId = selectId;
    								canvasData.canvasText = selectText;
    								canvasData.refreshInterval = $("#refresh").val();
    								self.allScadaData.push(canvasData);
    							}
    						 });
                            var canvasData = self.infoBoard.getData();
                            // console.log("this is test canvasData ,in agent, ", canvasData);
                            // console.log("toolbar-scada-save-button self.allScadaData,", self.allScadaData);
                            // save canvas that it is no data;
                            /*if( canvasData.items.length == 0) {
                            	$("#pcontent").load("admin/config_siteList.html",function(){
										            //liveSiteList( current_page , current_limit);
										            $(".content").height( $(window).height());
										            set_$tcontentHeight();
										        });
                            } else {*/
                            	console.log( "self.allScadaData,", self.allScadaData);
                            	var scada_data = self.allScadaData;
                            	//.console.log( "scada_data,", scada_data);
                            	var target_data = new Array();
                            	for( var x = 0; x < scada_data.length; x++) {
                            		if( scada_data[x].items.length != 0) {
                            			// delete scada_data[x];
                            			target_data.push( scada_data[x]);
                            		}
                            	}
                            	if( target_data.length == 0 ) {
                            		target_data[0] = self.allScadaData[0];
                            	} else {

                            	}
                            	// console.log( "target_data,", target_data);
                        		var	saveData = {
    	    							name:"a_scada_"+new Date(),
    	    							type:"1",
    	    							content: target_data
    	    				    };
                            	// console.log( "target_data,", target_data, ",scada_data,", scada_data);
    	    				    /*for( var x = 0; x < saveData.content.length; x++) {
    	    				    	if( saveData.content[x].items.length == 0) {
    	    				    		saveData.content.remove( x);
    	    				    	}
    	    				    }*/
    	    				    // console.log("before save scada,", saveData);
    	    				    /*if( saveData.content[0].items.length == 0 ) {
    	    				    	$("#pcontent").load("admin/config_siteList.html",function(){
										            //liveSiteList( current_page , current_limit);
										            $(".content").height( $(window).height());
										            set_$tcontentHeight();
										        });
    	    				    } else {*/
    	    				    	//  This is testetste
    	    				    	onScadaOk( self.siteid, saveData);
    	    				    //}
                            // }
    						//判断为新增scada 还是 编辑scada 并提交
    						function onScadaOk( siteId, saveData) {
    							var me = this;
    							// console.log( " site_name on onScadaOk,", site_name , ", me.sitename,", me.sitename);
    							// console.log("onScadaOk'saveData,", saveData);
    							//if saveData.content.items.length = 0 ; this is no scada;
    							if( saveData.content[0].items && saveData.content[0].items.length != 0) {
    								 // ("saveData not empty,", saveData);
    								getCanvasBySiteId( siteId, null, function( data) {
    									// console.log( "get data,", data);
	    								if( data.result) {
	    									//console.log();
	    									if( saveData.name) {
	    										delete saveData.name;
	    									}
	    									updateScada( null, saveData, siteId, function( data){
	    										// console.log("this is updateScada");
	    										// console.log("siteId is ", siteId);
	    										back_site_list();
	    									}, this);
	    								} else {
	    									addScada( null, saveData, siteId, function( data) {
	    										// console.log("this is addScada");
	    										// console.log("siteId is ", siteId);
	    										/*$("#pcontent").load("admin/site/config_siteList.html",function(){
	    															            //liveSiteList( current_page , current_limit);
	    															            $(".content").height( $(window).height());
	    															            set_$tcontentHeight();
	    															        });*/
	    										back_site_list();
	    									}, this);
	    								}
	    							}, this);
    							} else {
    								// console.log( "saveData is empty,",saveData);
    								// console.log( " this is siteId,", siteId);
    								getCanvasBySiteId( siteId, null, function( data) {
    									// console.log( "canvas'data,", data);
    									if ( !data.result || data.result.content == "" || data.result.content == undefined) {
    										/*$("#pcontent").load("admin/site/config_siteList.html",function(){
									            //liveSiteList( current_page , current_limit);
									            $(".content").height( $(window).height());
									            set_$tcontentHeight();
									        });*/
									        back_site_list();
    									} else {
									        deleteScada( null, siteId, function(data){
												// console.log("there is delete,data,", data);
												/*$("#pcontent").load("admin/site/config_siteList.html",function(){
												            //liveSiteList( current_page , current_limit);
												            $(".content").height( $(window).height());
												            set_$tcontentHeight();
												        });*/
												back_site_list();
    										},this);
    									}
    								} );
    								/*deleteScada( null, siteId, function(data){
    									console.log("there is delete,data,", data);
    									$("#pcontent").load("admin/config_siteList.html",function(){
										            //liveSiteList( current_page , current_limit);
										            $(".content").height( $(window).height());
										            set_$tcontentHeight();
										        });
    								},this);*/
    							}
    						}
    						function back_site_list() {
    							$("#pcontent").load("admin/site/config_siteList.html",function(){
						            //liveSiteList( current_page , current_limit);
						            $(".content").height( $(window).height());
						            set_$tcontentHeight();
						        });
    						}
    					}
    				},
    				{
    					lang:"cancel",
    					click:function(){
    						dialog.close();
    					}
    				}]
    			});

               //var initialAgentData = (JSON && JSON.stringify) ? JSON.stringify(canvasData, null, '') : Ext.encode(canvasData);
               //alert(initialAgentData);
			});
		},
		//加载内容显示区域面板
		renderScadaViewPanel:function(){
			var self = this;
			// console.log("edit Board initialize .......");
			Board.initialize({id: "agentcanvas-center-canvas"});
			$("#agentcanvas-center-canvas").height( "auto");
			$("#agentcanvas-center-canvas").width( "800");
			self.infoBoard = new Nts.Module.Common.Canvas.Board( {
				region: "center",
				style: { backgroundColor: "white",
						 width: "800px"}
			});
		},
		//点击编辑 出现的 对象出现的工具栏
		renderCanvasToolbar:function(){
			// console.log("click element");
			var self = this;
			var editScadaButton = "<span id='toolbar-scada-edit-button' class='glyphicon glyphicon-edit text-light-blue' lang='title:edit'></span>";
			var delButton = "<span id='toolbar-scada-delete-el-button' class='glyphicon glyphicon-minus text-light-blue' lang='title:delete_scada'></span>";
			var copyPastButton = "<span id='toolbar-scada--copyPast-button' class='glyphicon glyphicon-transfer text-light-blue' lang='title:copyPast_scada'></span>";
			var rotation = "<span id='toolbar-scada--rotation-button' class='glyphicon glyphicon-repeat text-light-blue' lang='title:rotation'></span>";
			var stackingOrder= "<span id='toolbar-scada-stackingOrder-button' class='glyphicon glyphicon-save text-light-blue' lang='title:stacking_order'></span>";//叠放次序--向下
			var stackingUp= "<span id='toolbar-scada-stackingUp-button' class='glyphicon glyphicon-open text-light-blue' lang='title:stacking_up'></span>";//叠放次序--向上
			//编辑文本
			var editTextButton= "<span id='toolbar-text-edit-button' class='glyphicon glyphicon-edit text-light-blue' lang='title:edit'></span>";
			var textBold= "<span id='toolbar-text-bold-button' class='glyphicon glyphicon-bold text-light-blue' lang='title:bold'></span>";//叠放次序--向上
			//========文字大小==========================================
			var $textFont = "<div id='textFont-bar' style='color:black;width:auto;' class='glyphicon'>" +locale.get({lang:"font_size"})+
								"<select id='textFont' style='width:53px;height:20px;'>"+
				                    "<option value='0'>12</option>"+
				                    "<option value='1'>14</option>"+
				                    "<option value='2'>16</option>"+
				                    "<option value='3'>18</option>"+
				                    "<option value='4'>20</option>"+
				                    "<option value='5'>22</option>"+
				                    "<option value='6'>26</option>"+
				                    "<option value='7'>28</option>"+
				                    "<option value='8'>36</option>"+
				                    "<option value='9'>48</option>"+
				                    "<option value='10'>56</option>"+
				                    "<option value='11'>72</option>"+
			                    "</select>"+
		                    "</div>";
			//========编辑文字标签=======================================
            var $htmls = "<div id='text-bar' style='color:black;width:auto;' class='glyphicon'>" +locale.get({lang:"text_content"})+
	                    	"<input style='color:black;width:120px;height:15px;' type='text'  id='textEdits' />"  +
	                    	"<span class='glyphicon glyphicon-ok text-light-blue' id='editOK' lang='title:save'></span>" +
	                    "</div>";
            $("#toolbar").append( editScadaButton + editTextButton + textBold + $textFont + delButton + copyPastButton + rotation + stackingOrder + stackingUp );
            locale.render({element: "#toolbar"});
			//改变文字大小
			$("#textFont-bar").removeClass("cloud-toolbar-item-content");
			$("#textFont").bind('change', function () {
				var selectedId = $("#textFont").find("option:selected").text();
				self.infoBoard.selectedDrawables[0].titles[0].size=selectedId;
				if(selectedId == '72'){
					self.infoBoard.selectedDrawables[0].width=135;
					self.infoBoard.selectedDrawables[0].height=21;
					self.infoBoard.selectedDrawables[0].width=self.infoBoard.selectedDrawables[0].width+55;
					self.infoBoard.selectedDrawables[0].height=self.infoBoard.selectedDrawables[0].height+55;
				}else if(selectedId == '56'){
					self.infoBoard.selectedDrawables[0].width=135;
					self.infoBoard.selectedDrawables[0].height=21;
					self.infoBoard.selectedDrawables[0].width=self.infoBoard.selectedDrawables[0].width+45;
					self.infoBoard.selectedDrawables[0].height=self.infoBoard.selectedDrawables[0].height+45;
				}else if(selectedId == '48'){
					self.infoBoard.selectedDrawables[0].width=135;
					self.infoBoard.selectedDrawables[0].height=21;
					self.infoBoard.selectedDrawables[0].width=self.infoBoard.selectedDrawables[0].width+35;
					self.infoBoard.selectedDrawables[0].height=self.infoBoard.selectedDrawables[0].height+35;
				}else if(selectedId == '36'){
					self.infoBoard.selectedDrawables[0].width=135;
					self.infoBoard.selectedDrawables[0].height=21;
					self.infoBoard.selectedDrawables[0].width=self.infoBoard.selectedDrawables[0].width+25;
					self.infoBoard.selectedDrawables[0].height=self.infoBoard.selectedDrawables[0].height+25;
				}else if(selectedId == '28'){
					self.infoBoard.selectedDrawables[0].width=135;
					self.infoBoard.selectedDrawables[0].height=21;
					self.infoBoard.selectedDrawables[0].width=self.infoBoard.selectedDrawables[0].width+17;
					self.infoBoard.selectedDrawables[0].height=self.infoBoard.selectedDrawables[0].height+17;
				}else if(selectedId == '26'){
					self.infoBoard.selectedDrawables[0].width=135;
					self.infoBoard.selectedDrawables[0].height=21;
					self.infoBoard.selectedDrawables[0].width=self.infoBoard.selectedDrawables[0].width+15;
					self.infoBoard.selectedDrawables[0].height=self.infoBoard.selectedDrawables[0].height+15;
				}else if(selectedId == '22'){
					self.infoBoard.selectedDrawables[0].width=135;
					self.infoBoard.selectedDrawables[0].height=21;
					self.infoBoard.selectedDrawables[0].width=self.infoBoard.selectedDrawables[0].width+10;
					self.infoBoard.selectedDrawables[0].height=self.infoBoard.selectedDrawables[0].height+10;
				}else if(selectedId == '20'){
					self.infoBoard.selectedDrawables[0].width=135;
					self.infoBoard.selectedDrawables[0].height=21;
					self.infoBoard.selectedDrawables[0].width=self.infoBoard.selectedDrawables[0].width+8;
					self.infoBoard.selectedDrawables[0].height=self.infoBoard.selectedDrawables[0].height+8;
				}else if(selectedId == '18'){
					self.infoBoard.selectedDrawables[0].width=135;
					self.infoBoard.selectedDrawables[0].height=21;
					self.infoBoard.selectedDrawables[0].width=self.infoBoard.selectedDrawables[0].width+6;
					self.infoBoard.selectedDrawables[0].height=self.infoBoard.selectedDrawables[0].height+6;
				}else if(selectedId == '16'){
					self.infoBoard.selectedDrawables[0].width=135;
					self.infoBoard.selectedDrawables[0].height=21;
					self.infoBoard.selectedDrawables[0].width=self.infoBoard.selectedDrawables[0].width+4;
					self.infoBoard.selectedDrawables[0].height=self.infoBoard.selectedDrawables[0].height+4;
				}else if(selectedId == '14'){
					self.infoBoard.selectedDrawables[0].width=135;
					self.infoBoard.selectedDrawables[0].height=21;
					self.infoBoard.selectedDrawables[0].width=self.infoBoard.selectedDrawables[0].width+2;
					self.infoBoard.selectedDrawables[0].height=self.infoBoard.selectedDrawables[0].height+2;
				}
		    	self.infoBoard.redrawCanvas();
	        });

			//编辑文字内容
		    $("#toolbar-text-edit-button").unbind("click").click(function(){
		    	$("#toolbar").addClass("edit");
		    	$("#toolbar-text-edit-button").hide();
		    	$("#toolbar-scada-delete-el-button").hide();
		    	$("#toolbar-text-bold-button").hide();
		    	$("#textFont-bar").hide();
		    	$("#toolbar-text-edit-button").after($htmls);
		    	$("#text-bar").show();
		    	if(self.infoBoard.selectedDrawables[0].editText){
		    		$("#textEdits").val(self.infoBoard.selectedDrawables[0].editText);
		    	}else{
		    		$("#textEdits").val("");
		    	}
		    });
		    //文字保存
		    $(document).on("click","#editOK", function() {
				self.onText();
			});
		    //文字加粗
		    $("#toolbar-text-bold-button").bind( "click", function() {
		    	// console.log( "test, self.infoBoard.selectedDrawables[0],", self.infoBoard.selectedDrawables[0]);
		    	// console.log("self.infoBoard.redrawCanvas();", self.infoBoard.selectedDrawables[0].titles[0].bold);
		    	if( self.infoBoard.selectedDrawables[0].titles && self.infoBoard.selectedDrawables[0].titles[0].bold == true) {
		    		self.infoBoard.selectedDrawables[0].titles[0].bold = false;
		    	} else {
		    		self.infoBoard.selectedDrawables[0].titles[0].bold = true;
		    	}
		    	self.infoBoard.redrawCanvas();
		    });
		    /*$("#toolbar-text-bold-button").toggle(function(){
		    	 console.log("toolbar-text-bold-button  1");
		    	if( self.infoBoard.selectedDrawables[0].titles ) {
		    		self.infoBoard.selectedDrawables[0].titles[0].bold="bold";
		    	}
		    	self.infoBoard.redrawCanvas();
		    },function(){
		    	 console.log("toolbar-text-bold-button  2");
		    	if( self.infoBoard.selectedDrawables[0]) {
			    	if( self.infoBoard.selectedDrawables[0].titles[0]) {
			    		self.infoBoard.selectedDrawables[0].titles[0].bold="";
			    	}
		    	}
		    	self.infoBoard.redrawCanvas();
		    });*/
			//编辑组件
			$(document).on("click","#toolbar-scada-edit-button", function() {
				self.onProperty();
			});
			//删除组件
			$("#toolbar-scada-delete-el-button").unbind("click").click(function(){
				self.infoBoard.deleteSelections();
				$("#canvas-edit").hide();
			});
			//复制粘贴
			$("#toolbar-scada--copyPast-button").unbind("click").click(function(){
				//复制
				self.clipboardDrawables = [];
				for( var i = 0; self.infoBoard.selectedDrawables && i < self.infoBoard.selectedDrawables.length; i ++ )
				{
					self.clipboardDrawables.push(self.infoBoard.selectedDrawables[i]);
				}

				//粘贴
				var newDrawables = [];
				for( var i = 0 ; self.clipboardDrawables && i < self.clipboardDrawables.length; i ++ )
				{
					var drawable = self.clipboardDrawables[i];
					var config = drawable.getData();
					config.x += 50;
					config.y += 50;
					var newDrawable = new Nts.Module.Common.Canvas.Drawable(config);
					self.infoBoard.addDrawable(newDrawable);
					newDrawables.push(newDrawable);
				}
				self.infoBoard.sortDrawables();
				self.infoBoard.resizeDrawableRegion(false);
				self.infoBoard.setSelections(newDrawables);
			});
			//旋转
			$("#toolbar-scada--rotation-button").unbind("click").click(function(){
				var drawable = self.infoBoard.selectedDrawables;
				// console.log( "toolbar-scada--rotation-button's drawable,", drawable);
				//一次只能旋转一张图片
				if(drawable[0].images[0].rotation){
					 drawable[0].images[0].rotation=drawable[0].images[0].rotation+ 90;
				}else{
					 drawable[0].images[0].rotation=90;
				}

				if(drawable[0].images[0].rotation > "360"){
					 drawable[0].images[0].rotation = 90;
				}

				if(drawable[0].titles && drawable[0].titles.length > 0){
				     for(var i=0;i<drawable[0].titles.length;i++){
						  drawable[0].titles[i].rotation=drawable[0].images[0].rotation;
					  }
				}
				// self.infoBoard.sortDrawables();
				self.infoBoard.redrawCanvas();

				$("#canvas-edit").hide();

			});
			//向下
			$("#toolbar-scada-stackingOrder-button").unbind("click").click(function(){
				var min_mz=[];
				var index_up=-1;
				var index_down=-1;
				// console.log("click toolbar-scada-stackingOrder-button");
				for( var i = 0; i < self.infoBoard.sortedDrawables.length; i ++ )
				{
					var drawable= self.infoBoard.sortedDrawables[i];
					min_mz.push(drawable.mz);
				}
				var drawable = self.infoBoard.selectedDrawables;
				// console.log("this is min_mz,", min_mz);
				// console.log("drawable[0].mz,",drawable[0].mz,",min_mz.min(),",min_mz.min());
				var min_max = compare_array( min_mz);
				// console.log("min_max,", min_max);
				if(drawable[0].mz == min_max.min){ 
					errorTipDis("has_been_at_the_bottom");
				}else{
					for( var i = 0; i < self.infoBoard.sortedDrawables.length; i ++ )
					{
						var drawables= self.infoBoard.sortedDrawables[i];
						if(drawables.mz == drawable[0].mz){
							index_down=i;
						}
						if(drawables.mz == drawable[0].mz - 1){
							index_up=i;
						}
						if(index_down !=-1 && index_up !=-1){
							break;
						}
					}
					self.infoBoard.sortedDrawables[index_down].mz -=1;
					self.infoBoard.sortedDrawables[index_up].mz +=1;

					self.infoBoard.sortDrawables();
					self.infoBoard.redrawCanvas();
				}
			});
			//向上
			$("#toolbar-scada-stackingUp-button").unbind("click").click(function(){
				var max_mz=[];
				var index_up=-1;
				var index_down=-1;
				for( var i = 0; i < self.infoBoard.sortedDrawables.length; i ++ )
				{
					var drawable= self.infoBoard.sortedDrawables[i];
					max_mz.push(drawable.mz);
				}
				var drawable = self.infoBoard.selectedDrawables;
				var min_max = compare_array( max_mz);
				if(drawable[0].mz == min_max.max){ 
					errorTipDis("has_been_at_the_top");
				}else{
					for( var i = 0; i < self.infoBoard.sortedDrawables.length; i ++ )
					{
						var drawables= self.infoBoard.sortedDrawables[i];
						if(drawables.mz == drawable[0].mz){
							index_up=i;
						}
						if(drawables.mz == drawable[0].mz + 1){
							index_down=i;
						}
						if(index_down !=-1 && index_up !=-1){
							break;
						}
					}
					self.infoBoard.sortedDrawables[index_down].mz -=1;
					self.infoBoard.sortedDrawables[index_up].mz +=1;

					self.infoBoard.sortDrawables();
					self.infoBoard.redrawCanvas();
				}
			});
			//数值比较
			function compare_array( arr) {
				var result = {};
				var min = arr[0];
				var length = arr.length;
				// console.log( length);
				var max = arr[length - 1];
				// console.log( max);
				for( var i = 0; i < length; i++) {
					if( arr[i] < min[0]) {
						min = arr[i];
					}
					if( arr[i] > max) {
						max = arr[i];
					}
				}
				// console.log("min && max in compare_array,", min, max);
				result.min = min;
				result.max = max;
				return result;
			}
		},
		onBoardDblClick:function(panel){
			// console.log("onBoardDblClick");
			this.onProperty();
		},
		//loading data of scada
		renderScadaViewData:function(){
			var canvasData = null;

			if(this.newScadaData){
				canvasData = this.newScadaData;
			}else{
				//canvasData = Nts.Module.System.Agent.Configure.defaultCanvasData
			}
			if(canvasData && Ext.isArray(canvasData)&&canvasData.length>0){
				// console.log("render 1");
				for(var i=0;i<canvasData.length;i++){
					// console.log( $("#multiselectEdit").attr("id"));
					// console.log("canvasData[i].canvasText,",canvasData[i].canvasText);
					var multiselectContent = "<option value='"+ canvasData[i].canvasId+"'>"+canvasData[i].canvasText+"</option>"
					//$("#multiselectEdit").append("<option value='"+canvasData[i].canvasId+"'>"+canvasData[i].canvasText+"</option>");
					$("#multiselectEdit").append( multiselectContent);
					this.canvasOptions[canvasData[i].canvasId] = canvasData[i];
				}
                   //$("#multiselectEdit option").eq(0).attr("selected",true);
				if(this.selectedCnavasId) {
					$("#multiselectEdit option[value="+this.selectedCnavasId+"]").attr("selected",true);
				}
				else {
					$("#multiselectEdit option").eq(0).attr("selected",true);
				}

				if(this.selectedCnavasId) {
					this.infoBoard.loadData(this.canvasOptions[this.selectedCnavasId]);
				} else {
					this.infoBoard.loadData(canvasData[0]);
				}

				if(!this.selectedCnavasId) {
					this.selectedCnavasId = $("#multiselectEdit option").eq(0).val();
				}

			}else if(canvasData){
				// console.log("render 2");
				//  console.log("test this.sitename,", this.sitename);
				$("#multiselectEdit").append("<option value='"+this.siteid+"'>"+this.sitename+"</option>");
				$("#multiselectEdit").find("option[value="+this.siteid+"]").attr("selected",true);
				this.canvasOptions[this.siteid] = canvasData;
				this.selectedCnavasId = this.siteid;
				this.infoBoard.loadData(canvasData);
			}else{
				 // console.log("render 3");
				 // console.log("test this.sitename,", this.sitename);
				$("#multiselectEdit").append("<option value='"+this.siteid+"'>"+this.sitename+"</option>");
				$("#multiselectEdit").find("option[value="+this.siteid+"]").attr("selected",true);
			}
		},

		renderScadaViewSort:function(){
			this.infoBoard.resizeCanvas(true);
			this.infoBoard.createCanvas(true);
			this.infoBoard.sortDrawables( true);
			this.infoBoard.resizeCanvas(true);
			this.infoBoard.afterRender( true);
		},
		onEdit:function(){
			var self = this;
			$(".editScadaName").show();
			$("#editScadaNameSave").unbind("click").click( function(event) {
				var selectedId = $("#multiselectEdit").val();
				var scadasName = $("#edit-canvas-name").val();
				var selectedText=$("#multiselectEdit").text();
				// console.log("selectedId,",selectedId,"scadasName,",scadasName,",selectedText,",selectedText);
				if(selectedText){
					if(scadasName != null || scadasName != undefined){//画布名称不能为空
						if(scadasName.length <= 30){//画布名称小于等于30位
							var obj=self.scadasNameIsExist(scadasName);//画布名称唯一性校验
							// console.log("obj is ", obj);
							if(!obj){
								$("#multiselectEdit").find("option[value="+selectedId+"]").text(scadasName);
								$("#toolbar-scada-editScada-button").show();
								$(".editScadaName").hide();
							}else{
								errorTipDis("frames_already_exists");
							}
						}else{
                            dialog.render({
                                lang: "tag_length_only_in",
                                buttons: [{
                                    lang: "yes",
                                    click: function() {
                                        $("#edit-canvas-name").val(null);
                                        dialog.close();
                                    }
                                }]
                            });
						}
					}else{ 
						errorTipDis("frames_cannot_be_empty");
					}
				}else{ 
					errorTipDis("Please_the_new_picture");
				}
			});
			$("#editScadaNameCancle").unbind("click").click( function(event) {
				$(".editScadaName").hide();
			});
		},
		scadasNameIsExist:function(scadasName){
			var isExist = false;
			if($('#multiselectEdit option').length>0){
				$("#multiselectEdit option").each(function() {
					var optionName=$(this).text();
					if($.trim(optionName)==$.trim(scadasName)) {
						isExist=true;
					}
				});
			}
			return isExist;
		},
		//新增scada画面
		onCreate:function(){
			var selectedId = $("#multiselectEdit").val();
			this.canvasOptions[selectedId] = this.infoBoard.getData();
			var scadasId = new Date().getTime();
			var scadasName = $("#new-canvas-name").val();
			if( scadasName != null || scadasName != undefined){//画布名称不能为空
				if(scadasName.length <= 30){//画布名称小于等于30位
					var obj=this.scadasNameIsExist(scadasName);//画布名称唯一性校验

					if(!obj){
						$("#multiselectEdit option").removeAttr('selected');
						$("#multiselectEdit").append("<option value='"+scadasId+"'>"+scadasName+"</option>");
						$("#multiselectEdit").find("option[value="+scadasId+"]").attr("selected",true);
			            $("#new-canvas-name").val(null);
			            var canvas = this.infoBoard.canvas.dom;
						this.infoBoard.sortedDrawables=[];
						this.infoBoard.canvas.ctx2d.clearRect(0,0,canvas.width,canvas.height);
						this.selectedCnavasId = scadasId;
						this.canvasOptions[scadasId] = this.infoBoard.getData();
						this.infoBoard.redrawCanvas();
					}else{ 
						errorTipDis("frames_already_exists");
					}

				}else{
					dialog.render({lang:"tag_length_only_in", buttons:[{lang:"yes",click:function(){$("#new-canvas-name").val(null);dialog.close();}}]});
				}
			}else{ 
				errorTipDis("frames_cannot_be_empty");
			}
		},
		// 弹出组件具体信息编辑
		onProperty: function(){
			//文件引入
			var self = this;
			var sels = this.infoBoard.selectedDrawables;
			// console.log("selectedDrawables,",sels);
			if( sels.length == 0 ){
				return;
			}
			if(sels[0].type == 'text'){
				return;
			}
			var targetVarData = {
				renderTo: this.elements,
				drawable: sels[0],
				siteList: this.siteList,
				siteId: this.siteid,
				infoBoard: this.infoBoard
			};
			self.currentDrawable = sels[0];
			// console.log("selected canvas,", sels[0]);
			// console.log("targetVarData,",targetVarData);
			AgentDrawableFromProperty.initialize( targetVarData);
		},
		// 数据 加载显示 未使用
	    loadApplication: function () {
	        var application = '../scada/template/scadaview';
			var self = this;
			/*cloud.util.setCurrentApp({url:application});*/
			//util 为一个空的对象， setCurrentApp为一个方法
			//platform为platform js方法对象
			setCurrentApp({url:application});
			function setCurrentApp( obj) {
				if (obj.element) {
			      localStorage.setItem("appElement", obj.element);
			      localStorage.setItem("appView", "");
			      localStorage.setItem("appUrl", "");
			    }
			    if (obj.view) {
			      localStorage.setItem("appView", obj.view);
			    }
			    if (obj.url) {
			      localStorage.setItem("appUrl", obj.url);
			    }
			}
            if (cloud.platform.currentApplication && Object.isFunction(cloud.platform.currentApplication.destroy)) {
            	cloud.platform.currentApplication.destroy();
            	cloud.platform.currentApplication = null;
            }
            this.requestingApplication = application;
      		require(['../scada/template/scadaview'], function (Application) {

				if (cloud.platform.currentApplication && Object.isFunction(cloud.platform.currentApplication.destroy)) {
					cloud.platform.currentApplication.destroy();
					cloud.platform.currentApplication = null;
				}

                //judge if the previous requesting application is canceled.
				$("#user-content").empty();
				cloud.util.unmask("#user-content");
				if (Application) {
					cloud.platform.currentApplication = new Application({
                         container: "#user-content",
                         service: self.service,
                         siteid: self.siteid
                    });
                }
           }.bind(this));
		},

		destroy:function(){
			if(this.layout && (!this.layout.destroyed)){
				this.layout.destroy();
			}
			if(this.contentScadaLayout && (!this.contentScadaLayout.destroyed)){
				this.contentScadaLayout.destroy();
			}
			if(this.CanvasLayout&& (!this.CanvasLayout.destroyed)){
				this.CanvasLayout.destroy();
			}
			if(this.win)this.win.close();
			$("#canvas-edit").hide();
		}
	};
	return AgentDrawablePanel;
});
