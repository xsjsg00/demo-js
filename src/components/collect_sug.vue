<template>
	<div >
		<div id="list1" class="list-wrapper">
			<div class="wrapper" @click="show1=!show1">个人意见<span v-if="show1" style="float:right; margin-right: 20px;margin-top: 8px" >∨</span><span v-if="!show1" style="float:right; margin-right: 20px;margin-top: 10px" >∧</span></div>
			<transition name="fade">
				<div v-show="show1">
					<table cellspacing="0"  border="0">
				    	<thead>
				    		<th width="10%">序号</th>
				    		<th width="40%">委员姓名</th>
				    		<th width="20%">意见类型</th>
				    		<th width="20%">审核意见</th>
				    	</thead>
				    	<tbody>
				    		<tr v-for="(v,k) in optionsInfo" v-if="v.opinion_type=='01'">
				    			<td>{{k+1}}</td>
				    			<td><a href="javascript:void(0);"  @click="openPopup(v.opinion_id)">{{v.user_name_cn}}</a></td>
				    			<td>个人意见</td>
				    			
				    			<td>{{v.view_one | formatterViewOne}}</td>
				    		</tr>
				    		<tr v-if="optionsInfo && optionsInfo.length==0">
				    			<td colspan="4">
				    				<mt-cell >无相关记录</mt-cell>
				    			</td>
				    		</tr>
				    	</tbody>
			    	</table>
			    </div>
			   </transition>
	    </div>
	    <div id="list2" class="list-wrapper">
		    <div class="wrapper" @click="show2=!show2">综合意见<span v-if="show2" style="float:right; margin-right: 20px;margin-top: 8px" >∨</span><span v-if="!show2" style="float:right; margin-right: 20px;margin-top: 10px" >∧</span></div>
			<transition name="fade">
				<div v-show="show2">
				    <table cellspacing="0"  border="0">
				    	<thead>
				    		<th width="10%">序号</th>
				    		<th width="40%">委员姓名</th>
				    		<th width="20%">意见类型</th>
				    		<th width="20%">审核意见</th>
				    	</thead>
				    	<tbody>
				    		<tr v-for="(v,k) in optionsInfo" v-if="v.opinion_type=='02'">
				    			<td>{{k+1}}</td>
				    			<td><a href="javascript:void(0);"  @click="openPopup(v.opinion_id)">{{v.user_name_cn}}</a></td>
				    			<td>综合意见</td>
				    			<td>{{v.view_one | formatterViewOne}}</td>
				    		</tr>
				    		<tr v-if="optionsInfo && optionsInfo.length==0">
				    			<td colspan="4">
				    				<mt-cell >无相关记录</mt-cell>
				    			</td>
				    		</tr>
				    	</tbody>
			    	</table>
			   </div>
			   </transition>
	    </div>
	    <mt-popup v-model="popupVisible3" position="right" class="mint-popup-3" :modal="false">
	    	<mt-cell title="审批人：" >
				<span style="color: black">{{oneInfo.user_name_cn}}</span>
			</mt-cell>
			<mt-cell title="发送时间：" >
				<span style="color: black">{{oneInfo.create_time_str}}</span>
			</mt-cell>
			<mt-cell title="意见类型：" >
				<span style="color: black">{{oneInfo.opinion_type=='02'?'综合意见':'个人意见'}}</span>
			</mt-cell>
			<mt-cell title="审核意见：" >
				<span style="color: black">{{oneInfo.view_one | formatterViewOne}}</span>
			</mt-cell>
			<mt-cell title="意见详情：" :label="oneInfo.remark_one" >
			</mt-cell>
			<mt-cell  >
				<div  v-for="(v,k ) in oneInfo.optionAttach">
					<a href="javascript:void(0)" @click="downFile(v.file_path,v.file_name)" >{{v.file_name}}</a>
				</div>
				<div  v-if="oneInfo.optionAttach && oneInfo.optionAttach.length==0">
					无相关附件
				</div>
			    <!--<span style="color: dodgerblue">这里是元素</span>-->
			</mt-cell>
	      	<mt-button @click.native="popupVisible3 = false" size="large" type="primary">关闭</mt-button>
	    </mt-popup>
	</div>
</template>
<style>
      .mint-popup-3 {
        width: 100%;
        height: 100%;
        background-color: #fff;
      }

      .mint-popup-3 .mint-button {
        position: absolute;
        width: 90%;
        top: 90%;
        left: 5%;
        transform: translateY(-50%);
      }

</style>
<style>
table {
	color: #1f2d3d;
	width: 100%;
}
 
th {
    background-color: #eef1f6;
    border-bottom: 1px solid #dfe6ec;
}
 
td {
	border-bottom: 1px solid #dfe6ec;
	
}
 
th, td {
	text-align: center;
	box-sizing: border-box;
    height: 40px;
    min-width: 0;
    position: relative;
    text-overflow: ellipsis;
    vertical-align: middle;
}
</style>
<script>
export default {
	name:"collectSug",
	 data() {
	    return {
	    	show1:true,
	    	show2:true,
	    	popupVisible3: false,
	      	value: '',
	      	result: [
		        {title:"a",value:"b"},
		        {title:"b",value:"d"}
	      	],
	      	oneInfo:{}
	    };
	 },
	 props:['optionsInfo'],
	 filters:{
	 	formatterViewOne(view_one){
	 		if(!view_one) return "未提交";
	 		if(view_one.indexOf("01")>-1){
				view_one="同意";
			}else if(view_one.indexOf("02")>-1){
				view_one="拟同意";
			}else if(view_one.indexOf("03")>-1){
				view_one="反对";
			}else{
				view_one="未提交";
			}
	 		return view_one;
	 	}
	 },
	 methods:{
	 	openPopup (opinion_id) {
	 		this.popupVisible3 = true;
	 		let self = this;
	 		for(let i in self.optionsInfo){
	 			if(self.optionsInfo[i].opinion_id == opinion_id){
	 				
	 				self.oneInfo = self.optionsInfo[i];
	 				break;
	 			}
	 		}
	 	},
	 	downFile(path,name){
			window.location.href= (ctx+'/buz/doProxyForDownFile?filePath='+path+'&v='+Math.random());
		}
	 }
	 
};
	

</script>
