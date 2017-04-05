import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
	      path: '/home/:token', name: 'home', component: require('../components/home.vue')
	  },{
	      path: '/detailMain/:seq_id-:type', name: 'detailMain', component: require('../components/detail_main.vue')
	  },{
	      path: '/sensitivity/:seq_id', name: 'sensitivity', component: require('../components/sensitivity.vue')
	  },{
	      path:'/:token',redirect:'/home/:token'
	  }
  ]
})
