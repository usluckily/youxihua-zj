var obj=document.body;
var flag=0;
var  time=setTimeout(function(){
    if(window.SchoolScore){
        window.SchoolScore.logout();
    }else{
        if(localStorage.getItem("deviceId")==""){
            window.location.href='login.html';
            console.log("222222222222222222222222222222222");
        }else{
            $.ajax({
                type:'get',
                data:{
                    devid:localStorage.getItem("deviceId"),
                    cardno:localStorage.getItem("card")
                },
                dataType:'jsonp',
                url:'http://139.219.184.67/school/mallItemsManage_listMallItemsInfo.do?method=toQuit',
                success:function(d){
                    window.location.href='login.html'+"?devid="+localStorage.getItem("deviceId");
                },
                error:function(err){
//                            alert(2);
                    console.log(err+"返回失败");
                }
            });
        }
    }
    clearTimeout(time);
},600000);
var timecount=0;
obj.addEventListener('touchstart',function(){
    clearTimeout(time);
    var date=new Date();

    var dateIntegralPoint=new Date();

    dateIntegralPoint.setHours(date.getHours());//小时数增加1
    dateIntegralPoint.setMinutes(date.getMinutes()+10);
    dateIntegralPoint.setSeconds(date.getSeconds());
    console.log(date+"---"+dateIntegralPoint+"***"+timecount);
    var xy=date.getTime();
    var xx=dateIntegralPoint.getTime();
//    console.log(xx-xy);
    timecount=xx;
},false);
bianli();
function bianli(){
       var time1=setInterval(function(){

           var x=new Date();
           var m=x.getTime();
           var n=timecount;
           if(m>=n && n!=0){
               if(window.SchoolScore){
                   window.SchoolScore.logout();
               }else{
                   if(localStorage.getItem("deviceId")==""){
                       window.location.href='login.html';
//                       alert("11111111111111111111111111111111111");
                   }else{
                       $.ajax({
                           type:'get',
                           data:{
                               devid:localStorage.getItem("deviceId"),
                               cardno:localStorage.getItem("card")
                           },
                           dataType:'jsonp',
                           url:'http://139.219.184.67/school/mallItemsManage_listMallItemsInfo.do?method=toQuit',
                           success:function(d){
                               window.location.href='login.html'+"?devid="+localStorage.getItem("deviceId");
                           },
                           error:function(err){
//                            alert(2);
                               console.log(err+"返回失败");
                           }
                       });
                   }
               }
               clearInterval(time1);
           }
       },10000)
}