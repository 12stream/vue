<template>
  <div id="app"> 
      <div class="nav"> 
        <router-link to="/header" class="top">头部</router-link>
        <router-link to="/footer">底部</router-link>
        <router-link to="/new">新闻</router-link>
      </div>
      <router-view></router-view>
  </div>
</template>

<script>
import style from './css/index.css';

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
