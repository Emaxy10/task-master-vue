<template>
  <!-- Ongoing Tasks -->
  <section class="task-section">
    <h2>⏳ Ongoing Tasks</h2>

    <div v-if="tasks.length > 0">
      <table class="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.id">
            <td>{{ task.title }}</td>
            <td>{{ task.description }}</td>
            <td><router-link class="btn btn-assign"
               :to="`/task/${task?.id}/assign`">
               Assign
              </router-link></td>
            <td>
              <router-link class="btn btn-view" :to="`/task/${task?.id}`">
                View
              </router-link>
            </td>
            <td>
              <button class="btn btn-done" @click="taskComplete(task.id)">
                Done
              </button>
            </td>
            <td>
              <router-link
                class="btn btn-reschedule"
                :to="`/task/edit/${task?.id}`"
              >
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

    <p v-else class="empty-msg">🚫 No ongoing tasks yet.</p>
  </section>
</template>

<script setup>
import api from '@/api';
import { ref, onMounted } from 'vue';

const tasks = ref([])

const fetchTask = async() =>{
    try{
        const response = await api.get('/tasks/ongoing')
        tasks.value = response.data
       // console.log(response.data)
    }catch(error){
        console.error(error)
    }
    
}



onMounted(fetchTask)


const deleteTask = async (id) => {
  if (!confirm('Are you sure you want to delete this task?')) return
  try {
    await api.delete(`/tasks/${id}`)
    fetchTask()
  } catch (error) {
    console.error('Delete failed:', error)
  }
}

const taskComplete = async (id) => {
  if (!confirm('Are you sure you are done this task?')) return
  try {
    await api.patch(`/tasks/${id}/complete`)
    fetchTask()
  } catch (error) {
    console.error(' Action failed:', error)
  }
}


</script>


<style scoped>
.task-section {
  padding: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

h2 {
  margin-bottom: 16px;
  font-size: 1.4rem;
  font-weight: 600;
  color: #222;
}

/* Table */
.task-table {
  width: calc(100% - 220px);
  margin-left: 220px; /* sidebar offset */
  margin-top: 60px; /* header offset */
  border-collapse: collapse;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.task-table th,
.task-table td {
  padding: 12px 14px;
  text-align: center;
  font-size: 0.95rem;
  border-bottom: 1px solid #eee;
}

.task-table th {
  background-color: #f5f6fa;
  font-weight: 600;
  color: #444;
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
  padding: 7px 14px;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
  text-decoration: none;
  border: none;
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}

/* Button Variants */
.btn-view {
  background-color: #28a745;
  color: #fff;
}
.btn-done {
  background-color: #6c63ff;
  color: #fff;
}
.btn-reschedule {
  background-color: #2196f3;
  color: #fff;
}
.btn-delete {
  background-color: #f44336;
  color: #fff;
}
.btn-assign{
  background-color: #fffb0f;
  color: #fff;
}

/* Empty message */
.empty-msg {
  margin-top: 20px;
  font-style: italic;
  color: #666;
}
</style>