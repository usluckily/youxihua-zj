var obj={ob:[]};
var obj2={ob:[]};
var obj3={ob:[]};
var getData=(function(){
    return{
        //商城类型
        getMalltypeid:function(callback){
//            var init1=new Array();

            $.ajax({
//			传入的回调函数
                type:"get",
                data:{
                    stuid:UserInformation.stuid,
                    sid:UserInformation.sid,
                    userid:UserInformation.userid
                },
                dataType:"jsonp",
//                jsonpCallback:"show",
                url:"http://"+IpHeader+"/school/mallItemsManage_listMallItems.do?method=getMallTypeList",
                success:function(d){
//                    d=JSON.stringify(d);
                    console.log(d);
//                    for(var i=0;i< d.data.length;i++){
//                        ob.push(d.data[i].malltypeid);
////                        ob.push(d.data[i].name);
//                    }
                    obj.ob= d.data;
                    for(var i in d.data){
                        obj.ob[i].name= toUtf16(d.data[i].name);
                        obj.ob[i].id= d.data[i].malltypeid;
                    }
                    if(callback){
                        callback(d);
                    }else{

                    }
                },
                error:function(){
                    console.log("数据我的物品数据失败");
                },
                async:true
            });

        },
        getMallitemstypeid:function(id,callback){
//            var init2=new Array();
            $.ajax({
//			传入的回调函数
                type:"get",
                data:{
                    stuid:UserInformation.stuid,
                    sid:UserInformation.sid,
                    userid:UserInformation.userid,
                    malltypeid:id
                },
                dataType:"jsonp",
//                jsonpCallback:"showData",
                url:"http://"+IpHeader+"/school/mallItemsManage_listMallItems.do?method=getMallItemsTypeList",
                success:function(data){
//                    data=JSON.stringify(data);
                    console.log(data);
                //商城物品类型

                    obj2.ob=data.data;
                    for(var i in data.data){
                        obj2.ob[i].id=data.data[i].mallitemstypeid;
                        obj2.ob[i].name=toUtf16(data.data[i].name);
                    }
                    if(callback){
                        callback(data);
                    }else{}
                },
                error:function(){
                    console.log("数据我的物品数据失败");
                },
                async:true
            });
//            return init2;
        },
        initEvent:function(id){
            obj3.ob='';
            $.ajax({
//			传入的回调函数
                type:"get",
                data:{
                    stuid:UserInformation.stuid,
                    sid:UserInformation.sid,
                    userid:UserInformation.userid,
                    mallitemstypeid:id
                },
                dataType:"jsonp",
                url:"http://"+IpHeader+"/school/mallItemsManage_listMallItems.do?method=getMyMallItemsList",
                success:function(data){
                    console.log(data);
                    var num=new Array();
                    var num1=new Array();
                    obj3.ob=data.data;
                    for(var i in data.data){
                        obj3.ob[i].exchangerecordid=data.data[i].exchangerecordid;
                        obj3.ob[i].name=toUtf16(data.data[i].name);
                        obj3.ob[i].picsummary=data.data[i].picsummary;
                        obj3.ob[i].status=data.data[i].status;
                    }
                    for(var j=0;j<obj3.ob.length;j++){
                        if(obj3.ob[j].status==1){
                            num.push(obj3.ob[j]);
                        }
                        if(obj3.ob[j].status==0){
                            num1.push(obj3.ob[j]);
                        }
                    }
                    obj3.ob=num1.concat(num);
                },
                error:function(){
                    console.log("数据我的物品数据失败");
                },
                async:true
            });
        },
        delData:function(id){
            $.ajax({
//			传入的回调函数
                type:"get",
                data:{
                    stuid:UserInformation.stuid,
                    sid:UserInformation.sid,
                    userid:UserInformation.userid,
                    exchangerecordid:id
                },
                dataType:"jsonp",
//                jsonpCallback:"showData",
                url:"http://"+IpHeader+"/school/mallItemsManage_updateMallItems.do?method=useMallItems",
                success:function(){
                    console.log("使用成功");
                },
                error:function(){
                    console.log("使用失败");
                },
                async:true
            });
        },
        updataImg:function(id){
               $('#bg_green_btn_card').css({display:'block'});
               var sr=$("li[name='"+id+"']").find("img").attr('src');
               $('.zheng_mian').attr('src',sr);
               $('.btn_close').on('click',function(){
//                   $('.btn_close img').attr('src','imgs/wo_de_wu_pin/btn_close_1.png');
                   $('#bg_green_btn_card').css({display:'none'});
               });
        }
    }
})();
//getData.getMalltypeid();
var of={oa:[],ob:[]};
getData.getMalltypeid(function(d){
    for(var i=0;i< d.data.length;i++){
        of.oa.push(d.data[i].malltypeid);
    }
    wupinmoren(of.oa[1]);
});
    function wupinmoren(id){
        getData.getMallitemstypeid(id,function(d){
            for(var i=0;i< d.data.length;i++){
                of.ob[i]=d.data[i].mallitemstypeid;
            }
            getData.initEvent(of.ob[0]);

        })
    }

