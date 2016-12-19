<template>
<div>
  <p>{{msg}}</p>
  <ul class="route-list">
    <li><router-link to="/user/foo">first link</router-link></li>
    <li> <router-link to="/user/foo/one">two link</router-link></li>
    <li> <router-link to="/user/foo/two">three link</router-link></li>
    <!-- <li><router-link :to="{{name: 'userName'}}">userName</router-link></li> -->
    </ul>
    <transition><router-view ></router-view> </transition>
</div>
</template>
<style>
.slide-fade-enter-active {
  transition: all .8s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-active {
  transform: translateX(100%);
  opacity: 0;
}

</style>
<script>
// import firstcomponent from './components/FirstComponent'
// import secondcomponent from './components/SecondComponent'
export default {
  data () {
    return {
      msg: 'author: xiaohuan',
      show: true
    }
  }
  // components: {firstcomponent, secondcomponent}
}

</script>