<template>
  <aside class="sidebar">
    <nav class="sidebar-nav">
      <router-link to="/create/task">Add Task</router-link>
      <router-link to="/tasks">All Tasks</router-link>
      <router-link to="/task/completed">Completed Task</router-link>
      <router-link to="/task/overdue">Overdue Task</router-link>
      <router-link to="/task/ongoing">Ongoing Task</router-link>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 60px; /* same height as header */
  left: 0;
  width: 220px;
  height: calc(100vh - 60px); /* fills remaining space */
  background-color: #2c3e50;
  padding: 20px 15px;
  overflow-y: auto;
}


.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 0; /* no extra spacing */
}

.sidebar-nav a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 8px;
  border-radius: 4px;
  transition: background 0.3s;
}

.sidebar-nav a:hover {
  background-color: #34495e;
}
</style>
