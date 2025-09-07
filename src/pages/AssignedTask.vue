<template>
  <div>
    <h2 class="title">Assigned Tasks</h2>

    <table class="task-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Status</th>
          <th>Priority</th>
          <th>Assignees</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in assignedTasks" :key="task.id">
          <td>{{ task.title }}</td>
          <td>{{ task.description }}</td>
          <td>{{ task.start_date }}</td>
          <td>{{ task.end_date }}</td>
          <td>{{ task.status }}</td>
          <!-- Priority with color -->
          <td :class="['priority', task.priority.toLowerCase()]">
            {{ task.priority }}
          </td>
          <td>
            <ul>
              <li v-for="assignee in task.assignees" :key="assignee.id">
                {{ assignee.name }} ({{ assignee.email }})
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import api from '@/api'
import { onMounted, ref } from 'vue';

const assignedTasks = ref([])

onMounted(async () => {
  const response = await api.get('/tasks/assigned');
  assignedTasks.value = response.data.assigned_task
})
</script>

<style scoped>
.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
}

.task-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 2px 6px rgba(0,0,0,0.05);
}

.task-table th, 
.task-table td {
  padding: 12px 16px;
  border: 1px solid #ddd;
  text-align: left;
}

.task-table th {
  background-color: #f4f6f8;
  font-weight: bold;
}

.task-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

/* Priority colors */
.priority.high {
  color: #b71c1c;       /* dark red */
  font-weight: bold;
}

.priority.medium {
  color: #f57f17;       /* amber/orange */
  font-weight: bold;
}

.priority.low {
  color: #1b5e20;       /* green */
  font-weight: bold;
}
</style>
