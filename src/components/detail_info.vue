<template>
<div v-if="dataInfo.projectInfo!=null">
		<mt-cell title="项目名称:" >
		  <span style="color: black">{{dataInfo.projectInfo.project_name}}</span>
		</mt-cell>
		<mt-cell title="项目类别:" >
		  <span style="color: black">{{dataInfo.projectInfo.project_type}}</span>
		</mt-cell>
		<mt-cell title="审核方式:" >
		  <span style="color: black">{{(dataInfo.projectInfo.audit_type?(dataInfo.projectInfo.audit_type == "01"? "一般程序":(dataInfo.projectInfo.audit_type == "02")? "简化程序":"完整程序"):"")}}</span>
		</mt-cell>
		<mt-cell title="项目紧急:" >
		  <span style="color: black">{{dataInfo.projectInfo.urgent}}</span>
		</mt-cell>
		<mt-cell title="主办单位:" >
		  <span style="color: black">{{dataInfo.projectInfo.organizer_name}}</span>
		</mt-cell>
		<mt-cell title="投资主体:" >
		  <span style="color: black">{{dataInfo.projectInfo.investor_name}}</span>
		</mt-cell>
		<mt-cell title="投资总额（原币）:" >
		  <span style="color: black">{{dataInfo.projectInfo.invest_sum_fkvl}}</span>
		</mt-cell>
		<mt-cell title="我方投资总额（原币）:" >
		  <span style="color: black">{{dataInfo.projectInfo.my_invest_sum_fkvl}}</span>
		</mt-cell>
		<mt-cell title="内部收益率:" >
		  <span style="color: black">{{dataInfo.projectInfo.profit_rate_inner * 100+'%'}}</span>
		  <router-link  :to='{name:"sensitivity",params:{seq_id:dataInfo.projectInfo.seq_id}}'  >
		  	<mt-button v-if="!dataInfo.hasSensitiveData" disabled size="small" type="primary" style="margin-left: 10px;">敏感性测试</mt-button>
		  	<mt-button v-if="dataInfo.hasSensitiveData" size="small" type="primary" style="margin-left: 10px;">敏感性测试</mt-button>
		  </router-link>
		</mt-cell>
		<div class="mint-cell-wrapper">&nbsp;</div>
		<label style="padding: 0 10px;" >附件：</label>
		<div style="padding: 0 10px;" v-for="(v,k ) in dataInfo.projectInfo.projectAttach">
			<div style="text-align: left;padding-top: 5px;">
				<a href="javascript:void(0)" @click="downFile(v.file_path,v.file_name)" >{{v.file_name}}</a>
			</div>
		</div>
		
		
</div>
</template>

<script>
export default {
	name:"detailInfo",
	props:['dataInfo'],
	data(){
		return {
		}
		
	},
	methods:{
		downFile(path,name){
			window.location.href= (ctx+'/buz/doProxyForDownFile?filePath='+path+'&v='+Math.random());
		}
	}
};
	

</script>
