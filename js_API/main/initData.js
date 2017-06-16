//		Vue代理
var personData = {
	"name":"加载中",
	"smallName":"加载中",
	"boxNum":0,
	"tamatoNum":0,
	"candyNum":0,
//	证件照片
	"identificationPic":"imgs/first-page-imgs/identification-photo.png",
//	年级
	"className":"加载中",
	"headTeach":"加载中",
//	总积分
	"allIntegral":0,
//	剩余积分
	"restIntegral":0,
//	班级排名
	"classRanking":0,
//	年级排名
	"gradeRanking":0,
//	学校排名
	"schoolRanking":0
};
var vm = new Vue({
	
	el: "#main",
	
	data:{
		personData:personData,
		isEdited:false
	},
	methods:{
//		点击更改名字按钮
//		changeName:function(){

//			this.isEdited = !this.isEdited;
//			$(".editedInput").attr({"value":""});
//			console.log($(".editedInput").eq(0))
//			var that = this;
//			if(this.isEdited){
////				$(".editedInput").attr({
////					autofocus:true
////				});
//			}else{
////				$(".editedInput").attr({
////					autofocus:false
////				});
////				弹层弹出
//				zeroModal.confirm( {
//				 	content:"确定要更改昵称吗?",
//				 	okFn:comfirmChangeName,
//				 	cancelFn:function(){
//				 		that.isEdited = false;
//				 		$(".editedInput").val("");
//				 	},
//				 	overlay:true,
//				 	transition:true
//
//				})
//			}
				
			
//		}
	}
});
//发送ajax初始化数据
  function initData(){


  	 $.ajax({
//			传入的回调函数

			type:"get",
			data:{
				card:UserInformation.card,
//				deviceId:UserInformation.card,
				stuid:UserInformation.stuid,
				sid:UserInformation.sid,
				userid:UserInformation.userid
			},
			dataType:"jsonp",
			jsonpCallback:"showData",
			url:"http://139.219.184.67/school/mallItemsManage_listMallItems.do?method=getGameTeachingInfo",
			success:function(data){
                console.log(data);
				console.log("成功获取数据");
			},
			error:function(){
//                $.ajax({
//                    type:"GET",
//                    url:"test.json",
//                    async:true,
//                    success:function(result){
////                        localStorage.setItem("integral",result.data.countIntegral);
//                        console.log(result);
////                       localStorage.setItem("card",result.data.card);
//                        localStorage.setItem("classid",result.data.classid);
//                        localStorage.setItem("gradeid",result.data.gradeid);
//                        localStorage.setItem("sid",result.data.sid);
////	筛选函数
//                        function filterNum(result,_type){
//                            for(var i=0;i<result.datacount.length;i++){
//                                if(_type==result.datacount[i].name){
//                                    return result.datacount[i].count;
//                                }
//                            }
//                        }
//
////	console.log(result);
////			设置名字
//                        personData.name = result.data.name||"()";
////			设置班级
//                        personData.className = result.data.classname||"()";
////			设置班主任
//                        personData.headTeach = result.data.teacher||"()";
////			设置头像
//                        personData.identificationPic= result.data.picsummary||"()";
////			设置总积分
//                        personData.allIntegral = result.data.integral ||"()";
////			设置剩余积分
//                        personData.restIntegral = result.data.countIntegral ||"()";
////			设置班级排名
//                        personData.classRanking = result.data.classNum||"()";
////			设置年级排名
//                        personData.gradeRanking = result.data.gradeNum||"()";
////			设置学校排名
//                        personData.schoolRanking = result.data.schoolNum||"()";
////          设置昵称
//                        for (var i = 0; i < result.data.nickname.length; i++) {
////			转码设置
//                            if(result.data.nickname[i]=="%"){
//                                personData.smallName = decodeURI(result.data.nickname);
//                            }else{
//                                personData.smallName =result.data.nickname;
//                            }
//                        }
//                        personData.smallName =decodeURI( result.data.nickname)||"超级学生";
////			设置道具数量
//                        personData.boxNum = filterNum(result,"道具")||"()";
////			设置装扮
//                        personData.tamatoNum = filterNum(result,"装扮")||"()";
////	设置卡片
//                        personData.candyNum = filterNum(result,"卡片")||"()";
//
//                    }
//                });
			},
			async:true
			});
}
  
  
initData();
//		初始化数据函数
function showData(result){
		console.log("首页的信息为:");
//  		console.log(result);
//		用本地存储设置用户信息
		localStorage.setItem("card",result.data.card);
		localStorage.setItem("classid",result.data.classid);
		localStorage.setItem("gradeid",result.data.gradeid);
		localStorage.setItem("sid",result.data.sid);
//	筛选函数
	function filterNum(result,_type){
		for(var i=0;i<result.datacount.length;i++){
			if(_type==result.datacount[i].name){
				return result.datacount[i].count;
			}
		}
	}
	
//	console.log(result);
//			设置名字
	personData.name = result.data.name||"()";
//			设置班级
	personData.className = result.data.classname||"()";
//			设置班主任
	personData.headTeach = result.data.teacher||"()";
    personData.medalpic = result.medalpic||"()";
//			设置头像
	personData.identificationPic= result.data.picsummary||"()";
//			设置总积分
	personData.allIntegral = result.data.integral ||"()";
//			设置剩余积分
	personData.restIntegral = result.data.countIntegral ||"()";
//			设置班级排名
	personData.classRanking = result.data.classNum||"()";
//			设置年级排名
	personData.gradeRanking = result.data.gradeNum||"()";
//			设置学校排名
	personData.schoolRanking = result.data.schoolNum||"()";
//          设置昵称
		for (var i = 0; i < result.data.nickname.length; i++) {
//			转码设置
			if(result.data.nickname[i]=="%"){
				personData.smallName = decodeURI(result.data.nickname);
			}else{
				personData.smallName =result.data.nickname;
			}
		}
	personData.smallName =decodeURI( result.data.nickname)||"超级学生";
//			设置道具数量
	personData.boxNum = filterNum(result,"道具")||"()";
//			设置装扮
	personData.tamatoNum = filterNum(result,"装扮")||"()";
//	设置卡片
	personData.candyNum = filterNum(result,"卡片")||"()";

};


$(function(){
    $('.al_img').css('backgroundImage',"url('"+localStorage.getItem("picsummary")+"')");
    $('.inp1').val(localStorage.getItem('nickname'));
    $('.al_img').on('click',function(){
        $('.all_ale').css({display:"none"});
        $('.all_ale1').css({display:"block"});
    });
    $('.mar li').on('click',function(){
        var x=$(this).find('img').attr('src');
        $('.all_ale').css({display:"block"});
        $('.all_ale1').css({display:"none"});
        $('.al_img').css('backgroundImage',"url('"+x+"')");
    });

   $('.change').on('click',function(){
       $('.all_ale').css({display:'block'});

   });
   $('.close').on('click',function(){
       $('.all_ale').css({display:'none'});
   });
   $('.img_right').on('click',function(){
       $('.all_ale').css({display:'none'});
   });


    $('.img_left').on('click',function(){
        var picsummary=$('.al_img').css("backgroundImage");
//        console.log(picsummary);
//        alert(picsummary.split('("')[1].split('")')[0]);
        picsummary=picsummary.split('("')[1].split('")')[0];
//        alert(picsummary);
        var nickname=encodeURI($('.inp1').val());
        console.log(nickname);
        var password=$('.inp2').val();
        console.log(password);
        $.ajax({

            type:"post",
            url:encodeURI("http://"+IpHeader+"/school/studentManage_updateStudent.do?method=updateNickname"),
            data:{
//			从IPheader文件中获取用户信息UserInformation
                stuid:UserInformation.stuid,
                picsummary:picsummary,
                nickname:nickname,
                password:password,
                sid:UserInformation.sid,
                userid:UserInformation.userid
            },
            dataType : "jsonp",
            jsonpCallback:"_showData",
            success:function(){

//                $(".editedInput").val($('.inp1').val());

                zeroModal.success({
                    content:"OK，信息修改成功",
                    okFn:function(){
                        $('.all_ale').css({display:'none'});
                        $('.identification').css({backgroundImage:"url("+picsummary+")"});
                    }
                });
            },
            error:function(){
                console.log("提交名字失败");
//                $(".editedInput").val("");
            },
            async:true

        });
    })
});