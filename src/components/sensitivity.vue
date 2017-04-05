<template>
  <div >
  		<div  class="list-wrapper">
	    	<div class="wrapper"  @click="show1=!show1">* 敏感因于一<span v-if="show1" style="float:right; margin-right: 20px;margin-top: 8px" >∨</span><span v-if="!show1" style="float:right; margin-right: 20px;margin-top: 10px" >∧</span></div>
		    <transition name="fade" >
						<div v-show="show1" >
					    <mt-radio
							  v-model="value1"
							  align="right"
							  class="page-part"
							  :options="['单位业务收入', '单位业务成本', '业务量', '投资总额']">
							</mt-radio>
			  		</div>
			  </transition>
		  </div>
		  <div  class="list-wrapper">
			<div class="wrapper"  @click="show2=!show2">* 敏感因于二<span v-if="show2" style="float:right; margin-right: 20px;margin-top: 8px" >∨</span><span v-if="!show2" style="float:right; margin-right: 20px;margin-top: 10px" >∧</span></div>
			<transition name="fade">
					<div v-show="show2" >
						<mt-radio
							align="right"
							class="page-part"
						  v-model="value2"
						  :options="['单位业务收入', '单位业务成本', '业务量', '投资总额']">
						</mt-radio>
					</div>
		  </transition>
		  </div>
			<mt-button style="margin-bottom: 20px;" @click="queryData" size="large" type="primary" >查 询</mt-button>
			<div  v-show="dataInfo.sensitivity_factor1" >
				<div  class="list-wrapper">
				<div class="wrapper "  @click="show3=!show3">敏感性分析表<span v-if="show3" style="float:right; margin-right: 20px;margin-top: 8px" >∨</span><span v-if="!show3" style="float:right; margin-right: 20px;margin-top: 10px" >∧</span></div>
				<transition name="fade" >
					<div v-show="show3" >
				<div style="margin-bottom:30px;width:100%;float:left;overflow-x:scroll;overflow-y:hidden">
						<table id="tb1" cellspacing="0"  border="0">
							 	<tr text-valign="middle" text-align="center">
									<th colspan="2" rowspan="2" text-align="center" text-valign="middle"></th>
									<th colspan="5" text-align="center" text-valign="middle">{{dataInfo.sensitivity_factor2}}</th>
								</tr>
								<tr text-valign="middle" text-align="center">
									<th text-align="center" text-valign="middle">-20%</th>
									<th text-align="center" text-valign="middle">-10%</th>
									<th text-align="center" text-valign="middle">0%</th>
									<th text-align="center" text-valign="middle">10%</th>
									<th text-align="center" text-valign="middle">20%</th>
								</tr>
								<tr text-valign="middle" text-align="center">
									<th width="25" rowspan="5" style="width:28dp" text-align="center" text-valign="middle">{{dataInfo.sensitivity_factor1}}</th>
									<th text-align="center" text-valign="middle">-20%</th>
									<td text-align="center" text-valign="middle">{{(Math.round((Number(arrNew[0]))*1000)/1000*100).toFixed(1)+"%"}}</td>
									<td text-align="center" text-valign="middle">{{(Math.round((Number(arrNew[1]))*1000)/1000*100).toFixed(1)+"%"}}</td>
									<td text-align="center" text-valign="middle">{{(Math.round((Number(arrNew[2]))*1000)/1000*100).toFixed(1)+"%"}}</td>
									<td text-align="center" text-valign="middle">{{(Math.round((Number(arrNew[3]))*1000)/1000*100).toFixed(1)+"%"}}</td>
									<td text-align="center" text-valign="middle">{{(Math.round((Number(arrNew[4]))*1000)/1000*100).toFixed(1)+"%"}}</td>
								</tr>
								<tr text-valign="middle" text-align="center">
									<th text-align="center" text-valign="middle">-10%</th>
									<td text-align="center" text-valign="middle">{{(Math.round((Number(arrNew[5]))*1000)/1000*100).toFixed(1)+"%"}}</td>
									<td text-align="center" text-valign="middle">{{(Math.round((Number(arrNew[6]))*1000)/1000*100).toFixed(1)+"%"}}</td>
									<td text-align="center" text-valign="middle">{{(Math.round((Number(arrNew[7]))*1000)/1000*100).toFixed(1)+"%"}}</td>
									<td text-align="center" text-valign="middle">{{(Math.round((Number(arrNew[8]))*1000)/1000*100).toFixed(1)+"%"}}</td>
									<td text-align="center" text-valign="middle">{{(Math.round((Number(arrNew[9]))*1000)/1000*100).toFixed(1)+"%"}}</td>
								</tr>
								<tr text-valign="middle" text-align="center">
									<th text-align="center" text-valign="middle">0%</th>
									<td text-align="center" text-valign="middle">{{(Math.round((Number(arrNew[10]))*1000)/1000*100).toFixed(1)+"%"}}</td>
									<td text-align="center" text-valign="middle">{{(Math.round((Number(arrNew[11]))*1000)/1000*100).toFixed(1)+"%"}}</td>
									<td text-align="center" text-valign="middle">{{(Math.round((Number(arrNew[12]))*1000)/1000*100).toFixed(1)+"%"}}</td>
									<td text-align="center" text-valign="middle">{{(Math.round((Number(arrNew[13]))*1000)/1000*100).toFixed(1)+"%"}}</td>
									<td text-align="center" text-valign="middle">{{(Math.round((Number(arrNew[14]))*1000)/1000*100).toFixed(1)+"%"}}</td>
								</tr>
								<tr text-valign="middle" text-align="center">
									<th text-align="center" text-valign="middle">10%</th>
									<td text-align="center" text-valign="middle">{{(Math.round((Number(arrNew[15]))*1000)/1000*100).toFixed(1)+"%"}}</td>
									<td text-align="center" text-valign="middle">{{(Math.round((Number(arrNew[16]))*1000)/1000*100).toFixed(1)+"%"}}</td>
									<td text-align="center" text-valign="middle">{{(Math.round((Number(arrNew[17]))*1000)/1000*100).toFixed(1)+"%"}}</td>
									<td text-align="center" text-valign="middle">{{(Math.round((Number(arrNew[18]))*1000)/1000*100).toFixed(1)+"%"}}</td>
									<td text-align="center" text-valign="middle">{{(Math.round((Number(arrNew[19]))*1000)/1000*100).toFixed(1)+"%"}}</td>
								</tr>
								<tr text-valign="middle" text-align="center">
									<th text-align="center" text-valign="middle">20%</th>
									<td text-align="center" text-valign="middle">{{(Math.round((Number(arrNew[20]))*1000)/1000*100).toFixed(1)+"%"}}</td>
									<td text-align="center" text-valign="middle">{{(Math.round((Number(arrNew[21]))*1000)/1000*100).toFixed(1)+"%"}}</td>
									<td text-align="center" text-valign="middle">{{(Math.round((Number(arrNew[22]))*1000)/1000*100).toFixed(1)+"%"}}</td>
									<td text-align="center" text-valign="middle">{{(Math.round((Number(arrNew[23]))*1000)/1000*100).toFixed(1)+"%"}}</td>
									<td text-align="center" text-valign="middle">{{(Math.round((Number(arrNew[24]))*1000)/1000*100).toFixed(1)+"%"}}</td>
								</tr>
						</table>
				</div>
				</div>
		  </transition>
			</div></div>
  </div>
</template>
<style>
.page-part .mint-radio-core::after{
    top: 6px;
    left: 6px;
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
		border: 1px solid #dfe6ec;
		
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
import { Toast } from 'mint-ui';
  export default {
  	data(){
  			return {
  				addr:"ws/CommitteeAudit",
  				value1:null,
  				value2:null,
  				show1:true,
  				show2:true,
  				show3:true,
  				dataInfo:{},
  				arrNew:[]
  			}
  	},
    methods: {
    		//锚点
    		goMD(id){
    			var obj = document.getElementById(id);
				  var oPos = obj.offsetTop;
				  return window.scrollTo(0, oPos-36);
    		},
	      queryData(){
	      		if(!this.value1 || !this.value2){
	      			let instance = Toast({
							  message: "请选择2个敏感因"
							});
							setTimeout(() => {
							  instance.close();
							}, 1500);
	      			
	      			return;
	      		}
					  if(this.value1==this.value2){
							let instance = Toast({
							  message: "2个敏感因不可相同"
							});
							setTimeout(() => {
							  instance.close();
							}, 1500);
					  	return;
					  }
					  
	      		let soap = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservice.service.cmhit.com/">
											   <soapenv:Header/>
											   <soapenv:Body>
											      <web:getSensitivity>
											         <projectId>`+this.seqId+`</projectId>
											         <factors>`+this.value1+`</factors>
													 <factors>`+this.value2+`</factors>    
											      </web:getSensitivity>
											   </soapenv:Body>
											</soapenv:Envelope>`;
	       		this.$http.get(ctx+'/buz/doProxy?addr='+this.addr+'&soap='+soap+'&v='+Math.random())
				  	.then(function(resp){
				  			this.dataInfo = (resp.data);
				  			this.arrNew = this.dataInfo.sensitivity_irrs.split(",");
				  			//锚点
				  			setTimeout(()=>{
						  			this.goMD("tb1");
						  	},1);
				  	})
				  	
	      }
    },created(){
    	this.seqId = this.$route.params.seq_id;
    	//this.queryData(this.seqId,'单位业务收入', '业务量');
    	this.$emit("changeView","敏感性测试");
    	
    }
  };
</script>

 