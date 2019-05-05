<template>
  <li class="list-group-item">{{ id }}</li>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Articles',
  props: {
    id: Number
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
