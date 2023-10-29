/// <reference types="Cypress" />

describe("Feature: Create and manage lists", () => {
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

  it("1- Nominal case: The user can use 5 lists already present by default in the web application ", () => {
    /*
    1.1: Expected result: 5 lists are present by default in the web application:
        - Today’s tasks
        - Projects
        - Things to do later
        - Example template
        - Important info
    */

    // Check if there are 6 files ('Test todo list' included)
    cy.get("#listmanager #lists #container_0")
      .find("li")
      .should("have.length", 6);

    // Check each file's name
    cy.get("#listmanager #lists #mycategory_0 #container_0 li:eq(0)")
      .find(".listname")
      .should("have.text", "Today's Tasks ");
    cy.get("#listmanager #lists #mycategory_0 #container_0 li:eq(1)")
      .find(".listname")
      .should("have.text", "Projects ");
    cy.get("#listmanager #lists #mycategory_0 #container_0 li:eq(2)")
      .find(".listname")
      .should("have.text", "Things to do later ");
    cy.get("#listmanager #lists #mycategory_0 #container_0 li:eq(3)")
      .find(".listname")
      .should("have.text", "Example template ");
    cy.get("#listmanager #lists #mycategory_0 #container_0 li:eq(4)")
      .find(".listname")
      .should("have.text", "Important Info ");
    cy.get("#listmanager #lists #mycategory_0 #container_0 li:eq(5)")
      .find(".listname")
      .should("have.text", "Test todo list ");
    cy.log(
      "You have 5 initial files and 1 file we just created called 'Test todo list'"
    );
  });

  it("2- Nominal case: The user can go from list to the next list by clicking 'TAB'", () => {
    // 2.1: Select the list "Today's tasks"
    cy.get("#listmanager #lists #mycategory_0 #container_0 li:eq(0)")
      .find(".listname")
      .should("have.text", "Today's Tasks ")
      .click();

    cy.wait(1000);
    // 2.2: Click on the TAB button 5 times
    // Expected result: You went from the list "Today's tasks" to the list "Test todo list"
    for (let i = 0; i < 5; i++) {
      cy.tab();
    }

    // 2.3: Click on the TAB button 1 time
    // Expected result: Since "Test todo list" was the last list, it returned to the beginning of the lists which is "Today's tasks"
    cy.tab();
  });

  it("3- Nominal case: The user can create a list ", () => {
    // 3.1: Create new list by clicking the icon "add new list"
    cy.get("#addlist").click();

    // 3.2: Click "save" button
    cy.get("#inplaceeditor").find('input[type="submit"]').click();
    // Expected result: A new list is created, and it is called "New List" (Which is the default name)
    // Check if there are 7 files now
    cy.get("#listmanager #lists #container_0")
      .find("li")
      .should("have.length", 7);
    // Check if the name of the new file is "New List"
    cy.get("#listmanager #lists #mycategory_0 #container_0 li:eq(6)")
      .find(".listname")
      .should("have.text", "New List ");
    cy.log(
      "There are 7 files now and the 7th file has taken by default the name 'New List'"
    );

    // 3.3: Create another new list by clicking the icon "add new list"
    cy.get("#addlist").click();

    // 3.4: Click "cancel" button
    cy.get("#inplaceeditor").find('input[type="button"]').click();
    // Expected result: No new list is created
    // Check if there are STILL 7 files now
    cy.get("#listmanager #lists #container_0")
      .find("li")
      .should("have.length", 7);
  });
});
