//初始化我的学校排名
var wdpm_school = null;

//初始化我的班级排名
var wdpm_class = null;

//初始化我的年纪排名
var wdpm_grade= null;

//获取学校排名的回调函数
function show_pai_ming_xue_xiao(result){

	console.log(result.data);
//	console.log(vm_phb._data._dataSchool);
	for (var i = 0; i < result.data.length; i++) {
//		设置学校总排名信息
//		Vue.set( vm_phb._data._dataGrade[i],{} );
		if(vm_phb._data._dataSchool[i]){
			vm_phb._data._dataSchool[i].name=toUtf16( result.data[i].studentName);
			vm_phb._data._dataSchool[i].boxNum=result.data[i].propsnum;
			vm_phb._data._dataSchool[i].tomatoNum=result.data[i].dressupnum;
			vm_phb._data._dataSchool[i].biscuitNum=result.data[i].cardnum;
			vm_phb._data._dataSchool[i].allIntegral=result.data[i].totalIntegral;
			vm_phb._data._dataSchool[i].restIntegral=result.data[i].currentIntegral;
		}else{
			var obj = {};
			obj.name=toUtf16( result.data[i].studentName);
			obj.boxNum=result.data[i].propsnum;
			obj.tomatoNum=result.data[i].dressupnum;
			obj.biscuitNum=result.data[i].cardnum;
			obj.restIntegral=result.data[i].currentIntegral;
			vm_phb._data._dataSchool.push(obj);
			
		}
	}

};
function init_pai_ming_xue_xiao(){
	$.ajax({
	//			传入的回调函数
				
				type:"get",
				data:{
					sid:UserInformation.sid,
					userid:UserInformation.userid
				},
				dataType:"jsonp",
				jsonpCallback:"show_pai_ming_xue_xiao",
				url:"http://"+IpHeader+"/school/integralManagementOrder.do?method=getIntegralTeamOrderV31",
				success:function(){
					// console.log("成功学校排名信息");

				},
				error:function(){
					console.log("学校排名信息失败");
				},
				async:true
	});
};

//init_pai_ming_xue_xiao()
//获取年级排名回调函数
function show_pai_ming_nian_ji(result){
	// console.log("获取到了年级排名信息");
	console.log(result.data);
//	console.log(vm_phb._data._dataSchool);
	for (var i = 0; i < result.data.length; i++) {
//		设置学校总排名信息
//		Vue.set( vm_phb._data._dataGrade[i],{} );
		if(vm_phb._data._dataGrade[i]){
			vm_phb._data._dataGrade[i].name=toUtf16( result.data[i].studentName);
			vm_phb._data._dataGrade[i].boxNum=result.data[i].propsnum;
			vm_phb._data._dataGrade[i].tomatoNum=result.data[i].dressupnum;
			vm_phb._data._dataGrade[i].biscuitNum=result.data[i].cardnum;
			vm_phb._data._dataGrade[i].allIntegral=result.data[i].totalIntegral;
			vm_phb._data._dataGrade[i].restIntegral=result.data[i].currentIntegral;
		}else{
			var obj = {};
			obj.name=toUtf16( result.data[i].studentName);
			obj.boxNum=result.data[i].propsnum;
			obj.tomatoNum=result.data[i].dressupnum;
			obj.biscuitNum=result.data[i].cardnum;
			obj.restIntegral=result.data[i].currentIntegral;
			vm_phb._data._dataGrade.push(obj);
		}
	}
}

function init_pai_ming_nian_ji(){
	$.ajax({
	//			传入的回调函数
				
				type:"get",
				data:{
					sid:UserInformation.sid,
					userid:UserInformation.userid,
					gradeid:localStorage.getItem("gradeid")
				},
				dataType:"jsonp",
				jsonpCallback:"show_pai_ming_nian_ji",
				url:"http://"+IpHeader+"/school/integralManagementOrder.do?method=getIntegralTeamOrderV31",
				success:function(){
					// console.log("成功年级排名信息");
				},
				error:function(){
					console.log("学校年级信息失败");
				},
				async:true
	});
}
//init_pai_ming_nian_ji();


//获取班级排名回调函数
function show_pai_ming_ban_ji(result){
	// console.log("获取到了班级排名信息");
	console.log(result.data);
//	console.log(vm_phb._data._dataSchool);
	for (var i = 0; i < result.data.length; i++) {
//		设置学校总排名信息
//		Vue.set( vm_phb._data._dataGrade[i],{} );
		if(vm_phb._data._dataClass[i]){
			vm_phb._data._dataClass[i].name=toUtf16( result.data[i].studentName);
			vm_phb._data._dataClass[i].boxNum=result.data[i].propsnum;
			vm_phb._data._dataClass[i].tomatoNum=result.data[i].dressupnum;
			vm_phb._data._dataClass[i].biscuitNum=result.data[i].cardnum;
			vm_phb._data._dataClass[i].allIntegral=result.data[i].totalIntegral;
			vm_phb._data._dataClass[i].restIntegral=result.data[i].currentIntegral;
		}else{
			var obj = {};
			obj.name=toUtf16( result.data[i].studentName);
			obj.boxNum=result.data[i].propsnum;
			obj.tomatoNum=result.data[i].dressupnum;
			obj.biscuitNum=result.data[i].cardnum;
			obj.restIntegral=result.data[i].currentIntegral;
			vm_phb._data._dataClass.push(obj);
		}
	}
}

function init_pai_ming_ban_ji(){
	$.ajax({
	//			传入的回调函数
				
				type:"get",
				data:{
					sid:UserInformation.sid,
					userid:UserInformation.userid,
					classid:localStorage.getItem("classid")
				},
				dataType:"jsonp",
				jsonpCallback:"show_pai_ming_ban_ji",
				url:"http://"+IpHeader+"/school/integralManagementOrder.do?method=getIntegralTeamOrderV31",
				success:function(){
					// console.log("成功班级排名信息");
				},
				error:function(){
					console.log("班级排名信息失败");
				},
				async:true
	});
}
//init_pai_ming_ban_ji()


function init_all_pai_ming(){

	$.when(init_pai_ming_xue_xiao()).then(init_pai_ming_nian_ji()).then(init_pai_ming_ban_ji());

//初始化学校排名的函数

	
};
//初始化所有的排名函数调用
init_all_pai_ming();



//我的排名,点击出现弹层,显示我的排名
$(".wo_de_pai_ming").on("click",function(){
	
//	获取到当前所选择的是哪个排名
	var now_pai_ming = localStorage.getItem("wdpm_school");
//	从本地存储中获取当前左边选的是哪一个
	var now_type = localStorage.getItem("nowChuoose");
//	设置排名的名次
	var  message_world = null;
	if(now_type=='school'){
		message_world = "学校";
		now_pai_ming =localStorage.getItem("wdpm_school");
	} else if(now_type=='grade'){
		message_world = "年级";
		now_pai_ming =localStorage.getItem("wdpm_grade");
	}else if(now_type=='class'){
		message_world = "班级";
		now_pai_ming =localStorage.getItem("wdpm_class");
	}

	
	zeroModal.success("<div class='show_pai_ming'>你的<span class='strong_world'>"+message_world+"</span>排名为</div>第"+now_pai_ming+"名");
});

//获取了我在学校中的排名之后的回调函数

function hd_get_my_pai_ming_school(result){

	// console.log('获取我在班级中排名的名次:');
	
	wdpm_school = result.data[0].schoolNum;
	
	wdpm_class = result.data[0].classNum;
	
	wdpm_grade = result.data[0].gradeNum;
	
	localStorage.setItem("wdpm_school",wdpm_school);
	
	localStorage.setItem("wdpm_grade",wdpm_grade);
	
	localStorage.setItem("wdpm_class",wdpm_class);
	
}
//获取我在学校中排名的名次
function get_my_pai_ming_school(){
	 $.ajax({
//			传入的回调函数
			
			type:"get",
			data:{
				
				studentid:UserInformation.stuid,
				sid:UserInformation.sid,
				userid:UserInformation.userid,
				classid:localStorage.getItem("classid"),
				gradeid:localStorage.getItem("gradeid")
			},
			dataType:"jsonp",
			jsonpCallback:"hd_get_my_pai_ming_school",
			url:"http://"+IpHeader+"/school/integralManagementOrder.do?method=getIntegralStudentOrderV31",
			success:function(){
				// console.log("成功获取我的班级排名数据");
			},
			error:function(){
				console.log("我的班级排名数据获取失败");
			},
			async:true
	});
}

//	直接上来初始化我的全部排名,并且放到本地存储中去

	get_my_pai_ming_school();