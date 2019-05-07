<template>
  <li class="list-group-item comment-item">
    <span class="text">{{ text }}</span>
    <br>
    <span class="meta">
      {{ time }} | {{ by }}
    </span>
  </li>
</template>



<script>
import axios from 'axios';

export default {
  name: 'Comment',
  props: {
    id: Number
  },
  data () {
    return {
      text: "loading...",
      by: "",
      time:  null
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


</style>
