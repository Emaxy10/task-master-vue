<template>
    <h1>Hi</h1>
</template>

<script setup>
import  {ref, onMounted} from 'vue'
import { useRoute} from 'vue-router';
import api from '@/api'

const route = useRoute()
const task = ref()
const task_Id = ref(route.params.id)

onMounted(async() => {
    const response = await api.get(`/tasks/${task_Id.value}`)
    task.value = response.data

    console.log(task.value)
})
</script>