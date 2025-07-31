<template>
  <div class="profile-container">
    <h1>{{ user?.name }}'s Task Dashboard</h1>

    <!-- Completed Tasks -->
    <section class="task-section">
      <h2>Completed Tasks</h2>
      <div v-if="completedTasks.length > 0">
        <div class="task-card" v-for="task in completedTasks" :key="task.id">
          <h3>{{ task.title }}</h3>
          <p>{{ task.description }}</p>
          <p><strong>Completed:</strong> {{ task.completed_at || 'Yes' }}</p>
          <router-link class="button" :to="`/task/${task?.id}`">View</router-link>
        </div>
      </div>
      <p v-else>No completed tasks yet.</p>
    </section>

    <!-- Ongoing Tasks -->
    <section class="task-section">
      <h2>Ongoing Tasks</h2>
      <div v-if="ongoingTasks.length > 0">
        <div class="task-card ongoing" v-for="task in ongoingTasks" :key="task.id">
          <h3>{{ task.title }}</h3>
          <p>{{ task.description }}</p>
          <p><strong>Status:</strong> {{ task.status }}</p>
          <div class="task-actions">
            <router-link class="button" :to="`/task/edit/${task?.id}`">Reschedule</router-link>
            <router-link class="view-btn" :to="`/task/${task?.id}`">View</router-link>
             <button  @click="completeTask(task.id)">Mark as Done</button>           
              <button class="delete-btn" @click="deleteTask(task.id)">Delete</button>
          </div>
        </div>
      </div>
      <p v-else>No ongoing tasks at the moment.</p>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import api from '@/api'

const authStore = useAuthStore()
const user = authStore.user
const tasks = ref([])

const completedTasks = computed(() =>
  tasks.value.filter(task => task.status === 'completed')
)

const ongoingTasks = computed(() =>
  tasks.value.filter(task => task.status !== 'completed')
)

const deleteTask = async (id) => {
  if (!confirm('Are you sure you want to delete this task?')) return

  try {
    await api.delete(`/tasks/${id}`)
    tasks.value = tasks.value.filter(task => task.id !== id)
  } catch (error) {
    console.error('Delete failed:', error)
  }
}

const completeTask = async(id) => {
  try{
      await api.patch(`/tasks/${id}/status`)
      await fetchTasks() // Refresh the task list
  }catch(error){
    console.error(error)
  }
}


// onMounted(async () => {
//   try {
//     const response = await api.get('/user/tasks')
//     tasks.value = response.data.tasks
//     //console.log(tasks.value)
//   } catch (error) {
//     console.error('Error fetching tasks:', error)
//   }
// })

const fetchTasks = async () => {
  try {
    const response = await api.get('/user/tasks')
    tasks.value = response.data.tasks
  } catch (error) {
    console.error('Error fetching tasks:', error)
  }
}

onMounted(() => {
  fetchTasks()
})

</script>


<style scoped>
.profile-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.task-section {
  margin-bottom: 40px;
}

.task-section h2 {
  color: #444;
  margin-bottom: 15px;
}

.task-card {
  background: #f9f9f9;
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.task-card h3 {
  margin: 0 0 8px;
  color: #222;
}

.task-card p {
  margin: 4px 0;
}

.task-actions {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.task-actions button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  font-size: 14px;
}

.task-actions .delete-btn {
  background-color: #dc3545;
}

.task-actions .view-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: lightgreen;
  color: #070707;
  font-size: 14px;
}

.task-actions button:hover {
  opacity: 0.9;
}

.ongoing {
  border-left: 4px solid #007bff;
}

.button {
  padding: 0.5rem 1rem;
  background-color: #4f46e5; /* Indigo-600 */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
}
</style>
