<template>
  <header class="header">
    <!-- Logo on the left -->
    <div class="logo">TaskMaster</div>

    <!-- Centered Auth Links -->
    <nav class="auth-buttons">
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
      <router-link to="/create/task">Add Task</router-link>
      <!-- <router-link to="/profile">Profile</router-link> -->
    </nav>

    <!-- Search bar on the right -->
    <div class="search-bar">
      <input type="text"
       placeholder="Search tasks..."
        v-model="searchQuery"
        @keyup.enter="perormSearch()"
        />
    </div>
  </header>
</template>

<script setup>
import {ref} from 'vue'
import { useRouter } from 'vue-router';

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

</script>

<style scoped>

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: #635757;
  border-bottom: 1px solid #ddd;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  z-index: 1000;
}


.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.auth-buttons {
  display: flex;
  gap: 16px;
}

.auth-buttons a {
  text-decoration: none;
  color: #0b0736;
  font-weight: 500;
}

.search-bar input {
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

</style>