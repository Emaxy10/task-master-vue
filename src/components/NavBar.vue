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
            @keyup.enter="perormSearch()"
          />
        </div>

        <router-link to="/" class="btn-danger" @click.prevent="logout">
          Logout
        </router-link>
        <!-- <router-link to="/profile">Profile</router-link> -->
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

const perormSearch = () =>{
   if (!searchQuery.value.trim()) return;

   try{
        router.push({ name: 'search_results', query: { q: searchQuery.value, type: 'tasks' } })
   }catch(error){
      console.error(error)
   }
  // alert('You searched')
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
</style>