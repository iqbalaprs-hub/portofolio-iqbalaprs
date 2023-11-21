const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 6000,
  blockHosts: [
    "*google-analytics.com",
    "*googlesyndication.com",
    "*doubleclick.net",
    "*ezodn.com",
    "*ezoic.net",
  ],
  e2e: {
    video: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/integration/**/*.js",
  },
  // I added this to solved the cross-origin error ( https://stackoverflow.com/questions/50495996/cypress-e2e-testing-how-to-get-around-cross-origin-errors/69987296#69987296)
  chromeWebSecurity: false,
});
