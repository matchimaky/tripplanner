<!-- TripFilterPage.vue -->
<template>
  <div class="filter-page">
    <div class="container">
  

      <!-- Filter Section -->
      <div class="filter-section">
        <h2 class="filter-title">Filter</h2>

        <!-- Budget Filter -->
        <div class="filter-group">
          <label class="filter-label">
            Budget (THB)<span class="required">*</span>
          </label>
          <div class="budget-slider">
            <input 
              type="range" 
              class="slider"
              v-model="filterData.budget"
              :min="budgetRange.min"
              :max="budgetRange.max"
              :step="budgetRange.step"
              @input="updateBudgetDisplay"
            >
            <div class="budget-display">
              <span class="budget-value">{{ formatBudget(filterData.budget) }}</span>
            </div>
          </div>
        </div>

        <!-- Group Size -->
        <div class="filter-group">
          <label class="filter-label">Group Size</label>
          <div class="group-size-selector">
            <button 
              type="button"
              class="size-btn decrease"
              @click="decreaseGroupSize"
              :disabled="filterData.groupSize <= 1"
            >
              -
            </button>
            <input 
              type="number" 
              class="size-input"
              v-model.number="filterData.groupSize"
              min="1"
              max="20"
              readonly
            >
            <button 
              type="button"
              class="size-btn increase"
              @click="increaseGroupSize"
              :disabled="filterData.groupSize >= 20"
            >
              +
            </button>
          </div>
        </div>

        <!-- Transport -->
        <div class="filter-group">
          <label class="filter-label">Transport</label>
          <div class="transport-options">
            <label 
              v-for="transport in transportOptions" 
              :key="transport.value"
              class="transport-option"
            >
              <input 
                type="checkbox"
                :value="transport.value"
                v-model="filterData.transport"
                class="transport-checkbox"
              >
              <span class="transport-label">{{ transport.label }}</span>
            </label>
          </div>
        </div>

        <!-- Focus on Activities -->
        <div class="filter-group">
          <label class="filter-label">Focus on Activities</label>
          <div class="activities-options">
            <label 
              v-for="activity in activityOptions" 
              :key="activity.value"
              class="activity-option"
            >
              <input 
                type="checkbox"
                :value="activity.value"
                v-model="filterData.activities"
                class="activity-checkbox"
              >
              <span class="activity-label">{{ activity.label }}</span>
            </label>
          </div>
        </div>

        <!-- Special Needs -->
        <div class="filter-group">
          <label class="filter-label">Special Needs</label>
          <textarea 
            class="special-needs-input"
            v-model="filterData.specialNeeds"
            placeholder="Please describe any special requirements or accessibility needs..."
            rows="4"
          ></textarea>
        </div>
      </div>

      <!-- Next Button -->
     
       <RouterLink to="planningnote"
             type="button"
        class="next-btn"
        @click="handleSubmit"
        :disabled="!isFormValid">
           Next</RouterLink>

            
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'

// Types
interface FilterData {
  budget: number
  groupSize: number
  transport: string[]
  activities: string[]
  specialNeeds: string
}

interface TransportOption {
  value: string
  label: string
}

interface ActivityOption {
  value: string
  label: string
}

interface BudgetRange {
  min: number
  max: number
  step: number
}

interface FilterSubmitData {
  budget: number
  groupSize: number
  transport: string[]
  activities: string[]
  specialNeeds: string
}

// Emits
const emit = defineEmits<{
  next: [data: FilterSubmitData]
  profile: []
  back: []
}>()

// Reactive data
const filterData = reactive<FilterData>({
  budget: 10000,
  groupSize: 1,
  transport: [],
  activities: [],
  specialNeeds: ''
})

const budgetRange: BudgetRange = {
  min: 1000,
  max: 50000,
  step: 1000
}

const transportOptions: TransportOption[] = [
  { value: 'bus', label: 'Bus' },
  { value: 'train', label: 'Train' },
  { value: 'rental-car', label: 'Rental Car' }
]

const activityOptions: ActivityOption[] = [
  { value: 'traveling', label: 'Traveling' },
  { value: 'nature', label: 'Nature' },
  { value: 'food', label: 'Food' },
  { value: 'tourist-spots', label: 'Popular Tourist Spots' },
  { value: 'hidden-gems', label: 'Hidden Gems' },
  { value: 'etc', label: 'Etc' }
]

// Computed properties
const isFormValid = computed((): boolean => {
  return filterData.budget > 0 && filterData.groupSize > 0
})

// Methods
const formatBudget = (amount: number): string => {
  return new Intl.NumberFormat('th-TH').format(amount) + ' THB'
}

const updateBudgetDisplay = (): void => {
  // This method can be used for additional budget display logic if needed
}

const increaseGroupSize = (): void => {
  if (filterData.groupSize < 20) {
    filterData.groupSize++
  }
}

const decreaseGroupSize = (): void => {
  if (filterData.groupSize > 1) {
    filterData.groupSize--
  }
}

const handleSubmit = (): void => {
  if (isFormValid.value) {
    const submitData: FilterSubmitData = {
      budget: filterData.budget,
      groupSize: filterData.groupSize,
      transport: [...filterData.transport],
      activities: [...filterData.activities],
      specialNeeds: filterData.specialNeeds
    }
    
    emit('next', submitData)
    console.log('Filter data submitted:', submitData)
  }
}



// Expose methods for parent components
defineExpose({
  filterData,
  resetFilters: () => {
    Object.assign(filterData, {
      budget: 10000,
      groupSize: 1,
      transport: [],
      activities: [],
      specialNeeds: ''
    })
  }
})
</script>

<style scoped>
.filter-page {
  min-height: 100vh;
  background: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding-top: 80px;
}

.container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  min-height: 100vh;
  position: relative;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0 40px 0;
  border-bottom: 1px solid #e9ecef;
  margin-bottom: 40px;
}

.logo {
  font-size: 24px;
  font-weight: 700;
  color: #333;
}

.logo::before {
  content: "T";
  display: inline-block;
  width: 32px;
  height: 32px;
  background: #ff6b6b;
  color: white;
  text-align: center;
  line-height: 32px;
  border-radius: 8px;
  margin-right: 8px;
  font-size: 18px;
}

.profile-btn {
  background: none;
  border: none;
  color: #666;
  font-size: 16px;
  cursor: pointer;
  padding: 8px 0;
  transition: color 0.3s ease;
}

.profile-btn:hover {
  color: #333;
}

/* Filter Section */
.filter-section {
  padding-bottom: 100px;
}

.filter-title {
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin-bottom: 40px;
}

.filter-group {
  margin-bottom: 40px;
}

.filter-label {
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

.required {
  color: #ff6b6b;
}

/* Budget Slider */
.budget-slider {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
}

.slider {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #ddd;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
  margin-bottom: 16px;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ff6b6b;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ff6b6b;
  cursor: pointer;
  border: none;
}

.budget-display {
  text-align: center;
}

.budget-value {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

/* Group Size */
.group-size-selector {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f8f9fa;
  padding: 12px;
  border-radius: 12px;
  width: fit-content;
}

.size-btn {
  width: 40px;
  height: 40px;
  border: none;
  background: #007bff;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.size-btn:hover:not(:disabled) {
  background: #0056b3;
  transform: translateY(-1px);
}

.size-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.size-input {
  width: 60px;
  height: 40px;
  text-align: center;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  background: white;
}

/* Transport Options */
.transport-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.transport-option {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 12px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.transport-option:hover {
  background: #f8f9fa;
}

.transport-checkbox {
  width: 18px;
  height: 18px;
  accent-color: #ff6b6b;
}

.transport-label {
  font-size: 16px;
  color: #333;
}

/* Activity Options */
.activities-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.activity-option {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 12px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.activity-option:hover {
  background: #f8f9fa;
}

.activity-checkbox {
  width: 18px;
  height: 18px;
  accent-color: #ff6b6b;
}

.activity-label {
  font-size: 16px;
  color: #333;
}

/* Special Needs */
.special-needs-input {
  width: 100%;
  padding: 16px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 16px;
  font-family: inherit;
  resize: vertical;
  outline: none;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.special-needs-input:focus {
  border-color: #ff6b6b;
}

.special-needs-input::placeholder {
  color: #adb5bd;
}

/* Next Button */
.next-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
  z-index: 1000;
}

.next-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
}

.next-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

@media (max-width: 600px) {
  .container {
    padding: 15px;
  }
  
  .header {
    padding: 15px 0 30px 0;
    margin-bottom: 30px;
  }
  
  .filter-title {
    font-size: 24px;
    margin-bottom: 30px;
  }
  
  .filter-group {
    margin-bottom: 30px;
  }
  
  .next-btn {
    bottom: 15px;
    right: 15px;
    left: 15px;
    width: calc(100% - 30px);
  }
}
</style>