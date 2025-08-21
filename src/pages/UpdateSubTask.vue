<template>
  <div style="display: flex; justify-content: center; align-items: center; min-height: 100vh;">
    <form 
      @submit.prevent="submitSubtask" 
      style="width: 440px; padding: 20px; background: #f9f9f9; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0,0,0,0.1);"
    >
      <h2 style="text-align: center; margin-bottom: 20px;">Update Subtask</h2>

      <div style="margin-bottom: 20px; border: 1px solid #ddd; padding: 15px; border-radius: 6px; background: #fff;">
        
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

        <!-- End Date -->
        <label style="font-size: 14px; margin-bottom: 5px; display: block;">End Date (Optional)</label>
        <input
          type="date"
          v-model="subtask.end_date"
          :min="today"
          style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin-bottom: 12px;"
        />
        <!-- Validation errors -->
        <div v-if="v$.subtask.end_date.$error" style="color: red; font-size: 13px;">
          <div v-for="err in v$.subtask.end_date.$errors" :key="err.$uid">
            {{ err.$message }}
          </div>
        </div>

      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        style="width: 100%; background: #3498db; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: bold;"
      >
        Update Subtask
      </button>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import api from '@/api'
import { useRoute, useRouter } from 'vue-router'
import useVuelidate from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'

const route = useRoute()
const router = useRouter()
const today = new Date().toISOString().split("T")[0]

const task_id = ref(route.params.task_id)
const subtask_id = ref(route.params.subtask_id)

const subtask = ref({ title: '', description: '', end_date: '', is_completed: false })
const parentTask = ref(null)

// Fetch parent task
onMounted(async () => {
  const response = await api.get(`/tasks/${task_id.value}`)
  parentTask.value = response.data
})

// Fetch subtask data
onMounted(async () => {
  try {
    const response = await api.get(`/tasks/subtasks/${subtask_id.value}`)
    subtask.value = response.data
  } catch (error) {
    console.error(error)
  }
})

// --- VALIDATIONS ---
// validator for "not before today"
const subtaskNotBeforeToday = helpers.withMessage(
  "Subtask end date cannot be before today",
  (value) => {
    if (!value) return true
    return value >= today
  }
)

// validator for "not later than task end"
const subtaskEndBeforeTaskEnd = helpers.withMessage(
  "Subtask end date cannot be later than the task's end date",
  (value) => {
    if (!value) return true
    if (!parentTask.value?.end_date) return true

    const subEnd = new Date(value)
    subEnd.setHours(0,0,0,0)
    const taskEnd = new Date(parentTask.value.end_date)
    taskEnd.setHours(0,0,0,0)

    return subEnd <= taskEnd
  }
)

const rules = computed(() => ({
  subtask: {
    title: { required },
    end_date: {
      subtaskNotBeforeToday,
      subtaskEndBeforeTaskEnd
    }
  }
}))

const v$ = useVuelidate(rules, { subtask })

//  SUBMIT 
const submitSubtask = async () => {
  const valid = await v$.value.$validate()
  if (!valid) return

  try {
    await api.put(`/tasks/subtasks/${subtask_id.value}`, subtask.value)
    alert("Subtask updated successfully!")
    router.push(`/task/${task_id.value}/subtasks`) // go back to subtasks list
  } catch (error) {
    console.error(error)
    alert("Failed to update subtask")
  }
}
</script>
