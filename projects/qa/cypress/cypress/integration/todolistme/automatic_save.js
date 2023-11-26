/// <reference types="Cypress" />

describe("Feature: Automatic save", () => {
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

  it("1- Nominal case: The web application is automatically saved", () => {
    // 1.1: Create new item in the To-do-items: Task1
    cy.get("#additempanel").find("#newtodo").type("Task1").type("{enter}");

    // 1.2: Create new item in the To-do-items: Task2
    cy.get("#additempanel").find("#newtodo").type("Task2").type("{enter}");

    // 1.3: Create new item in the To-do-items: Task3
    cy.get("#additempanel").find("#newtodo").type("Task3").type("{enter}");

    // 1.4: Create new item in the To-do-items: Task4
    cy.get("#additempanel").find("#newtodo").type("Task4").type("{enter}");

    // 1.5: Check The item "Task4"
    cy.get("#todolistpanel #mytodos #todo_3")
      .find('input[type="checkbox"]')
      .click();

    // 1.6: Drag the item "Task3" to Scheduled-items (Tomorrow category)
    cy.get("#todolistpanel #mytodos #todo_2").drag("#tomorrowtitle", {
      force: true,
    });

    // 1.7: Create new category called "Home"
    cy.get("img.adddivider").click();
    cy.get("#lists #inplaceeditor").find("#updatebox").type("Home");
    cy.get("#inplaceeditor").find('input[type="submit"]').click();

    // 1.8: Exist the TodoListMe website
    cy.visit("https://www.wikipedia.org/");

    // 1.9: Enter the TodoListME website
    cy.visit("https://todolistme.net/");
    /*
    Expected result:
    In the "Test todo list":
        - To-do-items: Task1 , Task2
        - Done-items: Task4
        - Scheduled-items: Task3 
    */
    cy.get("li span.listname")
      .filter(':contains("Test todo list")')
      .parent("li")
      .click();

    cy.get("#todolistpanel #mytodos").find("li").should("have.length", 2);
    cy.get("#todolistpanel #mytodos li:eq(0)")
      .find("span")
      .should("have.text", "Task1");
    cy.get("#todolistpanel #mytodos li:eq(0)")
      .find('input[type="checkbox"]')
      .should("not.be.checked");
    cy.get("#todolistpanel #mytodos li:eq(1)")
      .find("span")
      .should("have.text", "Task2");
    cy.get("#todolistpanel #mytodos li:eq(1)")
      .find('input[type="checkbox"]')
      .should("not.be.checked");

    cy.get("#doneitemspanel #mydonetodos").find("li").should("have.length", 1);
    cy.get("#doneitemspanel #mydonetodos li:eq(0)")
      .find("span")
      .should("have.text", "Task4");
    cy.get("#doneitemspanel #mydonetodos li:eq(0)")
      .find('input[type="checkbox"]')
      .should("be.checked");

    cy.get("#tomorrowpanel #tomorrowheader img#tomorrowarrow").click();
    cy.get("#tomorrowitemspanel ul").find("li").should("have.length", 1);
    cy.get("#tomorrowitemspanel li:eq(0)")
      .find("span")
      .should("have.text", "Task3");
    cy.get("#tomorrowitemspanel li:eq(0)")
      .find('input[type="checkbox"]')
      .should("not.be.checked");

    // Expected result: Category "Home"
    cy.get("#lists #mycategories ").find("li").should("have.length", 1);
    cy.get("#lists #mycategories li:eq(0)")
      .find("span")
      .should("have.text", "Home");

    // Expected result: 6 lists and the sixth list is "Test todo list"
    cy.get("#listmanager #lists #container_0")
      .find("li")
      .should("have.length", 6);
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
});
