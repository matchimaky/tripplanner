<template>
  <div class="mb-8 pl-4">
    <h1 class="text-2xl lg:text-2xl font-bold text-darkblue font-cardo mb-2">
      HELLO, {{ username }}
    </h1>
    <p class="text-xl lg:text-xl text-darkblue font-cardo">
      ARE YOU READY TO GO {{ destination }}!
    </p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  username: {
    type: String,
    required: true,
    default: 'User',
  },
  destination: {
    type: String,
    required: true,
    default: 'Your Destination',
  },
});
</script>