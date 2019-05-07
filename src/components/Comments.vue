<template>
  <div>

    <router-link to="/" class="h1 back"><i class="fas fa-chevron-left fa-xs"></i></router-link>

    <h5 class="title">{{ title }}</h5>

    <section v-if="errored">
      <p>Couldn't load comments</p>
    </section>

    <section v-else>
      <div v-if="loading">Loading...</div>

      <ul v-else class="listgroup list-group-flush">
        <Comment v-for="id in ids" v-bind:id="id" />
      </ul>
    </section>

  </div>
</template>



<script>
import axios from 'axios';
import Comment from './Comment.vue';

export default {
  name: 'Comments',
  components: {
    Comment
  },
  data () {
    return {
      title: "",
      ids: null,
      loading: true,
      errored: false
    }
  },
  mounted () {
    axios
      .get('https://hacker-news.firebaseio.com/v0/item/' + this.$route.params.Aid +'.json')
      .then(res => {
        let n = res.data.kids.length
        this.ids = res.data.kids.slice(0, Math.max(n, 5))
        this.title = res.data.title
      })
      .catch(err => {
        console.log(err)
        this.errored = true
      })
      .finally(() => this.loading = false)
  }
}

</script>



<style lang="stylus">

@import '../assets/App.styl'

.title
  padding .75rem 1.25rem
  text-align center

.back
  padding-left 1.25rem
  margin-top -0.15rem
  position absolute
  top 60px

</style>
