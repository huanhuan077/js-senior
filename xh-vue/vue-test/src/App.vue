<template>
<div>
  <p>{{msg}}</p>
  <ul class="route-list">
    <li><router-link to="/user/foo">first link</router-link></li>
    <li> <router-link to="/user/foo/one">two link</router-link></li>
    <li> <router-link to="/user/foo/two">three link</router-link></li>
    </ul>
    <router-view></router-view> 
</div>
</template>

<script>
import firstcomponent from './components/FirstComponent'
import secondcomponent from './components/SecondComponent'
export default {
  data () {
    return {
      msg: 'author: xiaohuan'
    }
  },
  components: {firstcomponent, secondcomponent}
}

</script>