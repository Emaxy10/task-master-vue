<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Welcome TaskMaster</h2>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="user.email"
            type="email"
            required
            placeholder="you@example.com"
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="user.password"
            type="password"
            required
            placeholder="Enter your password"
          />
        </div>

        <div class="form-footer">
          <RouterLink to="/forgot-password">Forgot Password?</RouterLink>
        </div>

        <button type="submit" class="submit-btn">Login</button>
        <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/api'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
//import { email } from '@vuelidate/validators'

const authStore = useAuthStore()
const errorMessage = ref('');

const user = ref({
  email:"",
  password:"",
})

const handleLogin = async () => {
  try{
      const formData = new FormData()
      formData.append('email', user.value.email)
      formData.append('password', user.value.password)

      const response = await api.post(`/login`, formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    }
    })
    console.log(response.data)

    authStore.setTokens({
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
    });

    authStore.setUser(response.data.user)
    router.push('/')
  }catch(error){
     errorMessage.value = 'Login failed. Please check your credentials.';
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background-color: #f0f2f5;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.login-box {
  background-color: #ffffff;
  padding: 30px 40px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 25px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #444;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 15px;
  transition: border-color 0.3s;
}

input[type="email"]:focus,
input[type="password"]:focus {
  border-color: #007bff;
  outline: none;
}

.form-footer {
  text-align: right;
  margin-bottom: 20px;
}

.form-footer a {
  font-size: 0.9rem;
  color: #007bff;
  text-decoration: none;
}

.form-footer a:hover {
  text-decoration: underline;
}

.submit-btn {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #0056b3;
}
</style>
