<template>
  <div class="bg-lightorange rounded-xl shadow-lg p-6 h-full min-h-[280px]">
    <h3 class="text-lg font-semibold text-gray-800 mb-4">Budget</h3>
     <div class="text-3xl font-bold text-gray-800 mb-4">
      {{ computedPlannedExpenses.total }} THB
    </div>
    <div class="space-y-2 mb-4">
      <div class="flex justify-between">
        <span class="text-gray-600">Plan</span>
        <span class="font-medium">{{ computedPlannedExpenses.plan }} THB</span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-600">Flight</span>
        <span class="font-medium">{{ computedPlannedExpenses.flight }} THB</span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-600">Hotel</span>
        <span class="font-medium">{{ computedPlannedExpenses.hotel }} THB</span>
      </div>
    </div>
    
    <hr class="border-t border-gray-300" />
    
    <div v-if="remainingBudget < 0" class="mt-4 flex justify-between items-center">
      <span class="font-bold text-xl text-red-500">
        Exceeded by {{ Math.abs(remainingBudget) }} THB
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface PlannedExpenses {
  plan: number;
  flight: number;
  hotel: number;
  total: number;
}

const props = defineProps({
  // Prop to receive the initial budget from the parent
  totalBudget: {
    type: Number,
    required: true
  },
  
  // Prop for the planned expenses
  computedPlannedExpenses: { 
    type: Object as () => PlannedExpenses, 
    required: true 
  },
});

// A new computed property to calculate the remaining budget
const remainingBudget = computed(() => {
  return props.totalBudget - props.computedPlannedExpenses.total;
});
</script>