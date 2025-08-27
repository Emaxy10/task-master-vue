<template>
  <div class="register-container">
    <div class="register-box">
      <h2>Create an Account</h2>

      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            id="name"
            v-model="user.name"
            type="text"
            required
            placeholder="Your full name"
          />
        </div><div v-if="isSubmitted && v$.name.$error">
          <span style="color: red;" v-if="v$.name.required.$invalid"> Username is required</span>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="user.userEmail"
            type="email"
            required
            placeholder="you@example.com"
          />
        </div>
        
      <div v-if="isSubmitted && v$.userEmail.$error">
          <span style="color: red;" v-if="v$.userEmail.required.$invalid"> Email is required</span><br>
          <span style="color: red;" v-if="v$.userEmail.emailIsValid.$invalid"> {{ v$.userEmail.emailIsValid.$message }}</span>
      </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="user.password"
            type="password"
            required
            placeholder="Create a password"
          />
        </div>
          <div v-if="isSubmitted && v$.password.$error">
          <span style="color: red;" v-if="v$.password.required.$invalid"> Password is required</span>
          <span style="color: red;" v-if="v$.password.minLength.$invalid"> Password be at least 8 characters</span><br>
          <span style="color: red;" v-if="v$.password.containsNumber.$invalid"> {{ v$.password.containsNumber.$message }}</span><br>
          <span style="color: red;" v-if="v$.password.containsSpecialChar.$invalid">{{ v$.password.containsSpecialChar.$message }}</span><br>
          <span style="color: red;" v-if="v$.password.containsCapitalLetter.$invalid"> {{ v$.password.containsCapitalLetter.$message }}</span><br>
      </div>

        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            v-model="user.confirmPassword"
            type="password"
            required
            placeholder="Confirm your password"
          />
        </div>

           <div v-if="isSubmitted && v$.confirmPassword.$error">
          <span style="color: red;" v-if="v$.confirmPassword.required.$invalid"> confirm password is required</span><br>
          <span style="color: red;" v-if="v$.confirmPassword.sameAsPassword.$invalid"> Password does not match</span>
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
import { ref, computed } from 'vue'
import api from '@/api'
import useVuelidate from '@vuelidate/core';
import { required,  minLength, helpers, email } from '@vuelidate/validators'
import router from '@/router';

 // Custom validators
    const containsSpecialChar = (value) => /[!@#$%^&*()\-_=+{};:,<.>]/.test(value);
    const containsNumber = (value) => /\d/.test(value);
    const containsCapitalLetter = (value) => /[A-Z]/.test(value);
    const emailIsValid = (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);

    const passwordMatch = () => {
        const password = user.value.password;
        const confirm_pass = user.value.confirmPassword;

        return confirm_pass === password
    }

     //set validation rules

     const rules = computed(() => {
        return{
            name: {required},

            userEmail: {required, email,
                emailIsValid: helpers.withMessage(
                    'Please use a valid email.',
                    emailIsValid
                ),
            },
            password: {required, minLength: minLength(8),
                containsSpecialChar: helpers.withMessage(
                'Password must contain at least one special character.',
                containsSpecialChar
            ), containsNumber: helpers.withMessage(
                'Password must contain at least one number.',
                containsNumber
            ),
            containsCapitalLetter: helpers.withMessage(
                'Password must contain at least one capital letter.',
                containsCapitalLetter
            ),
            },
            confirmPassword:{required,
                 sameAsPassword: helpers.withMessage(
                    'Passwords do no match,',
                    passwordMatch
                 )}
        };  
       
    });


const user = ref({
  name:"",
  userEmail:"",
  password:"",
  confirmPassword:""
})

 //initialize vuelidate
  const v$ = useVuelidate(rules, user)

  // Track if the form has been submitted
   const isSubmitted = ref(false);

const handleRegister = async() => {

  // Mark the form as submitted
     isSubmitted.value = true;
  
  // Add registration logic here (e.g., API call with axios)
    // Validate form
       const isValid = await v$.value.$validate();
        if(!isValid){
            console.error('Validation error', v$.value.$errors);
            return;
        }

        try{
            const formData = new FormData()
            formData.append('name', user.value.name)
            formData.append('email', user.value.userEmail)
            formData.append('password', user.value.password)

            const response = await api.post(`/register`, formData)
            alert("Registration Sucessful")

            console.log("Rgistration Sucessful", response.data)
            router.push('/login')
        }catch(error){
          console.error('Registration failed:', error.response?.data || error.message);
        }
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
