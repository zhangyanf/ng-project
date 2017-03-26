/**
 * Created by zengqiang on 2017/3/1.
 */
(function($) {
    //分页工具模板
    var _pagingTemplate=function (obj,opt) {
        var _this=this;
        var template='' +
            '<div class="box-footer clearfix">' +
            '   <div class="row">' +
                
            '      <div class="col-sm-5">' +
            '         <small lang="text:per_page">每页显示 </small>' +
            '         <label class="disabled">' +
            '            <select class="form-control input-sm">' +
            '               <option value="30" selected="selected">30</option>' +
            '               <option value="50">50</option>' +
            '               <option value="100">100</option>' +
            '            </select>' +
            '          </label>,' +
            '          <small lang="text:total_item"> 共</small>' +
            '          <small class="total_items"> </small>' +
            '          <small lang="text:items"> 条</small>' +
            '      </div>' +
            '      <div class="col-sm-7">' +
            '          <ul class="pagination pagination-sm no-margin  pull-right">' +

            '             <li class="pagination-jump-li" style="padding-left: 10px;">' +
            '                  <label>' +
            '                      <div class="input-group input-group-sm" style="width: 90px;">' +
            '                          <input type="text" class="form-control pull-right" style="text-align: center;" lang="placeholder:page">' +
            '                           <div class="input-group-btn">' +
            '                               <button type="button" class="btn btn-default" lang="text:go"><i class="icon-caret-right"></i></button>' +
            '                           </div>' +
            '                      </div>' +
            '                  </label>' +
            '             </li>' +
            '          </ul>' +
            '      </div>'+
                
            '   </div>' +
            '</div>';
        return template;
    };

    var toolOption={
        init:function (obj, opt) {
            return (function(){
                toolOption.fill_pageHtml(obj,opt);
                toolOption.bindEvent_paging(obj,opt);
            })();
        },
        //绘制分页html框架
        fill_pageHtml:function (obj,opt) {
            return (function(){
                var html=_pagingTemplate.call(this,obj,opt);
                obj.append(html);
                locale.render({element: "#init_body"});
            })();
        },
        //填充分页数据
        fill_pageData:function (obj,pageTotal, pageNow) {
            return (function () {
                obj.find(".col-sm-7 > ul > .pagination-jump-li").prevAll().remove();
                var pg1;
                var pg2 = "";
                var pg3;
                var page;

                if (pageNow == 1) {
                    pg1 = "<li class='disabled'><span aria-hidden='true' data-pageoption='previous_page'><i class='glyphicon glyphicon-backward' data-toggle='tooltip' title='上一页' lang='title:previous_page'></i></span></li>";
                } else {
                    pg1 = "<li><span aria-hidden='true' data-pageoption='previous_page'><i class='glyphicon glyphicon-backward' data-toggle='tooltip' title='上一页' lang='title:previous_page'></i></span></li>";
                }
                if (pageNow == pageTotal) {
                    pg3 = "<li class='disabled'><span aria-hidden='true' data-pageoption='next_page'><i class='glyphicon glyphicon-forward' data-toggle='tooltip' title='下一页' lang='title:next_page'></i></span></li>";
                } else {
                    pg3 = "<li><span aria-hidden='true' data-pageoption='next_page'><i class='glyphicon glyphicon-forward' data-toggle='tooltip' title='下一页' lang='title:next_page'></i></span></li>";
                }

                if (pageTotal > 7) {
                    if (pageNow > 4) {
                        pg2 = pg2 + "<li><span>" + "1" + "</span></li>";
                        pg2 = pg2 + "<li><span>" + "2" + "</span></li>";
                        pg2 = pg2 + "<li  class='disabled'><span>......</span></li>";
                        if (pageTotal == 8) {
                            for (var i3 = 4; i3 <= 8; i3++) {
                                if (i3 == pageNow) {
                                    pg2 = pg2 + "<li  class='active'><span>" + i3 + "</span></li>";
                                } else {
                                    pg2 = pg2 + "<li><span>" + i3 + "</span></li>";
                                }
                            }
                        } else {
                            if ((pageTotal - pageNow) >= 4) {
                                pg2 = pg2 + "<li><span>" + (pageNow - 1) + "</span></li>";
                                pg2 = pg2 + "<li class='active'><span>" + pageNow + "</span></li>";
                                pg2 = pg2 + "<li><span>" + (pageNow + 1) + "</span></li>";
                                pg2 = pg2 + "<li  class='disabled'><span>......</span></li>";
                                pg2 = pg2 + "<li><span>" + (pageTotal - 1) + "</span></li>";
                                pg2 = pg2 + "<li><span>" + pageTotal + "</span></li>";
                            } else {
                                for (var i4 = pageTotal - 4; i4 <= pageTotal; i4++) {
                                    if (i4 == pageNow) {
                                        pg2 = pg2 + "<li  class='active'><span>" + i4 + "</span></li>";
                                    } else {
                                        pg2 = pg2 + "<li><span>" + i4 + "</span></li>";
                                    }
                                }
                            }
                        }
                    } else {
                        for (var i2 = 1; i2 <= 5; i2++) {
                            if (i2 == pageNow) {
                                pg2 = pg2 + "<li  class='active'><span>" + i2 + "</span></li>";
                            } else {
                                pg2 = pg2 + "<li><span>" + i2 + "</span></li>";
                            }
                        }
                        pg2 = pg2 + "<li  class='disabled'><span>......</span></li>";
                        pg2 = pg2 + "<li><span>" + (pageTotal - 1) + "</span></li>";
                        pg2 = pg2 + "<li><span>" + pageTotal + "</span></li>";
                    }
                } else {
                    for (var i = 1; i <= pageTotal; i++) {
                        if (i == pageNow) {
                            pg2 = pg2 + "<li  class='active'><span>" + i + "</span></li>";
                        } else {
                            pg2 = pg2 + "<li><span>" + i + "</span></li>";
                        }
                    }
                }

                page = pg1 + pg2 + pg3;
                obj.find(".col-sm-7 > ul").prepend(page);
                obj.find(".col-sm-7 > ul").find("li").css("cursor", "pointer");
                obj.find(".col-sm-7 > ul > .pagination-jump-li").prevAll().addClass("pagination-number-li");
                
                locale.render({element: "#init_body"});
            })();
        },
        //初始化分页数据
        init_data:function (obj,opt,data) {
            return (function () {
                var cursor_r = parseInt(data.cursor);
                var limit_r = parseInt(data.limit);
                var total_r = parseInt(data.total);
                var pageNow = Math.ceil((cursor_r + limit_r) / limit_r);
                var pageTotal = Math.ceil(total_r / limit_r);
                obj.find(".col-sm-5 > .total_items").text(total_r);  //填充总条数
                obj.find(".pagination-jump-li input").val("");
                toolOption.fill_pageData(obj,pageTotal, pageNow);
            })();
        },
        //绑定事件
        bindEvent_paging:function (obj,opt) {
            return (function(){
                obj.off("click");
                obj.on("click",".pagination-jump-li button",function () {
                    //跳转按钮绑定事件
                    var page = obj.find(".pagination-jump-li input").val(); //跳转到第几页
                    var perPage = obj.find(".col-sm-5 select").val(); //每页显示多少条
                    var total = obj.find(".col-sm-5 > .total_items").text();//总条数
                    var cursor = (page-1)*perPage;
                    if(cursor>=0 && cursor<=total){
                        toolOption.jumpTopage(obj,opt,cursor,perPage);
                    }else if(cursor<0){
                        toolOption.jumpTopage(obj,opt,"0",perPage);
                    }else if(cursor>total){
                        var pageTotal = Math.ceil(total / perPage);
                        toolOption.jumpTopage(obj,opt,((pageTotal-1)*perPage)+"",perPage);
                    }
                    obj.find(".pagination-jump-li input").val("");
                }).on("change",".col-sm-5 select",function (ent) {
                    //每页显示选择事件
                    var limit=this.value;
                    toolOption.changePerPageNumber(obj,opt,limit);
                    obj.find(".pagination-jump-li input").val("");
                }).on("click",".pagination-number-li:not(.disabled)",function () {
                    //页码li的点击事件
                    if($(this).is(".active")){
                    }else{
                        var limit=parseInt(obj.find(".col-sm-5 select").val());
                        var pageNow=parseInt(obj.find("ul > li").filter(".active").find("span").text());//当前页
                        var cursor_r=parseInt((pageNow-1)*limit);//当前页从第几条开始
                        var index;
                        if ($(this).find("span").attr("data-pageoption") == "previous_page") {
                            index = cursor_r - limit;
                        } else if ($(this).find("span").attr("data-pageoption") == "next_page") {
                            index = cursor_r + limit;
                        } else{
                            var selectpage=parseInt($(this).find("span").text());//点击选择的页码
                            selectpage < pageNow ? (index = cursor_r - (pageNow - selectpage) * limit) : (index = cursor_r + (selectpage - pageNow) * limit);
                        }
                        toolOption.changePage(obj, opt, index, limit);
                    }
                });
            })();
        },
        //页码切换点击动作
        changePage:function (obj,opt,cursor,limit) {
            return (function () {
                opt.changePage.call(this,cursor,limit);
            })();
        },
        //每页显示数据条数切换动作
        changePerPageNumber:function (obj,opt,limit) {
            return (function () {
                opt.changePage.call(this,"0",limit);
            })();
        },
        //跳转到指定页面动作
        jumpTopage:function (obj,opt,cursor,limit) {
            return (function () {
                opt.changePage.call(this,cursor,limit);
            })();
        },
        //删除分页工具
        destroyPaginaton:function (obj) {
            return (function () {
                obj.off();
                obj.empty();
            })();
        },
        //清空分页栏
        clearPagination:function (obj) {
            return (function () {
                obj.find(".col-sm-5 > .total_items").text("0");
                obj.find(".col-sm-7 > ul > .pagination-jump-li").prevAll().remove();
                obj.find(".pagination-jump-li input").val("");
            })();
        }

    };

    $.fn.pagination = function (opts,data) {
        //data:初始化分页工具的数据
        //opts:用户自定义选项
        var that = $(this);
        if($.isPlainObject(opts)){
            //传递对象的操作
            var options = ($.isPlainObject(opts)||!opts)?$.extend(false,{},$.fn.pagination.defaults,opts):$.extend({},$.fn.pagination.defaults);
            return this.each(function () {
                that.empty();
                toolOption.init(that,options);
            });
        }else{
            //传递字符串的操作
            if (typeof(opts) === "string") {
                switch (opts) {
                    case "data":
                        toolOption.init_data.call(null,that,opts,data);
                        break;
                    case "clear":
                        toolOption.clearPagination.call(null,that);
                        break;
                    case "destroy":
                        toolOption.destroyPaginaton.call(null,that);
                        break;
                    default:
                        return
                }
            } else {
               console.log("参数类型错误");
                return
            }
        }
    };

    /**
     * 默认选项设置
     * */
    $.fn.pagination.defaults = {
        //页码改变事件或则每页条数改变事件
        changePage:function (cursor,limit) {}
    };

})(jQuery);