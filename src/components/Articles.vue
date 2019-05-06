<template>
  <div>
    <section v-if="errored">
      <p>Couldn't load articles...</p>
    </section>

    <section v-else>
      <div v-if="loading">Loading...</div>

      <ul v-else class="listgroup list-group-flush">
        <Article v-for="id in ids" v-bind:id="id" />
      </ul>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import Article from './Article.vue';

export default {
  name: 'Articles',
  components: {
    Article
  },
  data () {
    return {
      ids:     null,
      loading: true,
      errored: false
    }
  },
  mounted () {
    // TODO: Make (aka copy) own API
    axios
      .get('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(res => {
        this.ids = res.data.slice(0, 30);
      })
      .catch(err => {
        console.log(err)
        this.errored = true
      })
      .finally(() => this.loading = false)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">

@import '../assets/App.styl'

.listgroup
  padding 0
</style>
