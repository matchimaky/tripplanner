<template>
  <div class="flex items-center gap-4 bg-gray-50 rounded-lg p-3 shadow-sm group">
    <div class="flex-shrink-0 text-gray-400 cursor-grab">
      <i class="fas fa-grip-lines"></i>
    </div>
    <img :src="image" alt="" class="w-16 h-16 rounded-md object-cover flex-shrink-0" />
    <div class="flex-grow">
      <input
        v-if="isEditing"
        v-model="editedName"
        @blur="saveChanges"
        @keyup.enter="saveChanges"
        class="font-semibold text-gray-800 w-full p-1 border rounded"
      />
      <h4 v-else @click="isEditing = true" class="font-semibold text-gray-800 cursor-pointer hover:underline">
        {{ name }}
      </h4>

      <div class="text-sm text-gray-500 flex items-center gap-2">
        <input
          v-if="isEditing"
          v-model="editedTime"
          @blur="saveChanges"
          @keyup.enter="saveChanges"
          type="text"
          class="w-16 p-1 border rounded"
        />
        <span v-else @click="isEditing = true" class="cursor-pointer hover:underline">{{ time }}</span>
        
        <span>|</span>
        
        <input
          v-if="isEditing"
          v-model="editedCost"
          @blur="saveChanges"
          @keyup.enter="saveChanges"
          type="number"
          class="w-20 p-1 border rounded"
        />
        <span v-else @click="isEditing = true" class="cursor-pointer hover:underline">
          ฿{{ cost?.toLocaleString() }}
        </span>
      </div>
    </div>
    
    <button
      @click="$emit('delete-activity')"
      class="text-red-500 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <i class="fas fa-trash-alt"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps({
  id: Number,
  image: String,
  name: String,
  time: String,
  cost: Number,
});

const emit = defineEmits(['update-activity', 'delete-activity']);

const isEditing = ref(false);
const editedName = ref(props.name);
const editedTime = ref(props.time);
const editedCost = ref(props.cost);

// Watch for prop changes to keep local state in sync
watch(() => props.name, (newName) => {
  editedName.value = newName;
});
watch(() => props.time, (newTime) => {
  editedTime.value = newTime;
});
watch(() => props.cost, (newCost) => {
  editedCost.value = newCost;
});

const saveChanges = () => {
  isEditing.value = false;
  emit('update-activity', {
    id: props.id,
    name: editedName.value,
    time: editedTime.value,
    cost: editedCost.value,
  });
};
</script>