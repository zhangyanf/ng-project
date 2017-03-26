/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function getQueryParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != undefined)
        return unescape(r[2]);
    return '';
}
;

function formatNum(num) {
    if (num > 1000000000) {
        return '' + (num / 1000000).toFixed(1) + 'G';
    } else if (num > 1000000) {
        return '' + (num / 1000000).toFixed(1) + 'M';
    } else if (num > 1000) {
        return '' + (num / 1000).toFixed(1) + 'K';
    } else {
        return '' + num;
    }
}
;

function toStatusDesc(stat) {
    if (stat == undefined) {
        return '';
    } else if (stat.indexOf("1") >= 0) {
        return '等待维修';
    } else if (stat.indexOf("2") >= 0) {
        return '进程中';
    } else if (stat.indexOf("3") >= 0) {
        return '已完成';
    } else if (stat.indexOf("4") >= 0) {
        return '已关闭';
    }
};

function toStatusFlag(stat) {
    if (stat == undefined) {
        return false;
    } else if (stat.indexOf("1") >= 0) {
        return false;
    } else if (stat.indexOf("2") >= 0) {
        return false;
    } else if (stat.indexOf("3") >= 0) {
        return true;
    } else if (stat.indexOf("4") >= 0) {
        return true;
    }
}

function formatField(fd) {
    return fd == undefined ? '' : fd;
}
;
function setTblRowColor(tblId) {
    var len = $('#' + tblId + ' tr').length;
    var len1 = 0;
    for (var ii = 0; ii < len; ii++) {

        if (ii % 2 == 1) {
            //$('#'+tblId+' tr:eq(' + ii + ')').css({"color":"#3333ff"});  //设置偶数行字体的颜色

        } else {
            $('#' + tblId + ' tr:eq(' + ii + ')').css({"background": "#F8F8FF"}); //设置奇数行的背景色
        }
    }
}
;
function getAssetType(aType) {
    if (aType == undefined) {
        return '未指定类型';
    } else if (aType == 1) {
        return '公用设备';
    } else if (aType == 2) {
        return '固定设备';
    } else if (aType == 3) {
        return '试用设备';
    } else {
        return '未指定类型';
    }
}
;

function getFaultType(aType) {
    if (aType == undefined) {
        return '常规报修';
    } else if (aType == '1') {
        return '停机故障';
    } else if (aType == '2') {
        return '普通故障';
    } else if (aType == '3') {
        return '预防性维护';
    } else if (aType == '4') {
        return '工作';
    } else if (aType == '5') {
        return '清单';
    } else if (aType == '6') {
        return '任务';
    } else {
        return '常规报修';
    }
};
function toFaultFlag(aType) {
    if (aType == undefined) {
        return false;
    } else if (aType == '1') {
        return true;
    } else {
        return false;
    }
};
function calYearOfDays(days) {
    var y = Math.floor(days / 365);
    var d = (days % 365);
    var result = '' + (y > 0 ? '' + y + '年' : '') + d + '天';
    return result;
}
;

//by函数接受一个成员名字符串和一个可选的次要比较函数做为参数

//并返回一个可以用来包含该成员的对象数组进行排序的比较函数

//当o[age]和 p[age] 相等时，次要比较函数被用来决出高下

function orderby(name, minor) {

    return function (o, p) {

        var a, b;

        if (o && p && typeof o === 'object' && typeof p === 'object') {
            a = o[name];
            b = p[name];
            if (a === b) {
                return typeof minor === 'function' ? minor(o, p) : 0;
            }

            if (typeof a === typeof b) {
                return a < b ? -1 : 1;
            }

            return typeof a < typeof b ? -1 : 1;
        } else {
            thro("error");
        }
    }

}
;
function getToday() {
    var time;
    var date = new Date();
    var year = date.getFullYear();
    var month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    time = year + "-" + month + "-" + day;
    return time;
}
;
function getTodayTime() {
    var time;
    var date = new Date();
    var year = date.getFullYear();
    var month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    time = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    return time;
}
;
function getTodayShrtFmt() {
    var time;
    var date = new Date();
    var year = date.getFullYear();
    var month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    time = year + "" + month + "" + day;
    return time;
}
;
function timeformat(date, format) {
    var time;
    var year = date.getFullYear();
    var month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    if (format == "hour" || format == time) {
        time = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    } else if (format == "shortdate") {
        time = year + "" + month + "" + day;
    } else {
        time = year + "-" + month + "-" + day;
    }

    return time;
}

/**
 * 格式化日期为字符串表示
 * @param datetime:Date 要格式化的日期对象
 * @param format:String 日期格式
 */
function formatDate(datetime, format) {
    var cfg = {
            MMM: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
            MMMM: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
        },
        values = {
            y: datetime.getFullYear(),
            M: datetime.getMonth(),
            d: datetime.getDate(),
            H: datetime.getHours(),
            m: datetime.getMinutes(),
            s: datetime.getSeconds(),
            S: datetime.getMilliseconds()
        };
    /*用正则表达式拆分日期格式各个元素*/
    var elems = format.match(/y+|M+|d+|H+|m+|s+|S+|[^yMdHmsS]/g);
//将日期元素替换为实际的值
    for (var i = 0; i < elems.length; i++) {
        if (cfg[elems[i]]) {
            elems[i] = cfg[elems[i]][values[elems[i].charAt(0)]];
        } else if (values[elems[i].charAt(0)]) {
            elems[i] = formatNumber(values[elems[i].charAt(0)], elems[i].replace(/./g, '0'));
        }
    }
    return elems.join('');
}

function hasToken() {
    var token = sessionStorage.access_token;
    if (token != undefined && token) {
        return true;
    } else {
        return false;
    }
}

var pattern = /^[a-zA-Z0-9_\-\u4e00-\u9fa5]+$/i;

//2016-11-26 Lee李杰
//将字符串中的所有空格转换为下划线(_)
function changeBlankToLine(string) {
    var target_string = string.replace(/\s/g, "_");
    return target_string;
}

/**
 * 错误提示框   不自动消失
 * @param content
 */
function errorTipDis(content) {
    dialog.render({
        lang: content,
        buttons: [{lang: "yes", click: function() {
            dialog.close();
        }}],
        close: function () {
            dialog.close();
        }
    });

}
/**
 * 消息提示框  自动消失
 * @param content
 */
function infoTipDis(content) {
    dialog.render({
        lang: content
    });
}