<template>
  <div class="bg-gray-100 rounded-xl shadow-lg p-6 h-full min-h-[280px]">
    <h3 class="text-lg font-semibold text-gray-800 mb-4">Hotel</h3>
    <div v-if="selectedHotel" class="flex flex-col items-center justify-center h-full">
      <p class="text-2xl font-bold text-gray-800 mb-2">{{ selectedHotel.name }}</p>
      <p class="text-gray-600">Price: {{ selectedHotel.price }} THB</p>
    </div>
    <div v-else class="flex flex-col items-center justify-center h-full text-center text-gray-500">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-10a1 1 0 011-1h1a1 1 0 011 1v10m-3-4h3.25" />
      </svg>
      <p>No hotel selected yet.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

// The SelectedHotel interface no longer needs 'pricePerNight' or 'nights'
interface SelectedHotel {
  id: number;
  name: string;
  price: number;
}

const props = defineProps({
  selectedHotel: Object as () => SelectedHotel | null,
});
</script>