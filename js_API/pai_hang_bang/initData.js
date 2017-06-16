
//ajax回调函数
function showData(result){
	console.log(result);
}

function initData(){
		$.ajax({
	//			传入的回调函数
				
				type:"get",
				data:{
				
					sid:UserInformation.sid,
					userid:UserInformation.userid
				},
				dataType:"jsonp",
				jsonpCallback:"showData",
				url:"http://"+IpHeader+"/gameTeaching/student",
				success:function(){
					console.log("成功获取数据");
				},
				error:function(){
					console.log("数据获取失败");
				},
				async:true
	});
}
