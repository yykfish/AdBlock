//注入页面的脚本文件
$(function() {

	var clearAd = {
		//由于manifest文件匹配规则只有通配没有非功能，所以可在此处添加不想删除广告的页面
		checkUrl: function() {
			var checkFlag = 0,
				url = window.location.href;

			//不需要清除广告的域
			var notDel = [
				"baidu.com",
				"taobao.com",
				"tmall.com",
				"alibaba.com",
				"jd.com",
				"qq.com",
				"hotjob.cn", //美团校招
				"csdn.net"
			];

			//正则匹配
			for (var i = 0; i < notDel.length; i++) {
				var reg = new RegExp(notDel[i], "g");

				if (reg.test(url)) {
					break;
				} else {
					if (i == notDel.length - 1) {
						checkFlag = 1;
					}
				}
			}

			if (checkFlag == 1) {
				this.clear();
				this.findAdPossible();
			}
		},
		clear: function() {
			//此处可手动添加广告框id名
			var ad_id_name = [
				"cproIframe2001holder",
				"cproIframe2002holder",
				"cproIframe2003holder",
				"cproIframe2004holder",
				"cproIframe2005holder",
				"cproIframe2006holder",
				"cproIframe2007holder",
				"cproIframe2008holder",
				"cproIframe2009holder",
				"id_300x250_banner_top",
				"ads",
				"google_image_div",
				"mx_cs_71603_1261456",
				"AC_TR86_71603",
				"cproIframe_u2060917_1",
				"content_right",
				"left-promotion",
				"top_ads",
				"cproIframe2001",
			];

			//此处添加广告框类名
			var ad_class_name = [
				"cproIframe_u410704_3",
				"img_ad",
				"hover_btn"
			];

			for (var i = 0; i < ad_id_name.length; i++) {
				//使用remove删除节点，提升性能
				$("#" + ad_id_name[i]).remove();
			}

			for (var i = 0; i < ad_class_name.length; i++) {
				$("." + ad_class_name[i]).remove();
			}
		},
		//简单的智能算法
		findAdPossible: function() {
			var sap = $("div iframe"),
				ad_img = $("div script").parent().find("img,embed"),
				float_img = $("div object").parent().find("img,embed");

			this.arrayDel(sap, 360, 200);
			this.arrayDel(ad_img, 350, 150);
			this.arrayDel(float_img, 350, 150);
		},
		arrayDel: function(arr, conWidth, conHeight) {
			var len = arr.length;

			for (var i = 0; i < len; i++) {
				var self = arr.eq(i);

				if (self.width() <= conWidth || self.height() <= conHeight) {
					self.remove();
				}

			}
		},
		init: function() {
			this.checkUrl();
		}
	}

	$(document).ready(function() {
		clearAd.init();

		//为防止ajax异步延时加载的广告隔4s再清除一次
		setTimeout(function() {
			clearAd.init();
		}, 4000)
	});
})