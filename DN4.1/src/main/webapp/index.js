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
        .css({
            "height": (document.documentElement.clientHeight / 2),
            "width": document.documentElement.clientWidth,
            "top": -(document.documentElement.clientHeight / 2)
        })
        .animate({top: "0px"}, 300, function () {
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
                "left": ((document.documentElement.clientWidth / 2) - 225) + "px"
            });
            $("<div class='ignore_button'></div>").appendTo($("#tip_content")).text("Skip").mouseover(function () {
                $(this).css({
                        "cursor": "pointer",
                        "font-weight": "bold"
                    })
                    .mousedown(function () {
                        $(this).css({
                            "border-right": "2px solid #dddddd",
                            "border-bottom": "2px solid #dddddd"
                        })
                    })
                    .mouseout(function () {
                        $(this).css({
                            "border-right": "2px solid #7E807C",
                            "border-bottom": "2px solid #7E807C",
                            "font-weight": "normal"
                        })
                    })
            }).click(function () {
                $("#tip_bottom").animate({top: (document.documentElement.clientHeight) + "px"}, 300, function () {
                    $(this).remove()
                });
                $("#tip_top").animate({top: -(document.documentElement.clientHeight / 2) + "px"}, 300, function () {
                    $(this).remove()
                });
                $("#tip_content").fadeOut(300, function () {
                    $(this).remove()
                });
            })
        });
    $("<div id='tip_bottom' class='tip_bottom'></div>").appendTo("body").css({
        "height": (document.documentElement.clientHeight / 2),
        "width": document.documentElement.clientWidth,
        "top": document.documentElement.clientHeight
    }).animate({top: (document.documentElement.clientHeight / 2) + "px"}, 300)
}
;
//执行浏览器判断
$(function () {
    if (!flag) {
        renderTip();
    }
});
//如果有accessToken则自动跳转到平台内
// console.log("index.js",!sessionStorage.getItem("accessToken"));
var accessToken = sessionStorage.getItem("accessToken");
if (!sessionStorage.getItem("accessToken")) {
    location.href = "./login.html";
}
;
//locale 国际化对象，具体方法含义参照项目中的文档
var packages = {
    "default": "base",
    "base": "resources/language"
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
    _setBrowserLang: function () {
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
    _setUserLang: function (opt) {
        var langArr = this.langArr;
        for (var num = 0; num < langArr.length; num++) {
            if (langArr[num].toLowerCase().indexOf(opt.toLowerCase()) > -1) {
                this.userLang = langArr[num];
                return;
            }
        }
    },
    _setStorageLang: function (opt) {
        this.storageLang = opt;
    },
    _setLocalLang: function () {
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
    _setLang: function () {
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
    _setStorage: function (lang) {
        this._setStorageLang(lang);
        localStorage.setItem("language", lang);
    },
    _getStorageLang: function () {
        return localStorage.getItem("language");
    },
    _loadPack: function (callback) {
        var self = this;
        var url = this.packUrl + "/" + this.storageLang + "/lang.js";
        $.ajax({
            url: url,
            dataType: "script",
            async: false,
            success: function () {
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
    _hasPacks: function () {
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
    _cacheLangPacks: function () {
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
    _getPackUrl: function () {
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
    _languageIsCorrect: function () {
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
    _get: function (opt, variableArr) {
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
            variableArr ? this._loadPack(function () {
                self.str = self._result(obj, variableArr);
            }) : this._loadPack(function () {
                self.str = self._result(obj);
            });
        }
        ;
        return self.str;
    },
    get: function (opt, variableArr) {
        return this._get(opt, variableArr);
    },
    _render: function (opt) {
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
            this._loadPack(function () {
                self._each(self.element);
            });
        }
        ;
        // Change About Us URL
        if (this.lang == "zh_CN") {
            $("#home-nav-aboutus").children("a").attr("href", "http://www.inhand.com.cn/");
        } else {
            $("#home-nav-aboutus").children("a").attr("href", "http://www.inhandnetworks.com/");
        }
    },
    render: function (opt) {
        if (opt && $.isPlainObject(opt)) {
            opt.method = "render";
            this._render(opt);
        } else {
            this._render({method: "render"});
        }
    },
    set: function (opt) {
        if (opt && $.isPlainObject(opt)) {
            opt.method = "set";
            this._render(opt);
        }
    },
    _each: function () {
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
        $dom.find("[lang]").each(function () {
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
    _result: function (obj, variableArr) {
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
    _return: function (obj) {
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
    current: function () {
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
    render: function (element, paramObj) {
        this._cacheElements(element, paramObj);
        this._cacheStorageLang();
//			this.hideAll();
//			this._destroy();
        this._render();
    },
    _cacheStorageLang: function () {
        var lang = this._returnStorageLang();
        if (!this.storageLang) {
            this.storageLang = lang ? lang : "zh_CN";
        } else {
            if (this.storageLang != lang) {
                this.storageLang = lang ? lang : "zh_CN";
            }
        }
    },
    _cacheElements: function (element, paramObj) {
        var self = this;
        this.element = element;
        var elements = this.elements;
        var defaultObj = {
            fadeDuration: 0,
            showOneMessage: true,
            focusFirstField: true,
            customFunctions: {
                cloudInput: function (field, rules, i, options) {
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
            $.each(elements, function (index, obj) {
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
    result: function (element) {
        if (this.validation) {
            if (element) {
                return $(element).validationEngine('validate');
            } else {
                return $(this.element).validationEngine('validate');
            }
        }
    },
    prompt: function (element, obj) {
        $(element).validationEngine("showPrompt", obj.text, "load", obj.promptPosition ? obj.promptPosition : "topLeft", true);
    },
    hide: function (element) {
        if (element) {
            $(element).validationEngine('hide');
        } else {
            $(this.element).validationEngine('hide');
        }
    },
    hideAll: function (element) {
        if (element) {
            $(element).validationEngine('hideAll');
        } else {
            var elements = this.elements;
            if (this.validation) {
                $.each(elements, function (index, obj) {
                    $(obj.element).validationEngine('hideAll');
                });
            }
        }
    },
    _destroy: function () {
        var elements = this.elements;
        if (this.validation) {
            this.validation = null;
            $.each(elements, function (index, obj) {
                $(obj.element).validationEngine('detach');
            });
        }
    },
    _render: function () {
        var storageLang = this.storageLang;
        var hasPack = function () {
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
    _returnStorageLang: function () {
        return localStorage.getItem("language");
    },
    _renderForm: function () {
        var self = this;
        var elements = this.elements;
        self._returnAllRules();
        $.each(elements, function (index, obj) {
            self.validation = $(obj.element).validationEngine('attach', obj.paramObj);
        });
    },
    _loadPack: function () {
        var self = this;
        var url = "www/language/" + self.storageLang + "/validationengine.lang.js";
        $.getScript(url, function (data) {
            self._cacheLangPacks();
            self._renderForm();
        });
    },
    _returnAllRules: function () {
        var self = this;
        var returnAllRules = function () {
            $.validationEngineLanguage.allRules = self.langPacks[self.storageLang];
        };
        return returnAllRules();
    },
    _cacheLangPacks: function () {
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
// 导航菜单权限过滤
function nav_permission() {
    //获取页面访问权限
    var permission = getPermission();

    var accept = sessionStorage.getItem('accept');
    var def = sessionStorage.getItem('default');
    var deny = sessionStorage.getItem('deny');
    //首页导航验证
    var map = tool_nav_permission(permission.home.map, accept, def, deny);
    var h_site = tool_nav_permission(permission.home.site, accept, def, deny);
    if (map != 0 || h_site != 0) {
        if (map == 0)
            $("#firstpage_map").remove();
        if (h_site == 0)
            $("#firstpage_site").remove();
        $("#firstpage").show();
    } else {
        $("#firstpage").remove();
    }
    //监视导航验证
    // var mmonitor =tool_nav_permission(permission.monistor.monitor,accept,def,deny);
    // if(mmonitor!=0){
    //     $("#monitor").show();
    // }
    //通知导航过滤
    var alarmManage = tool_nav_permission(permission.notifications.alarm, accept, def, deny);
    var logManage = tool_nav_permission(permission.notifications.log, accept, def, deny);
    if (alarmManage != 0 || logManage != 0) {
        $("#alarmList").show();
        if (alarmManage == 0)
            $("#alarmList_alarmManage").remove();
        if (logManage == 0)
            $("#notice_logManage").remove();
    } else {
        $("#alarmList").remove();
    }
    //维修导航栏过滤
    var order = tool_nav_permission(permission.repair.order, accept, def, deny);
    var orderList = tool_nav_permission(permission.repair.orderList, accept, def, deny);
    var schedule = tool_nav_permission(permission.repair.schedule, accept, def, deny);
    if (order != 0 || orderList != 0 || schedule != 0) {
        if (order == 0)
            $("#repair_order").remove();
        if (orderList == 0)
            $("#repair_orderlist").remove();
        if (schedule == 0)
            $("#repair_schedule").remove();
        $("#repair").show();
    } else {
        $("#repair").remove();
    }
    /***************************************************/
    //报表导航过滤
    var online = tool_nav_permission(permission.report.online_statistics, accept, def, deny);
    var traffic = tool_nav_permission(permission.report.traffic_statistics, accept, def, deny);
    var gatewayReport = tool_nav_permission(permission.report.gateway_statistics, accept, def, deny);
    if (gatewayReport != 0) {
        $("#reportList").show();
    } else {
        $("#reportList").remove();
    }
    // if(online!=0 || traffic!=0){
    //     $("#reportList").show();
    //     if(online==0)
    //         $("#reportList_online").remove();
    //     if(traffic==0)
    //         $("#reportList_traff").remove();
    // }else{
    //     $("#reportList").remove();
    // }
    //配置导航过滤
    var gateway = tool_nav_permission(permission.config.gateway, accept, def, deny);
    // var controller=tool_nav_permission(permission.config.controller,accept,def,deny);
    var c_site = tool_nav_permission(permission.config.site, accept, def, deny);
    if (gateway != 0 || c_site != 0) {
        $("#configList").show();
        if (gateway == 0)
            $("#configList_gateway").remove();
        if (c_site == 0)
            $("#configList_site").remove();
    } else {
        $("#configList").remove();
    }
    //系统导航过滤
    var user = tool_nav_permission(permission.system.user, accept, def, deny);
    var role = tool_nav_permission(permission.system.role, accept, def, deny);
    var field_maintenance=tool_nav_permission(permission.system.field_maintenance, accept, def, deny);
    if (user != 0 || role != 0 || field_maintenance!=0) {
        $("#systemList").show();
        if (user == 0)
            $("#systemList_user").remove();
        if (role == 0)
            $("#systemList_role").remove();
        if(field_maintenance == 0)
            $("#systemList_field_maintenance").remove();
    } else {
        $("#systemList").remove();
    }
    //下载导航过滤
    var devicetouch = tool_nav_permission(permission.download.devicetouch, accept, def, deny);
    var alarm_app = tool_nav_permission(permission.download.alarm_app, accept, def, deny);
    if (devicetouch != 0 || alarm_app != 0) {
        $("#dowloadList").show();
        if (devicetouch == 0)
            $("#dowloadList_devicetouch").remove();
        if (alarm_app == 0)
            $("#dowloadList_alarmApp").remove();
    } else {
        $("#dowloadList").remove();
    }

}
function tool_nav_permission(per, a, df, de) {
    var accept = a.split(",");
    var def = df;
    var deny = de.split(",");
    var temp;
    var marked = 0;//1通过验证,0验证失败
    for (var i = 0; i < per.length; i++) {
        temp = per[i] + "";
        if ($.inArray(temp, deny) > -1) {
            marked = 0;
        } else {
            if ($.inArray(temp, accept) > -1) {
                marked = 1;
            } else {
                if (def == 'all') {
                    marked = 1;
                } else if (def == 'none') {
                    marked = 0;
                } else {
                    if (parseInt(temp) % 2 == 0)
                        marked = 0;
                    else
                        marked = 1;
                }
            }
        }
        if (marked == 1) {
            break;
        }
    }
    return marked;
}
/*
 * 修改密码
 *****************************************************************************************************************
 */
function changePassword_self() {
    $("#model_changePWd_oldPwd").val("");
    $("#model_changePWd_newPwd").val("");
    $("#model_changePWd_repeat_pwd").val("");
    $("#model_changePWd").modal('show');
    $("#model_changePWd").modal({backdrop: 'static', keyboard: false});
}

/**
 * 编辑用户信息
 */
function edit_self() {
    $("#edit_self").hide();
    $("#save_self").show();
    var userName = $("#user_name").text();
    var userPhone = $("#user_phone").text();
    $("#user_name").empty().append('<input id="userName_input" type="text" class="col-sm-12 form-control input-sm validate[required,maxSize[30]]" style="margin:2px 0px;" value="' + userName + '">');
    $("#user_phone").empty().append('<input id="userPhone_input" type="text" class="col-sm-12 form-control input-sm validate[custom[mobile]]" style="margin:2px 0px;" value="' + userPhone + '">');
}
/**
 * 保存用户信息
 */
function save_self() {
    var userName = $("#userName_input").val();
    var userPhone = $("#userPhone_input").val();
    if ($('#dropdown_user_form').validationEngine('validate')) {
        var requestData = {
            name: userName,
            phone: userPhone
        }
        schneider.Ajax.request({
            url: "api2/users/this",
            type: "PUT",
            async: true,
            contentType: 'application/json; charset=utf-8',
            traditional: true,
            data: JSON.stringify(requestData),
            success: function (result) { 
                errorTipDis("modify_success");
                $("#user_name").empty().text(userName);
                $("#user_phone").empty().text(userPhone);
                $("#edit_self").show();
                $("#save_self").hide();
                getUserInfo();
            }
        });
    }

}
function submit_changePassword_self() {
    var self = this;
    //md5加密方法
    this.md5 = (function (str) {
        var hex_chr = "0123456789abcdef";

        function rhex(num) {
            str = "";
            for (var j = 0; j <= 3; j++) {
                str += hex_chr.charAt((num >> (j * 8 + 4)) & 15) + hex_chr.charAt((num >> (j * 8)) & 15);
            }
            return str;
        }

        function str2blks_MD5(str) {
            nblk = ((str.length + 8) >> 6) + 1;
            blks = new Array(nblk * 16);
            for (var i = 0; i < nblk * 16; i++) {
                blks[i] = 0;
            }
            for (i = 0; i < str.length; i++) {
                blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
            }
            blks[i >> 2] |= 128 << ((i % 4) * 8);
            blks[nblk * 16 - 2] = str.length * 8;
            return blks;
        }

        function add(x, y) {
            var lsw = (x & 65535) + (y & 65535);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 65535);
        }

        function rol(num, cnt) {
            return (num << cnt) | (num >>> (32 - cnt));
        }

        function cmn(q, a, b, x, s, t) {
            return add(rol(add(add(a, q), add(x, t)), s), b);
        }

        function ff(a, b, c, d, x, s, t) {
            return cmn((b & c) | ((~b) & d), a, b, x, s, t);
        }

        function gg(a, b, c, d, x, s, t) {
            return cmn((b & d) | (c & (~d)), a, b, x, s, t);
        }

        function hh(a, b, c, d, x, s, t) {
            return cmn(b ^ c ^ d, a, b, x, s, t);
        }

        function ii(a, b, c, d, x, s, t) {
            return cmn(c ^ (b | (~d)), a, b, x, s, t);
        }

        function MD5(str) {
            x = str2blks_MD5(str);
            var a = 1732584193;
            var b = -271733879;
            var c = -1732584194;
            var d = 271733878;
            for (var i = 0; i < x.length; i += 16) {
                var olda = a;
                var oldb = b;
                var oldc = c;
                var oldd = d;
                a = ff(a, b, c, d, x[i + 0], 7, -680876936);
                d = ff(d, a, b, c, x[i + 1], 12, -389564586);
                c = ff(c, d, a, b, x[i + 2], 17, 606105819);
                b = ff(b, c, d, a, x[i + 3], 22, -1044525330);
                a = ff(a, b, c, d, x[i + 4], 7, -176418897);
                d = ff(d, a, b, c, x[i + 5], 12, 1200080426);
                c = ff(c, d, a, b, x[i + 6], 17, -1473231341);
                b = ff(b, c, d, a, x[i + 7], 22, -45705983);
                a = ff(a, b, c, d, x[i + 8], 7, 1770035416);
                d = ff(d, a, b, c, x[i + 9], 12, -1958414417);
                c = ff(c, d, a, b, x[i + 10], 17, -42063);
                b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
                a = ff(a, b, c, d, x[i + 12], 7, 1804603682);
                d = ff(d, a, b, c, x[i + 13], 12, -40341101);
                c = ff(c, d, a, b, x[i + 14], 17, -1502002290);
                b = ff(b, c, d, a, x[i + 15], 22, 1236535329);
                a = gg(a, b, c, d, x[i + 1], 5, -165796510);
                d = gg(d, a, b, c, x[i + 6], 9, -1069501632);
                c = gg(c, d, a, b, x[i + 11], 14, 643717713);
                b = gg(b, c, d, a, x[i + 0], 20, -373897302);
                a = gg(a, b, c, d, x[i + 5], 5, -701558691);
                d = gg(d, a, b, c, x[i + 10], 9, 38016083);
                c = gg(c, d, a, b, x[i + 15], 14, -660478335);
                b = gg(b, c, d, a, x[i + 4], 20, -405537848);
                a = gg(a, b, c, d, x[i + 9], 5, 568446438);
                d = gg(d, a, b, c, x[i + 14], 9, -1019803690);
                c = gg(c, d, a, b, x[i + 3], 14, -187363961);
                b = gg(b, c, d, a, x[i + 8], 20, 1163531501);
                a = gg(a, b, c, d, x[i + 13], 5, -1444681467);
                d = gg(d, a, b, c, x[i + 2], 9, -51403784);
                c = gg(c, d, a, b, x[i + 7], 14, 1735328473);
                b = gg(b, c, d, a, x[i + 12], 20, -1926607734);
                a = hh(a, b, c, d, x[i + 5], 4, -378558);
                d = hh(d, a, b, c, x[i + 8], 11, -2022574463);
                c = hh(c, d, a, b, x[i + 11], 16, 1839030562);
                b = hh(b, c, d, a, x[i + 14], 23, -35309556);
                a = hh(a, b, c, d, x[i + 1], 4, -1530992060);
                d = hh(d, a, b, c, x[i + 4], 11, 1272893353);
                c = hh(c, d, a, b, x[i + 7], 16, -155497632);
                b = hh(b, c, d, a, x[i + 10], 23, -1094730640);
                a = hh(a, b, c, d, x[i + 13], 4, 681279174);
                d = hh(d, a, b, c, x[i + 0], 11, -358537222);
                c = hh(c, d, a, b, x[i + 3], 16, -722521979);
                b = hh(b, c, d, a, x[i + 6], 23, 76029189);
                a = hh(a, b, c, d, x[i + 9], 4, -640364487);
                d = hh(d, a, b, c, x[i + 12], 11, -421815835);
                c = hh(c, d, a, b, x[i + 15], 16, 530742520);
                b = hh(b, c, d, a, x[i + 2], 23, -995338651);
                a = ii(a, b, c, d, x[i + 0], 6, -198630844);
                d = ii(d, a, b, c, x[i + 7], 10, 1126891415);
                c = ii(c, d, a, b, x[i + 14], 15, -1416354905);
                b = ii(b, c, d, a, x[i + 5], 21, -57434055);
                a = ii(a, b, c, d, x[i + 12], 6, 1700485571);
                d = ii(d, a, b, c, x[i + 3], 10, -1894986606);
                c = ii(c, d, a, b, x[i + 10], 15, -1051523);
                b = ii(b, c, d, a, x[i + 1], 21, -2054922799);
                a = ii(a, b, c, d, x[i + 8], 6, 1873313359);
                d = ii(d, a, b, c, x[i + 15], 10, -30611744);
                c = ii(c, d, a, b, x[i + 6], 15, -1560198380);
                b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
                a = ii(a, b, c, d, x[i + 4], 6, -145523070);
                d = ii(d, a, b, c, x[i + 11], 10, -1120210379);
                c = ii(c, d, a, b, x[i + 2], 15, 718787259);
                b = ii(b, c, d, a, x[i + 9], 21, -343485551);
                a = add(a, olda);
                b = add(b, oldb);
                c = add(c, oldc);
                d = add(d, oldd);
            }
            return rhex(a) + rhex(b) + rhex(c) + rhex(d);
        }

        if (!String.prototype.md5) {
            String.prototype.md5 = function () {
                return MD5(this).toUpperCase();
            };
        }
        return function (str) {
            return MD5(str).toUpperCase();
        };
    })();

    if ($('#model_changePWd_form').validationEngine('validate')) {

        var access_token = sessionStorage.getItem('accessToken');
        var oldPwd = self.md5($("#model_changePWd_oldPwd").val());
        var newPwd = self.md5($("#model_changePWd_newPwd").val());
        var repeatPwd = self.md5($("#model_changePWd_repeat_pwd").val());
        var languageType = locale.current();
        var params = {};
        if (newPwd == repeatPwd) {
            params.oldPassword = oldPwd;
            params.newPassword = newPwd;
            $.ajax({
                url: '/api2/users/this/password?language=' + languageType + '&access_token=' + access_token,
                type: "PUT",
                dataType: "json",
                data: JSON.stringify(params),
                success: function (data) {
                    // console.log(data);
                    if (data.error) {
                        switch (data.error_code) {
                            case 10017:
                                // dialog.render({lang: "old_password_error"});
                                dialog.render({
                                    lang: "old_password_error",
                                    buttons: [{
                                        lang: "yes", click: function () {
                                            dialog.close();
                                        }
                                    }],
                                    close: function () {
                                        dialog.close();
                                    }
                                });
                                break;
                            default:
                                break;
                        }
                    } else {  
                        // errorTipDis("modify_password_successful");
                        dialog.render({
                                    lang: "modify_success",
                                    buttons: [{
                                        lang: "yes", click: function () { 
                                            dialog.close();
                                            $('#model_changePWd').modal('hide');
                                        }
                                    }],
                                    close: function () {
                                        dialog.close();
                                    }
                                });  
                        
                    }
                    locale.render({element: "#init_body"});
                }
            });


        }
    }
}
/*******************************************************************************************************************/

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
    var h1 = 0;
    $("#pcontent > .content-header").each(function (i) {
        h1 = h1 + $(this).innerHeight();
    });
    var h2 = $("#content-header2").innerHeight();
    var content_height = $(window).height() - 50 - h1 - h2;
    $("#pcontent > .content").height(content_height);
    $(".nav-tabs-custom #tab_content").height(content_height-85);
}