import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Routes from './routes.js'
import {timeAgo, host} from './util/filters.js'


Vue.config.productionTip = false

Vue.use(VueRouter);

Vue.filter('host', host);
Vue.filter('timeAgo', timeAgo);

const router = new VueRouter({
  mode: 'history',
  routes: Routes
})

new Vue({
  el: "#app",
  router: router,
  render: h => h(App)
})
