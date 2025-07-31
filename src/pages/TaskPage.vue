<template>
     <div class="task-card">
    <h2>{{ task.title }}</h2>
    <p><strong>Description:</strong> {{ task.description }}</p>
    <p><strong>Status:</strong> 
      <span :class="task.status === 'pending' ? 'status-pending' : 'status-completed'">{{ task.status }}</span>
    </p>
    <p><strong>Start Date:</strong> {{ task.start_date }}</p>
    <p><strong>End Date:</strong> {{ task.end_date }}</p>

    <p v-if="task.is_recurring">
      <strong>Recurring:</strong> Yes 
      <em>({{ task.recurrence_rule }} on {{ capitalize(task.weekly_day) }})</em>
    </p>

    <p><strong>Completed:</strong> 
      <span :class="task.is_completed ? 'status-completed' : 'status-not-completed'">
        {{ task.is_completed ? 'Yes' : 'No' }}
      </span>
    </p>

    <p class="timestamps">
      Created: {{ formatDate(task.created_at) }} • Updated: {{ formatDate(task.updated_at) }}
    </p>
  </div>
</template>

<script setup>
import  {ref, onMounted} from 'vue'
import { useRoute} from 'vue-router';
import api from '@/api'

const route = useRoute()
const task = ref({})
const task_Id = ref(route.params.id)


const capitalize = (str) => str?.charAt(0).toUpperCase() + str?.slice(1)
const formatDate = (dateStr) => new Date(dateStr).toLocaleString()

onMounted(async() => {
    try {
    const response = await api.get(`/tasks/${task_Id.value}`)
    task.value = response.data
  } catch (error) {
    console.error('Failed to fetch task:', error)
  }
})
</script>

<style scoped>
.task-card {
  max-width: 600px;
  margin: 40px auto;
  padding: 24px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

.task-card h2 {
  margin-bottom: 16px;
  font-size: 24px;
  color: #222;
}

.task-card p {
  margin-bottom: 10px;
  font-size: 15px;
}

.task-card strong {
  color: #444;
}

.status-pending {
  color: #d97706; /* amber-700 */
  font-weight: bold;
}

.status-completed {
  color: #059669; /* green-600 */
  font-weight: bold;
}

.status-not-completed {
  color: #dc2626; /* red-600 */
  font-weight: bold;
}

.timestamps {
  margin-top: 20px;
  font-size: 13px;
  color: #777;
}
</style>