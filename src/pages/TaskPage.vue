<template>
  <div class="task-card">
    <!-- Header -->
    <div class="task-header">
      <h2>{{ task.title }}</h2>
      <span :class="['badge', task.status === 'pending' ? 'badge-pending' : 'badge-completed']">
        {{ task.status }}
      </span>
    </div>

    <!-- Body -->
    <div class="task-body">
      <p><strong>Description:</strong> {{ task.description }}</p>
      
      <div class="task-dates">
        <p><strong>Start:</strong> {{ task.start_date }}</p>
        <p><strong>End:</strong> {{ task.end_date }}</p>
      </div>

      <p v-if="task.is_recurring">
        <strong>Recurring:</strong> 
        <span class="badge badge-recurring">
          {{ task.recurrence_rule }} ({{ capitalize(task.weekly_day) }})
        </span>
      </p>

      <p>
        <strong>Completed:</strong> 
        <span :class="task.is_completed ? 'badge badge-completed' : 'badge badge-not-completed'">
          {{ task.is_completed ? 'Yes' : 'No' }}
        </span>
      </p>
    </div>

    <!-- Footer -->
    <div class="task-footer">
      <div>
        <small>Created: {{ formatDate(task.created_at) }}</small>
        <small>Updated: {{ formatDate(task.updated_at) }}</small>
      </div>

      <!-- Add Subtask Button (only if not completed AND end date not passed) -->
      <button 
        v-if="canAddSubtask"
        class="btn-subtask" 
        @click="addSubtask"
      >
        + Add Subtask
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api'

const route = useRoute()
const router = useRouter()
const task = ref({})
const task_Id = ref(route.params.id)

const capitalize = (str) => str?.charAt(0).toUpperCase() + str?.slice(1)
const formatDate = (dateStr) => new Date(dateStr).toLocaleString()

// ✅ Computed property to decide if subtask button should show
const canAddSubtask = computed(() => {
  if (!task.value) return false

  // If task is completed → no subtasks allowed
  if (task.value.is_completed) return false

  // If no end_date → allow subtasks
  if (!task.value.end_date) return true

  // Compare end_date with today
  const now = new Date()
  const endDate = new Date(task.value.end_date)

  return now <= endDate
})

const addSubtask = () => {
  //alert(`Add subtask for task ID: ${task_Id.value}`)
  router.push(`/tasks/${task_Id.value}/subtasks/create`)
}

onMounted(async () => {
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
  max-width: 650px;
  margin: 30px auto;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.07);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.task-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.1);
}

/* Header */
.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.task-header h2 {
  font-size: 22px;
  font-weight: 600;
  color: #1f2937;
}

/* Body */
.task-body p {
  margin: 8px 0;
  font-size: 15px;
  line-height: 1.5;
  color: #374151;
}

.task-dates {
  display: flex;
  gap: 20px;
  margin: 10px 0;
}

/* Footer */
.task-footer {
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #6b7280;
}

/* Badges */
.badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
}

.badge-pending {
  background-color: #fef3c7;
  color: #b45309;
}

.badge-completed {
  background-color: #d1fae5;
  color: #065f46;
}

.badge-not-completed {
  background-color: #fee2e2;
  color: #b91c1c;
}

.badge-recurring {
  background-color: #e0f2fe;
  color: #0369a1;
}

/* Add Subtask Button */
.btn-subtask {
  background-color: #3b82f6;
  color: #fff;
  border: none;
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-subtask:hover {
  background-color: #2563eb;
}
</style>
