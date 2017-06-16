var _data = [
	{
		content:"",
		exchangetime:"",
		integral:"",
		classNum:"leaf first_leaf"
	},
	{
		content:"",
		exchangetime:"",
		integral:"",
		classNum:"leaf tow"
	},
	{
		content:"",
		exchangetime:"",
		integral:"",
		classNum:"leaf three"
	},
	{
		content:"",
		exchangetime:"",
		integral:"",
		classNum:"leaf four"
	},
	{
		content:"",
		exchangetime:"",
		integral:"",
		classNum:"leaf five"
	},
	{
		content:"",
		exchangetime:"",
		integral:"",
		classNum:"leaf six"
	},
	{
		content:"",
		exchangetime:"",
		integral:"",
		classNum:"leaf seven"
	},
	{
		content:"",
		exchangetime:"",
		integral:"",
		classNum:"leaf eight"
	},
	{
		content:"",
		exchangetime:"",
		integral:"",
		classNum:"leaf night"
	},
	{
		content:"",
		exchangetime:"",
		integral:"",
		classNum:"leaf ten"
	},
	{
		content:"",
		exchangetime:"",
		integral:"",
		classNum:"leaf elevent"
	},
	{
		content:"",
		exchangetime:"",
		integral:"",
		classNum:"leaf twelve"
	}
	
];
var _data1 = [
    {
        content:"",
        exchangetime:"",
        integral:"",
        classNum:"leaf first_leaf"
    },
    {
        content:"",
        exchangetime:"",
        integral:"",
        classNum:"leaf tow"
    },
    {
        content:"",
        exchangetime:"",
        integral:"",
        classNum:"leaf three"
    },
    {
        content:"",
        exchangetime:"",
        integral:"",
        classNum:"leaf four"
    },
    {
        content:"",
        exchangetime:"",
        integral:"",
        classNum:"leaf five"
    },
    {
        content:"",
        exchangetime:"",
        integral:"",
        classNum:"leaf six"
    },
    {
        content:"",
        exchangetime:"",
        integral:"",
        classNum:"leaf seven"
    },
    {
        content:"",
        exchangetime:"",
        integral:"",
        classNum:"leaf eight"
    },
    {
        content:"",
        exchangetime:"",
        integral:"",
        classNum:"leaf night"
    },
    {
        content:"",
        exchangetime:"",
        integral:"",
        classNum:"leaf ten"
    },
    {
        content:"",
        exchangetime:"",
        integral:"",
        classNum:"leaf elevent"
    },
    {
        content:"",
        exchangetime:"",
        integral:"",
        classNum:"leaf twelve"
    }

];
var vm_ji_fen_li_cheng = new Vue({
	el:"#bg_ji_fen_ji_cheng",
	data:{
		_data:_data
	}
});
var num=1;
var count=0;
$('.top').on('click',function() {
    console.log(count);
    num--;
    if(num==0){
        num=1;
    }
    initData();
//初始化数据
    function initData(){
        $.ajax({
            type:"get",
            url:"http://"+IpHeader+"/school/mallItemsManage_listMallItems.do?method=getIntegralProcessList",
            data:{
                stuid:UserInformation.stuid,
                sid:UserInformation.sid,
                userid:UserInformation.userid
            },
            dataType :"jsonp",
            success:function(result){
                for(var k=0;k<result.data.length;k++){
                    if(k<12*(num) && num==1){
                        _data1[k].content =toUtf16(result.data[k].content);
                        var exchangetime = result.data[k].exchangetime.split(" ");
                        _data1[k].exchangetime = exchangetime[0];
                        _data1[k].integral = "+"+result.data[k].integral;
                    }
                    if(k>=12*(num-1) && 12*num>result.data.length && num>1){
//                        alert(1);
                        _data1[k-12*(num-1)].content =toUtf16(result.data[k].content);
                        var exchangetime = result.data[k].exchangetime.split(" ");
                        _data1[k-12*(num-1)].exchangetime = exchangetime[0];
                        _data1[k-12*(num-1)].integral = "+"+result.data[k].integral;
                    }
                    if(k>=12*(num-1) && k<12*num && 12*num<result.data.length && num>1){
//                        alert(1);
                        _data1[k-12*(num-1)].content =toUtf16(result.data[k].content);
                        var exchangetime = result.data[k].exchangetime.split(" ");
                        _data1[k-12*(num-1)].exchangetime = exchangetime[0];
                        _data1[k-12*(num-1)].integral = "+"+result.data[k].integral;

                    }
                }
                for(var i=0;i<_data.length;i++){
                    if(_data1[i]){
                        _data[i].content =_data1[i].content;
                        _data[i].exchangetime = _data1[i].exchangetime;
                        _data[i].integral =_data1[i].integral;
                        _data1[i].content ='';
                        _data1[i].exchangetime ='';
                        _data1[i].integral ='';
                    }else{
                        _data[i].content ='';
                        _data[i].exchangetime ='';
                        _data[i].integral ='';
                        _data1[i].content ='';
                        _data1[i].exchangetime ='';
                        _data1[i].integral ='';
                    }
                }

            },
            error:function(){
                console.log("获取数据失败");
            },
            async:true
        });
    };
});
$('.bottom').on('click',function() {
    num++;
    if(num>count){
        num=count;
    }
    initData();
//初始化数据
    function initData(){
        $.ajax({
            type:"get",
            url:"http://"+IpHeader+"/school/mallItemsManage_listMallItems.do?method=getIntegralProcessList",
            data:{
                stuid:UserInformation.stuid,
                sid:UserInformation.sid,
                userid:UserInformation.userid
            },
            dataType :"jsonp",
            success:function(result){
                for(var k=0;k<result.data.length;k++){
                    if(k<12*(num) && num==1){
                        _data1[k].content =toUtf16(result.data[k].content);
                        var exchangetime = result.data[k].exchangetime.split(" ");
                        _data1[k].exchangetime = exchangetime[0];
                        _data1[k].integral = "+"+result.data[k].integral;
                    }
                    if(k>=12*(num-1) && 12*num>result.data.length && num>1){
//                        alert(1);
                        _data1[k-12*(num-1)].content =toUtf16(result.data[k].content);
                        var exchangetime = result.data[k].exchangetime.split(" ");
                        _data1[k-12*(num-1)].exchangetime = exchangetime[0];
                        _data1[k-12*(num-1)].integral = "+"+result.data[k].integral;

                    }
                    if(k>=12*(num-1) && k<12*num && 12*num<result.data.length && num>1){
//                        alert(1);
                        _data1[k-12*(num-1)].content =toUtf16(result.data[k].content);
                        var exchangetime = result.data[k].exchangetime.split(" ");
                        _data1[k-12*(num-1)].exchangetime = exchangetime[0];
                        _data1[k-12*(num-1)].integral = "+"+result.data[k].integral;

                    }
                }
                for(var i=0;i<_data.length;i++){
                    if(_data1[i]){
                        _data[i].content =_data1[i].content;
                        _data[i].exchangetime = _data1[i].exchangetime;
                        _data[i].integral =_data1[i].integral;
                        _data1[i].content ='';
                        _data1[i].exchangetime ='';
                        _data1[i].integral ='';
                    }else{
                        _data[i].content ='';
                        _data[i].exchangetime ='';
                        _data[i].integral ='';
                        _data1[i].content ='';
                        _data1[i].exchangetime ='';
                        _data1[i].integral ='';
                    }
                }
            },
            error:function(){
                console.log("获取数据失败");
            },
            async:true
        });
    };
});
initData();
//初始化数据
function showData(result){
//    console.log(result);
    var len=result.data.length;
    count=parseInt(len/12);
    var number=len%12;
    if(number!=0){
        count=count+1;
    }else{
        count=count;
    }

        for(var i=0;i<result.data.length;i++){
            if(i<12*(num) && num==1){
                _data1[i].content =toUtf16(result.data[i].content);
                var exchangetime = result.data[i].exchangetime.split(" ");
                _data1[i].exchangetime = exchangetime[0];
                _data1[i].integral = "+"+result.data[i].integral;
            }
            if(i>=12*(num-1) && 12*num>result.data.length && num>1){
                _data1[i-12*(num-1)].content =toUtf16(result.data[i].content);
                var exchangetime = result.data[i].exchangetime.split(" ");
                _data1[i-12*(num-1)].exchangetime = exchangetime[0];
                _data1[i-12*(num-1)].integral = "+"+result.data[i].integral;
            }

        }
    for(var i=0;i<_data.length;i++){
        if(_data1[i]){
            _data[i].content =_data1[i].content;
            _data[i].exchangetime = _data1[i].exchangetime;
            _data[i].integral =_data1[i].integral;
            _data1[i].content ='';
            _data1[i].exchangetime ='';
            _data1[i].integral ='';
        }else{
            _data[i].content ='';
            _data[i].exchangetime ='';
            _data[i].integral ='';
            _data1[i].content ='';
            _data1[i].exchangetime ='';
            _data1[i].integral ='';
        }
    }
}
function initData(){
	$.ajax({
		type:"get",
		url:"http://"+IpHeader+"/school/mallItemsManage_listMallItems.do?method=getIntegralProcessList",
		data:{
//				card:UserInformation.card,
//				deviceId:UserInformation.card,
				stuid:UserInformation.stuid,
				sid:UserInformation.sid,
				userid:UserInformation.userid
			},
		dataType :"jsonp",
		jsonpCallback:"showData",
		success:function(){
			console.log("获取数据成功");
			
		},
		error:function(){
			console.log("获取数据失败");
		},
		async:true
	});
};
