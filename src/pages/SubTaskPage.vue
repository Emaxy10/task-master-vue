<template>
  <div style="display: flex; justify-content: center; align-items: center; min-height: 100vh;">
    <div style="width: 400px; padding: 20px; background: #f9f9f9; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0,0,0,0.1);">
      <h2 style="text-align: center;">Subtasks</h2>

      <div v-for="(subtask, index) in task.subtasks" :key="index" style="margin-bottom: 15px; border: 1px solid #ddd; padding: 10px; border-radius: 5px;">
        <input
          type="text"
          v-model="subtask.title"
          placeholder="Subtask title"
          style="width: 100%; padding: 8px; margin-bottom: 8px; border: 1px solid #ccc; border-radius: 4px;"
        />

        <textarea
          v-model="subtask.description"
          placeholder="Subtask description"
          style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;"
        ></textarea>

        <button
          type="button"
          @click="removeSubtask(index)"
          style="margin-top: 8px; background: red; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer;"
        >
          Remove Subtask
        </button>
      </div>

      <button
        type="button"
        @click="addSubtask"
        style="width: 100%; background: green; color: white; border: none; padding: 8px; border-radius: 4px; cursor: pointer;"
      >
        + Add Subtask
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const task = ref({
  subtasks: [
    { title: '', description: '', is_completed: false }
  ]
})

const addSubtask = () => {
  task.value.subtasks.push({ title: '', description: '', is_completed: false })
}

const removeSubtask = (index) => {
  task.value.subtasks.splice(index, 1)
}
</script>
