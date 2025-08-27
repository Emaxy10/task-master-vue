<!-- <template>
  <NavBar/>
  <SideNav />
  <AppMain /> 
</template>

<script setup> 
import SideNav from './components/SideNav.vue';
import NavBar from './components/NavBar.vue';
import AppMain from './components/AppMain.vue'
</script> -->

<template>
  <div class="app-layout">
    <!-- Top navigation -->
    <Nav />

    <!-- Sidebar + Main content in one row -->
    <div class="content-layout">
      <Sidenav v-if="authStore.user !== null"/>
      <AppMain  />
    </div>
    <FooterNav class="footer_nav"/>
  </div>
</template>

<script setup>
import Nav from './components/NavBar.vue'
import Sidenav from './components/SideNav.vue'
import AppMain from './components/AppMain.vue'
import FooterNav from './components/FooterNav.vue'
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()

</script>

<style>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-layout {
  display: flex;
  flex: 1;
  margin-top: 10px; /* ⬅ space between navbar and sidenav/main */
  padding-left: 50px;
}

.content-layout > *:first-child {
  flex: 0 0 220px; /* sidebar fixed width */
  margin-right: 10px; /* optional: space between sidebar and main */
  padding-top: 45px;
}

.content-layout > *:last-child {
  flex: 1;
  padding: 20px 30px;
  background: #f9f9f9;
  border-radius: 8px; /* nice rounded look */
}
.footer_nav{
  margin-left: 50px;
  padding-left: 20px;
}
</style>




