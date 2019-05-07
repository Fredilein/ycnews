<template>
  <li class="list-group-item news-item">
    <span class="score">{{ score }}</span>
    <span class="title">
      <a :href="url" target="_blank" rel="noopener">{{ title }}</a>
    </span>
    <br>
    <span class="meta">
      <div v-if="url">
        {{ time | timeAgo }} ago | {{ url | host }}
      </div>
      <div v-else>
        {{ time | timeAgo }} ago
      </div>
    </span>
  </li>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';

Vue.filter('host', function (url) {
  const url_trim = url
    ? url
      .split('/')
      .slice(1, 3)
      .join('')
    : '';
  return url_trim;
})

Vue.filter('timeAgo', function (time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
})

function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export default {
  name: 'Article',
  props: {
    id: Number
  },
  data () {
    return {
      score: 0,
      title: "loading...",
      url:   "",
      time:  null
    }
  },
  mounted () {
    let url = 'https://hacker-news.firebaseio.com/v0/item/' + this.id + '.json';
    axios
      .get(url)
      .then(res => {
        console.log(res);
        this.score = res.data.score;
        this.title = res.data.title;
        this.url   = res.data.url;
        this.time  = res.data.time;
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">

@import '../assets/App.styl'

.news-item
  position relative
  padding-left 80px
  linehight 20px
  border-color #888
  .score
    color accent
    font-size 1.1em
    position absolute
    top 50%
    left 0
    width 80px
    text-align center
    margin-top -10px
  .title
    a
      text-decoration none
  .meta
    font-size .85em
</style>
