<template>
  <li class="list-group-item comment-item">
    <!-- <span class="text">{{ text }}</span> -->
    <span class="text" v-html="text"></span>
    <br>
    <span class="meta">
      {{ time | timeAgo }} ago | by <i>{{ by }}</i>
    </span>
  </li>
</template>



<script>
import axios from 'axios';
import timeAgo from '../util/filters.js';

export default {
  name: 'Comment',
  props: {
    id: Number
  },
  data () {
    return {
      text: "loading...",
      by: "",
      time:  null,
      needBr: false
    }
  },
  mounted () {

    let url = 'https://hacker-news.firebaseio.com/v0/item/' + this.id + '.json';
    axios
      .get(url)
      .then(res => {
        console.log(res);
        this.text = res.data.text;
        this.by   = res.data.by;
        this.time  = res.data.time;
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>



<style lang="stylus">

@import '../assets/App.styl'

.comment-item
  position relative

  .meta
    font-size .85em

  .text
    line-height 1.6
    a
      font-style italic


</style>
