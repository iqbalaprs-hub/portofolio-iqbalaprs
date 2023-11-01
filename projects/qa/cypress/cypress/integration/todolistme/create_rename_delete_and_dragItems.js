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

  it("2- Nominal case: The user can rename list items ", () => {
    // 2.1: Create new item in the To-do-items: Task1
    cy.get("#additempanel").find("#newtodo").type("Task1").type("{enter}");
    // Expected result: A new item called "Task1" in the To-do-items.The new item "Task1" is unchecked.
    cy.get("#todolistpanel #todo_0")
      .find("span#mytodo_0")
      .should("have.text", "Task1");
    cy.get("#todolistpanel #todo_0")
      .find('input[type="checkbox"]')
      .should("not.be.checked");

    // 2.2: Double-click on the item "Task1" and name it "Item1"
    cy.get("#todolistpanel #mytodos #todo_0").dblclick();
    cy.get("#todolistpanel #mytodos #todo_0")
      .find("input[type=text]")
      .type("Item1");
    // 2.3: Click "save" button
    cy.get("#todolistpanel #mytodos #todo_0")
      .find("input[type=submit]")
      .click();
    // Expected result: The item "Task1" is now named "Item1"
    cy.get("#todolistpanel #todo_0")
      .find("span#mytodo_0")
      .should("have.text", "Item1");

    // 2.4: Double-click on the item "Item1" and name it "Task1"
    cy.get("#todolistpanel #mytodos #todo_0").dblclick();
    cy.get("#todolistpanel #mytodos #todo_0")
      .find("input[type=text]")
      .type("Task1");

    // 2.5: Click "cancel" button
    cy.get("#todolistpanel #mytodos #todo_0")
      .find("input[type=button]")
      .click();
    // Expected result: The item is still named "Item1"
    cy.get("#todolistpanel #todo_0")
      .find("span#mytodo_0")
      .should("have.text", "Item1");

    // 2.6: Create new item in the To-do-items: Task2
    cy.get("#additempanel").find("#newtodo").type("Task2").type("{enter}");
    // Expected result: A new item called "Task2" in the To-do-items.The new item "Task2" is unchecked
    cy.get("#todolistpanel #todo_1")
      .find("span#mytodo_1")
      .should("have.text", "Task2");
    cy.get("#todolistpanel #todo_1")
      .find('input[type="checkbox"]')
      .should("not.be.checked");

    // 2.7: Check the item "Task2"
    cy.get("#todolistpanel #mytodos #todo_1")
      .find('input[type="checkbox"]')
      .click();
    // Expected result: The item "Task2" is in the done-items. "Task2" is checked
    cy.get("#doneitemspanel #mydonetodos #todo_1")
      .find("span#mytodo_1")
      .should("have.text", "Task2");
    cy.get("#doneitemspanel #mydonetodos #todo_1")
      .find('input[type="checkbox"]')
      .should("be.checked");

    // 2.8: Double-click on the item "Task2" and name it "Item2"
    cy.get("#doneitemspanel #mydonetodos #todo_1").dblclick();
    cy.get("#doneitemspanel #mydonetodos #todo_1")
      .find("input[type=text]")
      .type("Item2");

    // 2.9: Click "save" button
    cy.get("#doneitemspanel #mydonetodos #todo_1")
      .find("input[type=submit]")
      .click();
    // Expected result: The item "Task2" is now named "Item2"
    cy.get("#doneitemspanel #mydonetodos #todo_1")
      .find("span#mytodo_1")
      .should("have.text", "Item2");

    // 2.10: Double-click on the item "Item2" and name it "Task2"
    cy.get("#doneitemspanel #mydonetodos #todo_1").dblclick();
    cy.get("#doneitemspanel #mydonetodos #todo_1")
      .find("input[type=text]")
      .type("Task2");

    // 2.11: Click "cancel" button
    cy.get("#doneitemspanel #mydonetodos #todo_1")
      .find("input[type=button]")
      .click();
    // Expected result: The item is still named "Item2"
    cy.get("#doneitemspanel #mydonetodos #todo_1")
      .find("span#mytodo_1")
      .should("have.text", "Item2");

    // 2.12: Create new item in the To-do-items: Task3
    cy.get("#additempanel").find("#newtodo").type("Task3").type("{enter}");
  });

  it("3- Nominal case: The user can delete list items ", () => {
    // 3.1: Create new item in the To-do-items: Task1
    cy.get("#additempanel").find("#newtodo").type("Task1").type("{enter}");
    // Expected result: A new item called "Task1" in the To-do-items. The new item "Task1" is unchecked
    cy.get("#todolistpanel #todo_0")
      .find("span#mytodo_0")
      .should("have.text", "Task1");
    cy.get("#todolistpanel #todo_0")
      .find('input[type="checkbox"]')
      .should("not.be.checked");

    // 3.2: Create new item in the To-do-items: Task2
    cy.get("#additempanel").find("#newtodo").type("Task2").type("{enter}");
    // Expected result: A new item called "Task2" in the To-do-items. The new item "Task2" is unchecked
    cy.get("#todolistpanel #todo_1")
      .find("span#mytodo_1")
      .should("have.text", "Task2");
    cy.get("#todolistpanel #todo_1")
      .find('input[type="checkbox"]')
      .should("not.be.checked");

    // 3.3: Create new item in the To-do-items: Task3
    cy.get("#additempanel").find("#newtodo").type("Task3").type("{enter}");
    // Expected result: A new item called "Task3" in the To-do-items. The new item "Task3" is unchecked
    cy.get("#todolistpanel #todo_2")
      .find("span#mytodo_2")
      .should("have.text", "Task3");
    cy.get("#todolistpanel #todo_2")
      .find('input[type="checkbox"]')
      .should("not.be.checked");

    // 3.4: Create new item in the To-do-items: Task4
    cy.get("#additempanel").find("#newtodo").type("Task4").type("{enter}");
    // Expected result: A new item called "Task4" in the To-do-items. The new item "Task4" is unchecked
    cy.get("#todolistpanel #todo_3")
      .find("span#mytodo_3")
      .should("have.text", "Task4");
    cy.get("#todolistpanel #todo_3")
      .find('input[type="checkbox"]')
      .should("not.be.checked");

    // 3.5: Create new item in the To-do-items: Task5
    cy.get("#additempanel").find("#newtodo").type("Task5").type("{enter}");
    // Expected result: A new item called "Task5" in the To-do-items. The new item "Task5" is unchecked
    cy.get("#todolistpanel #todo_4")
      .find("span#mytodo_4")
      .should("have.text", "Task5");
    cy.get("#todolistpanel #todo_4")
      .find('input[type="checkbox"]')
      .should("not.be.checked");

    // 3.6: Check the item "Task2"
    cy.get("#todolistpanel #mytodos #todo_1")
      .find('input[type="checkbox"]')
      .click();
    // Expected result:The item "Task2" is in the done-items. "Task2" is checked
    cy.get("#doneitemspanel #mydonetodos #todo_1")
      .find("span#mytodo_1")
      .should("have.text", "Task2");
    cy.get("#doneitemspanel #mydonetodos #todo_1")
      .find('input[type="checkbox"]')
      .should("be.checked");

    // 3.7: Check the item "Task3"
    cy.get("#todolistpanel #mytodos #todo_2")
      .find('input[type="checkbox"]')
      .click();
    // Expected result: The item "Task3" is in the done-items. "Task3" is checked
    cy.get("#doneitemspanel #mydonetodos #todo_2")
      .find("span#mytodo_2")
      .should("have.text", "Task3");
    cy.get("#doneitemspanel #mydonetodos #todo_2")
      .find('input[type="checkbox"]')
      .should("be.checked");

    // 3.8: Check the item "Task4"
    cy.get("#todolistpanel #mytodos #todo_3")
      .find('input[type="checkbox"]')
      .click();
    // Expected result: The item "Task4" is in the done-items. "Task4" is checked
    cy.get("#doneitemspanel #mydonetodos #todo_3")
      .find("span#mytodo_3")
      .should("have.text", "Task4");
    cy.get("#doneitemspanel #mydonetodos #todo_3")
      .find('input[type="checkbox"]')
      .should("be.checked");
  });
});
