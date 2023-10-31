/// <reference types="Cypress" />

describe("Feature: create and manage categories", () => {
  beforeEach(() => {
    // Prereq.: Todolistme page is already opened
    cy.visit("https://todolistme.net/");

    // Prereq.: Local storage is erased and the web application is returned to its default state
    cy.clearAllLocalStorage();

    cy.wait(1000);

    // Prereq.: Create new list called "Test todo list"
    // Click on the icon "new list"
    cy.get("#addlist").click();
    // Type the name of the new file
    cy.get("#inplaceeditor").find("#updatebox").type("Test todo list");
    // Save the new file
    cy.get("#inplaceeditor").find('input[type="submit"]').click();
    // Enter the list called "Testtodolist"
    cy.get("li span.listname")
      .filter(':contains("Test todo list")')
      .parent("li")
      .click();
  });

  it("1- Nominal case: The user can create categories", () => {
    // 1.1: Click on the icon "add new category"
    cy.get("img.adddivider").click();

    // 1.2: Click on the "save" button
    cy.get("#inplaceeditor").find('input[type="submit"]').click();
    // Expected return: A new category is created. It is named "New Category" (which is the default name)
    // Check if there is only 1 category
    cy.get("#lists #mycategories ").find("li").should("have.length", 1);
    // Check if the name of the new file is "New Category"
    cy.get("#lists #mycategories li:eq(0)")
      .find("span")
      .should("have.text", "New Category");

    // 1.3: Click on the icon "add new category"
    cy.get("img.adddivider").click();

    // 1.4: Click on the "save" button
    cy.get("#inplaceeditor").find('input[type="submit"]').click();
    // Expected return: A new category is created. It is named "New Category" (which is the default name)
    // Check if there are 2 categories
    cy.get("#lists #mycategories ").find("li").should("have.length", 2);
    // Check if the name of the new file is "New Category"
    cy.get("#lists #mycategories li:eq(1)")
      .find("span")
      .should("have.text", "New Category");

    // 1.5: Click on the icon "add new category"
    cy.get("img.adddivider").click();

    // 1.6: Click on the "cancel" button
    cy.get("#inplaceeditor").find('input[type="button"]').click();
    // Expected return: The category was not created
    // Check if there are STILL 2 categories
    cy.get("#lists #mycategories ").find("li").should("have.length", 2);
  });
});
