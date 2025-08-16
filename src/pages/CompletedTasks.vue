<template>
  <div class="completed-container">
    <h1>✅ Completed Tasks</h1>

    <table class="task-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Completed</th>
          <th>View</th>
          <th>Undo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ task.title }}</td>
          <td>{{ task.description }}</td>
          <td>
            <span class="badge badge-success">
              {{ task.completed_at ? task.completed_at : 'Yes' }}
            </span>
          </td>
          <td>
            <router-link class="btn btn-primary" :to="`/task/${task?.id}`">
              View
            </router-link>
          </td>
          <td>
            <button class="btn btn-warning" @click="undoTask(task.id)">
              Undo
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import api from '@/api';
import { ref, onMounted } from 'vue';

const tasks = ref([])



const fetchTask = async() => {
        try{
            const response = await api.get('/tasks/completed')
            tasks.value = response.data
            // console.log(response.data)
        }catch(error){
            console.log(error)
        }
    }

const undoTask = async(id) =>{
  try{
    const response = await api.patch(`tasks/${id}/status/undo`)
    console.log(response.data)
    fetchTask()
  }catch(error){
    console.error(error)
  }
}

onMounted(fetchTask)


</script>

<style scoped>
.completed-container {
  padding: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

h1 {
  margin-bottom: 20px;
  font-size: 1.6rem;
  font-weight: 600;
  color: #222;
}

/* Table */
.task-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.task-table th,
.task-table td {
  padding: 14px 16px;
  text-align: left;
  font-size: 0.95rem;
}

.task-table thead {
  background: #f5f6fa;
  color: #444;
  font-weight: 600;
}

.task-table tr {
  transition: background 0.2s ease;
}
.task-table tr:hover {
  background: #f9fbff;
}

.task-table tr:nth-child(even) {
  background-color: #fcfcfc;
}

/* Buttons */
.btn {
  display: inline-block;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  border: none;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
}
.btn-primary:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.btn-warning {
  background-color: #ff9800;
  color: #fff;
}
.btn-warning:hover {
  background-color: #e68900;
  transform: translateY(-2px);
}

/* Badges */
.badge {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}
.badge-success {
  background-color: #e6f7e9;
  color: #28a745;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
</style>