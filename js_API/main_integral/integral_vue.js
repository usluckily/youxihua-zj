/**
 * Created by Administrator on 2017/5/2.
 */
var vm=new Vue({
    el:'.wrap',
    data:{
        counID:oa,
        typeID:obj,
        mallID:obj1,
        titleID:obj2

    },
    methods:{
          qiehuan:function(index){
              eventCall.qh(index);
          },
          utf16:function(val){
                return toUtf16(val);
          },
            getData:function(val){
                initData.getMallitemstypeid(val);
            },
            getwupin:function(val){
                initData.initEvent(val);
            },
            getxinxi:function(val){
                eventCall.fr(val);
            },
            qhclass:function(val){
                eventCall.kpqhc(val);
            },
            qhclasses:function(val){
                eventCall.djqhc(val);
            },
            gettitle:function(){
                initData.getTitile();

            },
            fu:function(val,index){
                eventCall.getContent(val,index);
            }

    }

});


