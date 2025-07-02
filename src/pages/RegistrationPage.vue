<template>
  <div class="register-container">
    <div class="register-box">
      <h2>Create an Account</h2>

      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            id="name"
            v-model="name"
            type="text"
            required
            placeholder="Your full name"
          />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            placeholder="you@example.com"
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            placeholder="Create a password"
          />
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            required
            placeholder="Confirm your password"
          />
        </div>

        <button type="submit" class="submit-btn">Register</button>

        <div class="login-link">
          Already have an account?
          <RouterLink to="/login">Login</RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const handleRegister = () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match.')
    return
  }

  console.log('Registering:', {
    name: name.value,
    email: email.value,
    password: password.value,
  })

  // Add registration logic here (e.g., API call with axios)
}
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  background-color: #f0f2f5;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.register-box {
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

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 15px;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #007bff;
  outline: none;
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
  margin-bottom: 15px;
}

.submit-btn:hover {
  background-color: #0056b3;
}

.login-link {
  text-align: center;
  font-size: 0.95rem;
  color: #333;
}

.login-link a {
  color: #007bff;
  text-decoration: none;
  margin-left: 5px;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
