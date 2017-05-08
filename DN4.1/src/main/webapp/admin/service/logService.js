/*
 *1.获取操作日志的信息
 */
 function searchOperationLog(params,isAsync,callback,context) {
     schneider.Ajax.request({
         url: "/api2/behav_log",
         type: "GET",
         dataType: "json",
         parameters:params,
         async : isAsync,
         success: function (data) {
             callback.call(context || this,data);
         }
     });
 }
/*
 *2.获取通信日志的信息
 */
 function searchLogCommunicationLog(params,isAsync,callback,context) {
     schneider.Ajax.request({
         url: "/api2/comm_log",
         type: "GET",
         dataType: "json",
         parameters:params,
         async : isAsync,
         success: function (data) {
             callback.call(context || this,data);
         }
     });
 }
 /*
  *3.导出操作日志数据
  */
  function getAPI_log(params,query,callback,context) {
              schneider.Ajax.request({
                  url: "/api/reports/forms",
                  type: "POST",
                  dataType: 'json',
                  parameters:params,
                  data: query,
                  success: function (data) {
                      callback.call(context || this,data);
                  }
              });
          }
/*
*4.导出通信日志数据
*/
function getAPI_log_com(params,query,callback,context) {
            schneider.Ajax.request({
                url: "/api/reports/forms",
                type: "POST",
                dataType: 'json',
                parameters:params,
                data: query,
                success: function (data) {
                    callback.call(context || this,data);
                }
            });
        }
/*
 *3.导出报表
 */
function exportReportForm(params,query,callback,context) {
    schneider.Ajax.request({
        url: "/api/reports/forms",
        type: "POST",
        dataType: 'json',
        parameters:params,
        data: query,
        success: function (data) {
            callback.call(context || this,data);
        }
    });
}