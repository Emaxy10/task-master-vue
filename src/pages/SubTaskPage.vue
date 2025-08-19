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
          :min="today"
          style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin-bottom: 12px;"
        />
          <div v-if="v$.task.subtasks?.$each?.[index]?.end_date?.$error" style="color: red; font-size: 13px;">
            <div v-for="err in v$.task.subtasks.$each[index].end_date.$errors" :key="err.$uid">
              {{ err.$message }}
            </div>
          </div>





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
import { onMounted, ref, computed } from 'vue'
import api from '@/api'
import { useRoute, useRouter } from 'vue-router'
import useVuelidate from '@vuelidate/core'
import { helpers,required } from '@vuelidate/validators'




const route = useRoute()
const router = useRouter()

const taskId = route.params.id
const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

const parentTask = ref(null)

onMounted(async () => {
  const response = await api.get(`/tasks/${taskId}`)
  parentTask.value = response.data
})



// Compare subtask end_date with task end_date
// const subtaskEndBeforeTaskEnd = (getTaskEndDate) => helpers.withMessage(
//   "Subtask end date cannot be later than the task's end date",
//   (value) => {
//     if (!value) return true // allow empty if optional
//      const taskEndDate = getTaskEndDate()
//     if (!taskEndDate) return true // no parent end_date set

//     const subEnd = new Date(value)
//     subEnd.setHours(0,0,0,0)
//     const taskEnd = new Date(taskEndDate)
//     taskEnd.setHours(0,0,0,0)

//     return subEnd <= taskEnd // OR taskEnd => subEnd
//   }
// )

// const rules = computed(() => ({
//   task: {
//     subtasks: {
//       $each: {
//         title: { required },
//         end_date: { subtaskEndBeforeTaskEnd(() => parentTask.value?.end_date) }
//       }
//     }
//   }
// }))

// const rules = computed(() => ({
//   task: {
//     subtasks: {
//       $each: {
//         title: { required },
//         end_date: {
//           subtaskEndBeforeTaskEnd: subtaskEndBeforeTaskEnd(() => parentTask.value?.end_date)
//         }
//       }
//     }
//   }
// }))

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
  task: {
    subtasks: {
      $each: {
        title: { required },
        end_date: {
          subtaskNotBeforeToday,
          subtaskEndBeforeTaskEnd
        }
      }
    }
  }
}))





const task = ref({
  subtasks: [
    { title: '', description: '', end_date: '', is_completed: false }
  ]
})

const v$ = useVuelidate(rules, { task })

const addSubtask = () => {
  task.value.subtasks.push({ title: '', description: '', end_date: '', is_completed: false })
}

const removeSubtask = (index) => {
  task.value.subtasks.splice(index, 1)
}

const submitSubtasks = async() => {
  try{
      //upload subtask
    //   const formData = new FormData()

     
    // task.value.subtasks.forEach((subtask, index) => {
    //   formData.append(`subtasks[${index}][title]`, subtask.title)
    //   formData.append(`subtasks[${index}][description]`, subtask.description)
    //   formData.append(`subtasks[${index}][end_date]`, subtask.end_date || '') // optional
    //   formData.append(`subtasks[${index}][is_completed]`, 0)
    // })

     await api.post(`/tasks/${taskId}/subtasks`, {
      subtasks: task.value.subtasks
    })
    alert("Subtasks submitted successfully!")
    router.push('/tasks')
  }catch(error){
     console.error("Error submitting subtasks:", error.response?.data || error)
  }

}
</script>
