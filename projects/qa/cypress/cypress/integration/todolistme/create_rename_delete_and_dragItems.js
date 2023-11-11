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

    // 2.13: Drag the item "Task3" to the "tomorrow" part in the scheduled-items
    cy.get("#todolistpanel #mytodos #todo_2").drag("#tomorrowtitle", {
      force: true,
    });
    // Expected result: The item "Task3" is in the scheduled-items. "Task3" is unchecked
    cy.get("#tomorrowitemspanel #todo_2")
      .find("span#mytodo_2")
      .should("have.text", "Task3");
    cy.get("#tomorrowitemspanel #todo_2")
      .find('input[type="checkbox"]')
      .should("not.be.checked");

    /*
    2.14: Double-click on the item "Task3" and name it "Item3"
      AND
    2.15: Click "save" button
    */
    //  Expected result: The item "Task3" is now named "Item3"
    cy.get("#tomorrowitemspanel #todo_2").dblclick({ force: true });
    cy.wait(1000);
    cy.get("#tomorrowitemspanel #todo_2")
      .find("input[type=text]")
      .type("Item3");
    cy.get("#tomorrowitemspanel #todo_2").find("input[type=submit]").click();
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

    // 3.9: Drag the item "Task5" to the "tomorrow" part in the scheduled-items
    cy.get("#todolistpanel #todo_4").drag("#tomorrowtitle", { force: true });
    // Expected result: The item "Task5" is in the scheduled-items. "Task5" is unchecked
    cy.get("#tomorrowpanel #tomorrowitemspanel #todo_4")
      .find("span#mytodo_4")
      .should("have.text", "Task5");
    cy.get("#tomorrowpanel #tomorrowitemspanel #todo_4")
      .find('input[type="checkbox"]')
      .should("not.be.checked");

    // 3.10: Hover over "Task1" and click the red X
    cy.get("#todolistpanel #mytodos #todo_0")
      .find("img.delete")
      .invoke("css", "visibility", "visible")
      .click();
    // Expected result: "Task1" is deleted. Since to-do-items is empty, the default sentence "No items. Why not add one below." appears
    // Checking if the to-do-items is empty
    cy.get("#todolistpanel #mytodos").find("li").should("have.length", 0);
    // If it is empty, it should have the text "No items. Why not add one below."
    cy.get("div#todolistpanel p.notodos")
      .should("exist")
      .contains("No items. Why not add one below.");

    // 3.11: Hover over "Task2" and click the red X
    cy.get("#doneitemspanel li span")
      .filter(':contains("Task2")')
      .parent("li")
      .find("img.delete")
      .invoke("css", "visibility", "visible")
      .click();
    // Expected result: "Task2" is deleted
    cy.get("#doneitemspanel li span")
      .filter(':contains("Task2")')
      .should("not.exist");

    // 3.12: Click the trash icon in the done-items
    cy.get("#belowdoneitemspanel").find("a.purge img").click();
    // Expected result: The items "Task3" and "Task4" are deleted. Since done-items is empty, the default sentence "No done items." appears
    // Checking if the done-items is empty
    cy.get("#doneitemspanel #mydonetodos").find("li").should("have.length", 0);
    // If it is empty, it should have the text "No done items."
    cy.get("#doneitemspanel p.notodos")
      .should("exist")
      .contains("No done items.");

    // 3.13: Hover over "task5" and click the red X
    cy.get("#tomorrowitemspanel li span")
      .filter(':contains("Task5")')
      .parent("li")
      .find("img.delete")
      .invoke("css", "visibility", "visible")
      .click({ force: true });
  });

  it("4- Nominal case: The user can move the items between to-do-items, done-items and scheduled-items, either by dragging, checking and unchecking", () => {
    // 4.1: Create new item in the To-do-items: Task1
    cy.get("#additempanel").find("#newtodo").type("Task1").type("{enter}");
    // Expected result: A new item called "Task1" in the To-do-items. The new item "Task1" is unchecked
    cy.get("#todolistpanel #todo_0")
      .find("span#mytodo_0")
      .should("have.text", "Task1");
    cy.get("#todolistpanel #todo_0")
      .find('input[type="checkbox"]')
      .should("not.be.checked");

    // 4.2: Create new item in the To-do-items: Task2
    cy.get("#additempanel").find("#newtodo").type("Task2").type("{enter}");
    // Expected result: A new item called "Task2" in the To-do-items. The new item "Task2" is unchecked
    cy.get("#todolistpanel #todo_1")
      .find("span#mytodo_1")
      .should("have.text", "Task2");
    cy.get("#todolistpanel #todo_1")
      .find('input[type="checkbox"]')
      .should("not.be.checked");

    // 4.3: Create new item in the To-do-items: Task3
    cy.get("#additempanel").find("#newtodo").type("Task3").type("{enter}");
    // Expected result: A new item called "Task3" in the To-do-items. The new item "Task3" is unchecked
    cy.get("#todolistpanel #todo_2")
      .find("span#mytodo_2")
      .should("have.text", "Task3");
    cy.get("#todolistpanel #todo_2")
      .find('input[type="checkbox"]')
      .should("not.be.checked");

    // 4.4: Create new item in the To-do-items: Task4
    cy.get("#additempanel").find("#newtodo").type("Task4").type("{enter}");
    // Expected result: A new item called "Task4" in the To-do-items. The new item "Task4" is unchecked
    cy.get("#todolistpanel #todo_3")
      .find("span#mytodo_3")
      .should("have.text", "Task4");
    cy.get("#todolistpanel #todo_3")
      .find('input[type="checkbox"]')
      .should("not.be.checked");

    // 4.5: Create new item in the To-do-items: Task5
    cy.get("#additempanel").find("#newtodo").type("Task5").type("{enter}");
    // Expected result: A new item called "Task5" in the To-do-items. The new item "Task5" is unchecked
    cy.get("#todolistpanel #todo_4")
      .find("span#mytodo_4")
      .should("have.text", "Task5");
    cy.get("#todolistpanel #todo_4")
      .find('input[type="checkbox"]')
      .should("not.be.checked");

    // 4.6: Check the item "Task5"
    cy.get("#todolistpanel #mytodos #todo_4")
      .find('input[type="checkbox"]')
      .click();
    // Expected result: The item "Task5" is in the done-items. "Task5" is checked
    cy.get("#doneitemspanel #mydonetodos #todo_4")
      .find("span#mytodo_4")
      .should("have.text", "Task5");
    cy.get("#doneitemspanel #mydonetodos #todo_4")
      .find('input[type="checkbox"]')
      .should("be.checked");

    // 4.7: Drag the item "Task4" to done-items
    cy.get("#todolistpanel #mytodos #todo_3").drag(
      "#doneitemspanel #mydonetodos"
    );
    /*
    The item "Task4" is in the done-items
    "Task4" is checked
    NB: I had to do the assert this way because the ID of the items are changing when dragged
     */
    cy.get("#doneitemspanel #mydonetodos").find("li").should("have.length", 2);
    cy.get("#doneitemspanel #mydonetodos li:eq(0)")
      .find("span")
      .should("have.text", "Task4");
    cy.get("#doneitemspanel #mydonetodos li:eq(0)")
      .find('input[type="checkbox"]')
      .should("be.checked");
    cy.get("#doneitemspanel #mydonetodos li:eq(1)")
      .find("span")
      .should("have.text", "Task5");
    cy.get("#doneitemspanel #mydonetodos li:eq(1)")
      .find('input[type="checkbox"]')
      .should("be.checked");

    // 4.8: Drag the item "Task3" to the "tomorrow" part in the scheduled-items
    cy.get("#todolistpanel #mytodos #todo_2").drag("#tomorrowtitle", {
      force: true,
    });

    // 4.9: Drag the item "Task2" to the "tomorrow" part in the scheduled-items
    cy.get("#todolistpanel #mytodos #todo_1").drag("#tomorrowtitle", {
      force: true,
    });

    // 4.10: Drag the item "Task1" to the "tomorrow" part in the scheduled-items
    cy.get("#todolistpanel #mytodos #todo_0").drag("#tomorrowtitle", {
      force: true,
    });

    cy.wait(1000);
    cy.get("#tomorrowpanel img#tomorrowarrow").click();
    /*
    Expected result:
    The item "Task1" is in the scheduled-items
    "Task1" is unchecked

    The item "Task2" is in the scheduled-items
    "Task2" is unchecked

    The item "Task3" is in the scheduled-items
    "Task3" is unchecked

    NB: I had to do the assert this way because the ID of the items are changing when dragged
    */
    cy.get("#tomorrowpanel #tomorrowitemspanel li:eq(0)")
      .find("span")
      .should("have.text", "Task1");
    cy.get("#tomorrowpanel #tomorrowitemspanel li:eq(0)")
      .find('input[type="checkbox"]')
      .should("not.be.checked");
    cy.get("#tomorrowpanel #tomorrowitemspanel li:eq(1)")
      .find("span")
      .should("have.text", "Task2");
    cy.get("#tomorrowpanel #tomorrowitemspanel li:eq(1)")
      .find('input[type="checkbox"]')
      .should("not.be.checked");
    cy.get("#tomorrowpanel #tomorrowitemspanel li:eq(2)")
      .find("span")
      .should("have.text", "Task3");
    cy.get("#tomorrowpanel #tomorrowitemspanel li:eq(2)")
      .find('input[type="checkbox"]')
      .should("not.be.checked");

    // 4.11: Check the item "Task3"
    cy.get("#tomorrowpanel #tomorrowitemspanel li:eq(2)")
      .find('input[type="checkbox"]')
      .click();

    // 4.12: Drag the item "Task2" to the done-items
    cy.get("#tomorrowpanel #tomorrowitemspanel li:eq(1)").drag(
      "#doneitemspanel #mydonetodos li:eq(0)",
      {
        source: { x: 0, y: 0 }, // applies to the element being dragged
        target: { position: "top" }, // applies to the drop target
        force: true, // applied to both the source and target element
      }
    );

    // 4.13: Uncheck the item "Task5"
    cy.get("#doneitemspanel #mydonetodos li:eq(3)")
      .find('input[type="checkbox"]')
      .click();

    cy.wait(1000);

    // 4.14: Drag the item "Task1" to the to-do-items
    cy.get("#tomorrowpanel #tomorrowitemspanel li:eq(0)").drag(
      "#todolistpanel #mytodos li:eq(0)",
      {
        source: { x: 150, y: 0 }, // applies to the element being dragged
        target: { position: "bottom" }, // applies to the drop target
        force: true, // applied to both the source and target element
      }
    );

    /*
    Expected result:
    The item "Task1" is in the to-do-items
    "Task1" is unchecked

    The item "Task5" is in the to-do-items
    "Task1" is unchecked

    The item "Task2" is in the done-items
    "Task2" is checked

    The item "Task3" is in the done-items
    "Task3" is checked

    The item "Task4" is in the done-items
    "Task3" is checked

    NB: I had to do the assert this way because the ID of the items are changing when dragged
    */
    cy.get("#todolistpanel #mytodos").find("li").should("have.length", 2);
    cy.get("#todolistpanel #mytodos li:eq(0)")
      .find("span")
      .should("have.text", "Task5");
    cy.get("#todolistpanel #mytodos li:eq(0)")
      .find('input[type="checkbox"]')
      .should("not.be.checked");
    cy.get("#todolistpanel #mytodos li:eq(1)")
      .find("span")
      .should("have.text", "Task1");
    cy.get("#todolistpanel #mytodos li:eq(1)")
      .find('input[type="checkbox"]')
      .should("not.be.checked");

    cy.get("#doneitemspanel #mydonetodos").find("li").should("have.length", 3);
    cy.get("#doneitemspanel #mydonetodos li:eq(0)")
      .find("span")
      .should("have.text", "Task2");
    cy.get("#doneitemspanel #mydonetodos li:eq(0)")
      .find('input[type="checkbox"]')
      .should("be.checked");
    cy.get("#doneitemspanel #mydonetodos li:eq(1)")
      .find("span")
      .should("have.text", "Task3");
    cy.get("#doneitemspanel #mydonetodos li:eq(1)")
      .find('input[type="checkbox"]')
      .should("be.checked");
    cy.get("#doneitemspanel #mydonetodos li:eq(2)")
      .find("span")
      .should("have.text", "Task4");
    cy.get("#doneitemspanel #mydonetodos li:eq(2)")
      .find('input[type="checkbox"]')
      .should("be.checked");
  });

  it("5- Edge case: The user cannot create an item without a name", () => {
    // 5.1: Select The input that create a new item has a placeholder “Type and hit Enter to add” and click "enter"
    cy.get("#additempanel").find("#newtodo").type("{enter}");
    // Expected result: An alert appears with sentence "Did you forget to type your item?"
    // 5.2: Click "OK" on the alert
    cy.on("window:alert", (Text) => {
      expect(Text).to.contains("Did you forget to type your item?");
    });
  });

  it("6- Edge case: The user cannot rename an item without a name in to-do-items", () => {
    // 6.1: Create new item in the To-do-items: Task1
    cy.get("#additempanel").find("#newtodo").type("Task1").type("{enter}");
    // Expected result: A new item called "Task1" in the To-do-items. The new item "Task1" is unchecked
    cy.get("#todolistpanel #todo_0")
      .find("span#mytodo_0")
      .should("have.text", "Task1");
    cy.get("#todolistpanel #todo_0")
      .find('input[type="checkbox"]')
      .should("not.be.checked");

    // 6.2: Double-click on "Task1" and remove the name
    cy.get("#todolistpanel #mytodos #todo_0").dblclick();
    cy.get("#todolistpanel #mytodos #todo_0").find("input[type=text]").clear();

    // 6.3: Click "save" button
    cy.get("#todolistpanel #mytodos #todo_0")
      .find("input[type=submit]")
      .click();
    // Expected result: An alert appears with sentence "Name can't be blank"
    // 6.4: Click "OK" on the alert
    cy.on("window:alert", (Text) => {
      expect(Text).to.contains("Name can't be blank.");
    });

    // 6.5: Click "cancel" button
    cy.get("#todolistpanel #mytodos #todo_0")
      .find("input[type=button]")
      .click();
    // Expected result: The item's name returns to its original name which is "Task1"
    cy.get("#todolistpanel #todo_0")
      .find("span#mytodo_0")
      .should("have.text", "Task1");
  });

  it("7- Edge case: The user cannot rename an item without a name in Done-items", () => {
    // 7.1: Create new item in the To-do-items: Task1
    cy.get("#additempanel").find("#newtodo").type("Task1").type("{enter}");
    // Expected result: A new item called "Task1" in the To-do-items. The new item "Task1" is unchecked
    cy.get("#todolistpanel #todo_0")
      .find("span#mytodo_0")
      .should("have.text", "Task1");
    cy.get("#todolistpanel #todo_0")
      .find('input[type="checkbox"]')
      .should("not.be.checked");

    // 7.2: Check the item "Task1"
    cy.get("#todolistpanel #mytodos #todo_0")
      .find('input[type="checkbox"]')
      .click();

    // Expected result: "Task1" is in the Done-items. "Task1" is checked
    cy.get("#doneitemspanel #mydonetodos #todo_0")
      .find("span#mytodo_0")
      .should("have.text", "Task1");
    cy.get("#doneitemspanel #mydonetodos #todo_0")
      .find('input[type="checkbox"]')
      .should("be.checked");

    // 7.3: Double-click on "Task1" and remove the name
    cy.get("#doneitemspanel #mydonetodos #todo_0").dblclick();
    cy.get("#doneitemspanel #mydonetodos #todo_0")
      .find("input[type=text]")
      .clear();

    // 7.4: Click "save" button
    cy.get("#doneitemspanel #mydonetodos #todo_0")
      .find("input[type=submit]")
      .click();
    // Expected result: An alert appears with sentence "Name can't be blank"
    // 7.5: Click "OK" on the alert
    cy.on("window:alert", (Text) => {
      expect(Text).to.contains("Name can't be blank.");
    });

    // 7.6: Click "cancel" button
    cy.get("#doneitemspanel #mydonetodos #todo_0")
      .find("input[type=button]")
      .click();
    // Expected result: The item's name returns to its original name which is "Task1"
    cy.get("#doneitemspanel #mydonetodos #todo_0")
      .find("span#mytodo_0")
      .should("have.text", "Task1");
  });

  it("8- Edge case: The user can name the item in arabic", () => {
    // 8.1: Create new item and name it "جملة جديدة"
    cy.get("#additempanel").find("#newtodo").type("جملة جديدة").type("{enter}");
    // Expected result: A new item is created and is named "جملة جديدة"
    cy.get("#todolistpanel #todo_0")
      .find("span#mytodo_0")
      .should("have.text", "جملة جديدة");

    // 8.2:Check the item "جملة جديد"
    cy.get("#todolistpanel #mytodos #todo_0")
      .find('input[type="checkbox"]')
      .click();
    // Expected result: Done-items has no problem with arabic
    cy.get("#doneitemspanel #mydonetodos #todo_0")
      .find("span#mytodo_0")
      .should("have.text", "جملة جديدة");

    // 8.3: Drag the item "جملة جديد" to scheduled-items
    cy.get("#doneitemspanel #todo_0").drag("#tomorrowtitle", { force: true });
    // Expected result: Scheduled-items has no problem with arabic
    cy.get("#tomorrowitemspanel #todo_0")
      .find("span#mytodo_0")
      .should("have.text", "جملة جديدة");
  });

  it("9- Edge case: The user can name the item in chinese", () => {
    // 9.1: Create new item and name it "新句子"
    cy.get("#additempanel").find("#newtodo").type("新句子").type("{enter}");
    // Expected result: A new item is created and is named "新句子"
    cy.get("#todolistpanel #todo_0")
      .find("span#mytodo_0")
      .should("have.text", "新句子");

    // 9.2: Check the item "新句子"
    cy.get("#todolistpanel #mytodos #todo_0")
      .find('input[type="checkbox"]')
      .click();
    // Expected result: Done-items has no problem with chinese
    cy.get("#doneitemspanel #mydonetodos #todo_0")
      .find("span#mytodo_0")
      .should("have.text", "新句子");

    // 9.3: Drag the item "新句子" to scheduled-items
    cy.get("#doneitemspanel #todo_0").drag("#tomorrowtitle", { force: true });
    // Expected result: Scheduled-items has no problem with chinese
    cy.get("#tomorrowitemspanel #todo_0")
      .find("span#mytodo_0")
      .should("have.text", "新句子");
  });

  it("10- Edge case: The user can name the item using special characters", () => {
    // 10.1: Create new item and name it "!@#$%^&*()"
    cy.get("#additempanel").find("#newtodo").type("!@#$%^&*()").type("{enter}");
    // Expected result: A new item is created and is named "!@#$%^&*()"
    cy.get("#todolistpanel #todo_0")
      .find("span#mytodo_0")
      .should("have.text", "!@#$%^&*()");

    // 10.2: Check the item "!@#$%^&*()"
    cy.get("#todolistpanel #mytodos #todo_0")
      .find('input[type="checkbox"]')
      .click();
    // Expected result: Done-items has no problem with special characters
    cy.get("#doneitemspanel #mydonetodos #todo_0")
      .find("span#mytodo_0")
      .should("have.text", "!@#$%^&*()");

    // 10.3: Drag the item "!@#$%^&*()" to scheduled-items
    cy.get("#doneitemspanel #todo_0").drag("#tomorrowtitle", { force: true });
    // Expected result: Scheduled-items has no problem with special characters
    cy.get("#tomorrowitemspanel #todo_0")
      .find("span#mytodo_0")
      .should("have.text", "!@#$%^&*()");
  });

  it("11- Edge case: The user cannot name the item using only spaces", () => {
    // 11.1: Create new item and name it "        "
    cy.get("#additempanel").find("#newtodo").type("        ").type("{enter}");
    // Expected result: An alert appears with sentence "Name can't be blank"
    // 11.2: Click "OK" on the alert
    cy.on("window:alert", (Text) => {
      expect(Text).to.contains("Did you forget to type your item?");
    });
  });

  it("12- Edge case: The user can have multiple items with the same name", () => {
    // 12.1: Create new item in the To-do-items: Task1
    cy.get("#additempanel").find("#newtodo").type("Task1").type("{enter}");
    // 12.2: Create new item in the To-do-items: Task1
    cy.get("#additempanel").find("#newtodo").type("Task1").type("{enter}");
    // 12.3: Create new item in the To-do-items: Task1
    cy.get("#additempanel").find("#newtodo").type("Task1").type("{enter}");
    // Expected result: We have similar 3 items named "Task1" in to-do items
    cy.get("#todolistpanel #todo_0")
      .find("span#mytodo_0")
      .should("have.text", "Task1");
    cy.get("#todolistpanel #todo_1")
      .find("span#mytodo_1")
      .should("have.text", "Task1");
    cy.get("#todolistpanel #todo_2")
      .find("span#mytodo_2")
      .should("have.text", "Task1");

    // 12.4: Check first item "Task1"
    cy.get("#todolistpanel #mytodos #todo_0")
      .find('input[type="checkbox"]')
      .click();
    // 12.5: Check second item "Task1"
    cy.get("#todolistpanel #mytodos #todo_1")
      .find('input[type="checkbox"]')
      .click();
    // 12.6: Check third item "Task1"
    cy.get("#todolistpanel #mytodos #todo_2")
      .find('input[type="checkbox"]')
      .click();
    // Expected result: We have similar 3 items named "Task1" in done-items
    cy.get("#doneitemspanel #mydonetodos #todo_0")
      .find("span#mytodo_0")
      .should("have.text", "Task1");
    cy.get("#doneitemspanel #mydonetodos #todo_1")
      .find("span#mytodo_1")
      .should("have.text", "Task1");
    cy.get("#doneitemspanel #mydonetodos #todo_2")
      .find("span#mytodo_2")
      .should("have.text", "Task1");

    // 12.7: Drag first item "Task1" to scheduled-items
    cy.get("#doneitemspanel #todo_2").drag("#tomorrowtitle", { force: true });

    // 12.8: Drag second item "Task1" to scheduled-items
    cy.get("#doneitemspanel #todo_1").drag("#tomorrowtitle", { force: true });

    // 12.9: Drag third item "Task1" to scheduled-items
    cy.get("#doneitemspanel #todo_0").drag("#tomorrowtitle", { force: true });
    // Expected result: We have similar 3 items named "Task1" in scheduled-items
    cy.get("#tomorrowitemspanel #todo_0")
      .find("span#mytodo_0")
      .should("have.text", "Task1");
    cy.get("#tomorrowitemspanel #todo_1")
      .find("span#mytodo_1")
      .should("have.text", "Task1");
    cy.get("#tomorrowitemspanel #todo_2")
      .find("span#mytodo_2")
      .should("have.text", "Task1");
  });
});
