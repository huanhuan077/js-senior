<template>
	<div id="secondcomponent">
    <h1>I am another page</h1>
    <a> written by {{ author }} </a>
    <p> 感谢 <a href="https://github.com/showonne">showonne</a>大神的技术指导</p>
    <ul>
    <li><router-link to="/user/foo/two/child-first">child-first</router-link></li>
      <li><router-link to="/user/foo/two/child-second">child-second</router-link></li>
    </ul>
    <router-view></router-view> 
  </div>
</template>

<script>
export default {
  data () {
    return {
      author: '微信公众号 jinkey-love',
      articles: []
    }
  }
}
</script>