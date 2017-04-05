<template>
	<div id="app">
			<mt-header fixed :title="title">
				<div v-if="title!='首页'" :to="backUrl" slot="left">
			    	<mt-button icon="back" @click="goBack">返回</mt-button>
			  	</div>
			</mt-header>
	    <router-view style="padding-top: 40px;padding-bottom:40px;" v-on:changeView="changeView"></router-view>
	</div>
</template>
<style>
	.list-wrapper{
		margin-bottom: 10px;
		width:100%;
		float:left;
		overflow-x:scroll;
		overflow-y:hidden	
	}
	.wrapper{
		background-color: #26a2ff;
		height:40px;
		padding-left: 10px;
		color: white;
	}
	 .wrapper:after {
        display:inline-block;
        width:0;
        height:100%;
        vertical-align:middle;
        content:"";
    }
    .fade-enter-active, .fade-leave-active {
	  transition: opacity .5s
	}
	.fade-enter, .fade-leave-active {
	  opacity: 0
	}
	
</style>
<script type="text/babel">

  export default {
  	name : "app",
    data() {
      return { 
			title:'首页',
			backUrl:'/home/back'
      };
    },
    methods:{
    	changeView(title){ 
    		this.title=title;
    	},
    	goBack(){
    		this.$router.go(-1);
    	}
    },
    mounted() {
    }
  };
</script>
