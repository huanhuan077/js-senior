<!-- <template>
  <div class="wrapper">
    <div class="session" v-for="product in productList(doubleElevenProductList)">
    <router-link :to="name: 'detail', params: {id: product.id, product}">
      <ListItem :product="product" class="relative clearfix"></ListItem>
    </router-link> 
    </div>
    <p class="statement">本活动及提供奖品与苹果公司无关</p>
  </div>
</template> -->

<template>
  <div class="wrapper">
    <div class="session">
    <router-link :to="name: 'detail', params: {id: product.id, product}">
      <ListItem  class="relative clearfix"></ListItem>
    </router-link> 
    </div>
    <p class="statement">本活动及提供奖品与苹果公司无关</p>
  </div>
</template>

<script>
  // import {mapGetters} from 'vuex'
  import ListItem from '../../components/list/list_item'
  // import {productList} from '../../js/filters'
  // import {getProductList} from '../../js/localstorage'

  export default {
    data () {
      return {

      }
    },
    // computed: mapGetters({
    //   doubleElevenProductList: 'getDoubleElevenProductList'
    // }),
    components: {
      ListItem
    }
    // mounted () {
    //   this.$store.dispatch('updateDoubleElevenProductList', getProductList())
    //   this.$store.dispatch('fetchDoubleElevenProductList')
    // },
    // watch: {

    // },
    // methods: {
    //   productList
    // }
  }

</script>

<style lang="less" scoped>
  @import '../../assets/styles/list/list.less';
  .statement{
    text-align: center;
    font-size: 0.75em;
    padding-bottom: 5px;
    color: #ccc;
  }
</style>