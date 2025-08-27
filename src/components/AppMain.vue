<template>
    <main class="main-content">
        <router-view></router-view> 
    </main>
</template>



<style scoped>
.main-content {
  margin-top: 65px;       /* space for fixed header */
  margin-left: 240px;     /* space for fixed sidebar */
  padding: 20px;
  background-color: #f8f9fa;
  min-height: 100vh; /* fills the screen below header */
  box-sizing: border-box;
}
</style>