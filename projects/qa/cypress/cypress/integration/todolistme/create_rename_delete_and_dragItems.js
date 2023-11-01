/// <reference types="Cypress" />

describe("Feature: Create, rename, delete and drag items", () => {
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

  it("1- Nominal case: The user can create list items", () => {
    // 1.1: Expected result: The input that create a new item has a placeholder “Type and hit Enter to add”
    cy.get("#additempanel")
      .find("#newtodo")
      .should("have.attr", "placeholder", "Type and hit Enter to add");

    // 1.2: Create new item in the To-do-items: Task1
    cy.get("#additempanel").find("#newtodo").type("Task1").type("{enter}");
    // Expected result: A new item called "Task1" in the To-do-items.The new item "Task1" is unchecked
    cy.get("#todolistpanel #todo_0")
      .find("span#mytodo_0")
      .should("have.text", "Task1");
    cy.get("#todolistpanel #todo_0")
      .find('input[type="checkbox"]')
      .should("not.be.checked");

    // 1.3: Create new item in the To-do-items: Task2
    cy.get("#additempanel").find("#newtodo").type("Task2").type("{enter}");
    // Expected result: A new item called "Task2" in the To-do-items. The new item "Task2" is unchecked
    cy.get("#todolistpanel #todo_1")
      .find("span#mytodo_1")
      .should("have.text", "Task2");
    cy.get("#todolistpanel #todo_1")
      .find('input[type="checkbox"]')
      .should("not.be.checked");

    // 1.4: Create new item in the To-do-items: Task3
    cy.get("#additempanel").find("#newtodo").type("Task3").type("{enter}");
    // Expected result: A new item called "Task3" in the To-do-items. The new item "Task3" is unchecked
    cy.get("#todolistpanel #todo_2")
      .find("span#mytodo_2")
      .should("have.text", "Task3");
    cy.get("#todolistpanel #todo_2")
      .find('input[type="checkbox"]')
      .should("not.be.checked");
  });
});
