//点击确定修改名字
function _showData(resule){
			console.dir(resule);
			initData();
};
function comfirmChangeName(){
//	获取到用户更改后的昵称值
	var currentNik =$(".editedInput").val();
	
	if(currentNik==""){
		zeroModal.error("对不起，修改的昵称不能为空");
		return;
	}
//	uri转码
	currentNik = encodeURI(currentNik);
//	isEdited
	$.ajax({
		
		type:"post",
		url:encodeURI("http://"+IpHeader+"/school/studentManage_updateStudent.do?method=updateNickname"),
		data:{
//			从IPheader文件中获取用户信息UserInformation
			stuid:UserInformation.stuid,
			nickname:currentNik,
			sid:UserInformation.sid,
			userid:UserInformation.userid
		},
		dataType : "jsonp",
		jsonpCallback:"_showData",
		success:function(){
			console.log("成功提交名字");
			$(".editedInput").val("");
			zeroModal.success("OK，名字修改成功");
		},
		error:function(){
			console.log("提交名字失败");
			$(".editedInput").val("");
		},
		async:true
		
	});
};
