///**
// * Created by Administrator on 2017/4/6.
// */
//$(function(){
////  $('.ul_list_pet li:not(li:first)').on('click',function() {
////      $(this).addClass('bj-nav').siblings().removeClass('bj-nav');
////      var x=$(this).find('span.world_icon').text();
////      var zArr=['发型','套装','上衣','裤子','裙子','袜子','鞋子','饰品','宠物'];
////      var yArr=['.fx','.tz','.sy','.kz','.qz','.wz','.xz','.sp','.cw'];
////      for(var i=0;i<zArr.length;i++){
////          if(zArr[i]==x){
////              show(yArr[i]);
////          }
////      }
////  });
////    var posX= 0,posY= 0,x= 0,y=0;
////    $('.list_real_pets li').on('click',function(){
////        var img=$(this).find('div.pet_img').css('background').split("(")[2].split(")")[0];
//////        alert(img);
////        var num=$(this).index();
//////        alert(num);
////        if(num==0){
//////             posX=parseInt($(this).find('div.pet_img').css('backgroundPosition').split("px")[0])+10;
////             posY=parseInt($(this).find('div.pet_img').css('backgroundPosition').split("px")[1])+12;
////            x =10;
////            y = posY;
////            $('.iner_pet').css({"background":"url("+img+")"}).css({"backgroundPosition":x+"px "+y+"px"});
////        }else if(num==4){
////            posX=parseInt($(this).find('div.pet_img').css('backgroundPosition').split("px")[0])-8;
////            posY=parseInt($(this).find('div.pet_img').css('backgroundPosition').split("px")[1])+10;
////            x =posX;
////            y = posY;
////            $('.iner_pet').css({"background":"url("+img+")"}).css({"backgroundPosition":x+"px "+y+"px"});
////        }else{
////            posX=$(this).find('div.pet_img').css('backgroundPosition').split("px")[0]-20;
////            posY=$(this).find('div.pet_img').css('backgroundPosition').split("px")[1];
////            x =posX;
////            y = posY;
////            $('.iner_pet').css({"background":"url("+img+")"}).css({"backgroundPosition":x+"px "+y+"px"});
////        }
////
////    });
//  $('.list_real_pets li').on('click',function(){
//      var x=parseInt($(this).find('div.pet_img').attr('class').split('g')[2]);
////      switch (x){
////          case 1:
////              $('.iner_pet').css({"background":"url('./imgs/ji_fen_shang_cheng/1.png')"});
////              break;
////          case 2:
////              $('.iner_pet').css({"background":"url('./imgs/ji_fen_shang_cheng/2.png')"});
////              break;
////          case 3:
////              $('.iner_pet').css({"background":"url('./imgs/ji_fen_shang_cheng/3.png')"});
////              break;
////          case 4:
////              $('.iner_pet').css({"background":"url('./imgs/ji_fen_shang_cheng/4.png')"});
////              break;
////          case 5:
////              $('.iner_pet').css({"background":"url('./imgs/ji_fen_shang_cheng/5.png')"});
////              break;
////          case 11:
////              $('.iner_pet').css({"background":"url('./imgs/ji_fen_shang_cheng/6.png')"});
////              break;
////          case 22:
////              $('.iner_pet').css({"background":"url('./imgs/ji_fen_shang_cheng/7.png')"});
////              break;
////          case 33:
////              $('.iner_pet').css({"background":"url('./imgs/ji_fen_shang_cheng/8.png')"});
////              break;
////          case 44:
////              $('.iner_pet').css({"background":"url('./imgs/ji_fen_shang_cheng/9.png')"});
////              break;
////          case 55:
////              $('.iner_pet').css({"background":"url('./imgs/ji_fen_shang_cheng/10.png')"});
////              break;
////      }
//  });
//
//  $('.btns_lef_nav div').on('click',function(){
//      var z= $(this).text();
//      switch(z){
//          case '卡片':
//          show('.kp');
//          if($(this).hasClass('k1')){
//
//          }else{
//              $(this).addClass('k1').siblings().removeClass('z1').removeClass('d1');
//          }
//          break;
//          case '装扮':
//              show('.zb');
//              if($(this).hasClass('z1')){
//
//              }else{
//                  $(this).addClass('z1').siblings().removeClass('k1').removeClass('d1');
//              }
//              break;
//          case '道具':
//              show('.dj');
//              if($(this).hasClass('d1')){
//
//              }else{
//                  $(this).addClass('d1').siblings().removeClass('z1').removeClass('k1');
//              }
//              break;
//      }
//  })
//});
//function show(x){
//  $(x).fadeIn(500).siblings().fadeOut(500);
//}
