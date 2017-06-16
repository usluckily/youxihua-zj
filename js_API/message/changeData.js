//changeReadStatus();
//更改已读未读函数
function changeReadStatus(mallmessageid){
	$.ajax({
		type:"post",
		url:"http://"+IpHeader+"/school/mallItemsManage_updateMallItems.do?method=readMallMessage",
		data:{
			mallmessageid:mallmessageid,
			stuid:UserInformation.stuid,
			sid:UserInformation.sid,
			userid:UserInformation.userid
		},
		jsonpCallback:"showData",
		dataType:"jsonp",
		async:true
	});
}

