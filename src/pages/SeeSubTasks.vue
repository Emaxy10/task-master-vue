<template>
  <div class="container">
    <!-- Parent Task Header -->
    <h2>{{ parentTask?.title }}</h2>
    <p class="subheader">{{ parentTask?.description }}</p>

    <div v-if="subtasks.length > 0">
    <!-- Subtasks Table -->
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(subtask, index) in subtasks" :key="subtask.id">
          <td>{{ index + 1 }}</td>
          <td>{{ subtask.title }}</td>
          <td>{{ subtask.description }}</td>
          <td class="actions">
            <router-link class="btn view" :to="`/task/${task_id}/subtasks/${subtask?.id}`">View</router-link>
            <button class="btn assign">Assign</button>
            <button class="">Update</button>
            <button class="btn delete" @click="deleteSubTask(subtask.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
     <p v-else>No Subtask yet.</p>
  </div>
</template>

<script setup>
import api from '@/api'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const task_id = ref(route.params.id)

const parentTask = ref(null)
const subtasks = ref([])

// fetch parent task
onMounted(async () => {
  try {
    const response = await api.get(`/tasks/${task_id.value}`)
    parentTask.value = response.data
  } catch (error) {
    console.error('Error fetching parent task:', error)
  }
})



// fetch subtasks

const fetchSubTasks = async () => {
  try {
    const response = await api.get(`/tasks/${task_id.value}/subtasks`)
    subtasks.value = response.data
  } catch (error) {
    console.error('Error fetching subtasks:', error)
  }
}

onMounted(fetchSubTasks)

const deleteSubTask = async (id) => {
  if (!confirm('Are you sure you want to delete this task?')) return
  try {
     await api.delete(`/tasks/subtasks/${id}`)
    fetchSubTasks()
  } catch (error) {
    console.error("Error deleting subtask:", error.message)
  }
}

</script>

<style scoped>
.container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

h2 {
  margin-bottom: 5px;
  font-size: 22px;
  color: #333;
}

.subheader {
  margin-bottom: 15px;
  color: #666;
  font-size: 15px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th, td {
  border: 1px solid #ccc;
  padding: 8px 12px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.actions {
  text-align: center;
}

.btn {
  padding: 5px 10px;
  margin: 0 3px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn.view {
  background-color: #007bff;
  color: white;
}

.btn.assign {
  background-color: #28a745;
  color: white;
}

.btn.delete {
  background-color: #dc3545;
  color: white;
}

.btn:hover {
  opacity: 0.85;
}
</style>
