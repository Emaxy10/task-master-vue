<template>
  <div style="display: flex; justify-content: center; align-items: center; min-height: 100vh;">
    <form 
      @submit.prevent="submitSubtasks" 
      style="width: 440px; padding: 20px; background: #f9f9f9; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0,0,0,0.1);"
    >
      <h2 style="text-align: center; margin-bottom: 20px;">Subtasks</h2>

      <div 
        v-for="(subtask, index) in task.subtasks" 
        :key="index" 
        style="margin-bottom: 20px; border: 1px solid #ddd; padding: 15px; border-radius: 6px; background: #fff;"
      >
        <!-- Title -->
        <input
          type="text"
          v-model="subtask.title"
          placeholder="Subtask title"
          required
          style="width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 4px;"
        />

        <!-- Description -->
        <textarea
          v-model="subtask.description"
          placeholder="Subtask description"
          style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; min-height: 60px; margin-bottom: 10px;"
        ></textarea>

        <!-- End Date (Optional) -->
        <label style="font-size: 14px; margin-bottom: 5px; display: block;">End Date (Optional)</label>
        <input
          type="date"
          v-model="subtask.end_date"
          style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin-bottom: 12px;"
        />

        <!-- Add + Remove Buttons Side by Side -->
        <div style="display: flex; justify-content: space-between; margin-top: 8px;">
          <button
            type="button"
            @click="removeSubtask(index)"
            style="flex: 1; margin-right: 6px; background: #e74c3c; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;"
          >
            Remove
          </button>

          <button
            type="button"
            @click="addSubtask"
            style="flex: 1; background: #27ae60; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;"
          >
            + Add
          </button>
        </div>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        style="width: 100%; background: #3498db; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: bold;"
      >
        Submit Subtasks
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const task = ref({
  subtasks: [
    { title: '', description: '', end_date: '', is_completed: false }
  ]
})

const addSubtask = () => {
  task.value.subtasks.push({ title: '', description: '', end_date: '', is_completed: false })
}

const removeSubtask = (index) => {
  task.value.subtasks.splice(index, 1)
}

const submitSubtasks = () => {
  console.log("Submitted subtasks:", task.value.subtasks)
  alert("Subtasks submitted! Check console for details.")
}
</script>
