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
    // Expected result: The item "e" is the last item in the To-do-items (from top to bottom:  b, k, a, i, x, e)
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

  it("2- Nominal case: The user can sort items in the to-do-items alphabetically", () => {
    // 2.1: Create new item in the To-do-list: e
    cy.get("#additempanel").find("#newtodo").type("e").type("{enter}");

    // 2.2: Create new item in the To-do-list: b
    cy.get("#additempanel").find("#newtodo").type("b").type("{enter}");

    // 2.3: Create new item in the To-do-list: k
    cy.get("#additempanel").find("#newtodo").type("k").type("{enter}");

    // 2.4: Create new item in the To-do-list: a
    cy.get("#additempanel").find("#newtodo").type("a").type("{enter}");

    // 2.5: Create new item in the To-do-list: i
    cy.get("#additempanel").find("#newtodo").type("i").type("{enter}");

    // 2.6: Create new item in the To-do-list: x
    cy.get("#additempanel").find("#newtodo").type("x").type("{enter}");

    // 2.7: Choose the option "Alphabetical" to sort the items alphabetically
    cy.get("#sortselect").find("#sort1").click();
    cy.wait(1000);
    // Expected result: The items are sorted alphabetically (from top to bottom: a, b, e, i, k, x)
    cy.get("#todolistpanel #mytodos li").should(($lis) => {
      // Convert the list items into an array of their text content
      const textArray = $lis.map((index, el) => Cypress.$(el).text()).get();

      // Define the expected order
      const expectedOrder = ["a", "b", "e", "i", "k", "x"];

      expect(textArray).to.deep.equal(expectedOrder);
    });
  });

  it("3- Nominal case: The user can sort items in the to-do-items randomly", () => {
    // 3.1: Create new item in the To-do-list: e
    cy.get("#additempanel").find("#newtodo").type("e").type("{enter}");

    // 3.2: Create new item in the To-do-list: b
    cy.get("#additempanel").find("#newtodo").type("b").type("{enter}");

    // 3.3: Create new item in the To-do-list: k
    cy.get("#additempanel").find("#newtodo").type("k").type("{enter}");

    // 3.4: Create new item in the To-do-list: a
    cy.get("#additempanel").find("#newtodo").type("a").type("{enter}");

    // 3.5: Create new item in the To-do-list: i
    cy.get("#additempanel").find("#newtodo").type("i").type("{enter}");

    // 3.6: Create new item in the To-do-list: x
    cy.get("#additempanel").find("#newtodo").type("x").type("{enter}");

    // 3.7: Choose the option "Random" to sort the items randomly
    cy.get("#sortselect").find("#sort2").click();
    cy.wait(1000);
    // Expected result: The items are sorted randomly
    cy.get("#todolistpanel #mytodos li").should(($lis) => {
      // Convert the list items into an array of their text content
      const textArray = $lis.map((index, el) => Cypress.$(el).text()).get();

      // Define the expected order
      const expectedOrder = ["e", "b", "k", "a", "i", "x"];

      // Use a negation assertion to check that the order is not equal
      expect(textArray).to.not.deep.equal(expectedOrder);
    });
  });

  it("4- Nominal case: The user can return the order of the items in to-do-items to normal (dragging items is also considered part of the normal order)", () => {
    // 4.1: Create new item in the To-do-list: e
    cy.get("#additempanel").find("#newtodo").type("e").type("{enter}");

    // 4.2: Create new item in the To-do-list: b
    cy.get("#additempanel").find("#newtodo").type("b").type("{enter}");

    // 4.3: Create new item in the To-do-list: k
    cy.get("#additempanel").find("#newtodo").type("k").type("{enter}");

    // 4.4: Create new item in the To-do-list: a
    cy.get("#additempanel").find("#newtodo").type("a").type("{enter}");

    // 4.5: Create new item in the To-do-list: i
    cy.get("#additempanel").find("#newtodo").type("i").type("{enter}");

    // 4.6: Create new item in the To-do-list: x
    cy.get("#additempanel").find("#newtodo").type("x").type("{enter}");

    // 4.7: Choose the option "Random" to sort the items randomly
    cy.get("#sortselect").find("#sort2").click();
    cy.wait(1000);
    // Expected result: The items are sorted randomly
    cy.get("#todolistpanel #mytodos li").should(($lis) => {
      // Convert the list items into an array of their text content
      const textArray = $lis.map((index, el) => Cypress.$(el).text()).get();

      // Define the expected order
      const expectedOrder = ["e", "b", "k", "a", "i", "x"];

      // Use a negation assertion to check that the order is not equal
      expect(textArray).to.not.deep.equal(expectedOrder);
    });

    // 4.8: Choose the option "Normal" to sort the items
    cy.get("#sortselect").find("#sort0").click();
    cy.wait(1000);
    // Expected result: The items are sorted as they were originally  (from top to bottom: e, b, k, a, i, x)
    cy.get("#todolistpanel #mytodos li").should(($lis) => {
      // Convert the list items into an array of their text content
      const textArray = $lis.map((index, el) => Cypress.$(el).text()).get();

      // Define the expected order
      const expectedOrder = ["e", "b", "k", "a", "i", "x"];

      expect(textArray).to.deep.equal(expectedOrder);
    });

    // 4.9: Drag the item "e" to be the bottom item in the To-do-items
    // Expected result: The item "e" is the last item in the To-do-items (from top to bottom:  b, k, a, i, x, e)
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

    // 4.10: Choose the option "Random" to sort the items randomly
    cy.get("#sortselect").find("#sort2").click();
    cy.wait(1000);
    // Expected result: The items are sorted randomly
    cy.get("#todolistpanel #mytodos li").should(($lis) => {
      // Convert the list items into an array of their text content
      const textArray = $lis.map((index, el) => Cypress.$(el).text()).get();

      // Define the expected order
      const expectedOrder = ["b", "k", "a", "i", "x", "e"];

      // Use a negation assertion to check that the order is not equal
      expect(textArray).to.not.deep.equal(expectedOrder);
    });

    // 4.11: Choose the option "Normal" to sort the items
    cy.get("#sortselect").find("#sort0").click();
    cy.wait(1000);
    // Expected result: The items are sorted as they were before step 4.10  (from top to bottom: b, k, a, i, x, e)
    cy.get("#todolistpanel #mytodos li").should(($lis) => {
      // Convert the list items into an array of their text content
      const textArray = $lis.map((index, el) => Cypress.$(el).text()).get();

      // Define the expected order
      const expectedOrder = ["b", "k", "a", "i", "x", "e"];

      expect(textArray).to.deep.equal(expectedOrder);
    });
  });

  it("5- Nominal case: The user can select the top 3 items in to-do-items", () => {
    // 5.1: Create new item in the To-do-list: e
    cy.get("#additempanel").find("#newtodo").type("e").type("{enter}");

    // 5.2: Create new item in the To-do-list: b
    cy.get("#additempanel").find("#newtodo").type("b").type("{enter}");

    // 5.3: Create new item in the To-do-list: k
    cy.get("#additempanel").find("#newtodo").type("k").type("{enter}");

    // 5.4: Create new item in the To-do-list: a
    cy.get("#additempanel").find("#newtodo").type("a").type("{enter}");

    // 5.5: Create new item in the To-do-list: i
    cy.get("#additempanel").find("#newtodo").type("i").type("{enter}");

    // 5.6: Create new item in the To-do-list: x
    cy.get("#additempanel").find("#newtodo").type("x").type("{enter}");

    // 5.7: Choose the option "Top3" to select the top 3 items (from top to downward) on the To-do-items
    cy.get("#sortselect").find("#sort3").click();
    // Expected result: The top 3 items are colored in black (e,b,k). The other items are colored in light grey (a,i,x)
    cy.get("#todolistpanel #mytodos li")
      .eq(0)
      .find("span")
      .should("have.css", "color", "rgb(51, 51, 51)");
    cy.get("#todolistpanel #mytodos li")
      .eq(1)
      .find("span")
      .should("have.css", "color", "rgb(51, 51, 51)");
    cy.get("#todolistpanel #mytodos li")
      .eq(2)
      .find("span")
      .should("have.css", "color", "rgb(51, 51, 51)");
    cy.get("#todolistpanel #mytodos li")
      .eq(3)
      .find("span")
      .should("have.css", "color", "rgb(221, 221, 221)");
    cy.get("#todolistpanel #mytodos li")
      .eq(4)
      .find("span")
      .should("have.css", "color", "rgb(221, 221, 221)");
    cy.get("#todolistpanel #mytodos li")
      .eq(5)
      .find("span")
      .should("have.css", "color", "rgb(221, 221, 221)");
  });
});
