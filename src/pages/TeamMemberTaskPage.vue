<template>
    <div>
    <h2 class="title">My Tasks</h2>
    <table class="task-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>End Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ task.title }}</td>
          <td>{{ task.description }}</td>
          <td>{{ task.end_date }}</td>
          <td>
            <span :class="task.status">{{ task.status }}</span>
          </td>
          <td>
            <router-link class="btn info" :to="`/task/${task?.id}`">
                  View
            </router-link>
            <button class="btn done"
             @click="markDone(task.id)" 
             :disabled="task.status === 'completed'"
             >Done</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import api from '@/api';
import { onMounted, ref } from 'vue';

const tasks = ref([])

const fetchTask = async () =>{
    try{
        
        const response = await api.get('/tasks/team/member/tasks');
        tasks.value = response.data
        console.log(tasks.value)
        
    }catch(error){
        console.error(error)
    }
}



const markDone = async (id) => {
  if (!confirm('Are you sure you are done this task?')) return
  try {
    await api.patch(`/tasks/${id}/complete`)
    fetchTask()
  } catch (error) {
    console.error(' Action failed:', error)
  }
}



onMounted(fetchTask)



</script>


<style>
.title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
}

.task-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.task-table th,
.task-table td {
  border: 1px solid #ccc;
  padding: 8px 12px;
  text-align: left;
}

.task-table th {
  background-color: #f5f5f5;
}

.task-table tr:nth-child(even) {
  background-color: #fafafa;
}

.pending {
  color: #c97a00;
  font-weight: bold;
}

.done {
  color: #2a7c2a;
  font-weight: bold;
}

.btn {
  padding: 6px 12px;
  margin-right: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.btn.info {
  background-color: #007bff;
  color: white;
}

.btn.info:hover {
  background-color: #0056b3;
}

.btn.done {
  background-color: #28a745;
  color: white;
}

.btn.done:hover {
  background-color: #1e7e34;
}

.btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  color: #666;
}
</style>