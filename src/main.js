import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Routes from './routes.js'


Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
// }).$mount('#app')

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: Routes
})

new Vue({
  el: "#app",
  router: router,
  render: h => h(App)
})
