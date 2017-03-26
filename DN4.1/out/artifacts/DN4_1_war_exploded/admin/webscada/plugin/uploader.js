/*
 * Copyright (c), InHand Networks All Rights Reserved.
 * @author: Lee李杰
 * @filename: uploader
 * @filedescription: "file upload/文件图片上传"
 */
define( function( require) {
	var Uploader = {
		//初始化整个模块
		initialize: function( options){
			//引入插件文件
			document.write('<script src="plugins/plupload-2.1.9/js/plupload.full.min.js"></script>');
			//规则定义
			//传入初始化的参数
			this.upload_param = {
				runtimes: "gears,flash,silverlight,browserplus,html5",
				browse_button: options.browse_button,
				url: options.url,
				filters: options.filters,
				//container: options.container,
				multi_selection: options.multi_selection,
				max_file_size: options.max_file_size,
				multipart: false,
				autoUpload: options.autoUpload
			};
			this.init( this.upload_param);
		},
		//初始化插件
		init: function( upload_param){
			var self = this;
			var creat_upload = new plupload.Uploader( upload_param);
			this.bindEvent( creat_upload);
			creat_upload.init();
		},
		//事件绑定
		bindEvent: function( creat_upload){
			var self = this;
			var creat_upload = creat_upload;
			creat_upload.bind("Error", function( up, err) {
				var err_code = err.code + "";
				if( code === "-600") {
					var maxSize = up.settings.max_file_size / 1024;
					if( maxSize >= 1) {
						var _maxSize = maxSize / 1024;
						if( _maxSize >= 1) {
							err.text = locale.get( code) + parseInt( _maxSize) + "MB";
						} else {
							err.text = locale.locale.get( code) + parseInt( maxSize) + "KB";
						}
					} else {
						err.text = locale.get( code) + maxSize + "KB";
					}
				} else {
					err.text = locale.get( code);
				}
				if( code !== "-500") {
					self.fire( "onError", err);
				}
			});
			creat_upload.bind( "FilesAdded", function( uploader, files) {
				//console.log("BeforeUpload, up, file,", uploader, ",", files);
				creat_upload.setOption('url', '/api/file?filename=' + files[0].name + '&access_token=' + schneider.Ajax.getAccessToken() + '&timeout=' + (Date.parse(new Date()) / 1000 + 604800));
				//console.log( files[0].name);
				creat_upload.start();
			});
			creat_upload.bind("FileUploaded", function( uploader, file, response) {
				//console.log("FileUploaded, uploader,", uploader, ", file,",file,", response,", response );
			});
		},
	};
	return Uploader;
});