<template>
    <!-- Overdue Tasks -->
<section class="task-section">
  <h2>⚠️ Overdue Tasks</h2>

  <div v-if="tasks.length > 0">
    <table class="task-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>View</th>
          <th>Reschedule</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ task.title }}</td>
          <td>{{ task.description }}</td>
          <td>
            <router-link class="btn btn-view" :to="`/task/${task?.id}`">
              View
            </router-link>
          </td>
          <td>
            <router-link class="btn btn-reschedule" :to="`/task/edit/${task?.id}`">
              Reschedule
            </router-link>
          </td>
          <td>
            <button class="btn btn-delete" @click="deleteTask(task.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <p v-else>No overdue tasks yet.</p>
</section>

</template>


<script setup>
import api from '@/api';
import { ref, onMounted } from 'vue';

const tasks = ref([])

onMounted(async() => {
        try{
            const response = await api.get('/tasks/overdue')
            tasks.value = response.data
            // console.log(response.data)
        }catch(error){
            console.log(error)
        }
    }
)


</script>

<style scoped>
    .task-table {
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  width: calc(100% - 220px); /* Leave space for sidebar */
  margin-left: 220px;        /* Sidebar offset */
  margin-top: 60px;          /* Header offset */
  background-color: white;
  border: 1px solid #ddd;
}

.task-table th,
.task-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

.task-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.task-table tr:nth-child(even) {
  background-color: #fafafa;
}

/* Base Button Style */
.btn {
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: none;
  border: none;
  display: inline-block;
}

/* Individual Button Colors */
.btn-view {
  background-color: #4caf50;
  color: white;
}

.btn-reschedule {
  background-color: #2196f3;
  color: white;
}

.btn-delete {
  background-color: #f44336;
  color: white;
}

/* Hover Effects */
.btn:hover {
  opacity: 0.85;
}

</style>