import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import app from './App'
import secondcomponent from './components/SecondComponent'

/* eslint-disable no-new */
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.config.debug = true

const User = {
  template: `
  <div>
  User {{$route.params.id}}
  <router-view></router-view>
  </div>
  `
}

const Bar = {
  template: '<div>bar</div>'
}
const Foo = {
  template: '<div>I am Foo</div>'
}
const ChildFirst = {template: '<div>I am child-first!</div>'}

const routes = [{
  path: '/user/:id',
  component: User,
  children: [
    {
      path: '', component: Foo
    },
    {
      path: 'one', component: Bar
    },

    {
      path: 'two',
      component: secondcomponent,
      children: [
        {
          path: 'child-first',
          component: ChildFirst
        },
        {
          path: 'child-second',
          component: Foo
        }
      ]
    }
  ]
}]
const router = new VueRouter({
  routes: routes
})

new Vue({
  router: router,
  render: h => h(app)
}

).$mount('#app')
