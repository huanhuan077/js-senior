// import {toast} from './js/util'
export default [
// 商品列表页
  {
    path: '/',
    name: 'list',
    component: require('./views/list/list')
  },
  {
    path: '/list',
    name: 'list',
    component: require('./views/list/list')
  },
  // 某个商品详情页
  {
    path: '/detail/:id',
    name: 'detail',
    component: require('./views/detail/detail')
  },
  // 订单确认页
  // {
  //   path: './order/comfirm',
  //   name: 'orderconfirm',
  //   beforeEnter: function (from, to, next) {
  //     toast('这只是demo演示')
  //   }
  // },
  {
    path: '*',
    name: 'notFound',
    component: require('./views/not_found/not_found')
  }
]
