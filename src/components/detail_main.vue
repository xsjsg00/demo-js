<template >
<div >
		<mt-navbar v-model="selected">
		  <mt-tab-item id="1"><span style="font-size: 16px;">详细信息</span></mt-tab-item>
		  <mt-tab-item id="2"><span style="font-size: 16px;">审批意见</span></mt-tab-item>
		  <mt-tab-item id="3"><span style="font-size: 16px;">意见汇总</span></mt-tab-item>
		</mt-navbar>
		<!-- tab-container -->
		<mt-tab-container v-model="selected">
		  <mt-tab-container-item id="1">
		    <DetailInfo :dataInfo="dataInfo" style="padding-top: 4px;"/>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="2">
		    <DealSug :sugInfo="dataInfo" style="padding-top: 4px;"/>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="3">
		    <CollectSug :optionsInfo="dataInfo.options" style="padding-top: 4px;"/>
		  </mt-tab-container-item>
		</mt-tab-container>
</div>
</template>

<script type="text/babel">

import DetailInfo from './detail_info'
import DealSug from './deal_sug'
import CollectSug from './collect_sug'

export default {
	name:"detailMain",
	 components:{
	 	DetailInfo,DealSug,CollectSug
	 },
	 data() {
	    return {
	      	selected: '1',
	    	addr : "ws/CommitteeAudit?wsdl",
		    dataInfo : {}
	    };
	 },
	 methods: {
	 	initData(){
	 		let soap = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservice.service.cmhit.com/">
							   <soapenv:Header/>
							   <soapenv:Body>
							      <web:getProjectInfoForCommittee>`;
			soap += `	         <userId>`+sessionStorage.username+`</userId>`;
			soap += `	         <seqId>`+this.$route.params.seq_id+`</seqId>`;
			soap += `		  </web:getProjectInfoForCommittee>
							   </soapenv:Body>
							</soapenv:Envelope>`,
		  	this.$http.get(ctx+'/buz/doProxy?addr='+this.addr+'&soap='+soap+'&v='+Math.random())
		  	.then(function(resp){
		  			this.dataInfo = resp.body;
		  	}) 
	 	}
	 },
	 created(){
	 	this.$emit("changeView","详情");
	 	this.initData();
	 }
};
</script>
