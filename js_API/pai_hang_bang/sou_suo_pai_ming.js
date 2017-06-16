/**
 * Created by Administrator on 2017/4/25.
 */
// 这个文件时用来搜索排名的
$('.btn_search').on("click",function () {
		
        var nowChuoose = localStorage.getItem("nowChuoose");
        
        
        // 学校排名的搜索结果
        if(nowChuoose=="school"){
        	var name = $(".text3").val();
        	
			$(".search_name").html(name ); 
			
			getMyPaiMing_xue_xiao(name);
			$(".text3").val("");
           $(".header_list_detail").fadeIn();
            // 年级排名的搜索结果
        }
        
        if(nowChuoose=="grade"){
            var name = $("#text2").val();
           
			$(".search_name").html(name ); 
			
			getMyPaiMing_nian_ji(name);
			
			$("#text2").val("");
			$(".header_list_detail").fadeIn();
//			getMyPaiMing_xue_xiao(name);
            // 班级排名的搜索结果
        }
        if(nowChuoose=="class"){
              var name = $("#text1").val();
              
        	
			$(".search_name").html(name ); 
			
			getMyPaiMing_ban_ji(name);
			
			$("#text1").val("");
			$(".header_list_detail").fadeIn();
//			getMyPaiMing_xue_xiao(name);
        }

});



//关闭按钮
$("#cha").on("click",function(){
	$(".header_list_detail").fadeOut();
	
})





// 定义一个我的学校排名函数
function getMyPaiMing_xue_xiao(nickName) {
	var nickName = encodeURI(nickName);
    $.ajax({
//			传入的回调函数

        type:"get",
        data:{
            stuid:UserInformation.stuid,
            sid:UserInformation.sid,
            userid:UserInformation.userid,
            nickname:nickName
        },
        dataType:"jsonp",
        url:"http://"+IpHeader+"/school/integralManagementOrder.do?method=getIntegralNickNameOrderV31",
        success:function(result){
        	vm_phb._data._real_search = [];
        	for (var i = 0; i < result.data.length; i++) {
        		var obj = {};
        		
        		obj.cardnum = result.data[i].cardnum;
        		obj.classId = result.data[i].classId;
        		obj.className =toUtf16( result.data[i].className);
        		obj.currentIntegral = result.data[i].currentIntegral;
        		obj.dressupnum = result.data[i].dressupnum;
        		obj.exchangedIntegral = result.data[i].exchangedIntegral;
        		obj.id = result.data[i].id;
        		obj.inputTime = result.data[i].inputTime;
        		obj.num = result.data[i].num;
        		obj.propsnum = result.data[i].propsnum;
        		obj.schoolId = result.data[i].schoolId;
        		obj.schoolName =toUtf16( result.data[i].schoolName);
        		obj.studentId = result.data[i].studentId;
        		obj.studentName =toUtf16(  result.data[i].studentName);
        		obj.totalIntegral = result.data[i].totalIntegral;
        		obj.updateTime = result.data[i].updateTime;
        		vm_phb._data._real_search.push(obj);
        	}
            console.log("我的学校排名信息是:");
            console.log(result);
        },
        error:function(){
            console.log("我的学校排名数据获取失败");
        },
        async:true
    });
}

// 定义一个我的年级排名函数
//getMyPaiMing_nian_ji("放假");

function getMyPaiMing_nian_ji(nickName) {
	var nickName = encodeURI(nickName);
	console.log('gradeid是~~~~~~~');
	console.log(localStorage.getItem("gradeid"));
    $.ajax({
//			传入的回调函数

        type:"get",
        data:{
            stuid:UserInformation.stuid,
            sid:UserInformation.sid,
            userid:UserInformation.userid,
            nickname:nickName,
            gradeid:localStorage.getItem("gradeid")
//			gradeid:2
        },
        dataType:"jsonp",
        url:"http://"+IpHeader+"/school/integralManagementOrder.do?method=getIntegralNickNameOrderV31",
        success:function(result){
        	console.log("获取到的年级排名是::");
        	console.log(result);
           vm_phb._data._real_search = [];
        	for (var i = 0; i < result.data.length; i++) {
        		var obj = {};
        		
        		obj.cardnum = result.data[i].cardnum;
        		obj.classId = result.data[i].classId;
        		obj.className =toUtf16( result.data[i].className);
        		obj.currentIntegral = result.data[i].currentIntegral;
        		obj.dressupnum = result.data[i].dressupnum;
        		obj.exchangedIntegral = result.data[i].exchangedIntegral;
        		obj.id = result.data[i].id;
        		obj.inputTime = result.data[i].inputTime;
        		obj.num = result.data[i].num;
        		obj.propsnum = result.data[i].propsnum;
        		obj.schoolId = result.data[i].schoolId;
        		obj.schoolName =toUtf16( result.data[i].schoolName);
        		obj.studentId = result.data[i].studentId;
        		obj.studentName =toUtf16(  result.data[i].studentName);
        		obj.totalIntegral = result.data[i].totalIntegral;
        		obj.updateTime = result.data[i].updateTime;
        		vm_phb._data._real_search.push(obj);
        	}
            console.log("我的年级排名信息是:");
            console.log(result);
        },
        error:function(){
            console.log("数据我的年级排名获取失败");
        },
        async:true
    });
}
// 定义一个我的班级排名函数
function getMyPaiMing_ban_ji(nickName) {
var nickName = encodeURI(nickName);
    $.ajax({
//			传入的回调函数

        type:"get",
        data:{
            stuid:UserInformation.stuid,
            sid:UserInformation.sid,
            userid:UserInformation.userid,
            nickname:nickName,
            classid:localStorage.getItem("classid")
        },
        dataType:"jsonp",
        url:"http://"+IpHeader+"/school/integralManagementOrder.do?method=getIntegralNickNameOrderV31",
        success:function(result){
           vm_phb._data._real_search = [];
        	for (var i = 0; i < result.data.length; i++) {
        		var obj = {};
        		
        		obj.cardnum = result.data[i].cardnum;
        		obj.classId = result.data[i].classId;
        		obj.className =toUtf16( result.data[i].className);
        		obj.currentIntegral = result.data[i].currentIntegral;
        		obj.dressupnum = result.data[i].dressupnum;
        		obj.exchangedIntegral = result.data[i].exchangedIntegral;
        		obj.id = result.data[i].id;
        		obj.inputTime = result.data[i].inputTime;
        		obj.num = result.data[i].num;
        		obj.propsnum = result.data[i].propsnum;
        		obj.schoolId = result.data[i].schoolId;
        		obj.schoolName =toUtf16( result.data[i].schoolName);
        		obj.studentId = result.data[i].studentId;
        		obj.studentName =toUtf16(  result.data[i].studentName);
        		obj.totalIntegral = result.data[i].totalIntegral;
        		obj.updateTime = result.data[i].updateTime;
        		vm_phb._data._real_search.push(obj);
        	}
            console.log("我的学校排名信息是:");
            console.log(result);
        },
        error:function(){
            console.log("我的年级排名数据获取失败");
        },
        async:true
    });
}

