<template>
  <div class="profile-container">
    <h1>{{ user?.name }}'s Task Dashboard</h1>

    <!-- Filters -->
    <div class="filters">
      <label>
        Status:
        <select v-model="selectedStatus">
          <option value="all">All</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="overdue">Overdue</option>
        </select>
      </label>

      <label>
        Priority:
        <select v-model="selectedPriority">
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>
    </div>

    <!-- Unified Task Table -->
    <section class="task-section">
      <div v-if="filteredTasks.length > 0">
        <table class="task-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Priority</th>
              <th>View</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in filteredTasks" :key="task.id">
              <td>{{ task.title }}</td>
              <td>{{ task.description }}</td>
              <td>
                <span :class="['status-badge', task.status]">
                  {{ getTaskStatus(task) }}
                </span>
              </td>
              <td>
                <span :class="['priority-badge', task.priority]">
                  {{ task.priority }}
                </span>
              </td>
              <td>
                <router-link class="btn btn-primary" :to="`/task/${task?.id}`">View</router-link>
              </td>
              <td>
                <button class="btn btn-danger" @click="deleteTask(task.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else>No tasks found for the selected filters.</p>
    </section>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import api from '@/api'

const authStore = useAuthStore()
const user = authStore.user
const tasks = ref([])

const selectedStatus = ref('all')
const selectedPriority = ref('all')

const normalize = dateStr => new Date(dateStr + 'T23:59:59')

// Function to determine task status
const getTaskStatus = (task) => {
  if (task.status === 'completed') return 'Completed'
  if (task.status === 'pending') {
    if (task.end_date && normalize(task.end_date) < new Date() &&
        (task.is_completed === null || task.is_completed === 0)) {
      return 'Overdue'
    }
    return 'Ongoing'
  }
  return 'Unknown'
}

// Priority color style
// const getPriorityStyle = (priority) => {
//   const colorMap = {
//     low: 'green',
//     medium: 'orange',
//     high: 'red'
//   }
//   return { color: colorMap[priority?.toLowerCase()] || 'black' }
// }

// Filtered tasks
const filteredTasks = computed(() => {
  return tasks.value.filter(task => {
    const statusMatch =
      selectedStatus.value === 'all' || getTaskStatus(task).toLowerCase() === selectedStatus.value

    const priorityMatch =
      selectedPriority.value === 'all' || task.priority?.toLowerCase() === selectedPriority.value

    return statusMatch && priorityMatch
  })
})

const fetchTasks = async () => {
  try {
    const response = await api.get('/user/tasks')
    tasks.value = response.data.tasks
  } catch (error) {
    console.error('Error fetching tasks:', error)
  }
}

const deleteTask = async (id) => {
  if (!confirm('Are you sure you want to delete this task?')) return
  try {
    await api.delete(`/tasks/${id}`)
    tasks.value = tasks.value.filter(task => task.id !== id)
  } catch (error) {
    console.error('Delete failed:', error)
  }
}

onMounted(fetchTasks)
</script>


<style scoped>
/* Container */
.profile-container {
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Filters */
.filters {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}
.filters label {
  font-weight: 500;
}
select {
  margin-left: 8px;
  padding: 5px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

/* Table */
.task-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.task-table th, .task-table td {
  padding: 12px 15px;
  text-align: left;
}
.task-table thead {
  background-color: #f5f5f5;
}
.task-table tr:nth-child(even) {
  background-color: #fafafa;
}

/* Status badges */
.status-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: capitalize;
}
.status-badge.ongoing {
  background-color: #eaf4ff;
  color: #1a73e8;
}
.status-badge.completed {
  background-color: #e6f7e9;
  color: #28a745;
}
.status-badge.overdue {
  background-color: #ffeaea;
  color: #dc3545;
}

/* Priority badges */
.priority-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: capitalize;
}
.priority-badge.low {
  background-color: #f1f8e9;
  color: #4caf50;
}
.priority-badge.medium {
  background-color: #fff8e1;
  color: #ff9800;
}
.priority-badge.high {
  background-color: #ffebee;
  color: #f44336;
}

/* Buttons */
.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
}
.btn-primary {
  background-color: #007bff;
  color: white;
}
.btn-primary:hover {
  background-color: #0056b3;
}
.btn-danger {
  background-color: #dc3545;
  color: white;
}
.btn-danger:hover {
  background-color: #a71d2a;
}
</style>