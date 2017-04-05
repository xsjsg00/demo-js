<template>
<div>
			
    		<div v-if="this.$route.params.type=='undo'" id="mscysyj" class="list-wrapper">
			    <div class="wrapper"  @click="show1=!show1">秘书处预审意见<span v-if="show1" style="float:right; margin-right: 20px;margin-top: 8px" >∨</span><span v-if="!show1" style="float:right; margin-right: 20px;margin-top: 10px" >∧</span></div>
			    <transition name="fade">
					<div v-show="show1" >
				<!--秘书处预审意见附件列表-->
						<mt-cell  >
							<div  v-for="(v,k ) in sugInfo.secIniAttachList">
								<a href="javascript:void(0)" @click="downFile(v.file_path,v.file_name)" >{{v.file_name}}</a>
							</div>
							<div  v-if="sugInfo.secIniAttachList && sugInfo.secIniAttachList.length==0">
								无相关附件
							</div>
						    <!--<span style="color: dodgerblue">这里是元素</span>-->
						</mt-cell>
					
					</div>
				</transition>
			</div>
			<!-- 委员个人审核意见 -->
			<div v-if="this.$route.params.type=='undo'" id="person_option_01" class="list-wrapper">
			    <div class="wrapper"  @click="show2=!show2">委员个人审核意见<span v-if="show2" style="float:right; margin-right: 20px;margin-top: 8px" >∨</span><span v-if="!show2" style="float:right; margin-right: 20px;margin-top: 10px" >∧</span></div>
			    <transition name="fade">
					<div v-show="show2" >
						<mt-radio
					      align="right"
					      class="page-part"
					      v-model="personsuggest"
					      :options="options1" >
					    </mt-radio>
						<div id="persontextarea"><mt-field label="备注" v-model="remarkOne" placeholder="请输入备注" type="textarea" rows="4"></mt-field></div>
						<!-- 委员个人意见附件列表-->
						<div id="files3">	
							<mt-cell  >
								<div v-if="sugInfo.personObj!=null">
									<div  v-for="(v,k ) in sugInfo.personObj.personOptionAttachList">
										<a href="javascript:void(0)"  @click="downFile(v.file_path,v.file_name)" >{{v.file_name}}</a>
									</div>
								</div>
								<div  v-if="sugInfo.personObj==null">
									无相关附件
								</div>
							</mt-cell>
						</div>
						<br/>
					</div>
				</transition>
			</div>
			
			<!-- 投审会审核意见初稿 -->
			<div v-if="this.$route.params.type!='undo'" id="tsh_option_01" class="list-wrapper">
			    <div class="wrapper"  @click="show3=!show3">投审会审核意见初稿<span v-if="show3" style="float:right; margin-right: 20px;margin-top: 8px" >∨</span><span v-if="!show3" style="float:right; margin-right: 20px;margin-top: 10px" >∧</span></div>
			    <transition name="fade">
					<div v-show="show3" >
						<div id="tshIniOpinion">
							<font class="label-left">意见初稿：</font>
							<font class="label-right">{{(sugInfo.tshIniOption?sugInfo.tshIniOption.init_view_sec:"")}}</font>
						</div>
						<!-- 投审会审核意见初稿附件列表-->
						<div id="files2">		
							<mt-cell  v-if="sugInfo.tshIniOption">
									<a href="javascript:void(0)" v-for="(v,k ) in sugInfo.tshIniOption.tshIniAttachList"  @click="downFile(v.file_path,v.file_name)" >{{v.file_name}}</a>
								<div  v-if="sugInfo.tshIniOption.tshIniAttachList.length==0">
									无相关附件
								</div>
							</mt-cell>
							
						</div>
					</div>
				</transition>
			</div>
			
			<!-- 委员综合意见 -->
			<div v-if="this.$route.params.type!='undo'" id="person_option_02" class="list-wrapper">
			    <div class="wrapper"  @click="show4=!show4">对投审会审核意见的意见<span v-if="show4" style="float:right; margin-right: 20px;margin-top: 8px" >∨</span><span v-if="!show4" style="float:right; margin-right: 20px;margin-top: 10px" >∧</span></div>
			    <transition name="fade">
					<div v-show="show4" >
						<mt-radio
					      align="right"
					      class="page-part"
					      v-model="comselect"
					      :options="options2">
					    </mt-radio>
						
	
	
						<div id="personComtextarea"><mt-field label="备注" v-model="comtextarea" placeholder="请输入备注" type="textarea" rows="4"></mt-field></div>
						<!-- 委员综合意见附件列表-->
							<mt-cell  v-if="sugInfo.personComOption">
							  	<div  v-for="(v,k ) in sugInfo.personComOption.attachList">
									<a href="javascript:void(0)"  @click="downFile(v.file_path,v.file_name)" >{{v.file_name}}</a>
								</div>
								<div  v-if="sugInfo.personComOption.attachList.length==0">
									无相关附件
								</div>
							</mt-cell>
						<br/>
					</div>
				</transition>
			</div>
			<mt-button size="large" @click="saveSug" type="primary">保存</mt-button><br/><br/>
</div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
	name:"dealSug",
	data() {
	    return {
	    	show1:true,
	    	show2:true,
	    	show3:true,
	    	show4:true,
	      	personsuggest: '',	//个人意见 
	      	comselect: '',       //综合意见
	      	remarkOne:'',
	      	comtextarea:''
	    };
	},
	props:['sugInfo'],
	methods:{
		downFile(path,name){
			window.location.href= (ctx+'/buz/doProxyForDownFile?filePath='+path+'&v='+Math.random());
		},
		saveSug(){
			let self = this;
			let username = sessionStorage.username;
			let seqId = this.sugInfo.projectInfo.seq_id;
			let optionType = "01"; 
			let viewOne = this.personsuggest;
			let remarkOne = this.remarkOne;
			let addr = 'ws/CommitteeAudit';
			//个人意见disabled 就保存综合意见
			if(this.$route.params.type!='undo'){
				optionType = "02";
				viewOne = this.comselect;
				remarkOne = this.comtextarea;
			}
			let soap = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservice.service.cmhit.com/">
						   <soapenv:Header/>
						   <soapenv:Body>
						      	<web:saveOptionOfCommittee>
							         <saveType>save</saveType>
							         <userId>`+username+`</userId>
							         <seqId>`+seqId+`</seqId>
							         <optionType>`+optionType+`</optionType>
							         <viewOne>`+viewOne+`</viewOne>
							         <remarkOne>`+remarkOne+`</remarkOne>
								</web:saveOptionOfCommittee>
						   </soapenv:Body>
						</soapenv:Envelope>`;
			this.$http.get(ctx+'/buz/doProxy?addr='+addr+'&soap='+soap+'&v='+Math.random())
		  	.then(function(resp){
		  		let instance = Toast({
				  message: resp.body.msg,
				  iconClass: (resp.body.success==true?'mintui mintui-success':'error')
				});
				self.$router.push('/home');	// 跳回首页
				setTimeout(() => {
				  	instance.close();
    				
				}, 2000);
		  	}) 
		}
	},
	created(){
		this.options1 = this.options2 = [
	      {
	        label: '同意',
	        value: '01'
	      },
	      {
	        label: '拟同意',
	        value: '02'
	      },
	      {
	        label: '反对',
	        value: '03'
	      }
	    ];
		
	}
//	  computed: {
//	    filterResult() {
////	      return this.defaultResult.filter(value => new RegExp(this.value, 'i').test(value));
//		  return [{title:"a",value:"b"}];
//	    }
//	  }
};
	

</script>
<style>
.page-part .mint-radio-core::after{
    top: 6px;
    left: 6px;
  }
</style>