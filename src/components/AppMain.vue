<template>
    <main >
        <router-view></router-view> 
    </main>
</template>


<style scoped>
.main-content {
  margin-top: 60px;    /* space for fixed header */
  margin-left: 220px;  /* space for fixed sidebar */
  padding: 20px;
  background-color: #f8f9fa;
  min-height: calc(100vh - 60px); /* fills the rest of the screen */
  box-sizing: border-box;
}
</style>