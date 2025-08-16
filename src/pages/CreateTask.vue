<template>
  <div class="task-form-container">
    <div class="task-form-box">
      <h2>Create New Task</h2>

      <form @submit.prevent="handleSubmit">
        <!-- Title -->
        <div class="form-group">
          <label for="title">Title *</label>
          <input
            id="title"
            v-model="task.title"
            type="text"
            required
            maxlength="255"
            placeholder="Task title"
          />
        </div>

        <!-- Description -->
        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            v-model="task.description"
            placeholder="Optional task description"
          ></textarea>
        </div>

        <!-- Dates -->
        <div class="form-row">
          <div class="form-group">
            <label for="start_date">Start Date</label>
            <input id="start_date" type="date" v-model="task.start_date" />
          </div>

          <div class="form-group">
            <label for="end_date">End Date</label>
            <input id="end_date" type="date" v-model="task.end_date" />
          </div>
        </div>

        <!-- Priority + Recurring -->
        <div class="form-row checkbox-row">
          <!-- Priority -->
          <div class="form-group">
            <label><strong>Priority:</strong></label>
            <div class="radio-group priority">
              <label class="low">
                <input type="radio" value="low" v-model="task.priority" hidden />
                <span>Low</span>
              </label>
              <label class="medium">
                <input type="radio" value="medium" v-model="task.priority" hidden />
                <span>Medium</span>
              </label>
              <label class="high">
                <input type="radio" value="high" v-model="task.priority" hidden />
                <span>High</span>
              </label>
            </div>
          </div>

          <!-- Recurring -->
          <label>
            <input type="checkbox" v-model="task.is_recurring" />
            Is Recurring?
          </label>
        </div>

        <!-- Completed At -->
        <div class="form-group" v-if="task.is_completed">
          <label for="completed_at">Completed At</label>
          <input id="completed_at" type="date" v-model="task.completed_at" />
        </div>

        <!-- Recurrence Rule -->
        <div class="form-group" v-if="task.is_recurring">
          <label>Recurrence Rule</label>
          <div class="radio-group">
            <label>
              <input type="radio" value="daily" v-model="task.recurrence_rule" />
              Daily
            </label>
            <label>
              <input type="radio" value="weekly" v-model="task.recurrence_rule" />
              Weekly
            </label>
            <label>
              <input type="radio" value="custom" v-model="task.recurrence_rule" />
              Custom
            </label>
          </div>
        </div>

        <!-- Weekly Options -->
        <div class="form-group" v-if="task.is_recurring && task.recurrence_rule === 'weekly'">
          <label>Select a Day</label>
          <div class="radio-group days">
            <label
              v-for="day in daysOfWeek"
              :key="day.value"
              class="day-pill"
            >
              <input type="radio" :value="day.value" v-model="task.weekly_day" hidden />
              <span>{{ day.label }}</span>
            </label>
          </div>
        </div>

        <!-- Custom Reminder -->
        <div class="form-row" v-if="task.is_recurring && task.recurrence_rule === 'custom'">
          <div class="form-group">
            <label for="custom_date">Reminder Date</label>
            <input type="date" id="custom_date" v-model="task.custom_date" />
          </div>

          <div class="form-group">
            <label for="custom_time">Reminder Time</label>
            <input type="time" id="custom_time" v-model="task.custom_time" />
          </div>
        </div>

        <!-- Submit -->
        <button type="submit" class="submit-btn">
          Save Task
        </button>
      </form>
    </div>
  </div>
</template>


<script setup>
import api from '@/api'
import { ref } from 'vue'
import router from '@/router';

const daysOfWeek = [
  { label: 'Monday', value: 'monday' },
  { label: 'Tuesday', value: 'tuesday' },
  { label: 'Wednesday', value: 'wednesday' },
  { label: 'Thursday', value: 'thursday' },
  { label: 'Friday', value: 'friday' },
  { label: 'Saturday', value: 'saturday' },
  { label: 'Sunday', value: 'sunday' }
]

const task = ref({
  title: '',
  description: '',
  start_date: '',
  end_date: '',
  due_date: '',
  status: '',
  priority:'',
  is_completed: false,
  completed_at: '',
  is_recurring: false,
  recurrence_rule: '',     // daily | weekly | custom
  weekly_day: '',          // used when recurrence_rule === 'weekly'
  custom_date: '',         // used when recurrence_rule === 'custom'
  custom_time: '',         // used when recurrence_rule === 'custom'
})


const handleSubmit = async() => {
  try{

    const formData = new FormData()

    formData.append('title', task.value.title)
    formData.append('description', task.value.description || '')
    formData.append('start_date', task.value.start_date || '')
    formData.append('end_date', task.value.end_date || '')
    formData.append('due_date', task.value.due_date || '')
    formData.append('status', 'pending')
    formData.append('priority', task.value.priority || '')
    formData.append('is_completed', task.value.is_completed ? '1' : '0')
    formData.append('completed_at', task.value.completed_at || '')
    formData.append('is_recurring', task.value.is_recurring ? '1' : '0')
    formData.append('recurrence_rule', task.value.recurrence_rule || '')

    // Add weekly_day only if recurrence is weekly
    if (task.value.recurrence_rule === 'weekly') {
      formData.append('weekly_day', task.value.weekly_day || '')
    }

    // Add custom_date and custom_time only if recurrence is custom
    if (task.value.recurrence_rule === 'custom') {
      formData.append('custom_date', task.value.custom_date || '')
      formData.append('custom_time', task.value.custom_time || '')
    }

    // console.log(task.value.priority)


    const response = await api.post('/tasks', formData);
    console.log(response.data)

    router.push('/tasks')

  }catch(error){
    console.error('Task could not be created:', error.response?.data || error.message);
  }
  console.log('Submitted Task:', task.value)

  // You can post to your backend with axios or fetch
}
</script>

<style scoped>
/* Layout */
.task-form-container {
  min-height: 100vh;
  background-color: #f8f9fb;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
}

.task-form-box {
  background-color: #ffffff;
  padding: 30px 40px;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

h2 {
  text-align: center;
  margin-bottom: 25px;
  color: #2c3e50;
}

/* Form Elements */
.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #333;
}

input[type="text"],
input[type="date"],
textarea,
select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  resize: vertical;
  transition: border-color 0.3s;
}

textarea {
  min-height: 80px;
}

input:focus,
textarea:focus,
select:focus {
  border-color: #007bff;
  outline: none;
}

.form-row {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.form-row .form-group {
  flex: 1;
  min-width: 150px;
}

.checkbox-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.checkbox-row label {
  font-weight: normal;
  color: #555;
}

/* Submit Button */
.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #28a745;
  color: white;
  font-size: 15px;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #218838;
}

/* Priority Radios */
.radio-group.priority {
  display: flex;
  gap: 10px;
}

.radio-group.priority label {
  flex: 1;
  text-align: center;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 6px;
  padding: 8px 0;
  font-weight: 600;
  transition: all 0.3s ease;
}

.radio-group.priority input {
  display: none;
}

.radio-group.priority span {
  display: inline-block;
  width: 100%;
  padding: 6px 0;
  border-radius: 6px;
}

/* Priority Colors */
.low span {
  border: 2px solid #28a745;
  color: #28a745;
}
.low input:checked + span {
  background: #28a745;
  color: #fff;
}

.medium span {
  border: 2px solid #ff9800;
  color: #ff9800;
}
.medium input:checked + span {
  background: #ff9800;
  color: #fff;
}

.high span {
  border: 2px solid #dc3545;
  color: #dc3545;
}
.high input:checked + span {
  background: #dc3545;
  color: #fff;
}

/* Days Pills */
.radio-group.days {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.day-pill {
  cursor: pointer;
}

.day-pill span {
  display: inline-block;
  padding: 8px 14px;
  border: 2px solid #007bff;
  border-radius: 20px;
  color: #007bff;
  font-weight: 600;
  transition: all 0.3s ease;
}

.day-pill input {
  display: none;
}

.day-pill input:checked + span {
  background: #007bff;
  color: #fff;
}
</style>