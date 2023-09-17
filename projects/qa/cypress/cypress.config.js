const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  blockHosts: [
    "*google-analytics.com",
    "*googlesyndication.com",
    "*doubleclick.net",
    "*ezodn.com",
  ],
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/integration/**/*.js",
  },
});
