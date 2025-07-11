<template>
  <div class="bg-blue-100 p-6 rounded-lg shadow-md">
    <h3 class="text-xl font-semibold text-blue-800 mb-4">Flight Details</h3>
    <div v-if="selectedFlight" class="space-y-2">
      <p class="text-gray-700"><strong>Airline:</strong> {{ selectedFlight.airline }}</p>
      <p class="text-gray-700"><strong>Route:</strong> {{ selectedFlight.departureCity }} to {{ selectedFlight.arrivalCity }}</p>
      <p class="text-gray-700"><strong>Date:</strong> {{ selectedFlight.departureDate }}</p>
      <p class="text-gray-700"><strong>Time:</strong> {{ selectedFlight.departureTime }} - {{ selectedFlight.arrivalTime }}</p>
      <p class="text-gray-700"><strong>Passengers:</strong> {{ selectedFlight.passengers }}</p>
      <p class="text-lg font-bold text-blue-700"><strong>Price:</strong> ฿{{ selectedFlight.price.toLocaleString() }}</p>
    </div>
    <div v-else class="text-gray-500">
      No flight selected yet.
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface SelectedFlight {
  id: string;
  airline: string;
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  passengers: number;
}

defineProps<{
  selectedFlight: SelectedFlight | null;
}>();
</script>