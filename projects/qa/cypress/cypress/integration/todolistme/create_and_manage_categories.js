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
    // Expected result: A new category is created. It is named "New Category" (which is the default name)
    // Check if there is only 1 category
    cy.get("#lists #mycategories ").find("li").should("have.length", 1);
    // Check if the name of the new category is "New Category"
    cy.get("#lists #mycategories li:eq(0)")
      .find("span")
      .should("have.text", "New Category");

    // 1.3: Click on the icon "add new category"
    cy.get("img.adddivider").click();

    // 1.4: Click on the "save" button
    cy.get("#inplaceeditor").find('input[type="submit"]').click();
    // Expected result: A new category is created. It is named "New Category" (which is the default name)
    // Check if there are 2 categories
    cy.get("#lists #mycategories ").find("li").should("have.length", 2);
    // Check if the name of the new category is "New Category"
    cy.get("#lists #mycategories li:eq(1)")
      .find("span")
      .should("have.text", "New Category");

    // 1.5: Click on the icon "add new category"
    cy.get("img.adddivider").click();

    // 1.6: Click on the "cancel" button
    cy.get("#inplaceeditor").find('input[type="button"]').click();
    // Expected result: The category was not created
    // Check if there are STILL 2 categories
    cy.get("#lists #mycategories ").find("li").should("have.length", 2);
  });

  it("2- Nominal case: The user can name categories when created", () => {
    // 2.1: Click on the icon "add new category" and name it "Work"
    cy.get("img.adddivider").click();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("Work");

    // 2.2: Click on the "save" button
    cy.get("#inplaceeditor").find('input[type="submit"]').click();
    // Expected result: A new category is created. It is named "Work"
    // Check if there is only 1 category
    cy.get("#lists #mycategories ").find("li").should("have.length", 1);
    // Check if the name of the new category is "Work"
    cy.get("#lists #mycategories li:eq(0)")
      .find("span")
      .should("have.text", "Work");

    // 2.3: Click on the icon "add new category" and name it "Home"
    cy.get("img.adddivider").click();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("Home");

    // 2.4: Click on the "save" button
    cy.get("#inplaceeditor").find('input[type="submit"]').click();
    // Expected result: A new category is created. It is named "Home"
    // Check if there is only 2 category
    cy.get("#lists #mycategories ").find("li").should("have.length", 2);
    // Check if the name of the new category is "Home"
    cy.get("#lists #mycategories li:eq(1)")
      .find("span")
      .should("have.text", "Home");

    // 2.5: Click on the icon "add new category" and name it "Travel"
    cy.get("img.adddivider").click();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("Travel");

    // 2.6: Click on the "cancel" button
    cy.get("#inplaceeditor").find('input[type="button"]').click();
    // Expected result: The category was not created
    // Check if there are STILL 2 categories
    cy.get("#lists #mycategories ").find("li").should("have.length", 2);
  });

  it("3- Nominal case: The user can rename categories", () => {
    // 3.1: Click on the icon "add new category"
    cy.get("img.adddivider").click();

    // 3.2: Click on the "save" button
    cy.get("#inplaceeditor").find('input[type="submit"]').click();
    // Expected result: A new category is created. It is named "New Category" (which is the default name)
    // Check if there is only 1 category
    cy.get("#lists #mycategories ").find("li").should("have.length", 1);
    // Check if the name of the new category is "New Category"
    cy.get("#lists #mycategories li:eq(0)")
      .find("span")
      .should("have.text", "New Category");

    // 3.3: Double-click on the category "New Category" and name it "Work"
    cy.get("#lists #mycategories li:eq(0)").dblclick();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("Work");

    // 3.4: Click on the "save" button
    cy.get("#inplaceeditor").find('input[type="submit"]').click();
    // Expected result: The category is now named "Work"
    // Check if there is STILL only 1 category
    cy.get("#lists #mycategories ").find("li").should("have.length", 1);
    // Check if the name of the category is "Work"
    cy.get("#lists #mycategories li:eq(0)")
      .find("span")
      .should("have.text", "Work");

    // 3.5: Double-click on the category "Work" and name it "Home"
    cy.get("#lists #mycategories li:eq(0)").dblclick();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("Home");

    // 3.6: Click on the "cancel" button
    cy.get("#inplaceeditor").find('input[type="button"]').click();
    // Expected result: The category's name remains "Work"
    // Check if there is STILL only 1 category
    cy.get("#lists #mycategories ").find("li").should("have.length", 1);
    // Check if the name of the category is "Work"
    cy.get("#lists #mycategories li:eq(0)")
      .find("span")
      .should("have.text", "Work");
  });

  it("4- Edge case: The user can rename the category with arabic name", () => {
    // 4.1: Click on the icon "add new category" and name it "فئة جديدة"
    cy.get("img.adddivider").click();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("فئة جديدة");

    // 4.2: Click on the "save" button
    cy.get("#inplaceeditor").find('input[type="submit"]').click();
    // Expected result: The new category is named  "فئة جديدة"
    // Check if there is only 1 category
    cy.get("#lists #mycategories ").find("li").should("have.length", 1);
    // Check if the name of the new category is "فئة جديدة"
    cy.get("#lists #mycategories li:eq(0)")
      .find("span")
      .should("have.text", "فئة جديدة");
  });

  it("5- Edge case: The user can rename the category with chinese name", () => {
    // 5.1: Click on the icon "add new category" and name it "新类别"
    cy.get("img.adddivider").click();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("新类别");

    // 5.2: Click on the "save" button
    cy.get("#inplaceeditor").find('input[type="submit"]').click();
    // Expected result: The new category is named  "新类别"
    // Check if there is only 1 category
    cy.get("#lists #mycategories ").find("li").should("have.length", 1);
    // Check if the name of the new category is "新类别"
    cy.get("#lists #mycategories li:eq(0)")
      .find("span")
      .should("have.text", "新类别");
  });

  it("6- Edge case: The user can rename the category using special characters", () => {
    // 6.1: Click on the icon "add new category" and name it "!@#$%^&*()"
    cy.get("img.adddivider").click();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("!@#$%^&*()");

    // 6.2: Click on the "save" button
    cy.get("#inplaceeditor").find('input[type="submit"]').click();
    // Expected result: The new category is named  "!@#$%^&*()"
    // Check if there is only 1 category
    cy.get("#lists #mycategories ").find("li").should("have.length", 1);
    // Check if the name of the new category is "!@#$%^&*()"
    cy.get("#lists #mycategories li:eq(0)")
      .find("span")
      .should("have.text", "!@#$%^&*()");
  });

  it("7- Edge case: The user cannot leave the category without a name", () => {
    // 7.1: Click on the icon "add new category" and do not name it
    cy.get("img.adddivider").click();
    cy.get("#lists #inplaceeditor").find("#updatebox").clear();

    // 7.2: Click "save" button
    cy.get("#inplaceeditor").find('input[type="submit"]').click();
    // Expected result: An alert appears with sentence "Name can't be blank"
    // 7.3: Click "OK" on the alert
    cy.on("window:alert", (Text) => {
      expect(Text).to.contains("Name can't be blank");
    });

    // 7.4: Click "cancel" button
    cy.get("#inplaceeditor").find('input[type="button"]').click();
    // Expected result: The category's name returns to its default name "New Category"
    // Check if there is only 1 category
    cy.get("#lists #mycategories ").find("li").should("have.length", 1);
    // Check if the name of the category is "New Category"
    cy.get("#lists #mycategories li:eq(0)")
      .find("span")
      .should("have.text", "New Category");
  });

  it("8- Edge case: The user cannot name the category using only spaces", () => {
    // 8.1: Click on the icon "add new category" and name it "       "
    cy.get("img.adddivider").click();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("     ");

    // 8.2: Click "save" button
    cy.get("#inplaceeditor").find('input[type="submit"]').click();
    // Expected result: An alert appears with sentence "Name can't be blank"
    // 8.3: Click "OK" on the alert
    cy.on("window:alert", (Text) => {
      expect(Text).to.contains("Name can't be blank");
    });

    // 8.4: Click "cancel" button
    cy.get("#inplaceeditor").find('input[type="button"]').click();
    // Expected result: The category's name results to its default name "New Category"
    // Check if there is only 1 category
    cy.get("#lists #mycategories ").find("li").should("have.length", 1);
    // Check if the name of the category is "New Category"
    cy.get("#lists #mycategories li:eq(0)")
      .find("span")
      .should("have.text", "New Category");
  });

  it("9- Edge case: The user can have categories with the same name", () => {
    // 9.1: Click on the icon "add new category"
    cy.get("img.adddivider").click();

    // 9.2: Click on the "save" button
    cy.get("#inplaceeditor").find('input[type="submit"]').click();
    // Expected result: A new category is created. It is named "New Category" (which is the default name)
    // Check if there is only 1 category
    cy.get("#lists #mycategories ").find("li").should("have.length", 1);
    // Check if the name of the new category is "New Category"
    cy.get("#lists #mycategories li:eq(0)")
      .find("span")
      .should("have.text", "New Category");

    // 9.3: Click on the icon "add new category"
    cy.get("img.adddivider").click();

    // 9.4: Click on the "save" button
    cy.get("#inplaceeditor").find('input[type="submit"]').click();
    // Expected result: A new category is created. It is named "New Category" (which is the default name)
    // Check if there are 2 categories
    cy.get("#lists #mycategories ").find("li").should("have.length", 2);
    // Check if the name of the new category is "New Category"
    cy.get("#lists #mycategories li:eq(1)")
      .find("span")
      .should("have.text", "New Category");

    // 9.5: Click on the icon "add new category"
    cy.get("img.adddivider").click();

    // 9.6: Click on the "save" button
    cy.get("#inplaceeditor").find('input[type="submit"]').click();
    // Expected result: A new category is created. It is named "New Category" (which is the default name)
    // Check if there are 3 categories
    cy.get("#lists #mycategories ").find("li").should("have.length", 3);
    // Check if the name of the new category is "New Category"
    cy.get("#lists #mycategories li:eq(2)")
      .find("span")
      .should("have.text", "New Category");

    // 9.7: Select the first category "New Category" and name it "Copy-category"
    cy.get("#lists #mycategories li:eq(0)").dblclick();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("Copy-category");

    // 9.8: Click on the "save" button
    cy.get("#inplaceeditor").find('input[type="submit"]').click();
    // Expected result: This category is named  "Copy-category"
    // Check if there are STILL 3 categories
    cy.get("#lists #mycategories ").find("li").should("have.length", 3);
    // Check if the name of the first category is "Copy-category"
    cy.get("#lists #mycategories li:eq(0)")
      .find("span")
      .should("have.text", "Copy-category");

    // 9.9: Select the second category "New Category" and name it "Copy-category"
    cy.get("#lists #mycategories li:eq(1)").dblclick();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("Copy-category");

    // 9.10: Click on the "save" button
    cy.get("#inplaceeditor").find('input[type="submit"]').click();
    // Expected result: This category is named  "Copy-category"
    // Check if there are STILL 3 categories
    cy.get("#lists #mycategories ").find("li").should("have.length", 3);
    // Check if the name of the second category is "Copy-category"
    cy.get("#lists #mycategories li:eq(1)")
      .find("span")
      .should("have.text", "Copy-category");

    // 9.11: Select the third category "New Category" and name it "Copy-category"
    cy.get("#lists #mycategories li:eq(2)").dblclick();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("Copy-category");

    // 9.12: Click on the "save" button
    cy.get("#inplaceeditor").find('input[type="submit"]').click();
    // Expected result: This category is named  "Copy-category"
    // Check if there are STILL 3 categories
    cy.get("#lists #mycategories ").find("li").should("have.length", 3);
    // Check if the name of the second category is "Copy-category".
    cy.get("#lists #mycategories li:eq(2)")
      .find("span")
      .should("have.text", "Copy-category");

    cy.log("Thus there is no problem that categories are named the same thing");
  });

  it("10- Nominal case: The user can delete categories", () => {
    // 10.1: Click on the icon "add new category"
    cy.get("img.adddivider").click();

    // 10.2: Click on the "save" button
    cy.get("#inplaceeditor").find('input[type="submit"]').click();
    // Expected result: A new category is created. It is named "New Category"
    // Check if there is only 1 category
    cy.get("#lists #mycategories ").find("li").should("have.length", 1);
    // Check if the name of the new category is "New Category"
    cy.get("#lists #mycategories li:eq(0)")
      .find("span")
      .should("have.text", "New Category");

    /*
    10.3: Hover over the category "New Category"
      AND
    10.4: Click on the red X
    */
    cy.get("#mycategories #category_1")
      .find("img.delete")
      .invoke("css", "visibility", "visible")
      .click();
    // Expected result: The category "New Category" is deleted
    cy.get("#lists #mycategories ").find("li").should("have.length", 0);
  });

  it("11- Nominal case: The user can reorder the categories by dragging them", () => {
    // 11.1: Click on the icon "add new category" and name it "Home"
    cy.get("img.adddivider").click();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("Home");

    // 11.2: Click on the "save" button
    cy.get("#inplaceeditor").find('input[type="submit"]').click();

    // 11.3: Click on the icon "add new category" and name it "Work"
    cy.get("img.adddivider").click();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("Work");

    // 11.4: Click on the "save" button
    cy.get("#inplaceeditor").find('input[type="submit"]').click();

    // 11.5: Click on the icon "add new category" and name it "Travel"
    cy.get("img.adddivider").click();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("Travel");

    // 11.6: Click on the "save" button
    cy.get("#inplaceeditor").find('input[type="submit"]').click();

    // 11.7: Create new list by clicking the icon "add new list" and name it "France"
    cy.get("#addlist").click();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("France");
    cy.get("#inplaceeditor").find('input[type="submit"]').click();

    // 11.8: Create new list by clicking the icon "add new list" and name it "Germany"
    cy.get("#addlist").click();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("Germany");
    cy.get("#inplaceeditor").find('input[type="submit"]').click();

    // 11.9: Drag the list "France" into the category "Travel"
    cy.get("li span.listname")
      .filter(':contains("France")')
      .parent("li")
      .drag("#mycategory_3 ul.categorycontainer");

    // 11.10: Drag the list "Germany" into the category "Travel"
    cy.get("li span.listname")
      .filter(':contains("Germany")')
      .parent("li")
      .drag("#mycategory_3 ul.categorycontainer");
  });

  it("12- Nominal case: The user can insert lists into the  categories", () => {
    // 12.1: Click on the icon "add new category" and name it "Home"
    cy.get("img.adddivider").click();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("Home");

    // 12.2: Click on the "save" button
    cy.get("#inplaceeditor").find('input[type="submit"]').click();

    // 12.3: Click on the icon "add new category" and name it "Work"
    cy.get("img.adddivider").click();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("Work");

    // 12.4: Click on the "save" button
    cy.get("#inplaceeditor").find('input[type="submit"]').click();

    // 12.5: Create new list by clicking the icon "add new list" and name it "Clean"
    cy.get("#addlist").click();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("Clean");
    cy.get("#inplaceeditor").find('input[type="submit"]').click();

    // 12.6: Create new list by clicking the icon "add new list" and name it "Programming"
    cy.get("#addlist").click();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("Programming");
    cy.get("#inplaceeditor").find('input[type="submit"]').click();

    // 12.7: Create new list by clicking the icon "add new list" and name it "Cook"
    cy.get("#addlist").click();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("Cook");
    cy.get("#inplaceeditor").find('input[type="submit"]').click();

    // 12.8: Create new list by clicking the icon "add new list" and name it "Lunch break"
    cy.get("#addlist").click();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("Lunch break");
    cy.get("#inplaceeditor").find('input[type="submit"]').click();

    // 12.9: Drag the list "Clean" into the category "Home"
    cy.get("li span.listname")
      .filter(':contains("Clean")')
      .parent("li")
      .drag("#mycategory_1 ul.categorycontainer");

    // 12.10: Drag the list "Programming" into the category "Work"
    cy.get("li span.listname")
      .filter(':contains("Programming")')
      .parent("li")
      .drag("#mycategory_2 ul.categorycontainer");

    // 12.11: Drag the list "Cook" into the category "Home"
    cy.get("li span.listname")
      .filter(':contains("Cook")')
      .parent("li")
      .drag("#mycategory_1 ul.categorycontainer");

    // 12.12: Drag the list "Lunch break" into the category "Work"
    cy.get("li span.listname")
      .filter(':contains("Lunch break")')
      .parent("li")
      .drag("#mycategory_2 ul.categorycontainer");

    /*
    Expected result:
    The category "Home" has:
    - Clean
    - Cook

    The category "Work" has:
      - Programming
      - Lunch break
    */
    cy.get("#container_1 li:eq(0)")
      .find("span.listname")
      .should("have.text", "Clean ");
    cy.get("#container_1 li:eq(1)")
      .find("span.listname")
      .should("have.text", "Cook ");
    cy.get("#container_2 li:eq(0)")
      .find("span.listname")
      .should("have.text", "Programming ");
    cy.get("#container_2 li:eq(1)")
      .find("span.listname")
      .should("have.text", "Lunch break ");
  });

  it("13- Nominal case: The user can change the order of the lists inside the  categories", () => {
    // 13.1: Click on the icon "add new category" and name it "Home"
    cy.get("img.adddivider").click();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("Home");

    // 13.2: Click on the "save" button
    cy.get("#inplaceeditor").find('input[type="submit"]').click();

    // 13.3: Create new list by clicking the icon "add new list" and name it "Clean"
    cy.get("#addlist").click();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("Clean");
    cy.get("#inplaceeditor").find('input[type="submit"]').click();

    // 13.4: Create new list by clicking the icon "add new list" and name it "Programming"
    cy.get("#addlist").click();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("Programming");
    cy.get("#inplaceeditor").find('input[type="submit"]').click();

    // 13.5: Create new list by clicking the icon "add new list" and name it "Cook"
    cy.get("#addlist").click();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("Cook");
    cy.get("#inplaceeditor").find('input[type="submit"]').click();

    // 13.6: Create new list by clicking the icon "add new list" and name it "Lunch break"
    cy.get("#addlist").click();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("Lunch break");
    cy.get("#inplaceeditor").find('input[type="submit"]').click();

    // 13.7: Drag the list "Clean" into the category "Home"
    cy.get("li span.listname")
      .filter(':contains("Clean")')
      .parent("li")
      .drag("#mycategory_1 ul.categorycontainer");

    cy.wait(1000);

    // 13.8: Drag the list "Programming" into the category "Home"
    cy.get("li span.listname")
      .filter(':contains("Programming")')
      .parent("li")
      .drag("#mycategory_1 ul.categorycontainer");

    cy.wait(1000);

    // 13.9: Drag the list "Cook" into the category "Home"
    cy.get("li span.listname")
      .filter(':contains("Cook")')
      .parent("li")
      .drag("#mycategory_1 ul.categorycontainer");

    cy.wait(1000);

    // 13.10: Drag the list "Lunch break" into the category "Home"
    cy.get("li span.listname")
      .filter(':contains("Lunch break")')
      .parent("li")
      .drag("#mycategory_1 ul.categorycontainer");
  });

  it("14- Nominal case: The user can copy the lists inside the  categories", () => {
    // 14.1: Click on the icon "add new category" and name it "Home"
    cy.get("img.adddivider").click();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("Home");

    // 14.2: Click on the "save" button
    cy.get("#inplaceeditor").find('input[type="submit"]').click();

    // 14.3: Create new list by clicking the icon "add new list" and name it "Cook"
    cy.get("#addlist").click();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("Cook");
    cy.get("#inplaceeditor").find('input[type="submit"]').click();

    // 14.4: Create new item "Task1"
    cy.get("#additempanel").find("#newtodo").type("Task1").type("{enter}");

    // 14.5: Create new item "Task2"
    cy.get("#additempanel").find("#newtodo").type("Task2").type("{enter}");

    // 14.6: Create new item "Task3"
    cy.get("#additempanel").find("#newtodo").type("Task3").type("{enter}");

    // 14.7: Check the item "Task3"
    cy.get("#todolistpanel #mytodos #todo_2")
      .find('input[type="checkbox"]')
      .click();

    /*
    Expected result:
    The list "Cook" has:
      - 2 items (Task1 and task2) in the to-do items
      - 1 item (Task3) in the done-items
    */
    // Check if there are 2 items in to-do items
    cy.get("#todolistpanel #mytodos").find("li").should("have.length", 2);
    // Check the names of the items
    cy.get("#todolistpanel #mytodos #todo_0")
      .find("span")
      .should("have.text", "Task1");
    cy.get("#todolistpanel #mytodos #todo_1")
      .find("span")
      .should("have.text", "Task2");

    // Check if there is 1 item in done-items and the name
    cy.get("#doneitemspanel #mydonetodos").find("li").should("have.length", 1);
    cy.get("#doneitemspanel #mydonetodos #todo_2")
      .find("span")
      .should("have.text", "Task3");

    // 14.8: Drag the list "Cook" to the category "Home"
    cy.get("li span.listname")
      .filter(':contains("Cook")')
      .parent("li")
      .drag("#mycategory_1 ul.categorycontainer");

    //
    /*
    14.9: Hover over the list "Cook"
      AND
    14.10: Click on the double-paper icon "copy list"
    */
    cy.get("#container_1 li span.listname")
      .filter(':contains("Cook")')
      .parent("li")
      .find("img.copylist")
      .invoke("css", "visibility", "visible")
      .click();

    // 14.11: Click "save" button
    cy.get("#lists #inplaceeditor").find('input[type="submit"]').click();
    cy.wait(1000);
    /*
    Expected result:
    A new list inside the category "Home" is created. It is named "Copy of Cook"

    The list "Copy of Cook" has:
      - 2 items (Task1 and task2) in the to-do items
      - 1 item (Task3) in the done-items
    */
    // Check if there are 2 files in category "Home" now
    cy.get("#mycategory_1 ul.categorycontainer")
      .find("li")
      .should("have.length", 2);
    // Check if the name of the new file is "Copy of Cook "
    cy.get("#mycategory_1 #container_1 li:eq(1)")
      .find(".listname")
      .should("have.text", "Copy of Cook ");
    cy.log(
      "There are 2 files now in category 'Home' and the second file is named 'Copy of Cook '"
    );
    // Select the file 'Copy of Cook '
    cy.get("#container_1 li span.listname")
      .filter(':contains("Copy of Cook ")')
      .parent("li")
      .click();
    // Check title is "Copy of Cook "
    cy.get("#mytitle").should("have.text", "Copy of Cook");

    // Check if there are 2 items in to-do items
    cy.get("#todolistpanel #mytodos").find("li").should("have.length", 2);
    // Check the names of the items
    cy.get("#todolistpanel #mytodos #todo_0")
      .find("span")
      .should("have.text", "Task1");
    cy.get("#todolistpanel #mytodos #todo_1")
      .find("span")
      .should("have.text", "Task2");

    // Check if there is 1 item in done-items and the name
    cy.get("#doneitemspanel #mydonetodos").find("li").should("have.length", 1);
    cy.get("#doneitemspanel #mydonetodos #todo_2")
      .find("span")
      .should("have.text", "Task3");

    /*
    14.12: Hover over the list "Copy of Cook"  
      AND
    14.13: Click on the double-paper icon "copy list" and name it "Travel"
    */
    cy.get("#container_1 li span.listname")
      .filter(':contains("Copy of Cook ")')
      .parent("li")
      .find("img.copylist")
      .invoke("css", "visibility", "visible")
      .click();
    cy.wait(1000);
    cy.get("#lists #inplaceeditor").find("#updatebox").type("Travel");

    // 14.14: Click "Cancel" button
    cy.get("#inplaceeditor").find('input[type="button"]').click();

    // Expected result: The copied list of "Copy of Cook" is deleted
    // Check if there are STILL 2 files in category "Home" now
    cy.get("#mycategory_1 ul.categorycontainer")
      .find("li")
      .should("have.length", 2);
  });

  it("15- Nominal case: The user can delete the lists inside the  categories", () => {
    // 15.1: Click on the icon "add new category" and name it "Home"
    cy.get("img.adddivider").click();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("Home");

    // 15.2: Click on the "save" button
    cy.get("#inplaceeditor").find('input[type="submit"]').click();

    // 15.3: Create new list by clicking the icon "add new list" and name it "Clean"
    cy.get("#addlist").click();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("Clean");
    cy.get("#inplaceeditor").find('input[type="submit"]').click();

    // 15.4: Drag the list "Clean" into the category "Home"
    cy.get("li span.listname")
      .filter(':contains("Clean")')
      .parent("li")
      .drag("#mycategory_1 ul.categorycontainer");

    /*
    15.5: Hover over the list "Clean"
      AND
    15.6: Click on the red  X
    */
    cy.get("#mycategory_1 li span.listname")
      .filter(':contains("Clean")')
      .parent("li")
      .find("img.delete")
      .invoke("css", "visibility", "visible")
      .click();

    // Expected result: The list "Clean" is deleted
    cy.get("#mycategory_1 ul.categorycontainer")
      .find("li")
      .should("have.length", 0);
  });

  it("16- Edge case: The user can delete the category with all its list with one delete step", () => {
    // 16.1: Click on the icon "add new category" and name it "Home"
    cy.get("img.adddivider").click();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("Home");

    // 16.2: Click on the "save" button
    cy.get("#inplaceeditor").find('input[type="submit"]').click();

    // 16.3: Create new list by clicking the icon "add new list" and name it "Clean"
    cy.get("#addlist").click();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("Clean");
    // 16.4: Click on the "save" button
    cy.get("#inplaceeditor").find('input[type="submit"]').click();

    // 16.5: Create new list by clicking the icon "add new list" and name it "Programming"
    cy.get("#addlist").click();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("Programming");
    // 16.6: Click on the "save" button
    cy.get("#inplaceeditor").find('input[type="submit"]').click();

    // 16.7: Create new list by clicking the icon "add new list" and name it "Cook"
    cy.get("#addlist").click();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("Cook");
    // 16.8: Click on the "save" button
    cy.get("#inplaceeditor").find('input[type="submit"]').click();

    // 16.9: Create new list by clicking the icon "add new list" and name it "Lunch break"
    cy.get("#addlist").click();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("Lunch break");
    // 16.10: Click on the "save" button
    cy.get("#inplaceeditor").find('input[type="submit"]').click();

    // 16.11: Drag the list "Clean" into the category "Home"
    cy.get("li span.listname")
      .filter(':contains("Clean")')
      .parent("li")
      .drag("#mycategory_1 ul.categorycontainer");

    // 16.12: Drag the list "Programming" into the category "Home"
    cy.get("li span.listname")
      .filter(':contains("Programming")')
      .parent("li")
      .drag("#mycategory_1 ul.categorycontainer");

    // 16.13: Drag the list "Cook" into the category "Home"
    cy.get("li span.listname")
      .filter(':contains("Cook")')
      .parent("li")
      .drag("#mycategory_1 ul.categorycontainer");

    // 16.14: Drag the list "Lunch break" into the category "Home"
    cy.get("li span.listname")
      .filter(':contains("Lunch break")')
      .parent("li")
      .drag("#mycategory_1 ul.categorycontainer");

    /*
    Expected result: 
    The category "Home":
      -Clean
      - Programming
      - Cook
      - Lunch break   
    */
    cy.get("#mycategory_1 ul.categorycontainer")
      .find("li span.listname")
      .should("have.length", 4)
      .each(($item) => {
        const itemText = $item.text();
        expect(itemText).to.be.oneOf([
          "Clean ",
          "Programming ",
          "Cook ",
          "Lunch break ",
        ]);
      });

    /*
    16.15: Hover over the category "Home"
      AND
    16.16: Click on the red X 
    */
    cy.get("#mycategories #category_1")
      .find("img.delete")
      .invoke("css", "visibility", "visible")
      .click();
    // Expected result: The category "Home" with all of its lists is deleted
    cy.get("#lists #mycategories ").find("li").should("have.length", 0);
    cy.get("#mylist_6").should("not.exist");
    cy.get("#mylist_7").should("not.exist");
    cy.get("#mylist_8").should("not.exist");
    cy.get("#mylist_9").should("not.exist");
  });

  it("17- Nominal case: The user can hide lists in the  categories", () => {
    // 17.1: Click on the icon "add new category" and name it "Home"
    cy.get("img.adddivider").click();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("Home");

    // 17.2: Click on the "save" button
    cy.get("#inplaceeditor").find('input[type="submit"]').click();

    // 17.3: Create new list by clicking the icon "add new list" and name it "Clean"
    cy.get("#addlist").click();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("Clean");
    // 17.4: Click on the "save" button
    cy.get("#inplaceeditor").find('input[type="submit"]').click();

    // 17.5: Create new list by clicking the icon "add new list" and name it "Cook"
    cy.get("#addlist").click();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("Cook");
    // 17.6: Click on the "save" button
    cy.get("#inplaceeditor").find('input[type="submit"]').click();

    // 17.7: Drag the list "Clean" into the category "Home"
    cy.get("li span.listname")
      .filter(':contains("Clean")')
      .parent("li")
      .drag("#mycategory_1 ul.categorycontainer");

    // 17.8: Drag the list "Cook" into the category "Home"
    cy.get("li span.listname")
      .filter(':contains("Cook")')
      .parent("li")
      .drag("#mycategory_1 ul.categorycontainer");

    /*
    17.9: Hover over the category "Home"
      AND
    17.10: Click on the blue arrow
    */
    cy.get("#mycategories #category_1")
      .find("img.categorycollapsed")
      .invoke("css", "visibility", "visible")
      .click();
    // Expected result: The lists "Clean" and "Cook" are hidden
    cy.get("#lists #mycategories li#mycategory_1").should(
      "have.class",
      "hidecategory"
    );

    // 17.11: Click on the blue arrow
    cy.get("#mycategories #category_1")
      .find("img.categorycollapsed")
      .invoke("css", "visibility", "visible")
      .click();
    // Expected result: The lists "Clean and "Cook" are visible again
    cy.get("#lists #mycategories li#mycategory_1").should(
      "have.class",
      "showcategory"
    );
  });
});
