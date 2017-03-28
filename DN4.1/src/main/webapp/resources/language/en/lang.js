var lang = {
    en: {
        10001: "System error",
        10002: "Network error",
        10004: "IP limit",
        10005: "Permission denied: high level appkey required",
        10008: "Param error: see doc for more info",
        10009: "Too many pending tasks: system is busy",
        1001001: "Customer {0} created.",
        1001002: "Creating customer {0} failed.",
        1001003: "Customer {0} deleted.",
        1001005: "Customer {0} updated.",
        10012: "Illegal request",
        10013: "Invalid user",
        10014: "Insufficient app privileges",
        10016: "Missing required parameter: see doc for more info",
        10017: "Parameter’s value invalid: see doc for more info",
        10018: "HTTP body format error: see doc for more info",
        1002001: "Document {0} created.",
        1002002: "Creating document {0} failed.",
        1002003: "Document {0} deleted.",
        1002005: "Document {0} updated.",
        10021: "HTTP method is not supported for this request",
        10022: "IP requests for out of rate limit",
        10024: "User requests for out of rate limit",
        10025: "App requests for out of rate limit",
        10026: "Organization requests out of rate limit",
        1003001: "Report {0} created.",
        1004001: "Site {0} created.",
        1004002: "Creating site {0} failed.",
        1004003: "Site {0} deleted.",
        1004005: "Site {0} updated.",
        1005001: "Machine {0} created.",
        1005002: "Creating machine {0} failed.",
        1005003: "Batch create device success",
        1005005: "batch upadate devices succeed",
        1005007: "Batch delete devices succeed",
        1005009: "Machine {0} deleted.",
        1005011: "Machine {0} updated.",
        2190002: "Asset {0} updated.",
        1005014: "Controller {0} deleted.",
        1005015: "Controller {0} updated.",
        1005012: "Controller {0} created.",
        1006001: "Model {0} created.",
        1006002: "Creating model {0} failed.",
        1006003: "Model {0} deleted.",
        1006005: "Model {0} updated.",
        1007001: "Policy {0} created.",
        1007002: "Creating policy {0} failed.",
        1007003: "Policy {0} deleted.",
        1007005: "Policy {0} updated.",
        1008001: "File {0} uploaded.",
        1008002: "Uploading file {0} failed.",
        1008003: "File {0} deleted.",
        1008004: "Add system file(name:{0}) failed",
        2960006: "Batch phone number updated.",
        100027: "Duplicate variable ids ({0})",
        20002: "User does not exist",
        20003: "User does not exist",
        20004: "Role does not exist",
        20005: "Resource not allowed",
        20006: "Resource does not exist",
        200066: "Email does not exist",
        20007: "Resource already exists",
        20009: "Organization not approved",
        20010: "Organization approval failed",
        20011: "Organization not activated",
        20012: "Text too long",
        20013: "Captcha error",
        20016: "Frequent operation",
        20020: "The site has been owned by other gateway",
        2100001: "Organization {0} created.",
        2100002: "Deleting organization failed.",
        2100003: "Organization {0} deleted.",
        2100004: "Updating organization failed.",
        2100005: "Organization {0} updated.",
        2110001: "User {0} created!",
        2110002: "User {0} deleted.",
        2110003: "User {0} updated.",
        2110004: "User {0} updated owner.",
        2110005: "User {0} updated role.",
        2110006: "User {0} updated password.",
        2110007: "User {0} reset password.",
        2110008: "User {0} logged out.",
        2110009: "User {0} logged in.",
        2110010: "User {0} locked.",
        2120001: "Role {0} created..",
        2120002: "Role {0} deleted.",
        2120003: "Role {0} updated.",
        2130001: "Permissions resources updated!",
        2540004: "User {0} created DT_channel!",
        21301: "Auth failed",
        21302: "Username or password error",
        21303: "Username and pwd auth out of rate limit",
        21304: "User locked, unlock left",
        21305: "User login required",
        21306: "Captcha code error",
        21311: "App key does not exist",
        21321: "Applications over the unaudited use restrictions",
        21330: "Access denied",
        21332: "Refresh token error",
        21333: "Refresh token expired",
        21334: "Code error",
        21335: "Code expired",
        21336: "Token error",
        21337: "Server token error",
        21338: "Server token expired",
        2140001: "Api {0} created.",
        2140002: "Api {0} updated.",
        2140003: "Api {0} deleted.",
        2150001: "Organization {0} created access frequency rule.",
        2150002: "Organization {0} updated access frequency rule.",
        2150003: "Organization {0} deleted access frequency rule.",
        2150004: "Organization {0} created access weight rule.",
        2150005: "Organization {0} updated access weight rule.",
        2150006: "Organization {0} deleted access weight rule.",
        2160001: "Tag {0} created.",
        2160002: "Tag {0} deleted.",
        2160003: "Tag {0} updated.",
        2160004: "Added tag {0} to resource.",
        2160005: "Deleted resource {1} from tag {0}.",
        2160006: "Added tag {0} to batch resources.",
        2160007: "Add batch tags to batch resources.",
        2160008: "Deleted tags of resources.",
        2170001: "Payment {0} created.",
        2170002: "Payment {0} updated.",
        2170003: "Organization {0} updated payment",
        2180001: "App {0} created.",
        2180002: "App {0} deleted.",
        2180003: "App {0} updated.",
        2260001: "Group {0} created.",
        2260002: "Group {0} deleted.",
        2160003: "Group {0} updated.",
        21801: "Http connection refused",
        21802: "Http response from timeout",
        21803: "Http invalid response",
        21804: "Http response bad status code from",
        22001: "File read error file",
        22002: "File type inconformity",
        22003: "File content error",
        23001: "Creating channel failed",
        23002: "Channel already created",
        24001: "Device appoint model error", //"Device appoint model error, see doc for more info",
        24002: "Model variable file format error",
        25001: "Device upper limit: call web admin for more info",
        2500001: "Added {0} to {1} Favorites.",
        2500002: "Deleted {0} from the Favorites of user {1}.",
        2540001: "site {0} created channel.",
        2540002: "Delete channel for site {0} ok.",
        2540003: "User {0} deleted Device Touch channel.",
        2550001: "Updated Device Networks Cloud system settings.",
        2550002: "Updated organization {0} system settings.",
        2570001: "Scada component {0} created.",
        2570002: "Scada component {0} updated.",
        2570003: "Scada component {0} deleted.",
        2570004: "Web-scada {0} created.",
        2570005: "Web-scada {0} updated.",
        2570006: "Web-scada {0} deleted.",
        2600001: "Task {0} updated.",
        2600002: "Task {0} status updated.",
        2600003: "Task {0} canceled.",
        2600004: "{0} all tasks canceled.",
        2600005: "Task {0} created.",
        2700001: "Alarm {0} confirmed.",
        2700002: "Alarm {0} cleared.",
        2700003: "Alarm rule created.",
        2700004: "Alarm rule deleted.",
        2700005: "Alarm rule updated.",
        2860001: "{0}: login!",
        2860002: "{0} login timeout!",
        2860003: "{0} relogin start!",
        2860004: "{0} logout!",
        2860005: "{0}: cancel task",
        2860006: "{0}: deleted!",
        2860007: "{0}: send running config!",
        2860008: "{0}: get running config!",
        2860009: "{0}: send cloud config!",
        2860010: "{0}: send upgrade command!",
        2860011: "{0}: set vpn connect command!",
        2860012: "{0}: send command!",
        2860013: "{0}: send test command.",
        2860014: "{0}: get EVT file data.",
        2860015: "{0}: send certificate command.",
        2860016: "{0}: send vpn config.",
        2860017: "{0}: send ZIP config files.",
        2860018: "{0}: task failed",
        2860019: "{0}: running config sent",
        2860020: "{0}: cloud config sent",
        2860021: "{0}: task completed",
        2860022: "{0}: getting running config failed!",
        2860023: "{0}: sending cloud config failed!",
        2860024: "{0}: sending running config failed!",
        2860025: "{0}: running config get",
        2950001: "{0}: loggin in to upgrade service.",
        2950002: "{0}: unable to log in to upgrade service! Firmware not found!",
        2950003: "{0}: unable to log in to upgrade service! Upgrade task not found!",
        2950004: "{0}: upgrade terminated {1}.",
        2950005: "{0}: upgrade percentage {1}.",
        2950006: "{0}: upgrade completed.",
        2950007: "{0}: upgrade failed,reason: {1}",
        2960001: "{0}: loggin in to upgrade service.",
        2960002: "{0}: unable to log in to upgrade service! Firmware not found!",
        2960003: "{0}: unable to log in to upgrade service! Upgrade task not found!",
        2960004: "{0}: upgrade terminated {1}.",
        2960005: "{0}: upgrade percentage {1}.",
        2190001: "Asset {0} created.",
        3000001: "Gateway auth failed.",
        3000002: "Gateway auth succeeded.",
        3000003: "Gateway connected.",
        3000004: "Gateway disconnected.",
        3000006: "User connected Device Touch.",
        3000005: "User disconnected Device Touch.",
        3000007: "User auth failed.",
        3000008: "User auth succeeded.",
        2570001: "Scada component ({0}) created.",
        2570002: "Scada component ({0}) updated.",
        2570003: "Scada component ({0}) deleted.",
        2570004: "Web-scada ({0}) created.",
        2570005: "Web-scada ({0}) updated.",
        2570006: "Web-scada ({0}) deleted.",
        2570007: "Scada ({0}) created.",
        2570008: "Scada ({0}) updated.",
        2570009: "Scada ({0}) deleted.",
        25003: "Gateway key already exists!",
        25004: "Gateway key does not exist!",
        30002: "Database connection error",
        30003: "Database operation error",
        32002: "The alias ({0}) contain illegal characters",
        32001: "The alias ({0}) already exists",
        40001: "The number of API Keys reached upper limit",
        /*batch_add*/
        30007: "The length of the name ({0}) exceeds the limit of 30 characters",
        30008: "The name ({0}) contains illegal characters",
        200077: "Serial number ({0}) already exists",
        31001: "You must provide the ({0}) at line ({1}) in Excel",
        31002: "Same value ({0}) exists at line ({1}) in Excel",
        21322: "Resource name ({0}) already exists",
        20107: "Serial Number ({0}) already exists",
        30009: "Serial Number ({0}) format error, please input 15-digit gateway serial number.",
        30011: "IMSI ({0}) format error",
        30010: "Phone number ({0}) format error",
        32004: "The model({0}) can not be deleted, because there is device connected to it.",
        31003: "The number of rows exceeds limit({0})",
        31011: " Confirm Alarm?",
        31012: " Clear Alarm?",
        please_select_at_least_one_config_item: "Please select at least one item.",
        please_select_at_only_one_config_item: "Please select one item.",
        please_select_file: "Please select a file.",
        network_error: "Network Error",
        network_timeout: "Network Timeout",
        affirm_cancel: "Are you sure to cancel?",
        affirm_delete: "Are you sure to delete?",
        affirm_logout: "Are you sure to log out?",
        affirm_modify: "Are you sure to modify?",
        affirm_pause: "Are you sure to pause?",
        affirm_recover: "Are you sure to recover?",
        affirm_unbound: "Are you sure to unbound?",
        affirm_save: "Are you sure to save?",
        affirm_submit: "Are you sure to submit?",
        delete_success: "Deleted Successfully",
        delete_failed: "Delete Failed",
        save_success: "Saved successfully",
        save_failed: "Saved failed",
        submit_success: "Submitted successfully",
        submit_failed: "Submitted failed",
        case_insensitive: "Case Insensitive",
        case_sensitive: "Case Sensitive",
        smart_atm:"Smart ATM",
        languages: "Languages",
        "default": "Default",
        no_data: "No Data",
        sign_in: "Sign In",
        forgot_pwd: "Reset password",
        rempwd: "Remember Me",
        security_code: "Security Code",
        change_pwd: "Change pwd",
        inhand: "InHand",
        welcome_to_inhand: "Welcome to InHand Device Networks Cloud",
        donot_have_account: "Don't have an account",
        login: "Login",
        login_again: "Please login again",
        login_timeout: "Login timeout",
        login_times: "Login Times",
        logined: "Logged in",
        logintime: "Login",
        logout: "Log out",
        logouted: "Logged out",
        logouttime: "Logout",
        registration: "Registration",
        read_the_service_terms: "Review the service agreement",
        complete_account_information: "Create an accnount",
        finish: "Finish",
        firstly_agree: "Before continuing, please agree to the terms of the service agreement.",
        custom_question: "Custom Question",
        question10: "What is the name of your favorite sports team?",
        question11: "What is the name of your first pet?",
        question12: "What is your favorite street?",
        question13: "What is your niece's name?",
        question14: "What is the name of your first boss?",
        question15: "Who was your best man?",
        question16: "Where did you meet your spouse for the first time",
        question17: "Where was your child born?",
        question18: "What is your cousin's name?",
        question19: "What is your nephew's name?",
        question1: "Who is your favorite movie star?",
        question20: "Who is your best friend?",
        question21: "What was the make (or brand) of your first car?",
        question22: "Who is your favorite musician?",
        question23: "What is your uncle's name?",
        question24: "What is your favorite animal?",
        question25: "What is the name of your child?",
        question26: "Who is your favorite teacher?",
        question2: "Where did you spend your honeymoon?",
        question3: "Who was your maid of honor?",
        question4: "What is your favorite food?",
        question5: "Who is your favorite aunt?",
        question6: "What was your favorite food as a child?",
        question7: "What is your favorite sport?",
        question8: "What is your favorite book?",
        question9: "What is the name of your wife?",  
        registering: "Registering...", 
        registration_prompt: "Please provide an valid email to complete the registration",
        registration_success_prompt: "The account and password have been sent to your email. It may take several minutes to receive the email. Thank you for your patience.",
        create_my_account: "Create My Account",
        relogin: "Please login again",
        later_registration: "Cancel",
        agree: "Agree",
        username: "Username",
        password: "Password",
        phone: "Phone",
        last_login: "Last Login",
        last_login_ip: "Last Login IP",
        last_logout: "Last Logout",
        create_time: "Created On",
        update_time: "UpdateTime",
        operate: "Operation",
        submit: "Submit",
        cancel: "Cancel",
        close: "Close",
        affirm: "Confirm",
        per_page: "Per Page",
        total_item: "A total of",
        items: "items",
        page: "Page",
        go: "Go",
        state: "Status",
        query: "Search",
        add: "Add",
        edit: "Edit",
        "delete": "Delete",
        "export": "Export",
        view: "View",
        ok: "Ok",
        yes: "Yes",
        no: "No",
        all: "All",
        previous_step: "Back",
        next_step: "Next",
        finished: "Completed",
        time: "Time",
        previous_page: "Previous page",
        next_page: "Next page",
        refresh_page: "Refresh",
        first_page:"First",
        last_page: "Last",
        empty_is_all: "Search all",
        date: "Date",
        year: "Year",
        munit: "$",
        /********************************  底部信息 *********************************/
        group_address: "3900 Jermantown Rd., Suite 150, Fairfax, VA 22030, USA ",
        company_website_href:"http://www.inhandnetworks.com",
        company_website:"www.inhandnetworks.com",
        company_mailto_href:"mailto:info@inhandnetworks.com",
        company_mailto:"info@inhandnetworks.com",
        company_phone:"+1 (703) 348-2988",
        all_rights_reserved: "All rights reserved.",
        website: "Website",



        /******************************** echart *************************************/
        line_switch: "Line chart switching",
        bar_switch: "Bar chart switching",
        restore: "Restore",
        save_as_image: "Save as image",
        the_chart_data_are_trying_to_load: "The Chart Data Are Trying To Load",
        ge: "",
        /********************************* 首页 *************************************/
        "home":"Home",
        dashboard: "Dashboard",
        "gis":"GIS",
        site_info: "Site Info",
        site_list: "Site List",
        "gateway_state":"Gateway status",
        business_state: "Operation Status",
        has_not_affirmed_alarm: "You have {0} alarms not confirmed.",
        has_no_affirmed_alarm: "You have no unconfirmed alarms.",
        construction: "Under Construction",
        commissioning: "Running",
        fault: "Fault",
        overhaul: "Under Maintenance",
        online_state: "Connection",
        online: "Online",
        offline: "Offline",



        /******** 通知 *******/
        "notice":"Event",
        /********************************  告警管理 *********************************/
        "alarm":"Alarms",
        alarm_total: "Total Alarms",
        alarm_unconfirmed_total: "Total Unconfirmed Alarms",
        alarm_uncleared_total: "Total Uncleared Alarms",
        alarm_info: "Alarm Info",
        alarm_detail: "Alarm Detail",
        alarm_time: "Alarm Time",
        alarm_time_from: "Alarm Time , From",
        alarm_level: "Level",
        remind: "Attention",
        warn: "Warn",
        minor_alarm: "Minor alarm",
        important_alarm: "Important alarm",
        severe_alarm: "Severe alarm",
        confirmAlarm: "Confirm Alarm?",
        clearAlarm: "Clear Alarm?",
        description: "Description",
        unconfirmed: "Unconfirmed",
        confirmed: "Confirmed",
        cleared: "Cleared",
        clear: "Clear",
        ffirm: "Batch Affirm",
        batch_clear: "Batch Clear",
        alarm_origin: "Alarm Origin",
        confirm_account: "Confirm Account",
        confirm_time: "Confirm Time",
        clear_operator: "Clear User",
        clear_time: "Clear Time",
        show_notification_dialog: "Show notification dialog",
        levels_or_states_cannot_empty: "Levels or states cannot be empty",
        not_affirmed_alarm: "Not affirmed alarm",
        No_longer_remind: "No longer remind",
        affirm_successful: "Affirm Successful",
        affirm_failed: "Affirm Failed",
        type: "Type",
        alarm_state: "Alarm Status",
        sure_state: "Confirm Status",
        alarm_occur: "Has not been cleared",
        alarm_remove: "Has been cleared",
        comment: "Comment",
        /********************************  日志 *********************************/
        "log":"Log",
        operating_log: "Operation Log",
        gateway_log: "Gateway Log",
        content: "Content",
        ip_address: "IP address",
        operator: "Operator",

        /********************************  维修管理 *********************************/
        order_number: "Order Number",

        /******** 报表 *******/
        "report":"Report",
        /********************************  网关报表 *********************************/
        report_gateway:"Gateway report",
        online_statistics: "Connection Report",
        traffic_statistics: "Data Flow Report",
        the_biggest_drop_time: "Max Offline(s)",
        the_largest_online_time: "Max Online(s)",
        the_total_online_time: "Total Online(s)",
        a_total_drop_length: "Total Offline(s)",
        abnormal_dropped: "Abnormal Logout Times",
        online_rate: "Online Rate(%)",
        online_times: "Login Times",
        monthly_rx: "Monthly Receiving",
        monthly_total: "Monthly Total",
        monthly_tx: "Monthly Sending",
        daily_max: "Daily Max",
        daily_rx: "Daily Receiving",
        daily_total: "Daily Total",
        daily_tx: "Daily Sending",
        detailed_monthly_report: "Detailed Monthly Report",
        signal_window: "Signal Chart",
        /********************************  ATM报表 *********************************/
        "atm-report":"ATM报表",
        /******** 配置 *******/
        "config":"Config",
        /********************************  现场管理 *********************************/
        "site":"Site",
        all_site: "All",
        online_site: "Online",
        offline_site: "Offline",
        site_name: "Site Name",
        addsite: "Add Site",
        edit_site: "Edit Site",
        deletesite: "Delete Site",
        address: "Address",
        business_state: "Operation Status",
        contact: "Contact",
        contact_info: "Contact Info",
        contact_name: "Contact Person",
        contact_phone: "Phone",
        name:"Name",
        basic_information: "Basic Information",
        gateway_config: "Gateways",

        unbound: "Unbound",
        gateway_name: "Gateway Name",
        device_config: "Machines",
        gateway:"Gateway",
        ip: "IP",
        signal_strength: "Signal Strength",
        serial_number: "Serial Number",
        model: "Model",
        show_warning_options: "Monthly Data Flow Warning",
        show_threshold: "Threshold",
        warning: "Early Warning",
        serious: "Serious Warning",
        mega: "M",
        show_recipient: "Recipient E-mail",
        Please_enter_email: "Please enter correct mailbox",
        mailbox_tip: "Type email addresses here (separated by ';')",
        warnhours: "24 Hours Early Warning",

        machine: "Machine",
        site_devices: "Site Machines",
        equipment_information: "Machine Information",
        asset_number: "ATM ID",
        machine_name: "Machine Name",
        name1: "Name",
        classification: "Classification",
        production_time: "Manufacturing Date",
        procurement_costs: "Purchasing Cost",
        supplier: "Supplier",
        use_site: "Machine Location",
        purchasing_time: "Purchased Time",
        change_time: "Replacement Time",
        maintenance_time: "Maintenance Time",
        discard_time: "Scrap Time",
        depreciation_fixed_number_of_year: "Depreciation Life",
        components_info: "Component Info",
        factory_time: "Manufacturing Date",
        price: "Price",
        device_components: "Machine Components",
        add_component: "Add component",
        replacement_cycle: "Replacement Cycle",
        inform_staff: "Staff to Notify",
        device_controller: "device controller",
        device_part_model: "Model",
        part_config:"Components",
        part_no: "Component No",
        component_name: "Component Name",
        more_device_info: "More Machine Info",
        more_part_info: "More Component Info",
        change_time_recently: "Recent Replacement Time",



        /******** 系统 *******/
        "system":"System",
        /********************************  用户管理 *********************************/
        "user":"User",
        userList: "User List",
        all_user: "All",
        dn_admin: "Admin",
        device_sense: "Engineer",
        device_manager: "Device Admin",
        email: "Email",

        mobile_number: "Phone Number",
        select_role: "Select Role",
        edit_user: 'Edit user',
        add_user: 'Add user',
        user_info: "User Info",
        please_input_captcha: "Please input captcha",
        /********************************  角色管理 *********************************/
        "role":"Role",
        role_info: "Role Info",
        add_role: "Add role",
        role_name_exist: "rolename has been existed",
        edit_role: "Edit role",
        roleList: "Role List",
        role_count: "Roles",
        role_name1: "Role Name",
        role_name: "Role name",
        role_operation_permission: "Role Operation Permission",
        role_permission: "Role Permissions",
        role_type: "Role Type",
        user_defined_role: "User Define",
        empower: "Access",

        /******** 下载 *******/
        "download":"Download",
        "devicetouch":"Device Touch",
        download_dt_client_install: "Download and install the " + '"' + "InHand Device Touch" + '"' + " software.",
        how_to_maintain_channel: "In 3 easy steps, you can use the " + '"' + "InHand Device Touch" + '"' + " remote maintenance service.",
        login_dt_client: "Run the client software, and sign in.",
        create_channel_success: "Select the site where your machine is located, and build remote maintenance tunnel via " + '"' + "InHand Device Touch" + '"' + ".",
        click_download: "Download",
        "devicecloud":"手机设备云",
        /********************************  现场详情 *********************************/
        operation_monitoring: "Operation Monitoring",
        historical_events: "Historical Events",

        src:"Source",
        dst:"Destination",
        package_size:"Package size",
        communication_time:"Communication time",
        traffic_type:"Traffic Type",



        /********************************  维修模块 *********************************/
        repair_manage: "Maintenance Management",
        my_order: "My Orders",
        orderlist: "Maintenance Order List",
        repair_schedule: "Preventive Plan",
        plan_information: "Plan Information",
        plan_name: "Plan Name",
        asset_number: "Asset No",
        device_name: "Machine Name",
        create_schedule_plan: "Create Plan",
        update_schedule_plan: "Edit Plan",
        create_order: "Create Order",
        update_order: "Edit Order",
        delete_order: "Delete Order",
        create_schedule: "Create Preventive Plan",
        update_schedule: "Edit Preventive Plan",
        delete_schedule: "Delete Preventive Plan",
        create_schedule_success: "Preventive plan {0} created!",
        create_schedule_failed: "Creating preventive plan {0} failed!",
        update_schedule_success: "Preventive plan {0} updated!",
        update_schedule_failed: "Editing preventive plan {0} failed!",
        delete_schedule_success: "Preventive plan {0} deleted!",
        delete_schedule_failed: "Deleting preventive plan {0} failed!",
        periodic_plan: "Periodic Plan",
        according_to_the_deadline: "Set Deadline",
        repair: "Maintenance",
        back_order: "Return Order",
        confirm_order: "Confirm Order",
        order_total: "Total Maintenance Orders",
        order_unconfirmed_total: "Unprocessed Maintenance Orders",
        order_info: "Order Info",
        operate_date: "Operation Date",
        please_enter_the_asset_number: "Please enter asset no",
        order_number: "Order Number",
        order_status: "Order Status",
        order_type: "Order Type",
        fault_device_info: "Fault Machine Info",
        repair_record: "Maintenance Record",
        adjunct_info: "Adjunct Info",
        repair_date: "Order Date",
        repair_time: "Order Time",
        repair_man: "Order placed by",
        repair_phone: "Phone",
        assigned_engineer: "Assigned Engineer",
        please_select_engineer: "Please Select Engineer",
        fault_phenomenon: "Fault Description",
        order_details: "Order Details",
        cyclicity: "Periodic",
        deadline_type: "Set Deadline",
        deadline: "Deadline",
        device_query: "Machine Query",
        repair_status: "Maintenance Info",
        start_time: "Start Time",
        end_time: "End Time",
        work_time: "Work Time",
        according_to_the_month: "By month",
        according_to_the_day: "By day",
        according_to_the_week: "By week",
        according_to_the_dayofnumber: "By fixed days",
        _per_week: "Week",
        _per: "Every",
        _at: "at",
        turn_to_fault: "Turn to Order",
        repair_log: "Operate Log",
        fault_type: "Fault Type",
        pre_serial_number: "Previous Serial Number",
        IP_ex: "123.123.123.123",
        device_dev: "dev",
        edit_order: "Edit Order",
        please_select_repair_asset: "Please select maintenance machine",
        discard: "Discard",
        normal: "Normal",
        artificial_service_work_sheet: "Manually Reported",
        alarm_fault_repair_order: "Alarm-to-maintenance ",
        preventive_plan_work_order: "Preventive Plan",
        temporary_work_order: "Temporary maintenance",
        list_view: "List View",
        map_view: "Map View",
        this_site_nonexistence: "The site does not exist",
        this_device_nonexistence: "The machine does not exist",
        two_different_times_of_selected_device: "You have selected 2 different machines",
        new2: "Created",
        accepted: "Received",
        processing: "Processing",
        finished: "Completed",
        closed: "Closed",
        rejected: "Rejected",
        finished_order: "Complete maintenance",
        closed_order: "Close Order",
        rejected_order: "Rejecte Order",
        please_select_a_fault_device: "Please select fault machine",
        turn_to_fault_prompt: "Alarm-to-maintenance order failed. Please try again",
        validation_time: "Date Effective",
        failure_time: "Date Expiry",
        report_gateway: "Gateway Report",
        please_select_order_type: "please select order type",
        please_select_fault_type: "please select fault type",
        halt_fault: "Breakdown Fault",
        no_halt_fault: "Non-breakdown Fault",
        endtime_no_ltq_starttime: "End time muste be later than start time",
        repair_report_performance: "Performance Statistics",
        repair_report_workload: "Workload Statistics",
        please_select_replace_part: "please select replacement component",
        has_chosen_the_part: "The component has been selected",
        confirm_to_delete_order: "Confirm to delete the order？",
        reply_time: "Order Receiving Time",
        next_deadline: "Next Deadline",
        every_number_days: "Every {0} days.",
        every_month_day: "The {0}th of every month.",
        repair_engineer: "Maintenance Engineer",
        please_enter_the_repair_engineer: "please enter the name of maintenance engineer",
        no_scada: "No WebScada",
        arrival_time: "Onsite Time",
        add_repair_record: "Add Maintenance Record",
        edit_repair_record: "Edit Maintenance Record",
        repair_info: "Maintenance Info",
        repair_part: "Maintenance Components",
        part_name: "Component Name",
        repair_type: "Operation Category",
        please_repair_type: "Please select operation category",
        part_no: "Component Number",
        order_name: "Order Name",
        please_create_repair_log: "please create repair log",
        watch_order: "Watch Order",
        create_update_order: "create update order",
        watch_schedule: "watch schedule",
        create_update_schedule: "create update schedule",
        repair_processing: "repair processing",
        repair_state: "repair state",

    }
};