$(document).ready(function(){
	function update(){
		var today = new Date();
		var str = [today.getFullYear(),today.getMonth(),today.getDate(),"&nbsp; "+today.getHours()+" &nbsp;",today.getMinutes(),today.getSeconds()];
		$("span").each(function (i){
			$(this).html(str[i].toString().replace(/^(\d)$/,"0$1"));
		});
	};
	setInterval(update,1000);			
	$("#click").click(function(){
		$.getScript("http://php.weather.sina.com.cn/iframe/index/w_cl.php?charset=utf-8",function(){
			for(var s in SWther.w){
			$("#info").html(s+" "+SWther.w[s][0].s1+" "+SWther.w[s][0].t1+"℃");
				switch(SWther.w[s][0].s1){
					case "晴":
						$("body").css("background","deepskyblue");									
						break;
					case "雾":
						$("body").css("background","lightblue");
						break;	
					case "多云":
						$("body").css("background","lightgray");
						break;
					case "阴":
						$("body").css("background","darkgray");
						break;
					case "小雨":case "中雨":case "大雨":
						$("body").css("background","black");
						break;
				}
			};
		});
		$("#click").attr("disabled", true);
		$("#click").css("cursor","not-allowed");
		$("#switch").attr("disabled", false);
		$("#switch").css("cursor","pointer");
	});
	$("#switch").attr("disabled", true);
	$("#switch").click(function(){					
		if($("#info").html().indexOf("℃")>0){
			var num = Math.round($("#info").html().slice(-3, -1) * 1.8 + 32);//提取摄氏度并转为华氏度
			var arr = $("#info").html().split("");//拆分成数组
				arr.splice(-3);//删除摄氏度
				arr.push(num + "℉");//添加华氏度
				$("#info").html(arr.join(""));//合并成字符串
		}
		else{
			var num = Math.round(($("#info").html().slice(-3, -1) - 32) / 1.8);
			var arr = $("#info").html().split("");
			arr.splice(-3);
			arr.push(num + "℃");
			$("#info").html(arr.join(""));
		}
	});
});