<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Nav from './components/Nav.vue';
</script>

<template>
  <header>


    <div class="wrapper">
<Nav />
      
    </div>
  </header>

  <RouterView />
  
</template>


