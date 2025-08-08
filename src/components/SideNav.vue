<template>
  <div class="layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <h2 class="sidebar-title">TaskMaster</h2>
      <nav class="sidebar-nav">
        <router-link to="/create/task">Add Task</router-link>
        <router-link to="/tasks">All Tasks</router-link>
        <router-link to="/tasks/today">Today</router-link>
      </nav>
    </aside>

    <!-- Main Content Area -->
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped> 
.layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 220px;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar-title {
  font-size: 1.5rem;
  margin-bottom: 20px;
  font-weight: bold;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 15px;
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

.main-content {
  flex: 1;
  padding: 30px;
  background-color: #f8f9fa;
}

</style>