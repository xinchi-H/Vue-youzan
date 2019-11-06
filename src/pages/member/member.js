// 1.使用vue-router
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

let routes = [{
  path: '/',
  components: require('./components/member.vue')
}, {
  path: '/address',
  components: require('./components/address.vue'),
  children:[{
    path: '/all',
    components:require('./components/all.vue')
  }]
}]

// 2.创建router实例
let router = new Router({
  routes
})

// 根组件的注入
new Vue({
  el: '#app',
  router
})