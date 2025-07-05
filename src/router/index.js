import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/pages/LoginPage.vue'
import TaskAppIntro from '@/components/TaskAppIntro.vue'
import RegistrationPage from '@/pages/RegistrationPage.vue'
import CreateTask from '@/pages/CreateTask.vue'
import UserProfilePage from '@/pages/UserProfilePage.vue'
//import HelloWorld from '@/components/HelloWorld.vue'

const routes = [
  {
    path: '/',
    name:'task-intro',
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
    path: '/profile',
    name: 'user-profile',
    component: UserProfilePage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // or just '/'
  routes
})

export default router
