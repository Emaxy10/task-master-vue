import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/pages/LoginPage.vue'
import TaskAppIntro from '@/pages/TaskAppIntro.vue'
import RegistrationPage from '@/pages/RegistrationPage.vue'
import CreateTask from '@/pages/CreateTask.vue'
import UserProfilePage from '@/pages/TasksPage.vue'
import EditTaskPage from '@/pages/EditTaskPage.vue'
import TaskPage from '@/pages/TaskPage.vue'
import SearchResultPage from '@/pages/SearchResultPage.vue'
import SubTaskPage from '@/pages/SubTaskPage.vue'
import CompletedTasks from '@/pages/CompletedTasks.vue'
import OverdueTask from '@/pages/OverdueTask.vue'
import OngoingTask from '@/pages/OngoingTask.vue'
import SeeSubTasks from '@/pages/SeeSubTasks.vue'
import SeeSubTask from '@/pages/SeeSubTask.vue'
//import HelloWorld from '@/components/HelloWorld.vue'

const routes = [
  {
    path: '/',
    name:'home',
    component: TaskAppIntro
  },
  {
    path: '/login',
    name: 'login-page',
    component: LoginPage
  },{
    path: '/register',
    name: 'register-page',
    component: RegistrationPage
  },{
    path: '/create/task',
    name: 'create-task',
    component: CreateTask
  }
  ,{
    path: '/tasks',
    name: 'user-tasks',
    component: UserProfilePage
  },{
    path: '/task/edit/:id',
    name: 'edit-task',
    component: EditTaskPage
  },{
    path: '/task/:id',
    name:'task',
    component: TaskPage
  },{
      path: '/search/',
      name:'search_results',
      component: SearchResultPage
  },{
      path: '/tasks/:id/subtasks/create',
      name:'sub_task_create',
      component: SubTaskPage
  },{
      path: '/task/completed',
      name:'completed_tasks',
      component: CompletedTasks
  },{
      path: '/task/overdue',
      name:'overdue_tasks',
      component: OverdueTask
  },{
      path: '/task/ongoing',
      name:'ongoing_tasks',
      component: OngoingTask
  },{
      path: '/task/:id/subtasks',
      name:'sub_tasks',
      component: SeeSubTasks
  },{
      path: '/task/:task_id/subtasks/:subtask_id',
      name:'sub_task',
      component: SeeSubTask
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // or just '/'
  routes
})

export default router
