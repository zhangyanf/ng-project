/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function getAesString(data,key,iv){
            var key  = CryptoJS.enc.Latin1.parse(key);
            var iv   = CryptoJS.enc.Latin1.parse(iv);
            var encrypted = CryptoJS.AES.encrypt(data,key,
                    {
                        iv:iv,
                        mode:CryptoJS.mode.CBC,
                        padding:CryptoJS.pad.Pkcs7
                    });
            return encrypted;
        }
        function getDAesString(encrypted,key,iv){
            var key  = CryptoJS.enc.Latin1.parse(key);
            var iv   = CryptoJS.enc.Latin1.parse(iv);
//            console.log('iv='+iv);
//            alert(key);
            var decrypted = CryptoJS.AES.decrypt(encrypted,key,
                    {
                        iv:iv,
                        mode:CryptoJS.mode.CBC,
                        padding:CryptoJS.pad.Pkcs7
                    });
            return decrypted.toString(CryptoJS.enc.Utf8);
        }
        function getAES(src,t){
            var data =src;
            var iv  = 'DeviceMonitor_GE';  
            var key   ="["+getDateStr(t)+"]";
            console.log('key='+key);
            var encrypted = getAesString(data,key,iv); 
            return encrypted;
        };
  
        function getDAes(encrypted,t){
           // var encrypted = document.getElementById("encrypted").innerHTML; //å¯æ
            var iv  = 'DeviceMonitor_GE';
            var key   ="["+getDateStr(t)+"]";
            var decryptedStr = getDAesString(encrypted,key,iv);
            return decryptedStr;
        };
      function getDateStr(t){
            var ts= new Date();
            ts.setTime(t);
                var now = ts.pattern("yyyyMMddHHmmss");
                return now;
      };
