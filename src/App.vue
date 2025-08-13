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
      <Sidenav />
      <AppMain />
    </div>
  </div>
</template>

<script>
import Nav from './components/NavBar.vue'
import Sidenav from './components/SideNav.vue'
import AppMain from './components/AppMain.vue'

export default {
  components: { Nav, Sidenav, AppMain }
}
</script>

<style>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Row layout for sidebar + main */
.content-layout {
  display: flex;
  flex: 1;
}

/* Make sidebar fixed width */
.content-layout > *:first-child {
  flex: 0 0 220px;
}

/* Make main take the rest */
.content-layout > *:last-child {
  flex: 1;
}
</style>


