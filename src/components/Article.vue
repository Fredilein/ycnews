<template>
  <li class="list-group-item news-item">
    <span class="score">{{ score }}</span>
    <span class="title">
      <a :href="url" target="_blank" rel="noopener">{{ title }}</a>
    </span>
    <br>
    <span class="meta">
      <div v-if="url">
        <div v-if="ncomments > 0">
          {{ time | timeAgo }} ago | <i>{{ url | host }}</i> | <a v-on:click="goToComments(id)" href="#">{{ ncomments }} <i class="far fa-comments fa-sm"></i></a>
        </div>
        <div v-else>
          {{ time | timeAgo }} ago | <i>{{ url | host }}</i>
        </div>
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
import {host, timeAgo} from '../util/filters.js';

export default {
  name: 'Article',
  props: {
    id: Number
  },
  methods: {
    goToComments(id) {
      this.$router.push({name: 'comments', params: {Aid:id}})
    }
  },
  data () {
    return {
      score: 0,
      title: "loading...",
      url:   "",
      time:  null,
      ncomments: 0
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
        this.ncomments = res.data.kids.length;
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>



<style lang="stylus">

@import '../assets/App.styl'

.news-item
  position relative
  padding-left 80px
  linehight 20px

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
    a
      text-decoration none

</style>
