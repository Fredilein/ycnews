<template>
  <div>
    <li class="list-group-item comment-item">
      <span class="text" v-html="text"></span>
      <br>
      <span class="meta">
        {{ time | timeAgo }} ago | by <i>{{ by }}</i>
      </span>
    </li>

    <section v-if="kids.length > 0">
      <li class="list-group-item comment-item">
        <ul class="listgroup list-group-flush">
          <Comment v-for="id in kids" v-bind:key="id" />
        </ul>
      </li>
    </section>
  </div>
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
      time:  null,
      kids: []
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
        this.kids = res.data.kids;
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

  .kids
    border: 5px solid red;


</style>
