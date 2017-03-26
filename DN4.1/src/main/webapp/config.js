/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * @property {string} config.debugMode "是否调试模式"
 * @property {string} config.CLIENT_ID "oauth2 CLIENT_ID"
 * @property {string} config.CLIENT_SECRET "oauth2 CLIENT_SECRET"
 * @property {string} config.AUTH_SERVER_URL "oauth2 AUTH_SERVER_URL oauth2验证服务器地址"
 * @property {string} config.API_SERVER_URL "oauth2 API_SERVER_URL api服务器地址"
 * @property {string} config.FILE_SERVER_URL "oauth2 FILE_SERVER_URL 文件服务器地址"
 * @property {string} config.UPGRADE_SERVER "升级服务器地址"
 * @property {number} config.UPGRADE_PORT.DTU "DTU升级端口号"
 * @property {number} config.UPGRADE_PORT.ROUTE "ROUTE升级端口号"
 */
var setting = {
    host: "/DN4.1",
    debugMode: false,
    CLIENT_ID: "17953450251798098136",
    CLIENT_SECRET: "08E9EC6793345759456CB8BAE52615F3",
    AUTH_SERVER_URL: "/oauth2",
    API_SERVER_URL: "",
    FILE_SERVER_URL: "",
    UPGRADE_SERVER: "shebeiyun.net",
    UPGRADE_PORT: {
        DTU: 20010,
        ROUTE: 20008,
        ENH: 80
    },
    iosPath:"/apps/DN4App/test/app.html",
    androidPath:"/downloads/app-release.apk",
    baidu: {
        ak: 'AOakjqiyDS4GHt4nf8IljN4SuOcwbGLf'
    },
    google: {
        key: 'AIzaSyBXcMfyBoH4cBbKOBaGhE_1OtaPqp07Wj8'
    }
};

 var config = {
    "systemManage": {
      "item1": [5, 6, 7],           //用户管理
      "item2": [7, 8],              //角色管理
      "item3": [75, 76],             //权限管理
      "item3": [301,302]            //字段维护 
    },
    "networkManage": {
      "item1": [3,5, 11, 13, 15, 16, 19, 25, 26, 29, 39, 40, 41, 83, 84, 87, 88, 89, 101,211,301,302], //  监视
      "item2": [12, 14, 28, 30, 38, 42, 58, 62, 83, 84, 85, 90],                     //创建、更改12, 90,  83, 84, 85 
      "item3": [21, 22],           //配置、升级
      "item4": [11, 456]                //控制台
    },
    "remoteMaintenance": {
      "item1": [53, 54, 55, 56]            //允许
    },
    "remoteControl": {
      "item1": [91, 95, 97],               //组态图查看
      "item2": [92, 96, 98],                  //组态图编辑
      "item3": [89, 457],                      //远程控制
      "item4": [73, 81, 100, 103, 104]             //查看业务报表
    },
    "alarmProcessing": {
      "item1": [29, 49],                  //查看
      "item2": [50]                       //确认、清除
    },
    "assetManage":{
      "item1":[201,203,205],  //设备查看  部件查看
      "item2":[202,201,203,205],   //设备的创建更改
      "item3":[204,201,203,205],   //部件的创建更改
      "item4":[206,201,203,205]   //部件维护（部件的更换，润滑）
    },
    "repairManage":{
      "item1":[215,217],   //查看工单
      "item2":[214,215,217],   //工单的创建更改
      "item3":[213],   //预防性计划的查看
      "item4":[201,212,213]   //预防性计划的创建修改
    },
    "repair":{
      "item1":[215,216,201,203,205,206,217]   //维修处理 
    }

  };