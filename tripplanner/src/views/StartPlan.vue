<template>
  <div class="flex min-h-screen bg-[#94B9B9] bg-opacity-10 font-sans text-gray-800 mt-10 relative">
    <canvas 
      ref="canvasRef"
      class="fixed top-0 left-0 w-full h-full pointer-events-none z-10"
    ></canvas>
    
    <div class="flex-1 p-8 relative z-20">
      <div class="max-w-2xl mx-auto">
        <form class="space-y-4 mt-10 mb-6">
          <div>
            <label class="text-2xl lg:text-3xl font-bold text-[#17637B] font-cardo mb-5 block">
              Where Will You Go Next?
            </label>
            <label class="block text-sm font-medium mb-2">
              Your Destination <span class="text-red-500">*</span>
            </label>
            <input
              v-model="formData.destination"
              type="text"
              placeholder="e.g. Tokyo, Seoul, Bangkok"
              class="w-full h-[40px] px-3 text-sm bg-gray-200 bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17637B]"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">
              Date <span class="text-red-500">*</span>
            </label>
            <div class="flex space-x-2">
              <input
                v-model="formData.startDate"
                type="date"
                class="flex-1 h-[40px] px-3 text-sm bg-gray-200 bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17637B]"
                required
              />
              <input
                v-model="formData.endDate"
                type="date"
                class="flex-1 h-[40px] px-3 text-sm bg-gray-200 bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17637B]"
                required
              />
            </div>
          </div>
        </form>
        
        <div v-if="showFilter" ref="filterSectionRef" class="bg-white bg-opacity-80 rounded-lg p-6 backdrop-blur-sm">
          <div class="text-center">
            <h2 class="text-base font-semibold mb-2">Filter</h2>
            <div class="w-12 h-0.5 bg-black mx-auto mb-4"></div>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">
              Budget (THB) <span class="text-red-500">*</span>
            </label>
            <input
              v-model.number="formData.budget"
              type="number"
              min="0"
              class="w-full h-[40px] px-3 text-sm bg-gray-200 bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17637B]"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Group Size</label>
            <div class="flex items-center space-x-3">
              <button
                type="button"
                @click="decreaseGroupSize"
                class="w-6 h-6 text-sm flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
              >
                -
              </button>
              <div class="px-3 py-1 border border-[#1C99BB] rounded text-sm">
                {{ formData.groupSize }}
              </div>
              <button
                type="button"
                @click="increaseGroupSize"
                class="w-6 h-6 text-sm flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Transport</label>
            <div class="flex space-x-6 text-sm">
              <label class="flex items-center space-x-2">
                <input v-model="formData.transport" type="radio" value="bus" class="w-3 h-3" />
                <span>Bus</span>
              </label>
              <label class="flex items-center space-x-2">
                <input v-model="formData.transport" type="radio" value="train" class="w-3 h-3" />
                <span>Train</span>
              </label>
              <label class="flex items-center space-x-2">
                <input v-model="formData.transport" type="radio" value="rental-car" class="w-3 h-3" />
                <span>Rental car</span>
              </label>
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Focus on Activities</label>
            <div class="grid grid-cols-2 gap-2 text-xs">
              <label class="flex items-center space-x-2">
                <input v-model="formData.activities" type="checkbox" value="traveling" class="w-3 h-3" />
                <span>Traveling</span>
              </label>
              <label class="flex items-center space-x-2">
                <input v-model="formData.activities" type="checkbox" value="nature" class="w-3 h-3" />
                <span>Nature</span>
              </label>
              <label class="flex items-center space-x-2">
                <input v-model="formData.activities" type="checkbox" value="food" class="w-3 h-3" />
                <span>Food</span>
              </label>
              <label class="flex items-center space-x-2">
                <input v-model="formData.activities" type="checkbox" value="tourist-spots" class="w-3 h-3" />
                <span>Popular Tourist Spots</span>
              </label>
              <label class="flex items-center space-x-2">
                <input v-model="formData.activities" type="checkbox" value="hidden-gems" class="w-3 h-3" />
                <span>Hidden Gems</span>
              </label>
              <div class="flex items-center space-x-2 col-span-2">
                <input v-model="formData.activities" type="checkbox" value="other" class="w-3 h-3" />
                <span>Other:</span>
                <input
                  v-model="formData.otherActivity"
                  type="text"
                  placeholder="Specify"
                  class="flex-1 px-2 py-1 text-xs bg-gray-200 bg-opacity-50 rounded"
                  :disabled="!formData.activities.includes('other')"
                />
              </div>
            </div>
          </div>
          <div class="mb-6">
            <label class="block text-sm font-medium mb-2">Special Needs</label>
            <textarea
              v-model="formData.specialNeeds"
              rows="4"
              class="w-full px-3 py-2 text-sm bg-gray-200 bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17637B] resize-none"
              placeholder="Any special needs..."
            ></textarea>
          </div>
          <div class="text-center">
            <RouterLink
              :to="{ path: '/maindashboard'}"
              type="button"
              @click="submitForm"
              :disabled="isSubmitting"
              class="px-6 py-2 bg-[#C25941] text-[#F1EADF] text-base font-semibold rounded-lg hover:bg-[#A54832] transition-colors disabled:opacity-50"
            >
              {{ isSubmitting ? 'Saving...' : 'start planning' }}
            </RouterLink>
          </div>
          <div v-if="savedPlans.length > 0" class="mt-6">
            <h3 class="text-base font-semibold mb-2">Saved Travel Plans</h3>
            <div class="space-y-3">
              <div
                v-for="plan in savedPlans"
                :key="plan.id"
                class="p-3 border rounded-lg bg-gray-50 text-sm"
              >
                <h4 class="font-semibold">{{ plan.destination }}</h4>
                <p class="text-gray-600">{{ plan.startDate }} to {{ plan.endDate }}</p>
                <p class="text-gray-600">
                  Budget: ฿{{ plan.budget?.toLocaleString() }} | Group: {{ plan.groupSize }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

// Types
interface TravelPlan {
  id: string
  destination: string
  startDate: string
  endDate: string
  budget: number
  groupSize: number
  transport: string
  activities: string[]
  otherActivity: string
  specialNeeds: string
}

interface FogParticle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  opacity: number
  color: string
}

// Form data
const formData = reactive({
  destination: '',
  startDate: '',
  endDate: '',
  budget: 0,
  groupSize: 1,
  transport: '',
  activities: [] as string[],
  otherActivity: '',
  specialNeeds: ''
})

const showFilter = ref(false)
const filterSectionRef = ref<HTMLElement | null>(null)
const isSubmitting = ref(false)
const savedPlans = ref<TravelPlan[]>([])

// Mouse fog effect variables
const canvasRef = ref<HTMLCanvasElement | null>(null)
const particles = ref<FogParticle[]>([])
const mousePos = ref({ x: 0, y: 0 })
let animationId: number
let ctx: CanvasRenderingContext2D | null = null

// Mouse fog effect functions
const createFogParticle = (x: number, y: number): FogParticle => {
  const isOverContent = checkIfOverContent(x, y)
  return {
    x: x + (Math.random() - 0.5) * 30,
    y: y + (Math.random() - 0.5) * 30,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    life: 0,
    maxLife: 180 + Math.random() * 120,
    size: 15 + Math.random() * 25,
    opacity: 0.3 + Math.random() * 0.2,
    color: isOverContent ? '#17637B' : '#94B9B9'
  }
}

const checkIfOverContent = (x: number, y: number): boolean => {
  // Check if mouse is over the form content area
  const contentArea = document.querySelector('form')
  if (!contentArea) return false
  
  const rect = contentArea.getBoundingClientRect()
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
}

const updateFogParticles = () => {
  particles.value = particles.value.filter(particle => {
    particle.life++
    particle.x += particle.vx
    particle.y += particle.vy
    particle.vx *= 0.995
    particle.vy *= 0.995
    particle.opacity = Math.max(0, (1 - particle.life / particle.maxLife) * 0.4)
    particle.size *= 1.002 // Slightly grow for fog effect
    
    return particle.life < particle.maxLife
  })
}

const drawFogParticles = () => {
  if (!ctx) return
  
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  
  particles.value.forEach(particle => {
    ctx!.save()
    ctx!.globalAlpha = particle.opacity
    
    // Create radial gradient for fog effect
    const gradient = ctx!.createRadialGradient(
      particle.x, particle.y, 0,
      particle.x, particle.y, particle.size
    )
    gradient.addColorStop(0, particle.color + '80') // 50% opacity
    gradient.addColorStop(0.5, particle.color + '40') // 25% opacity
    gradient.addColorStop(1, particle.color + '00') // 0% opacity
    
    ctx!.fillStyle = gradient
    ctx!.beginPath()
    ctx!.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
    ctx!.fill()
    ctx!.restore()
  })
}

const animate = () => {
  updateFogParticles()
  drawFogParticles()
  animationId = requestAnimationFrame(animate)
}

const handleMouseMove = (e: MouseEvent) => {
  if (!canvasRef.value) return
  
  mousePos.value = {
    x: e.clientX,
    y: e.clientY
  }
  
  // Create fog particles with slower generation rate
  if (Math.random() < 0.7) {
    particles.value.push(createFogParticle(mousePos.value.x, mousePos.value.y))
  }
  
  // Limit particle count for performance
  if (particles.value.length > 100) {
    particles.value.splice(0, particles.value.length - 100)
  }
}

const resizeCanvas = () => {
  if (!canvasRef.value) return
  
  canvasRef.value.width = window.innerWidth
  canvasRef.value.height = window.innerHeight
}

// Form logic
watch(() => formData.endDate, (newVal) => {
  if (
    formData.destination &&
    formData.startDate &&
    newVal &&
    new Date(formData.startDate) < new Date(newVal)
  ) {
    showFilter.value = true
    setTimeout(() => {
      filterSectionRef.value?.scrollIntoView({ behavior: 'smooth' })
    }, 1000)
  }
})

const increaseGroupSize = () => {
  if (formData.groupSize < 20) formData.groupSize++
}

const decreaseGroupSize = () => {
  if (formData.groupSize > 1) formData.groupSize--
}

const saveToDatabase = async (plan: Omit<TravelPlan, 'id'>): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  const newPlan: TravelPlan = { ...plan, id: Date.now().toString() }
  const existing = JSON.parse(localStorage.getItem('travelPlans') || '[]')
  existing.push(newPlan)
  localStorage.setItem('travelPlans', JSON.stringify(existing))
  savedPlans.value = existing
  return newPlan.id
}

const submitForm = async () => {
  try {
    isSubmitting.value = true
    if (!formData.destination || !formData.startDate || !formData.endDate || !formData.budget) {
      alert('Please fill in all required fields')
      return
    }
    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      alert('End date must be after start date')
      return
    }
    await saveToDatabase({ ...formData })
    Object.assign(formData, {
      destination: '',
      startDate: '',
      endDate: '',
      budget: 0,
      groupSize: 1,
      transport: '',
      activities: [],
      otherActivity: '',
      specialNeeds: ''
    })
    showFilter.value = false
  } catch (e) {
    alert('Failed to save. Try again.')
  } finally {
    isSubmitting.value = false
  }
}

// Lifecycle hooks
onMounted(() => {
  if (!canvasRef.value) return
  
  ctx = canvasRef.value.getContext('2d')
  resizeCanvas()
  
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('resize', resizeCanvas)
  
  animate()
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('resize', resizeCanvas)
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<style scoped>
input[type="date"]::-webkit-calendar-picker-indicator {
  cursor: pointer;
}

/* Additional styles for better fog effect */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}
</style>