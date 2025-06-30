const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
   devServer: {
    host: 'localhost',  // You can use '0.0.0.0' to expose it on your network
    port: 3000           // Change this to your desired port
  }
})
