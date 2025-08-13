<template>
  <div>
   

    <main>
      <h1>Welcome to TaskMaster</h1>
      <p>Organize your day and boost your productivity with our simple and efficient task management app.</p>

      <h2>Why Manage Your Tasks?</h2>
      <ul>
        <li>✅ Stay focused and clear about what needs to be done</li>
        <li>✅ Improve time management and reduce stress</li>
        <li>✅ Track progress and achieve goals efficiently</li>
        <li>✅ Prioritize work and avoid last-minute rush</li>
        <li>✅ Collaborate with teams effortlessly</li>
      </ul>
    </main>

    <footer>
      &copy; 2025 TaskMaster. All rights reserved.
    </footer>
  </div>
</template>

<script setup>
//import { RouterLink } from 'vue-router';

</script>

 <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Segoe UI', sans-serif;
    }

    body {
      background-color: #f9f9f9;
      color: #333;
    }

    header {
      background-color: #2c3e50;
      color: #fff;
      padding: 20px 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: bold;
    }

    .auth-buttons a {
      margin-left: 20px;
      text-decoration: none;
      color: #fff;
      padding: 8px 16px;
      border: 1px solid #fff;
      border-radius: 5px;
      transition: background-color 0.3s;
    }

    .auth-buttons a:hover {
      background-color: #fff;
      color: #2c3e50;
    }

    main {
      padding: 60px 40px;
      max-width: 800px;
      margin: auto;
      text-align: center;
    }

    h1 {
      font-size: 2.5rem;
      margin-bottom: 20px;
      color: #2c3e50;
    }

    p {
      font-size: 1.2rem;
      line-height: 1.6;
      margin-bottom: 20px;
    }

    ul {
      text-align: left;
      margin-top: 20px;
      padding-left: 20px;
    }

    ul li {
      margin-bottom: 12px;
      font-size: 1.1rem;
    }

    footer {
      text-align: center;
      padding: 20px;
      color: #999;
      font-size: 0.9rem;
    }
  </style>