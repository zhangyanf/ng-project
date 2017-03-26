/**
 * Created by zengqiang on 2017/2/22.
 */
  

    /**
     *
     * 生成tab，并追加到dom
     *
     * @param {Object} build_tab_param :生成tab需要的id等参数
     * @param {string}  callback 关闭tab需要执行的函数方法名
     * @return {object} content 返回的tab内容
     * */
    function create_tab_schedule(build_tab_param) {
        var type=build_tab_param.type;
        var nav_id=build_tab_param.nav_id;
        var panes_id=build_tab_param.panes_id;
        var title_text=build_tab_param.nav_title_text;
        var container_nav_id=build_tab_param.container_nav_id;
        var container_panes_id=build_tab_param.container_panes_id;
        var nav_title='';
        if(type==='add'){
            nav_title= '<a role="tab" lang="text:create_schedule_plan" data-toggle="tab" href="#'+panes_id+'">创建计划</a>';
        }else if(type==='update'){
            nav_title='<a role="tab" data-toggle="tab" href="#'+panes_id+'">'+title_text+'</a>';
        }
        var tab_nav='<li role="presentation" class="tab_position" id="'+nav_id+'">'+
                nav_title +
                '<div class="pull-right tab_btn_close" data-toggle="tooltip" title="" lang="title:close" onclick="remove_tab(\''+nav_id+'\',\''+panes_id+'\');">'+
                '<button class="btn btn-box-tool tab_btn_close_color"><i class="glyphicon glyphicon-remove"></i></button>'+
                '</div>'+
                '</li>';
        var tab_panes='<div role="tabpanel" class="tab-pane" id="'+panes_id+'"></div>';

        // 把生成的tab加到网页里
        $("#"+container_nav_id).append(tab_nav);
        $("#"+container_panes_id).append(tab_panes);
    }

    /**
     *
     * 生成创建或修改计划的内容
     *
     * @param {string} type : add or update
     * @param {string}  nav_id、 panes_id :tab的导航、内容体 的id
     * @param {string} form1_id : 存储数据的form表单的id
     * @return
     * */
    function create_content_schedule(type,form1_id,nav_id,panes_id,schedule_id) {
        var group_planName="<div class='form-group' name='group_planName'>" +
                            "       <label class='col-sm-3 control-label'><span lang='text:plan_name'></span><span class='text-red'>*</span></label>"+
                            "       <div class='col-sm-7'>" +
                            "           <input type='text' class='form-control validate[required,maxSize[30],specialCharacter]' name='plan_name' placeholder='计划名称' lang='placeholder:plan_name'>"+
                             "      </div>"+
                             "</div>";
        var group_assetNo= "<div class='form-group' name='group_assetNo'>" +
                                    "<label class='col-sm-3 control-label'><span lang='text:asset_number'></span><span class='text-red'>*</span></label>"+
                                    "<div class='col-sm-7'>" +
                                         "<input type='text' class='form-control validate[required]' name='asset_number' placeholder='资产编号' readonly='readonly' lang='placeholder:asset_number'>"+
                                    "</div>"+
                                    "<button type='button' class='btn btn-default btn-sm' onclick='showlist_query_device(\""+type+"\",\""+form1_id+"\")'><span class='glyphicon glyphicon-search'></span></button>"+
                              "</div>";
        var group_deviceName="<div class='form-group' name='group_deviceName'>" +
                                   "<label class='col-sm-3 control-label'><span lang='text:device_name'></span><span class='text-red'>*</span></label>"+
                                   "<div class='col-sm-7'>" +
                                        "<input type='text' class='form-control validate[required]' name='device_name' placeholder='设备名称' readonly='readonly' lang='placeholder:device_name'>"+
                                   "</div>"+
                              "</div>";
        var group_siteName="<div class='form-group' name='group_siteName'>" +
                                   "<label class='col-sm-3 control-label'><span lang='text:site'></span><span class='text-red'>*</span></label>"+
                                   "<div class='col-sm-7'>" +
                                       "<input type='text' class='form-control validate[required]' name='site_name' placeholder='现场名' readonly='readonly' lang='placeholder:site2'>"+
                                   "</div>"+
                            "</div>";
        var group_schedule_typ="<div class='form-group' name='group_schedule_type'>" +
                                   "<label class='col-sm-3 control-label'><span lang='text:type'></span><span class='text-red'>*</span></label>"+
                                   "<div class='col-sm-9'>" +
                                        "<label class='radio-inline'>"+
                                            "<input type='radio' name='select_schedule_type' value='1' checked><span lang='text:cyclicity'>周期性:</span>"+'&nbsp;&nbsp;&nbsp;'+
                                        "</label>"+
                                        "<label class='radio-inline'>"+
                                            "<input type='radio' name='select_schedule_type' value='2'><span lang='text:deadline_type'>截至日期型:</span>"+
                                        "</label>"+
                                    "</div>"+
                              "</div>";
        var validation_time_name='validation_time_'+form1_id;
        var failure_time_name='failure_time_'+form1_id;
        var group_validationTime="<div class='form-group' name='group_validationTime'>" +
                                    "<label class='col-sm-3 control-label'><span lang='text:validation_time'></span><span class='text-red'>*</span></label>"+
                                    "<div class='col-sm-7 has-feedback'>" +
                                       "<input type='text' class='form-control validate[required,[custom[date],past[#"+failure_time_name+"]]' name='"+validation_time_name+"' readonly='readonly'>" +
                                       "<span class='glyphicon glyphicon-calendar form-control-feedback' style='right: 15px;'></span>"+
                                    "</div>"+
                                 "</div>";
        var group_failureTime="<div class='form-group' name='group_failureTime'>" +
                                    "<label class='col-sm-3 control-label'><span lang='text:failure_time'></span><span>&nbsp;</span></label>"+
                                    "<div class='col-sm-7 has-feedback'>" +
                                       "<input type='text' class='form-control validate[[custom[date],future[#"+validation_time_name+"]]' name='"+failure_time_name+"' readonly='readonly'>" +
                                       "<span class='glyphicon glyphicon-calendar form-control-feedback' style='right: 15px;'></span>"+
                                    "</div>"+
                                 "</div>";
        var modal_body=""+
             "<div class='box box-solid' style='margin-bottom: 0px;box-shadow: 0px 0px;'>"+
                "<div class='panel-body' style='display: flex;justify-content: center;align-items: center;flex-direction: column; width: 100%;'>" +
                    "<div class='col-sm-8'>" +
                         "<form class='form-horizontal' id='"+form1_id+"'>" +
                               "<input type='text' style='display: none;' name='asset_id'>"+
                               "<input type='text' style='display: none;' value='"+schedule_id+"' name='schedule_id'>"+
                               "<input type='text' style='display: none;' name='site_id'>"+
                               group_planName+
                               group_assetNo+
                               group_deviceName+
                               group_siteName+
                               group_schedule_typ+
                               group_validationTime+
                               group_failureTime+
                         "</form>"+
                    "</div>"+
                     "<div class='col-sm-8'>" +
                        "<div class='modal-footer col-sm-10' style='padding-right: 0px'>" +
                           "<button type='button' class='btn btn-default' data-dismiss='modal' lang='text:close' onclick='remove_tab(\""+nav_id+"\",\""+panes_id+"\")'>关闭</button>"+
                           "<button type='button' class='btn btn-primary' onclick='create_update_schedule(\""+type+"\",\""+form1_id+"\")' lang='text:submit'>提交</button>"+
                        "</div>"+
                     "</div>"+
                "</div>"+
             "</div>";

        $("#"+panes_id).append(modal_body);

        (function(form1_id,type){
            // 在form最后追加form-grop的schedule_type选择框
            gerStringForModal(type,form1_id);
            //类型选择绑定事件
            $("#"+form1_id+" input[name='select_schedule_type']").on('click',function () {
                var datetype=$(this).val();
                if(datetype == 1){
                    $("#"+form1_id+" > div[name='group_schedule_type_2']").hide();
                    $("#"+form1_id+" > div[name='group_schedule_type_1']").show();
                }else{
                    $("#"+form1_id+" > div[name='group_schedule_type_1']").hide();
                    $("#"+form1_id+" > div[name='group_schedule_type_2']").show();
                }
                type_cyclicity_bindEvent(type,form1_id);
                locale.render({element: "#init_body"});
            });
            // cycle_type类型选择时间绑定
            type_cyclicity_bindEvent(type,form1_id);
            $("#"+form1_id+" input[name='form_typeselect']:checked").click();

            // 生效日期和失效日期选择框 加载日期控件
            $("#"+form1_id+" input[name='validation_time_"+form1_id+"'").datepicker({
                language: locale.current() == 1 ? 'en' : 'zh-CN',
                autoclose: true, //选中之后自动隐藏日期选择框
                todayHighlight: true,
                format: 'yyyy-mm-dd',
                //startDate: new Date(),
                initialDate:new Date(),
                startView: 0, //起始选择范围，0为日，1为月，2为年
                minViewMode: 0//最小选择范围
            });
            $("#"+form1_id+" input[name='validation_time_"+form1_id+"']").datepicker('setDate', new Date());
            $("#"+form1_id+" input[name='failure_time_"+form1_id+"'").datepicker({
                language: locale.current() == 1 ? 'en' : 'zh-CN',
                autoclose: true, //选中之后自动隐藏日期选择框
                todayHighlight: true,
                format: 'yyyy-mm-dd',
                //startDate: new Date(),
                initialDate:new Date(),
                startView: 0, //起始选择范围，0为日，1为月，2为年
                minViewMode: 0//最小选择范围
            });

            //验证配置
            validator.render("#"+form1_id, {
                promptPosition: "inline",
                scroll: false
            });
        }(form1_id,type));

        locale.render({element: "#init_body"});
    }

    /**
     *
     * 生成类型选择框，返回对应字符串
     *
     * @param {string} type:add or update
     * @return {String} 返回类型选择项 的字符串表示
     * */
    function gerStringForModal(type,form1_id) {
        var str1="<div class='form-group' name='group_schedule_type_1'>" +
                 "<div class='col-sm-7 col-sm-offset-3'>" +
                 "   <div style='border: 1px solid #d2d6de; padding-bottom: 5px;padding-left: 15px;'>" +
                 "       <div style='width: 100%;'>" +
                 "          <span class='radio-inline'>"+
                 "            <input type='radio' name='form_typeselect' value='day' checked><span lang='text:according_to_the_day'>按天</span>"+
                 "          </span>"+
                 "       </div>"+
                 "       <div style='width: 100%;'>" +
                 "           <span class='radio-inline'>"+
                 "              <input type='radio' name='form_typeselect' value='week'><span lang='text:according_to_the_week'>按周</span>"+
                 "           </span>"+
                 "       </div>"+
                 "       <div>" +
                 "           <span class='radio-inline' style='width: 100%;'>"+
                 "              <input type='radio' name='form_typeselect' value='month'><span lang='text:according_to_the_month'>按月</span>"+
                 "           </span>"+
                 "       </div>"+
                 "   </div>"+
                 "</div>"+
                "</div>";
          var str2="<div class='form-group' style='display: none' name='group_schedule_type_2'>" +
                    "<div class='col-sm-7 col-sm-offset-3'>" +
                    "     <div class='form-group'>" +
                    "       <label class='col-sm-3 control-label' lang='text:deadline'></label>"+
                    "       <div class='col-sm-9 has-feedback' style='padding-left: 0px;'>" +
                    "          <input type='text' name='schedule_type_2' class='form-control' readonly='readonly'>" +
                    "          <span class='glyphicon glyphicon-calendar form-control-feedback' style='right: 15px;'></span>"+
                    "       </div>"+
                    "     </div>"+
                    "</div>"+
                "</div>";

        // 将内容追加到form最后
        $("#"+form1_id+" > div[name='group_schedule_type']").after(str1);
        $("#"+form1_id+" > div[name='group_schedule_type']").after(str2);

        (function(type,form1_id){
            //日期控件加载
            $("#"+form1_id+" input[name='schedule_type_2").datepicker({
                language: locale.current() == 1 ? 'en' : 'zh-CN',
                autoclose: true, //选中之后自动隐藏日期选择框
                todayHighlight: true,
                format: 'yyyy-mm-dd',
                initialDate:new Date(),
                startView: 0, //起始选择范围，0为日，1为月，2为年
                minViewMode: 0//最小选择范围
            });
        }(type,form1_id));
    }

    /**
     *
     * 周期性类型单选绑定事件
     *
     * @param {String} type : add or update
     * @param {String} form1_id
     * @return
     * */
    function type_cyclicity_bindEvent(type,form1_id) {
        (function(form1_id,type){
            $("#"+form1_id+" input[name='form_typeselect']").each(function () {
                $(this).off().on('click',function () {
                    var val=$(this).val();
                    $("#"+form1_id+" input[name='form_typeselect'] ~ div").remove();
                    $("#"+form1_id+" input[name='form_typeselect'][value='"+val+"']").parent().append(getString_type_cyclicity_select(val,type));
                    locale.render({element: "#init_body"});
                });
            });
        }(form1_id,type));
    }

    /**
     * 在类型选择里，生成周期性类型下的日期类型
     * */
    function getString_type_cyclicity_select(month_or_day,type) {
        var language=locale.current();
        if(language == 2){
            var addon= "<div style='width: 45%;' class='input-group'>" +
                       "<span class='inputgroup-addon-left'>每月第</span>"+
                         "<input type='text' name='cyclicity_month' class='form-control inputgroup-addon-input validate[required,custom[integer],min[1]]' style='padding-left:47px;min-width: 135px;'>"+
                       "<span class='inputgroup-addon-right'><span lang='text:day'>天</span></span>"+
                       "</div>";
        }else if(language == 1){
            var addon="<div style='width: 210px;' class='input-group'>" +
                      "   <span class='inputgroup-addon-left'>The</span>"+
                      "     <input type='text' name='cyclicity_month' class='form-control inputgroup-addon-input validate[required,custom[integer],min[1]]' style='padding-right:135px;width: 210px;'>"+
                      "   <span class='inputgroup-addon-right' style='width: 130px;'>Day of Every Month</span>"+
                      "</div>"+
                      "<div>" +
                      "   <span>(E.g. The 5th day of every month.  Input number.)</span>"+
                      "</div>";
        }
        var str="";
        if(month_or_day=='month'){
            str="<div style='display: flex;justify-content: flex-start;'>" +
                    addon+
                "</div>";
        }else if(month_or_day=='week'){
            str="<div class='input-group' style='width: 45%;'>" +
                "    <label class='input-group-addon' lang='text:_per_week'>每周</label>"+
                "    <select class='form-control input-sm' name='cyclicity_week'>" +
                "       <option value='1' selected='selected' lang='text:monday'>一</option>"+
                "       <option value='2' lang='text:tuesday'>二</option>"+
                "       <option value='3' lang='text:wednesday'>三</option>"+
                "       <option value='4' lang='text:thursday'>四</option>"+
                "       <option value='5' lang='text:friday'>五</option>"+
                "       <option value='6' lang='text:saturday'>六</option>"+
                "       <option value='7' lang='text:sunday'>七</option>"+
                "    </select>"+
                "</div>";
        }else if(month_or_day=='day'){
            str="<div class='input-group' style='width: 70%;'>" +
                "    <span class='inputgroup-addon-left'><span lang='text:_per'>每</span></span>"+
                "    <input type='text' name='cyclicity_day' class='form-control inputgroup-addon-input validate[required,custom[integer],min[1]]'>"+
                "    <span class='inputgroup-addon-right'><span lang='text:day'>天</span></span>"+
                "</div>";
        }
        return str;
    }

    /**
     * 删除标签
     * @param {string} nav_id panes_id : tab的导航、内容体 的id
     * */
    function remove_tab(nav_id,panes_id) {
        var delete_index=$("#"+nav_id).index();
        if($("#"+nav_id).hasClass("active")){
            // 显示相邻标签的前一个标签
            $("#"+nav_id).parent().children("li").eq(delete_index-1).children("a").tab('show');
        }
        // 删除关闭的标签
        $("#"+nav_id).remove();
        $("#"+panes_id).remove();
    }

    /**
     * 展示设备查询列表
     * @param {string} option_type:add or update
     * */
    function showlist_query_device(option_type,form1_id) {
        $("#query_deviceName").val("");
        $("#query_assetNo").val("");
        $("#query_serial").val("");
        $("#query_siteName").val("");
        loading_asset_list(0, $("#page-footer1 .col-sm-5 select").val());
        //显示模态框
        $("#modal_asset_list").modal("show");
        locale.render({element: "#init_body"});
    }
    function close_asset_modal() {
        hide_modal("modal_asset_list");
    }
    function ok(data) {
        $("#myPanesTabs > .active form input[name='asset_number']").val(data.asset_no);
        $("#myPanesTabs > .active form input[name='device_name']").val(data.device_name);
        $("#myPanesTabs > .active form > input[name='asset_id']").val(data._id);
        $("#myPanesTabs > .active form > input[name='site_id']").val(data.site_id);
        $("#myPanesTabs > .active form  input[name='site_name']").val(data.site_name);
        hide_modal("modal_asset_list");
    }
    /**
     *
     * 生成设备查询的模态框
     * get_device_list
     * @param
     * @return
     * */
    function get_device_list(option_type,form1_id) {
        if(home_detail_flag == "home"){
            var query_site_name= '<div class="form-group" style="padding: 5px;">' +
                                      '<label lang="text:site"></label>'+
                                      '<input type="text" class="form-control input-sm" id="query_site_name" lang="placeholder:site" style="height:30px;width: 110px;">'+
                                  '</div>';
            var table_tr= '<th lang="text:asset_number" style="width: 18%;">资产编号</th>'+
                                         '<th lang="text:device_name" style="width: 18%;">设备名称</th>'+
                                         '<th lang="text:serial_number" style="width: 18%;">序列号</th>'+
                                         '<th lang="text:site" style="width: 18%;">现场</th>'+
                                         '<th lang="text:model2" style="width: 18%;">型号</th>'+
                                         '<th lang="text:operate" style="width: 10%;">操作</th>';
        }else if(home_detail_flag == "detail"){
            var query_site_name="";
            var table_tr= '<th lang="text:asset_number" style="width: 21%;">资产编号</th>'+
                                         '<th lang="text:device_name" style="width: 21%;">设备名称</th>'+
                                         '<th lang="text:serial_number" style="width: 21%;">序列号</th>'+
                                         '<th lang="text:model2" style="width: 21%;">型号</th>'+
                                         '<th lang="text:operate" style="width: 15%;">操作</th>';
        }else{
            var query_site_name="";
            var table_tr= '<th lang="text:asset_number" style="width: 21%;">资产编号</th>'+
                                         '<th lang="text:device_name" style="width: 21%;">设备名称</th>'+
                                         '<th lang="text:serial_number" style="width: 21%;">序列号</th>'+
                                         '<th lang="text:model2" style="width: 21%;">型号</th>'+
                                         '<th lang="text:operate" style="width: 15%;">操作</th>';
        }
        var query_content= '<div class="row">' +
                              '<form class="form-inline">' +
                                  '<div class="form-group" style="padding: 5px;">' +
                                       '<label lang="text:device_name"></label>'+
                                       '<input type="text" class="form-control input-sm" id="query_device_name" lang="placeholder:device_name" style="height:30px;width: 110px;">'+
                                  '</div>'+
                                  '<div class="form-group" style="padding: 5px;">' +
                                        '<label lang="text:asset_number"></label>'+
                                        '<input type="text" class="form-control input-sm" id="query_assetNo" lang="placeholder:asset_number" style="height:30px;width: 110px;">'+
                                  '</div>'+
                                  '<div class="form-group" style="padding: 5px;">' +
                                      '<label lang="text:serial_number"></label>'+
                                      '<input type="text" class="form-control input-sm" id="query_serial_number" lang="placeholder:serial_number" style="height:30px;width: 110px;">'+
                                  '</div>'+
                                         query_site_name+
                                  '<div class="form-group pull-right" style="padding: 5px;">' +
                                        '<button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" title="查找" lang="title:query">' +
                                                  '<span class="glyphicon glyphicon-search"></span>'+
                                        '</button>'+
                                  '</div>'+
                              '</form>'+
                           '</div>'+
                           '<div class="row" style="overflow: auto;max-height: 400px;">' +
                               '<table class="table table-bordered table-hover table-striped">' +
                                     '<thead><tr>'+
                                          table_tr +
                                     '</thead></tr>'+
                                     '<tbody id="device_query_data">' +

                                     '</tbody>'+
                               '</table>'+
                           '</div>';

        var modal_body="<div id='query_device_overlay' class='overlay' style='display: none;'>" +
                              "<i class='fa icon-refresh icon-spin'></i>"+
                       "</div>"+
                //"<div class='box-header with-border'></div>"+
                       "<div class='box-body'>" +
                                query_content +
                       "</div>"+
                       "<div id='modal_page_footer'></div>";
         var modalstr="<div class='modal' id='modal_get_device' data-backdrop='static' data-keyboard='false'><div class='modal-dialog modal-lg'><div class='modal-content'>" +
                          "<div class='modal-header'>" +
                               "<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>×</span></button>"+
                               "<h4 class='modal-title' lang='text:device_query'>&nbsp;</h4>"+
                          "</div>"+
                          "<div class='modal-body'>" +
                               "<div class='box' style='border:0px;margin: 0px;'>"+modal_body+"</div>"+
                          "</div>"+
                   "</div></div></div>";

        if($("#modal_get_device").length == 0){
            // 加载模态框的分页
            $("#tcontent").after(modalstr);
            $("#modal_page_footer").pagination({
                changePage:function (cursor,limit) {
                    /*回调函数，刷新分页*/
                }
            });
        }
        locale.render({element: "#init_body"});
    }

    /**
     * 清除模态框
     *modal_id:模态框的id
     * */
    function remove_modal(modal_id) {
         $("#"+modal_id).modal('hide');
         $("#"+modal_id).remove();
    }

    /**
     * 隐藏模态框
     *modal_id:模态框的id
     * */
    function hide_modal(modal_id) {
        $("#"+modal_id).modal('hide');
    }
