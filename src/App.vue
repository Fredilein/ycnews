<template>
  <div :class="store.state.theme">
    <div id="app" class="app container">

      <h1><a v-on:click="store.toggleTheme()"><i class="fab fa-hacker-news-square"></i></a></h1>

      <!-- <Articles /> -->
      <router-view></router-view>

      <span class="footer theme-footer">
        <a v-on:click="changeRememberTheme()" data-toggle="tooltip" data-placement="bottom" title="Remember Theme: Always dark, always light or dependent on time">
          <div v-if="rememberTheme == 'time'">
            <i class="themeicon far fa-clock"></i>
          </div>
          <div v-else-if="rememberTheme == 'light'">
            <i class="themeicon far fa-lightbulb"></i>
          </div>
          <div v-else-if="rememberTheme == 'dark'">
            <i class="themeicon far fa-moon"></i>
          </div>
        </a>
      </span>

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
      store: store,
      rememberTheme: null
    }
  },
  components: {
    Articles,
    Comments
  },
  mounted () {
    let r = localStorage.getItem("ycnews-theme")
    if (r) {
      this.rememberTheme = r;
    }
    else {
      console.log("not remembering theme on mounted...");
      this.rememberTheme = "light";
    }
  },
  methods: {
    changeRememberTheme() {
      let t = this.rememberTheme;
      if (t == "time") {
        localStorage.setItem("ycnews-theme", "light");
      } else if (t == "light") {
        localStorage.setItem("ycnews-theme", "dark");
      } else if (t == "dark") {
        localStorage.setItem("ycnews-theme", "time");
      } else {
        consloe.log("couldnt remember theme...");
        localStorage.setItem("ycnews-theme", "time");
      }
      store.updateTheme();
      this.rememberTheme = localStorage.getItem("ycnews-theme");
    }
  }
}
</script>



<style lang="stylus">

@import './assets/App.styl'

.app 
  font-family 'Nunito', sans-serif
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
  margin-left -30px
  
  .far
    margin 8px

  a
    text-decoration none


.theme-footer
  font-size 0.8em
  display block
  margin-top 40px
  margin-bottom -10px
  text-align center
  margin-left 0px

  .themeicon
    margin-left 0px

    
</style>
