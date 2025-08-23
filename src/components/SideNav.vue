<template>
  <aside class="sidebar">
    <nav class="sidebar-nav">
      <router-link to="/" class="nav-link" active-class="active-link">
        📊 Dashboard
      </router-link>

      <router-link to="/create/task" class="nav-link" active-class="active-link">
        ➕ Add Task
      </router-link>

      <!-- Dropdown for Tasks -->
      <div class="dropdown">
        <button class="dropdown-btn" @click="toggleDropdown">
          📂 Tasks
          <span class="arrow" :class="{ open: isOpen }">▼</span>
        </button>
        <div v-if="isOpen" class="dropdown-content">
          <router-link to="/tasks" class="dropdown-link" active-class="active-link">
            📋 All Tasks
          </router-link>
          <router-link to="/task/completed" class="dropdown-link" active-class="active-link">
            ✅ Completed
          </router-link>
          <router-link to="/task/overdue" class="dropdown-link" active-class="active-link">
            ⏰ Overdue
          </router-link>
          <router-link to="/task/ongoing" class="dropdown-link" active-class="active-link">
            🔄 Ongoing
          </router-link>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script setup>
import { ref } from "vue";

const isOpen = ref(false);
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 60px;
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

.nav-link, .dropdown-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #ecf0f1;
  font-weight: 500;
  text-decoration: none;
  padding: 10px 14px;
  border-radius: 8px;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-link:hover,
.dropdown-btn:hover {
  background: rgba(255,255,255,0.1);
  transform: translateX(4px);
}

.active-link {
  background: #3498db;
  color: #fff !important;
  font-weight: 600;
  box-shadow: inset 2px 0 0 #2980b9;
}

.dropdown-content {
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  margin-top: 5px;
  gap: 8px;
}

.dropdown-link {
  color: #bdc3c7;
  padding: 8px 12px;
  border-radius: 6px;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s ease;
}

.dropdown-link:hover {
  background: rgba(255,255,255,0.1);
  color: #fff;
}

.arrow {
  font-size: 12px;
  transition: transform 0.3s ease;
}

.arrow.open {
  transform: rotate(180deg);
}
</style>
