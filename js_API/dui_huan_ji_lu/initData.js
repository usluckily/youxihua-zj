
//搭建vue代理
var vm_dui_huan_ji_lu = new Vue({
	el:"#bg_wdxx",
	data:{
//		默认进来的时候显示已兑换
        leftIndex:3,
		wei_dui_huan:[
            {"exchangetype":"卡片兑换积分", //兑换类型(一种是卡片兑换积分,一种是商城物品的兑换)
                "exchangename":"狗狗狗",//兑换物品名称
                "exchangetime":"2017-03-27 09:53:23.0",//兑换时间
                "exchangeintegral":"23",//兑换积分
                "exchangestatus":"已经兑换"
			},
            {"exchangetype":"卡片兑换积分", //兑换类型(一种是卡片兑换积分,一种是商城物品的兑换)
                "exchangename":"猫猫猫",//兑换物品名称
                "exchangetime":"2017-03-27 09:53:23.0",//兑换时间
                "exchangeintegral":"23",//兑换积分
                "exchangestatus":"已经兑换"
			},
		],
		dui_huan_zhong:[

		],
		yi_dui_huan:[

		]

	},
	methods:{
		changeLeft:function(index){
			this.leftIndex = index;
		}
	}
});

// 先获取未兑换的信息，再获取兑换中的信息，再获取已兑换的信息
$.ajax({type:"get",
    data:{
        stuid:UserInformation.stuid,
        sid:UserInformation.sid,
        userid:UserInformation.userid,
        status:1
    },
    dataType:"jsonp",
    url:"http://"+IpHeader+"/school/mallItemsManage_listMallItems.do?method=getMyExchangeRecord",
    success:function(result){
        console.log("获取的我的未兑换记录是:");
        console.log(result);
        //初始化未读消息回调函数
//	console.log(result);
//	每次都将未兑换设置为空
        vm_dui_huan_ji_lu._data.wei_dui_huan = [];
//	转码数组,换为新数组
            for (var i = 0; i < result.data.length; i++){
                var item = {};
//		设置item.exchangetype值
                item.exchangetype = result.data[i].exchangetype;
//		设置item.exchangetime值
                item.exchangetime = result.data[i].exchangetime.split(" ")[0];
//		设置item.exchangename值
                item.exchangename = toUtf16(result.data[i].exchangename);
//		设置exchangeintegral
                item.exchangeintegral = result.data[i].exchangeintegral;
//		设置exchangestatus
                item.exchangestatus =toUtf16( result.data[i].exchangestatus);
//		将数据放入到vue代理中去
                vm_dui_huan_ji_lu._data.wei_dui_huan.push(item);

            }
//	转换完毕
//	console.log(dataList.noRead);
//	dataList.isRead = newIsRead;
//	dataList.noRead = newNoRead;
        },
    error:function(){
        console.log("数据获取失败");
    },
    async:true
}).then(function () {
    // 兑换中的信息
    $.ajax({type:"get",
        data:{
            stuid:UserInformation.stuid,
            sid:UserInformation.sid,
            userid:UserInformation.userid,
            status:2
        },
        dataType:"jsonp",
        url:"http://"+IpHeader+"/school/mallItemsManage_listMallItems.do?method=getMyExchangeRecord",
        success:function(result){
            console.log("获取的我的兑换中数据是:");
            console.log(result);
            //初始化未读消息回调函数
//	console.log(result);
//	每次都将未兑换设置为空
            vm_dui_huan_ji_lu._data.dui_huan_zhong = [];
//	转码数组,换为新数组
            for (var i = 0; i < result.data.length; i++){
                var item = {};
//		设置item.exchangetype值
                item.exchangetype = result.data[i].exchangetype;
//		设置item.exchangetime值
                item.exchangetime = result.data[i].exchangetime.split(" ")[0];
//		设置item.exchangename值
                item.exchangename = toUtf16(result.data[i].exchangename);
//		设置exchangeintegral
                item.exchangeintegral = result.data[i].exchangeintegral;
//		设置exchangestatus
                item.exchangestatus =toUtf16( result.data[i].exchangestatus);
//		将数据放入到vue代理中去
                vm_dui_huan_ji_lu._data.dui_huan_zhong.push(item);


            }

//	转换完毕
//	console.log(dataList.noRead);
//	dataList.isRead = newIsRead;
//	dataList.noRead = newNoRead;
        },
        error:function(){
            console.log("数据获取失败");
        },
        async:true
    })
}).then(function () {
    $.ajax({type:"get",
        data:{
            stuid:UserInformation.stuid,
            sid:UserInformation.sid,
            userid:UserInformation.userid,
            status:3
        },
        dataType:"jsonp",
        url:"http://"+IpHeader+"/school/mallItemsManage_listMallItems.do?method=getMyExchangeRecord",
        success:function(result){
            console.log("获取的我的已对换数据是:");
            console.log(result);
            //初始化未读消息回调函数
//	console.log(result);
//	每次都将未兑换设置为空
            vm_dui_huan_ji_lu._data.yi_dui_huan = [];
//	转码数组,换为新数组
            for (var i = 0; i < result.data.length; i++){
                var item = {};
//		设置item.exchangetype值
                item.exchangetype = result.data[i].exchangetype;
//		设置item.exchangetime值
                item.exchangetime = result.data[i].exchangetime.split(" ")[0];
//		设置item.exchangename值
                item.exchangename = toUtf16(result.data[i].exchangename);
//		设置exchangeintegral
                item.exchangeintegral = result.data[i].exchangeintegral;
//		设置exchangestatus
                item.exchangestatus =toUtf16( result.data[i].exchangestatus);
//		将数据放入到vue代理中去
                vm_dui_huan_ji_lu._data.yi_dui_huan.push(item);


            }

//	转换完毕
//	console.log(dataList.noRead);
//	dataList.isRead = newIsRead;
//	dataList.noRead = newNoRead;
        },
        error:function(){
            console.log("数据获取失败");
        },
        async:true
    })
});

