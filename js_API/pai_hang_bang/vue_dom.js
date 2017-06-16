//Vue.use(vueResource);
//获取排名之后的回调函数

var vm_phb = new Vue({
	el:"#bg_pai_hang_bang",
	data:{
//		
		_real_search:[
				
		],
//		学校排名
		_dataSchool:_dataSchool,
//		年级排名
		_dataGrade:_dataGrade,
//		班级排名
		_dataClass:_dataClass,
//		左侧灯笼的选中序号
		
		chooseIndex:"3",
//		当前用户的classID
		classid:localStorage.getItem("classid"),
//		当前用户的gradeid
		gradeid:localStorage.getItem("gradeid"),
//		当前用户的sid
		sid:localStorage.getItem("sid"),
//		用户的userid
		"userid":UserInformation.userid
	},
	methods:{
		choose:function(index){
			this.chooseIndex = index;
			if(index==1){
				localStorage.setItem("nowChuoose","class");
			}else if(index==2){
				localStorage.setItem("nowChuoose","grade");
			}else if(index==3){
				localStorage.setItem("nowChuoose","school");
			}
		},
		
	},
	
});
localStorage.setItem("nowChuoose","school");
//默认设置当前的nowChuoose为school
//console.log(vm_phb._data._dataClass.No2);
//console.log(vm_phb._data)