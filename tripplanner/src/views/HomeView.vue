<template>
  <div class="homepage-container">
    <!-- Background decorative elements -->
    <div class="bg-decoration decoration-1"></div>
    <div class="bg-decoration decoration-2"></div>
    <div class="bg-decoration decoration-3"></div>
    
    <div class="content-wrapper">
      <div class="text-section">
        <h1 class="main-title">
          <span class="large-c">C</span>reated your
          <br>
          <span class="trip-text">trip plan</span> <span class="with-text">with</span>
          <br>
          <span class="one-text">one </span><span class="large-c">C</span><span class="click-text">lick</span>
        </h1>
        
      
        
        <RouterLink 
          to="startplan"
          class="start-planning-btn"
          :class="{ 'loading': isLoading }"
          @click="handleStartPlanning"
        >
          {{ isLoading ? 'Loading...' : 'start planning' }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Reactive state
const isLoading = ref<boolean>(false)

// Methods
const handleStartPlanning = async (): Promise<void> => {
  isLoading.value = true
  
  // Simulate navigation delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  isLoading.value = false
  // Navigation will be handled by RouterLink
}
</script>

<style scoped>
.homepage-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 30%, #f1f5f9 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  position: relative;
  overflow: hidden;
}

/* Background decorative elements */
.bg-decoration {
  position: absolute;
  border-radius: 50%;
  opacity: 0.3;
}

.decoration-1 {
  top: 80px;
  left: 40px;
  width: 80px;
  height: 80px;
  background: #fef3c7;
  animation: float 6s ease-in-out infinite;
}

.decoration-2 {
  bottom: 80px;
  right: 80px;
  width: 64px;
  height: 64px;
  background: #fce7f3;
  animation: bounce 4s ease-in-out infinite;
}

.decoration-3 {
  top: 50%;
  left: 80px;
  width: 32px;
  height: 32px;
  background: #dbeafe;
  opacity: 0.5;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.content-wrapper {
  max-width: 1200px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
}

.text-section {
  max-width: 600px;
  text-align: left;
}

.main-title {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: #1f2937;
  margin-bottom: 2rem;
}

.large-c {
  font-size: 5rem;
  font-weight: 900;
  font-style: italic;
  color: #111827;
  line-height: 0.8;
}

.trip-text {
  color: #111827;
  font-weight: 900;
}

.with-text {
  color: #6b7280;
  font-weight: 400;
}

.one-text {
  color: #6b7280;
  font-weight: 400;
}

.click-text {
  color: #6b7280;
  font-weight: 400;
}


.start-planning-btn {
  display: inline-block;
  background: linear-gradient(135deg, #fb7185, #f97316);
  color: white;
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 50px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(251, 113, 133, 0.3);
  min-width: 200px;
  text-align: center;
  border: none;
  position: relative;
  overflow: hidden;
}

.start-planning-btn:hover:not(.loading) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(251, 113, 133, 0.4);
  background: linear-gradient(135deg, #f43f5e, #ea580c);
}

.start-planning-btn:active {
  transform: translateY(0);
}

.start-planning-btn.loading {
  opacity: 0.8;
  cursor: not-allowed;
}

.start-planning-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.start-planning-btn:hover::before {
  left: 100%;
}

/* Responsive Design */




</style>