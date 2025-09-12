<template>
  <div class="team-container">
    <h2>Team Members</h2>

    <table class="team-table" v-if="team.length">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th v-if="authStore.user?.subscription?.plan==='team' && isAdminOrSupervisor">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="member in team" :key="member.id">
          <td>{{ member.name }}</td>
          <td>{{ member.email }}</td>
          <td v-if="authStore.user?.subscription?.plan==='team' && isAdminOrSupervisor">
            <button class="remove-btn" @click="removeMember(member.id)">
              Remove Member
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else class="no-members">No members found</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import api from "@/api";
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const user_roles = computed(() => authStore.user?.roles || []);

const team = ref([]);

const fetchData = async () => {
  try {
    const response = await api.get("/tasks/team/members");
    if (response.data.status === 200) {
      team.value = response.data.members;
      console.log(team.value);
    } else {
      alert("An error occurred while fetching team members");
    }
  } catch (error) {
    console.error(error);
  }
};

// check if user is admin or supervisor
const isAdminOrSupervisor = computed(() =>
  user_roles.value.some(role => role.name === "admin" || role.name === "supervisor")
);

const removeMember = async (id) => {
  if (!confirm("Are you sure you want to remove this member?")) return;

  try {
    const response = await api.delete(`/tasks/team/members/${id}`);
    if (response.data.status === 200) {
      // filter out the removed member
      team.value = team.value.filter((member) => member.id !== id);
      alert("Member removed successfully");
      fetchData()
    } else {
      alert("An error occurred while removing member");
    }
  } catch (error) {
    console.error(error);
    alert("Error removing member");
  }
};

onMounted(fetchData);
</script>

<style scoped>
.team-container {
  max-width: 700px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: #fafafa;
}

.team-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.team-table th,
.team-table td {
  border: 1px solid #ddd;
  padding: 0.8rem;
  text-align: left;
}

.team-table th {
  background-color: #f0f0f0;
}

.remove-btn {
  background: red;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}

.remove-btn:hover {
  background: darkred;
}

.no-members {
  margin-top: 1rem;
  color: #555;
  font-style: italic;
}
</style>
