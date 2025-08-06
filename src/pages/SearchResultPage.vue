<template>

  <div class="search-results">
    <h1>Search: {{ searchTerm }}</h1>

    <div class="task-card ongoing" v-for="task in tasks" :key="task.id">
      <h3>{{ task.title }}</h3>
      <p>{{ task.description }}</p>
      <p><strong>Status:</strong> {{ task.status }}</p>

      <div class="task-actions">
        <router-link class="button" :to="`/task/edit/${task?.id}`">Reschedule</router-link>
        <router-link class="view-btn" :to="`/task/${task?.id}`">View</router-link>
        <!-- <button @click="completeTask(task.id)">Mark as Done</button>
        <button class="delete-btn" @click="deleteTask(task.id)">Delete</button> -->
      </div>
    </div>
  </div>
</template>

<script setup>
    import { useRoute } from 'vue-router';
    import {ref, onMounted} from 'vue'
    import api from '@/api';

    const route = useRoute()

    const searchTerm = ref(route.query.q || '')
    const searchType = ref(route.query.type)
    const tasks = ref([])

    onMounted(async() => {
        if( searchType.value === 'tasks'){
            const response = await api.get(`/tasks/search/${searchTerm.value}`)
            tasks.value = response.data

            console.log(tasks.value)
        }
    })




</script>

<style scoped>
.search-results {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

h1 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #333;
}

.task-card {
  background: #f9f9f9;
  border-left: 5px solid #007BFF;
  padding: 1rem 1.5rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
}

.task-card:hover {
  transform: scale(1.01);
}

.task-card h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.task-card p {
  margin: 0.3rem 0;
  color: #666;
}

.task-actions {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.button,
.view-btn,
button {
  padding: 0.5rem 1rem;
  border: none;
  text-decoration: none;
  cursor: pointer;
  font-size: 0.95rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.button {
  background-color: #007BFF;
  color: white;
}

.view-btn {
  background-color: #28a745;
  color: white;
}

button {
  background-color: #6c757d;
  color: white;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.button:hover,
.view-btn:hover,
button:hover,
.delete-btn:hover {
  opacity: 0.9;
}
</style>