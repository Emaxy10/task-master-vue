
<template>
  <div class="subtask-card">
    <div class="subtask-card__header">
      <h1 class="subtask-card__title">{{ subtask?.title || 'Untitled Subtask' }}</h1>
      <span
        class="subtask-card__badge"
        :class="subtask?.is_completed ? 'is-completed' : 'is-pending'"
      >
        {{ subtask?.is_completed ? 'Completed' : 'Pending' }}
      </span>
    </div>

    <p class="subtask-card__desc">
      {{ subtask?.description || 'No description provided.' }}
    </p>

    <div class="subtask-card__meta">
      <div class="meta-item">
        <span class="meta-label">End date:</span>
        <span class="meta-value">{{ subtask?.end_date || '—' }}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Assigned to:</span>
        <span class="meta-value">Emmanuel Chigozie</span>
      </div>
    </div>
  </div>
</template>

    


<script setup>
    import { useRoute } from 'vue-router';
    import { onMounted, ref } from 'vue';
    import api from '@/api';

    const route = useRoute()

    //const task_id = ref(route.params.task_id)
    const subtask_id = ref(route.params.subtask_id)
    const subtask = ref({});
    console.log(subtask_id.value)



    onMounted( async() =>{
        try{
            const response = await api.get(`/tasks/subtasks/${subtask_id.value}`)
            subtask.value = response.data

            console.log(subtask.value )
        }catch(error){
            console.error(error)
        }
    })
</script>


<style scoped>
.subtask-card {
  max-width: 720px;
  margin: 16px auto;
  padding: 20px;
  background: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 14px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.06);
}

.subtask-card__header {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
  margin-bottom: 12px;
}

.subtask-card__title {
  font-size: 20px;
  line-height: 1.2;
  margin: 0;
  color: #1f2937; /* dark gray */
  word-break: break-word;
}

.subtask-card__badge {
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid #ddd;
  user-select: none;
  white-space: nowrap;
}

.subtask-card__badge.is-completed {
  background: #ecfdf5;        /* light green */
  border-color: #a7f3d0;
}

.subtask-card__badge.is-pending {
  background: #fff7ed;        /* light orange */
  border-color: #fed7aa;
}

.subtask-card__desc {
  margin: 8px 0 16px;
  color: #4b5563; /* gray-600 */
  line-height: 1.6;
}

.subtask-card__meta {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
  padding-top: 12px;
  border-top: 1px dashed #e6e6e6;
}

.meta-item {
  display: flex;
  gap: 8px;
}

.meta-label {
  color: #6b7280; /* gray-500 */
  min-width: 80px;
}

.meta-value {
  color: #111827; /* gray-900 */
  font-weight: 500;
}

/* Small screens */
@media (max-width: 420px) {
  .subtask-card {
    padding: 16px;
  }
  .subtask-card__title {
    font-size: 18px;
  }
}
</style>