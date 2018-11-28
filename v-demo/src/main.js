import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from './compontents/Home.vue';
import Header from './compontents/Header.vue';
import Footer from './compontents/Footer.vue';
import New from './compontents/New.vue';
    import NewContent from './compontents/new/NewContent.vue';
    import NewOnce from './compontents/new/NewOnce.vue';

const routes = [
  {path:'/home',component:Home},
  {path:'/header',component:Header},
  {path:'/footer',component:Footer},
  {path:'/new',component:New,
    children:[
      {path:'newcontent',component:NewContent},
      {path:'newonce',component:NewOnce}
    ]
}]

const router = new VueRouter({
  routes
}) 

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
