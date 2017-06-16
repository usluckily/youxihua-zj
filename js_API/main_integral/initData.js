/**
 * Created by Administrator on 2017/5/2.
 */
var oa=new Array();
var ob=new Array();
var obj = { oc:[]};
var obj1={od:[]};
var obj2={oe:[]};
var obj3={of:[]};
var a1=0;
var a2=0;
var a3=0;

var initData=(function(){
    return{
        //商城类型
        gettypeid:function(callback){

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
//                    console.log(d);
                    for(var i=0;i< d.data.length;i++){
                        ob.push(d.data[i].malltypeid);
                        oa.push(d.data[i]);

                    }
                    if(callback){
                        callback(d);
                    }else{}
                    console.log(ob);
                },
                error:function(e){
                    console.log("err:"+ JSON.stringify(e));
                },
                async:true
            });

        },
        getMallitemstypeid:function(id,callback){

//            var init2=new Array();

//            obj.oc=[];
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
//                jsonpCallback:"showData1",
                url:"http://"+IpHeader+"/school/mallItemsManage_listMallItems.do?method=getMallItemsTypeList",

                success:function(data){

                    obj.oc=data.data;
//                    obj.ob=data.data;
                    for(var i=0;i<obj.oc.length;i++){
                        obj.oc[i].name = toUtf16(obj.oc[i].name);
                        obj.oc[i].id=obj.oc[i].mallitemstypeid;

                    }
                    if(callback){
                        callback(data);
                    }else{}

//                    cb(data);
                    console.log(obj.oc);

                },

                error:function(){
                    console.log("数据我的物品数据失败");
                },
                async:true
            });
//            return init2;
        },
        initEvent:function(id,callback){
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
//                jsonpCallback:"showData2",
                url:"http://"+IpHeader+"/school/mallItemsManage_listMallItems.do?method=getMallItemsList",
                success:function(data){
                    obj1.od=data.data;
//                    obj.ob=data.data;
                    for(var i=0;i<obj1.od.length;i++){
                        obj1.od[i].picsummary = obj1.od[i].picsummary;
                        obj1.od[i].integral=obj1.od[i].integral;
                        obj1.od[i].mallitemsid=obj1.od[i].mallitemsid;
                        obj1.od[i].content=obj1.od[i].content;
                        obj1.od[i].name=obj1.od[i].name;
                    }
                    if(callback){
                        callback(data);
                    }else{}
                    console.log(data);

                },
                error:function(){
                    console.log("数据我的物品数据失败");
                },
                async:true
            });
        },
        duihuan:function(id){
            $.ajax({
//			传入的回调函数
                type:"get",
                data:{
                    stuid:UserInformation.stuid,
                    sid:UserInformation.sid,
                    userid:UserInformation.userid,
                    mallitemsid:id
                },
                dataType:"jsonp",
//                jsonpCallback:"showData",
                url:"http://"+IpHeader+"/school/mallItemsManage_updateMallItems.do?method=addExchangeRecord",
                success:function(){
                    console.log('数据兑换成功')
                },
                error:function(){
                    console.log("数据兑换失败");
                },
                async:true
            });
        },
        getIntegral:function(){
            $.ajax({
//			传入的回调函数
                type:"get",
                data:{
                    card:UserInformation.card,
                    deviceId:UserInformation.deviceId,
                    stuid:UserInformation.stuid,
                    sid:UserInformation.sid,
                    userid:UserInformation.userid
                },
                dataType:"jsonp",
                url:"http://"+"139.219.184.67"+"/gameTeaching/student",
                success:function(data){
//                    var integral=data.data.countIntegral;
//                    console.log(data);
//                    $('.my_integral').html(integral);
//                    var count=0;
//                    for(var i=0;i<data.datacount.length;i++){
//                         count+=parseInt(data.datacount[i].count);
//                    }
//                    $('.num_card').html(count);
                },
                error:function(){
                    console.log("积分兑换失败");
                },
                async:true
            });
        },
        getTitile:function(){
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
                url:"http://"+IpHeader+"/school/integralDescription_listIntegralDescription.do?method=getIntegralDescriptionMobile",
                success:function(d){
//                    d=JSON.stringify(d);
                    console.log(d+"文章信息");
//
//                    if(callback){
//                        callback(d);
//                    }else{}
                    console.log(d.error);
                    if(d.error!="success"){
                        zeroModal.alert("您的信息错误，请校正后重新登陆");
                    }else{
                        for(var i=0;i< d.data.length;i++){
                        obj2.oe[i]=toUtf16(d.data[i].title);
                        obj3.of[i]=toUtf16(d.data[i].content);

                        }
                        console.log(obj2.oe);
                    }

                },
                error:function(e){
                    console.log("err:"+ JSON.stringify(e));
                },
                async:true
            });
        }

    }
})();
initData.getTitile();
//initData.gettypeid();
//initData.getIntegral();
var  eventCall=(function(){
    return{
        qh:function(index){
            if(index==0) {
                $("div[name='xxx"+0+"']").addClass("k1");
                $("div[name='xxx"+1+"']").removeClass('g1');
                $("div[name='xxx"+2+"']").removeClass('d1');
                $('.ul_list_ka_pian').css({display:'none'});
                $('.ul_list_pet').css({display:'none'});
                $('.ul_list_dao_ju').css({display:'block'});
//                morenchonwu(ob[0]);
                var x=$("div[name='xxx"+0+"']").attr('data-id');

                moren(x);
            }
            else if(index==1){
                $("div[name='xxx"+0+"']").removeClass('k1');
                $("div[name='xxx"+1+"']").addClass("g1");
                $("div[name='xxx"+2+"']").removeClass('d1');
                $('.ul_list_ka_pian').css({display:'block'});
                $('.ul_list_pet').css({display:'none'});
                $('.ul_list_dao_ju').css({display:'none'});
                var y=$("div[name='xxx"+1+"']").attr('data-id');

//                morenchonwu(ob[1]);
                moren(y);
            }
            else{
                $("div[name='xxx"+0+"']").removeClass('k1');
                $("div[name='xxx"+1+"']").removeClass('g1');
                $("div[name='xxx"+2+"']").addClass("d1");
                $('.ul_list_ka_pian').css({display:'none'});
                $('.ul_list_pet').css({display:'block'});
                $('.ul_list_dao_ju').css({display:'none'});
                var z=$("div[name='xxx"+2+"']").attr('data-id');

                moren(z);
//                morenchonwu(ob[2]);
            }
        },
        fr:function(id){
            var m=id;
            var x=$(".list_real_ka_pian li[name='"+id+"']").find('img').attr('src');
            var y=toUtf16($(".list_real_ka_pian li[name='"+id+"']").attr("id"));
            var z=toUtf16($(".list_real_ka_pian li[name='"+id+"']").attr("data-id"));
            var n=$(".list_real_ka_pian li[name='"+id+"']").find('div.starts_and_prices').text();
            $('.pet_name').html(z);
            $('.iner_card').attr('src',x);
            $('.p2').html(y);
            $('.name').html(m);
            $('.integral').html(n);
        },
        kpqhc:function(val){
            $('.ul_list_ka_pian li').addClass('ab');
            $(".ul_list_ka_pian li[name='xxx"+val+"']").addClass('active2').removeClass('ab');

        },
        djqhc:function(val){
            $('.ul_list_dao_ju li').addClass('ab');
            $(".ul_list_dao_ju li[name='xxx"+val+"']").addClass('active2').removeClass('ab');
        },
        getContent:function(val,index){
            $('.ale').css({display:"none"});
            $('.ale1').css({display:'block'});
            $('.title').html(val);
            $('.cont').html(obj3.of[index]);
        }
    }
})();

$(function(){
    $('.ul_list_pet li:not(li:first)').on('click',function(){
        $('.ul_list_pet li:not(li:first)').removeClass('active1');
        $(this).addClass('active1');
    });
//    morenchonwu(ob[0]);
//    $('.dui_huan_shuo_ming').on('click',function(){
//
//    })
    $('.dui_huan_shuo_ming').on('click',function(){
        $('.ale').css({display:"block"});
    });
    $('.close_btn').on('click',function(){
        $('.ale').css({display:"none"});

    });
    $('.close_btn1').on('click',function(){
        $('.ale1').css({display:"none"});
        $('.ale').css({display:"block"});
    });

    $('#ka_pian_dui_huan').on('click',function(){
        var y=$('.integral').html();
        zeroModal.confirm({
            content:"兑换该物品需要花费"+y+"积分,确定兑换吗？",
            okFn:function(){
                var x= $('.name').html();
                if(y==null || y=='' || y==undefined){
                    zeroModal.alert("请选择物品进行兑换")
                }else{
                    var z=parseInt($('.my_integral').html())-parseInt(y);
                    if(z<0){
                        zeroModal.alert("积分不足，无法兑换");
                    }else{
                        initData.duihuan(x);
                        $('.my_integral').html(z);
                        localStorage.setItem('integral',z);
                        $('.num_card').html(parseInt($('.num_card').html())+1);
                        localStorage.setItem('count',$('.num_card').html());
                        zeroModal.success("恭喜,兑换成功");
                    }
                }

            }
        });
    });
    $('.my_integral').html(localStorage.getItem("integral"));
    $('.num_card').html(localStorage.getItem("count"));
});
//function morenchonwu(a,b,c){
//    initData.getMallitemstypeid(a);
//    initData.initEvent(b);
//    setTimeout(function(){
//        eventCall.fr(c);
//    },200)
//}




    var og={oa:[],ob:[],oc:[]};

   initData.gettypeid(function(d){
       for(var i=0;i< d.data.length;i++){
           og.oa.push(d.data[i].malltypeid);
       }
       moren(og.oa[2]);
   });
    function moren(id){
        initData.getMallitemstypeid(id,function(d){
            for(var i=0;i< d.data.length;i++){
                og.ob[i]=d.data[i].mallitemstypeid;
            }
        console.log(og.ob[0]);
            initData.initEvent(og.ob[0],function(d){
                $('.ul_list_ka_pian li').addClass('ab')
                $($('.ul_list_ka_pian li')[0]).removeClass('ab')
                //
                $('.ul_list_dao_ju li').addClass('ab')
                $($('.ul_list_dao_ju li')[0]).removeClass('ab')
                //

                for(var i=0;i< d.data.length;i++){
                    og.oc[i]=d.data[i].mallitemsid;
                }
                setTimeout(function(){
                    eventCall.fr(og.oc[0]);
                },100);
//            console.log(og.oc[0]);
            })
        });
    }