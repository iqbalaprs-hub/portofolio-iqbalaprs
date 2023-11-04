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

  it("1- Nominal case: The user can sort items in the to-do-items", () => {
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
    // Expected result: The order of the items for top to bottom is: e, b, k, a, i, x)
    cy.get("#todolistpanel #mytodos").find("li").should("have.length", 6);
    cy.get("#todolistpanel #mytodos li")
      .eq(0)
      .find("span")
      .should("have.text", "e");
    cy.get("#todolistpanel #mytodos li")
      .eq(1)
      .find("span")
      .should("have.text", "b");
    cy.get("#todolistpanel #mytodos li")
      .eq(2)
      .find("span")
      .should("have.text", "k");
    cy.get("#todolistpanel #mytodos li")
      .eq(3)
      .find("span")
      .should("have.text", "a");
    cy.get("#todolistpanel #mytodos li")
      .eq(4)
      .find("span")
      .should("have.text", "i");
    cy.get("#todolistpanel #mytodos li")
      .eq(5)
      .find("span")
      .should("have.text", "x");

    // 1.7: Drag the item "e" to be the bottom item in the To-do-items
    cy.get("#todolistpanel #todo_0").drag("#todolistpanel #todo_5", {
      source: { x: 0, y: 0 }, // applies to the element being dragged
      target: { position: "bottom" }, // applies to the drop target
      force: true, // applied to both the source and target element
    });
    // Expected result: The item "e" is the last item in the To-do-items (from top to bottom:  b, k, a, i, x, e)
    cy.get("#todolistpanel #mytodos li")
      .eq(0)
      .find("span")
      .should("have.text", "b");
    cy.get("#todolistpanel #mytodos li")
      .eq(1)
      .find("span")
      .should("have.text", "k");
    cy.get("#todolistpanel #mytodos li")
      .eq(2)
      .find("span")
      .should("have.text", "a");
    cy.get("#todolistpanel #mytodos li")
      .eq(3)
      .find("span")
      .should("have.text", "i");
    cy.get("#todolistpanel #mytodos li")
      .eq(4)
      .find("span")
      .should("have.text", "x");
    cy.get("#todolistpanel #mytodos li")
      .eq(5)
      .find("span")
      .should("have.text", "e");

    // 1.8: Choose the option "Alphabetical" to sort the items alphabetically
    cy.get("#sortselect").find("#sort1").click();
    cy.wait(1000);
    // Expected result: The items are sorted alphabetically (from top to bottom: a, b, e, i, k, x)
    cy.get("#todolistpanel #mytodos li")
      .eq(0)
      .find("span")
      .should("have.text", "a");
    cy.get("#todolistpanel #mytodos li")
      .eq(1)
      .find("span")
      .should("have.text", "b");
    cy.get("#todolistpanel #mytodos li")
      .eq(2)
      .find("span")
      .should("have.text", "e");
    cy.get("#todolistpanel #mytodos li")
      .eq(3)
      .find("span")
      .should("have.text", "i");
    cy.get("#todolistpanel #mytodos li")
      .eq(4)
      .find("span")
      .should("have.text", "k");
    cy.get("#todolistpanel #mytodos li")
      .eq(5)
      .find("span")
      .should("have.text", "x");

    // 1.9: Choose the option "Random" to sort the items randomly
    cy.get("#sortselect").find("#sort2").click();
    // Expected result: The items are no longer sorted alphabetically
    cy.get("#todolistpanel #mytodos li")
      .find("span") // Find the <span> elements within the <li> elements
      .invoke("text")
      .should("not.deep.equal", ["a", "b", "e", "i", "k", "x"]);

    // 1.10: Choose the option "Normal" to sort the items
    cy.get("#sortselect").find("#sort0").click();
    // Expected result: The items are sorted as they were before step 1.8  (from top to bottom: b, k, a, i, x, e)
    cy.get("#todolistpanel #mytodos li")
      .eq(0)
      .find("span")
      .should("have.text", "b");
    cy.get("#todolistpanel #mytodos li")
      .eq(1)
      .find("span")
      .should("have.text", "k");
    cy.get("#todolistpanel #mytodos li")
      .eq(2)
      .find("span")
      .should("have.text", "a");
    cy.get("#todolistpanel #mytodos li")
      .eq(3)
      .find("span")
      .should("have.text", "i");
    cy.get("#todolistpanel #mytodos li")
      .eq(4)
      .find("span")
      .should("have.text", "x");
    cy.get("#todolistpanel #mytodos li")
      .eq(5)
      .find("span")
      .should("have.text", "e");

    // 1.11: Choose the option "Top3" to select the top 3 items (from top to downward) on the To-do-items
    cy.get("#sortselect").find("#sort3").click();
    // Expected result: The top 3 items are colored in black (b,k,a). The other items are colored in light grey (i,x,e)
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

  it("2- Nominal case: The user can sort items in the done-items by dragging items", () => {
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
    // Expected result: The order of the items for top to bottom is: e, b, k, a, i, x)
    cy.get("#todolistpanel #mytodos").find("li").should("have.length", 6);
    cy.get("#todolistpanel #mytodos li")
      .eq(0)
      .find("span")
      .should("have.text", "e");
    cy.get("#todolistpanel #mytodos li")
      .eq(1)
      .find("span")
      .should("have.text", "b");
    cy.get("#todolistpanel #mytodos li")
      .eq(2)
      .find("span")
      .should("have.text", "k");
    cy.get("#todolistpanel #mytodos li")
      .eq(3)
      .find("span")
      .should("have.text", "a");
    cy.get("#todolistpanel #mytodos li")
      .eq(4)
      .find("span")
      .should("have.text", "i");
    cy.get("#todolistpanel #mytodos li")
      .eq(5)
      .find("span")
      .should("have.text", "x");

    // 2.7: Ckeck all items (from bottom to top)
    cy.get("#todolistpanel #mytodos li")
      .eq(5)
      .find('input[type="checkbox"]')
      .click();
    cy.get("#todolistpanel #mytodos li")
      .eq(4)
      .find('input[type="checkbox"]')
      .click();
    cy.get("#todolistpanel #mytodos li")
      .eq(3)
      .find('input[type="checkbox"]')
      .click();
    cy.get("#todolistpanel #mytodos li")
      .eq(2)
      .find('input[type="checkbox"]')
      .click();
    cy.get("#todolistpanel #mytodos li")
      .eq(1)
      .find('input[type="checkbox"]')
      .click();
    cy.get("#todolistpanel #mytodos li")
      .eq(0)
      .find('input[type="checkbox"]')
      .click();
    // Expected result: All items moved from To-do-items to Done-items. The order of the items for top to bottom is: e, b, k, a, i, x)
    cy.get("#doneitemspanel #mydonetodos li")
      .eq(0)
      .find("span")
      .should("have.text", "e");
    cy.get("#doneitemspanel #mydonetodos li")
      .eq(1)
      .find("span")
      .should("have.text", "b");
    cy.get("#doneitemspanel #mydonetodos li")
      .eq(2)
      .find("span")
      .should("have.text", "k");
    cy.get("#doneitemspanel #mydonetodos li")
      .eq(3)
      .find("span")
      .should("have.text", "a");
    cy.get("#doneitemspanel #mydonetodos li")
      .eq(4)
      .find("span")
      .should("have.text", "i");
    cy.get("#doneitemspanel #mydonetodos li")
      .eq(5)
      .find("span")
      .should("have.text", "x");

    // 2.8: Drag the item "e" to be the bottom item in the done-items
    cy.get("#doneitemspanel #todo_0").drag("#doneitemspanel #todo_5", {
      source: { x: 0, y: 0 }, // applies to the element being dragged
      target: { position: "bottom" }, // applies to the drop target
      force: true, // applied to both the source and target element
    });
    // Expected result: The item "e" is the last item in the To-do-items (from top to bottom:  b, k, a, i, x, e)
    cy.get("#doneitemspanel #mydonetodos li")
      .eq(0)
      .find("span")
      .should("have.text", "b");
    cy.get("#doneitemspanel #mydonetodos li")
      .eq(1)
      .find("span")
      .should("have.text", "k");
    cy.get("#doneitemspanel #mydonetodos li")
      .eq(2)
      .find("span")
      .should("have.text", "a");
    cy.get("#doneitemspanel #mydonetodos li")
      .eq(3)
      .find("span")
      .should("have.text", "i");
    cy.get("#doneitemspanel #mydonetodos li")
      .eq(4)
      .find("span")
      .should("have.text", "x");
    cy.get("#doneitemspanel #mydonetodos li")
      .eq(5)
      .find("span")
      .should("have.text", "e");
  });

  it("3- Nominal case: The user can sort items in the done-items alphabetically", () => {
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
    // Expected result: The order of the items for top to bottom is: e, b, k, a, i, x)
    cy.get("#todolistpanel #mytodos").find("li").should("have.length", 6);
    cy.get("#todolistpanel #mytodos li")
      .eq(0)
      .find("span")
      .should("have.text", "e");
    cy.get("#todolistpanel #mytodos li")
      .eq(1)
      .find("span")
      .should("have.text", "b");
    cy.get("#todolistpanel #mytodos li")
      .eq(2)
      .find("span")
      .should("have.text", "k");
    cy.get("#todolistpanel #mytodos li")
      .eq(3)
      .find("span")
      .should("have.text", "a");
    cy.get("#todolistpanel #mytodos li")
      .eq(4)
      .find("span")
      .should("have.text", "i");
    cy.get("#todolistpanel #mytodos li")
      .eq(5)
      .find("span")
      .should("have.text", "x");

    // 3.7: Ckeck all items (from bottom to top)
    cy.get("#todolistpanel #mytodos li")
      .eq(5)
      .find('input[type="checkbox"]')
      .click();
    cy.get("#todolistpanel #mytodos li")
      .eq(4)
      .find('input[type="checkbox"]')
      .click();
    cy.get("#todolistpanel #mytodos li")
      .eq(3)
      .find('input[type="checkbox"]')
      .click();
    cy.get("#todolistpanel #mytodos li")
      .eq(2)
      .find('input[type="checkbox"]')
      .click();
    cy.get("#todolistpanel #mytodos li")
      .eq(1)
      .find('input[type="checkbox"]')
      .click();
    cy.get("#todolistpanel #mytodos li")
      .eq(0)
      .find('input[type="checkbox"]')
      .click();
    // Expected result: All items moved from To-do-items to Done-items. The order of the items for top to bottom is: e, b, k, a, i, x)
    cy.get("#doneitemspanel #mydonetodos li")
      .eq(0)
      .find("span")
      .should("have.text", "e");
    cy.get("#doneitemspanel #mydonetodos li")
      .eq(1)
      .find("span")
      .should("have.text", "b");
    cy.get("#doneitemspanel #mydonetodos li")
      .eq(2)
      .find("span")
      .should("have.text", "k");
    cy.get("#doneitemspanel #mydonetodos li")
      .eq(3)
      .find("span")
      .should("have.text", "a");
    cy.get("#doneitemspanel #mydonetodos li")
      .eq(4)
      .find("span")
      .should("have.text", "i");
    cy.get("#doneitemspanel #mydonetodos li")
      .eq(5)
      .find("span")
      .should("have.text", "x");

    // 3.8: Choose the option "Alphabetical" to sort the items alphabetically
    cy.get("#sortselect").find("#sort1").click();
    cy.wait(1000);
    // Expected result: The items are sorted alphabetically (from top to bottom: a, b, e, i, k, x)
    cy.get("#doneitemspanel #mydonetodos li")
      .eq(0)
      .find("span")
      .should("have.text", "a");
    cy.get("#doneitemspanel #mydonetodos li")
      .eq(1)
      .find("span")
      .should("have.text", "b");
    cy.get("#doneitemspanel #mydonetodos li")
      .eq(2)
      .find("span")
      .should("have.text", "e");
    cy.get("#doneitemspanel #mydonetodos li")
      .eq(3)
      .find("span")
      .should("have.text", "i");
    cy.get("#doneitemspanel #mydonetodos li")
      .eq(4)
      .find("span")
      .should("have.text", "k");
    cy.get("#doneitemspanel #mydonetodos li")
      .eq(5)
      .find("span")
      .should("have.text", "x");
  });
});
