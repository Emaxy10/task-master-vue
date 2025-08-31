<template>
  <div>
    <main>
      <h1 class="welcome-title">Welcome to TaskMaster</h1>
      <p class="welcome-subtext">
        Organize your day and boost your productivity with our simple and efficient task management app.
      </p>

      <!-- Dashboard cards -->
      <div class="cards-container">
        <!-- Task Summary -->
        <div class="card">
          <h2>📊 Task Summary</h2>
          <ul>
            <li><strong>Total Tasks:</strong> {{ tasks.length || 0 }}</li>
            <li><strong>Ongoing:</strong> {{ onGoingTasks || 0 }}</li>
            <li><strong>Completed:</strong> {{ completedTasks || 0}}</li>
            <li><strong>Overdue:</strong> {{ overdueTasks || 0}}</li>
          </ul>
        </div>

        <!-- High Priority -->
        <div class="card">
          <h2>🔥 High Priority</h2>
          <p class="highlight">{{ highPriorityTasks }}</p>
          <p>Tasks that need urgent attention</p>
        </div>

        <!-- Team Members -->
        <div class="card">
          <h2>👥 Team Members</h2>
          <p class="highlight">7</p>
          <p>Active team members collaborating</p>
        </div>
      </div>
    </main>

   

  </div>
</template>


<script setup>
import api from '@/api';
import { onMounted, ref } from 'vue';

const tasks = ref([]);

const onGoingTasks = ref()

const overDueTasks = ref()
const completedTasks = ref()

const highPriorityTasks = ref()

const todays_date = new Date()


const fetchTasks = async () => {
  try {
    const response = await api.get('/user/tasks')
    tasks.value = response.data.tasks

    // Count ongoing tasks
    onGoingTasks.value = tasks.value.filter(task => {
      const taskEndDate = new Date(task.end_date); // convert string to Date

     return (
        task.status === 'pending' &&
        taskEndDate >= todays_date &&
        task.is_completed == 0   // use == since API returns 0/1, not boolean
      );

    }).length;


    // Count Overdue tasks
    overDueTasks.value = tasks.value.filter(task => {
      const taskEndDate = new Date(task.end_date); // convert string to Date

     return (
        task.status === 'pending' &&
        taskEndDate < todays_date &&
        task.is_completed == 0   // use == since API returns 0/1, not boolean
      );

    }).length;
    

        // Count Complete tasks
    completedTasks.value = tasks.value.filter(task => {

     return (
        task.status === 'completed' &&
        task.is_completed == 1   // use == since API returns 0/1, not boolean
      );

    }).length;


       // High priority tasks
    highPriorityTasks.value = tasks.value.filter(task => {
      return(
         task.priority === 'high' &&
        task.is_completed == 0 
      )
    }).length;

    console.log(tasks.value)
    console.log("Ongoing :", onGoingTasks.value)
    console.log("Overdue :", overDueTasks.value)
  } catch (error) {
    console.error('Error fetching tasks:', error)
  }
}

onMounted(fetchTasks)

  


</script>


<style scoped>
.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
  margin-top: 40px;
}

.card {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  text-align: center;
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
}

.card h2 {
  margin-bottom: 15px;
  font-size: 1.3rem;
  color: #2c3e50;
}

.card ul {
  list-style: none;
  text-align: left;
  padding: 0;
}

.card ul li {
  margin: 8px 0;
  font-size: 1rem;
  color: #333;
}

.highlight {
  font-size: 2.2rem;
  font-weight: bold;
  color: #e67e22;
  margin: 10px 0;
}

.welcome-title {
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;       /* deep, professional navy */
  margin-bottom: 10px;
  text-align: center;   /* center on the page */
}

.welcome-subtext {
  font-size: 1.1rem;
  color: #555;          /* soft gray for readability */
  line-height: 1.6;
  max-width: 600px;     /* keep text from being too wide */
  margin: 0 auto;       /* center horizontally */
  text-align: center;
}




</style>