<template>
<h1>Completed Tasks</h1>
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
            <td>{{ task.completed_at || 'Yes' }}</td>
            <td>
                <router-link class="btn btn-primary view-btn" :to="`/task/${task?.id}`">
                View
                </router-link>
            </td>
            <td>
                <button class="btn btn-warning undo-btn" @click="undoTask(task.id)">
                Undo
                </button>
            </td>
            </tr>
        </tbody>
        </table>

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

/* Move the table higher */
.task-table {
  margin-top: 0; /* remove extra spacing above */
}

.main-content {
  padding-left: 240px; /* space for sidebar */
  padding-top: 20px;   /* reduce to move table up */
}


    .task-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-family: Arial, sans-serif;
}

.task-table th,
.task-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.task-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.task-table tr:nth-child(even) {
  background-color: #fafafa;
}

.task-table .btn {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 5px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-warning {
  background-color: #ff9800;
  color: white;
  border: none;
}

.btn-warning:hover {
  background-color: #e68900;
}

.view-btn {
  width: 100%;
  display: block;
}

.undo-btn {
  width: 100%;
}

</style>