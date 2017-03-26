(function($) {
    /*定义导航栏的点击事件*/
    $.fn.navMenu = function() { 
        return this.each(function() {
            var $box = $(this);
            $box.find("li>a").click(function() {
                $("#load").show();
                var $a = $(this);
                $("#leftside").find(".accordion").children().remove(); 
              //  sectionFun($a); 
                $box.find("li").removeClass("selected");
                $a.parent().addClass("selected");
                return false;
            });
        }); 
    };
    /*定义左侧树中一级区域的点击事件*/
    $.fn.accordionMenu = function() {
        return this.each(function() {
            var $box = $(this);
            $box.find("div.sectionTitle").each(function() {
                $(this).click(function(event) {
                    $box.find("li>div").removeClass("selected");
                    $(this).addClass("selected");
                    $(this).parent().find("div.hospDevice").each(function() {
                        $(this).hide();
                        $(this).find("span").removeClass("selected");
                    });
                    var $ul = $(this).parent().find("ul");
                    if ($ul.css("display") == "none") {
                        $box.find("li>ul").each(function() {
                            $(this).hide();
                        });
                        $ul.slideDown();
                    } else {
                        $ul.slideUp();
                    }
                });
            });

        });
    };
     /*定义左侧树中设备的点击事件*/
    $.fn.hospContent = function() {
        return this.each(function() {
            var $box = $(this);
            $box.find("div.hospTitle").each(function() {
                $(this).click(function(event) {
                    var $div = $(this).parent().find("div.hospDevice");
                    if ($div.css("display") == "none") {
                        $div.slideDown();
                        if ($div.find("span").length > 0) {
                            $box.parent().parent().find("span").removeClass("selected");
                            $div.find("span:first").trigger("click");
                        }
                    } else {
                        $div.slideUp();
                    }
                });
            });
            $box.find("div.hospDevice span").each(function() {
                $(this).click(function(event) {
                    $(this).parent().find("span").removeClass("selected");
                    $(this).addClass("selected");
                    deviceCheck(this);
                });
            });
        });
    };
    
    $.fn.changeTime = function() {
        $(this).change(function() { 
            chartReload($(this));
        });
    };
    
    
    $.fn.myScroll = function(options) {
        //默认配置
        var defaults = {
            speed: 100,  //滚动速度
            rowHeight: 25, //每行的高度
            delay:1000  //延时
        }; 
        var opts = $.extend({}, defaults, options), sInt = [] //定时器 ;

        function marquee(obj, step) { 
            obj.find("ul").animate({
                marginTop: '-=1'
            }, 0, function() { 
                var s = Math.abs(parseInt($(this).css("margin-top"))); 
                if (s >= step) { 
                    $(this).find("li").slice(0, 1).appendTo($(this));
                    $(this).css("margin-top", 0);
                }
            });
        }

        this.each(function(i) {
            var rowHeight = opts["rowHeight"], speed = opts["speed"],delay = opts["delay"], $this = $(this);
  
            scrollInt = setInterval(function() { 
               
                if ($this.find("ul").height() <= $this.height()) {
                    clearInterval(scrollInt); 
                } else {
                    marquee($this, rowHeight); 
                }
            }, speed); 

        });

    };
    
 
})(jQuery);

