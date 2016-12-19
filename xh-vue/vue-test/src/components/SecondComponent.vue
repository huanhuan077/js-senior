<template>
	<div id="secondcomponent">
    <h1>I am another page</h1>
    <a> written by {{ author }} </a>
    <p> 感谢 <a href="https://github.com/showonne">showonne</a>大神的技术指导</p>
    <ul>
    <li><router-link to="/user/foo/two/child-first">child-first</router-link></li>
      <li><router-link to="/user/foo/two/child-second">child-second</router-link></li>
      <li><button @click="show = !show">click me</button></li>
    </ul>
    <transition name='bounce'><p v-if="show">I am Vue! who are you?</p></transition>
    <transition name="fade"><router-view></router-view></transition>
  </div>
</template>
<style >
li{
  list-style: none;
  margin: 10px;
}
  .bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-out .5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes bounce-out {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(0);
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
<script>
export default {
  data () {
    return {
      author: '微信公众号 jinkey-love',
      articles: [],
      show: true
    }
  }
}
</script>