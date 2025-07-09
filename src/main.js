import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPersistedState from 'pinia-plugin-persistedstate' // ✅ import plugin

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPersistedState) // ✅ use plugin before mounting

app.use(router)
app.use(pinia)
app.mount('#app')

