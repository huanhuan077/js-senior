import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import app from './App'
import routerConfig from './router'
// import store from './vuex/index'
// import * as filters from './js/filters'

Vue.use(VueRouter)
Vue.use(VueResource)

// Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

const router = new VueRouter({
  routes: routerConfig, mode: 'history'
})

new Vue({
  router,
  // store,
  render: h => h(app)
}

).$mount('#app')
