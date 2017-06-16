var dataList = {
	isRead:[],
	noRead:[]
	
};
//点击了更换消息之后的回调函数
function change_message_successed(resule){
	console.log(resule);
	init_All_message();
}
//点击了更换消息的ajax函数
function change_message_to_is_read(item){
			
			var index= vm_message._data.noRead.indexOf(item);
			var mallmessageid = (vm_message._data.noRead[index]).mallmessageid;
			
			$.ajax({
				type:"get",
				url:"http://"+IpHeader+"/school/mallItemsManage_updateMallItems.do?method=readMallMessage",
				data:{
					mallmessageid:mallmessageid,
					stuid:UserInformation.stuid,
					sid:UserInformation.sid,
					userid:UserInformation.userid
				},
				dataType:"jsonp",
				async:true,
				jsonpCallback:"change_message_successed",
				success:function(){
						console.log("成功更换消息!");
				},
				error:function(){
						console.log("更换消息失败!");
				}
			});
}
//搭建vue代理
var vm_message = new Vue({
	el:"#bg_wdxx",
	data:{
		isRead:dataList.isRead,
		noRead:dataList.noRead,
		currentRead:"0",
//		默认进来时false,即让未读显示
		
		cr:false
	},
	
	methods:{
		changeStatus:function(item){
			
			change_message_to_is_read(item);
			
		},
		changeCurrentRead:function(index){
//			this.data.currentRead = index;
			this._data.currentRead = index;
//			console.log(index);
			if(index==0){
				this.cr = false;
			}else if(index==1){
				this.cr = true;
			}
		},
		

		}
	
});

//初始化数据
//console
//Vue.set(object, key, value)：
//vm_message.set(dataList,);

//console.log(vm_message._data.cr);
//jsonp的回调函数



function init_All_message(){
	//调用初始化未读消息

	$.when(initData_0()).then(initData_1());
	//调用初始化已读消息
		
}
//初始化未读消息回调函数	
function showData_0(result){
//	console.log(result);
//	每次都将未读消息设置为空
	vm_message._data.noRead = [];
//	转码数组,换为新数组
	for (var i = 0; i < result.data.length; i++){
		var item = {};
//		设置item.mallmessageid值
		item.mallmessageid = result.data[i].mallmessageid;
//		设置item.message值
		item.message = toUtf16(result.data[i].message);
//		设置阅读状态
		item.readstatus = result.data[i].readstatus;
//		设置兑换时间
		var _date = result.data[i].inputtime;
		_date = _date.split(" ");
//		切割出来的时间
		item._date = _date[0];
//		设置渲染后的index
		item._index = i;
//		将数据放入到vue代理中去
		vm_message._data.noRead.push(item);
		
		
	}
//	转换完毕
//	console.log(dataList.noRead);
//	dataList.isRead = newIsRead;
//	dataList.noRead = newNoRead;
}
//初始化未读消息ajax函数
function initData_0(){
	$.ajax({
		type:"get",
		url:"http://"+IpHeader+"/school/mallItemsManage_listMallItems.do?method=getMallMessage",
		data:{
			readstatus:0,
			stuid:UserInformation.stuid,
			sid:UserInformation.sid,
			userid:UserInformation.userid
		},
		dataType:"jsonp",
		async:true,
		jsonpCallback:"showData_0",
		success:function(){
				console.log("获取"+0+"消息成功!");
		},
		error:function(){
					console.log("数据"+0+"消息失败！");
		}
	});
}

function showData_1(result){
	//	console.log(result);
//	每次都将未读消息设置为空
	vm_message._data.isRead = [];
//	转码数组,换为新数组
	for (var i = 0; i < result.data.length; i++){
		var item = {};
//		设置item.mallmessageid值
		item.mallmessageid = result.data[i].mallmessageid;
//		设置item.message值
		item.message = toUtf16(result.data[i].message);
//		设置阅读状态
		item.readstatus = result.data[i].readstatus;
//		设置兑换时间
		var _date = result.data[i].inputtime;
		_date = _date.split(" ");
//		切割出来的时间
		item._date = _date[0];
//		设置渲染后的index
		item._index = i;
//		将数据放入到vue代理中去
		vm_message._data.isRead.push(item);
	}
		
		
}
//初始化已读消息ajax函数
function initData_1(){
	$.ajax({
		type:"get",
		url:"http://"+IpHeader+"/school/mallItemsManage_listMallItems.do?method=getMallMessage",
		data:{
			readstatus:1,
			stuid:UserInformation.stuid,
			sid:UserInformation.sid,
			userid:UserInformation.userid
		},
		dataType:"jsonp",
		async:true,
		jsonpCallback:"showData_1",
		success:function(){
				console.log("获取"+1+"消息成功!");
		},
		error:function(){
					console.log("数据"+1+"消息失败！");
		}
	});
}


//初始化所有的消息
init_All_message();