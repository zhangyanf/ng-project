var lang = {
    zh_CN: {
        "10001": "系统错误",
        "10002": "网络异常",
        "10004": "IP限制不能请求该资源",
        "10005": "资源权限访问不足",
        "10008": "参数错误,请参考API文档",
        "10009": "任务过多,系统繁忙",
        "1001001": "创建客户{0}成功.",
        "1001002": "更新客户{0}失败.",
        "1001003": "删除客户{0}成功.",
        "1001005": "更新客户{0}成功.",
        "10012": "非法请求",
        "10013": "不合法的用户",
        "10014": "应用的接口访问权限受限",
        "10016": "缺失必选参数,请参考API文档",
        "10017": "参数值非法,请参考API文档",
        "10018": "HTTP请求body体非法,请参考API文档",
        "1002001": "创建文档{0}成功.",
        "1002002": "创建文档{0}失败.",
        "1002003": "删除文档{0}成功.",
        "1002005": "更新文档{0}成功.",
        "10021": "请求的HTTP方法不支持",
        "10022": "IP请求频次超过上限",
        "10024": "用户请求特殊接口 频次超过上限",
        "10025": "应用请求特殊接口 频次超过上限",
        "10026": "机构请求特殊接口 频次超过上限",
        "1003001": "创建报告{0}成功.",
        "1004001": "创建现场{0}成功.",
        "1004002": "创建现场{0}失败.",
        "1004003": "删除现场{0}成功.",
        "1004005": "更新现场{0}成功.",
        "1005001": "创建设备{0}成功.",
        "1005002": "创建设备{0}失败.",
        "1005003": "批量创建设备成功",
        "1005005": "批量升级设备成功",
        "1005007": "批量删除设备成功",
        "1005009": "删除设备{0}成功.",
        "1005011": "更新设备{0}成功.",
        "2190002": "更新资产{0}成功.",
        "1005014": "删除控制器{0}成功",
        "1005012": "创建控制器{0}成功.",
        "1005015": "更新控制器{0}成功",
        "1006001": "创建机型{0}成功.",
        "1006002": "创建机型{0}失败.",
        "1006003": "删除机型{0}成功.",
        "1006005": "更新机型{0}成功.",
        "1007001": "创建配置{0}成功.",
        "1007002": "创建配置{0}失败.",
        "1007003": "删除配置{0}成功.",
        "1007005": "更新配置{0}成功.",
        "1008001": "更新文件{0}成功.",
        "1008002": "更新文件{0}失败.",
        "1008003": "删除文件{0}成功.",
        "1008004": "添加系统文件(文件名:{0})失败.",
        "100027": "重复的变量ID({0})",
        "2960006": "批量更新手机号成功.",
        "20002": "用户不存在",
        "20003": "用户不存在",
        "20004": "角色不存在",
        "20005": "资源访问权限不足",
        "20006": "资源不存在",
        "200066": "邮箱不存在",
        "20007": "资源已经存在",
        "20009": "机构未审核",
        "20010": "机构审核未通过",
        "20011": "机构未激活",
        "20012": "输入文字太长",
        "20013": "验证码错误",
        "20016": "操作过于频繁",
        "20020": "现场已被其它网关拥有",
        "2100001": "创建机构{0}成功!",
        "2100002": "删除机构失败!",
        "2100003": "删除机构{0}成功!",
        "2100004": "更新机构失败!",
        "2100005": "更新机构{0}成功!",
        "2110001": "创建用户{0}成功!",
        "2110002": "删除用户{0}成功.",
        "2110003": "更新用户{0}成功.",
        "2110004": "用户 {0}更新所有者成功.",
        "2110005": "用户 {0}更新角色成功!",
        "2110006": "用户 {0}修改密码成功!",
        "2110007": "用户 {0}重置密码成功!",
        "2110008": "用户 {0}退出!",
        "2110009": "用户 {0}登录成功!",
        "2110010": "用户 {0}已锁定!",
        "2120001": "创建角色{0}成功.",
        "2120002": "删除角色{0}成功!",
        "2120003": "更新角色{0}成功!",
        "2130001": "更新权限资源成功!",
        "2540004": "用户{0}创建DT通道成功!",
        "21301": "认证失败",
        "21302": "用户名或密码不正确",
        "21303": "用户名密码认证超过请求限制",
        "21304": "用户被锁定,解锁剩余时间",
        "21305": "用户未登录",
        "21306": "验证码错误",
        "21311": "应用ID不存在",
        "21330": "拒绝访问",
        "21321": "未审核的应用使用人数超过限制",
        "21332": "刷新令牌不存在",
        "21333": "刷新令牌过期",
        "21334": "授权码不存在",
        "21335": "授权码已过期",
        "21336": "令牌不存在",
        "21337": "内部模块令牌不存在",
        "21338": "内部模块令牌过期",
        "2140001": "创建API{0}成功!",
        "2140002": "更新API{0}成功.",
        "2140003": "删除API{0}成功.",
        "2150001": "机构{0}创建访问频次规则成功.",
        "2150002": "机构{0}更新访问频次规则成功!",
        "2150003": "机构{0}删除访问频次规则成功.",
        "2150004": "机构{0}创建访问权重规则成功.",
        "2150005": "机构{0}更新访问权重规则成功.",
        "2150006": "机构{0}删除访问权重规则成功.",
        "2160001": "创建标签{0}成功!",
        "2160002": "删除标签{0}成功.",
        "2160004": "给资源添加标签 {0}成功!",
        "2160005": "从标签{0}中删除资源{1}成功!",
        "2160006": "给批量资源添加标签{0}成功!",
        "2160007": "给批量资源添加批量标签成功!",
        "2160008": "删除资源下的标签成功!",
        "2170001": "创建支付方式{0}成功.",
        "2170002": "更新支付方式{0}成功.",
        "2170003": "机构{0}更新支付方式成功!",
        "2180001": "添加应用{0}成功.",
        "2180002": "删除应用{0}成功.",
        "2180003": "更新应用{0}成功.",
        "2260001": "创建组{0}成功!",
        "2260002": "删除组{0}成功.",
        "2160003": "更新组{0}成功.",
        "3000001": "设备授权失败.",
        "3000002": "设备授权成功.",
        "3000003": "设备连接.",
        "3000004": "设备断开.",
        "3000006": "用户连接DT.",
        "3000005": "用户断开DT.",
        "3000007": "用户授权失败.",
        "3000008": "用户授权成功.",
        "2570007": "scada({0})创建成功.",
        "2570008": "scada({0})更新成功.",
        "2570009": "scada({0})删除成功.",
        "21801": "HTTP连接建立失败",
        "21802": "HTTP响应超时",
        "21803": "HTTP响应无效",
        "21804": "返回HTTP错误码",
        "22001": "读取失败",
        "22002": "与指定的文件类型不一致",
        "22003": "文件内容错误",
        "23001": "网关DT通道创建失败",
        "23002": "网关通道已经存在",
        "24001": "设备指定机型错误",
        "24002": "机型变量文件格式错误",
        "25001": "设备数量超过上限,请联系管理员",
        "2500001": "添加{0}到{1}的收藏成功.",
        "2500002": "从用户{1}的收藏夹中删除收藏{0}成功.",
        "2540001": "现场{0}创建通道成功.",
        "2540002": "现场{0}删除通道成功.",
        "2540003": "用户{0}删除DT通道成功.",
        "2550001": "更新DN平台系统设置成功.",
        "2550002": "更新机构{0}系统设置成功",
        "2570001": "创建scada组件{0}成功",
        "2570002": "更新scada组件{0}成功",
        "2570003": "删除scada组件{0}成功",
        "2570004": "创建scada视图{0}成功",
        "2570005": "更新scada视图{0}成功",
        "2570006": "删除scada视图{0}成功",
        "2600001": "更新任务{0}成功.",
        "2600002": "更新任务{0}的状态成功.",
        "2600003": "取消任务{0}成功.",
        "2600004": "{0}取消所有任务成功.",
        "2600005": "创建任务{0}成功.",
        "2700001": "确认告警{0}成功.",
        "2700002": "清除告警{0}成功.",
        "2700003": "创建告警规则成功.",
        "2700004": "删除告警规则成功.",
        "2700005": "更新告警规则成功.",
        "2860001": "{0}: 登录!",
        "2860002": "{0}登录超时!",
        "2860003": "{0}重新登录开始!",
        "2860004": "{0}注销登录!",
        "2860005": "{0}: 取消任务",
        "2860006": "{0}: 已删除!",
        "2860007": "{0}: 下发运行配置!",
        "2860008": "{0}: 获取运行配置!",
        "2860009": "{0}: 下发云平台配置!",
        "2860010": "{0}: 下发升级命令!",
        "2860011": "{0}: 设置VPN连接命令!",
        "2860012": "{0}: 下发命令!",
        "2860013": "{0}: 下发测试命令.",
        "2860014": "{0}: 获取EVT文件数据.",
        "2860015": "{0}: 下发证书命令.",
        "2860016": "{0}: 下发VPN配置.",
        "2860017": "{0}: 下发ZIP压缩格式配置文件.",
        "2860018": "{0}: 任务失败",
        "2860019": "{0}: 下发运行配置成功!",
        "2860020": "{0}: 下发云平台配置成功!",
        "2860021": "{0}: 任务完成",
        "2860022": "{0}: 获取运行配置失败!",
        "2860023": "{0}: 下发云平台配置失败!",
        "2860024": "{0}: 下发运行配置失败!",
        "2860025": "{0}: 获取运行配置成功!",
        "2950001": "{0}: 登录升级服务成功.",
        "2950002": "{0}: 登录升级服务失败! 未找到固件!",
        "2950003": "{0}: 登录升级服务失败. 未找到升级任务!",
        "2950004": "{0}: 升级终止{1}.",
        "2950005": "{0}: 升级进度{1}.",
        "2950006": "{0}: 升级成功",
        "2950007": "{0}: 升级失败，原因:{1}",
        "2960001": "{0}: 登录升级服务成功.",
        "2960002": "{0}: 登录升级服务失败! 未找到固件!",
        "2960003": "{0}: 登录升级服务失败. 未找到升级任务!",
        "2960004": "{0}: 升级终止{1}.",
        "2960005": "{0}: 升级进度{1}.",
        "2190001": "创建资产{0}成功",
        "25003": "设备秘钥已存在!",
        "25004": "设备秘钥不存在!",
        "30002": "数据库连接失败",
        "30003": "数据库操作出错",
        "32002": "别名字段 ({0})包含非法字符",
        "32001": "别名({0})已存在",
        "40001": "API keys数量已到达上限",
        "30007": "名称({0})长度超过了30个字符",
        "30008": "名称({0})包含特殊字符",
        "200077": "序列号({0})已经存在",
        "31001": "您必须提供({0})在Excel的第({1})行",
        "31002": "存在相同的值({0})在Excel中的第({1})行",
        "21322": "名称 ({0}) 已经存在",
        "20107": "序列号 ({0}) 已存在",
        "30009": "序列号({0})格式错误,请输入15位网关序列号",
        "30011": "MISI({0})号码格式错误",
        "30010": "手机号码({0})格式错误",
        "32004": "机型({0})下有设备，不能被删除",
        "31003": "文件行数超出限制(1000)",
        "31011": "确认告警？",
        "31012": "清除告警？",
        "please_select_at_least_one_config_item": "请至少选择一个配置项",
        "please_select_at_only_one_config_item": "请只选择一个配置项",
        "please_select_file": "请选择文件",
        "network_error": "网络错误",
        "network_timeout": "网络超时",
        "affirm_cancel": "确认取消",
        "affirm_delete": "确认删除",
        "affirm_logout": "确认注销",
        "affirm_modify": "确认修改",
        "affirm_pause": "确认暂停",
        "affirm_recover": "确认恢复",
        "affirm_unbound": "确认解除绑定",
        "affirm_save": "确认保存",
        "affirm_submit": "确认提交",
        "delete_success": "删除成功",
        "delete_failed": "删除失败",
        "save_success": "保存成功",
        "save_failed": "保存失败",
        "submit_success": "提交成功",
        "submit_failed": "提交失败",
        "modify_success": "修改成功",
        "modify_failed": "修改失败",
        "case_insensitive": "不区分大小写",
        "case_sensitive": "区分大小写",
        
        "smart_atm":"Smart ATM",
        "languages": "语言",
        "default": "默认",
        "no_data": "无数据",
        "sign_in": "登录",
        "forgot_pwd": "忘记密码",
        "rempwd": "记住我",
        "login": "登录",
        "change_pwd": "修改密码",
        "inhand": "映翰通",
        "welcome_to_inhand": "欢迎使用映翰通Smart ATM",
        "donot_have_account": "没有帐号",
        
        "login_again": "请重新登录",
        "login_timeout": "登录超时",
        "login_times": "登录次数",
        "logined": "已登录",
        "logintime": "登录时间",
        "logout": "注销",
        "logouted": "已登出",
        "logouttime": "登出时间",
        "registration": "注册",
        "read_the_service_terms": "阅读服务条款",
        "complete_account_information": "填写服务信息",
        "finish": "完成",
        "firstly_agree": "您需要接受服务条款才能创建账号",
        "later_registration": "下次注册",
        "custom_question": "自定义问题",
        "question10": "您最喜欢的球队叫什么名字？",
        "question11": "您的第一个宠物叫什么名字？",
        "question12": "您印象最深的街道名称叫什么？",
        "question13": "您的侄女叫什么名字？",
        "question14": "您第一个老板的名字是什么？",
        "question15": "您的伴郎是谁？",
        "question16": "您初次与配偶见面的地方是哪里？",
        "question17": "您的孩子是在哪里出生的？",
        "question18": "您的堂兄叫什么名字？",
        "question19": "您的侄子叫什么名字？",
        "question1": "您最喜欢的电影人物是谁？",
        "question20": "您最好的朋友是谁？",
        "question21": "您的第一部车是什么牌子的？",
        "question22": "您最喜欢的音乐家是谁？",
        "question23": "您的舅舅叫什么名字？",
        "question24": "最喜欢的动物？",
        "question25": "您的孩子叫什么名字？",
        "question26": "您最喜欢的老师叫什么名字？",
        "question2": "您的蜜月是在哪里度过的？",
        "question3": "您的伴娘是谁？",
        "question4": "最喜欢吃的食物?",
        "question5": "您最喜欢的阿姨是谁？",
        "question6": "您小时候最爱吃什么？",
        "question7": "最喜欢的运动？",
        "question8": "您最喜欢哪本书？",
        "question9": "最喜欢的人？",
        "registering": "注册中...",
        "registration_prompt": "你的登录密码将发送到您提供的电子邮箱，因此需要一个有效的电子邮箱地址才能完成注册",
        "registration_success_prompt": "您访问“设备云”的账号和密码已发送到您的电子邮箱。由于网络延迟，您可能需要2分钟左右才能收到邮件，请稍等",
        "create_my_account": "创建帐号",
        "relogin": "请重新登录",
        "agree": "接受",
        "username": "用户名",
        "password": "密码",
        "phone": "电话",
        "last_login": "上次登录时间",
        "last_login_ip": "上次登录IP",
        "last_logout": "上次登出时间",
        "create_time": "创建时间",
        "update_time": "更新时间",
        "operate": "操作",
        "submit": "提交",
        "cancel": "取消",
        "close": "关闭",
        "affirm": "确认",
        "per_page": "每页显示",
        "total_item": "共",
        "items": "条",
        "page": "页",
        "go": "跳转",
        "state": "状态",
        "query": "查询",
        "add": "添加",
        "edit": "编辑",
        "delete": "删除",
        "export": "导出",
        "view": "查看",
        "prompt": "提示",
        "ok": "是",
        "yes": "是",
        "no": "否",
        "all": "所有",
        "previous_step": "上一步",
        "next_step": "下一步",
        "time": "时间",
        "previous_page": "上一页",
        "next_page": "下一页",
        "first_page":"首页",
        "last_page": "尾页",
        "refresh_page": "刷新",
        "empty_is_all": "为空将查询所有",
        "date": "日期",
        "year": "年",
        "munit": "元",
        "click_to_change": "点击更换",
        "reset_password": "重置密码",
        "forget_pwd_prompt": "请输入您注册时使用的Email地址，我们将给您发送重置密码邮件",
        
        "json_comment":"***********************************注册页面****************************",
        "organization_name": "机构名称",
        "captcha": "验证码",
        "security_question": "安全提问",
        "answer": "答案",
        "is_must_fill": "为必填的内容",
        "please_input_email": "请输入邮箱",
        "please_input_username": "请输入用户名",
        "please_input_organization": "请输入机构名称",
        "please_input_answer": "请输入答案",
        "finish_register": "恭喜您已完成注册，请点击",
        "resend_email_pre": "如果您没有收到邮件，请点击",
        "send": "发送",
        "resend_email": "再次发送邮件",
        "password_has_been_sent_to_the_email": "密码已经发送到邮箱",
        "email_already_exists": "邮箱已经存在",
        "organization_already_exists": "机构已经存在",
        
        "json_comment":"***********************************底部信息****************************",
        "about_us": "关于我们",
        "group_address": "北京市朝阳区望京利泽中园101号启明国际大厦11层西南侧",
        "company_website_href": "http://www.inhand.com.cn",
        "company_website": "www.inhand.com.cn",
        "company_mailto_href": "mailto:info@www.inhand.com.cn",
        "company_mailto": "info@www.inhand.com.cn",
        "company_phone": " (8610) 8417 0010/6439 1099 - 8022",
        "all_rights_reserved": "保留所有权利",
        "website": "网址",
        "copyright": "版权申明",

        "json_comment":"***********************************echart****************************",
        "line_switch": "折线图切换",
        "bar_switch": "柱状图切换",
        "restore": "还原",
        "save_as_image": "保存为图片",
        "the_chart_data_are_trying_to_load": "图表数据正在努力加载",
        "ge": "个",

        "json_comment":"********************************* 首页 ****************************************",
        "home": "首页",
        "dashboard": "现场详情",
        "gis": "GIS",
        "site_info": "现场信息",
        "site_list": "现场列表",
        "gateway_state": "网关状态",
        "has_not_affirmed_alarm": "您有{0}个未处理告警",
        "has_no_affirmed_alarm": "您没有未处理的告警",
        "construction": "建设",
        "commissioning": "投运",
        "fault": "故障",
        "overhaul": "检修",
        "online_state": "在线状态",
        "online": "在线",
        "offline": "离线",
        "site_point": "现场无定位",

        "json_comment":"********************************* 修改密码 ****************************************",
        "old_pwd": "旧密码",
        "new_pwd": "新密码",
        "repeat_pwd": "重复密码",
        "old_password_error": "旧密码错误",
        "save": "保存",
        
        "json_comment":"********************************* 通知 ****************************************",
        "notice": "通知",

        "json_comment":"********************************* 告警管理 ****************************************",
        "alarm": "事件",
        "alarm_total": "事件总数",
        "alarm_unconfirmed_total": "未确认事件",
        "alarm_unclear_total": "未消除事件",
        "alerm_uncleared_total": "未消除的事件",
        "alarm_info": "事件信息",
        "alarm_detail": "事件详情",
        "alarm_time": "告警时间",
        "alarm_time_from": "告警时间,从",
        "alarm_level": "级别",
        "remind": "提醒",
        "warn": "警告",
        "minor_alarm": "次要告警",
        "important_alarm": "重要告警",
        "severe_alarm": "严重告警",
        "confirmAlarm": "确认告警?",
        "clearAlarm": "清除告警?",
        "description": "描述",
        "unconfirmed": "未确认",
        "confirmed": "已确认",
        "cleared": "已清除",
        "clear": "清除",
        "atch_affirm": "批量确认",
        "batch_clear": "批量清除",
        "alarm_origin": "告警来源",
        "confirm_account": "确认账户",
        "confirm_time": "确认时间",
        "clear_operator": "清除帐户",
        "clear_time": "消除时间",
        "show_notification_dialog": "显示告警弹窗",
        "levels_or_states_cannot_empty": "级别或状态不能为空",
        "not_affirmed_alarm": "未处理告警",
        "No_longer_remind": "不再提醒",
        "affirm_successful": "确认成功",
        "affirm_failed": "确认失败",
        "type": "类型",
        "alarm_state": "告警状态",
        "sure_state": "确认状态",
        "alarm_occur": "未消除",
        "alarm_remove": "已消除",
        "comment": "备注",

        "json_comment":"********************************* 日志 ****************************************",
        "log": "日志",
        "operating_log": "操作日志",
        "gateway_log": "网关日志",
        "content": "内容",
        "ip_address": "IP地址",
        "operator": "操作员",

        "json_comment":"********************************* 导出****************************************",
        "report": "报表",
        "count": "数量",

        "json_comment":"********************************* 网关报表 ****************************************",
        "online_statistics": "在线统计",
        "traffic_statistics": "流量统计",
        "the_biggest_drop_time": "最大掉线时长",
        "the_largest_online_time": "最大在线时长",
        "the_total_online_time": "总计在线时长",
        "a_total_drop_length": "总计离线时长",
        "abnormal_dropped": "异常掉线次数",
        "online_rate": "在线率",
        "online_times": "上线次数",
        "monthly_rx": "月接收流量",
        "monthly_total": "月总流量",
        "monthly_tx": "月发送流量",
        "daily_max": "日最大流量",
        "daily_rx": "日接收流量",
        "daily_total": "日总流量",
        "daily_tx": "日发送流量",
        "detailed_monthly_report": "月流量明细",
        "signal_window": "信号曲线图",
        "reports_d": "天",
        "reports_h": "小时",
        "reports_min": "分",
        "reports_s": "秒",
        "currentMonth": "本月",
        "month": "月",

        "atm-report": "ATM报表",
        "atm_connection_static":"ATM连接统计",
        "atm_fault_static":"ATM故障统计",

        "config": "配置",
 
        "json_comment":"********************************* 现场管理 ****************************************",    
        "site": "现场",
        "site_management": "现场管理",
        "all_site": "全部现场",
        "online_site": "在线现场",
        "offline_site": "离线现场",
        "site_name": "现场名称",
        "addsite": "添加现场",
        "edit_site": "编辑现场",
        "deletesite": "删除现场",
        "address": "地址",
        "business_state": "业务状态",
        "contact": "联系人",
        "contact_info": "现场负责人信息",
        "contact_name": "联系人姓名",
        "contact_phone": "联系人电话",
        "name": "姓名",
        "basic_information": "基本信息",
        "gateway_config": "网关配置",
        "unbound": "解除绑定",
        "gateway_name": "网关名称",
        "device_config": "ATM配置",
        "gateway": "网关",
        "ip": "IP",
        "signal_strength": "信号强度",
        "serial_number": "序列号",
        "serial_number_15": "15位网关序列号",
        "serial_number_none_tip": "若网关序列号不存在，则可跳过该步！",
        "model": "机型",
        "show_warning_options": "月流量预警选项",
        "show_threshold": "阈值",
        "warning": "预警",
        "serious": "严重",
        "mega": "M",
        "show_recipient": "收件人邮箱",
        "Please_enter_email": "请输入正确邮箱地址",
        "mailbox_tip": "邮箱之间按英文状态下的;分隔",
        "warnhours": "24小时预警",
        "the_gateway_has_been_binding": "该网关已被绑定",
        "gateway_serial_number": "网关序列号",
        "gateway_type": "网关类型",
        "gateway_create_date": "网关创建时间",
        "gateway_purchase_date": "网关购买时间",
        "gateway_activation_date": "激活时间",
        "connection_status": "连接状态",
        "atm_device": "ATM ID",
        "billing_plan_name": "流量套餐",
        "de_activation_date": "停用时间",
        "machine": "设备",
        "site_devices": "现场设备",
        "equipment_information": "设备信息",
        "machine_name": "设备名",
        "name1": "名称",
        "classification": "分类",
        "production_time": "生产时间",
        "procurement_costs": "采购成本",
        "supplier": "供应商",
        "use_site": "使用地点",
        "purchasing_time": "采购时间",
        "change_time": "更换时间",
        "maintenance_time": "保养时间",
        "discard_time": "报废时间",
        "depreciation_fixed_number_of_year": "折旧年限",
        "components_info": "部件信息",
        "factory_time": "出厂时间",
        "price": "单价",
        "device_components": "设备部件",
        "add_component": "添加元器件",
        "replacement_cycle": "更换周期",
        "inform_staff": "通知人员",
        "device_controller": "设备控制器",
        "device_part_model": "型号",
        "part_config": "部件配置",
        "component_name": "部件名称",
        "more_device_info": "更多设备信息",
        "more_part_info": "更多部件信息",
        "change_time_recently": "最近更换时间",
        "add_site_success": "添加现场成功",
        "add_site_failed": "添加现场失败",
        "add_gateway_success": "添加网关成功",
        "add_gateway_failed": "添加网关失败",
        "jump_gateway_config": "跳过网关配置",
        "add_device_success": "添加设备成功",
        "add_device_failed": "添加设备失败",
        "jump_device_config": "跳过设备配置",
        "update_site_success": "编辑现场成功",
        "update_site_failed": "编辑现场失败",
        "update_gateway_success": "编辑网关成功",
        "update_gateway_failed": "编辑网关失败",
        "update_device_success": "编辑设备成功",
        "update_device_failed": "编辑设备失败",
        "update_part_failed": "编辑部件失败",
        "update_part_success": "编辑部件成功",
        "jump_part_config": "跳过部件配置",
        "add_part_failed": "添加部件失败",
        "add_part_success": "添加部件成功",
        "the_site_has_been_deleted": "该现场已被删除",
        

        "json_comment":"********************************* 系统管理 ****************************************",    
        "system": "系统",
        
        "json_comment":"********************************* 用户 ****************************************",    
        "user": "用户",
        "userList": "用户列表",
        "all_user": "所有用户",
        "dn_admin": "系统管理员",
        "device_manager": "设备管理员",
        "device_sense": "工程师",
        "email": "邮箱",
        "mobile_number": "手机号",
        "select_role": "请选择角色",
        "edit_user": "编辑用户",
        "add_user": "新增用户",
        "user_info": "用户信息",
        "please_input_captcha": "请输入验证码",

        "json_comment":"********************************* 角色 ****************************************",    
        "role": "角色",
        "role_info": "角色信息",
        "add_role": "新增角色",
        "role_name_exist": "角色名称已存在",
        "edit_role": "编辑角色",
        "roleList": "角色列表",
        "role_count": "角色数量",
        "role_name1": "角色名称",
        "role_name": "角色名",
        "role_operation_permission": "角色的操作权限",
        "role_permission": "角色权限",
        "role_type": "角色类型",
        "user_defined_role": "用户自定义角色",
        "empower": "操作权限",

        "device_manage": "设备管理",
        "see_device": "查看",
        "create_update": "设备创建、更改",
        "part_create_update": "部件创建、更改",
        "part_maintain": "部件维护",
        "network_manage": "网络管理",
        "scout": "监视",
        "configure_upgrade": "配置、升级",
        "console": "控制台",
        "remote_monitoring": "远程监控",
        "read_configuration_diagram": "组态图查看",
        "write_configuration_diagram": "组态图编辑",
        "remote_control": "远程控制",
        "business_report": "查看业务报表",
        "alarm_processing": "告警处理",
        "see_alarm": "查看",
        "affirm_clear": "确认、清除",
        "remote_maintenance": "远程维护",
        "allow": "允许",

        "json_comment":"********************************* 下载 ****************************************",    
        "download": "下载",
        "devicetouch": "设备快线",
        "download_dt_client_install": "下载并安装设备快线客户端软件",
        "how_to_maintain_channel": "只需三步，即可使用“设备快线”服务远程维护您的设备",
        "login_dt_client": "运行设备快线客户端软件，使用您的账号登录",
        "create_channel_success": "选择要维护的设备所在的现场，建立远程维护通道，开始远程维护",
        "click_download": "点击下载",
        "devicecloud": "手机设备云",

        "json_comment":"********************************* 现场详情 ****************************************",    
        "operation_monitoring": "运行监测",
        "historical_events": "历史事件",
        "src": "源",
        "dst": "目的",
        "package_size": "包大小",
        "communication_time": "通讯时间",
        "traffic_type": "流量类型",
        "unknow": "未知",
        "upstream": "上行流量",
        "downstream": "下行流量",
        "communication_times": "通讯次数",
        "communication_package": "通讯包",
        "more_info": "更多信息",

        "json_comment":"********************************* 维修管理 ****************************************",    
        "repair_manage": "维修管理",
        "my_order": "我的工单",
        "orderlist": "工单列表",
        "repair_schedule": "预防性计划",
        "plan_information": "计划信息",
        "plan_name": "计划名称",
        "asset_number": "资产编号",
        "device_name": "设备名称",
        "create_schedule_plan": "创建计划",
        "update_schedule_plan": "修改计划",
        "create_order": "创建工单",
        "update_order": "修改工单",
        "delete_order": "删除工单",
        "create_schedule": "创建预防性计划",
        "update_schedule": "修改预防性计划",
        "delete_schedule": "删除预防性计划",
        "create_schedule_success": "创建预防性计划{0}成功!",
        "create_schedule_failed": "创建预防性计划{0}失败!",
        "update_schedule_success": "修改预防性计划{0}成功!",
        "update_schedule_failed": "修改预防性计划{0}失败!",
        "delete_schedule_success": "删除预防性计划{0}成功!",
        "delete_schedule_failed": "删除预防性计划{0}失败!",
        "periodic_plan": "周期性计划",
        "according_to_the_deadline": "按截止日期",
        "repair": "维修",
        "back_order": "退回工单",
        "confirm_order": "确认关单",
        "order_total": "工单总数",
        "order_unconfirmed_total": "未处理工单",
        "order_info": "工单信息",
        "operate_date": "操作日期",
        "please_enter_the_asset_number": "请输入资产编号",
        "order_number": "工单编号",
        "order_status": "工单状态",
        "order_type": "工单类型",
        "fault_device_info": "故障设备信息",
        "repair_date": "报修日期",
        "repair_time": "报修时间",
        "repair_man": "报修人",
        "assigned_engineer": "指派工程师",
        "please_select_engineer": "请选择工程师",
        "fault_phenomenon": "故障现象",
        "repair_phone": "报修电话",
        "order_details": "工单详情",
        "cyclicity": "周期性",
        "deadline_type": "截至日期型",
        "deadline": "截至日期",
        "device_query": "设备查询",
        "repair_record": "维修记录",
        "repair_status": "报修信息",
        "start_time": "工作开始时间",
        "end_time": "工作结束时间",
        "work_time": "工作时长",
        "according_to_the_month": "按月",
        "according_to_the_day": "按天",
        "according_to_the_week": "按周",
        "according_to_the_dayofnumber": "按固定天数",
        "_per_week": "每周",
        "_per": "每",
        "_at": "第",
        "turn_to_fault": "转报修",
        "repair_log": "操作日志",
        "fault_type": "故障类型",
        "pre_serial_number": "原序列号",
        "edit_order": "编辑工单",
        "IP_ex": "123.123.123.123",
        "device_dev": "接口",
        "please_select_repair_asset": "请选择报修设备",
        "discard": "报废",
        "normal": "正常",
        "artificial_service_work_sheet": "人工报修",
        "alarm_fault_repair_order": "告警转报修",
        "preventive_plan_work_order": "预防性计划",
        "temporary_work_order": "临时性维修",
        "list_view": "列表视图",
        "map_view": "地图视图",
        "this_site_nonexistence": "该现场不存在",
        "this_device_nonexistence": "该设备不存在",
        "two_different_times_of_selected_device": "两次所选设备不同",
        "new2": "创建",
        "accepted": "接单",
        "processing": "进行中",
        "finished": "完成",
        "closed": "关闭",
        "notclosed": "未关闭",
        "rejected": "退回",
        "finished_order": "维修完成",
        "closed_order": "关闭工单",
        "rejected_order": "退回工单",
        "please_select_a_fault_device": "请选择故障设备",
        "turn_to_fault_prompt": "告警转工单失败，请重试",
        "validation_time": "生效时间",
        "failure_time": "失效时间",
        "report_gateway": "网关报表",
        "please_select_order_type": "请选择工单类型",
        "please_select_fault_type": "请选择故障类型",
        "halt_fault": "停机故障",
        "no_halt_fault": "非停机故障",
        "endtime_no_lt_starttime": "工作结束时间不能小于工作开始时间",
        "repair_report_performance": "绩效统计",
        "repair_report_workload": "工作量统计",
        "please_select_replace_part": "请选择更换部件",
        "has_change_the_part": "该部件已更换",
        "has_chosen_the_part": "该部件已存在",
        "confirm_to_delete_order": "确定删除该工单？",
        "reply_time": "接单时间",
        "next_deadline": "下次截至日期",
        "every_number_days": "每隔{0}天",
        "every_month_day": "每月{0}号",
        "repair_engineer": "维修工程师",
        "please_enter_the_repair_engineer": "请输入维修工程师姓名",
        "no_scada": "没有组态",
        "arrival_time": "到场时间",
        "add_repair_record": "新增维修记录",
        "edit_repair_record": "编辑维修记录",
        "repair_info": "维修信息",
        "repair_part": "维修部件",
        "part_name": "部件名称",
        "repair_type": "操作类别",
        "please_repair_type": "请选择操作类别",
        "part_no": "部件编号",
        "end_time_not_null": "工作结束时间不能为空",
        "reach_time_not_null": "到场时间不能为空",
        "start_time_nlt_create_time": "工作开始时间不能小于报修时间",
        "start_time_nlt_reply_time": "工作开始时间不能小于接单时间",
        "start_time_nlt_reach_time": "工作开始时间不能小于到场时间",
        "start_time_ngt_end_time": "工作开始时间不能大于工作结束时间",
        "end_time_nlt_start_time": "工作结束时间不能小于工作开始时间",
        "end_time_nlt_reply_time": "工作结束时间不能小于接单时间",
        "end_time_nlt_reach_time": "工作结束时间不能小于到场时间",
        "end_time_nlt_create_time": "工作结束时间不能小于报修时间",
        "reply_time_nlt_create_time": "接单时间不能小于报修时间",
        "reply_time_ngt_reach_time": "接单时间不能大于到场时间",
        "reply_time_ngt_start_time": "接单时间不能大于工作开始时间",
        "reach_time_nlt_create_time": "到场时间不能小于报修时间",
        "reach_time_nlt_reply_time": "到场时间不能小于接单时间",
        "reach_time_ngt_start_time": "到场时间不能大于工作开始时间",
        "deadline_time_nlt_create_time": "截止时间不能小于报修时间",
        "order_name": "工单名称",
        "please_create_repair_log": "请先创建维修记录",
        "watch_order": "查看工单",
        "create_update_order": "工单创建、更改",
        "watch_schedule": "查看预防性计划",
        "create_update_schedule": "预防性计划创建、更改",
        "repair_processing": "维修处理",
        "repair_state": "维修状态",
        "execute_time": "执行时间"
    }
}