<template>
  <div id="app">
    <v-header :merchants="merchants"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/merchants">商家</router-link>
      </div>
    </div>
    <router-view :merchants="merchants" :ratings="ratings"></router-view>
  </div>
</template>

<script>
  import Header from './components/Header/Header.vue';
  import Goods from './components/Goods/Goods.vue';

  const ERR_OK = 0;

  export default {
    data () {
      return {
        merchants: {},
        ratings: []
      };
    },
    created () {
      this.$http.get('/api/merchants').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.merchants = response.data;
        }
      });
    },
    components: {
      'v-header': Header,
      Goods
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"
  #app
    min-width: 320px
    max-widht: 1024px
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(rgba(7, 17, 27, 0.1))
      .tab-item
        flex: 1
        text-align: center
        & > a
          display: block
          font-size: 14px
          color: rgb(77, 85, 93)
          &.active
            color: rgb(240, 20, 20)
</style>
