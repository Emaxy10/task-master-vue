<template>
     <div>
    <h2 class="title">Assigned Tasks</h2>

    <div 
      v-for="task in assignedTasks" 
      :key="task.id" 
      class="task-card"
    >
      <h3>{{ task.title }}</h3>
      <p>{{ task.description }}</p>
      <p><strong>Start:</strong> {{ task.start_date }}</p>
      <p><strong>End:</strong> {{ task.end_date }}</p>
      <p><strong>Status:</strong> {{ task.status }}</p>
      <p><strong>Priority:</strong> {{ task.priority }}</p>

      <div class="assignees">
        <strong>Assigned To:</strong>
        <ul>
          <li v-for="assignee in task.assignees" :key="assignee.id">
            {{ assignee.name }} ({{ assignee.email }})
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from '@/api'
import { onMounted, ref } from 'vue';

const assignedTasks = ref([])

onMounted(async() => {
    const response = await api.get('/tasks/assigned');
    assignedTasks.value = response.data.assigned_task

    console.log(assignedTasks.value);
})

</script>

<style scoped>
.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
}

.task-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 20px;
  background: #f9f9f9;
  box-shadow: 0px 2px 6px rgba(0,0,0,0.05);
}

.task-card h3 {
  margin-bottom: 8px;
  color: #333;
}

.assignees ul {
  margin: 6px 0 0;
  padding-left: 20px;
  list-style-type: disc;
}
</style>