define(function(require) {
    var Configure = require("./Configure");
    var SettingHtml = '<div id="item_href" class="item_href"><a href="javascript:void(0)"  class="agent-title" style="background-image:url(./admin/webscada/images/collapsed.gif);background-position:0% 50%;background-repeat:no-repeat no-repeat;"></a><div style="display:none;height:500px; overflow-x: hidden; overflow-y: auto;" class="agent-scanvas-side"></div></div>';
    require("../pandect/utils/Helper");
    require("../pandect/components/canvas/Drawable");
    locale.render({element: "body"});
    var AgentCanvasTool = {
        initialize: function() {
            this.agentCanvasDraw = AgentDrawablePanel;
            this.moduleName = "agentcanvas-info";
            this.id = "agentcanvas-info";
            this.element = $("#" + this.id);
            this.dragId = null;
            this.dragItem = {};
            this.selectedItem = {};
            this.clickFlag = null;
            this.elements = {
                setting: this.id + "-setting",
                canvasTool: this.id + "-canvasTool",
                setTool: this.id + "-setTool",
                customsidebar: "customsidebar",
                imagesdiv: "nts-module-common-canvas-global-resources"
            };
            this.DragMoveDiv_left = null;
            this.DragMoveDiv_top = null;
            this.moveFlag = false;
            this.defaulthtmls = $("<img src='./admin/webscada/images/delete.png' style='margin-left:30px;margin-top:0px;'/>");
            this._render();
        },

        _render: function() {
            this.draw();
            this.renderCanvasElement();
            this.renderInfo();
        },

        draw: function() {
            var html = "<div id=" + this.elements.canvasTool + " class=" + this.elements.canvasTool + " style='height:100%;overflow-x:hidden;overflow-y:hidden;'>" +
                "<div id=" + this.elements.setTool + " class='agent-scanvas-sidebar' style='overflow-x:hidden;overflow-y:auto;padding-right:10px;width:239px'></div>" +
                "</div>";
            this.element.html(html);
        },
        //加载工具面板 no use it
        /*redDrawElement: function(data) {
            $("#container-" + this.elements.customsidebar).find(".canvas-module-item").unbind();
            // console.log("this is test, redDrawElement,")
            for (var i = 0; i < data.length; i++) {
                var components = {};
                components["name"] = data[i].el;
                components["images"] = {
                    "el": data[i]._id,
                    "t": "1"
                };
                schneider.itemsObject[this.elements.customsidebar].push(components);

                var src = schneider.config.FILE_SERVER_URL + "/api/file/" + data[i]._id + "?access_token=" + schneider.Ajax.getAccessToken();
                var toolHtml = '<li id="' + (schneider.itemsObject[this.elements.customsidebar].length - 1) + '_' + this.elements.customsidebar + '" class="canvas-module-item" title="' + data[i].el + '">' +
                    '<img  width="25" height="25" src="' + src + '" />' +
                    '<strong>' + data[i].el + '</strong>' +
                    '<input type="hidden" id="' + data[i]._id + '"/>' +
                    '</li>';
                $('#container-' + this.elements.customsidebar).find('ul').append(toolHtml);
            }

        },*/
        //加载右侧组件
        renderCanvasElement: function() {
            // console.log( "arguments,", arguments);
            var self = this;
            var toolConfigItems = Configure.drawablePrototypes.items;
            // console.log( "Configure,", Configure);
            // console.log( " this is the point, toolConfigItems[1],", toolConfigItems[1]);
            var itemsObject = {};
            for (var i = 0; i < toolConfigItems.length; i++) {
                var configItem = toolConfigItems[i];
                var con_items = configItem.items;
                // console.log( "i,configItem,",i, configItem, ",configItem.items,", configItem.items);
                itemsObject[configItem._id] = con_items;
                $("#agentcanvas-info-setTool").height("659px");
                $("#agentcanvas-info-setTool").css("padding-top", "12px");
                $("#agentcanvas-info-setTool").width( "239px");
                $("#" + this.elements.setTool).append(SettingHtml);
                $("#item_href").find("a").first().attr("id", configItem._id);
                $("#item_href").find("div").first().attr("id", "container-" + configItem._id);
                $("#" + configItem._id).append(configItem._name);
                $("#item_href").attr("id", "item_href_" + i);
                $("#item_href_" + i).attr("title", configItem._name);
                $("#item_href_" + i).css("border-bottom", "1px solid #e5e5e5");
                $("#item_href_" + i).css("backgroundColor", "#f3f3f3");
                $("#item_href_" + i + " a").css("padding-left", "15px");
            }
            var width = $("#" + this.elements.canvasTool).css('width');
            var el = $("#" + this.elements.canvasTool).find("div").css("width", width);
            // var items = {};
            // Transfer the API of scada's components
            getScadaComponents(null, function(data) {
                var result = data.result;
                // console.log( "getScadaComponents's data.result,", result)
                // console.log( "self.elements.customsidebar,", self.elements.customsidebar);
                var items = itemsObject[self.elements.customsidebar];
                // console.log( "test, items before for,", items);
                if (items.length > 3){
                    items.splice(2, items.length - 2);
                }
                for (var i = 0; i < result.length; i++) {
                    if (data.result[i].content.type != "8" && data.result[i].content.type != "9") {
                        var components = {};
                        // console.log( "this is getScadaComponents's content,", data.result[i].content);
                        components["name"] = result[i].content.el;
                        components["images"] = {
                            "_id": result[i].content._id,
                            "el": result[i].content._id,
                            "name": result[i].content.el,
                            "t": "1"
                        };
                        components["type"] = data.result[i].content.type;
                        items.push( components);
                    }
                }
                // console.log( "test, items,", items);
                // console.log("this is the itemsObject,", itemsObject)
                if (schneider.itemsObject){
                    delete schneider.itemsObject;
                }
                schneider.itemsObject = itemsObject;
                // console.log( "schneider.itemsObject,", schneider.itemsObject);
            }, this);
            // 2 classes
            el.find(".agent-title").on( "click", function(dom) {
                var id = $(this).attr("id");
                // console.log( "This is click'id,", id);
                if (self.selectedItem.agentTileId && self.selectedItem.agentTileId != id) {

                    if (self.selectedItem.containerCSS == "block") {
                        $("#container-" + self.selectedItem.agentTileId).empty();
                        $("#" + self.selectedItem.agentTileId).css("background-image", "url('./admin/webscada/images/collapsed.gif')");
                        $("#container-" + self.selectedItem.agentTileId).css("display", "none");
                        $("#container-" + self.selectedItem.agentTileId).removeClass("agent-scanvas-module-view-drawable");
                        self.selectedItem.containerCSS = "none";
                    }
                    self.selectedItem.agentTileId = id;
                } else if (!self.selectedItem.agentTileId) {
                    self.selectedItem.agentTileId = id;
                }

                $('#canvas-move').css("display", "none");
                $("#container-" + $(this).attr("id")).empty();
                if ($("#container-" + $(this).attr("id")).css("display") == "none") {
                    $($(this)).css("background-image", "url('./admin/webscada/images/expanded.gif')");
                    $("#container-" + $(this).attr("id")).css("display", "block");
                    $("#container-" + $(this).attr("id")).addClass("agent-scanvas-module-view-drawable");
                    self.selectedItem.containerCSS = "block";
                } else {
                    $($(this)).css("background-image", "url('./admin/webscada/images/collapsed.gif')");
                    $("#container-" + $(this).attr("id")).css("display", "none");
                    $("#container-" + $(this).attr("id")).removeClass("agent-scanvas-module-view-drawable");
                    self.selectedItem.containerCSS = "none";
                }
                var toolHtml = '<ul>';
                // console.log( "this is itemsObject,id", itemsObject[id]);
                //
                //将对象元素转换成字符串以作比较
                function obj2key(obj, keys){
                    var n = keys.length,
                        key = [];
                    while(n--){
                        key.push(obj[keys[n]]);
                    }
                    return key.join('|');
                }
                //去重操作
                function uniqeByKeys(array,keys){
                    var arr = [];
                    var hash = {};
                    for (var i = 0, j = array.length; i < j; i++) {
                        var k = obj2key(array[i], keys);
                        if (!(k in hash)) {
                            hash[k] = true;
                            arr .push(array[i]);
                        }
                    }
                    return arr ;
                }
                itemsObject[id] = uniqeByKeys( itemsObject[id], ["name"]);
               // console.log("itemsObject[id], after uniqe,", itemsObject[id]);
                for (var j = 0; j < itemsObject[id].length; j++) {
                    var item = itemsObject[id][j];
                    //console.log( " item in for, ", item);
                    var imageItem = null;
                    // $("#container-" + id + " ul").empty();
                    if (id == "customsidebar") {
                        // console.log( "this is item when id = customsidebar,", item);
                        if (item.type != "8" && item.type != "9") {
                            var elItem = Ext.isArray(item.images) && item.images[0] ? item.images[0] : item.images;
                            // console.log( "this is elItem,", elItem);
                            imageItem = document.getElementById('canvas-image-' + elItem.el);
                            var tempName = item.name;
                            if( tempName == undefined) {
                                tempName = "";
                            }
                            var name = tempName.replace( new RegExp( "<br/>", "g"), "");
                            var src = null;
                            if( item.type == 10){
                                var _id = item.images._id;

                                src = schneider.config.FILE_SERVER_URL + "/api/file/" + item.images._id + "?access_token=" + schneider.Ajax.getAccessToken();
                                var imgId = "canvas-image-"+ item.images.el ;
                                if($("#"+imgId).length==0){
                                    var img = '<img id="canvas-image-' + item.images._id + '" src="' + src + '" >';
                                    if( img != undefined) {
                                        $("#nts-module-common-canvas-global-resources").append(img);
                                    }
                                    //$("#nts-module-common-canvas-global-resources").append(img);
                                }
                            }else{
                                src = imageItem.src;
                            }
                            toolHtml += '<li id="' + j + '_' + $(this).attr("id") + '"   draggable="true" class="canvas-module-item"  title="' + name + '">' +
                                '<img  width="25" height="25" src=' + src + ' />' +
                                '<strong>' + item.name + '</strong>' +
                                '<input type="hidden" id="' + elItem.el + '"/>' +
                                '</li>';
                        }
                    } else {
                        var elItem = Ext.isArray(item.images) && item.images[0] ? item.images[0] : item.images;
                        imageItem = document.getElementById('canvas-image-' + elItem.el);
                        var item_name = item.name;
                        //console.log("item_name,",item_name);
                        if( item_name == undefined) {
                            item_name = "";
                        }
                        var name = item_name.replace( new RegExp("<br/>", "g"), "");
                        toolHtml += '<li id="' + j + '_' + $(this).attr("id") + '"   draggable="true" class="canvas-module-item"  title="' + name + '">' +
                            '<img  width="25" height="25" src=' + imageItem.src + ' />' +
                            '<strong>' + item.name + '</strong>' +
                            '<input type="hidden" id="' + elItem.el + '"/>' +
                            '</li>';
                    }
                }
                toolHtml += '</ul>';
                $("#container-" + $(this).attr("id")).append(toolHtml);
                $("#1_customsidebar").attr("delete_flag","");
                self.renderScroll();
                self.renderRightEvent();
                //拖拽组件
                self.renderMouseOver(itemsObject, $(this).attr("id"));
                self.renderMouseDown();
                self.renderMouseUp();
                self.renderMouseOut();
            });

            //el.find(".agent-title").first().trigger("click");
        },
        renderScroll: function() {
            var self = this;
            $(".agent-scanvas-side").scroll(function() {
                 $('#canvas-move').empty();
            });
        },
        renderRightEvent: function() {
            //禁用右键、文本选择功能、复制按键
            $(document).bind("contextmenu", function() {
                return false;
            });

        },
        //鼠标移入事件
        //拖动的是 #canvas-move
        //start draw or add or delete components
        renderMouseOver: function(items, childId) {
            var self = this;
            if (self.moveFlag) {
                return;
            }
            var oldDragId = null;
            self.dragId = null;
            $("#container-" + childId).find(".canvas-module-item").mouseover( function(event) {
                //z工具鼠标事件
                 $('#canvas-move').empty();
                oldDragId = self.dragId;
                self.dragId = $(this).attr("id");
                $(".canvas-module-item").removeClass("agent-view-drawable-hover");
                if (oldDragId && oldDragId != self.dragId) {
                    $("#" + oldDragId).removeClass("agent-view-drawable-hover")
                    //增加当前鼠标移入的样式
                    $("#" + self.dragId).addClass("agent-view-drawable-hover");
                };
                // console.log( " renderMouseOver: self.dragId,", self.dragId);
                //===========================删除自定义组件==================================================
                if ( childId == "customsidebar") { //自定义组件
                    $('#canvas-move').empty();
                    /*if ( self.dragId === "1_customsidebar") { //单击删除按钮
                         $('#canvas-move').empty();
                    } else */if ( self.dragId === "0_customsidebar") {
                         $('#canvas-move').empty();
                        //console.log("there is new");
                        $("#canvas-move").click(function() {
                            if ( $("#1_customsidebar").attr("delete_flag") == "delete") { 
                                errorTipDis("please_cancel_the_delete")
                            }
                        });
                    } else { //自定义上传的图片
                        $("#canvas-move").empty();

                        $(".ui-widget-content").hide();
                        if ( $("#1_customsidebar").attr("delete_flag") == "delete") {
                            // $('#canvas-move').append(self.defaulthtmls); //添加删除的图片
                            if( self.dragId != "1_customsidebar") {
                                $('#canvas-move').append(self.defaulthtmls);
                            }
                            $("#canvas-move").on("click",function() {
                                if ($("#" + self.dragId).attr("class") == "canvas-module-item canvas-delete agent-view-drawable-hover" && self.dragId != "1_customsidebar" && self.dragId != "0_customsidebar") {
                                    var id = $("#" + self.dragId + " input").attr("id");
                                    var deleteLiId = self.dragId;
                                    //获取自定义监控组件
                                    dialog.render({
                                        lang: "affirm_delete",
                                        buttons: [{
                                            lang: "affirm",
                                            click: function() {
                                                getScadaComponents({limit:0, verbose:100}, function(data) {
                                                    if (data.result && data.result.length > 0) {
                                                        for (var i = 0; i < data.result.length; i++) {
                                                            if (data.result[i].content.type != "8" || data.result[i].content.type != "9") {
                                                                var contentId = data.result[i].content._id;
                                                                var resultId = data.result[i]._id;
                                                                if (contentId == id) {
                                                                    // console.log( "deleteScadaComponents.......data,", data);
                                                                    //删除自定义组件
                                                                    deleteScadaComponents({limit:0, verbose:100}, resultId, function(data) {
                                                                        $("#" + deleteLiId).remove();
                                                                         $('#canvas-move').empty();
                                                                        var configItem = items.customsidebar;
                                                                        if (configItem.length && configItem.length > 0) {
                                                                            for (var i = 0; i < configItem.length; i++) {
                                                                                var ids = configItem[i].images.el;
                                                                                if (id == ids) {
                                                                                    configItem.splice(i, 1);
                                                                                }
                                                                            }
                                                                        }
                                                                    }, this);
                                                                    // Delete the file At the same time
                                                                    deleteFile( null, contentId, function( data){}, this);
                                                                }
                                                            }
                                                        }
                                                    }
                                                }, this);
                                                 $('#canvas-move').empty();
                                                dialog.close();
                                            }
                                        }, {
                                            lang: "cancel",
                                            click: function() {
                                                dialog.close();
                                            }
                                        }]
                                    });
                                }
                                if( self.dragId == "1_customsidebar") {
                                     $('#canvas-move').empty();
                                    $("#container-customsidebar li").removeClass('canvas-delete');
                                    $("#1_customsidebar strong").text( locale.get({lang: "dele_components"}));
                                    $("#1_customsidebar").removeAttr("delete_flag");
                                    self.renderMouseDown();
                                    self.renderMouseUp();
                                    self.renderMouseOut();
                                }
                            });
                        }
                    }
                } else {
                     $('#canvas-move').empty();
                    // $(".canvas-module-item").removeClass("agent-view-drawable-hover");
                }
                //===============================================================================
                var li_title = $("#" + self.dragId + " strong").text();
                $('#canvas-move').attr("title", li_title);

                self.dragItem = items;
                var left = $(this).offset().left;
                var top = $(this).offset().top;
                $('#canvas-move').removeClass("canvas-move-dashed");
                $('#canvas-move').addClass("canvas-move");
                $('#canvas-move').css("left", left);
                $('#canvas-move').css("top", top);
                $('#canvas-move').css("height", "70px");
                $('#canvas-move').css("width", "70px");
                $('#canvas-move').css("display", "block");

                self.DragMoveDiv_left = left;
                self.DragMoveDiv_top = top;
            });
        },
        //鼠标按下事件
        renderMouseDown: function() {
            var self = this;
            // console.log("renderMouseDown", self.dragId);
            $('#canvas-move').mousedown(function(event) {
                //console.log("canvas-move mousedown,", event);
                // console.log("renderMouseDown canvas-move ");
                self.clickFlag = null;
                var selectedText = null;
                event.preventDefault && event.preventDefault();

                if (self.global == 0) {
                    selectedText = $("#multiselect").text();
                } else {
                    selectedText = true;
                }

                if (selectedText) {
                    document.onmousemove = function(event) {
                        var do_event = event || window.event; //兼容火狐浏览器的处理
                        //console.log("do_event,",do_event);
                        var left = do_event.clientX - 25;
                        var top = do_event.clientY - 25;
                        //console.log("test left && top in renderMouseDown,", left, top);
                        if (self.DragMoveDiv_left - left < 10) {} else {
                            $('#canvas-move').css("left", left);
                            $('#canvas-move').css("top", top);
                            $('#canvas-move').removeClass("canvas-move");
                            $('#canvas-move').addClass("canvas-move-dashed");
                            $('#canvas-move').css("height", "70px");
                            $('#canvas-move').css("width", "60px");
                            self.clickFlag = true;
                            self.moveFlag = true;
                        }
                    }
                } else {
                    $('#canvas-move').css("display", "none");
                    errorTipDis("The_site_has_no_canvas")
                }
            });
        },
        //鼠标移除事件
        renderMouseOut: function() {
            //console.log("this is mouseout");
            var self = this;
            $('#canvas-move').mouseout(function(event) {
                // if($('#canvas-move').attr("class")=="canvas-move" && self.clickFlag != "true"){
                //      setTimeout(function(){
                //          $('#canvas-move').css("display","none");
                //      },2000);
                // }
                 $('#canvas-move').empty();
                // self.dragId = null;
            });
        },
        //鼠标移出事件
        renderMouseUp: function() {
            var self = this;
            $('#canvas-move').mouseup(function(event) {
                //console.log("this is mousup");
                var do_event = event || window.event; //兼容火狐浏览器的处理
                if ($('#canvas-move').css("display") == "block") {
                    $('#canvas-move').css("display", "none");
                    document.onmousemove = null;
                    var items = self.dragItem;
                    self.moveFlag = false;
                    //==============================删除自定义组件====================================================================
                    // console.log( "self.dragId,", self.dragId);
                    var clickId = self.dragId;
                    if (clickId == "1_customsidebar") { //点击“单击删除”
                        $('#canvas-move').removeClass("canvas-move");
                        $('#canvas-move').hide();
                        $('#canvas-move').unbind();
                         $('#canvas-move').empty();

                        var toolConfigItems = Configure.drawablePrototypes.items;
                        var configItem = toolConfigItems[1];
                        // console.log( "test, configItem,", configItem);
                        $("#canvas-move").on( "click", function(e) {
                            // console.log("this is canvas-move click 1");
                            if( self.dragId == "1_customsidebar") {
                                // console.log("this is 1_customsidebar");
                                // This is cancle delete components
                                if( $("#1_customsidebar").attr("delete_flag") == "delete") {
                                    $("#1_customsidebar").attr("delete_flag", "");
                                    $("#1_customsidebar strong").text( locale.get({lang:"dele_components"}));
                                    if( configItem.items && configItem.items.length > 0) {
                                        for( var i = 0; i < configItem.length; i++) {
                                            if( $("#0_customsidebar").attr("class") == "canvas-module-item canvas-new") {
                                                $("#0_customsdiebar").removeClass("canvas-new");
                                            }
                                            if( i > 1) {
                                                $("#" + i + "_customsidebar").removeClass("canvas-delete");
                                            }
                                        }
                                    }
                                    self.renderMouseDown();
                                    self.renderMouseUp();
                                    self.renderMouseOut();
                                     $('#canvas-move').empty();
                                } else {
                                //This is add delete components
                                    $("#1_customsidebar").attr("delete_flag", "delete");
                                    $("#1_customsidebar strong").text( locale.get({lang:"cancleDelete"}));
                                    if( configItem.items && configItem.items.length > 0) {
                                        for( var i = 0; i < configItem.items.length; i++) {
                                            if( $("#0_customsidebar").attr("class") == "canvas-module-item") {
                                                $("#0_customsidebar").addClass("canvas-new");
                                            }
                                            if( i > 0) {
                                                $("#" + i + "_customsidebar").addClass("canvas-delete");
                                            }
                                        }
                                    }
                                     $('#canvas-move').empty();
                                }
                            }
                             $('#canvas-move').empty();
                        });
                        return;
                    } else {
                        //
                    }
                    //==============================================================================================
                    // console.log( "test, clickId", clickId);
                   if ( clickId) {
                        var index = clickId.split("_")[0];
                        var thisId = clickId.split("_")[1];
                    } else {
                        var index = "";
                        var thisId = "";
                    }
                    var toolConfigItems = items[thisId]; //Nts.Module.System.Agent.Configure.drawablePrototypes.items;
                    var config = Nts.Utils.Helper.deepCopyTo({}, toolConfigItems[index]);
                    if (self.clickFlag) { //拖拽
                        //获取鼠标相对全屏的位置
                        var left = do_event.clientX;
                        var top = do_event.clientY;
                        //获取canvas原点相对全屏的位置
                        var point = self.agentCanvasDraw.infoBoard.point;
                        var drawableLeft = left - point.left;
                        var drawableTop = top - point.top;

                        config.x = drawableLeft;
                        config.y = drawableTop;
                    } else { //单击

                        //config.x = 25;
                        //config.y = 10;
                        config.x = 150;
                        config.y = 200;
                    }
                    //console.log("test config,", config);

                    if (!config.width || !config.height) {
                        var imageItem = null;
                        if (config.images) {
                            var elItem = Ext.isArray(config.images) ? config.images[0] : config.images;
                            imageItem = document.getElementById('canvas-image-' + elItem.el);
                        }
                        if (imageItem) {
                            config.width = parseInt(imageItem.width);
                            config.height = parseInt(imageItem.height);
                        }
                    }

                    var drawable = new Nts.Module.Common.Canvas.Drawable(config);
                    // console.log( " , drawable, ", drawable);
                    drawable.z = 1;
                    if (config.url) {
                        // require.ensure('../../../componets/*/element')
                        require(['../../../' + drawable.url + "jslib/element"], function(moduleApp) {
                            if (moduleApp) {
                                drawable.m = new moduleApp({
                                    drawable: drawable
                                });
                            }
                        });
                    }
                    if (drawable.type && drawable.type == '5' || drawable.type == '8' || drawable.type == '9') {
                        var drawables = [];
                        self.agentCanvasDraw.infoBoard.addDrawable(drawable, true);
                        self.agentCanvasDraw.infoBoard.selectedDrawables.push(drawable)
                        drawables.push(drawable);
                        self.agentCanvasDraw.infoBoard.setSelections(drawables, true);
                        self.agentCanvasDraw.onProperty();
                    } else if (drawable.type && drawable.type == '7') {
                        if (drawable.width) {
                            delete drawable.width;
                        }
                        if (drawable.height) {
                            delete drawable.height;
                        }
                        var drawables = [];
                        self.agentCanvasDraw.infoBoard.addDrawable(drawable, true);
                        self.agentCanvasDraw.infoBoard.selectedDrawables.push(drawable)
                        drawables.push(drawable);
                        self.agentCanvasDraw.infoBoard.setSelections(drawables, true);
                    } else {
                        var drawables = [];
                        self.agentCanvasDraw.infoBoard.addDrawable(drawable, true);
                        drawables.push(drawable);
                        self.agentCanvasDraw.infoBoard.setSelections(drawables, true);
                        self.agentCanvasDraw.infoBoard.redrawCanvas();

                        if( drawable.type && drawable.type == 10) {
                            // console.log( "this is type == 10, ", drawable);
                            // drawable.width = 100;
                            // drawable.height = 100;
                            var img_width = drawable.images[0].dom.width;
                            var img_height = drawable.images[0].dom.height;
                            if( img_width > 500 && img_height > 500) {
                                drawable.width = img_width / 5;
                                drawable.height = img_height / 5;
                            } else if( img_width > 200 && img_height > 200) {
                                drawable.width = img_width / 2;
                                drawable.height = img_height /2;
                            } else if( img_width == 0 || img_height == 0){
                                drawable.width = 100;
                                drawable.height = 100;
                            } else {
                                drawable.width = img_width;
                                drawable.height = img_height;
                            }
                            // console.log( "test,", drawable.width, ",height,", drawable.height);
                        }

                        if (drawable.type && drawable.type == '2') {
                            self.agentCanvasDraw.onProperty();
                        } else if (drawable.type == 'text') {
                            //
                        } else {
                            if (drawable.endPoints) {
                                //
                            } else {
                                drawable.endPoints = [];
                                var endPoints = {};
                                endPoints.x = 100;
                                endPoints.y = 50;
                                endPoints.rs = 3;
                                endPoints.cl = 'blue';
                                endPoints.fs = 'orange';
                                drawable.endPoints.push(endPoints);
                            }
                        }
                    }
                    //====================================================================================================
                }

            });
        },
        //点击显示与否
        renderInfo: function() {
            var self = this;
            var width = null;
            var height = null;
            //console.log("renderInfo", self);
            $("#agentcanvas-info-toggler").toggle(function() {
                width = self.agentCanvasDraw.infoBoard.canvas.dom.width;
                height = self.agentCanvasDraw.infoBoard.canvas.dom.height;
                $(window).resize();
                self.agentCanvasDraw.infoBoard.resizeCanvas();
                $('#canvas-move').css("display", "none");

            }, function() {
                self.agentCanvasDraw.infoBoard.canvas.region.width = width;
                self.agentCanvasDraw.infoBoard.canvas.region.height = height;
                $(window).resize();
                self.agentCanvasDraw.infoBoard.resizeDrawableCanvas("toggler");
            });
        },

        destroy: function() {
            //if (this.layout && (!this.layout.destroyed)) this.layout.destroy();
            $('#canvas-move').unbind();
            $('#canvas-move').css("display", "none");
        }
    };
    return AgentCanvasTool;
});