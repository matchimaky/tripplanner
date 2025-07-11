<template>
  <div class="max-w-7xl mx-auto">
    <TripPlanner
      :tripDays="tripDays"
      :recommendedItems="recommendedItems"
      :search-query="searchQuery"  @update:search-query="$emit('update:searchQuery', $event)"  @add-recommendation-to-plan="$emit('add-recommendation-to-plan', $event)"
      @handle-drag-start="$emit('handle-drag-start', $event)"
      @handle-drag-over="$emit('handle-drag-over', $event)"
      @handle-drop="$emit('handle-drop', $event)"
      @update-activity="$emit('update-activity', $event)"
      @delete-activity="$emit('delete-activity', $event)"
      @add-activity-to-day="$emit('add-activity-to-day', $event)"
      @add-day="$emit('add-day')"
    />
  </div>
</template>

<script setup lang="ts">
import TripPlanner from '@/components/TripPlanner.vue';
import { defineProps, defineEmits } from 'vue';

interface Recommendation { id: number; image: string; name: string; description: string; }
interface TripActivity { id: number; image: string; name: string; time: string; cost: number; }
interface TripDay { id: number; dayNumber: number; name: string | null; activities: TripActivity[]; }

defineProps({
  tripDays: {
    type: Array as () => TripDay[],
    required: true,
  },
  recommendedItems: {
    type: Array as () => Recommendation[],
    required: true,
  },
  // This prop is received from the parent (maindashboard.vue)
  searchQuery: String,
});

defineEmits([
  'update:searchQuery',
  'add-recommendation-to-plan',
  'handle-drag-start',
  'handle-drag-over',
  'handle-drop',
  'update-activity',
  'delete-activity',
  'add-activity-to-day',
  'add-day',
]);
</script>