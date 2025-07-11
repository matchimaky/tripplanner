<template>
  <div class="flex min-h-screen bg-white font-sans text-gray-800 mt-10">
    <Sidebar />

    <div class="flex-1 flex flex-col">
      <main class="flex-1 p-8">
        <div ref="pdfContent">
          <div ref="homeSection" class="max-w-7xl mx-auto">
            <div class="flex justify-between items-center mb-6">
              <WelcomeItem :username="username" :destination="destination.toUpperCase()" />
              <button
                @click="saveAsPdf"
                class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                Save as PDF
              </button>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <BudgetCard  
                :totalBudget="totalBudget" 
                :computedPlannedExpenses="computedPlannedExpenses"
              />
              <FlightCard :selectedFlight="selectedFlight" />
              <HotelCard :selectedHotel="selectedHotel" /> 
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <WeatherCard :weatherDescription="weatherDescription" />
              <WhatToWearCard :whatToWearDescription="whatToWearDescription" />
            </div>
          </div>

          <router-view
            v-slot="{ Component }"
            class="mt-8"
          >
            <component 
              :is="Component"
              :tripDays="tripDays"
              :recommendedItems="recommendedItems"
              v-model:searchQuery="searchQuery"
              @add-recommendation-to-plan="addRecommendationToPlan"
              @handle-drag-start="handleDragStart"
              @handle-drag-over="handleDragOver"
              @handle-drop="handleDrop"
              @update-activity="updateActivity"
              @delete-activity="deleteActivity"
              @add-activity-to-day="addActivityToDay"
              @add-day="addDay"
              ref="planSection"
              
              :startDate="formData.startDate"
              :endDate="formData.endDate"
              :groupSize="formData.groupSize"
              @select-flight="handleFlightSelected"
              @select-hotel="handleHotelSelected" 
            />
          </router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import html2pdf from 'html2pdf.js';
import Sidebar from '@/components/Sidebar.vue';
import WelcomeItem from '@/components/WelcomeItem.vue';
import BudgetCard from '@/components/BudgetCard.vue';
import FlightCard from '@/components/FlightCard.vue';
import HotelCard from '@/components/HotelCard.vue';
import WeatherCard from '@/components/WeatherCard.vue';
import WhatToWearCard from '@/components/WhatToWearCard.vue';
// Import the actual view components, not just their placeholders
import PlanningNote from '@/views/tripplannote/PlanningNote.vue';
import Flight from '@/views/tripplannote/Flight.vue'; // Corrected import for flight view
import Hotel from '@/views/tripplannote/Hotel.vue'; // Corrected import for hotel view

// --- Data Interfaces ---
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

interface TripDay {
  id: number;
  dayNumber: number;
  name: string | null;
  activities: TripActivity[];
}

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
interface SelectedHotel {
  id: number;
  name: string;
  price: number;
}

// --- Centralized State ---
const route = useRoute();
const router = useRouter(); 
const username = ref('MJ');
const destination = ref('Chiang Mai');
const currentView = ref('home'); 
const searchQuery = ref('');

// Add formData to maindashboard to pass to flight.vue
const formData = reactive({
  destination: '',
  startDate: '', // This will be passed to flight.vue
  endDate: '',
  budget: 0,
  groupSize: 1, // This will be passed to flight.vue
  transport: '',
  activities: [] as string[],
  otherActivity: '',
  specialNeeds: ''
});

const recommendedItems = ref<Recommendation[]>([
  { 
    id: 1, 
    image: 'https://images.unsplash.com/photo-1552960562-daf630e9278b?w=150&h=150&fit=crop', 
    name: 'Mon Cham (Mon Jam)', 
    description: 'Beautiful mountain viewpoint' 
  },
  { 
    id: 2, 
    image: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=150&h=150&fit=crop', 
    name: 'Wat Phra That Doi Suthep', 
    description: 'Historic temple on mountain' 
  },
]);

const tripDays = ref<TripDay[]>([
  {
    id: 1,
    dayNumber: 1,
    name: null,
    activities: [
      { 
        id: 1, 
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=100&h=75&fit=crop', 
        name: 'Khao Soi at Khun Yai', 
        time: '12:00', 
        cost: 150 
      },
      { 
        id: 2, 
        image: 'https://images.unsplash.com/photo-157189634982d?w=100&h=75&fit:crop', 
        name: 'House by Ginger', 
        time: '16:00', 
        cost: 850 
      },
    ],
  },
]);

// New state for selected flight and hotel
const selectedFlight = ref<SelectedFlight | null>(null);
const selectedHotel = ref<SelectedHotel | null>(null);

// --- Budget Logic ---
const totalBudget = ref(0);
const weatherDescription = ref('Monsoon season continues—expect afternoon thunderstorms and high humidity.');
const whatToWearDescription = ref('Wear moisture-wicking clothing and quick-dry gear. Bring a light rain jacket or umbrella. Use sunscreen and insect repellent. Footwear: Comfortable sandals for city; sneakers for hikes. Evenings on hills may be cool (-4°C)—pack a light layer.');

const computedPlannedExpenses = computed(() => {
  let totalPlanCost = 0;
  let totalFlightCost = selectedFlight.value ? selectedFlight.value.price : 0;
  let totalHotelCost = selectedHotel.value ? selectedHotel.value.price: 0; 

  for (const day of tripDays.value) {
    for (const activity of day.activities) {
      totalPlanCost += activity.cost;
    }
  }
  return {
    plan: totalPlanCost,
    flight: totalFlightCost,
    hotel: totalHotelCost,
    total: totalPlanCost + totalFlightCost + totalHotelCost,
  };
});

// This is the correct calculation for the remaining budget
const remainingBudget = computed(() => {
  return totalBudget.value - computedPlannedExpenses.value.total;
});

// --- Lifecycle Hooks and Watchers ---
onMounted(() => {
  // Read the latest travel plan from Local Storage
  const savedPlans = JSON.parse(localStorage.getItem('travelPlans') || '[]');
  const latestPlan = savedPlans.slice(-1)[0]; // Get the last item in the array

  if (latestPlan && latestPlan.budget) {
    totalBudget.value = parseFloat(latestPlan.budget);
  }
});

// Watch for changes in planned expenses to debug if needed
watch(computedPlannedExpenses, (newExpenses) => {
  console.log('Planned expenses updated:', newExpenses.total);
}, { deep: true });

// --- PDF Generation Logic ---
const pdfContent = ref<HTMLElement | null>(null);

const saveAsPdf = () => {
  if (!pdfContent.value) {
    alert('The content to save was not found.');
    return;
  }
  const options = {
    filename: `Travel_Plan_${destination.value.replace(/ /g, '_')}.pdf`,
    margin: 10,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  html2pdf().from(pdfContent.value).set(options).save();
};

// --- Drag and drop state ---
const draggedItem = ref<{ activity: TripActivity, dayId: number, index: number } | null>(null);

// --- State-modifying Functions ---
const addDay = () => {
  const nextDayNumber = tripDays.value.length > 0 ? Math.max(...tripDays.value.map(d => d.dayNumber)) + 1 : 1;
  const newDay: TripDay = {
    id: Date.now(),
    dayNumber: nextDayNumber,
    name: null, 
    activities: [],
  };
  tripDays.value.push(newDay);
};

const addRecommendationToPlan = (item: Recommendation) => {
  if (tripDays.value.length > 0) {
    const day = tripDays.value[0];
    const newActivity: TripActivity = {
      id: Date.now(),
      image: item.image,
      name: item.name,
      time: '00:00',
      cost: 0,
    };
    day.activities.push(newActivity);
  }
};

const addActivityToDay = (dayId: number) => {
  const day = tripDays.value.find(d => d.id === dayId);
  if (day) {
    const newActivity: TripActivity = {
      id: Date.now(),
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=100&h=75&fit:crop',
      name: 'New Activity',
      time: '00:00',
      cost: 0,
    };
    day.activities.push(newActivity);
  }
};

const updateActivity = (payload: { dayId: number, activityId: number, updatedData: TripActivity }) => {
  const day = tripDays.value.find(d => d.id === payload.dayId);
  if (day) {
    const activityIndex = day.activities.findIndex(a => a.id === payload.activityId);
    if (activityIndex !== -1) {
      payload.updatedData.cost = Number(payload.updatedData.cost);
      Object.assign(day.activities[activityIndex], payload.updatedData);
    }
  }
};

const deleteActivity = (payload: { dayId: number, activityId: number }) => {
  const day = tripDays.value.find(d => d.id === payload.dayId);
  if (day) {
    day.activities = day.activities.filter(a => a.id !== payload.activityId);
  }
};

const handleDragStart = (payload: { event: DragEvent, dayId: number, index: number }) => {
  const { event, dayId, index } = payload;
  const day = tripDays.value.find(d => d.id === dayId);
  if (day && event.dataTransfer) {
    draggedItem.value = {
      activity: day.activities[index],
      dayId: dayId,
      index: index,
    };
    event.dataTransfer.effectAllowed = 'move';
  }
};

const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
};

const handleDrop = (payload: { event: DragEvent, dropDayId: number, dropIndex: number }) => {
  const { event, dropDayId, dropIndex } = payload;
  event.preventDefault();
  if (!draggedItem.value) return;

  const sourceDay = tripDays.value.find(d => d.id === draggedItem.value?.dayId);
  const targetDay = tripDays.value.find(d => d.id === dropDayId);

  if (sourceDay && targetDay) {
    sourceDay.activities.splice(draggedItem.value.index, 1);
    targetDay.activities.splice(dropIndex, 0, draggedItem.value.activity);
  }

  draggedItem.value = null;
};

// --- View Navigation & Scrolling Logic ---
const homeSection = ref<HTMLElement | null>(null);
const planSection = ref<HTMLElement | null>(null); // This ref will now point to the PlanningNote component's root element

const navigateToView = (view: string) => {
  currentView.value = view;
  
  if (view === 'home' || view === 'plan') {
    router.push({ name: `maindashboard-${view}` }).then(() => {
      nextTick(() => {
        if (view === 'home' && homeSection.value) {
          homeSection.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (view === 'plan' && planSection.value) {
          planSection.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  } else {
    router.push({ name: `maindashboard-${view}` });
  }
};

const handleHomeAreaMouseIn = () => {
  if (homeSection.value && currentView.value === 'home') {
    homeSection.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};


// Handler for when a flight is selected in the Flight component
const handleFlightSelected = (flight: SelectedFlight) => {
  selectedFlight.value = flight;
  navigateToView('home'); 
};

// This is the correct and only version of the function you should have
const handleHotelSelected = (hotel: SelectedHotel) => {
  console.log('MainDashboard.vue: Received hotel data:', hotel);
  selectedHotel.value = hotel;
  navigateToView('home'); 
};

// Watch for route changes to update currentView
watch(route, (newRoute) => {
  if (newRoute.name === 'maindashboard-planning') {
    currentView.value = 'plan';
  } else if (newRoute.name === 'maindashboard-flight') {
    currentView.value = 'flight';
  } else if (newRoute.name === 'maindashboard-hotel') {
    currentView.value = 'hotel';
  } else if (newRoute.name === 'maindashboard') { // Default child route
    currentView.value = 'home';
  }
}, { immediate: true }); // Run immediately on component mount

// The new function to save the full trip plan to local storage
const saveTripPlan = () => {
  // Combine all the necessary data into a single object
  const currentPlan: TravelPlanWithActivities = {
    id: Date.now().toString(),
    destination: destination.value,
    startDate: formData.startDate,
    endDate: formData.endDate,
    budget: totalBudget.value,
    groupSize: formData.groupSize,
    transport: formData.transport,
    activities: formData.activities,
    otherActivity: formData.otherActivity,
    specialNeeds: formData.specialNeeds,
    tripDays: tripDays.value,
    selectedFlight: selectedFlight.value,
    selectedHotel: selectedHotel.value,
  };

  // Get existing plans, append the new one, and save
  const existingPlans = JSON.parse(localStorage.getItem('savedTripPlans') || '[]');
  existingPlans.push(currentPlan);
  localStorage.setItem('savedTripPlans', JSON.stringify(existingPlans));
  
  alert('Trip plan saved successfully!');
};
</script>

<style scoped>
/* Smooth transitions for view changes */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Ensure proper spacing for sections */
.max-w-7xl {
  scroll-margin-top: 2rem;
}

.max-w-4xl {
  scroll-margin-top: 2rem;
}
</style>