<template>
  <div>
    <h1>Comments...</h1>
    <h2>Aid: {{this.$route.params.Aid}}</h2>

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

</style>
