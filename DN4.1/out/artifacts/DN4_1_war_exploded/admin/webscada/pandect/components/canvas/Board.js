define(function(require) {
    // require("../../../../service/schneiderReq");
    // require("./Global");
    require("./Drawable");
    require("../../utils/Helper");

    var Board = {
        initialize: function(options) {
            //$super(options);
            var id = options.id;
            this.el = $("#" + id);
            this.renderBoard();
            //this.infoModule = cloud.util.result(options, "infoBoard");
        },
        renderBoard: function() {
            var self = this;
            Ext.ns('Nts.Module.Common.Canvas');

            Nts.Module.Common.Canvas.Board = function(config) {
                this.drawables = {};
                this.movedStatus = false;
                this.addressDrawables = {};
                this.sortedDrawables = [];
                this.selectedDrawables = [];
                this.readOnlyDrawables = [];
                this.eventDrawables = [];
                this.selectedList = [];
                this.drawingLineStartPoint = {};
                this.drawableIds = {};
                this.polygons = [];
                this.polygonIds = {};
                this.lines = {};
                Nts.Module.Common.Canvas.Board.superclass.constructor.call(this, config);
                //====================缩放
                this.bounds = {};
                this.center = {};
                this.res = null;
                this.zoom = null;
                this.newDrawable = {};
                //======================
                this.circleSelected = null;
                this.pipeSelected = null;
                this.selectLine = false;
                this.pointList = [];
                this.brokenLine = false;
                //点击管道时，鼠标与x,y之间的距离
                this.distanceX = null;
                this.distanceY = null;
            };

            Ext.extend(Nts.Module.Common.Canvas.Board, Ext.Container, {
                canvas: null,
                drawables: null,
                editable: true,
                selectable: true,
                scrollable: true,
                autofit: false,
                draggingDrawable: null,
                resizingDrawable: null,
                connectordragged: false,
                draggingMoved: false,
                resizingMoved: false,
                addressDrawables: null,
                drawingLineStartPoint: null,
                sortedDrawables: null,
                selectedDrawables: null,
                polygons: null,
                lines: null,
                nextDrawableId: 1,
                mousePressed: false,
                drawableResizing: false,
                selectedStarting: false,
                selectedDragMark: false,
                selectedRect: null,
                previousOverItem: null,
                drawingImageData: null,
                //初始化 listener：afterrender->createCanvas()、sortDrawables()、resizeCanvas();
                //beforedestroy->el.removeAllListeners()、destoryCanvas();
                //resize->resizeCanvas();
                initComponent: function() {
                    this.selectedRect = {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 0
                    };

                    this.addEvents('drawableclick');

                    Ext.applyIf(this, {
                        listeners: {
                            'afterrender': function() {
                                this.createCanvas();
                                this.sortDrawables();
                                this.resizeCanvas();
                                Ext.getBody().on('keydown', this.onGlobalKeyDown, this);
                                Ext.getBody().on('keyup', this.onGlobalKeyUp, this);

                                //this.el.on('mousemove', this.onDomMouseMove, this);
                                //this.el.on('mousedown', this.onDomMouseDown, this);
                                //this.el.on('mouseup', this.onDomMouseUp, this);
                            },
                            'beforedestroy': function() {
                                this.el.removeAllListeners();
                                Ext.getBody().un('keydown', this.onGlobalKeyDown, this);
                                Ext.getBody().un('keyup', this.onGlobalKeyUp, this);
                                this.destoryCanvas();
                            },
                            'resize': function() {
                                this.resizeCanvas();
                            }
                        }
                    });

                    Nts.Module.Common.Canvas.Board.superclass.initComponent.call(this);
                },
                // 加载完了之后
                // 加入事件keydown--> onGlobalKeyDown();
                //         keyup
                afterRender: function() {
                    Ext.getBody().on('keydown', this.onGlobalKeyDown, this);
                    Ext.getBody().on('keyup', this.onGlobalKeyUp, this);
                },
                //创建页面Canvas 此处的dom 为一个canvas标签
                // 事件 mousemove', this.onDomMouseMove, this);
                //      mousedown', this.onDomMouseDown, this);
                //      mouseup', this.onDomMouseUp, this);
                createCanvas: function() {
                    var dom = document.createElement('canvas');
                    //el.style.position = 'absolute';
                    //el.style.left = '0px';
                    //el.style.top = '0px';
                    if (!dom.getContext && typeof(G_vmlCanvasManager) != 'undefined') {
                        dom = G_vmlCanvasManager.initElement(dom);
                    }
                    this.canvas = {
                        el: null,
                        dom: dom,
                        width: 800,
                        height: 600,
                        zoom: 100,
                        ctx2d: dom.getContext('2d'),
                        region: {
                            width: 800,
                            height: 600
                        }
                    };
                    if (this.scrollable) {
                        self.el.css("overflow", "auto");
                    }
                    //this.el.dom.appendChild(this.canvas.dom);
                    //this.el.append(this.canvas.dom);
                    self.el.append(this.canvas.dom);
                    this.canvas.el = Ext.get(this.canvas.dom);
                    this.canvas.el.on('mousemove', this.onDomMouseMove, this);
                    this.canvas.el.on('mousedown', this.onDomMouseDown, this);
                    this.canvas.el.on('mouseup', this.onDomMouseUp, this);
                    //this.canvas.el.on('mousewheel', this.wheelChange, this);//鼠标滚轮
                },
                //移除canvas内容
                destoryCanvas: function() {
                    this.drawables = null;
                    this.addressDrawables = null;
                    this.sortedDrawables = null;
                    if (this.canvas) {
                        this.canvas.el.removeAllListeners();
                        if (this.canvas.ctx2d.destroy) {
                            this.canvas.ctx2d.destroy();
                        }
                        this.canvas.ctx2d = null;
                        //self.el.remove(this.canvas.dom);
                        self.el = null;
                        this.canvas = null;
                    }
                },
                //canvas 的大小调整
                resizeDrawableCanvas: function(redraw) {
                    // console.log("resizeDrawableCanvas, redraw,", redraw);
                    if (!this.canvas) {
                        return;
                    }
                    var listX = [];
                    var listY = [];
                    for (var i = 0; i < this.sortedDrawables.length; i++) {
                        var drawable = this.sortedDrawables[i];
                        listX.push(drawable.x);
                        listY.push(drawable.y);
                    }

                    var x = listX.max() + 300;
                    var y = listY.max() + 300;
                    var width = null;
                    var height = null;
                    // var fix_width = "666";
                    /*if ($("#tcontent").attr("flag") == "editScada") {
                        var fix_height = "" + $(".main-sidebar").height() - 50 - 75 + "";
                    } else {
                        var fix_height = "320";
                    }*/
                    // var fix_height = "500";
                    var fix_height = 600;
                    var fix_width = 800;
                    if (redraw == "toggler") {
                        width = Math.max(x ? x : this.canvas.region.width, this.canvas.region.width);
                        height = Math.max(y ? y : this.canvas.region.height, this.canvas.region.height);
                    } else {
                        width = Math.max(x ? x : this.canvas.region.width, parseInt(self.el.css('width')) - 5);
                        height = Math.max(y ? y : this.canvas.region.height, parseInt(self.el.css('height')) - 5);
                    }
                    // console.log( "build");
                    if (this.autofit) {
                        this.canvas.width = this.canvas.dom.width = width;
                        this.canvas.height = this.canvas.dom.height = height;
                        this.canvas.dom.style.width = fix_width + 'px';
                         this.canvas.dom.style.height = fix_height + 'px';
                        // this.canvas.dom.style.width = parseInt(self.el.width) + 'px';
                        // this.canvas.dom.style.height = parseInt(self.el.height) + 'px';
                    } else {
                        this.canvas.width = this.canvas.dom.width = width;
                        this.canvas.height = this.canvas.dom.height = height;
                        this.canvas.dom.style.width = fix_width + 'px';
                         this.canvas.dom.style.height = fix_height + 'px';
                        // this.canvas.dom.style.width = parseInt(width) + 'px';
                        // this.canvas.dom.style.height = parseInt(height) + 'px';
                    }
                    if (redraw !== false) {
                        this.redrawCanvas();
                    }
                    $("#ext-gen4").width( "100%");
                },
                //同上
                resizeCanvas: function(redraw) {
                    // console.log(" move selected canvas'object,resizeCanvas,redraw,",redraw);
                    if (!this.canvas) {
                        return;
                    }
                    // console.log(" this.canvas in resizeCanvas,", this.canvas);
                    var width = Math.max(this.canvas.region.width, parseInt(self.el.css('width')) - 5);
                    var height = Math.max(this.canvas.region.height, parseInt(self.el.css('height')) - 5);
                    // var fix_width = "666";
                    /*if ($("#tcontent").attr("flag") == "editScada") {
                        var fix_height = "" + $(".main-sidebar").height() - 50 - 75 + "";
                    } else {
                        var fix_height = "320";
                    }*/
                    // var fix_height = "500";
                    var fix_height = 600;
                    var fix_width = 800;
                    if (this.autofit) {
                        this.canvas.width = this.canvas.dom.width = width;
                        this.canvas.height = this.canvas.dom.height = height;
                        this.canvas.dom.style.width = fix_width + 'px';
                         this.canvas.dom.style.height = fix_height + 'px';
                        // this.canvas.dom.style.width = parseInt(self.el.width) + 'px';
                        // this.canvas.dom.style.height = parseInt(self.el.height) + 'px';
                    } else {
                        this.canvas.width = this.canvas.dom.width = width;
                        this.canvas.height = this.canvas.dom.height = height;
                         this.canvas.dom.style.width = fix_width + 'px';
                         this.canvas.dom.style.height = fix_height + 'px';
                        // this.canvas.dom.style.width = parseInt(width) + 'px';
                        // this.canvas.dom.style.height = parseInt(height) + 'px';
                    }
                    if (redraw !== false) {
                        //console.log("This is if in resizeCanvas,");
                        this.redrawCanvas();
                    }
                    //==============缩放========start=============
                    this.bounds.left = 0;
                    this.bounds.right = -this.canvas.height / 2;
                    this.bounds.bottom = this.canvas.width / 2;
                    // top add all the time
                    this.bounds.top = this.canvas.height / 2;
                    this.zoom = this.canvas.zoom;
                    this.getRes();
                    this.center = this.getCenter();
                    $("#ext-gen4").width( "100%");
                    //==============缩放=============end========
                    // console.log("this is bounds in redrawCanvas, ", this.bounds)
                },
                //重画canvas
                //for move canvas && delete old && fresh
                redrawCanvas: function() {
                    // console.log("this is redrawCanvas");
                    this.canvas.ctx2d.save();
                    this.canvas.ctx2d.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    // console.log("this.canvas.ctx2d in redrawCanvas,", this.canvas.ctx2d);
                    //网格
                    if (this.editable) {
                        this.drawGrid('lightgray', 10, 10);
                    }

                    for (var i = 0; i < this.sortedDrawables.length; i++) {

                        var drawable = this.sortedDrawables[i];
                        // console.log(", drawable ,", drawable);
                        drawable.redraw(this.canvas.ctx2d);
                        // drawable.drawImage( this.canvas.ctx2d, drawable.images[0]);
                    }


                    if (this.selectedStarting)
                        this.drawSelectingRect();

                    this.canvas.ctx2d.restore();
                    if (this.canvas.ctx2d.redraw) {
                        // for extenstion CanvasContext2D for HTML5
                        this.canvas.ctx2d.redraw();
                    }
                },
                //画网格
                drawGrid: function(color, stepx, stepy) {
                    //console.log("this is drawGrig");
                    this.canvas.ctx2d.strokeStyle = color;
                    this.canvas.ctx2d.fillStyle = '#fff';
                    this.canvas.ctx2d.lineWidth = 0.5;
                    this.canvas.ctx2d.fillRect(0, 0, this.canvas.ctx2d.canvas.width, this.canvas.ctx2d.canvas.height);

                    for (var i = stepx + 0.5; i < 800 /*this.canvas.ctx2d.canvas.width*/; i += stepx) {
                        this.canvas.ctx2d.beginPath();
                        this.canvas.ctx2d.save();
                        this.canvas.ctx2d.moveTo(i, 0);
                        this.canvas.ctx2d.lineTo(i, 600/*this.canvas.ctx2d.canvas.height*/);
                        this.canvas.ctx2d.stroke();
                        this.canvas.ctx2d.restore();
                    }

                    for (var i = stepy + 0.5; i < 600/*this.canvas.ctx2d.canvas.height*/; i += stepy) {
                        this.canvas.ctx2d.beginPath();
                        this.canvas.ctx2d.save();
                        this.canvas.ctx2d.moveTo(0, i);
                        this.canvas.ctx2d.lineTo(/*this.canvas.ctx2d.canvas.width*/ 800, i);
                        this.canvas.ctx2d.stroke();
                        this.canvas.ctx2d.restore();
                    }
                },
                //画canvas
                drawCanvas: function() {
                    //console.log("this is drawCanvas");
                    for (var j = this.sortedDrawables.length - 1; j >= 0; j--) {
                        var draw = this.sortedDrawables[j];

                        draw.images[0].dom = schneider.images[draw.images[0].el];
                        draw.redraw(this.canvas.ctx2d);
                    }
                },
                //画选择框
                drawSelectingRect: function() {
                    //console.log("this is drawSelectingRect");
                    var ctx2d = this.canvas.ctx2d;
                    var x1 = Math.min(this.selectedRect.x1, this.selectedRect.x2);
                    var x2 = Math.max(this.selectedRect.x1, this.selectedRect.x2);
                    var y1 = Math.min(this.selectedRect.y1, this.selectedRect.y2);
                    var y2 = Math.max(this.selectedRect.y1, this.selectedRect.y2);

                    var selectedWidth = x2 - x1;
                    var selectedHeight = y2 - y1;

                    if (selectedWidth > 0 && selectedHeight > 0) {
                        ctx2d.fillStyle = this.selectedRectColor ? this.selectedRectColor : 'rgba(41, 114, 185, .3)';
                        ctx2d.fillRect(x1, y1, selectedWidth, selectedHeight);
                        ctx2d.lineWidth = 1;
                        ctx2d.strokeStyle = this.selectedRectColor ? this.selectedRectColor : '#aaa';
                        ctx2d.strokeRect(x1 - 0.5, y1 - 0.5, selectedWidth + 1, selectedHeight + 1);
                    }
                },
                //根据id 画canvas
                getDrawableById: function(id) {
                    //console.log("this is getDrawableById");
                    return this.drawables[id];
                },
                //根据地点 画canvas
                getDrawableByAddress: function(address) {
                    // console.log("this is getDrawableByAddress");
                    return this.addressDrawables[address];
                },
                //加载数据 drawable
                loadDrawable: function(data, index, redraw) {
                    //console.log("this is loadDrawable");
                    index--;
                    this.len = index;
                    if (index < 0) {
                        this.sortDrawables();
                        // this.resizeDrawableRegion(false);
                        this.resizeCanvas();
                        if (redraw !== false) {
                            this.redrawCanvas();
                        }
                    } else {
                        var item = Nts.Utils.Helper.deepCopyTo({}, data.items[index]); //data.items[i]
                        var drawable = new Nts.Module.Common.Canvas.Drawable(item);
                        drawable.event = {};
                        for (var j = 0; j < this.eventDrawables.length; j++) {
                            var e = this.eventDrawables[j];
                            for (key in e) {
                                drawable.event[key] = e[key];
                            }
                        }
                        if (!drawable.m && !drawable.url) {
                            this.addDrawable(drawable, false);

                        } else {
                            drawable = this.onDomRequireUrl(drawable, data, redraw);
                            // this.addDrawable(drawable, false);
                            this.addDrawable(drawable, false);
                            this.loadDrawable(data, self.len, redraw)
                        }
                    }
                },
                //数据加载
                loadData: function(data, redraw) {
                    //console.log("this is loadData");
                    var self = this;
                    this.drawables = {};
                    this.drawableIds = {};
                    this.addressDrawables = {};
                    this.sortedDrawables = [];
                    this.selectedDrawables = [];
                    this.readOnlyDrawables = [];
                    this.len = data.items.length;
                    // if(data.items.length>0){
                    //     this.loadDrawable(data,data.items.length,redraw);
                    // }
                    for (var i = 0; data.items && i < data.items.length; i++) {
                        var item = Nts.Utils.Helper.deepCopyTo({}, data.items[i]);

                        var drawable = new Nts.Module.Common.Canvas.Drawable(item);
                        drawable.board = this;
                        drawable.event = {};
                        for (var j = 0; j < this.eventDrawables.length; j++) {
                            var e = this.eventDrawables[j];
                            for (key in e) {
                                drawable.event[key] = e[key];
                            }
                        }
                        if (!drawable.m && !drawable.url) {
                            this.addDrawable(drawable, false);
                            continue;
                        }
                        // drawable = this.onDomRequireUrl(drawable);
                        $.ajax({
                            url: setting.host + "/" + drawable.url + "jslib/element.js",
                            dataType: "script",
                            cache: false,
                            async: false
                        }).done(function(moduleApp) {
                            var Element = AgentCanvasTool;
                            if (Element) {
                                Element.initialize({
                                    drawable: drawable
                                });
                                drawable.m = Element;
                            }
                            self.addDrawable(drawable, false);
                        });
                    }
                    this.sortDrawables();
                    // this.resizeDrawableRegion(false);
                    this.resizeCanvas();
                    if (redraw !== false) {
                        this.redrawCanvas();
                    }
                },
                //获取数据
                getData: function() {
                    //console.log("this is getData");
                    var data = {
                        region: Ext.apply({}, this.canvas.region),
                        items: []
                    };
                    for (var i = 0; i < this.sortedDrawables.length; i++) {
                        var drawable = this.sortedDrawables[i];
                        var itemData = drawable.getData();
                        data.items.push(itemData);
                    }
                    return data;
                },
                //增加
                addDrawable: function(drawable, sort) {
                    //console.log("this is addDrawable");
                    var nextId = (this.nextDrawableId++);
                    if (drawable.id) {
                        if (schneider.util.has(this.drawableIds, drawable.id)) {
                            var id = schneider.util.random(1, 1000);
                            while (schneider.util.has(this.drawableIds, id)) {
                                id = schneider.util.random(1, 1000);
                            }
                            drawable.id = id;
                            this.drawableIds[id] = id;
                        } else {
                            this.drawableIds[drawable.id] = drawable.id;
                        }
                    }
                    if (!drawable.id) {
                        var id = schneider.util.random(1, 1000);
                        while (schneider.util.has(this.drawableIds, id)) {
                            id = schneider.util.random(1, 1000);
                        }
                        drawable.id = id;
                        this.drawableIds[id] = id;
                    }
                    drawable.board = this;
                    drawable.mz = 10000 + nextId;
                    this.drawables[drawable.id] = drawable;
                    this.addressDrawables[drawable.address] = drawable;
                    this.sortedDrawables.push(drawable);
                    if (drawable.type == '1' || drawable.type == '3' || drawable.type == '5' || drawable.type == '6' || drawable.type == '7' || drawable.type == '9' || drawable.type == '8') {
                        //console.log("there is add");
                        this.readOnlyDrawables.push(drawable);
                        //去加载固定组件
                        //console.log("drawable.type in addDrawable,", drawable.type);
                        //组件加载
                        var temp_type = drawable.type;
                        if (temp_type == "8" || temp_type == "9" || temp_type == "3" || temp_type == "5" || temp_type == "7" || temp_type == "1") {
                            $.ajax({
                                url: setting.host + "/" + drawable.url + "jslib/element.js",
                                dataType: "script",
                                cache: false,
                                async: false
                            }).done(function(moduleApp) {
                                var Element = AgentCanvasTool;
                                if (Element) {
                                    Element.initialize({
                                        drawable: drawable
                                    });
                                    drawable.m = Element;
                                }
                                /*self.addDrawable(drawable, false);*/
                            });
                        }
                    }
                    if (sort) {
                        this.sortDrawables();
                    }
                },
                //排序
                sortDrawables: function() {
                    //console.log("this is sortDrawables");
                    this.sortedDrawables.sort(function(item1, item2) {
                        if (item2.z != item1.z) {
                            return item2.z - item1.z;
                        } else {
                            return item1.mz - item2.mz;
                        }
                    });
                },
                //得到距离
                getClientXY: function(xy) {
                    //console.log("this is getClientXY");
                    //console.log(xy);
                    var elXY = this.canvas.el.getXY();
                    //this is just for origin address
                    //console.log("elXY",elXY);
                    return [xy[0] - elXY[0], xy[1] - elXY[1]];
                },
                //清空
                clearSelections: function() {
                    //console.log("this is clearSelections");
                    for (var i = 0; i < this.selectedDrawables.length; i++) {
                        var drawable = this.selectedDrawables[i];
                        drawable.selected = false;
                        drawable.dragging = false;
                    }
                    $("#canvas-edit").css("display", "none");
                    this.selectedDrawables = [];
                },
                //删除所选
                deleteSelections: function() {
                    //console.log("this is deleteSelections");
                    if ((!this.selectedDrawables || this.selectedDrawables.length == 0) && !this.selectedLines) {
                        return;
                    }

                    for (var i = 0; i < this.selectedDrawables.length; i++) {
                        var drawable = this.selectedDrawables[i];
                        this.sortedDrawables.remove(drawable);
                        delete this.drawables[drawable.id];
                    }
                    this.deleteConnectorLine();
                    if (this.selectedLines) {
                        this.sortedDrawables.remove(this.selectedLines);
                        this.selectedLines = null;
                    }
                    this.selectedDrawables = [];
                    this.redrawCanvas();
                },
                //删除
                deleteConnectorLine: function() {
                    //console.log("deleteConnectorLine");
                    var drawables = {};
                    for (var j = 0; j < this.selectedDrawables.length; j++) {
                        var drawable = this.selectedDrawables[j];
                        drawables[drawable.id] = drawable;
                    }

                    for (var j = 0; j < this.sortedDrawables.length; j++) {
                        var drawable = this.sortedDrawables[j];
                        if (drawable.type && drawable.type == 4) {
                            if (drawables[drawable.line.p[0].id]) {
                                this.sortedDrawables.remove(drawable);
                                j--;
                                continue;
                            }
                            if (drawables[drawable.line.p[1].id]) {
                                this.sortedDrawables.remove(drawable);
                                j--;
                                continue;
                            }
                        }
                    }
                },
                //移动
                moveSelctions: function(x, y) {
                    //console.log("this is  moveSelctions, x, y,", x, y);
                    if (!this.selectedDrawables || this.selectedDrawables.length == 0) {
                        return;
                    }
                    var drawables = {};
                    for (var j = 0; j < this.selectedDrawables.length; j++) {
                        var drawable = this.selectedDrawables[j];
                        drawables[drawable.id] = drawable;
                    }
                    for (var i = 0; i < this.selectedDrawables.length; i++) {
                        var drawable = this.selectedDrawables[i];
                        drawable.x += x;
                        drawable.y += y;
                    }
                    for (var j = 0; j < this.sortedDrawables.length; j++) {
                        var drawable = this.sortedDrawables[j];
                        if (drawable.type && drawable.type == 4) {
                            if (drawables[drawable.line[0].id]) {
                                drawable.line[0].x += x;
                                drawable.line[0].y += y;
                            }
                            if (drawables[drawable.line[1].id]) {
                                drawable.line[1].x += x;
                                drawable.line[1].y += y;
                            }
                        }
                    }
                    this.redrawCanvas();
                },
                //区域调整
                resizeDrawableRegion: function(redraw) {
                    //console.log("thisi is resizeDrawableRegion, redraw,");
                    var region = {
                        width: 0,
                        height: 0
                    };

                    for (var i = 0; i < this.sortedDrawables.length; i++) {
                        var drawable = this.sortedDrawables[i];
                        if (drawable.type == 5) {
                            region.width = Math.max(region.width, drawable.x + drawable.width + 120);
                            region.height = Math.max(region.height, drawable.y + drawable.height + 120);
                        } else {
                            region.width = Math.max(region.width, drawable.x + drawable.width + 22);
                            region.height = Math.max(region.height, drawable.y + drawable.height + 22);
                        }

                    }
                    this.canvas.region = region;
                    this.resizeCanvas(redraw);
                },
                //放置选择
                setSelections: function(drawables, redraw) {
                    //console.log("this is setSelections");
                    this.clearSelections();
                    for (var i = 0; drawables && i < drawables.length; i++) {
                        var drawable = drawables[i];
                        drawable.selected = true;
                        this.selectedDrawables.push(drawable);
                    }
                    if (redraw !== false) {
                        this.redrawCanvas();
                    }
                },
                //是否存在指定函数
                isExitsFunction: function(funcName) {
                    //console.log("this is isExitsFunction");
                    try {
                        if (typeof(eval(funcName)) == "function") {
                            return true;
                        }
                    } catch (e) {}
                    return false;
                },
                //在绘制面板移动事件
                onDomMouseMove: function(ev, target, options) {
                    //console.log("this is onDomMouseMove");
                    var pos = this.getClientXY(ev.getXY());
                    //console.log("ev in onDomMouseMove,", ev);
                    //console.log("ev.getXY() in onDomMouseMove,", ev.getXY());
                    //console.log("ev.position in onDomMouseMove,");
                    //鼠标当前位置
                    this.point = ev.target.getBoundingClientRect();
                    //console.log(" onDomMouseMove, this.point,",this.point);
                    //console.log(" this is test for parent clien," , ev.target);
                    //console.log("this.canvas.ctx2d",this.canvas.ctx2d);
                    for (var ii = 0; this.polygons && ii < this.polygons.length; ii++) {
                        var polygon = this.polygons[ii];
                        //console.log("polygon,",polygon)
                        if (polygon.$x && polygon.$y) {
                            this.canvas.ctx2d.save();
                            this.canvas.ctx2d.translate(polygon.$x, polygon.$y);
                            this.canvas.ctx2d.rotate(Math.PI * polygon.rotation / 180);
                        }
                        polygon.createPath(this.canvas.ctx2d);
                        if (this.canvas.ctx2d.isPointInPath(pos[0], pos[1])) {
                            self.el.css("cursor", "pointer");
                            polygon.strokeStyle = "#a3cf62";
                            polygon.stroke(this.canvas.ctx2d);
                            polygon.fill(this.canvas.ctx2d);
                            if (this.drawableLine && this.drawableLine.length == 1) {
                                this.redrawCanvas();
                                self.el.css("cursor", "pointer");
                                polygon.strokeStyle = "#a3cf62";
                                polygon.stroke(this.canvas.ctx2d);
                                polygon.fill(this.canvas.ctx2d);
                                this.saveDrawingSurface();
                            }
                        }
                        if (polygon.rotation) {
                            this.canvas.ctx2d.restore();
                        }
                    }
                    if (this.connectordragged) {
                        this.restoreDrawingSurface();
                        this.drawDashedLine(pos);
                        for (var i = this.sortedDrawables.length - 1; i >= 0; i--) {
                            var drawable = this.sortedDrawables[i];
                            if (drawable.isPointInRect(pos[0], pos[1])) {
                                drawable.moveSelected = true;
                                this.redrawCanvas();
                                //drawable.redraw(this.canvas.ctx2d);
                                //this.polygons = drawable.polygons;
                                this.saveDrawingSurface();
                                this.drawDashedLine(pos);
                                break;
                            }
                        }
                        return;
                    }
                    if (this.editable && !this.selectedStarting && !this.connectordragged) {
                        if (this.resizingDrawable && this.mousePressed) {
                            var dx = pos[0] - this.resizingDrawable.mx;
                            var dy = pos[1] - this.resizingDrawable.my;
                            if (!this.resizingDrawable.resizeTo(dx, dy)) {
                                return;
                            }
                            this.resizingMoved = true;
                            this.resizingDrawable.mx = pos[0];
                            this.resizingDrawable.my = pos[1];
                            // this.resizeDrawableRegion( false);
                            this.resizeCanvas();
                            return;
                        }
                        //拖拽组件在画布上移动
                        if (this.draggingDrawable) {
                            var dx = pos[0] - this.draggingDrawable.mx;
                            var dy = pos[1] - this.draggingDrawable.my;

                            var drawables = {};
                            for (var j = 0; j < this.selectedDrawables.length; j++) {
                                var drawable = this.selectedDrawables[j];
                                drawables[drawable.id] = drawable;
                            }

                            for (var j = 0; j < this.selectedDrawables.length; j++) {
                                var drawable = this.selectedDrawables[j];
                                //=======仪表盘move=====================
                                //if(drawable.type && drawable.type == 5){
                                //  self.el.css("cursor","pointer");
                                //  drawable.x=pos[0];
                                //  drawable.y=pos[1];
                                //}else{
                                //  drawable.moveTo(dx, dy);
                                //}
                                //=======水流管道move====================
                                if (drawable.type && drawable.type == 7) {
                                    self.el.css("cursor", "pointer");
                                    drawable.x = pos[0] - this.distanceX;
                                    drawable.y = pos[1] - this.distanceY;
                                } else {
                                    drawable.moveTo(dx, dy);
                                }

                            }
                            for (var j = 0; j < this.sortedDrawables.length; j++) {
                                var drawable = this.sortedDrawables[j];
                                if (drawable.type && drawable.type == 4) {
                                    if (drawables[drawable.line.p[0].id]) {
                                        drawable.line.p[0].x += dx;
                                        drawable.line.p[0].y += dy;
                                    }
                                    if (drawables[drawable.line.p[1].id]) {
                                        drawable.line.p[1].x += dx;
                                        drawable.line.p[1].y += dy;
                                    }
                                }
                            }
                            this.draggingMoved = true;
                            this.draggingDrawable.mx = pos[0];
                            this.draggingDrawable.my = pos[1];
                            // this.resizeDrawableRegion( false);
                            this.resizeCanvas();
                            return;
                        }

                        var matches = 0;
                        //鼠标拖动缩放
                        for (var i = this.sortedDrawables.length - 1; i >= 0; i--) {
                            var drawable = this.sortedDrawables[i];
                            if (drawable.type == 'text') {
                                if (Math.abs(drawable.x + drawable.width - pos[0]) < 2 &&
                                    Math.abs(drawable.y + drawable.height - pos[1]) < 2) {
                                    matches++;
                                    drawable.resizing = 'se';
                                    this.resizingDrawable = drawable;
                                    //this.el.dom.style.cursor = 'se-resize';
                                    self.el.css("cursor", "se-resize");
                                    break;
                                } else if (Math.abs(drawable.x + drawable.width - pos[0]) < 2 &&
                                    drawable.y <= pos[1] &&
                                    drawable.y + drawable.height >= pos[1]) {
                                    matches++;
                                    drawable.resizing = 'east';
                                    this.resizingDrawable = drawable;
                                    //this.el.dom.style.cursor = 'e-resize';
                                    self.el.css("cursor", "e-resize");
                                    break;
                                } else if (Math.abs(drawable.x - pos[0]) < 2 &&
                                    drawable.y <= pos[1] &&
                                    drawable.y + drawable.height >= pos[1]) {
                                    matches++;
                                    drawable.resizing = 'west';
                                    this.resizingDrawable = drawable;
                                    //this.el.dom.style.cursor = 'w-resize';
                                    self.el.css("cursor", "w-resize");
                                    break;
                                } else if (Math.abs(drawable.y + drawable.height - pos[1]) < 2 &&
                                    drawable.x <= pos[0] &&
                                    drawable.x + drawable.width >= pos[0]) {
                                    matches++;
                                    drawable.resizing = 'south';
                                    this.resizingDrawable = drawable;
                                    //this.el.dom.style.cursor = 's-resize';
                                    self.el.css("cursor", "s-resize");
                                    break;
                                } else if (Math.abs(drawable.y - pos[1]) < 2 &&
                                    drawable.x <= pos[0] &&
                                    drawable.x + drawable.width >= pos[0]) {
                                    matches++;
                                    drawable.resizing = 'north';
                                    this.resizingDrawable = drawable;
                                    //this.el.dom.style.cursor = 'n-resize';
                                    self.el.css("cursor", "n-resize");
                                    break;
                                }
                            }

                        }

                        if (this.resizingDrawable && matches == 0) {
                            this.resizingDrawable = null;
                            //this.el.dom.style.cursor = 'default';
                            self.el.css("cursor", "default");
                        }

                        if (matches > 0) {
                            //this.redrawCanvas();
                            return;
                        }
                    }
                    if (this.resizingDrawable) {
                        this.resizingDrawable = null;
                        //this.el.dom.style.cursor = 'default';
                        self.el.css("cursor", "default");
                    }
                    //开始拖选
                    if (this.selectedStarting) {
                        this.selectedRect.x2 = pos[0];
                        this.selectedRect.y2 = pos[1];
                        this.redrawCanvas();
                    } else {
                        if (this.previousOverItem) {
                            //this.previousOverItem.onMouseOut(ev, target, options);
                            this.previousOverItem = null;
                        }
                    }
                    var movedmatches = 0;
                    for (var i = this.sortedDrawables.length - 1; i >= 0; i--) {
                        var drawable = this.sortedDrawables[i];
                        if (drawable.isPointInRect(pos[0], pos[1])) {
                            movedmatches++;
                            if (this.editable) {
                                drawable.moveSelected = true;
                                this.redrawCanvas();
                                //this.polygons = drawable.polygons;
                            }
                            if (this.selectedList.length > 0) {
                                if (this.selectedList[0].id == drawable.id) {
                                    this.movedStatus = false;
                                }
                                if (this.selectedList[0].id != drawable.id) {
                                    this.movedStatus = true;
                                    this.selectedList = [];
                                    this.selectedList.push(drawable);
                                }
                            }

                            if (this.selectedList.length == 0) {
                                this.selectedList.push(drawable);
                                this.movedStatus = true;
                            }
                            //break;
                        }
                    }
                    if (this.editable && !movedmatches) {
                        this.movedStatus = false;
                        this.selectedList = [];
                    }
                    if (!this.editable && this.selectedList.length != 0 && this.movedStatus) {
                        if (this.selectedList.length > 0) {
                            if (this.selectedList[0].event) {
                                if (this.selectedList[0].event.mousemoveon) {
                                    this.selectedList[0].event.mousemoveon.call(this, this.selectedList[0]);
                                }
                            }
                        }
                    }
                    if (!this.editable && !movedmatches) {
                        if (this.selectedList.length > 0) {
                            if (this.selectedList[0].event) {
                                if (this.selectedList[0].event.mousemoveout) {
                                    this.selectedList[0].event.mousemoveout.call(this);
                                    this.selectedList = [];
                                    selectedFlag = false;
                                }
                            }
                        }
                    }
                },
                //重新响应
                onDomRequireUrl: function(drawable, data, redraw) {
                    //console.log("this is onDomRequireUrl");
                    var self = this;
                    if (drawable.url) {
                        //??
                        require(['../../../../../' + drawable.url + 'jslib/element'], function(moduleApp) {
                            if (moduleApp) {
                                moduleApp.initialize({
                                    drawable: drawable
                                });

                                drawable.m = moduleApp;
                            }
                            // self.addDrawable(drawable, false);

                        });
                        return drawable;
                    }
                },
                //================画折线===========start=================
                drawMoreLine: function(point, pos) {
                    //console.log("this is drawMoreLine");
                    var x1 = null;
                    var y1 = null;
                    var x2 = pos[0];
                    var y2 = pos[1];
                    var x3 = null;
                    var y3 = null;
                    if (point.length) {
                        for (var i = 0; i < point.length; i++) {
                            x1 = point[i][0].x;
                            y1 = point[i][0].y;
                            x3 = point[i][1].x;
                            y3 = point[i][1].y;
                        }
                    }
                    this.drawLine(x1, y1, x2, y2);
                    this.drawLine(x2, y2, x3, y3);
                    this.brokenLine = true;
                },
                drawLine: function(x1, y1, x2, y2) {
                    //console.log("this is drawLine");
                    var dashLength = 5;
                    var deltaX = x2 - x1;
                    var deltaY = y2 - y1;
                    var numDashes = Math.floor(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / dashLength);
                    this.canvas.ctx2d.beginPath();
                    this.canvas.ctx2d.lineWidth = 3;
                    for (var i = 0; i < numDashes; ++i) {
                        this.canvas.ctx2d[i % 2 === 0 ? 'moveTo' : 'lineTo']
                            (x1 + (deltaX / numDashes) * i, y1 + (deltaY / numDashes) * i);
                    }
                    this.canvas.ctx2d.stroke();
                },
                //================画折线===========end=================
                saveDrawingSurface: function() {
                    //console.log("this is saveDrawingSurface");
                    this.drawingImageData = this.canvas.ctx2d.getImageData(0, 0, this.canvas.width, this.canvas.height);
                },
                restoreDrawingSurface: function() {
                    //console.log("this is restoreDrawingSurface");
                    this.canvas.ctx2d.putImageData(this.drawingImageData, 0, 0);
                },
                //复原
                drawDashedLine: function(pos) {
                    //console.log(" this is drawDashedLine");
                    var dashLength = 5;
                    var x1 = this.drawingLineStartPoint.x;
                    var y1 = this.drawingLineStartPoint.y;
                    var x2 = pos[0];
                    var y2 = pos[1];
                    this.drawLine(x1, y1, x2, y2);
                },
                //橡胶环形
                drawRubberbandShape: function(endPolygon) {
                    this.canvas.ctx2d.beginPath();
                    this.canvas.ctx2d.lineWidth = 2;
                    var x1 = this.drawingLineStartPoint.x;
                    var y1 = this.drawingLineStartPoint.y;
                    this.canvas.ctx2d.moveTo(x1, y1);
                    this.canvas.ctx2d.lineTo(endPolygon.x, endPolygon.y);
                    this.canvas.ctx2d.stroke();
                },
                // 按下
                onDomMouseDown: function(ev, target, options) {
                    //console.log(" this is onDomMouseDown");
                    //console.log("on onDomMouseDown, ev,", ev, ",target,", target,",options,", options);
                    var pos = this.getClientXY(ev.getXY());
                    var point = ev.target.getBoundingClientRect();
                    //console.log("onDomMouseDown Board,", pos, ",point,",point);
                    this.mousePressed = true;
                    if (target != this.canvas.dom) {
                        return;
                    }

                    this.circleSelected = false;
                    this.pipeSelected = false;
                    for (var ii = 0; ii < this.polygons.length; ii++) {
                        var polygon = this.polygons[ii];
                        if (polygon.$x && polygon.$y) {
                            this.canvas.ctx2d.save();
                            this.canvas.ctx2d.translate(polygon.$x, polygon.$y);
                            this.canvas.ctx2d.rotate(Math.PI * polygon.rotation / 180);
                        }
                        polygon.createPath(this.canvas.ctx2d);
                        if (this.canvas.ctx2d.isPointInPath(pos[0], pos[1])) {
                            this.drawableLine = [];
                            this.drawableLine.push({
                                x: polygon.rotation ? pos[0] : polygon.x,
                                y: polygon.rotation ? pos[1] : polygon.y,
                                id: polygon.id
                            });
                            this.connectordragged = true;
                            this.drawingLineStartPoint.x = polygon.rotation ? pos[0] : polygon.x;
                            this.drawingLineStartPoint.y = polygon.rotation ? pos[1] : polygon.y;
                            this.saveDrawingSurface();
                        }

                        if (polygon.rotation) {
                            this.canvas.ctx2d.restore();
                        }

                        if (this.connectordragged) {
                            return;
                        }
                    }
                    if (this.editable && this.resizingDrawable) {
                        this.resizingDrawable.mx = pos[0];
                        this.resizingDrawable.my = pos[1];
                        return;
                    }

                    var matches = 0;
                    var multiMode = (ev.ctrlKey || ev.shiftKey);

                    this.selectedLines = null;
                    for (var ii = this.sortedDrawables.length - 1; ii >= 0; ii--) {
                        var drawable = this.sortedDrawables[ii];

                        if (drawable.type == 4) {
                            var x1 = drawable.line.p[0].x;
                            var y1 = drawable.line.p[0].y;
                            var x2 = drawable.line.p[1].x;
                            var y2 = drawable.line.p[1].y;
                            var deltaX = x2 - x1;
                            var deltaY = y2 - y1;
                            var lineLen = Math.floor(Math.sqrt(deltaX * deltaX + deltaY * deltaY));
                            var deltaX1 = pos[0] - drawable.line.p[0].x;
                            var deltaY1 = pos[1] - drawable.line.p[0].y;
                            var posLine1 = Math.floor(Math.sqrt(deltaX1 * deltaX1 + deltaY1 * deltaY1));
                            var deltaX2 = pos[0] - drawable.line.p[1].x;
                            var deltaY2 = pos[1] - drawable.line.p[1].y;
                            var posLine2 = Math.floor(Math.sqrt(deltaX2 * deltaX2 + deltaY2 * deltaY2));
                            var posLine = posLine1 + posLine2;

                            if (!(posLine - lineLen < 2 || posLine == lineLen)) {
                                if (this.lines[drawable.id]) {
                                    delete this.lines[drawable.id];
                                }
                                drawable.line.se = "#000000";
                                continue;
                            }

                            this.lines[drawable.id] = drawable;
                            drawable.line.se = "orange";
                            this.selectedLines = this.lines[drawable.id];
                            continue;
                        }
                        //============选中水流管道=========================
                        if (drawable.type == 7 && this.editable) {

                            this.distanceX = pos[0] - drawable.x;
                            this.distanceY = pos[1] - drawable.y;

                            var pipeW = null;
                            var pipeH = null;
                            if (drawable.m.pipeTo == 1) {
                                pipeW = drawable.pipeW ? drawable.pipeW : this.canvas.width * 0.4;
                                pipeH = drawable.pipeH ? drawable.pipeH : 20;
                            } else {
                                pipeW = drawable.pipeW ? drawable.pipeW : 20;
                                pipeH = drawable.pipeH ? drawable.pipeH : this.canvas.width * 0.4;
                            }

                            if (pos[0] >= drawable.x && pos[0] <= (drawable.x + pipeW) && pos[1] >= drawable.y && pos[1] <= (drawable.y + pipeH)) {
                                this.clearSelections();
                                // drawable.selected = true;
                                this.selectedDrawables.push(drawable);
                                this.pipeSelected = true;
                                this.selectedStarting = false;
                                this.draggingDrawable = drawable;
                                drawable.moveSelected = false;

                                this.canvas.ctx2d.save();
                                this.canvas.ctx2d.lineWidth = 1;
                                this.canvas.ctx2d.strokeStyle = "#0000C0";
                                this.canvas.ctx2d.strokeRect(drawable.x - 1.5, drawable.y - 1.5, pipeW + 3, pipeH + 3);
                                this.canvas.ctx2d.restore();

                                $("#toolbar-scada-delete-el-button").show();
                                $("#toolbar-scada-edit-button").show();
                                $("#toolbar-scada-stackingOrder-button").hide();
                                $("#toolbar-scada-stackingUp-button").hide();
                                $("#toolbar-scada--rotation-button").hide();
                                $("#toolbar-scada--copyPast-button").hide();
                                $("#toolbar-text-edit-button").hide();
                                $("#toolbar-text-bold-button").hide();
                                $("#text-bar").hide();
                                $("#textFont-bar").hide();
                                $("#canvas-edit").addClass("canvas-edit");
                                if (this.canvas.width - (drawable.x + point.left + pipeW) > 151) {
                                    $(".canvas-edit").css("left", drawable.x + point.left + pipeW);
                                } else {
                                    $(".canvas-edit").css("left", drawable.x + point.left - 151);
                                }
                                $(".canvas-edit").css("top", drawable.y + point.top);
                                $(".canvas-edit").css("padding-right", "151");
                                $(".canvas-edit").css("padding-bottom", "23");
                                $("#canvas-edit").css("display", "block");
                                return;
                            }
                        }

                        //====================================================================
                        if (!drawable.isPointInRect(pos[0], pos[1])) {
                            drawable.moveSelected = false;
                            continue;
                        }
                        matches++;
                        if (drawable.selected) {
                            if (ev.ctrlKey) {
                                this.draggingDrawable = null;
                                drawable.selected = false;
                                this.selectedDrawables.remove(drawable);
                            }
                        } else {
                            if (!multiMode) {
                                this.clearSelections();
                            }
                            drawable.selected = true;
                            this.selectedDrawables.push(drawable);
                            this.fireEvent('drawableclick', this, drawable, ev);
                            this.connectordragged = false;
                        }
                        if (drawable.selected) {
                            drawable.mx = pos[0];
                            drawable.my = pos[1];
                            this.draggingDrawable = drawable;
                            self.el.css('cursor', 'move');
                            //this.el.dom.style.cursor = 'move';
                        }
                        break;
                    }
                    if (this.selectedLines && this.editable) {
                        $("#toolbar-scada-edit-button").hide();
                        $("#toolbar-scada--rotation-button").hide();
                        $("#toolbar-scada--copyPast-button").hide();
                        $("#toolbar-scada-delete-el-button").show();
                        $("#toolbar-text-edit-button").hide();
                        $("#toolbar-text-bold-button").hide();
                        $("#text-bar").hide();
                        $("#textFont-bar").hide();
                        $("#toolbar-scada-stackingOrder-button").hide();
                        $("#toolbar-scada-stackingUp-button").hide();
                        $("#canvas-edit").addClass("canvas-edit");
                        //var point=ev.target.getBoundingClientRect();
                        $(".canvas-edit").css("left", this.selectedLines.line.p[0].x + point.left);
                        $(".canvas-edit").css("top", this.selectedLines.line.p[0].y + point.top);
                        $(".canvas-edit").css("padding-right", "151");
                        $(".canvas-edit").css("padding-bottom", "23");
                        $("#canvas-edit").css("display", "block");
                    }

                    if (matches > 0) {
                        this.redrawCanvas();
                        return;
                    }
                    if (this.selectedStarting || !this.selectable) {
                        return;
                    }
                    this.connectordragged = false;
                    this.selectedStarting = true;
                    this.selectedRect.x1 = pos[0];
                    this.selectedRect.y1 = pos[1];
                    this.selectedRect.x2 = pos[0];
                    this.selectedRect.y2 = pos[1];
                    if (!multiMode && !this.selectedLines) {
                        this.clearSelections();
                    }

                    this.redrawCanvas();
                },
                //松开
                onDomMouseUp: function(ev, target, options) {
                    //console.log("this is onDomMouseUp");
                    var pos = this.getClientXY(ev.getXY());
                    // console.log("this is onDomMouseUp, ev,", ev, ",target,", target, ",options,", options);
                    // console.log("this is onDomMouseUp, pos,", pos);
                    // console.log("changed, pos", pos);
                    // if( ev.button != 0 || target != this.canvas.dom )
                    // {
                    //   return;
                    // }

                    if (target != this.canvas.dom) {
                        return;
                    }
                    this.canvas.dom.focus();
                    this.mousePressed = false;
                    this.resizingDrawable = null;
                    this.draggingDrawable = null;
                    //this.el.dom.style.cursor = 'default';
                    self.el.css('cursor', 'default');
                    // current selected elements
                    if (this.selectedDrawables[0]) {
                        var move_seleted = this.selectedDrawables[0];
                        var move_seleted_height = this.selectedDrawables[0].height;
                        var move_seleted_width = this.selectedDrawables[0].width;
                    }
                    if (this.connectordragged) {
                        for (var ii = 0; ii < this.polygons.length; ii++) {
                            var polygon = this.polygons[ii];
                            if (polygon.$x && polygon.$y) {
                                this.canvas.ctx2d.save();
                                this.canvas.ctx2d.translate(polygon.$x, polygon.$y);
                                this.canvas.ctx2d.rotate(Math.PI * polygon.rotation / 180);
                            }

                            polygon.createPath(this.canvas.ctx2d);
                            if (this.canvas.ctx2d.isPointInPath(pos[0], pos[1])) {
                                if (this.drawableLine[0].id != polygon.id) {
                                    this.drawableLine.push({
                                        x: polygon.rotation ? pos[0] : polygon.x,
                                        y: polygon.rotation ? pos[1] : polygon.y,
                                        id: polygon.id
                                    });
                                    this.connectordragged = false;
                                    this.restoreDrawingSurface();
                                    polygon.x = polygon.rotation ? pos[0] : polygon.x;
                                    polygon.y = polygon.rotation ? pos[1] : polygon.y;
                                    this.drawRubberbandShape(polygon);
                                    var line = {};
                                    line.w = 3;
                                    line.se = "#000000";
                                    line.p = this.drawableLine;
                                    var config = {};
                                    config.x = this.drawableLine[0].x;
                                    config.y = this.drawableLine[0].y;
                                    config.line = line;
                                    config.type = 4;
                                    // console.log("test for config,", config);
                                    //
                                    if (config.x < 0) {
                                        config.x = move_seleted_width;
                                    }
                                    if (config.y < 0) {
                                        config.y = move_seleted_height;
                                    }
                                    // console.log("after, config,", config);
                                    var drawable = new Nts.Module.Common.Canvas.Drawable(config);
                                    drawable.z = 1;
                                    this.addDrawable(drawable, true);
                                }
                            }
                            if (polygon.rotation) {
                                this.canvas.ctx2d.restore();
                            }
                            this.redrawCanvas();
                            if (!this.connectordragged) {
                                this.redrawCanvas();
                                break;
                            }

                        }

                        if (this.connectordragged) {
                            this.restoreDrawingSurface();
                            this.connectordragged = false;
                        }
                        return;
                    }
                    //=======仪表盘up====================
                    if (this.circleSelected) {
                        this.canvas.dom.focus();
                        this.mousePressed = false;
                        this.resizingDrawable = null;
                        this.draggingDrawable = null;
                        self.el.css('cursor', 'default');
                        $("#canvas-edit").css("display", "block");
                        return;
                    }
                    //=======水流管道up====================
                    if (this.pipeSelected) {
                        this.canvas.dom.focus();
                        this.mousePressed = false;
                        this.resizingDrawable = null;
                        this.draggingDrawable = null;
                        self.el.css('cursor', 'default');
                        $("#canvas-edit").css("display", "block");
                        return;
                    }
                    for (var i = this.sortedDrawables.length - 1; i >= 0; i--) {
                        var drawable = this.sortedDrawables[i];
                    }
                    var multiMode = (ev.ctrlKey || ev.shiftKey);
                    // console.log("this.selectable in redrawCanvas,", this.selectable);
                    if (this.selectable && !this.selectedStarting) {
                        var matches = 0;
                        for (var i = this.sortedDrawables.length - 1; i >= 0; i--) {
                            var drawable = this.sortedDrawables[i];

                            if (!drawable.isPointInRect(pos[0], pos[1])) {
                                continue;
                            }

                            matches++;
                            if (!multiMode && !this.draggingMoved) {
                                if (!drawable.type || (drawable.type && drawable.type != 4)) {
                                    this.clearSelections();
                                    drawable.selected = true;
                                    this.selectedDrawables.push(drawable);
                                }
                            }

                            var lineFlag = true;
                            for (var j = 0; j < this.sortedDrawables.length; j++) {
                                var drawableLine = this.sortedDrawables[j];
                                if (drawableLine.type && drawableLine.type == 4) {
                                    if (drawableLine.line.p && drawableLine.line.p.length > 0) {
                                        for (var ii = 0; ii < drawableLine.line.p.length; ii++) {
                                            if (drawableLine.line.p[ii].id == drawable.id) {
                                                lineFlag = false;
                                                break;
                                            }
                                        }
                                    }

                                }
                            }
                            //---------------------------------------------------------------------------
                            if (this.editable && drawable.isPointInRect(pos[0], pos[1]) && !this.connectordragged) {
                                if (drawable.type == 'text') {
                                    $("#toolbar-scada-delete-el-button").show();
                                    $("#toolbar-text-edit-button").show();
                                    $("#toolbar-text-bold-button").show();
                                    $("#textFont-bar").show();
                                    $("#text-bar").hide();
                                    $("#toolbar-scada--copyPast-button").hide();
                                    $("#toolbar-scada--rotation-button").hide();
                                    $("#toolbar-scada-stackingOrder-button").hide();
                                    $("#toolbar-scada-stackingUp-button").hide();
                                    $("#toolbar-scada-edit-button").hide();
                                    $("#textFont option").each(function() {
                                        if ($(this).text() == drawable.titles[0].size) {
                                            $(this).attr("selected", "selected");
                                        }
                                    });

                                } else if (drawable.type == '5') {
                                    $("#toolbar-scada-delete-el-button").show();
                                    $("#toolbar-scada-edit-button").show();
                                    $("#toolbar-scada-stackingOrder-button").show();
                                    $("#toolbar-scada-stackingUp-button").show();
                                    $("#toolbar-scada--rotation-button").hide();
                                    $("#toolbar-scada--copyPast-button").hide();
                                    $("#toolbar-text-edit-button").hide();
                                    $("#toolbar-text-bold-button").hide();
                                    $("#text-bar").hide();
                                    $("#textFont-bar").hide();
                                } else {
                                    $("#toolbar-scada-delete-el-button").show();
                                    $("#toolbar-scada-edit-button").show();
                                    $("#toolbar-scada--copyPast-button").show();
                                    $("#toolbar-scada-stackingOrder-button").show();
                                    $("#toolbar-scada-stackingUp-button").show();
                                    if (lineFlag) {
                                        $("#toolbar-scada--rotation-button").show();
                                    } else {
                                        $("#toolbar-scada--rotation-button").hide();
                                    }
                                    $("#toolbar-text-edit-button").hide();
                                    $("#toolbar-text-bold-button").hide();
                                    $("#text-bar").hide();
                                    $("#textFont-bar").hide();
                                }
                                $("#canvas-edit").addClass("canvas-edit");
                                var point = ev.target.getBoundingClientRect();
                                var canvasWidth = this.canvas.width;
                                var width = drawable.displayScale ? parseInt((drawable.displayScale / 100) * drawable.width) : drawable.width;
                                if (canvasWidth - (drawable.x + point.left + drawable.width) > 151) {
                                    $(".canvas-edit").css("left", drawable.x + point.left + width);
                                } else {
                                    $(".canvas-edit").css("left", drawable.x + point.left - 151);
                                }
                                $(".canvas-edit").css("top", drawable.y + point.top);
                                $(".canvas-edit").css("padding-right", "151"); //drawable.width
                                $(".canvas-edit").css("padding-bottom", "23"); //drawable.height
                                $("#canvas-edit").css("display", "block");
                            }
                            //---------------------------------------------------------------------------
                            break;
                        }
                        if (!this.editable && this.selectedDrawables.length > 0) {
                            if (this.selectedDrawables[0].event) {
                                if (this.selectedDrawables[0].event.click) {
                                    this.selectedDrawables[0].event.click.call(this, this.selectedDrawables[0]);
                                }
                            }
                        }
                        if (matches > 0) {
                            this.draggingMoved = false;
                            this.resizingMoved = false;
                            this.redrawCanvas();
                            return;
                        }
                    }
                    if (!multiMode && !this.selectedLines) {
                        this.clearSelections();
                    }

                    this.draggingMoved = false;
                    this.resizingMoved = false;
                    if (!this.selectedStarting || !this.selectable) {
                        return;
                    }
                    // console.log("test point 1");
                    this.selectedStarting = false;
                    if (this.selectedDrawables.length == 0 &&
                        this.selectedRect.x1 == this.selectedRect.x2 &&
                        this.selectedRect.y1 == this.selectedRect.y2) {
                        // no selections and position not changed
                        return;
                    }
                    // console.log("this is selectedRect in redrawCanvas,", this.selectedRect);
                    var x1 = Math.min(this.selectedRect.x1, this.selectedRect.x2);
                    var x2 = Math.max(this.selectedRect.x1, this.selectedRect.x2);
                    var y1 = Math.min(this.selectedRect.y1, this.selectedRect.y2);
                    var y2 = Math.max(this.selectedRect.y1, this.selectedRect.y2);

                    for (var i = this.sortedDrawables.length - 1; i >= 0; i--) {
                        var drawable = this.sortedDrawables[i];
                        if (!drawable.isInRect(x1, y1, x2, y2)) {
                            continue;
                        }

                        if (!drawable.type) {
                            drawable.type = 0;
                        }

                        if (!drawable.selected && drawable.type != 4) {
                            drawable.selected = true;
                            this.selectedDrawables.push(drawable);
                        }

                    }
                    //---------------------------------------------------------------------------

                    if (this.editable && this.selectedDrawables.length > 0) {

                        if (this.selectedDrawables.length > 1) {
                            //隐藏编辑按钮和旋转按钮
                            $("#toolbar-scada-edit-button").hide();
                            $("#toolbar-scada--rotation-button").hide();
                            $("#toolbar-scada-stackingOrder-button").hide();
                            $("#toolbar-scada-stackingUp-button").hide();
                            $("#toolbar-text-edit-button").hide();
                            $("#toolbar-text-bold-button").hide();
                            $("#text-bar").hide();
                            $("#textFont-bar").hide();
                            $("#toolbar-scada-delete-el-button").show();
                        }
                        var drawable = this.selectedDrawables[0];
                        var point = ev.target.getBoundingClientRect();
                        var canvasWidth = this.canvas.width;
                        if (canvasWidth - (drawable.x + point.left + drawable.width) > 151) {
                            $(".canvas-edit").css("left", drawable.x + point.left + drawable.width);
                        } else {
                            $(".canvas-edit").css("left", drawable.x + point.left - 151);
                        }
                        $(".canvas-edit").css("top", drawable.y + point.top);
                        $(".canvas-edit").css("padding-right", "151"); //drawable.width
                        $(".canvas-edit").css("padding-bottom", "23"); //drawable.height
                        $("#canvas-edit").css("display", "block");
                    }
                    this.redrawCanvas();
                },
                getResFromZoom: function(zoom) {
                    //console.log("this is getResFromZoom");
                    return res = 1 / (zoom / 100);
                },
                getPositionFromPx: function(px) {
                    //console.log(" this is getPositionFromPx");
                    var zoomPoint = {};
                    zoomPoint.x = (px.x + this.bounds.left / this.res) * this.res;
                    zoomPoint.y = (this.bounds.top / this.res - px.y) * this.res;
                    return zoomPoint;
                },
                getRes: function() {
                    //console.log("this is getRes");
                    this.res = 1 / (this.zoom / 100);
                    return this.res;
                },
                wheelChange: function(ev) {
                    //console.log("this is wheelChange");
                    var e = ev.browserEvent;
                    var delta = (e.wheelDelta / 120) * 10;

                    var deltalX = this.canvas.width / 2 - (e.offsetX || e.layerX);
                    var deltalY = (e.offsetY || e.layerY) - this.canvas.height / 2;

                    //鼠标的位置
                    var px = {
                        x: (e.offsetX || e.layerX),
                        y: (e.offsetY || e.layerY)
                    };
                    var zoomPoint = this.getPositionFromPx(px);

                    var zoom = this.zoom + delta;
                    var newRes = this.getResFromZoom(zoom);

                    //缩放的中心点
                    var center = {};
                    center.x = zoomPoint.x + deltalX * newRes;
                    center.y = zoomPoint.y + deltalY * newRes;

                    this.moveTo(center, zoom, px);

                    this.stopEventBubble(e);
                },
                moveTo: function(center, zoom, px) {
                    //console.log("this is moveTo");
                    if (zoom <= 0) {
                        return;
                    }
                    //console.log("moveTo", center, zoom, px);
                    this.zoom = zoom;
                    this.center = center;
                    var res = this.getRes();
                    var width = this.canvas.width * res;

                    var height = this.canvas.height * res;

                    var bounds = this.Bounds(center.x - width / 2, center.y - height / 2, center.x + width / 2, center.y + height / 2);
                    this.bounds = bounds;

                    this.redrawCanvaswheel();

                },
                //得到中心点
                getCenter: function() {
                    //console.log("this is getCenter");
                    var center = {};
                    var w = this.bounds.right - this.bounds.left;
                    var h = this.bounds.top - this.bounds.bottom;
                    center.x = this.bounds.left + w / 2;
                    center.y = this.bounds.bottom + h / 2;
                    return center;
                },
                //界限
                Bounds: function(x1, x2, y1, y2) {
                    //console.log("this is Bounds");
                    var bounds = {};
                    bounds.left = x1;
                    bounds.right = x2;
                    bounds.bottom = y1;
                    bounds.top = y2;
                    return bounds;
                },
                redrawCanvaswheel: function() {
                    //console.log("this is redrawCanvaswheel");
                    this.canvas.ctx2d.save();
                    this.canvas.ctx2d.clearRect(0, 0, this.canvas.width, this.canvas.height);

                    for (var i = 0; i < this.sortedDrawables.length; i++) {
                        var drawable = this.sortedDrawables[i];
                        var extent = this.bounds;
                        drawable.newDrawable_x = (drawable.x / this.res + (-extent.left / this.res));
                        drawable.newDrawable_y = ((extent.top / this.res) - (extent.top - drawable.y) / this.res);

                        drawable.redraw(this.canvas.ctx2d);
                    }

                    if (this.selectedStarting) {
                        this.drawSelectingRect();
                    }

                    this.canvas.ctx2d.restore();
                    if (this.canvas.ctx2d.redraw) {
                        // for extenstion CanvasContext2D for HTML5
                        this.canvas.ctx2d.redraw();
                    }
                },
                //冒泡事件的阻止
                stopEventBubble: function(e) {
                    if (e.preventDefault) {
                        e.preventDefault();
                    } else {
                        e.returnValue = false;
                    }
                    if (e && e.stopPropagation) {
                        e.stopPropagation();
                    } else {
                        window.event.cancelBubble = true;
                    }
                },
                onGlobalKeyDown: function(ev) {
                    if (this.selectedDrawables.length == 0) {
                        return;
                    }
                    switch (ev.keyCode) {
                        case Ext.EventObject.UP:
                            this.moveSelctions(0, -1);
                            break;
                        case Ext.EventObject.DOWN:
                            this.moveSelctions(0, 1);
                            break;
                        case Ext.EventObject.RIGHT:
                            this.moveSelctions(1, 0);
                            break;
                        case Ext.EventObject.LEFT:
                            this.moveSelctions(-1, 0);
                            break;
                        default:
                            break;
                    }
                },
                onGlobalKeyUp: function(ev) {
                    if (this.selectedDrawables.length == 0) {
                        return;
                    }
                    switch (ev.keyCode) {
                        case Ext.EventObject.DELETE:
                            this.deleteSelections();
                            break;
                        default:
                            break;
                    }
                }
            });
        }
    };
    return Board;
});