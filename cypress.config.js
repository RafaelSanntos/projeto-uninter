const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://rafaelsanntos.github.io/projeto-uninter", // base para todos os testes
    setupNodeEvents(on, config) {
    
    },
  },
});
