<template>
  <nav class="navbar">
    <div class="nav-container">
      <!-- Logo -->
      <div class="nav-logo" >
        <RouterLink :to="{ name: 'home' }">
              <img
                src="@/assets/triplogo.png"
                alt="Home"
                class="w-10 h-10"
              />
            </RouterLink>
      </div>

      <!-- Desktop Navigation -->
      <div class="nav-menu" :class="{ active: isMobileMenuOpen }">
        <!-- Authentication buttons -->
        <div v-if="!isLoggedIn" class="auth-buttons">
            <RouterLink to="login"
             class="nav-btn login-btn" >
            Log in</RouterLink>
    
           <RouterLink to="signup"
             class="nav-btn signup-btn" >
            Sign up
            </RouterLink>
         
        </div>

        <!-- Profile dropdown when logged in -->
        <div v-else class="profile-section">
          <div 
            class="profile-dropdown" 
            @click="toggleProfileDropdown"
            ref="profileDropdown"
          >
            <div class="profile-avatar">
              <img 
                v-if="user?.avatar" 
                :src="user.avatar" 
                :alt="user.name"
                class="avatar-img"
              />
              <span v-else class="avatar-placeholder">
                {{ user?.name?.charAt(0)?.toUpperCase() || 'U' }}
              </span>
            </div>
            <span class="profile-name">{{ user?.name || 'Profile' }}</span>
            <svg 
              class="dropdown-arrow" 
              :class="{ rotated: isProfileDropdownOpen }"
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
            >
              <polyline points="6,9 12,15 18,9"></polyline>
            </svg>
          </div>

          <!-- Dropdown menu -->
          <div 
            v-if="isProfileDropdownOpen" 
            class="dropdown-menu"
            @click.stop
          >
            <div class="dropdown-item" @click="handleProfile">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              My Profile
            </div>
            <div class="dropdown-item" @click="handleSettings">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              Settings
            </div>
            <div class="dropdown-divider"></div>
            <div class="dropdown-item logout" @click="handleLogout">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16,17 21,12 16,7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Logout
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile menu toggle -->
      <div class="mobile-menu-toggle" @click="toggleMobileMenu">
        <span class="hamburger-line" :class="{ active: isMobileMenuOpen }"></span>
        <span class="hamburger-line" :class="{ active: isMobileMenuOpen }"></span>
        <span class="hamburger-line" :class="{ active: isMobileMenuOpen }"></span>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Types
interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

// Props
interface Props {
  isLoggedIn?: boolean
  user?: User | null
}

const props = withDefaults(defineProps<Props>(), {
  isLoggedIn: false,
  user: null
})

// Emits
const emit = defineEmits<{
  login: []
  signup: []
  logout: []
  profile: []
  settings: []
  home: []
}>()

// Reactive state
const isMobileMenuOpen = ref(false)
const isProfileDropdownOpen = ref(false)
const profileDropdown = ref<HTMLElement | null>(null)

// Methods
const goToHome = (): void => {
  emit('home')
  closeMobileMenu()
}

const handleLogin = (): void => {
  emit('login')
  closeMobileMenu()
}

const handleSignup = (): void => {
  emit('signup')
  closeMobileMenu()
}

const handleLogout = (): void => {
  emit('logout')
  closeProfileDropdown()
  closeMobileMenu()
}

const handleProfile = (): void => {
  emit('profile')
  closeProfileDropdown()
  closeMobileMenu()
}

const handleSettings = (): void => {
  emit('settings')
  closeProfileDropdown()
  closeMobileMenu()
}

const toggleMobileMenu = (): void => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = (): void => {
  isMobileMenuOpen.value = false
}

const toggleProfileDropdown = (): void => {
  isProfileDropdownOpen.value = !isProfileDropdownOpen.value
}

const closeProfileDropdown = (): void => {
  isProfileDropdownOpen.value = false
}

// Handle outside clicks for dropdown
const handleOutsideClick = (event: Event): void => {
  if (profileDropdown.value && !profileDropdown.value.contains(event.target as Node)) {
    closeProfileDropdown()
  }
}

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
})
</script>

<style scoped>
.navbar {
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 80px;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.nav-logo {
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease;
 
}

.nav-logo:hover {
  transform: scale(1.05);
   background-color: transparent;
  
}
/* Add this to your scoped styles section */

.nav-logo a {
  background-color: transparent !important;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.nav-logo a:hover {
  background-color: transparent !important;
  text-decoration: none;
}

.nav-logo a:focus {
  background-color: transparent !important;
  outline: none;
}

.nav-logo a:active {
  background-color: transparent !important;
}

.nav-logo a:visited {
  background-color: transparent !important;
}

.logo-icon {
  display: inline-block;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  color: white;
  text-align: center;
  line-height: 40px;
  border-radius: 10px;
  margin-right: 12px;
  font-size: 20px;
  font-weight: 700;
}

.logo-text {
  font-size: 24px;
  font-weight: 700;
  color: #333;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 20px;
}

.auth-buttons {
  display: flex;
  gap: 12px;
}

.nav-btn {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.login-btn {
  background: transparent;
  color: #666;
  border: 2px solid #e9ecef;
}

.login-btn:hover {
  color: #333;
  border-color: #dee2e6;

}

.signup-btn {
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  color: white;
  box-shadow: 0 2px 10px rgba(255, 107, 107, 0.3);
}

.signup-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
}

.profile-section {
  position: relative;
}

.profile-dropdown {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.profile-dropdown:hover {
  background: #f8f9fa;
}

.profile-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  color: white;
  font-weight: 600;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  font-size: 14px;
}

.profile-name {
  font-weight: 600;
  color: #333;
  font-size: 14px;
}

.dropdown-arrow {
  transition: transform 0.3s ease;
  color: #666;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  padding: 8px 0;
  min-width: 180px;
  margin-top: 8px;
  border: 1px solid #e9ecef;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 14px;
  color: #333;
}

.dropdown-item:hover {
  background: #f8f9fa;
}

.dropdown-item.logout {
  color: #dc3545;
}

.dropdown-item.logout:hover {
  background: #fff5f5;
}

.dropdown-divider {
  height: 1px;
  background: #e9ecef;
  margin: 8px 0;
}

.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
  padding: 8px;
}

.hamburger-line {
  width: 25px;
  height: 3px;
  background: #333;
  margin: 3px 0;
  transition: 0.3s;
  border-radius: 2px;
}

.hamburger-line.active:nth-child(1) {
  transform: rotate(-45deg) translate(-5px, 6px);
}

.hamburger-line.active:nth-child(2) {
  opacity: 0;
}

.hamburger-line.active:nth-child(3) {
  transform: rotate(45deg) translate(-5px, -6px);
}

@media (max-width: 768px) {
  .mobile-menu-toggle {
    display: flex;
  }

  .nav-menu {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }

  .nav-menu.active {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .auth-buttons {
    flex-direction: column;
    width: 100%;
    gap: 12px;
  }

  .nav-btn {
    width: 100%;
    padding: 12px 20px;
  }

  .profile-dropdown {
    justify-content: center;
  }

  .dropdown-menu {
    position: static;
    box-shadow: none;
    border: none;
    margin-top: 12px;
    width: 100%;
  }
}
</style>