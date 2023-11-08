/// <reference types="Cypress" />

describe("Feature: Sorting list items", () => {
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

  it("1- Nominal case: The user can sort items in the to-do-items by dragging items", () => {
    // 1.1: Create new item in the To-do-list: e
    cy.get("#additempanel").find("#newtodo").type("e").type("{enter}");

    // 1.2: Create new item in the To-do-list: b
    cy.get("#additempanel").find("#newtodo").type("b").type("{enter}");

    // 1.3: Create new item in the To-do-list: k
    cy.get("#additempanel").find("#newtodo").type("k").type("{enter}");

    // 1.4: Create new item in the To-do-list: a
    cy.get("#additempanel").find("#newtodo").type("a").type("{enter}");

    // 1.5: Create new item in the To-do-list: i
    cy.get("#additempanel").find("#newtodo").type("i").type("{enter}");

    // 1.6: Create new item in the To-do-list: x
    cy.get("#additempanel").find("#newtodo").type("x").type("{enter}");

    // 1.7: Drag the item "e" to be the bottom item in the To-do-items
    // Exxpected result: The item "e" is the last item in the To-do-items (from top to bottom:  b, k, a, i, x, e)
    cy.get("#todolistpanel #mytodos #todo_0").drag(
      "#todolistpanel #mytodos #todo_5"
    );
    cy.get("#todolistpanel #mytodos li").should(($lis) => {
      // Convert the list items into an array of their text content
      const textArray = $lis.map((index, el) => Cypress.$(el).text()).get();

      // Define the expected order
      const expectedOrder = ["b", "k", "a", "i", "x", "e"];

      expect(textArray).to.deep.equal(expectedOrder);
    });
  });
});
