define( function(require){
	//window ？？？
	//var Window = require("cloud/components/window");
	//页面内容加载
	//var html = require("./AgentCanvasProperty.html");
	//console.log("Start require AgentCanvasProperty");
    //var contentScada = require("../pandect/components/content-scada");
	var AgentDrawableProperty = require("./AgentDrawableProperty");
	var AgentCanvasToolProperty = require("./AgentCanvasToolProperty");
	//service API引用
	//var service = require("../../service/siteService");
	//require("../plugin/jquery.layout.min");
	var Board = require("../pandect/components/canvas/Board");
	var AgentCanvasProperty = {
		initialize:function( /*$super,*/ options){
			/*$super(options);*/
			//console.log( "start initialize");
			this.moduleName = "agentcanvas";
			this.id = "agentcanvas";
			this.element = $("#" + this.id);
			this.elements = {
				center: this.id + "-center",
				info: this.id + "-info"
			};
			this.elements.center = {
				toolbar: this.id + "-center-toolbar",
				content: this.id + "-center-content",
				timescroll: this.id + "-center-time"
			};
			this.siteid = options.siteid;
			this.sitename = options.sitename;
			this.newScadaData = options.newScadaData;
			this.siteList = options.siteList;
			this.selectedScadaId = options.selectedScadaId;
			//this.deviceName = options.deviceName;
			this.agentCanvasDraw = null;
			this.agentCanvasTool = null;
			this.refreshInterval = null;
			this.refreshTimerId = null;
			this.render();
			//console.log("end initialize");
		},
		render:function(){
			//this.renderLayout();
			this.renderDrawablePropety();
			this.renderCanvasTool();
			this.renderSiteName();
			this.renderEvent();
			this.renderTool();
			renderAgentScadaView();
		},
		updateCanvasValue: function(agentStatusData, dataTime) {
            function F(a) {
                var regex = /[0-9,a-z,A-Z,:,-,\s]$/;
                var var1; //高八位
                var var2; //低八位
                var val1 = String.fromCharCode(a >>> 8);
                var val2 = String.fromCharCode(a & 0xff);
                if (regex.test(val1)) {
                    var1 = val1;
                } else {
                    var1 = '';
                }
                if (regex.test(val2)) {
                    var2 = val2;
                } else {
                    var2 = '';
                }
                return var2 + '' + var1;
            }
            //屏蔽乱码
            function F_bms(a) {
                if (a && a != "") {
                    var regex = /[0-9,a-z,A-Z,:,-,\s]$/;
                    var var1; //高八位
                    var var2; //低八位
                    var val1 = String.fromCharCode(a >>> 8);
                    var val2 = String.fromCharCode(a & 0xff);
                    if (regex.test(val1)) {
                        var1 = val1;
                    } else {
                        var1 = '';
                    }
                    if (regex.test(val2)) {
                        var2 = val2;
                    } else {
                        var2 = '';
                    }
                    return var2 + '' + var1;
                } else {
                    return '';
                }
            }
            //结果转换为字符串
            function ToString(str) {
                if (str && str != "") {
                    return str.toString();
                } else {
                    return '';
                }
            }
            var self = this;
            var timestamp = 0;
            var readOnlyDrawables = this.infoBoard.readOnlyDrawables; 
            if (agentStatusData) {
                for (id in agentStatusData) {
                    var formulaId = "_" + id + "";
                    if (agentStatusData[id] != "--") {
                        eval("var " + formulaId + "=" + agentStatusData[id] + ";");
                    }
                    else {
                        eval("var " + formulaId + "='';");
                    }
                }
            }
            if (readOnlyDrawables && readOnlyDrawables.length > 0) {
                for (var i = 0; i < readOnlyDrawables.length; i++) {
                    var drawable = readOnlyDrawables[i];
                    var varStr = Ext.isArray(drawable.address) ? drawable.address[0].varId : null;
                    if (drawable && varStr) {
                        var value = "--";
                        for (id in agentStatusData) {
                            if (timestamp < dataTime[id]) {
                                timestamp = dataTime[id];
                            }
                        }
                        if (drawable.address[0].formula) {
                            value = eval(drawable.address[0].formula);
                        }else if(drawable.address[0].varId){
                            value = eval("_"+drawable.address[0].varId);
                        }
                        drawable.m.onDataChanage(value,drawable);
                        if (timestamp > 0) {
                            var newTime = new Date(timestamp * 1000);
                            var updateTimeZ = newTime.getFullYear() + "-" + (newTime.getMonth() + 1) + "-" + newTime.getDate() + "  " + newTime.getHours() + ":" + newTime.getMinutes() + ":" + newTime.getSeconds();
                            self.showTime(updateTimeZ);
                        }
                    }
                }
            }
            this.infoBoard.redrawCanvas();
        },
		renderAgentScadaView: function() {
            var self = this;
            Board.initialize({id: "agentcanvas-center-canvas"});
            $("#agentcanvas-center-canvas").height( "auto");
             $("#agentcanvas-center-canvas").width( "800");
            self.infoBoard = new Nts.Module.Common.Canvas.Board({
                editable: true,
                selectable: true,
                scrollable: true,
                autofit: true,
                height: 600,
                width: 800
            });
            // $("#ext-gen4").width( "100%");
        },
		renderAgentCanvasWindow:function(){
			//面板加载
			/*this.windowHistory = new Window({
				container: "body",
				title: "现场1-组态图",
				top: "center",
				left: "center",
				width: 1200,
				height: 660,
				drag:true,
				mask: true,
				content: "<div id='canvas-panel-box'></div>",
				events: {
					"beforeClose": function() {
						//this.destroy();
						//alert("销毁完成");
					}.bind(this),
					"onClose": function() {
						//varCacheList.clear();
					}.bind(this),
					"onShow": function() {
					}
				},
				scope: this
			});
			this.windowHistory.show();
			this.windowHistory.setContents(elements);*/
		},
		/*renderLayout:function(){
			this.layout = this.element.layout({
				defaults: {
                    paneClass: "pane",
                    togglerClass: "cloud-layout-toggler",
                    resizerClass: "cloud-layout-resizer",
                    "spacing_open": 1,
                    "spacing_closed": 1,
                    "togglerLength_closed": 50,
					togglerTip_open:locale.get({lang:"close"}),
                    togglerTip_closed:locale.get({lang:"open"}),  
                    resizable: false,
                    slidable: false
                },
                center: {
                    paneSelector: "#"+this.element+"-center"
                },
                east:{
                	paneSelector: "#"+this.element+"-info",
                	size:170
                }
			});
		},*/
		renderDrawablePropety:function(){
			this.agentCanvasDraw = new AgentDrawableProperty({
				selector:"#agentcanvas-center",
				/*service:service,*/
				siteid:this.siteid,
				sitename: this.sitename,
				newScadaData : this.newScadaData,
				siteList:this.siteList,
				selectedScadaId:this.selectedScadaId
			});
		},
		renderSiteName:function(){
			var self = this;
			var sitename=self.sitename;
			self.agentCanvasDraw.renderSiteName_div(sitename);
		},
		renderCanvasTool:function(){
			this.agentCanvasTool = new AgentCanvasToolProperty({
				selector:"#"+this.element+"-info",
				agentCanvasDraw:this.agentCanvasDraw,
				/*service:service,*/
				global:0
			});
		},
		renderEvent:function(){
			var self = this;
			this.agentCanvasDraw.on({
				"rendDraw":function(data){
					self.agentCanvasTool.redDrawElement(data);
				}
			});
			this.agentCanvasTool.on({
				"showOptionWin":function(){
					this.agentCanvasDraw.onProperty();
				}
			});
		},
		renderTool:function(){
            //var self = this;
			this.agentCanvasDraw.agentCanvasTool=this.agentCanvasTool;
		},
		destroy:function(){
			if(this.agentCanvasTool)this.agentCanvasTool.destroy();
			if(this.agentCanvasDraw)this.agentCanvasDraw.destroy();
		}
	};
	return AgentCanvasProperty;
});