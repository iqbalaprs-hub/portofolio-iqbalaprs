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
    // Check if the name of the new category is "New Category"
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
    // Check if the name of the new category is "New Category"
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
    // Expected return: A new category is created. It is named "Home"
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
    // Expected return: The category was not created
    // Check if there are STILL 2 categories
    cy.get("#lists #mycategories ").find("li").should("have.length", 2);
  });

  it("3- Nominal case: The user can rename categories", () => {
    // 3.1: Click on the icon "add new category"
    cy.get("img.adddivider").click();

    // 3.2: Click on the "save" button
    cy.get("#inplaceeditor").find('input[type="submit"]').click();
    // Expected return: A new category is created. It is named "New Category" (which is the default name)
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
    // Expected return: The category is now named "Work"
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
    // Expected return: The category's name remains "Work"
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
    // Expected return: The new category is named  "فئة جديدة"
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
    // Expected return: The new category is named  "新类别"
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
    // Expected return: The new category is named  "!@#$%^&*()"
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
    // Expected return: An alert appears with sentence "Name can't be blank"
    // 7.3: Click "OK" on the alert
    cy.on("window:alert", (Text) => {
      expect(Text).to.contains("Name can't be blank");
    });

    // 7.4: Click "cancel" button
    cy.get("#inplaceeditor").find('input[type="button"]').click();
    // Expected return: The category's name returns to its default name "New Category"
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
    // Expected return: An alert appears with sentence "Name can't be blank"
    // 8.3: Click "OK" on the alert
    cy.on("window:alert", (Text) => {
      expect(Text).to.contains("Name can't be blank");
    });

    // 8.4: Click "cancel" button
    cy.get("#inplaceeditor").find('input[type="button"]').click();
    // Expected return: The category's name returns to its default name "New Category"
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
    // Expected return: A new category is created. It is named "New Category" (which is the default name)
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
    // Expected return: A new category is created. It is named "New Category" (which is the default name)
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
    // Expected return: A new category is created. It is named "New Category" (which is the default name)
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
    // Expected return: This category is named  "Copy-category"
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
    // Expected return: This category is named  "Copy-category"
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
    // Expected return: This category is named  "Copy-category"
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
    // Expected return: A new category is created. It is named "New Category"
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
    // Expected return: The category "New Category" is deleted
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
    Expected return:
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

    // 13.8: Drag the list "Programming" into the category "Home"
    cy.get("li span.listname")
      .filter(':contains("Programming")')
      .parent("li")
      .drag("#mycategory_1 ul.categorycontainer");

    // 13.9: Drag the list "Cook" into the category "Home"
    cy.get("li span.listname")
      .filter(':contains("Cook")')
      .parent("li")
      .drag("#mycategory_1 ul.categorycontainer");

    // 13.10: Drag the list "Lunch break" into the category "Home"
    cy.get("li span.listname")
      .filter(':contains("Lunch break")')
      .parent("li")
      .drag("#mycategory_1 ul.categorycontainer");
  });
});
