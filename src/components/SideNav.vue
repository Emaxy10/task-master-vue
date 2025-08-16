<!-- <template>
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
</style> -->
<template>
  <aside class="sidebar">
    <nav class="sidebar-nav">
      <router-link to="/create/task" class="nav-link" active-class="active-link">
        ➕ Add Task
      </router-link>
      <router-link to="/tasks" class="nav-link" active-class="active-link">
        📋 All Tasks
      </router-link>
      <router-link to="/task/completed" class="nav-link" active-class="active-link">
        ✅ Completed Task
      </router-link>
      <router-link to="/task/overdue" class="nav-link" active-class="active-link">
        ⏰ Overdue Task
      </router-link>
      <router-link to="/task/ongoing" class="nav-link" active-class="active-link">
        🔄 Ongoing Task
      </router-link>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 60px; /* match header height */
  left: 0;
  width: 240px;
  height: calc(100vh - 60px);
  background: linear-gradient(180deg, #2c3e50, #1a252f);
  padding: 20px 15px;
  overflow-y: auto;
  box-shadow: 2px 0 6px rgba(0,0,0,0.2);
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 0;
  padding: 0;
}

.nav-link {
  display: block;
  color: #ecf0f1;
  font-weight: 500;
  text-decoration: none;
  padding: 10px 14px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background: rgba(255,255,255,0.1);
  transform: translateX(4px);
}

.active-link {
  background: #3498db;
  color: #fff !important;
  font-weight: 600;
  box-shadow: inset 2px 0 0 #2980b9;
}
</style>
