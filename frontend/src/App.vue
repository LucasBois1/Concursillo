<script setup>
  import 'animate.css';

  import {
    RouterLink,
    RouterView
  } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<script>
  export default {
    data() {
      return {
        "modal": false
			}
		},
    mounted() {
    }
  }
</script>