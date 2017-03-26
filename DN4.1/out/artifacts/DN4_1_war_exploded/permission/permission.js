
function permissionFilter_pageFunc() {
    var accept=sessionStorage.getItem('accept');
    var def=sessionStorage.getItem('default');
    var deny=sessionStorage.getItem('deny');
    var func=$("[data-permissionFilter]");

    var str_func;
    var per_data;
    func.each(function () {
        str_func=$.trim($(this).attr('data-permissionFilter'));
        if(str_func!="" && str_func!='undefined' && typeof(str_func)!='undefined'){

            per_data=(str_func.replace(/\[/g, "")).replace(/]/g, "").split(',');

            if(per_data!=""){
                if(tool_page_permission(per_data,accept,def,deny)==0){
                    $(this).remove();//权限未通过则移除
                    // console.log(this);
                }
            }
        }
    });
}
function tool_page_permission(per,a,df,de) {
    var accept=a.split(",");
    var def=df;
    var deny=de.split(",");
    var temp;
    var marked=0;//1通过验证,0验证失败
    for(var i=0;i<per.length;i++){
        temp=$.trim(per[i]+"");
        // console.log(temp+"*****");
        if(!(/^\d+$/.test(temp))){
            return -1;
            alert("权限参数错误");
        }

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
        if(marked==0){
            break;
        }
    }
    return marked;
}