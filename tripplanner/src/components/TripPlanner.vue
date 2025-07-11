<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div class="bg-white rounded-xl shadow-lg p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-gray-800">Recommendation place</h3>
      </div>
      <div class="relative mb-4">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="search"
          class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          @input="$emit('update:searchQuery', searchQuery)"
        />
        <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <div class="space-y-3">
        <div
          v-for="item in filteredRecommendations"
          :key="item.id"
          class="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
          @click="$emit('add-recommendation-to-plan', item)"
        >
          <img :src="item.image" :alt="item.name" class="w-12 h-12 rounded-lg object-cover" />
          <div class="flex-1">
            <h4 class="font-medium text-gray-800">{{ item.name }}</h4>
            <p class="text-sm text-gray-600">{{ item.description }}</p>
          </div>
          <button class="text-teal-600 hover:text-teal-700">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-lg p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-gray-800">Plan</h3>
        <button class="bg-coral-500 text-white px-4 py-2 rounded-lg hover:bg-coral-600" style="background-color: #ff6b6b;">
          generate AI
        </button>
      </div>
      
      <div v-if="tripDays.length === 0" class="text-center text-gray-500 py-10">
        <p class="mb-4">No days added yet. Start planning your trip!</p>
      </div>
      
      <div v-else v-for="day in tripDays" :key="day.id" class="mb-6">
        <h4 class="font-semibold text-gray-800 mb-3 cursor-pointer" @click="startEditing(day.id)">
          <span v-if="!editingDayId || editingDayId !== day.id">
            {{ day.name || `DAY ${day.dayNumber}` }}
          </span>
          <input
            v-else
            type="text"
            v-model="day.name"
            @blur="stopEditing"
            @keyup.enter="stopEditing"
            class="font-semibold text-gray-800 bg-transparent border-b border-gray-400 focus:outline-none"
          />
        </h4>

        <div class="space-y-3">
          <div
            v-for="(activity, index) in day.activities"
            :key="activity.id"
            class="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg"
            draggable="true"
            @dragstart="$emit('handle-drag-start', { event: $event, dayId: day.id, index: index })"
            @dragover="$emit('handle-drag-over', $event)"
            @drop="$emit('handle-drop', { event: $event, dropDayId: day.id, dropIndex: index })"
          >
            <img :src="activity.image" :alt="activity.name" class="w-16 h-12 rounded-lg object-cover" />
            <div class="flex-1">
              <input
                v-model="activity.name"
                @blur="$emit('update-activity', { dayId: day.id, activityId: activity.id, updatedData: activity })"
                class="font-medium text-gray-800 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-teal-500 rounded px-1"
              />
            </div>
            <div class="text-right">
              <input
                v-model="activity.time"
                @blur="$emit('update-activity', { dayId: day.id, activityId: activity.id, updatedData: activity })"
                class="text-sm text-gray-600 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-teal-500 rounded px-1 w-16"
              />
              <div class="font-medium text-gray-800">
                <input
                  v-model.number="activity.cost"
                  @blur="$emit('update-activity', { dayId: day.id, activityId: activity.id, updatedData: activity })"
                  class="w-16 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-teal-500 rounded px-1"
                />
              </div>
            </div>
            <button @click="$emit('delete-activity', { dayId: day.id, activityId: activity.id })" class="text-red-500 hover:text-red-700">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        <button
          @click="$emit('add-activity-to-day', day.id)"
          class="w-full mt-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-teal-500 hover:text-teal-500 transition-colors"
        >
          Add new activity
        </button>
      </div>

      <button
        @click="$emit('add-day')"
        class="w-full mt-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center justify-center"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add Day
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Recommendation {
  id: number;
  image: string;
  name: string;
  description: string;
}

interface TripActivity {
  id: number;
  image: string;
  name: string;
  time: string;
  cost: number;
}

// Updated interface
interface TripDay {
  id: number;
  dayNumber: number;
  name: string | null;
  activities: TripActivity[];
}

const props = defineProps({
  tripDays: { type: Array as () => TripDay[], required: true },
  recommendedItems: { type: Array as () => Recommendation[], required: true },
});

const emit = defineEmits([
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

const searchQuery = ref('');
const editingDayId = ref<number | null>(null);

const filteredRecommendations = computed(() => {
  if (!searchQuery.value) return props.recommendedItems;
  return props.recommendedItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const startEditing = (dayId: number) => {
  editingDayId.value = dayId;
};

const stopEditing = () => {
  editingDayId.value = null;
};
</script>