//var vm = new Vue({
//				el:"#bg_wdwp",
//				data:{
////					免作业道具数据
//					list:mz
////						{"title":"马良的神笔","time":1},
////						{"title":"凤凰的金笔","time":2},
////						{"title":"魔法石钥匙","time":3}
//					,
////					卡数据
//					card:{
////						24气节卡
//						card_list_24:jq
////							"chun_fen":{"title":"春分","time":1,"src":"imgs/wo_de_wu_pin/card_chun_fen.png"},
////							"dong_zhi":{"title":"冬至","time":2,"src":"imgs/wo_de_wu_pin/card_dong_zhi.png"},
////							"yu_shui":{"title":"雨水","time":3,"src":"imgs/wo_de_wu_pin/card_yu_shui.png"}
//						,
////						游戏卡
//						card_list_game:yx
////							"panda":{"title":"熊猫骑士","time":1,"src":"imgs/wo_de_wu_pin/card_panda.png"},
////							"wa_xian_zi":{"title":"蛙仙子","time":2,"src":"imgs/wo_de_wu_pin/card_wa_xian_zi.png"},
////							"spirit_girl":{"title":"精灵少女","time":3,"src":"imgs/wo_de_wu_pin/card_spiri_girl.png"}
//						,
////						童话故事卡
//						card_list_tong_hua:th
////							"xiao_hong_mao":{"title":"小红帽","time":1,"src":"imgs/wo_de_wu_pin/card_xiao_hong_mao.png"},
////							"xiao_chou_qi_shi":{"title":"小丑骑士","time":2,"src":"imgs/wo_de_wu_pin/card_xiao_chou_yong_shi.png"},
////							"lang_lai_le":{"title":"狼来了","time":3,"src":"imgs/wo_de_wu_pin/card_lang_lai_le.png"}
//
//
//					},
////					左侧的选项框选中编号
//					active:1,
////					道具框选项选中编号
//					active_dao_ju:1,
////					卡片框选项选中编号
//					active_ka_pian:1,
////					二十四节气卡数量
//					num_24_card:3,
////					游戏卡数量
//					num_game_card:3,
////					童话卡数量
//					num_tonghua_card:3
//
//				},
//				methods:{
//					choose:function(index){
//						this.active = index;
//
//					},
////					卡片头部选项卡点击切换函数
//					chooseKaPian:function(index){
//
//						this.active_ka_pian = index;
//
//
//					},
////					道具头部选项卡点击切换函数
//					chooseDaoJu:function(index){
//						this.active_dao_ju = index;
////						免作业道具
//						if(this.active_dao_ju==1){
//							this.list = mz
////								{"title":"马良的神笔","time":1},
////								{"title":"凤凰的金笔","time":2},
////								{"title":"魔法石钥匙","time":3}
//							;
////							免打扫卫生道具
//						}else if(this.active_dao_ju==2){
//							this.list = ms
////								{"title":"道长的浮尘","time":1},
////								{"title":"女巫的扫把","time":2},
////								{"title":"哈利的扫把","time":3}
//							;
////							免课间操道具
//						}else if(this.active_dao_ju==3){
//							this.list = mc
////								{"title":"隐身术","time":1},
////								{"title":"分身术","time":1},
////								{"title":"神秘卷轴","time":1},
//
//							;
//						}
//					},
//
//					DaoJuList:function(){
//
//					},
//                    utf16:function(val){
//                        return toUtf16(val);
//                    },
//                    shiyongkapian:function(index){
//
//                        zeroModal.confirm( {
//						        content:"确定要使用该物品吗?",
//						        okFn:function(){
//						        	 getData.delData(index);
//						        	 $("li[name='"+index+"']").find("div.bjtc").css({display:"block"});
//                                     $("li[name='"+index+"']").find("div.wenzi").css({display:"block"});
//
//						        }
//				        });
//
//
//                    },
//                    shiyongdaoju:function(index){
//                        zeroModal.confirm( {
//                            content:"确定要使用该物品吗?",
//                            okFn:function(){
//                                getData.delData(index);
//                                $("li[name='"+index+"']").find("div.bj").css({display:"block"});
//                                $("li[name='"+index+"']").find("div.wz").css({display:"block"});
//
//                            }
//                        });
//                    },
//					seeCardDetail:function(val){
//                        getData.updataImg(val);
////                        alert(val);
//					}
//
//				},
//
//
//
//				computed:{
//
//				}
//});

var vm = new Vue({
				el:"#bg_wdwp",
				data:{
                    obj1:obj,
                    obj2:obj2,
                    obj3:obj3
				},
				methods:{
                    getData1:function(val){
                        getData.getMallitemstypeid(val);
                    },
                    getshuju:function(val){
                        getData.initEvent(val);
                    },
                    kpqhclass:function(index){
                        $('.kp').removeClass('head_world_active');
                        $("div[name='xx"+index+"']").addClass('head_world_active');
                    },
                    djqhclass:function(index){
                        $('.dj').removeClass('head_world_active');
                        $("div[name='xxx"+index+"']").addClass('head_world_active');
                    },
                    qiehuan:function(index,id){
                        if(index==0){
                            obj3.ob='';
                            $('.nav_left_origin').removeClass('first_active second_active third_active');
                            $("div[name='na"+index+"']").addClass('first_active');
                            $('.inner_bg_dao_ju').css({display:"block"});
                            $('.iner_bg_ka-pian').css({display:'none'});
                            $('.iner_bg_zhuang_ban').css({display:"none"});
                            wupinmoren(id);
                            $('.dj').removeClass('head_world_active');
                            $("div[name='xxx"+0+"']").addClass('head_world_active');
                        }else if(index==1){
                            obj3.ob='';
                            $('.nav_left_origin').removeClass('first_active second_active third_active');
                            $("div[name='na"+index+"']").addClass('second_active');
                            $('.inner_bg_dao_ju').css({display:"none"});
                            $('.iner_bg_ka-pian').css({display:'block'});
                            $('.iner_bg_zhuang_ban').css({display:"none"});
                            wupinmoren(id);
                            $('.kp').removeClass('head_world_active');
                            $("div[name='xx"+0+"']").addClass('head_world_active');
                        }else if(index==2){
                            obj3.ob='';
                            $('.nav_left_origin').removeClass('first_active second_active third_active');
                            $("div[name='na"+index+"']").addClass('third_active');
                            $('.inner_bg_dao_ju').css({display:"none"});
                            $('.iner_bg_ka-pian').css({display:'none'});
                            $('.iner_bg_zhuang_ban').css({display:"block"});
                            wupinmoren(id);
                        }
                    },
                   shiyongkapian:function(index){
                        zeroModal.confirm( {
						        content:"确定要使用该物品吗?",
						        okFn:function(){
						        	 getData.delData(index);
						        	 $("li[name='"+index+"']").find("div.bjtc").css({display:"block"});
                                     $("li[name='"+index+"']").find("div.wenzi").css({display:"block"});
						        }
				        });
                    },
                    shiyongdaoju:function(index){
                        zeroModal.confirm( {
                            content:"确定要使用该物品吗?",
                            okFn:function(){
                                getData.delData(index);
                                $("li[name='"+index+"']").find("div.bj").css({display:"block"});
                                $("li[name='"+index+"']").find("div.wz").css({display:"block"});
                            }
                        });
                    },
					seeCardDetail:function(val){
                        getData.updataImg(val);
					}

				}

});
