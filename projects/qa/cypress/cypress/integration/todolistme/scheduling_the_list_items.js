/// <reference types="Cypress" />

describe("My Second Test Suite", () => {
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

  it("1- Nominal case: The user can schedule the list items for tomorrow by dragging the item to 'Tomorrow' part in scheduled-items", () => {
    // 1.1: There is no number next to both title "Tomorrow" and "Later" in the Scheduled-items
    cy.get("#tomorrowpanel #tomorrowtitle ")
      .find("span#tomorrow_number")
      .should("not.have.text");
    cy.get("#tomorrowpanel #latertitle")
      .find("span#later_number")
      .eq(0)
      .should("not.have.text");

    // 1.2: Create new item in the To-do-items: Task1
    cy.get("#additempanel").find("#newtodo").type("Task1").type("{enter}");

    // 1.3: Create new item in the To-do-items: Task2
    cy.get("#additempanel").find("#newtodo").type("Task2").type("{enter}");

    // 1.4: Create new item in the To-do-items: Task3
    cy.get("#additempanel").find("#newtodo").type("Task3").type("{enter}");

    // 1.5: Drag the item "Task3" to the Scheduled-items (Tomorrow category)
    cy.get("#todolistpanel #todo_2").drag("#tomorrowtitle", { force: true });
    /*
    Expected result:
    Next to title "Tomorrow": (1)

    Inside the Scheduled-items:
        - Item "Task3"  is under tomorrow's date
    */
    cy.get("#tomorrowpanel #tomorrowtitle ")
      .find("span#tomorrow_number")
      .should("have.text", "( 1 )");
    cy.get("#tomorrowitemspanel").find("li").should("have.length", 1);
    cy.get("#tomorrowitemspanel #todo_2")
      .find("span#mytodo_2")
      .should("have.text", "Task3");

    // 1.6: Drag the item "Task2" to the Scheduled-items (Tomorrow category)
    cy.get("#todolistpanel #todo_1").drag("#tomorrowtitle", { force: true });
    /*
    Expected result:
    Next to title "Tomorrow": (2)

    Inside the Scheduled-items:
        - Items "Task2" and "Task3"  are under tomorrow's date
    */
    cy.get("#tomorrowpanel #tomorrowtitle ")
      .find("span#tomorrow_number")
      .should("have.text", "( 2 )");
    cy.get("#tomorrowitemspanel").find("li").should("have.length", 2);
    cy.get("#tomorrowitemspanel #todo_2")
      .find("span#mytodo_2")
      .should("have.text", "Task3");
    cy.get("#tomorrowitemspanel #todo_1")
      .find("span#mytodo_1")
      .should("have.text", "Task2");

    // 1.7: Drag the item "Task1" to the Scheduled-items (Tomorrow category)
    cy.get("#todolistpanel #todo_0").drag("#tomorrowtitle", { force: true });
    /*
    Expected result:
    Next to title "Tomorrow": (3)

    Inside the Scheduled-items:
        - Items "Task1", "Task2" and "Task3" are under tomorrow's date
    */
    cy.get("#tomorrowpanel #tomorrowtitle ")
      .find("span#tomorrow_number")
      .should("have.text", "( 3 )");
    cy.get("#tomorrowitemspanel").find("li").should("have.length", 3);
    cy.get("#tomorrowitemspanel #todo_2")
      .find("span#mytodo_2")
      .should("have.text", "Task3");
    cy.get("#tomorrowitemspanel #todo_1")
      .find("span#mytodo_1")
      .should("have.text", "Task2");
    cy.get("#tomorrowitemspanel #todo_0")
      .find("span#mytodo_0")
      .should("have.text", "Task1");
    cy.get("#tomorrowitemspanel ul li").should(($lis) => {
      // Convert the list items into an array of their text content
      const textArray = $lis.map((index, el) => Cypress.$(el).text()).get();

      // Define the expected order
      const expectedOrder = ["Task1", "Task2", "Task3"];

      expect(textArray).to.deep.equal(expectedOrder);
    });
  });

  it("2- Edge case: The user can schedule the list items for tomorrow by dragging the item to Later part in scheduled-items ", () => {
    // 2.1: Create new item in the To-do-items: Task1
    cy.get("#additempanel").find("#newtodo").type("Task1").type("{enter}");

    // 2.2: Create new item in the To-do-items: Task2
    cy.get("#additempanel").find("#newtodo").type("Task2").type("{enter}");

    // 2.3: Drag the item "Task1" to the Scheduled-items (Later category) and choose the date to be tomorrow
    cy.get("#todolistpanel #todo_0").drag("#latertitle", { force: true });
    cy.get("table.ui-datepicker-calendar").find("a.ui-state-active").click();
    /*
    Expected result:
    Next to title "Tomorrow": (1)

    Inside the Scheduled-items:
    - Item "Task1"  is under tomorrow's date

    */
    cy.get("#tomorrowpanel #tomorrowtitle ")
      .find("span#tomorrow_number")
      .should("have.text", "( 1 )");
    cy.get("#tomorrowitemspanel").find("li").should("have.length", 1);
    cy.get("#tomorrowitemspanel #todo_0")
      .find("span#mytodo_0")
      .should("have.text", "Task1");

    // 2.4: Drag the item "Task2" to the Scheduled-items (Later category) and choose the date to be tomorrow
    cy.get("#todolistpanel #todo_1").drag("#latertitle", { force: true });
    cy.get("table.ui-datepicker-calendar").find("a.ui-state-active").click();

    /*
    Expected result: 
    Next to title "Tomorrow": (2)

    Inside the Scheduled-items:
    - Items "Task1" and "Task2"  are under tomorrow's date

    */
    cy.get("#tomorrowpanel #tomorrowtitle ")
      .find("span#tomorrow_number")
      .should("have.text", "( 2 )");
    cy.get("#tomorrowitemspanel").find("li").should("have.length", 2);
    cy.get("#tomorrowitemspanel #todo_0")
      .find("span#mytodo_0")
      .should("have.text", "Task1");
    cy.get("#tomorrowitemspanel #todo_1")
      .find("span#mytodo_1")
      .should("have.text", "Task2");
  });
});
