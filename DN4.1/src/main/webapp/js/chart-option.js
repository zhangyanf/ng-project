/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
//饼图option
var pieOption = {
    title: {
        x: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{b} <br/>" + locale.get("site_number") + " : {c} ({d}%)"
    },
    //color: ['#1abf06','#909090'],// '#f10009', '#1a3768',
    legend: {
        orient: 'vertical', //vertical horizontal
        x: 'left',
        y: 'center',
        data: []
    },
    toolbox: {
        show: true,
        feature: {
            restore: {show: true,title : locale.get("restore")},
            saveAsImage: {
                show: true,
                title: locale.get("save_as_image"),
                lang: ['']
            }
        }
    },
    calculable: true,
    series: [
        {
            name: "",
            type: 'pie',
            radius: '70%',
            center: ['55%', '55%'],
            itemStyle: {
                normal: {
                    label: {
                        show:false,
                        position: 'outer',//inner
                        formatter: function(params) {
                            if (params.value > 0) {
                                return params.name + ":" + params.value;
                            } else {
                                return "";
                            }

                        }
                    },
                    labelLine: {
                        show: false
                    }
                },
                emphasis: {
                    label: {
                        show: false,
                        formatter: "{b}:{c}"//{b}\n{d}%
                    }
                }
            },
            data: []
        }
    ],
    noDataLoadingOption: {
        text: locale.get("no_data"),
        effect: 'bubble',
        effectOption: {
            effect: {
                n: 0
            }
        }
    }
};
//柱状图option
var barOption = {
    title: {
        text: '',
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: []
    },
    toolbox: {
        show: true,
        feature: {
            restore: {show: true,title : locale.get("restore")},
            magicType: {show: true,
                title : {
                    line : locale.get("line_switch"),
                    bar :locale.get("bar_switch"),
                },
                type: ['line', 'bar']},
            saveAsImage: {
                show: true,
                title: locale.get("save_as_image"),
                lang: ['']
            }
        }
    },
    calculable: true,
    xAxis: [
        {
            type: 'category',
            data: []
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    noDataLoadingOption: {
        text: locale.get("no_data"),
        effect: 'bubble',
        effectOption: {
            effect: {
                n: 0
            }
        }
    },
    series: [

    ]
};
//曲线图option
var lineOption = {
    tooltip: {
        trigger: 'item',
        formatter: function(params) {
            console.log(" params ",params)
            var date = new Date(params.value[1]);
            data = date.getFullYear() + '-'
                    + (date.getMonth() + 1) + '-'
                    + date.getDate() + ' '
                    + date.getHours() + ':'
                    + (date.getMinutes()>9?date.getMinutes():'0'+date.getMinutes()) ;
            return data + '<br/>' +
                    params.seriesName + ":" + params.value[1];
        }
    },
    toolbox: {
        show: true,
        feature: {
            restore: {show: true,title : locale.get("restore")},
            saveAsImage: {
                show: true,
                title: locale.get("save_as_image"),
                lang: ['']
            }
        }
    },
    dataZoom: {
        show: false,
        start: 0
    },
    legend: {
        data: []
    },
    grid: {
        y2: 80
    },
    xAxis: [
        {
            type: 'time' 
//                splitNumber: 10
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            type: 'line',
            showAllSymbol: true,
            step: 'end',
            showSymbol: true,
            hoverAnimation: true
        }
    ],
    noDataLoadingOption: {
        text: locale.get("no_data"),
        effect: 'bubble',
        effectOption: {
            effect: {
                n: 0
            }
        }
    }
};

var plucker = {
    name: '',
    symbol: 'image://\/images/1.png',
    symbolSize: 20,
    value: 4,
    children: [
        {
            name: locale.get("plucker"), //'抓棉机',
            value: 4,
            symbol: 'image://\/images/4.png',
            symbolSize: 20,
            itemStyle: {
                normal: {
                    label: {
                        show: false,
                        position: 'bottom',
                        formatter: "{b}:{c}"
                    },
                    color: '#fa6900',
                    borderWidth: 1,
                    borderColor: '#cc66ff'
                },
                emphasis: {
                    borderWidth: 0
                }
            }
        }
    ],
    itemStyle: {
        normal: {
            color: '#fa6900',
            label: {
                show: true,
                position: 'left'
            }

        },
        emphasis: {
            label: {
                show: false
            },
            borderWidth: 0
        }
    }
};
var blending_machine = plucker;//'混棉机'
var cotton_cleaning_machine = plucker;//清棉机
var carding_machine = plucker;//梳棉机
blending_machine.children[0].name = locale.get("blending_machine");
cotton_cleaning_machine.children[0].name = locale.get("cotton_cleaning_machine");
carding_machine.children[0].name = locale.get("carding_machine");
var treeOption = {
    tooltip: {
        trigger: 'item',
        formatter: "{b}"
    },
    toolbox: {
        show: true,
        feature: {
            restore: {show: true,title : locale.get("restore")},
            saveAsImage: {
                show: true,
                title: locale.get("save_as_image"),
                lang: ['']
            }
        }
    },
    calculable: false,
    series: [
        {
            name: '',
            type: 'tree',
            orient: 'vertical', // vertical horizontal
            rootLocation: {x: '45%', y: '10%'}, // 根节点位置  {x: 'center',y: 10}
            nodePadding: 30,
            layerPadding: 30,
            symbol: 'circle',
            symbolSize: 40,
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'inside',
                        textStyle: {
                            color: '#cc9999',
                            fontSize: 15,
                            fontWeight: 'bolder'
                        }
                    },
                    lineStyle: {
                        color: '#000',
                        width: 1,
                        type: 'broken' // 'curve'|'broken'|'solid'|'dotted'|'dashed'
                    }
                },
                emphasis: {
                    label: {
                        show: true
                    }
                }
            },
            data: [{
                    name: '',
                    value: '1', //显示屏
                    symbolSize: [60, 50],
                    symbol: 'image://\/images/mainboard.png',
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            }
                        }
                    },
                    children: [{//
                            name: '',
                            value: '2', //路由器
                            symbolSize: [60, 50],
                            symbol: 'image://\/images/3.png',
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: false
                                    }
                                }
                            },
                            children: [{
                                    name: '交换机',
                                    value: 4,
                                    symbol: 'image://\/images/iR915.png',
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: false
                                            }
                                        }
                                    },
                                    symbolSize: [30, 50],
                                    children: [plucker, blending_machine, cotton_cleaning_machine, cotton_cleaning_machine]
                                }, {
                                    name: '交换机',
                                    value: 4,
                                    symbol: 'image://\/images/iR915.png',
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: false
                                            }
                                        }
                                    },
                                    symbolSize: [30, 50],
                                    children: [carding_machine, carding_machine, carding_machine, carding_machine, carding_machine, carding_machine, carding_machine, carding_machine]
                                }, {
                                    name: '交换机',
                                    value: 4,
                                    symbol: 'image://\/images/iR915.png',
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: false
                                            }
                                        }
                                    },
                                    symbolSize: [30, 50],
                                    children: [carding_machine, carding_machine, carding_machine, carding_machine, carding_machine, carding_machine, carding_machine, carding_machine]
                                }]
                        }]
                }]
        }]

};
    