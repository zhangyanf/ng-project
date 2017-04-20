
//ie6,7,8判断
var bua = navigator.userAgent;

/*
 var isFirefox=bua.indexOf("Firefox");
 var isChrome=bua.indexOf("Chrome");
 */
//浏览器判断
var reg = new RegExp("MSIE ([6-8][/.0-9]{0,})");
var result = reg.exec(bua);
function _verifyBrowser() {
    if (result) {
        return false;
    }
    else {
        return true;
    }
}
;
var flag = _verifyBrowser();
function renderTip() {
    $("<div id='tip_top' class='tip_top'></div>").appendTo("body")
            .css({"height": (document.documentElement.clientHeight / 2), "width": document.documentElement.clientWidth, "top": -(document.documentElement.clientHeight / 2)})
            .animate({top: "0px"}, 300, function() {
        $("<div id='tip_content' class='tip_content'></div>").html("<div class='text_div_1'><image class='inhand_logo' src='./images/Logo-InHand.png' />" +
                "<p class='text_title'>浏览器不受支持</p>" +
                "<p class='text_content'>使用当前浏览器，无法获得最佳体验，建议使用最新的" +
                "<a class='browser_link' href='http://www.firefox.com.cn'>Firefox</a>或" +
                "<a class='browser_link' href='http://www.google.cn/intl/zh-CN/chrome/browser/'>Chrome</a>浏览器</p></div>" +
                "<div class='text_div_2'>" +
                "<p class='text_title'>Browser Tip</p>" +
                "<p class='text_content'>Suggest to select the latest version of " +
                "<a class='browser_link' href='http://www.mozilla.org/en-US/firefox/new/'>Firefox</a> or " +
                "<a class='browser_link' href='https://www.google.com/intl/en/chrome/browser/'>Chrome</a> browser</p></div>"
                ).appendTo("body").css({
            "top": ((document.documentElement.clientHeight / 2) - 125) + "px",
            "left": ((document.documentElement.clientWidth / 2) - 225) + "px"});
        $("<div class='ignore_button'></div>").appendTo($("#tip_content")).text("Skip").mouseover(function() {
            $(this).css({
                "cursor": "pointer",
                "font-weight": "bold"
            })
                    .mousedown(function() {
                $(this).css({
                    "border-right": "2px solid #dddddd",
                    "border-bottom": "2px solid #dddddd"
                })
            })
                    .mouseout(function() {
                $(this).css({
                    "border-right": "2px solid #7E807C",
                    "border-bottom": "2px solid #7E807C",
                    "font-weight": "normal"
                })
            })
        }).click(function() {
            $("#tip_bottom").animate({top: (document.documentElement.clientHeight) + "px"}, 300, function() {
                $(this).remove()
            });
            $("#tip_top").animate({top: -(document.documentElement.clientHeight / 2) + "px"}, 300, function() {
                $(this).remove()
            });
            $("#tip_content").fadeOut(300, function() {
                $(this).remove()
            });
        })
    });
    $("<div id='tip_bottom' class='tip_bottom'></div>").appendTo("body").css({"height": (document.documentElement.clientHeight / 2), "width": document.documentElement.clientWidth, "top": document.documentElement.clientHeight}).animate({top: (document.documentElement.clientHeight / 2) + "px"}, 300)
}
;
//执行浏览器判断
$(function() {
    if (!flag) {
        renderTip();
    }
});
//如果有accessToken则自动跳转到平台内
var accessToken = sessionStorage.getItem("accessToken");
if (!sessionStorage.getItem("accessToken")) {
    location.href = "../login.html";
}
;
//locale 国际化对象，具体方法含义参照项目中的文档
var packages = {
    "default": "base",
    "base": "../resources/language"
};
var locale = {
    browserLang: "",
    userLang: "",
    localLang: "",
    storageLang: "",
    langArr: ["en", "zh_CN"],
    langPacks: {},
    packUrl: "",
    element: "*",
    pos: packages["default"],
    lang: "",
    _setBrowserLang: function() {
        var browser = navigator.language || navigator.browserLanguage;
        var browserLang = browser.toLowerCase().substring(0, 2);
        var langArr = this.langArr;
        var arrCurrent;
        for (var num = 0; num < langArr.length; num++) {
            arrCurrent = langArr[num].toLowerCase().substring(0, 2);
            if (browserLang == arrCurrent) {
                this.browserLang = langArr[num];
                return;
            }
        }
    },
    _setUserLang: function(opt) {
        var langArr = this.langArr;
        for (var num = 0; num < langArr.length; num++) {
            if (langArr[num].toLowerCase().indexOf(opt.toLowerCase()) > -1) {
                this.userLang = langArr[num];
                return;
            }
        }
    },
    _setStorageLang: function(opt) {
        this.storageLang = opt;
    },
    _setLocalLang: function() {
        if (this.storageLang && this.userLang) {
            this.localLang = this.userLang;
        } else if (this.storageLang && !this.userLang) {
            this.localLang = this.storageLang;
        } else if (!this.storageLang && this.userLang) {
            this.localLang = this.userLang;
        } else {
            this.localLang = this.browserLang;
        }
        this._setStorage(this.localLang);
    },
    _setLang: function() {
        if (!this.browserLang) {
            this._setBrowserLang();
        }
        if (!this.storageLang) {
            this._setStorageLang(localStorage.getItem("language"));
        }
        if (this.lang) {
            this._setUserLang(this.lang);
        }
        this._setLocalLang();

    },
    _setStorage: function(lang) {
        this._setStorageLang(lang);
        localStorage.setItem("language", lang);
    },
    _getStorageLang: function() {
        return localStorage.getItem("language");
    },
    _loadPack: function(callback) {
        var self = this;
        var url = this.packUrl + "/" + this.storageLang + "/lang.js";
        $.ajax({
            url: url,
            dataType: "script",
            async: false,
            success: function() {
                self._cacheLangPacks();
                if (callback) {
                    if ($.isArray(callback)) {
                        for (var num = 0; num < callback.length; num++) {
                            callback[num]();
                        }
                    } else {
                        callback();
                    }
                }
            }
        });
    },
    _hasPacks: function() {
        var langPacks = this.langPacks;
        for (var attr in langPacks) {
            if (attr == this.storageLang) {
                for (var _attr in langPacks[attr]) {
                    if (_attr == this.pos) {
                        return true;
                    }
                }
            }
        }
    },
    _cacheLangPacks: function() {
        var langName, langObj;
        var pos = this.pos;
        var langPacks = this.langPacks;
        for (var attr in lang) {
            langName = attr;
            langObj = lang[attr];
        }
        if (langPacks[langName]) {
            langPacks[langName][pos] = langObj;
        } else {
            langPacks[langName] = {};
            langPacks[langName][pos] = langObj;
        }
        this.langPacks = langPacks;
    },
    _getPackUrl: function() {
        if (this.pos) {
            packUrl = packages[this.pos];
            if (packUrl) {
                this.packUrl = packUrl;
            } else {
                this.pos = packages["default"];
                this.packUrl = packages[this.pos];
            }
        } else {
            this.pos = packages["default"];
            this.packUrl = packages[this.pos];
        }
    },
    _languageIsCorrect: function() {
        if (!this.storageLang || !this._getStorageLang()) {
            return false;
        } else {
            if (this.lang && this.lang != this.storageLang) {
                return false;
            } else {
                return true;
            }
        }
    },
    _get: function(opt, variableArr) {
        var self = this;
        var obj = {};
        if (opt && $.isPlainObject(opt)) {
            obj.str = opt.lang;
            this.pos = opt.pos ? opt.pos : "base";
        } else {
            obj.str = opt;
            this.pos = "base";
        }
        if (!this._languageIsCorrect()) {
            this._setLang();
        }
        if (this._hasPacks()) {
            self.str = variableArr ? this._result(obj, variableArr) : this._result(obj);
        } else {
            this._getPackUrl();
            variableArr ? this._loadPack(function() {
                self.str = self._result(obj, variableArr);
            }) : this._loadPack(function() {
                self.str = self._result(obj);
            });
        }
        ;
        return self.str;
    },
    get: function(opt, variableArr) {
        return this._get(opt, variableArr);
    },
    _render: function(opt) {
        var self = this;
        if (opt.method == "render") {
            this.pos = opt.pos ? opt.pos : "base";
            this.element = opt.element ? opt.element : "*";
        } else if (opt.method == "set") {
            this.lang = opt.lang ? opt.lang : "zh_CN";
            this.pos = opt.pos ? opt.pos : "base";
            this.element = "*";
        }
        if (!this._languageIsCorrect()) {
            this._setLang();
        }
        if (this._hasPacks()) {
            this._each(self.element);
        } else {
            this._getPackUrl();
            this._loadPack(function() {
                self._each(self.element);
            });
        }
        ;
        // Change About Us URL
        if (this.lang == "zh_CN") {
            $("#home-nav-aboutus").children("a").attr("href", "http://www.inhand.com.cn/");
        } else {
            $("#home-nav-aboutus").children("a").attr("href", "http://www.inhand.com/");
        }
    },
    render: function(opt) {
        if (opt && $.isPlainObject(opt)) {
            opt.method = "render";
            this._render(opt);
        } else {
            this._render({method: "render"});
        }
    },
    set: function(opt) {
        if (opt && $.isPlainObject(opt)) {
            opt.method = "set";
            this._render(opt);
        }
    },
    _each: function() {
        var self = this;
        var element = this.element;
        var storageLang = self.storageLang;
        var langPacks = self.langPacks;
        var $dom;
        if (typeof this.element == "string") {
            $dom = $(element);
        } else {
            $dom = element;
        }
        $dom.find("[lang]").each(function() {
            var $this = $(this);
            var langContent = $this.attr("lang").toLowerCase();
            var semiIndex = langContent.indexOf(";");
            var lbracketIndex = langContent.indexOf("{");
            var strlen = langContent.length;
            var colonIndex, attrId, attrValue, dicKey;
            if (lbracketIndex > -1) {
                var rbracketIndex = langContent.indexOf("}");
                if (semiIndex > -1) {
                    langContent = langContent.substring(lbracketIndex + 1, semiIndex);
                } else {
                    langContent = langContent.substring(lbracketIndex + 1, rbracketIndex);
                }
                attrArr = langContent.split(",");
                for (var num = 0, arrLen = attrArr.length; num < arrLen; num++) {
                    attr = attrArr[num];
                    colonIndex = attr.indexOf(":");
                    attrId = attr.substring(0, colonIndex);
                    attrValue = attr.substring(colonIndex + 1);
                    result = self._result({str: attrValue});
                    self._return({$this: $this, attrId: attrId, str: result});
                }
            } else if (langContent) {
                colonIndex = langContent.indexOf(":");
                if (semiIndex > -1) {
                    attrId = langContent.substring(0, colonIndex);
                    attrValue = langContent.substring(colonIndex + 1, strlen - 1);
                } else {
                    attrId = langContent.substring(0, colonIndex);
                    attrValue = langContent.substring(colonIndex + 1);
                }
                result = self._result({str: attrValue});
                self._return({$this: $this, attrId: attrId, str: result});
            }
        });
    },
    _result: function(obj, variableArr) {
        var pos = this.pos;
        var langPacks = this.langPacks;
        var storageLang = this.storageLang;
        var attrValue = obj.str.toString();
        var str = "";
        if (attrValue.indexOf("+") > -1) {
            var arr = [];
            var current;
            arr = attrValue.split("+");
            for (var num = 0; num < arr.length; num++) {
                current = arr[num];
                if (storageLang == "en") {
                    if (current.match(/\W/)) {
                        str += current + " ";
                    } else {
                        str += langPacks[storageLang][pos][current] + " ";
                    }
                } else {
                    if (current.match(/\W/)) {
                        str += current;
                    } else {
                        str += langPacks[storageLang][pos][current];
                    }
                }
            }
            str = str.replace(/\s$/g, "");
        } else {
            str = langPacks[storageLang][pos][attrValue];
        }
        if (variableArr && str) {
            for (var num = 0; num < variableArr.length; num++) {
                if (str.indexOf("{" + num + "}") > -1) {
                    str = str.replace("{" + num + "}", variableArr[num]);
                }
            }
            ;
        }
        return str;
    },
    _return: function(obj) {
        var $this = obj.$this;
        var attrId = obj.attrId;
        var str = obj.str;
        switch (attrId) {
            case "text":
                $this.text(str);
                break;
            case "value":
                $this.val(str);
                break;
            case "title":
                $this.attr("title", str);
                break;
            case "alt":
                $this.attr("alt", str);
                break;
            case "placeholder":
                $this.attr("placeholder", str);
                break;
        }
    },
    current: function() {
        var lang = this._getStorageLang();
        switch (lang) {
            case "en":
                return 1;
                break;
            case "zh_CN":
                return 2;
                break;
        }
    }
};
//validator 插件的封装对象,具体方法含义参照项目中的文档
var validator = {
    storageLang: null,
    langPacks: {},
    element: null,
    elements: [],
    validation: null,
    render: function(element, paramObj) {
        this._cacheElements(element, paramObj);
        this._cacheStorageLang();
//			this.hideAll();
//			this._destroy();
        this._render();
    },
    _cacheStorageLang: function() {
        var lang = this._returnStorageLang();
        if (!this.storageLang) {
            this.storageLang = lang ? lang : "zh_CN";
        } else {
            if (this.storageLang != lang) {
                this.storageLang = lang ? lang : "zh_CN";
            }
        }
    },
    _cacheElements: function(element, paramObj) {
        var self = this;
        this.element = element;
        var elements = this.elements;
        var defaultObj = {
            fadeDuration: 0,
            showOneMessage: true,
            focusFirstField: true,
            customFunctions: {
                cloudInput: function(field, rules, i, options) {
                    var nohtml = new RegExp("(<[^>]+>)|(&gt|&lt|&amp|&quot|&nbsp)");
                    if (nohtml.test(field.val())) {
                        return options.allrules.nohtml.alertText;
                    }
                    return true;
                }
            }
        };
        paramObj = $.extend(paramObj, defaultObj);
        if (elements.length > 0) {
            var count = 0;
            $.each(elements, function(index, obj) {
                if (element == obj.element) {
                    var currentParamObj = obj.paramObj;
                    var newParamObj = $.extend(currentParamObj, paramObj);
                    self.elements[index]["paramObj"] = newParamObj;
                    count++;
                }
            });
            if (count === 0) {
                this.elements.push({element: element, paramObj: paramObj});
            }
        } else {
            this.elements.push({element: element, paramObj: paramObj});
        }
    },
    result: function(element) {
        if (this.validation) {
            if (element) {
                return $(element).validationEngine('validate');
            } else {
                return $(this.element).validationEngine('validate');
            }
        }
    },
    prompt: function(element, obj) {
        $(element).validationEngine("showPrompt", obj.text, "load", obj.promptPosition ? obj.promptPosition : "topLeft", true);
    },
    hide: function(element) {
        if (element) {
            $(element).validationEngine('hide');
        } else {
            $(this.element).validationEngine('hide');
        }
    },
    hideAll: function(element) {
        if (element) {
            $(element).validationEngine('hideAll');
        } else {
            var elements = this.elements;
            if (this.validation) {
                $.each(elements, function(index, obj) {
                    $(obj.element).validationEngine('hideAll');
                });
            }
        }
    },
    _destroy: function() {
        var elements = this.elements;
        if (this.validation) {
            this.validation = null;
            $.each(elements, function(index, obj) {
                $(obj.element).validationEngine('detach');
            });
        }
    },
    _render: function() {
        var storageLang = this.storageLang;
        var hasPack = function() {
            var langPacks = self.langPacks;
            for (var attr in langPacks) {
                if (attr == storageLang) {
                    return true;
                }
            }
        };
        if (hasPack()) {
            this._renderForm();
        } else {
            this._loadPack();
        }
    },
    _returnStorageLang: function() {
        return localStorage.getItem("language");
    },
    _renderForm: function() {
        var self = this;
        var elements = this.elements;
        self._returnAllRules();
        $.each(elements, function(index, obj) {
            self.validation = $(obj.element).validationEngine('attach', obj.paramObj);
        });
    },
    _loadPack: function() {
        var self = this;
        var url = "../www/language/" + self.storageLang + "/validationengine.lang.js";
        $.getScript(url, function(data) {
            self._cacheLangPacks();
            self._renderForm();
        });
    },
    _returnAllRules: function() {
        var self = this;
        var returnAllRules = function() {
            $.validationEngineLanguage.allRules = self.langPacks[self.storageLang];
        };
        return returnAllRules();
    },
    _cacheLangPacks: function() {
        var self = this;
        var lang = $.validationEngineLanguage;
        var langName, langObj;
        for (var attr in lang) {
            langName = attr;
            langObj = lang[attr];
        }
        self.langPacks[langName] = langObj;
    }
};

//各对象加上交互
locale.render();
//validator.render("#init_body", {
//    promptPosition: "centerTop",
//    scroll: false
//});
//

// 导航菜单权限过滤
function nav_permission() {
    //获取页面访问权限
    var permission=getPermission2();

    var accept=sessionStorage.getItem('accept');
    var def=sessionStorage.getItem('default');
    var deny=sessionStorage.getItem('deny');
    //首页导航验证
    var site=tool_nav_permission(permission.home.site,accept,def,deny);
    var webscada=tool_nav_permission(permission.home.webscada,accept,def,deny);
    var reltime=tool_nav_permission(permission.home.reltime,accept,def,deny);
    var alarm=tool_nav_permission(permission.home.alarm,accept,def,deny);
    var history=tool_nav_permission(permission.home.history,accept,def,deny);
    if(webscada==0&& reltime==0&& alarm==0&& history==0){
        $("#p_home").hide();
    }
    if(webscada==0 || reltime==0 || alarm==0 || history==0)
        $("#p_site").hide(); 
    if(reltime==0)
        $("#p_reltime").hide();
    if(alarm==0)
        $("#p_alarm").hide();
    if(history==0)
        $("#p_history").hide();
        //设备管理模块
    var p_asset=tool_nav_permission(permission.device_manage.p_asset,accept,def,deny);
    var maintain_history=tool_nav_permission(permission.device_manage.maintain_history,accept,def,deny);
    if(p_asset ==0 && maintain_history == 0){
        $("#device_manage").hide();
    }
    if(p_asset == 0)
      $("#p_asset").hide();
    if(maintain_history == 0)
      $("#maintain_history").hide();
     //数据配置模块
    var data_dictionary=tool_nav_permission(permission.data_allocation.data_dictionary,accept,def,deny);
    var trend_chart_set=tool_nav_permission(permission.data_allocation.trend_chart_set,accept,def,deny);
    if(data_dictionary ==0 && trend_chart_set == 0){
      $("#data_allocation").hide();
    }
    if(data_dictionary == 0)
      $("#data_dictionary").hide();
    if(trend_chart_set == 0)
      $("#trend_chart_set").hide();

}
function tool_nav_permission(per,a,df,de) {
    var accept=a.split(",");
    var def=df;
    var deny=de.split(",");
    var temp;
    var marked=0;//1通过验证,0验证失败
    for(var i=0;i<per.length;i++){
        temp=per[i]+"";
        if($.inArray(temp, deny)>-1){
            marked=0;
        }else{
            if($.inArray(temp, accept)>-1){
                marked=1;
            }else{
                if(def=='all'){
                    marked=1;
                }else if(def=='none'){
                    marked=0;
                }else{
                    if(parseInt(temp)%2==0)
                        marked=0;
                    else
                        marked=1;
                }
            }
        }
        if(marked==1){
            break;
        }
    }
    return marked;
}
/*
 * 监听窗口变化时，#pcontent下的 .content高度自动获取窗口高度
 * */
$(window).resize(function (event) {
    set_$tcontentHeight();
});
/*
 *load页面时#tcontent加载初始高度
 * */
function set_$tcontentHeight() {
    var h1=0;
    $("#pcontent > .content-header").each(function (i){
        h1=h1+$(this).innerHeight();
    });
    var h2=$("#content-header2").innerHeight();
    var content_height=$(window).height()-50-h1-h2;
    $("#pcontent > .content").height(content_height);
    if($(".nav-tabs").css("display")=="none"){
        $(".nav-tabs-custom #tab_content").height(content_height);
    }else{
        $(".nav-tabs-custom #tab_content").height(content_height-$(".nav-tabs").innerHeight());
    }

}
