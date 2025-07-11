<template>
  <div class="w-20 h-60 bg-white rounded-3xl shadow-lg flex flex-col items-center py-6 space-y-8 z-20 mt-10">
   
    <nav class="flex flex-col space-y-4">
   
            
      <RouterLink
        to="/maindashboard/plan"
        active-class="bg-teal-600 text-white"
        class="w-10 h-10 rounded-lg flex items-center justify-center transition-colors text-gray-400 hover:text-teal-600"
        title="Trip Plan"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
          <path fill-rule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3h4v1a1 1 0 102 0V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"/>
        </svg>
      </RouterLink>
            
      <RouterLink
        to="/maindashboard/flight"
        active-class="bg-teal-600 text-white"
        class="w-10 h-10 rounded-lg flex items-center justify-center transition-colors text-gray-400 hover:text-teal-600"
        title="Flights"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
        </svg>
      </RouterLink>

      <RouterLink
        to="/maindashboard/hotel"
        active-class="bg-teal-600 text-white"
        class="w-10 h-10 rounded-lg flex items-center justify-center transition-colors text-gray-400 hover:text-teal-600"
        title="Hotels / Stay"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a2 2 0 00-2 2v2H4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-4V4a2 2 0 00-2-2zM4 8h12v8H4V8zm6-2h-2V4h2v2z"/>
        </svg>
      </RouterLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { defineProps } from 'vue';

const props = defineProps({
  currentView: {
    type: String,
    required: true,
  }
});

const route = useRoute();

</script>