/*============================
 *2016-09-05 Lee李杰
 *注册页面
 */
/*============================
 *本地化页面
 **/
if( locale.current() == 1) {
    $("#home-nav-aboutus").children("a").attr("href", "http://www.inhandnetworks.com/");
    $("#chineseLanguage").hide();
    $("#englishLanguage").show();
} else {
    $("#home-nav-aboutus").children("a").attr("href", "http://www.inhand.com.cn/");
    $("#englishLanguage").show();
    //$("#chineseLanguage").show();

}
locale.render({element: "body"});
/*============================
 *表单验证
 **/
validator.render("#registerInfoBox", {
    promptPosition: "centerTop",
    showOneMessage:true,
    maxErrorsPerField:1,
    scroll: false
});
//nav对象 为“首页|注册|映翰通”中的"首页"添加选中效果
function FnNav() {
    this.pageNum = 2;
    this.page = {
        0: "#home-nav-index",
        1: "#home-nav-login",
        2: "#home-nav-reg",
        3: "#home-nav-devforum",
        4: "#home-nav-aboutus"
    };

    this.setCurrent = function() {
        $(this.page[this.pageNum]).siblings().removeClass("home-nav-a-current");
        $(this.page[this.pageNum]).addClass("home-nav-a-current");
    };
}
//header对象 为"中文|English"点击操作添加css效果，以及设置本地语言
function FnHeader() {
    this.zh = $("#lang-en");
    this.en = $("#lang-zh");
    this._promptCurrentLang = function() {
        var lang = localStorage.getItem("language");
        if (lang == "en") {
            $("#lang-zh").css("color", "#555");
            $("#lang-en").css("color", "#83a82f");
        } else if (lang == "zh_CN") {
            $("#lang-zh").css("color", "#83a82f");
            $("#lang-en").css("color", "#555");
        }
    };
    this.zh.bind("click", function() {
        locale.set({lang: "en"});
        $(".language").hide();
        $("#chineseLanguage").hide();
        $("#englishLanguage").show();
        $("#home-nav-aboutus").children("a").attr("href", "http://www.inhandnetworks.com/");
        validator.render(validator.element, validator.paramObj);
        header._promptCurrentLang();
    });
    this.en.bind("click", function() {
        locale.set({lang: "zh_CN"});
        $(".language").hide();
        $("#englishLanguage").hide();
        $("#chineseLanguage").show();
        $("#home-nav-aboutus").children("a").attr("href", "http://www.inhand.com.cn/");
        validator.render(validator.element, validator.paramObj);
        header._promptCurrentLang();
    });
}
//点击同意条款
$("#agreeA").click(function(event){
    $("#itemHeader").removeClass("btn-primary");
    $("#infoHeader").addClass("btn-primary");
    $("#readItems").css("display","none");
    $("#writeInformation").css("display","block");

    //加载验证码函数
    showAuthCode();
});
//点击条款
$("#itemHeader").click(function(event) {
    $("#infoHeader").removeClass("btn-primary");
    $("#itemHeader").addClass("btn-primary");
    $("#writeInformation").css("display","none");
    $("#readItems").css("display","block");
});
//点击创建
$("#creatAccout").click(function(event) {
    if( $("#registerInfoBox").validationEngine('validate')) {
        $(".existEmail").remove();
        $(".existOrg").remove();
        $(".secureErr").remove();
        creatSubmit();
    }
});
$("#registerEmail").focus(function(event) {
    $(".existEmail").remove();
});
$("#registerOrganization").focus(function(event) {
    $(".existOrg").remove();
});
$("#registerSecure").focus(function(event) {
    $(".secureErr").remove();
});
//点击切换验证码
$("#reg_imgVcode").click(function(event) {
    showAuthCode();
});
//创建提交函数
function creatSubmit() {
    var self = this;
    self.md5 = (function(str) {
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
    //得到填入的参数值
    var registerEmail = $.trim($("#registerEmail").val());
    //var registerUserName = $("#registerUserName").val();
    var registerOrganization = $.trim($("#registerOrganization").val());
    var registerSecure = $.trim($("#registerSecure").val());
    var picId = $("#reg_imgVcode").attr("picid");
    //var questionId = parseInt($("#reSecurityQuestions").val());
    //var question = $("#reSecurityQuestions").find("option:selected").text();
    //var answer = $("#reSecurityAnswer").val();
    var pwd = $.trim($("#register_password").val());
    //加入判断
    if( registerEmail != "" && registerOrganization != "" && registerSecure != "" &&  pwd!="") {
        var option = {};
        option.data = {
            email: registerEmail,
            //username: registerUserName,
            name: registerOrganization,
            varificationCode: registerSecure,
            picId: picId,
            password:self.md5(pwd)
            //question: question,
            //answer: answer,
            //questionId: questionId
        };
        option.data = JSON.stringify( option.data);
        option.url = "/api2/organizations?language=" + locale.current();
        option.type = "POST";
        option.dataType = "json";
        option.contentType = "application/json;charset=UTF-8";
        self.option = option;
        //错误信息
        option.error = function(){
            //console.log(ERROR);
            //alert( ERROR);
        };
        //成功信息
        option.success = function( data) {
            //返回的错误信息
            if( data.error) {
                showAuthCode();
                if( data.error_code == 20007) {
                    if (data.error.indexOf("@") > -1) {
                        $(".existEmail").remove();
                        $("#registerEmail").after("<span class='regist-tips existEmail' style='margin-top:3px;padding:2px;background-color:red;color:#fff;'>" + locale.get("email_already_exists") + "</span>");
                    } else {
                        $(".existOrg").remove();
                        $("#registerOrganization").after("<span class='regist-tips existOrg' style='margin-top:3px;padding:2px;background-color:red;color:#fff;'>" + locale.get("organization_already_exists") + "</span>");
                    }
                }
                if( data.error_code == 20013) {
                    $(".secureErr").remove();
                    $("#registerSecure").after("<span class='regist-tips secureErr' style='margin-top:3px;padding:2px;background-color:red;color:#fff;'>" + locale.get(data.error_code + "") + "</span>");
                }
            } else {
                //注册成功后页面显示
                $("#infoHeader").removeClass("btn-primary");
                $("#finishHeader").addClass("btn-primary");
                $("#writeInformation").css("display","none");
                $("#finishRegister").css("display","block");

                $("#registerInfoBox > input").first().click();
                infoTipDis("registration+ success");
                setTimeout("location.reload()",1500);
            }
        };
        $.ajax(option);
    }
}
//验证码函数
//验证码获取并显示
function showAuthCode() {
    var picId;
    var option = {};
    $.ajax({
        url: "/api/captchas",
        type: "GET",
        dataType: "JSON",
        contentType: "image/jpeg",
        success: function( data) {
            //picId = data.pictureId;
            var imgUrl = "/api/captchas/" + data._id;
            $("#reg_imgVcode").attr("src", imgUrl).attr("picId", data.pictureId);
        }
    });
}
//邮箱验证与补全
$("#registerEmail").blur( function(event) {
    /*emailConAuto();*/
});
function emailConAuto() {
    var email = $("#registerEmail").val();
    var regTest = new RegExp("[w!#$%&'*+/=?^_`{|}~-]+(?:.[w!#$%&'*+/=?^_`{|}~-]+)*@(?:[w](?:[w-]*[w])?.)+[w](?:[w-]*[w])?");
    if( !regTest.test( email)) {
        $("#codeEmailDiff").remove();
        $("#registerEmail").after('<div id="codeEmailDiff"><span style="color:red">*&nbsp;</span><span lang="text:entered_passwords_differ" style="color:red"></span></div>')
    }
}
//自定义安全问题
$("#reSecurityQuestions").click( function(event) {
    var selected = $("#reSecurityQuestions").val();
    if( selected == 0) {
        $(".reSecuritySelfQuestionBox").css("display","block");
    } else {
        $(".reSecuritySelfQuestionBox").css("display","none");
    }
});
//再次发送时间限制
/*
 $("#resendEmail").click(function(event) {
 function resendTime() {
 $("#resendEmail").attr("disabled","disabled");
 var time = $("#resendEmailTime").html();
 time = time.substring( 1, time.indexOf("s"));
 if( time) {
 time = parseFloat( time);
 if( time === 0) {
 clearInterval(t);
 $("#resendEmail").removeAttr('disabled');
 //console.log( locale._get("send"));
 $("#resendEmailTime").text("");
 } else {
 $("#resendEmailTime").html( "("+( time - 1) + "s"+")");
 }
 }else {
 $("#resendEmailTime").html("(120s)");
 }
 }
 t = setInterval( function() {
 resendTime();
 }, 1000);
 resendTime();
 });*/

//首页、注册、映翰通
var nav = new FnNav();
nav.setCurrent();

// login page's width
$( window).resize(function(event) {
    /* Act on the event */
    change_width();
});
// judge width
function change_width() {
    var window_width = $(window).width();
    var header_width = $("#common-header").width();
    if( window_width < header_width) {
        $("body").width("" + header_width + "").css( "overflow", "auto");
    } else {
        $("body").width("100%").css( "overflow-y", "auto");
    }
}
change_width();