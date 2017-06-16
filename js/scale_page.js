// var scale = 1/window.devicePixelRatio;
//定义缩放的代码
document.write('<meta name="viewport" content="width=device-width,initial-scale='+1.0+',minimum-scale='+1.0+',maximum-scale='+1.0+',user-scalable=no" />');
(function(){
    var html = document.getElementsByTagName("html")[0];
    html.style.fontSize = html.clientWidth/1920+"px";
    console.log()
})();