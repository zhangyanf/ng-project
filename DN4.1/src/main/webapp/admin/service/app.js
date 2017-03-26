//app.js
require.config({
    baseUrl: "./admin/service",
    paths:{
        echarts: setting.host+'/echarts/dist',
        "underscore":"/cloud/lib/plugin/underscore-min"
    },
    shim:{
        'siteService':{
                    deps: [],
                    exports: 'siteService'
        },
        'warningService':{
                        deps: [],
                        exports: 'warningService'
        },
        'safeService':{
                        deps: [],
                        exports: 'safeService'
        },
        'usersManagementService':{
                        deps: [],
                        exports: 'usersManagementService'
        },
        'dataflowStatisticsService':{
                        deps: [],
                        exports: 'dataflowStatisticsService'
        },
        'onlineStatisticsService':{
                        deps:[],
                        exports:'onlineStatisticsService'
        },
        'machinesService':{
                        deps:[],
                        exports:'machinesService'
        },
        'organizationInfoService':{
                        deps:[],
                        exports:'organizationInfoService'
        },
        'gatewayService':{
                      deps:[],
                      exports:'gatewayService'
        },
        'dataService':{
                      deps:[],
                      exports:'dataService'
        },
        'hisDataService':{
                      deps:[],
                      exports:'hisDataService'
        },
        'logService':{
                      deps:[],
                      exports:'logService'
        },
        'deviceService':{
                      deps:[],
                      exports:'deviceService'
        },
        "underscore":{
            	exports:"_"
            }

    }
});
