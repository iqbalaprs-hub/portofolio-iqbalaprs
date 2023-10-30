// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// I took the advice about cy.tab() from "https://www.programsbuzz.com/article/how-press-tab-key-cypress" and I also did "npm install cypress-real-events --save-dev"
require("cypress-plugin-tab");

// https://www.youtube.com/watch?v=v_3-H00N5Go
// https://www.youtube.com/watch?v=T1xpl1_A2dU
//https://reflect.run/articles/testing-drag-and-drop-workflows-using-cypress/#:~:text=You%20can%20add%20drag%2Dand,cypress%2Ddrag%2Ddrop%20plugin.&text=Then%2C%20add%20the%20following%20line,cypress%2Ddrag%2Ddrop%22)%3B
require("@4tw/cypress-drag-drop");
