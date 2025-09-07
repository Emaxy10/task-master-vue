<template>
  <div class="add-member-container">
    <!-- Section 1: Search -->
    <section class="search-section">
      <h2>Add Member</h2>
      <input
        type="email"
        v-model="searchEmail"
        placeholder="Enter user email"
        @keyup.enter="searchUser"
        class="search-bar"
      />
      <button @click="searchUser" class="search-btn">Search</button>
    </section>

    <!-- Section 2: Results -->
    <section class="result-section">
      <div v-if="loading" class="loading">Searching...</div>

      <div v-else-if="user">
        <h3>User Found</h3>
        <p><strong>Name:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <button class="add-btn" @click="addMember">Add Member</button>
      </div>

      <div v-else-if="notFound" class="not-found">
        User not found
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "@/api";
import { useRouter } from "vue-router";

const searchEmail = ref("");
const user = ref(null);
const notFound = ref(false);
const loading = ref(false);

const router = useRouter()


const searchUser = async () =>  {
  if (!searchEmail.value) return;

  loading.value = true;
  user.value = null;
  notFound.value = false;

    try{

        const response = await api.get(`/tasks/user/${searchEmail.value}/email`)
        user.value = response.data

       // console.log(user.value)
        notFound.value = false;

    }catch(error){
        console.error(error)
         notFound.value = true;
    }finally{
        loading.value = false
    }

}

// const addMember = async () =>{
//     try{
//         const response = await api.patch(`/tasks/user/add/${user.value.id}/member`);
//         if(response.data.status !== 200){
//            alert('An error occured')
//         }
//         alert('Added to Team')
        

//     }catch(error){
//         console.error(error)
//     }
// }

const addMember = async () => {
  try {
    const response = await api.patch(`/tasks/user/add/${user.value.id}/member`);

    if (response.data.status === 200) {
      alert(response.data.message || "Added to Team");
      router.push('/team')
    } else {
      alert(response.data.message || "An error occurred while adding member");
    }
  } catch (error) {
    if (error.response) {
      // Error from server (e.g., 400 "already has supervisor")
      alert(error.response.data.message || "Server error occurred");
    } else if (error.request) {
      // No response from server
      alert("No response from server. Please check your connection.");
    } else {
      // Something else went wrong
      alert("Unexpected error: " + error.message);
    }
  }
};

</script>

<style scoped>
.add-member-container {
  max-width: 500px;
  margin: 2rem auto;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: #fafafa;
}

.search-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.search-bar {
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.search-btn {
  padding: 0.6rem;
  border: none;
  background: #2c3e50;
  color: white;
  border-radius: 8px;
  cursor: pointer;
}

.search-btn:hover {
  background: #1a252f;
}

.result-section {
  margin-top: 1.5rem;
  padding: 1rem;
  border-top: 1px solid #ddd;
}

.loading {
  color: #555;
  font-style: italic;
}

.not-found {
  color: red;
  font-weight: bold;
}

.add-btn {
  margin-top: 0.8rem;
  padding: 0.6rem 1rem;
  background: green;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.add-btn:hover {
  background: darkgreen;
}
</style>
