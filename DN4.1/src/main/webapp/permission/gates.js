//导航菜单的权限
function getPermission() {
    return {
        home: {
            map: [11,13,29,89],
            site: [29]
        },
        notifications: {
            alarm: [49,50],
            log:[39,40]
        },
        repair:{
            order:[214,215,216,217],
            orderList:[214,215,216,217],
            schedule:[212,213]
        },
        monistor: {
            monitor: [49,50,51,52,5]
        },
        report: {
            atm_report: [11],
            gateway_statistics:[11,29,81,5,73,81]
        },
        config: {
            gateway: [11,12,13,29,104],
            site: [11,13,29,89],
            controller: [13,29,89,90]
        },
        system: {
            user: [6,7],
            role:[7,8],
            field_maintenance:[301,302]
        },
        download: {
            devicetouch: [53,54,55,56],
            alarm_app: [53,54,55,56]
        }
    };
}


//导航菜单的权限
function getPermission2() {
    return {
        home: {
            site: [29,49,50,51,52,5,91,92,95,97,96,98],
            webscada:[91,95,97,92,96,98],
            reltime:[19],
            alarm: [49,50],
            history:[19]
        },
        device_manage: {
           p_asset:[11,201],
           maintain_history:[205]
         },
         data_allocation: {
           data_dictionary:[29,91,92,209],
           trend_chart_set:[29,30,91,92,209,211,212,213,214,216]
       }
    };
}
