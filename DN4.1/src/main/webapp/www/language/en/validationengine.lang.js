(function($){
    $.validationEngineLanguage = {
        en:{
            "queryReport":{
                "regex":"none",
                "alertText":"* 'Status trap interval' must be an integer multiple of 'Query Interval'"
            },
            "giveName":{
                "regex":/^[a-zA-Z0-9_\-\u4e00-\u9fa5]+$/i,
                "alertText":"* Invalid name"
            },
            "alias":{
                "regex":/^[a-zA-Z0-9_\-\u4e00-\u9fa5]+$/i,
                "alertText":"*Invalid alias"
            },
            "username":{
                "regex": /^[A-Za-z0-9_\-]+$/,
                "alertText": "*Invalid username"
            },
            "required": { // Add your regex rules here, you can take telephone as an example
                "regex": "none",
                "alertText": "* This field is required",
                "alertTextCheckboxMultiple": "* Please select an option",
                "alertTextCheckboxe": "* This checkbox is required",
                "alertTextDateRange": "* Both date range fields are required"
            },
            "requiredInFunction": {
                "func": function(field, rules, i, options){
                    return (field.val() == "test") ? true : false;
                },
                "alertText": "* Field must equal \'test\' "
            },
            "dateRange": {
                "regex": "none",
                "alertText": "* Invalid ",
                "alertText2": "Date range"
            },
            "dateTimeRange": {
                "regex": "none",
                "alertText": "* Invalid ",
                "alertText2": "Date time range"
            },
            "minSize": {
                "regex": "none",
                "alertText": "* Minimum ",
                "alertText2": " characters allowed"
            },
            "maxSize": {
                "regex": "none",
                "alertText": "* Maximum ",
                "alertText2": " characters allowed"
            },
            "groupRequired": {
                "regex": "none",
                "alertText": "* You must fill one of the following fields"
            },
            "min": {
                "regex": "none",
                "alertText": "* Minimum value is "
            },
            "max": {
                "regex": "none",
                "alertText": "* Maximum value is "
            },
            "greaterthan":{
                "regex": "none",
                "alertText": "* Must be greater than "
            },
            "lessthan":{
                "regex": "none",
                "alertText": "* Must be less than "
            },
            "past": {
                "regex": "none",
                "alertText": "* Date prior to "
            },
            "future": {
                "regex": "none",
                "alertText": "* Date past "
            },
            "maxCheckbox": {
                "regex": "none",
                "alertText": "* Maximum ",
                "alertText2": " options allowed"
            },
            "minCheckbox": {
                "regex": "none",
                "alertText": "* Please select ",
                "alertText2": " options"
            },
            "password":{
//                	"regex": /^[A-Za-z0-9_\!\@\#\$\%\^\&\*\.]+$/,
 
                "regex": /^[A-Za-z0-9_\!\@\#\$\%\^\&\*\.\+\=\-\~\,\[\]\(\)]+$/,
                "alertText": "* Contains illegal characters"
            },
            "change_password":{
                //                	"regex": /^[A-Za-z0-9_\!\@\#\$\%\^\&\*\.]+$/,
                "regex": /^[A-Za-z0-9_\!\@\#\$\%\^\&\*\.\+\=\-\~\,\[\]\(\)]+$/,
                "alertText": "* Contain null characters"
            },
            "equals": {
                "regex": "none",
                "alertText": "* Fields do not match"
            },
            "creditCard": {
                "regex": "none",
                "alertText": "* Invalid credit card number"
            },
            "serialNumber2":{
                "regex": /^[a-zA-Z]{2}[0-9]{13}$/,
                "alertText": "* Please input the 15 charts serial number of the gateway"
            },
            "serialNumber":{
                "regex": /^[a-zA-Z0-9]+$/,
                "alertText": "* Only numbers and letters are allowed"
            },
            "phone": {
                // credit: jquery.h5validate.js / orefalo
                "regex": /^([\+][0-9]{1,3}[\ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9\ \.\-\/]{3,20})((x|ext|extension)[\ ]?[0-9]{1,4})?$/,
                "alertText": "* Invalid fax number"
            },
            "phone1": {
                // credit: jquery.h5validate.js / orefalo
                "regex": /^(\+?[0-9]{2,4}\-?\s?)?([0-9]{3,4}\-?\s?)?([0-9]{7,8})(\-[0-9]+)?$/,

//                	"regex": /^(\+[0-9]{2,4}\-?\s?)?([0-9]{3,4}\-?\s?)?([0-9]{7,8})(\-[0-9]+)?$/,
                "alertText": "* Invalid phone number"
            },
            "mobile": {
                // "regex": /^1[3|4|5|8][0-9]\d{8,8}$/,
                "regex":/^(?:\(?[0\+]?\d{1,3}\)?)[\s-]?(?:0|\d{1,4})[\s-]?(?:(?:13\d{9})|(?:\d{7,8}))$/,
                "alertText": "* Invalid mobile number"
            },
            "email": {
                // HTML5 compatible email regex ( http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#    e-mail-state-%28type=email%29 )
                //  "regex": /^admin$|^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "regex": /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/,
                "alertText": "* Invalid email address"
            },
            "inhand-email": {
                // HTML5 compatible email regex ( http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#    e-mail-state-%28type=email%29 )
                //  "regex": /^admin$|^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "regex": /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$|^admin$/,
                "alertText": "* Invalid email address"
            },
            "integer": {
                "regex": /^[\-\+]?\d+$/,
                "alertText": "* Not a valid integer"
            },
            "number": {
                // Number, including positive, negative, and floating decimal. credit: orefalo
                "regex": /^[\-\+]?((([0-9]{1,3})([,][0-9]{3})*)|([0-9]+))?([\.]([0-9]+))?$/,
                "alertText": "* Invalid number: it must be a positive or negative decimal"
            },
            "date": {
                //	Check if date is valid by leap year
                "func": function (field) {
                    var pattern = new RegExp(/^(\d{4})[\/\-\.](0?[1-9]|1[012])[\/\-\.](0?[1-9]|[12][0-9]|3[01])$/);
                    var match = pattern.exec(field.val());
                    if (match == null)
                        return false;

                    var year = match[1];
                    var month = match[2]*1;
                    var day = match[3]*1;
                    var date = new Date(year, month - 1, day); // because months starts from 0.

                    return (date.getFullYear() == year && date.getMonth() == (month - 1) && date.getDate() == day);
                },
                "alertText": "* Invalid date: must be in YYYY-MM-DD format"
            },
            "ipv4": {
                "regex": /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
                "alertText": "* Invalid IP address"
            },
            "url": {
                "regex": /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
                "alertText": "* Invalid URL"
            },
            "url1": {
                "regex": /^((https?|ftp):\/\/)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
                "alertText": "* Invalid URL"
            },
            "onlyNumberSp": {
                "regex": /^[0-9\ ]+$/,
                "alertText": "* Numbers only"
            },
            "onlyFiveNumber":{
                "regex":/^(\d\d\d\d\d)$/,
                "alertText":"* Five numbers only"
            },
            "portNumber":{
                "regex":/^[1-9]$|(^[1-9][0-9]$)|(^[1-9][0-9][0-9]$)|(^[1-9][0-9][0-9][0-9]$)|(^[1-6][0-5][0-5][0-3][0-5]$)/,
                "alertText":"* Can only fill in the range of 1 ~ 65535"
            },
            "domainName":{
                "regex":/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/,
                "alertText":"* Invalid domain name"
            },
            "onlyLetterSp": {
                "regex": /^[a-zA-Z\ \']+$/,
                "alertText": "* Letters only"
            },
            "onlyLetterNumber": {
                "regex": /^[0-9a-zA-Z]+$/,
                "alertText": "* Only contain numbers and letters"
            },
            "stopSpecialCharacters": {
                "regex": /^[a-zA-Z0-9_\-\u4e00-\u9fa5]+$/i,
                "alertText": "* Cannot contain special characters"
            },
            // --- CUSTOM RULES -- Those are specific to the demos, they can be removed or changed to your likings
            "ajaxUserCall": {
                "url": "ajaxValidateFieldUser",
                // you may want to pass extra data on the ajax call
                "extraData": "name=eric",
                "alertText": "* This user name is already taken",
                "alertTextLoad": "* Validating, please wait"
            },
            "ajaxUserCallPhp": {
                "url": "phpajax/ajaxValidateFieldUser.php",
                // you may want to pass extra data on the ajax call
                "extraData": "name=eric",
                // if you provide an "alertTextOk", it will show as a green prompt when the field validates
                "alertTextOk": "* This user name is available",
                "alertText": "* This user name is already taken",
                "alertTextLoad": "* Validating, please wait"
            },
            "ajaxNameCall": {
                // remote json service location
                "url": "ajaxValidateFieldName",
                // error
                "alertText": "* This name is already taken",
                // if you provide an "alertTextOk", it will show as a green prompt when the field validates
                "alertTextOk": "* This name is available",
                // speaks by itself
                "alertTextLoad": "* Validating, please wait"
            },
            "ajaxNameCallPhp": {
                // remote json service location
                "url": "phpajax/ajaxValidateFieldName.php",
                // error
                "alertText": "* This user name is already taken",
                // speaks by itself
                "alertTextLoad": "* Validating, please wait"
            },
            "validate2fields": {
                "alertText": "* Please input: \'HELLO\'"
            },
            //tls warning:homegrown not fielded
            "dateFormat":{
                "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/,
                "alertText": "* Invalid date"
            },
            //tls warning:homegrown not fielded
            "dateTimeFormat": {
                "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/,
                "alertText": "* Invalid date or date format",
                "alertText2": "Expected format: ",
                "alertText3": "mm/dd/yyyy hh:mm:ss AM|PM or ",
                "alertText4": "yyyy-mm-dd hh:mm:ss AM|PM"
            },
            "systemAuthcode":{
                "regex": /^[0-9,a-z,A-Z]{5}$/,
                "alertText": "* Invalid captcha code"
            },
            "nohtml":{
                "alertText": "* Contains illegal characters"
            },
            "ip" : {
                "regex": /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
                "alertText": "* Invalid IP address"
            },
            "baudRate" : {
                "func": function(field, rules, i, options){
                    var value = field.val();
                    var baudRates = ["110", "300", "600", "1200", "2400", "4800", "9600", "19200", "38400", "57600", "115200"];
                    if (baudRates.indexOf(value) != -1){
                        return true;
                    }else{
                        return false;
                    }
                },
                "alertText": "* Invalid baud rate"
            },
            "parity" : {
                "func": function(field, rules, i, options){
                    var value = field.val();
                    var baudRates = ["N", "O", "E"];
                    if (baudRates.indexOf(value) != -1){
                        return true;
                    }else{
                        return false;
                    }
                },
                "alertText": "* Invalid parity"
            },
            "specialCharacter": {
                "regex": /^[a-zA-Z0-9_\-\u4e00-\u9fa5]+$/i,
                "alertText": "* Name is invalid"
            }

        }
    };

})(jQuery);
