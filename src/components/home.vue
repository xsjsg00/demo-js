<template>
	<div >
		<div id="list1" class="list-wrapper">
			<div class="wrapper" @click="show1=!show1">新项目<span v-if="show1" style="float:right; margin-right: 20px;margin-top: 8px" >∨</span><span v-if="!show1" style="float:right; margin-right: 20px;margin-top: 10px" >∧</span></div>
			<transition name="fade">
				<div v-show="show1">
				    <mt-cell :to='{name:"detailMain",params:{seq_id:obj.seq_id,type:"undo"}}' v-for="obj in list1.data"  :title="obj.project_name"  :label="'创建人:'+obj.create_user+'   创建时间:'+obj.create_time_str" is-link>
				    </mt-cell>
				    <!--<div style="text-align: center;padding-top:10px;height: 40px;border: #A9ACB1;">更多记录</div>-->
				    <mt-cell v-if="list1.data && list1.data.length==0">无相关记录</mt-cell>
			    </div>
		    </transition>
	    </div>
	    <div id="list2" class="list-wrapper">
		    <div class="wrapper"  @click="show2=!show2">待提综合意见<span v-if="show2" style="float:right; margin-right: 20px;margin-top: 8px" >∨</span><span v-if="!show2" style="float:right; margin-right: 20px;margin-top: 10px" >∧</span></div>
		    <transition name="fade">
				<div v-show="show2">
				    <mt-cell :to='{name:"detailMain",params:{seq_id:obj.seq_id,type:"01"}}' v-for="obj in list2.data" :title="obj.project_name"  :label="'创建人:'+obj.create_user+'   创建时间:'+obj.create_time_str" is-link></mt-cell>
			    	<mt-cell v-if="list2.data && list2.data.length==0">无相关记录</mt-cell>
	    		</div>
		    </transition>
		</div>
	    <div id="list3" class="list-wrapper">
		    <div class="wrapper"  @click="show3=!show3">已提综合意见<span v-if="show3" style="float:right; margin-right: 20px;margin-top: 8px" >∨</span><span v-if="!show3" style="float:right; margin-right: 20px;margin-top: 10px" >∧</span></div>
		    <transition name="fade">
				<div v-show="show3" >
				    <mt-cell :to='{name:"detailMain",params:{seq_id:obj.seq_id,type:"02"}}' v-for="obj in list3.data" :title="obj.project_name"  :label="'创建人:'+obj.create_user+'   创建时间:'+obj.create_time_str" is-link></mt-cell>
			    	<mt-cell v-if="list3.data && list3.data.length==0">无相关记录</mt-cell>
			    </div>
		    </transition>
		</div>
	</div>
</template>
<script >
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
  	let pageNum1 = 1;
	let pageNum2 = 1;
	let pageNum3 = 1;
  export default {
  	name : "home",
    data () {
      return { 		
      				show1:true,
      				show2:true,
      				show3:true,
      				addr : "ws/CommitteeAudit?wsdl",
      				list1:{},
      				list2:{},
      				list3:{}
      };
    },
    methods:{
    		login(){
    			let param = this.$route.params.token;
    			this.$http.get(ctx+'/buz/index?token=' + param)
    			.then((resp)=>{
    				sessionStorage.username = resp.data.username;
    				return true;
    			})
    			
    		},
    		initData() {
    				let param = 'addr='+this.addr+'&soap1='+this.list1.soap ;
    						param += '&soap2='+this.list2.soap ;
    						param += '&soap3='+this.list3.soap ;
		    		this.$http.get(ctx+'/buz/doProxyForMain?' + param)
				  	.then((resp) => {
				  		try{
				  			this.list1.data = (JSON.parse(resp.data.list1).results.list);
				  		}catch(e){ this.list1.data = [] ; }
				  		try{
				  			this.list2.data = (JSON.parse(resp.data.list2).results.list);
				  		}catch(e){ this.list2.data = [] ; }
				  		try{
				  			this.list3.data = (JSON.parse(resp.data.list3).results.list);
				  		}catch(e){ this.list3.data = [] ; }
				  		//关闭加载中提示
				  		Indicator.close();
				  	}) 
    		},
	    	getList1() {
		    		this.$http.get(ctx+'/buz/doProxy?addr='+this.addr+'&soap='+this.list1.soap+'&v='+Math.random())
				  	.then((resp) => {
				  			this.list1.data = (resp.body.results.list);
				  	}) 
	    	},
	    	getList2() {
			    	this.$http.post(ctx+'/buz/doProxy?addr='+this.addr+'&soap='+this.list2.soap+'&v='+Math.random())
				  	.then((resp) => {
				  			this.list2.data = (resp.body.results.list);
				  	}) 
		  	},
		  	getList3() {
				  	this.$http.get(ctx+'/buz/doProxy?addr='+this.addr+'&soap='+this.list3.soap+'&v='+Math.random())
				  	.then((resp) => {
				  			this.list3.data = (resp.body.results.list);
				  	}) 
		  	}
    },
    created() {
    		//开启加载中提示
			Indicator.open({
				  text: '加载中...',
				  spinnerType: 'fading-circle'
			});
			if(!sessionStorage.username){
				this.login();
			}
			
			let inter = setInterval(()=>{
				
				if(sessionStorage.username){
					this.list1= {soap : `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservice.service.cmhit.com/">
										   <soapenv:Header/>
										   <soapenv:Body>
										      <web:getProjectsForCommittee>
										         <userId>`+sessionStorage.username+`</userId>
										         <optionType>option_undo</optionType>
										         <pageNo>`+pageNum1+`</pageNo>
										      </web:getProjectsForCommittee>
										   </soapenv:Body>
									</soapenv:Envelope>`,
										  data : []
									};
					this.list2 = {soap : `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservice.service.cmhit.com/">
											   <soapenv:Header/>
											   <soapenv:Body>
											      <web:getProjectsForCommittee>
											         <userId>`+sessionStorage.username+`</userId>
											         <optionType>option_01</optionType>
											         <pageNo>`+pageNum2+`</pageNo>
											      </web:getProjectsForCommittee>
											   </soapenv:Body>
											</soapenv:Envelope>	`,
											  data : []
									};
					this.list3 = {soap : `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservice.service.cmhit.com/">
										   <soapenv:Header/>
										   <soapenv:Body>
										      <web:getProjectsForCommittee>
										         <userId>`+sessionStorage.username+`</userId>
										         <optionType>option_02</optionType>
										         <pageNo>`+pageNum3+`</pageNo>
										      </web:getProjectsForCommittee>
										   </soapenv:Body>
										</soapenv:Envelope>	`,
											  data : []
											  
								};
					this.initData();
					
					clearInterval(inter);
					
				}
			},300);
			this.$emit("changeView","首页");
    },mounted(){
    }
    
  };
</script>