<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router/dist/vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Nav from './components/Nav.vue';
</script>

<template>
 <div> 
  <Nav />
    <RouterView />
  </div>
</template>


