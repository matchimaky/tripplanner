<template>
  <div class="container">
    <div class="header">
      <div class="logo">rip Tailor</div>
      <button class="profile-btn" @click="handleProfile">Profile</button>
    </div>

    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label class="form-label">
          Your Destination<span class="required">*</span>
        </label>
        <input 
          type="text"
          class="form-input"
          placeholder="e.g. Tokyo, Seoul, Bangkok"
          v-model="formData.destination"
          required
        >
      </div>

      <div class="form-group">
        <label class="form-label">
          Date<span class="required">*</span>
        </label>
        <div class="date-range">
          <div class="date-input">
            <input 
              type="date"
              class="form-input"
              v-model="formData.startDate"
              required
            >
          </div>
          <div class="date-arrow">→</div>
          <div class="date-input">
            <input 
              type="date"
              class="form-input"
              v-model="formData.endDate"
              :min="formData.startDate"
              required
            >
          </div>
        </div>
      </div>

      <button 
        type="submit" 
        class="next-btn"
        :disabled="!isFormValid"
      >
        Next
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

// Types
interface TripFormData {
  destination: string
  startDate: string
  endDate: string
}

interface SubmitEvent {
  destination: string
  startDate: string
  endDate: string
}

// Props (if you need to pass data to this component)
interface Props {
  initialDestination?: string
}

const props = withDefaults(defineProps<Props>(), {
  initialDestination: ''
})

// Emits
const emit = defineEmits<{
  submit: [data: SubmitEvent]
  profileClick: []
}>()

// Reactive data
const formData = ref<TripFormData>({
  destination: props.initialDestination,
  startDate: '',
  endDate: ''
})

// Computed properties
const isFormValid = computed((): boolean => {
  return !!(
    formData.value.destination.trim() && 
    formData.value.startDate && 
    formData.value.endDate
  )
})

// Watchers
watch(() => formData.value.startDate, (newDate: string) => {
  // Reset end date if it's before start date
  if (formData.value.endDate && formData.value.endDate < newDate) {
    formData.value.endDate = ''
  }
})

// Methods
const handleSubmit = (): void => {
  if (isFormValid.value) {
    const submitData: SubmitEvent = {
      destination: formData.value.destination,
      startDate: formData.value.startDate,
      endDate: formData.value.endDate
    }
    
    emit('submit', submitData)
    
    // Optional: Show success message or handle locally
    console.log('Form submitted:', submitData)
  }
}

const handleProfile = (): void => {
  emit('profileClick')
}

// Expose reactive data for parent components (optional)
defineExpose({
  formData,
  isFormValid,
  resetForm: () => {
    formData.value = {
      destination: '',
      startDate: '',
      endDate: ''
    }
  }
})
</script>

<style scoped>
.container {
  background: white;
  border-radius: 20px;
  padding: 60px 40px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  position: relative;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60px;
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

.form-group {
  margin-bottom: 40px;
}

.form-label {
  display: block;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

.required {
  color: #ff6b6b;
}

.form-input {
  width: 100%;
  padding: 20px 24px;
  border: none;
  background: #f8f9fa;
  border-radius: 12px;
  font-size: 16px;
  color: #333;
  outline: none;
  transition: all 0.3s ease;
}

.form-input:focus {
  background: #e9ecef;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.form-input::placeholder {
  color: #adb5bd;
}

.date-range {
  display: flex;
  gap: 16px;
  align-items: center;
}

.date-input {
  flex: 1;
  position: relative;
}

.date-arrow {
  color: #adb5bd;
  font-size: 20px;
  flex-shrink: 0;
}

.next-btn {
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  color: white;
  border: none;
  padding: 18px 40px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  position: absolute;
  bottom: 40px;
  right: 40px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
}

.next-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
}

.next-btn:active:not(:disabled) {
  transform: translateY(0);
}

.next-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

@media (max-width: 600px) {
  .container {
    margin: 20px;
    padding: 40px 30px;
  }
  
  .date-range {
    flex-direction: column;
    gap: 12px;
  }
  
  .date-arrow {
    transform: rotate(90deg);
  }
  
  .next-btn {
    position: static;
    width: 100%;
    margin-top: 30px;
  }
}
</style>