//注入页面的脚本文件
$(function() {

	var clearAd = {
		//由于manifest文件匹配规则只有通配没有非功能，所以可在此处添加不想删除广告的页面
		checkUrl: function() {
			var checkFlag = 0,
				url = window.location.href;

			//不需要清除广告的域名
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
			//广告框id
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

			//广告框类名
			var ad_class_name = [
				"cproIframe_u410704_3",
				"img_ad",
				"hover_btn",
				"jdAdContInner",
				"sinaad-toolkit-box",
				"popBox_bg"
			];

			for (var i = 0; i < ad_id_name.length; i++) {
				$("#" + ad_id_name[i]).remove();
			}

			for (var i = 0; i < ad_class_name.length; i++) {
				$("." + ad_class_name[i]).remove();
			}
		},

		findAdPossible: function() {
			var possibleAdDiv = $("body").find("div");
			var i;

			for(i = 0;i < possibleAdDiv.length;i++)
			{
				if(possibleAdDiv[i].css("position")=="fixed")
					possibleAdDiv[i].remove();
			}
		},
		init: function() {
			this.checkUrl();
		}
	}

	$(document).ready(function() {
		clearAd.init();

		//为防止ajax异步延时加载的广告隔4s再清除一次
		setInterval(function() {
			clearAd.init();
		}, 4000)
	});
})