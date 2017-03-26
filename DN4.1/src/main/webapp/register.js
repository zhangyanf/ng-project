/*============================
*2016-09-05 Lee李杰
*注册页面
*/
/*============================
*本地化页面
**/
if( locale.current() == 1) {
    $("#chineseLanguage").hide();
    $("#englishLanguage").show();
} else {
    $("#englishLanguage").hide();
    $("#chineseLanguage").show();
}
locale.render({element: "body"});
/*============================
*表单验证
**/
validator.render("#registerInfoBox", {
    promptPosition: "inline",
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
$("#imgVcode").click(function(event) {
    showAuthCode();
});
//创建提交函数
function creatSubmit() {
    var self = this;

    //得到填入的参数值
    var registerEmail = $("#registerEmail").val();
    var registerUserName = $("#registerUserName").val();
    var registerOrganization = $("#registerOrganization").val();
    var registerSecure = $("#registerSecure").val();
    var picId = $("#imgVcode").attr("picid");
    var questionId = parseInt($("#reSecurityQuestions").val());
    //console.log( questionId);
    var question = $("#reSecurityQuestions").find("option:selected").text();
    console.log(question);
    var answer = $("#reSecurityAnswer").val();
    //加入判断
    if( registerEmail != "" && registerUserName != "" && registerOrganization != "" && registerSecure != "" && answer != "" ) {
        var option = {};
        option.data = {
            email: registerEmail,
            username: registerUserName,
            name: registerOrganization,
            varificationCode: registerSecure,
            picId: picId,
            question: question,
            answer: answer,
            questionId: questionId
        };
        option.data = JSON.stringify( option.data);
        option.url = "/api2/organizations?language=" + locale.current();
        option.type = "POST";
        option.dataType = "json";
        option.contentType = "application/json;charset=UTF-8";
        self.option = option;
        //错误信息
        option.error = function(){
            console.log(ERROR);
            alert( ERROR);
        };
        //成功信息
        option.success = function( data) {
            //返回的错误信息
            if( data.error) {
                showAuthCode();
                console.log("error messages, ", data.error);
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
                //creatAccout();
                //页面显示
                $("#infoHeader").removeClass("btn-primary");
                $("#finishHeader").addClass("btn-primary");
                $("#writeInformation").css("display","none");
                $("#finishRegister").css("display","block");
            }
        };
        $.ajax(option);
        $("#resendEmail").click(function(event) {
            $.ajax(option);
        });
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
            $("#imgVcode").attr("src", imgUrl).attr("picId", data.pictureId);
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
        $("#registerEmail").after('<div id="codeEmailDiff"><span style="color:red">*&nbsp;</span><span lang="text:entered_passwords_differ" style="color:red">邮箱格式不正确</span></div>')
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
$("#resendEmail").click(function(event) {
    function resendTime() {
        $("#resendEmail").attr("disabled","disabled");
        var time = $("#resendEmailTime").html();
        time = time.substring( 1, time.indexOf("s"));
        if( time) {
            time = parseFloat( time);
            console.log( time);
            if( time === 0) {
                clearInterval(t);
                $("#resendEmail").removeAttr('disabled');
                //console.log( locale._get("send"));
                $("#resendEmailTime").text("");
            } else {
                $("#resendEmailTime").html("("+(time - 1) + "s"+")");
            }
        }else {
            $("#resendEmailTime").html("(120s)");
        }
    }
    t = setInterval( function() {
        resendTime();
    }, 1000);
    resendTime();
});

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