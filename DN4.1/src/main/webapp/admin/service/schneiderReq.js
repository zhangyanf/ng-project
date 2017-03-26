define(function (require){
    var schneider = {
            config: setting,
            util: {}
        };
        var Global=require("../webscada/pandect/components/canvas/Global");
        require("../../js/components/dialog");
       schneider.Global = Global;     
    
//    this.Global = Global;

        schneider.storage = (function() {

            return {
                /*
                 * @author Jerolin
                 * @name localStorage
                 * @type {function}
                 * @description "include getter and setter in one method to change localStorage."
                 * @param {String} key
                 * @param {Object} value
                 * @return {undefined}a
                 */
                localStorage: function(key, value) {
                    var storage = window.localStorage;
                    if (storage) {
                        if (arguments.length == 1) {
                            value = storage.getItem(key);
                            return value;
                        } else if (arguments.length == 2) {
                            if (value) {
                                storage.setItem(key, value);
                            } else {
                                storage.removeItem(key);
                            }
                        }
                    }
                },
                /*
                 * @author Jerolin
                 * @name sessionStorage
                 * @type {function}
                 * @description "include getter and setter in one method to change sessionStorage."
                 * @param {String} key
                 * @param {Object} value
                 * @return {undefined}
                 */
                sessionStorage: function(key, value) {
                    var storage = window.sessionStorage;
                    if (storage) {
                        if (arguments.length == 1) {
                            value = storage.getItem(key);
                            return value;
                        } else if (arguments.length == 2) {
                            if (value) {
                                storage.setItem(key, value);
                            } else {
                                storage.removeItem(key);
                            }
                        }
                    }
                }
            };

        })();
        schneider.accessToken = (function() {
            var _a = "accessToken";
            return {
                get: function() {
                    return schneider.storage.sessionStorage(_a);
                },
                set: function(val) {
                    schneider.storage.sessionStorage(_a, val);
                },
                remove: function() {
                    schneider.storage.sessionStorage(_a, null);
                }
            }
        })();
        schneider.refreshToken = (function() {
            var _r = "refreshToken";
            return {
                get: function() {
                    return schneider.storage.sessionStorage(_r);
                },
                set: function(val) {
                    schneider.storage.sessionStorage(_r, val);
                },
                remove: function() {
                    schneider.storage.sessionStorage(_r, null);
                }
            }
        })();
        
    schneider.Ajax = (function() {

        var errorURL = "login.html";
        return {
            server : schneider.config.API_SERVER_URL,
            errorURL: errorURL,
            //Default auth options
            defaultAuthOptions: {
                url: schneider.config.AUTH_SERVER_URL + "/access_token",
                type: "POST",
                dataType: "JSON",
                data: {
                    client_id: setting.CLIENT_ID,
                    client_secret: setting.CLIENT_SECRET
                }
            },
            //Failed requests
            failedRequests: {
                queue: [],
                number: 0,
                delayTime: 2000
            },
            //Delay requests object
            delayRequests: {
                times: 0,
                intervalTime: 0,
                url: null,
                type: null,
                param: null,
                parameters: null,
                data: null
            },
            //get access token
            getAccessToken: function() {
                return schneider.storage.sessionStorage("accessToken");
            },
            //set access token
            _setAccessToken: function(_accessToken) {
                schneider.storage.sessionStorage("accessToken", _accessToken);
            },
            //get refresh token
            _getRefreshToken: function() {
                return schneider.storage.sessionStorage("refreshToken");
            },
            //set refresh token
            _setRefreshToken: function(_refreshToken) {
                schneider.storage.sessionStorage("refreshToken", _refreshToken);
            },
            //refresh access token
            _refreshAccessToken: function(callback) {
                var self = this;
                if (!self._getRefreshToken()) {
                    self.logout();
                    return;
                }
                var obj = self.defaultAuthOptions;
                obj.async = false;
                obj.data.grant_type = "refresh_token";
                obj.data.refresh_token = self._getRefreshToken();
                obj.data.contentType = "application/x-www-form-urlencoded";
                obj.success = function(result) {
                    self._setAccessToken(result.access_token);
                    self._setRefreshToken(result.refresh_token);
                    if (callback) {
                        callback();
                    }
                };
                obj.error = function(result) {
                    self.logout();
                }; 
                self._request(obj);
            },
            //request failed ajax queue
            _requestFailedQueue: function() {
                var self = this;
                var failedRequestsQueue = self.failedRequests.queue;
                if (failedRequestsQueue.length > 0) {
                    $.each(failedRequestsQueue, function(index, obj) {
                        self._request(obj);
                    });
                    self.failedRequests.queue = [];
                    self.failedRequests.number = 0;
                }
            },
            //defer to execute failure requests
            _deferFailedRequests: function(obj) {
                var self = this;
                if (this.failedRequests.number == 0) {
                    function delayFun() {
                        self._refreshAccessToken(function() {
                            self._requestFailedQueue();
                        });
                    }
                    setTimeout(function() {
                        delayFun();
                    }, self.failedRequests.delayTime);
                }
                self.failedRequests.queue.push(obj);
                self.failedRequests.number++;
            },
            // priavte request method
            _request: function(obj) {
                var self = this;
                if (obj.url.indexOf('access_token=')>0) {
                    obj.url = obj.url.replace(/access_token=[\w\d]{32}/, "access_token=" + this.getAccessToken());
                } else {
                    obj.url += (obj.url.indexOf('?')>0 ? '&' : '?') + "access_token=" + this.getAccessToken();
                }
//                if ($.browser.msie) {
//                    if (obj.url.include('random=')) {
//                        obj.url = obj.url.replace(/rand=[\w\d]{32}/, "random=" + schneider.util.md5(Math.random()));
//                    } else {
//                        obj.url += (obj.url.include('?') ? '&' : '?') + "random=" + schneider.util.md5(Math.random());
//                    }
//                }
                var requestSuccessFun = obj.success ? obj.success : "";
                var requestErrorFun = obj.error ? obj.error : "";
                var successHandler = (obj.success && $.isFunction(requestSuccessFun)) ? requestSuccessFun : function() {
                };
                var errorHandler = (obj.error && $.isFunction(requestErrorFun)) ? function(error) {
                  //  defaultDataError(error);
                    requestErrorFun(error);
                } : function(error) {
                    defaultDataError(error);
                    customDataError(error);
                };

                //default data request error handle
                function defaultDataError(error) {
//                    console.log(error+"  error "+JSON.stringify(error))
                    var errorNumber = parseFloat(error.error_code);
                    if (schneider.util.inArray(errorNumber, [21327, 21334, 21335, 21336])) {
                        self._deferFailedRequests(obj);
                    } else if (schneider.util.inArray(errorNumber, [21305, 21332, 21333])) {
                        self.logout();
                    } else if (errorNumber == 20006 && error.error.indexOf("@") == -1) {
                        self.logout();
                    }
                    schneider.util.unmask();
                }
                ;

                //custom data request error handle
                function customDataError(error) {
                    var errorNumber = parseInt(error.error_code);
                    var errorContent = error.error.toLowerCase();
                    var errorRequest = error.request.toLowerCase();
                    var errorParams = error.params;
                    if (!schneider.util.inArray(errorNumber, [20006, 21327, 21334, 21335, 21305, 21332, 21333, 21334, 21335, 21336])) {
                        if (errorNumber == 20007) {
                            if (schneider.util.inString("tag", errorContent)) { 
                                errorTipDis("tag_already_exists")
                            } else if (schneider.util.inString("gateway", errorContent)) { 
                                errorTipDis("gateway_already_exists")
                            } else if (schneider.util.inString("name", errorContent)) {
                                if (schneider.util.inString("device", errorRequest)) { 
                                    errorTipDis("device_already_exists")
                                } else if (schneider.util.inString("sites", errorRequest)) { 
                                    errorTipDis("site_already_exists")
                                }
                            } else if (schneider.util.inString("serival", errorContent)) { 
                                errorTipDis("serial_number_already_exists")
                            } else if (schneider.util.inString("devices", errorRequest)) { 
                                errorTipDis("serial_number_already_exists")
                            } else if (schneider.util.inString("group", errorRequest)) { 
                                errorTipDis("group_already_exists")
                            } else if (schneider.util.inString("machines", errorRequest)) { 
                                errorTipDis("controller_already_exists")
                            }else {   
                                errorTipDis(errorNumber)
//                                dialog.render({
//                                    lang: "resource_already_exists"
//                                });
                            }
                        } else if (errorNumber == 21322) {
                            if (schneider.util.inString("machines", errorRequest)) { 
                                errorTipDis("controller_already_exists")
                            }
                            else if (schneider.util.inString("devices", errorRequest)) { 
                                errorTipDis("gateway_already_exists")
                            }
                            else if (schneider.util.inString("sites", errorRequest)) { 
                                errorTipDis("site_already_exists")
                            }
                            else if (schneider.util.inString("models", errorRequest)) { 
                                errorTipDis("model_already_exists")
                            }
                        } else {
                            if ($.isArray(errorParams)) {
                                var _prompt = locale.get(errorNumber, errorParams);
                                dialog.render({
                                    text: _prompt
                                })
                            } else {
                                errorTipDis(errorNumber) 
                            }
                        }
                    }
                    unload();
                }
                ;

                // default ajax request error handler
                function defaultAjaxError(XMLHttpRequest, textStatus, errorThrown) {
                    // The error information encapsulated into results
                    var error = {
                        request: XMLHttpRequest,
                        status: textStatus,
                        thrown: errorThrown
                    };
                    if (error.status && (error.status != "abort")) {// modified by qinjunwen, ignore "abort" status
                        if (error.status == "timeout") {
                            errorTipDis("network_timeout+!") 
                        } else {
                            if (error.request.readyState !== 0 && error.request.readyState!== 4) {
                                errorTipDis("network_error+!") 
                            }
                        }
                    }
                    schneider.util.unmask();
                }
                ;

                //new ajax object
                obj = $.extend(obj, {
                    success: function(result) {
                        //if is to create and delete, delay correction
                        function handler() {
                            if (result.error) {
                                errorHandler(result);
                            } else {
                                successHandler(result);
                            }
                        }
                        switch ($.trim(obj.type.toLowerCase())) {
                            case "delete":
                                setTimeout(function() {
                                    handler();
                                }, 600);
                                break;
                            case "post":
                                if (schneider.util.inString("/list", obj.url)) {
                                    handler();
                                } else {
                                    setTimeout(function() {
                                        handler();
                                    }, 600);
                                }
                                break;
                            default:
                                handler();
                                break;
                        }
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        defaultAjaxError(XMLHttpRequest, textStatus, errorThrown);
                    }
                });
                //If this is the request queue, queue request
                if (obj.delay) {
                    var delay = obj.delay;
                    delete obj.delay;
                    setTimeout(function() {
                        return $.ajax(obj);
                    }, delay);
                } else {
                    return $.ajax(obj);
                }

            },
            // clear access token and refresh token in session storage.
            _logout: function(jump) {
                this._setAccessToken(null);
                this._setRefreshToken(null);
//			alert(this.errorURL);
                if (jump) {
                    window.location.href = this.errorURL;
                }
            },
            clearDelay: function() {
                this.delayRequests.times = 0;
                this.delayRequests.intervalTime = 0;
                this.delayRequests.url = null;
                this.delayRequests.type = null;
                this.delayRequests.param = null;
                this.delayRequests.parameters = null;
                this.delayRequests.data = null;
            },
            //public ajax request
            request: function(options) { 
                var self = this;
                options.url = $.trim(options.url);
                options.url = this.server + (options.url.startsWith("/") ? "" : "/") + options.url;
                if (options.delay && $.isNumeric(options.delay)) {
                    var optionsUrl = options.url.split("/");
                    optionsUrl = (optionsUrl[1] + "/" + optionsUrl[2]).toLowerCase();
                    var optionsType = options.type.toLowerCase();
                    var optionsParam = null;
                    var optionsParameters = null;
                    var optionsData = null;
                    var questionMarkIndex = options.url.indexOf("?");
                    if (questionMarkIndex != -1) {
                        optionsParam = options.url.substring(questionMarkIndex + 1).toLowerCase();
                    }
                    if (options.parameters) {
                        optionsParameters = JSON.stringify(options.parameters);
                    }
                    if (options.data) {
                        optionsData = JSON.stringify(data);
                    }
                    if (this.delayRequests.url != optionsUrl || this.delayRequests.type != optionsType || self.delayRequests.param != optionsParam || self.delayRequests.parameters != optionsParameters || self.delayRequests.data != optionsData) {
                        self.delayRequests.times = 1;
                        self.delayRequests.intervalTime = options.delay;
                        self.delayRequests.url = optionsUrl;
                        self.delayRequests.type = optionsType;
                        self.delayRequests.param = optionsParam;
                        self.delayRequests.parameters = optionsParameters;
                        self.delayRequests.data = optionsData;
                    } else {
                        self.delayRequests.times++;
                        if (self.delayRequests.intervalTime != options.delay) {
                            options.delay = (self.delayRequests.times - 1) * self.delayRequests.intervalTime + options.delay;
                        } else {
                            options.delay = self.delayRequests.times * self.delayRequests.intervalTime;
                        }
                    }
                }
                if (options.parameters) {

                    for (var i in options.parameters) {
                          if (options.parameters.hasOwnProperty(i)) {
                              

                              if(schneider.util.IsNum(options.parameters[i])){//值为数字
                                  this[i] = options.parameters[i]; 
                              }else{
                                  this[i] = options.parameters[i] &&  options.parameters[i]!=undefined ? options.parameters[i]:''; 
                              }
                               
                             options.url += (options.url.indexOf('?')>0 ? '&' : '?') + i+"="+this[i];
//                             options.url += (options.url.indexOf('?')>0 ? '&' : '?') + options.parameters;
                          }
                       } 
//                    options.parameters = options.parameters && options.parameters!=""? options.parameters : JSON.stringify(options.parameters);
//                    options.url += (options.url.indexOf('?')>0 ? '&' : '?') + options.parameters;
//                    console.log("  JSON.stringify options.parameters"+options.url)
                    delete options.parameters;
                }
//                if ($.browser.msie) {
//                //if($.browser.msie = /msie/.test(navigator.userAgent.toLowerCase())){
//                    options.url += (options.url.include('?') ? '&' : '?') + "random=" + Math.random();
//                }
                if (options.data && ($.isPlainObject(options.data)) && (options.type.toUpperCase() == "POST" || options.type.toUpperCase() == "PUT")) {
//                    options.data = Object.toJSON(options.data);
                 
                    options.data = JSON.stringify(options.data);
                }
                var obj = {
                    type: "GET",
                    dataType: "JSON",
                    contentType: "application/json;charset=UTF-8",
                    processData: false,
                    timeout: 120000
                };
                obj = $.extend(obj, options); 
                return this._request(obj);
            },
            /*
             * @name Ajax.login
             * @type {method}
             * @description "用户登录"
             * @param {Object} options.
             */
            login: function(options) {
                var self = this;
                if ((options.username && options.username!=""  && options.username.strip().empty()) && (options.password && options.password!="" && options.password.strip().empty())) {
                    errorTipDis("username_or_password_cannot_be_null")
                    return;
                }
                var params = $.extend({}, this.defaultAuthOptions);
                params.data.grant_type = "password";
                params.data.username = options.username;
                params.data.password = options.password.md5();
                params.data.pictureId = options.pictureId;
                params.data.code = options.code;
                params.data.language = options.language;
                params.type = "POST";
                params.success = function(data) {
                    window.location.href = options.redirectURL;
                    self._setAccessToken(data.access_token);
                    self._setRefreshToken(data.refresh_token);
                };
                if (options.error) {
                    params.error = options.error;
                }
                params.url = options.url;
//                params.data = Object.toJSON(params.data);
                params.data = JSON.stringify(params.data);
                this._request(params);
            },
            /*
             * @name Ajax.logout
             * @type {method}
             * @description "用户注销"
             */
            logout: function() {
                var self = this;
                this.request({
                    url: "api2/logout",
                    type: "GET",
                    error: function() {
                        self._logout(true);
                    },
                    success: function() {
                        self._logout(true);
                    }
                });
            },
            /*
             * Check login state
             */
            checkLogin: function() {
                if (!this.getAccessToken() || !this._getRefreshToken()) {
                    this._logout(true);
                }
            }

        };

    })();

    schneider.util.mask = function(element, label) {
        element = (typeof element === "string") ? $(element) : element;
        label = label || locale.get({
            lang: "loading"
        });
        if (schneider.util.isMasked(element)) {
            schneider.util.unmask(element);
        }

        if (element.css("position") == "static") {
            element.addClass("masked-relative");
        }

        element.addClass("masked");

        var maskDiv = $('<div class="loadmask"></div>');

        // auto height fix for IE
        if (navigator.userAgent.toLowerCase().indexOf("msie") > -1) {
            maskDiv.height(element.height() + parseInt(element.css("padding-top"), 0) + parseInt(element.css("padding-bottom"), 0));
            maskDiv.width(element.width() + parseInt(element.css("padding-left"), 0) + parseInt(element.css("padding-right"), 0));
        }

        // fix for z-index bug with selects in IE6
        if (navigator.userAgent.toLowerCase().indexOf("msie 6") > -1) {
            element.find("select").addClass("masked-hidden");
        }

        element.append(maskDiv);

        if (label !== undefined) {
            var msgDiv = '<div class="sk-wave"> <div class="sk-rect sk-rect1"></div> <div class="sk-rect sk-rect2"></div> <div class="sk-rect sk-rect3"></div> <div class="sk-rect sk-rect4"></div> <div class="sk-rect sk-rect5"></div> </div>'
            var maskMsgDiv = $("<div class='loadmask-msg'>" + msgDiv + "</div>");
            // maskMsgDiv.append('<div>' + label + '</div>');
            element.append(maskMsgDiv);

            // calculate center position
//			maskMsgDiv.css("top",Math.round(element.height()/ 2- (maskMsgDiv.height()- parseInt(maskMsgDiv.css("padding-top"),0) - parseInt(maskMsgDiv.css("padding-bottom"),0)) / 2)+ "px");
//			maskMsgDiv.css("left", Math.round(element.width()/ 2- (maskMsgDiv.width()- parseInt(maskMsgDiv.css("padding-left"),0) - parseInt(maskMsgDiv.css("padding-right"), 0)) / 2)+ "px");
        }
    };
 /*
     * @name unmask
     * @type {function}
     * @description "Unload mask"
     * @param {Object} element "element is HTMLElEMENT or string or $ object"
     * @return {undefined}
     */
    schneider.util.unmask = function(element) {
        if ($(".loadmask").length == 0) {
            return;
        }
        if (!element) {
            $(".loadmask").remove();
            $(".loadmask-msg").remove();
            //$(".loadmask-fixed").remove();
            return;
        }
        element = (typeof element === "string") ? $(element) : element;
        element.find(".loadmask-msg,.loadmask").remove();
        element.removeClass("masked");
        element.removeClass("loadmask-fixed");
        element.find("select").removeClass("masked-hidden");
    };
        schneider.util.isMasked = function(opt) {
            var element = opt && opt!="" ? $(opt) : opt;
            if (element) {
                return element.hasClass("masked");
            }
        };

        schneider.util.inArray = function(data, arr) {
            var total = 0;
            for (var num = 0; num < arr.length; num++) {
                if (arr[num] == data) {
                    total++;
                }
            }
            if (total > 0) {
                return true;
            } else {
                return false;
            }
        };
        schneider.util.IsNum = function(str){ 
            if (str!=null && str!=="")
            {
                return !isNaN(str);
            }
            return false;
        }
        schneider.util.inString = function(match, str, sensitive) {
            var sensitive = sensitive ? true : false;
            if (!sensitive) {
                var match = match.toLowerCase();
                var str = str.toLowerCase();
            }
            if (str.indexOf(match) > -1) {
                return true;
            } else {
                return false;
            }
        };
        schneider.util.has = function(obj, key) {
            obj = new Object(); 
            return obj.hasOwnProperty(key);   // returns false 
	}; 
        /*
	 * @name random
	 * @type {function}
	 * @description "Return a random integer between min and max (inclusive)."
	 * @param {Object} min
	 * @param {Object} max
	 * @return {Number}
	 */
	schneider.util.random = function(min, max) {
		if (max === null) {
			max = min;
			min = 0;
		}
		return min + Math.floor(Math.random() * (max - min + 1));
	};
    schneider.util.dateFormat = function(date, format) {
		// temporary convert date. exclude it after api fixed the issue.
        if(date!="") {
            //参数是秒数
            if (date.toString().length == 10) {
                date = new Date(date * 1000);
            }else{
                date = new Date(date);
            }
        }else{
            date = new Date();
        }

		var o = {
			"M+" : date.getMonth() + 1,
			"d+" : date.getDate(),
			"h+" : date.getHours(),
			"m+" : date.getMinutes(),
			"s+" : date.getSeconds(),
			"q+" : Math.floor((date.getMonth() + 3) / 3),
			"S" : date.getMilliseconds()
		};
		if (/(y+)/.test(format)){
			format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for ( var k in o){
			if (new RegExp("(" + k + ")").test(format)){
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
			}
		}
		return format;
	};
        schneider.util.md5 = (function(str) {

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
                String.prototype.md5 = function() {
                    return MD5(this).toUpperCase();
                };
            }

            return function(str) {
                return MD5(str).toUpperCase();
            };

        })();

    return schneider;
});
