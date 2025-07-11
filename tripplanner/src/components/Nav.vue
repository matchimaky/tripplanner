<template>
  <nav class="fixed top-0 left-0 w-full z-50  text-white font-cardo text-base px-20 py-4 flex justify-between items-center">
    <div class="flex space-x-6">
      <a href="#" class="hover:underline">ABOUT </a>
      <a href="#" class="hover:underline">CONTACT US</a>
    </div>
    <div class="text-white font-bold text-base">   
      <RouterLink to="/home">
          TPH</RouterLink></div>
    <div class="flex space-x-6">
      <template v-if="!isLoggedIn">
        
        <a href="#" class="hover:underline"> <RouterLink to="/login">
         LOG IN</RouterLink></a>
        <a href="#" class="hover:underline"><RouterLink to="/signup">
        SIGH UP</RouterLink></a>
      </template>
      <template v-else>
        <a href="#" class="hover:underline">PROFILE</a>
      </template>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const isLoggedIn = ref(false) // Simulate login state. Replace with actual auth logic.
</script>

<style scoped>
a {
  color: #F1EADF;
}
</style>
