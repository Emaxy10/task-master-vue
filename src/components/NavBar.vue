<template>
  <header class="header">
    <!-- Logo -->
    <div class="logo">TaskMaster</div>

    <!-- Auth Links & Search -->
    <nav class="auth-buttons">
  <div v-if="authStore.user === null" class="links">
    <router-link to="/login" class="btn-link">Login</router-link>
    <router-link to="/register" class="btn-primary">Register</router-link>
  </div>

  <div v-else class="user-section">
    <!-- Search bar -->
    <div class="search-bar">
      <input
        type="text"
        placeholder="🔍 Search tasks..."
        v-model="searchQuery"
        @keyup.enter="performSearch()"
      />
    </div>

    <!-- Profile Dropdown -->
    <div class="profile-dropdown" @click="toggleDropdown">
      <div class="avatar">
        {{ getInitials(authStore.user.name) }}
      </div>
      <div v-if="showDropdown" class="dropdown-menu">
        <p class="dropdown-username">{{ authStore.user.name }}</p>
        <router-link to="/" class="dropdown-item">Profile</router-link>
        <button class="dropdown-item logout-btn" @click.prevent="logout">
          Logout
        </button>
      </div>
    </div>
  </div>
</nav>

  </header>
</template>

<script setup>
import {ref} from 'vue'
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const searchQuery = ref('')
const router = useRouter()
const showDropdown = ref(false)

const performSearch = () =>{
   if (!searchQuery.value.trim()) return;

   try{
        router.push({ name: 'search_results', query: { q: searchQuery.value, type: 'tasks' } })
   }catch(error){
      console.error(error)
   }
  // alert('You searched')
}

function toggleDropdown() {
  showDropdown.value = !showDropdown.value
}

function getInitials(name) {
  if (!name) return "U"
  return name.split(" ").map(n => n[0]).join("").toUpperCase()
}

function logout() {
    try{
        authStore.clearTokens()
        router.push('/login')
    }catch(error){
        console.error('An error occured',error)
    }
 
}



</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background: linear-gradient(90deg, #4b3f3f, #635757);
  color: #fff;
  border-bottom: 2px solid #ddd;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 65px;
  z-index: 1000;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}

.logo {
  font-size: 1.6rem;
  font-weight: bold;
  letter-spacing: 1px;
}

.auth-buttons {
  display: flex;
  align-items: center;
  gap: 16px;
}

.links, .user-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Buttons */
.btn-link {
  color: #eee;
  padding: 6px 12px;
  border-radius: 6px;
  transition: background 0.3s;
}
.btn-link:hover {
  background: rgba(255,255,255,0.15);
}

.btn-primary {
  background: #2e86de;
  color: #fff;
  padding: 6px 14px;
  border-radius: 6px;
  font-weight: 500;
  transition: background 0.3s;
}
.btn-primary:hover {
  background: #1e70c9;
}

.btn-danger {
  background: #e74c3c;
  color: #fff;
  padding: 6px 14px;
  border-radius: 6px;
  font-weight: 500;
  transition: background 0.3s;
}
.btn-danger:hover {
  background: #c0392b;
}

/* Search */
.search-bar input {
  padding: 8px 14px;
  border-radius: 20px;
  border: none;
  outline: none;
  min-width: 220px;
  transition: all 0.3s;
}
.search-bar input:focus {
  box-shadow: 0 0 6px rgba(255,255,255,0.6);
}


.user-section {
  display: flex;
  align-items: center;
  gap: 15px;
}

.search-bar input {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
}

.profile-dropdown {
  position: relative;
  cursor: pointer;
}

.avatar {
  width: 40px;
  height: 40px;
  background: #007bff;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 50px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  min-width: 150px;
  z-index: 10;
}

.dropdown-menu p {
  margin: 0;
  padding: 10px;
  font-weight: bold;
  border-bottom: 1px solid #eee;
  color: #333;
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: 10px;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
  text-decoration: none;
  transition: background 0.2s;
}

.dropdown-item:hover {
  background: #f5f5f5;
}

.logout-btn {
  color: #dc2626;
  font-weight: bold;
}

</style>