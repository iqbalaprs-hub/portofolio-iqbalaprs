/// <reference types="Cypress" />

describe("Watching the progress and percentage of task accomplished", () => {
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

  it("1- Nominal case: Progress line with all To-do-items, Done-items and Scheduled-items empty", () => {
    /*
    1.1: expected result:
    To-do-items empty

    Done-items empty

    Scheduled-items empty

    Progress line is not visible in both To-do-items and Done-items. Their width is zero

    Progress line in To-do-items: width is 0%
    Progress line in Done-items: width is 0%
    */
    cy.get("#todolistpanel").find("#mytodos").find("li").should("not.exist");
    cy.get("div#todolistpanel p.notodos")
      .should("exist")
      .contains("No items. Why not add one below.");
    cy.get("#doneitemspanel")
      .find("#mydonetodos")
      .find("li")
      .should("not.exist");
    cy.get("#doneitemspanel p.notodos")
      .should("exist")
      .contains("No done items.");
    cy.get("#tomorrowpanel")
      .find("#tomorrowitemspanel")
      .find("ul")
      .should("not.exist");
    cy.get("#tomorrowpanel")
      .find("#tomorrowitemspanel p.notodos")
      .should("exist")
      .contains(
        "Drag todos onto the Tomorrow or Later titles above to put them off till later."
      );
    // Since nothing is done or added, the progress bar in todolist is 0%
    cy.get("#todoprogress").then(($progressBar) => {
      const width = parseFloat($progressBar.css("width"));
      const fullWidth = parseFloat($progressBar.parent().css("width")) + 10;

      const percentageWidth = (width / fullWidth) * 100;

      cy.log(
        `The width of the progress bar in todolist is: ${width.toFixed(
          2
        )}px/${fullWidth.toFixed(2)}px, ${percentageWidth.toFixed(2)}%`
      );
    });
    // Since nothing is done or added, the progress bar in donelist is 0%
    cy.get("#doneprogress").then(($progressBar) => {
      const width = parseFloat($progressBar.css("width"));
      const fullWidth = parseFloat($progressBar.parent().css("width")) + 10;

      const percentageWidth = (width / fullWidth) * 100;

      cy.log(
        `The width of the progress bar in donelist is: ${width.toFixed(
          2
        )}px/${fullWidth.toFixed(2)}px, ${percentageWidth.toFixed(2)}%`
      );
    });
  });

  it("2- Nominal case: Progress line at 100% with items changing between To-do-items and Done-items", () => {
    // 2.1: Create new item in the To-do-items: Task1
    cy.get("#additempanel").find("#newtodo").type("Task1").type("{enter}");
    /*
    Progress line in To-do-items: width is 0%

    Progress line in Done-items: width is 0%
    */
    cy.get("#todoprogress").then(($progressBar) => {
      const width = parseFloat($progressBar.css("width"));
      const fullWidth = parseFloat($progressBar.parent().css("width")) + 10;
      const percentageWidth = (width / fullWidth) * 100;
      cy.log(
        `Since there is only 1 item in todolist and no item in donelist, the width of the progress bar in todolist is: ${width.toFixed(
          2
        )}px/${fullWidth.toFixed(2)}px, ${percentageWidth.toFixed(2)}%`
      );
    });

    cy.get("#doneprogress").then(($progressBar) => {
      const width = parseFloat($progressBar.css("width"));
      const fullWidth = parseFloat($progressBar.parent().css("width")) + 10;
      const percentageWidth = (width / fullWidth) * 100;
      cy.log(
        `Since there is only 1 item in todolist and no item in donelist, the width of the progress bar in donelist is: ${width.toFixed(
          2
        )}px/${fullWidth.toFixed(2)}px, ${percentageWidth.toFixed(2)}%`
      );
    });

    // 2.2: Check item "Task1"
    cy.get("#todolistpanel #mytodos #todo_0")
      .find('input[type="checkbox"]')
      .click();
    /*
    Task1 is now in the Done-items

    Progress line in To-do-items: width is 100% 

    Progress line in Done-items: width is 100% 

      */
    cy.get("#doneitemspanel #mydonetodos #todo_0")
      .find("span#mytodo_0")
      .should("have.text", "Task1");
    cy.get("#doneitemspanel #mydonetodos #todo_0")
      .find('input[type="checkbox"]')
      .should("be.checked");

    cy.wait(2000);

    cy.get("#todoprogress").then(($progressBar) => {
      const width = parseFloat($progressBar.css("width"));
      const fullWidth = parseFloat($progressBar.parent().css("width")) + 10;
      const percentageWidth = (width / fullWidth) * 100;
      cy.log(
        `Since there is no item in todolist and 1 item in donelist, the width of the progress bar in todolist is: ${width.toFixed(
          2
        )}px/${fullWidth.toFixed(2)}px, ${percentageWidth.toFixed(2)}%`
      );
    });

    cy.get("#doneprogress").then(($progressBar) => {
      const width = parseFloat($progressBar.css("width"));
      const fullWidth = parseFloat($progressBar.parent().css("width")) + 10;
      const percentageWidth = (width / fullWidth) * 100;
      cy.log(
        `Since there is no item in todolist and 1 item in donelist, the width of the progress bar in donelist is: ${width.toFixed(
          2
        )}px/${fullWidth.toFixed(2)}px, ${percentageWidth.toFixed(2)}%`
      );
    });
  });
});
