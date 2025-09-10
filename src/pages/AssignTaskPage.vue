<template>
  <div class="task-card">
    <h2>Assign Task</h2>
    <h2 class="task-title">Title: {{ task.title }}</h2>
    <p class="task-desc">description: {{ task.description }}</p>
    <p class="task-date">Due: {{ task.due_date || "not set due date on this task"}}</p>

    <label for="assign" class="assign-label">Assign To:</label>
    <select id="assign" v-model="selectedUser" class="assign-select">
      <option value="" disabled>Select a user</option>
      <option v-for="user in users" :key="user.id" :value="user.id">
        {{ user.name }}
      </option>
    </select>

    <button @click="assignTask" class="assign-btn">Assign</button>
  </div>
<!-- <div v-for="user in users" :key="user.id" >
    {{ user.name }}
</div>
  {{ users }} -->
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/api";
import { useRoute, useRouter } from "vue-router";

const route = useRoute()
const router = useRouter()
const task_id = ref(route.params.id)

//console.log(task_id.value)

// static task for now
const task = ref({});

const users = ref([]);
const selectedUser = ref("");

onMounted(async () => {
  const response = await api.get(`/tasks/team/members`);
  users.value = response.data.members

  console.log(response.data.members)
});

onMounted(async() =>{
    const res = await api.get(`/tasks/${task_id.value}`)
    task.value = res.data

    //console.log(task.value)
})




const assignTask =async() => {
    try{
         if (!selectedUser.value) {
            alert("Please select a user");
            return;
        }
        console.log("Assigning task to user_id:", selectedUser.value);
        // here you can make an API call to assign
        await api.post(`/tasks/${task_id.value}/assign`, {
              user_id: selectedUser.value
          } )

        alert('This tasks has been assigned to your team member')
        router.push('/task/ongoing')
    }catch(error){
        if (error.response && error.response.status === 422) {
        alert("This user is already assigned to the task");
      } else {
        alert("Something went wrong while assigning the task");
        console.error(error.response?.data || error.message);
      }
    }
 
};
</script>

<style scoped>
.task-card {
  max-width: 400px;
  background: #f9f9f9;
  border-radius: 12px;
  padding: 20px;
  margin: 20px auto;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  font-family: Arial, sans-serif;
}

.task-title {
  font-size: 1.4rem;
  color: #2c3e50;
  margin-bottom: 8px;
}

.task-desc {
  font-size: 1rem;
  color: #555;
  margin-bottom: 6px;
}

.task-date {
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 15px;
}

.assign-label {
  font-size: 0.95rem;
  font-weight: bold;
  margin-right: 8px;
}

.assign-select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-bottom: 12px;
  width: 100%;
}

.assign-btn {
  padding: 10px 15px;
  background: #3498db;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.assign-btn:hover {
  background: #2980b9;
}
</style>
