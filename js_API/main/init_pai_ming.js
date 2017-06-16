

function show_pai_ming(result){
	console.log("排名的结果是:");
//	classNum:"1"
//	gradeNum:"1"
//  schoolNum:"1"
	console.log(result);
	$("#num_ban_ji").html(result.data[0].classNum);
	$("#num_nian_ji").html(result.data[0].gradeNum);
	$("#num_xue_xiao").html(result.data[0].schoolNum);
}
init_pai_ming();
 function init_pai_ming(){
 	 $.ajax({
//			传入的回调函数
			
			type:"get",
			data:{
				studentid:UserInformation.stuid,
				sid:UserInformation.sid,
				userid:UserInformation.userid,
				classid:UserInformation.classid,
				gradeid:UserInformation.gradeid
			},
			dataType:"jsonp",
			jsonpCallback:"show_pai_ming",
			url:"http://"+IpHeader+"/school/integralManagementOrder.do?method=getIntegralStudentOrderV31",
			success:function(){
				console.log("排名数据获取成功");
			},
			error:function(){
				console.log("排名数据获取失败");
			},
			async:true
			});
 }
