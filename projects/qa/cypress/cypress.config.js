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
  // the env property is used to define environment variables that can be accessed within your Cypress tests.
  // This configuration is setting an environment variable named twitterCloneBaseUrl with the value "http://localhost:3000". The purpose of this might be to specify the base URL of a Twitter clone application that your Cypress tests will interact with
  env: {
    twitterCloneBaseUrl: "http://localhost:3000",
  },
  // I added this to solved the cross-origin error ( https://stackoverflow.com/questions/50495996/cypress-e2e-testing-how-to-get-around-cross-origin-errors/69987296#69987296)
  chromeWebSecurity: false,
});
