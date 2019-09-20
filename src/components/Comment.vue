<template>
  <div>
    
    <section v-if="errored">
      <li class="list-group-item comment-item">
        <span class="text">Error.</span>
      </li>
    </section>

    <section v-else-if="hidden">
      <li class="list-group-item comment-item">
        <span class="meta">
          <a v-on:click="toggleHideComment()"><i class="far fa-plus-square"></i></a> {{ time | timeAgo }} ago | by <i>{{ by }}</i>
        </span>
      </li>
    </section>

    <section v-else>
      <li class="list-group-item comment-item">
        <span class="meta">
          <a v-on:click="toggleHideComment()"><i class="far fa-minus-square"></i></a> {{ time | timeAgo }} ago | by <i>{{ by }}</i>
        </span>
        <br>
        <span class="text" v-html="text"></span>
      </li>
      
      <section v-if="kids.length > 0">
        <li class="list-group-item comment-item">
          <ul class="listgroup list-group-flush kids">
            <Comment v-for="id in kids" v-bind:id="id" v-bind:key="id" />
          </ul>
        </li>
      </section>
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
  methods: {
    toggleHideComment() {
      this.hidden = !this.hidden;
    }
  },
  data () {
    return {
      text: "loading...",
      by: "",
      time:  null,
      kids: [],
      errored: false,
      hidden: false
    }
  },
  mounted () {

    let url = 'https://hacker-news.firebaseio.com/v0/item/' + this.id + '.json';
    axios
      .get(url)
      .then(res => {
        // console.log(res);
        this.text = res.data.text;
        this.by   = res.data.by;
        this.time  = res.data.time;
        if (res.data.kids) {
          this.kids = res.data.kids;
        }
      })
      .catch(_ => {
        // console.log(err)
        this.errored = true;
      })
  }
}
</script>



<style lang="stylus">

@import '../assets/App.styl'

.comment-item
  position relative
  padding-right 0
  padding-top 10px
  padding-bottom 10px

  .meta
    font-size .85em

  .text
    line-height 1.6
    a
      font-style italic

</style>
