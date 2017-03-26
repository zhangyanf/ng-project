
 /**
  * 添加div标签
  * @param ele 目标对象(jquery对象)
  * @param flag flag是搜索条件字段名
  */
function addElement(ele,flag) {
        var id = "auto"+flag;
        $("#"+id).remove();
       // if(xxxFlag!=flag) {
            ele.parent().append('<div style="max-height:200px;overflow:auto;position:absolute!important;" ;z-index: 2147483647;" id="'+id+'"></div>');
            $("#"+id).css("width",ele.css("width"));
            var w = ele.parent().css("width");
            w = parseInt(w.substring(0,w.indexOf("p")))-parseInt(ele.css("width").substring(0,ele.css("width").indexOf("p")));
            $("#"+id).css({'background-color':'#fff','border':'1px solid #efefef'});
            if(flag!="name") {
                $("#"+id).css("margin-top",ele.css("height"));
            }else {
                $("#"+id).css("margin-left",w+"px");
            }
}

 /**
  * 填充自动检索的内容
  * @param data 查询到的数据
  * @param name 搜索字段名与addElement()的flag参数必须一致
  * @param ele 目标对象(jquery对象)
  */
 function suggestionAndMarker(data,name,ele) {
     var id = "auto"+name;
    $("#"+id).empty();
    if (data != null || data.length>0) {
        for (var i = 0; i < data.length; i++) {
           // if ($("#"+id).children().length < 6) {
                $("#"+id).append("<p style='padding: 5px;word-break: break-all;margin: auto;cursor:pointer;' id='" + data[i]._id + "'>" + data[i][name] + "</p>");
                $("#"+id+" p").each(function() {
                    var $p = $(this);
                    $p.click(function(event) {
                        var oldId = $(this).attr("id");
                        var value = $("#"+oldId).text();
                        ele.val(value);
                        ele.attr("autovalue",oldId);
                        $("#"+id).hide();
                    });
                });
                $("#init_body").mouseup(function(event) {
                    $("#"+id).hide();
                });
          //  }
            $("#"+id+" p").hover(function() {
                $(this).css("background", '#eee');
                },
                function() {
                    $(this).css("background", '#fff');
                });
        }
    }

}
