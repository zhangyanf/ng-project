define(function (require) { 
    var Board = require("../../pandect/components/canvas/Board");
    /*var self = this;*/
    //var Global=require("./canvas/Global");
    //this.Global = Global;
    //Global.init(); 
    /*var AgentCanvasProperty = require("../../agent/AgentCanvasProperty");
     console.log( AgentCanvasProperty);*/
    var ContentScada = {
        initialize: function (options) {
            this.moduleName = "content-scadaview";
            this.id = "content-scadaview";
            this.element = $("#" + this.id);
            this.elements = {
                toolbar: this.id + "-toolbar",
                content: this.id + "-content",
                scada: this.id + "-scada",
                timescroll: this.id + "-time",
                fullScreenEnabled: false
            };
            $('#canvas-move').css("display", "none");
            this.toolbar = null;
            this.viewPanel = null;
            this.refreshTimerId = null;
            this.refreshInterval = null;
            /*********diplay*********/
            this.render();
            /*********diplay*********/
        },
        render: function () {
            this.draw();
            //this.renderPlugin();
            //this.renderContentLayout();
            //this.rendertoolbar();
            this.showTime();
            this.renderScadaViewPanel();
            this.renderScadaViewSort();
            window.clearInterval(this.refreshTimerId);
            this.renderSiteName();
            $("#content-scadaview-content").css({width: "auto", top: "40px", bottom: "0 ", "text-align":"center"});
            // $("#content-scadaview-scada").css({"width": "auto"});
            // $("#content-scadaview-scada").css({"overflow-y": "auto", "overflow-x": "auto", "height": "auto"});

            $("#content-scadaview-toolbar").css({"padding-top": "15px", left: "20px"});
            // $("#content-scadaview-toolbar").hide();
            $("#content-scadaview-time").css({width: "0"});

        },
        draw: function () {
            var html = "<div id=" + this.elements.content + " class=" + this.elements.content + " >" +
                 "<div id=\"scada-comp-103\" style=\"display:none;height:25px;overflow-x:hidden;overflow-y:hidden;width:100%;\"></div>" + //此处放的现场名称
                "<div id=" + this.elements.scada + " class=" + this.elements.scada + " style=\"height:100%;\"></div>" +
                "<div id=\"scada-comp-102\" style=\"height:0px;\"></div>" +
                "</div>" +
                "<div id=" + this.elements.timescroll + " class=" + this.elements.timescroll + "></div>";
            this.element.append(html);
        },
        renderPlugin: function () {
            (function () {
                var fullScreenApi = {
                        supportsFullScreen: false,
                        isFullScreen: function () {
                            return false;
                        },
                        requestFullScreen: function () {
                        },
                        cancelFullScreen: function () {
                        },
                        fullScreenEventName: '',
                        prefix: ''
                    },
                    browserPrefixes = 'webkit moz o ms khtml'.split(' ');
                if (typeof document.cancelFullScreen != 'undefined') {
                    fullScreenApi.supportsFullScreen = true;
                } else {
                    for (var i = 0, il = browserPrefixes.length; i < il; i++) {
                        fullScreenApi.prefix = browserPrefixes[i];
                        if (typeof document[fullScreenApi.prefix + 'CancelFullScreen'] != 'undefined') {
                            fullScreenApi.supportsFullScreen = true;
                            break;
                        }
                    }
                }
                if (fullScreenApi.supportsFullScreen) {
                    fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';
                    fullScreenApi.isFullScreen = function () {
                        switch (this.prefix) {
                            case '':
                                return document.fullScreen;
                            case 'webkit':
                                return document.webkitIsFullScreen;
                            default:
                                return document[this.prefix + 'FullScreen'];
                        }
                    }
                    fullScreenApi.requestFullScreen = function (el) {
                        return (this.prefix === '') ? el.requestFullScreen() : el[this.prefix + 'RequestFullScreen']();
                    }
                    fullScreenApi.cancelFullScreen = function (el) {
                        return (this.prefix === '') ? document.cancelFullScreen() : document[this.prefix + 'CancelFullScreen']();
                    }
                }
                if (typeof jQuery != 'undefined') {
                    jQuery.fn.requestFullScreen = function () {
                        return this.each(function () {
                            if (fullScreenApi.supportsFullScreen) {
                                fullScreenApi.requestFullScreen(this);
                            }
                        });
                    };
                }
                window.fullScreenApi = fullScreenApi;
            })();
        },

        renderSiteName: function () {
            var self = this;
            var $htmls = $("<div></div>" +
                "<div id='siteName' style='text-align:center;font-weight:bold;font-size:18px;'>" +
                "</div>"
            );
            $("#scada-comp-103").append($htmls);

        },
        renderDefaultDiv: function (display, defaulthtmls) {
            var self = this;
            if (display == true) {
                $("#canvas-glasspane").empty();
                $("#canvas-glasspane").append(defaulthtmls);
                $("#canvas-glasspane").addClass("canvas-glasspane");
                $("#canvas-glasspane").css("display", "block");

                $("#newFrame").click(function () {
                    window.clearInterval(self.refreshTimerId);
                    self.fire("editClick");
                });

                $("#copyOtherFrame").click(function () {
                    self.fire("copyFromOther");
                });

            } else {
                $("#canvas-glasspane").css("display", "none");
            }

        },
        renderSiteName_div: function (siteName) {
            //火狐不支持innerText，支持textContent
            if (document.getElementById('siteName').innerText) {
                document.getElementById('siteName').innerText = siteName;
            } else {
                document.getElementById('siteName').textContent = siteName;
            }

        },
        rendertoolbar: function () {
            var self = this;
            var $scadaTime = $(+"<div id='notice-bar' style='width:auto'>" +
                "<div id='notice-bar-timer'>" +
                "<ul><li style='width:190px'>" +
                "<p style='background:#1EAB38;color:#fff;text-align:center;' id='timer'></p></li>" +
                "</ul>" +
                "</div>" +
                "</div>");
            //var $allScreen = new Button({
            //             id: "toolbar-all-screen-button",
            //             imgCls: "cloud-icon-full",
            //             title:locale.get({lang:"full_screen_display"}),
            //             lang:"{title:full_screen_display}"
            //         });
            //var $exitScreen = new Button({
            //             id: "toolbar-exit-screen-button",
            //             imgCls: "cloud-icon-defull",
            //             title:locale.get({lang:"exit_full_screen"}),
            //             lang:"{title:exit_full_screen}"
            //         });
            //var $button = new Button({
            //             id: "toolbar-scada-edit-button",
            //             imgCls: "cloud-icon-edit",
            //             title:locale.get({lang:"edit"}),
            //             lang:"{title:edit}"
            //         });
            // if(permission.app("_scada")["write"]){
            //	  this.toolbar = new Toolbar({
            //               selector: "#" + this.elements.toolbar,
            //               leftItems: [$allScreen,$exitScreen,$button],
            //               rightItems: [$scadaTime]
            //         });
            // }else{
            //	 this.toolbar = new Toolbar({
            //               selector: "#" + this.elements.toolbar,
            //               leftItems: [$allScreen,$exitScreen],
            //               rightItems: [$scadaTime]
            //        });
            // }
            //         this.toolbar = new Toolbar({
            //               selector: "#" + this.elements.toolbar,
            //               leftItems: [$allScreen,$exitScreen],
            //               rightItems: [$scadaTime]
            //         });

           /* $("#toolbar-scada-edit-button").click(function () {
                window.clearInterval(self.refreshTimerId);
                self.fire("editClick");
            });*/

            //1.按按钮进入全屏状态及退出全屏
            $("#toolbar-all-screen-button").click(function () {
                if (self.searchWindowStatus) {
                    window.clearInterval(self.searchWindowStatus);
                }
                if (!window.fullScreenApi.supportsFullScreen) {
                    return;
                }
                if (!self.elements.fullScreenEnabled) {
                    window.fullScreenApi.requestFullScreen(document.body);
                    self.allowKeyBoard();
                }
                else {
                    window.fullScreenApi.cancelFullScreen(document.body);
                }
            });
            //退出全屏
            $("#toolbar-exit-screen-button").click(function () {
                if (self.searchWindowStatus) {
                    window.clearInterval(self.searchWindowStatus);
                }
                if (!window.fullScreenApi.supportsFullScreen) {
                    return;
                }
                if (!self.elements.fullScreenEnabled) {
                    window.fullScreenApi.requestFullScreen(document.body);
                    self.allowKeyBoard();
                } else {
                    window.fullScreenApi.cancelFullScreen(document.body);
                }
            });
            //2.按F11进入全屏状态及退出全屏
            document.body.onkeydown = function (event) {
                var e = event || window.event || arguments.callee.caller.arguments[0];
                if (e && e.keyCode == 122) { // 按 F11
                    if (window.screenLeft == 0 && window.document.body.clientWidth == window.screen.width) {
                        if (self.searchWindowStatus) {
                            window.clearInterval(self.searchWindowStatus);
                            self.searchWindowStatus = null;
                        }

                        self.searchWindowStatus = setInterval(function () {
                            var editDisplay = $("#toolbar-scada-edit-button").css("display");
                            var fullDisplay = $("#toolbar-all-screen-button").css("display");
                            if (document.body.offsetHeight === window.screen.height) {
                                self.allowKeyBoard();
                                $("#toolbar-all-screen-button").css("display", "none");
                                self.elements.fullScreenEnabled = true;
                            } else {
                                if (fullDisplay == "none" && editDisplay == "none") {
                                    $("#toolbar-all-screen-button").css("display", "none");
                                } else {
                                    $("#toolbar-all-screen-button").css("display", "block");
                                }
                                self.elements.fullScreenEnabled = false;

                            }
                        }, 10);

                    }
                }
            };
            //3.按“全屏显示”按钮进入全屏，按ESC退出全屏
            $(document).bind(
                'fullscreenchange webkitfullscreenchange mozfullscreenchange', //当全屏状态发生改变时绑定该事件
                function () {
                    if (!self.elements.fullScreenEnabled) {//document.fullscreen || document.webkitIsFullScreen ||document.mozFullScreen){//当当前状态为全屏时
                        self.elements.fullScreenEnabled = true;
                        $("#toolbar-exit-screen-button").show();
                        $("#toolbar-all-screen-button").hide();
                    } else {
                        self.elements.fullScreenEnabled = false;
                        $("#toolbar-exit-screen-button").hide();
                        $("#toolbar-all-screen-button").show();
                    }
                }
            );
            this.fullScreen();//全屏状态时

        },
        allowKeyBoard: function () {
            //全屏状态下允许键盘输入
            if (window.navigator.userAgent.toUpperCase().indexOf('CHROME') >= 0) {//只有chrome支持全屏状态下允许键盘输入
                var docElm = document.documentElement;
                docElm.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        },
        fullScreen: function () {
            if (document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen) {//当当前状态为全屏时
                $("#toolbar-all-screen-button").hide();
                $("#toolbar-exit-screen-button").show();
                this.elements.fullScreenEnabled = true;
            } else {
                $("#toolbar-exit-screen-button").hide();
                $("#toolbar-all-screen-button").show();
                this.elements.fullScreenEnabled = false;
            }
        },
        showTime: function (updatetime) {
            //var weekday = [locale.get({lang:"Sunday"}),locale.get({lang:"Monday"}),locale.get({lang:"Tuesday"}),locale.get({lang:"Wednesday"}),locale.get({lang:"Thursday"}),locale.get({lang:"Friday"}),locale.get({lang:"Saturday"})];
            //this.interval = setInterval(function(){
            //var now = new Date();
            //var timeValue = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate()+" "+weekday[now.getDay()]+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
            $("#timer").empty();
            $("#timer").html(updatetime);
            //},1000);
        },
        clearTime: function () {
            $("#timer").empty();
        },
        getContentBoolbar: function () {
            return this.toolbar;
        },
        renderScadaViewPanel: function () {
            var self = this;
            Board.initialize({id: "content-scadaview-scada"});
            $("#content-scadaview-scada").height( "600");
            $("#content-scadaview-scada").width( "800");
            self.infoBoard = new Nts.Module.Common.Canvas.Board({
                editable: false,
                selectable: true,
                scrollable: false,
                autofit: false,
                height: 600,
                width: 800
            });
        },
        renderScadaViewSort: function () {
            this.infoBoard.resizeCanvas();
            this.infoBoard.createCanvas();
            this.infoBoard.sortDrawables();
            this.infoBoard.resizeCanvas();
        },
        clearCanvas: function () {
            // 清除整个 canvas 画面
            var canvas = this.infoBoard.canvas.dom;
            //if (this.infoBoard.sortedDrawables && this.infoBoard.sortedDrawables.length > 0) { 
            //    this.infoBoard.sortedDrawables.clear();
            //    this.infoBoard.readOnlyDrawables.clear();
            //}
            this.infoBoard.canvas.ctx2d.clearRect(0, 0, canvas.width, canvas.height);


            // 将下拉框里的组态画面清空
            $("#multiselect option").remove();
        },
        openCanvasView: function (cp) {
            var self = this;
            this.infoBoard.redrawCanvas();
            if (this.refreshTimerId == null) {
                if (self.refreshInterval) {

                } else {
                    self.refreshInterval = 10000;
                }
                this.refreshTimerId = setInterval(function () {
                    self.loadAgentData();
                }, self.refreshInterval);

            } else {
                window.clearInterval(this.refreshTimerId);
            }
        },
        loadAgentData: function () {
            loadDatas();
            //this.fire("loadData");
        },
        updateCanvasValue: function ( ) {
            // console.log("updateCanvasValue in content-scada,", arguments);
            var rt_times = arguments[0];
            var rt_id = arguments[1];
            var rt_timestamp = arguments[2];
            var rt_value = arguments[3];
            var self = this;
            var timestamp = 0;
            var readOnlyDrawables = this.infoBoard.readOnlyDrawables;
            // console.log(" readOnlyDrawables in updateCanvasValue on content-scada,", readOnlyDrawables);
            if( readOnlyDrawables && readOnlyDrawables.length > 0) {
                for (var i = 0; i < readOnlyDrawables.length; i++) {
                    var drawable = readOnlyDrawables[i];
                    if (drawable != undefined && drawable.m != undefined && drawable.address == rt_id) {
                        var timestamp = rt_timestamp;
                        var value = "--";
                        value = rt_value;
                        //drawable.setTitle(1, {text: String.format('{0}{1}', value, '')}, false);
                        drawable.m.onDataChanage(value, drawable);
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
        /**
         *
         * @param eventname click dbclick mousemoveon mousemoveout
         * @param event function
         */
        addEvent: function (eventname, e) {
            var event = {};
            var eventDrawables = this.infoBoard.eventDrawables;
            event[eventname] = e;
            eventDrawables.push(event);
        },
        //清除动态组件的定时器
        clearDynamicComponentTimer: function () {

            if (this.infoBoard != undefined && this.infoBoard.readOnlyDrawables != "undefined" && this.infoBoard.readOnlyDrawables) {
                var readOnlyDrawables = this.infoBoard.readOnlyDrawables;
                if (readOnlyDrawables && readOnlyDrawables.length > 0) {
                    for (var i = 0; i < readOnlyDrawables.length; i++) {
                        var drawable = readOnlyDrawables[i];
                        if (drawable.type == '3') {
                            if (drawable.maxValue || drawable.minValue) {
                                if (drawable.m) {
                                    drawable.m.clearTimer();
                                }
                            }
                            if (drawable.conveyer) {
                                if (drawable.m) {
                                    drawable.m.clearTimer();
                                }
                            }
                        }

                    }
                }
            }

        },
        //清除动态组件的定时器
        clearDynamicComponentElementTimer: function () {
            if (this.infoBoard != undefined && this.infoBoard.sortedDrawables != "undefined" && this.infoBoard.sortedDrawables) {
                var sortedDrawables = this.infoBoard.sortedDrawables;
                if (sortedDrawables && sortedDrawables.length > 0) {
                    for (var i = 0; i < sortedDrawables.length; i++) {
                        var drawable = sortedDrawables[i];
                        if (drawable.m) {
                            drawable.m.destroy();
                        }
                    }
                }
            }

        },
        destroy: function () {
            if (this.layout && (!this.layout.destroyed)) {
                this.layout.destroy();
            }
            if (this.contentScadaLayout && (!this.contentScadaLayout.destroyed)) {
                this.contentScadaLayout.destroy();
            }
            if (this.searchWindowStatus) {
                window.clearInterval(this.searchWindowStatus);
            }
            if (this.refreshTimerId) {
                window.clearInterval(this.refreshTimerId);
            }
            $("#canvas-glasspane").css("display", "none");
            //$(".canvas-thermometer").css("display","none");
            $(".canvas-thermometer").remove();
            this.clearDynamicComponentTimer();
            this.clearDynamicComponentElementTimer();
            this.clearCanvas();
            this.infoBoard.destoryCanvas();
            this.infoBoard = null;
            //this.infoBoard = null;
            //this.clearCanvas();
        }
    };
    return ContentScada;
});