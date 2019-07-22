<template>
  <div :class="store.state.theme">
    <div id="app" class="app container">

      <h1><a v-on:click="store.toggleTheme()"><i class="fab fa-hacker-news-square"></i></a></h1>

      <!-- <Articles /> -->
      <router-view></router-view>

      <span class="footer">
        Made with <a v-on:click="store.toggleComments()"><i class="far fa-keyboard fa-lg"></i></a> by <a href="https://github.com/Fredilein" target="_blank">Adi</a>
      </span>

    </div>
  </div>
</template>



<script>
import Articles from './components/Articles.vue'
import Comments from './components/Comments.vue'
import store from './store.js'

export default {
  name: 'app',
  data () {
    return {
      store: store
    }
  },
  components: {
    Articles,
    Comments
  },
  mounted () {
    // Toggle theme (to dark) at night
    let d =  new Date();
    let h = d.getHours();
    if (h < 7 || h > 15) store.toggleTheme();   // light theme 7 - 15 UTC, 9 - 17 in Zurich
  }

}
</script>



<style lang="stylus">

@import './assets/App.styl'

.app 
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  padding-top 60px
  padding-bottom 20px
  max-width 800px

h1
  text-align center
  margin-bottom 30px
  color accent

.footer
  font-size 0.8em
  display block
  margin-top 30px
  margin-bottom 30px
  text-align center
  
  .far
    margin 8px

  a
    text-decoration none
    
</style>
