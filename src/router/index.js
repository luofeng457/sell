import Vue from 'vue';
import Router from 'vue-router';
import Goods from '@/components/Goods/Goods.vue';
import Ratings from '@/components/Ratings/Ratings.vue';
import Merchants from '@/components/Merchants/Merchants.vue';

Vue.use(Router);

export default new Router({
  routes: [
  	{
  	  path: '/',
  	  name: '商品',
  	  component: Goods
  	},
    {
      path: '/goods',
      name: '商品',
      component: Goods
    },
    {
    	path: '/ratings',
    	name: '评价',
    	component: Ratings
    },

    {
    	path: '/merchants',
    	name: '商家',
    	component: Merchants
    }
  ],
  linkActiveClass: 'active'
});
