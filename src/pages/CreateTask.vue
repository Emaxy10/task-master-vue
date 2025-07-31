<template>
  <div class="task-form-container">
    <div class="task-form-box">
      <h2>Create New Task</h2>

      <form @submit.prevent="handleSubmit">
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

        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            v-model="task.description"
            placeholder="Optional task description"
          ></textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="start_date">Start Date</label>
            <input id="start_date" type="date" v-model="task.start_date" />
          </div>

          <div class="form-group">
            <label for="end_date">End Date</label>
            <input id="end_date" type="date" v-model="task.end_date" />
          </div>

          <!-- <div class="form-group">
            <label for="due_date">Due Date</label>
            <input id="due_date" type="date" v-model="task.due_date" />
          </div> -->
        </div>

        <!-- <div class="form-group">
          <label for="status">Status *</label>
          <select id="status" v-model="task.status" required>
            <option value="">Select status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
        </div> -->

        <div class="form-row checkbox-row">
          <!-- <label>
            <input type="checkbox" v-model="task.is_completed" />
            Mark as Completed
          </label> -->

          <label>
            <input type="checkbox" v-model="task.is_recurring" />
            Is Recurring?
          </label>
        </div>

        <div class="form-group" v-if="task.is_completed">
          <label for="completed_at">Completed At</label>
          <input
            id="completed_at"
            type="date"
            v-model="task.completed_at"
          />
        </div>

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

<!-- Weekly options -->
<div class="form-group" v-if="task.is_recurring && task.recurrence_rule === 'weekly'">
  <label>Select a Day</label>
  <div class="radio-group days">
    <label v-for="day in daysOfWeek" :key="day.value">
      <input
        type="radio"
        :value="day.value"
        v-model="task.weekly_day"
      />
      {{ day.label }}
    </label>
  </div>
</div>

<!-- Custom rule -->
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


        <button type="submit" class="submit-btn">Save Task</button>
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


    const response = await api.post('/tasks', formData);
    console.log(response.data)

    router.push('/profile')

  }catch(error){
    console.error('Task could not be created:', error.response?.data || error.message);
  }
  console.log('Submitted Task:', task.value)

  // You can post to your backend with axios or fetch
}
</script>

<style scoped>
.radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin: 10px 0;
}

.radio-group.days {
  gap: 10px;
  flex-direction: column;
  max-height: 200px;
}

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
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

h2 {
  text-align: center;
  margin-bottom: 25px;
  color: #2c3e50;
}

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

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  font-size: 15px;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #0056b3;
}
</style>
