const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 20000,
  blockHosts: [
    "*google-analytics.com",
    "*googlesyndication.com",
    "*doubleclick.net",
    "*ezodn.com",
    "*ezoic.net",
  ],
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/integration/**/*.js",
  },
});
