<template>
  <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Flight Information</h1>
      <p class="text-gray-600">Find and manage your flight bookings and details</p>
    </div>

    <!-- Flight Search Form -->
    <div class="space-y-4 mb-8">
      <div>
        <label for="departure" class="block text-sm font-medium text-gray-700">Departure City</label>
        <input
          type="text"
          id="departure"
          v-model="departureCity"
          placeholder="e.g. Bangkok"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
        />
      </div>
      <div>
        <label for="arrival" class="block text-sm font-medium text-gray-700">Arrival City</label>
        <input
          type="text"
          id="arrival"
          v-model="arrivalCity"
          placeholder="e.g. Chiang Mai"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
        />
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="departureDate" class="block text-sm font-medium text-gray-700">Departure Date</label>
          <input
            type="date"
            id="departureDate"
            v-model="localStartDate"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            :min="new Date().toISOString().split('T')[0]"
          />
        </div>
        <div>
          <label for="passengers" class="block text-sm font-medium text-gray-700">Passengers</label>
          <input
            type="number"
            id="passengers"
            v-model.number="localGroupSize"
            min="1"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
          />
        </div>
      </div>
      <button
        @click="searchFlights"
        :disabled="!departureCity || !arrivalCity || !localStartDate || isSearching"
        class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {{ isSearching ? 'Searching...' : 'Search Flights' }}
      </button>
    </div>

    <!-- Flight Results -->
    <div v-if="flightResults.length > 0">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Available Flights</h2>
      <div class="space-y-4">
        <div
          v-for="flight in flightResults"
          :key="flight.id"
          class="bg-gray-50 p-4 rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center"
        >
          <div class="flex-1 mb-2 md:mb-0">
            <p class="text-lg font-medium text-gray-900">{{ flight.airline }}</p>
            <p class="text-sm text-gray-600">{{ flight.departureTime }} - {{ flight.arrivalTime }}</p>
            <p class="text-sm text-gray-600">{{ flight.departureCity }} to {{ flight.arrivalCity }}</p>
          </div>
          <div class="flex items-center space-x-4">
            <p class="text-xl font-bold text-teal-600">฿{{ flight.price.toLocaleString() }}</p>
            <button
              @click="selectFlight(flight)"
              class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Select
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="!isSearching && searchAttempted" class="text-center text-gray-500 mt-8">
      No flights found for your criteria.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

// Define props received from maindashboard
const props = defineProps<{
  startDate: string;
  endDate: string;
  groupSize: number;
}>();

// Define emits for sending data back to maindashboard
const emit = defineEmits(['select-flight']);

// Local state for form inputs
const departureCity = ref('');
const arrivalCity = ref('');
const localStartDate = ref(props.startDate); // Use local ref to allow editing
const localGroupSize = ref(props.groupSize); // Use local ref to allow editing

const flightResults = ref<any[]>([]);
const isSearching = ref(false);
const searchAttempted = ref(false);

// Watch for changes in props and update local refs
watch(() => props.startDate, (newVal) => {
  localStartDate.value = newVal;
});
watch(() => props.groupSize, (newVal) => {
  localGroupSize.value = newVal;
});

// Mock flight data generation
const generateMockFlights = (depCity: string, arrCity: string, date: string, passengers: number) => {
  const flights = [];
  const basePrice = 1500 * passengers; // Base price per person
  const airlines = ['Thai Airways', 'Bangkok Airways', 'Nok Air', 'Thai Lion Air', 'Thai Vietjet Air'];

  for (let i = 0; i < 3; i++) { // Generate 3 mock flights
    const airline = airlines[Math.floor(Math.random() * airlines.length)];
    const price = basePrice + Math.floor(Math.random() * 500) * passengers;
    const departureTime = `${Math.floor(Math.random() * 24).toString().padStart(2, '0')}:00`;
    const arrivalTime = `${(parseInt(departureTime.split(':')[0]) + Math.floor(Math.random() * 4) + 1).toString().padStart(2, '0')}:00`; // 1-4 hours later

    flights.push({
      id: `flight-${Date.now()}-${i}`,
      airline: airline,
      departureCity: depCity,
      arrivalCity: arrCity,
      departureDate: date,
      departureTime: departureTime,
      arrivalTime: arrivalTime,
      price: price,
      passengers: passengers,
    });
  }
  return flights;
};

const searchFlights = async () => {
  isSearching.value = true;
  searchAttempted.value = true;
  flightResults.value = []; // Clear previous results

  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  if (departureCity.value && arrivalCity.value && localStartDate.value) {
    flightResults.value = generateMockFlights(
      departureCity.value,
      arrivalCity.value,
      localStartDate.value,
      localGroupSize.value
    );
  }
  isSearching.value = false;
};

const selectFlight = (flight: any) => {
  emit('select-flight', flight);
  alert(`Selected flight with ${flight.airline} for ฿${flight.price.toLocaleString()}`);
};

// Initialize form fields with prop values on mount
onMounted(() => {
  localStartDate.value = props.startDate;
  localGroupSize.value = props.groupSize;
});
</script>

<style scoped>
/* Add any specific styles for this component here if needed */
</style>