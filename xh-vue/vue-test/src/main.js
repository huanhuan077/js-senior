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
  data () {
    return {
      transitionName: 'slide-left'
    }
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  },
  template: `
  <div>
  User {{$route.params.id}}
  <transition :name= "transitionName"><router-view></router-view></transition>
  </div>
  `
}

const Bar = {
  template: '<transition><div>bar</div></transition>'
}
const Foo = {
  template: '<div>I am Foo</div>'
}
const ChildFirst = {template: '<div>I am child-first!</div>'}
// const Name = {template: '<div>I am name router!</div>'}

const routes = [{
  path: '/user/:id',
  component: User,
  children: [
    {
      path: '', component: Foo
    },
    {
      path: 'one',
      component: Bar
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
}
  // {
  //   path: '/name',
  //   component: Name,
  //   name: 'userName'
  // }
]
const router = new VueRouter({
  routes: routes
})

new Vue({
  router: router,
  render: h => h(app)
}

).$mount('#app')
