<template>
  <div class="max-w-7xl mx-auto p-4">
    <h2 class="text-3xl font-bold mb-4">Hotels in {{ destination }}</h2>
    <p class="text-lg text-gray-600 mb-6">Stay duration: {{ nights }} night{{ nights > 1 ? 's' : '' }}</p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="hotel in hotels" 
        :key="hotel.id" 
        class="bg-gray-50 rounded-xl shadow-lg p-6 flex flex-col justify-between"
      >
        <div>
          <h4 class="text-xl font-semibold text-gray-800">{{ hotel.name }}</h4>
          <p class="text-gray-600 my-2">{{ hotel.description }}</p>
          <div class="text-2xl font-bold text-teal-600 mb-4">{{ hotel.price }} THB</div>
        </div>
        <button 
          @click="selectHotel(hotel)"
          class="mt-4 w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          Select Hotel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { defineProps, defineEmits } from 'vue';

// Define the interfaces for type safety
interface Hotel {
  id: number;
  name: string;
  description: string;
  price: number; // Changed from pricePerNight
}

// Define the props this component expects from the parent
const props = defineProps({
  destination: String,
  startDate: String,
  endDate: String,
});

// Define the event this component will emit
const emit = defineEmits(['select-hotel']);

// Mock hotel data based on the destination (prices are now total costs)
const hotels = ref<Hotel[]>([
  { id: 1, name: 'Chiang Mai Grand Hotel', description: 'A luxurious stay near the old city.', price: 5000 },
  { id: 2, name: 'The Urban Retreat', description: 'Modern design with a rooftop pool.', price: 3600 },
  { id: 3, name: 'Lanna Boutique Inn', description: 'Cozy and traditional Thai-style rooms.', price: 2400 },
]);

// The number of nights is no longer used for calculation but is kept for display
const nights = computed(() => {
  if (!props.startDate || !props.endDate) {
    return 0;
  }
  const start = new Date(props.startDate);
  const end = new Date(props.endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// The method that emits the selected hotel data to the parent
// It now only sends the single price value
const selectHotel = (hotel: Hotel) => {
  emit('select-hotel', hotel);
};
</script>