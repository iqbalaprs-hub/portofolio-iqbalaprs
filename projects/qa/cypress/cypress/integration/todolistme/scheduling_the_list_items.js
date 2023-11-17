/// <reference types="Cypress" />

describe("Scheduling the list items", () => {
  beforeEach(() => {
    const now = new Date();
    cy.clock(now);

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

    // 1.2: Create new item in the To-do-items: TaskforTomorrow
    cy.get("#additempanel")
      .find("#newtodo")
      .type("TaskforTomorrow")
      .type("{enter}");

    // 1.3: Drag the item "TaskforTomorrow" to the Scheduled-items (Tomorrow category)
    cy.get("#todolistpanel #todo_0").drag("#tomorrowtitle", { force: true });
    /*
    Expected result:
    Next to title "Tomorrow": (1)

    Inside the Scheduled-items:
      - There's a section with title : the title is tomorrow's date & Item "TaskforTomorrow"  is just under the title
    */
    cy.get("#tomorrowpanel #tomorrowtitle ")
      .find("span#tomorrow_number")
      .should("have.text", "( 1 )");
    cy.get("#tomorrowitemspanel").find("li").should("have.length", 1);
    cy.get("#tomorrowitemspanel #todo_0")
      .find("span#mytodo_0")
      .should("have.text", "TaskforTomorrow");
  });

  it("2- Edge case: The user can schedule the list items for tomorrow by dragging the item to Later part in scheduled-items ", () => {
    // 2.1: Create new item in the To-do-items: TaskforTomorrow
    cy.get("#additempanel")
      .find("#newtodo")
      .type("TaskforTomorrow")
      .type("{enter}");

    // 2.2: Drag the item "TaskforTomorrow" to the Scheduled-items (Later category) and choose the date to be tomorrow
    cy.get("#todolistpanel #todo_0").drag("#latertitle", { force: true });
    cy.get("table.ui-datepicker-calendar").find("a.ui-state-active").click();
    /*
    Next to title "Tomorrow": (1)

    Inside the Scheduled-items:
      - There's a section with title : the title is tomorrow's date & Item "TaskforTomorrow" is just under the title

    */
    cy.get("#tomorrowpanel #tomorrowtitle ")
      .find("span#tomorrow_number")
      .should("have.text", "( 1 )");
    cy.get("#tomorrowitemspanel").find("li").should("have.length", 1);
    cy.get("#tomorrowitemspanel #todo_0")
      .find("span#mytodo_0")
      .should("have.text", "TaskforTomorrow");
  });

  it("3- Nominal case: The user can schedule the list items to be any other day, other than today or tomorrow", () => {
    // 3.1: Create new item in the To-do-items: Taskafter2Days
    cy.get("#additempanel")
      .find("#newtodo")
      .type("Taskafter2Days")
      .type("{enter}");

    // 3.2: Drag the item "Taskafter2Days" to the Scheduled-items (later category; Select 2 days after today)
    cy.get("#todolistpanel #todo_0").drag("#latertitle", { force: true });

    // This function works only if you select the date 2 days after today
    cy.get("table.ui-datepicker-calendar td.ui-datepicker-today").then(
      ($today) => {
        // Select all the <td> after the current <td>
        const $nextTd = $today.nextAll("td");
        // Select the parent of the current <td> which is the <tr>
        const $parentTd = $today.parent();
        // Select all the <tr> after the current <tr>
        const $nextTr = $parentTd.nextAll("tr");

        // Check if there is another next <tr> in the current table page calendar
        if ($nextTr.length >= 1) {
          // Check if there are 2 or more <td> after the current <td> in the current <tr>
          if ($nextTd.length >= 2) {
            cy.wrap($nextTd).eq(1).find("a").click();
          }
          // Check if there is only one <td> after the current <td>, go to the next <tr> and select the first <td>
          else if ($nextTd.length === 1) {
            cy.wrap($nextTr).eq(0).find("td:first-child a").click();
          }
          // Check if there is no <td> after the current <td>, go to the next <tr> and select the second <td>
          else if ($nextTd.length === 0) {
            cy.wrap($nextTr)
              .eq(0)
              .should("have.length.at.least", 2)
              .then(($tdElements) => {
                // If the next <tr> has 2 or more <td>
                if ($tdElements.length >= 2) {
                  cy.wrap($nextTr).eq(0).find("td:nth-child(2) a").click();
                }
                // If the next <tr> has only one <td>
                else {
                  cy.get("div.hasDatepicker a.ui-datepicker-next").click();
                  cy.get("table.ui-datepicker-calendar")
                    .find("tr")
                    .first()
                    .find("td")
                    .first()
                    .find("a")
                    .click();
                }
              });
          }
          // If there is no <tr> in the current calendar page
          else {
            // Go to the next calendar page
            // Check if there is only one <td> after the current <td>
            if ($nextTd.length === 1) {
              cy.get("div.hasDatepicker a.ui-datepicker-next").click();
              cy.get("table.ui-datepicker-calendar")
                .find("tr")
                .first()
                .find("td")
                .first()
                .find("a")
                .click();
            }
            // Check if there is no <td> after the current <td>
            else if ($nextTd.length === 0) {
              cy.get("div.hasDatepicker a.ui-datepicker-next").click();
              cy.get("table.ui-datepicker-calendar")
                .find("tr")
                .first()
                .find("td")
                .eq(1)
                .find("a")
                .click();
            }
          }
        }
      }
    );

    /*
    Expected result: 
   
    Next to title "Later": (1)

    Inside the Scheduled-items:
      - There's a section with title : the title is after 2 days' date & Item  "Taskafter2Days"  is just under the title
    */
    cy.get("#tomorrowpanel #latertitle")
      .find("span#later_number")
      .eq(0)
      .should("have.text", "( 1 )");
    cy.get("#tomorrowitemspanel").find("li").should("have.length", 1);
    cy.get("#tomorrowitemspanel ul li:eq(0)")
      .find("span")
      .should("have.text", "Taskafter2Days");
  });

  it("4- Nominal case: The user can mix various date (both tomorrow and Later part) in the schedule-items", () => {
    // 4.1: Create new item in the To-do-items: TaskforTomorrow
    cy.get("#additempanel")
      .find("#newtodo")
      .type("TaskforTomorrow")
      .type("{enter}");

    // 4.2: Create new item in the To-do-items: Taskafter2Days
    cy.get("#additempanel")
      .find("#newtodo")
      .type("Taskafter2Days")
      .type("{enter}");

    // 4.3: Drag the item "TaskforTomorrow" to the Scheduled-items (Tomorrow category)
    cy.get("#todolistpanel #todo_0").drag("#tomorrowtitle", { force: true });

    /*
    Expected result:

    Next to title "Tomorrow": (1)

    Inside the Scheduled-items:
      - There's a section with title : the title is tomorrow's date & Item "TaskforTomorrow" is just under the title
    */
    cy.get("#tomorrowpanel #tomorrowtitle ")
      .find("span#tomorrow_number")
      .should("have.text", "( 1 )");
    cy.get("#tomorrowitemspanel").find("li").should("have.length", 1);
    cy.get("#tomorrowitemspanel ul li:eq(0)")
      .find("span")
      .should("have.text", "TaskforTomorrow");

    // 4.4: Drag the item "Taskafter2Days" to the Scheduled-items (later category; Select 2 days after today)
    cy.get("#todolistpanel #todo_1").drag("#latertitle", { force: true });
    cy.get("table.ui-datepicker-calendar")
      .find("td.ui-datepicker-current-day")
      .next("td")
      .should("exist")
      .then((nextTd) => {
        cy.wrap(nextTd).find("a").click();
      });
    /*
    Expected result:

    Next to title "Tomorrow": (1)
    Next to title "Later": (1)

    Inside the Scheduled-items:
      - There's a section with title : the title is tomorrow's date & Item "TaskforTomorrow" is just under the title
      - There's another section with title : the title is after 2 days' date & Item  "Taskafter2Days"  is just under the title

    The dates are automatically sorted from newest on top to latest on bottom
    */
    cy.get("#tomorrowpanel #tomorrowtitle ")
      .find("span#tomorrow_number")
      .should("have.text", "( 1 )");
    cy.get("#tomorrowpanel #latertitle")
      .find("span#later_number")
      .eq(0)
      .should("have.text", "( 1 )");
    cy.get("#tomorrowitemspanel").find("li").should("have.length", 2);
    cy.get("#tomorrowitemspanel ul li:eq(0)")
      .find("span")
      .should("have.text", "TaskforTomorrow");
    cy.get("#tomorrowitemspanel ul li:eq(1)")
      .find("span")
      .should("have.text", "Taskafter2Days");
  });

  it("5- Nominal case: The user can hide the list items in the scheduled-items", () => {
    // 5.1: Create new item in the To-do-items: TaskforTomorrow1
    cy.get("#additempanel")
      .find("#newtodo")
      .type("TaskforTomorrow1")
      .type("{enter}");

    // 5.2: Create new item in the To-do-items: TaskforTomorrow2
    cy.get("#additempanel")
      .find("#newtodo")
      .type("TaskforTomorrow2")
      .type("{enter}");

    // 5.3: Drag the item "TaskforTomorrow1" to the Scheduled-items (Tomorrow category)
    cy.get("#todolistpanel #todo_0").drag("#tomorrowtitle", { force: true });
    /*
    Expected result:
    Next to title "Tomorrow": (1)

    Inside the Scheduled-items:
      - There's a section with title : the title is tomorrow's date & Item "TaskforTomorrow1" is just under the title
    */
    cy.get("#tomorrowpanel #tomorrowtitle ")
      .find("span#tomorrow_number")
      .should("have.text", "( 1 )");
    cy.get("#tomorrowitemspanel").find("li").should("have.length", 1);
    cy.get("#tomorrowitemspanel #todo_0")
      .find("span#mytodo_0")
      .should("have.text", "TaskforTomorrow1");

    // 5.4: Drag the item "TaskforTomorrow2" to the Scheduled-items (Tomorrow category)
    cy.get("#todolistpanel #todo_1").drag("#tomorrowtitle", { force: true });
    /*
    Expected result:
    Next to title "Tomorrow": (2)

    Inside the Scheduled-items:
      - There's a section with title : the title is tomorrow's date & Items  "TaskforTomorrow1" and   "TaskforTomorrow2"  are just under the title
    */
    cy.get("#tomorrowpanel #tomorrowtitle ")
      .find("span#tomorrow_number")
      .should("have.text", "( 2 )");
    cy.get("#tomorrowitemspanel").find("li").should("have.length", 2);
    cy.get("#tomorrowitemspanel #todo_0")
      .find("span#mytodo_0")
      .should("have.text", "TaskforTomorrow1");
    cy.get("#tomorrowitemspanel #todo_1")
      .find("span#mytodo_1")
      .should("have.text", "TaskforTomorrow2");

    // 5.5: Click on blue arrow
    cy.get("#tomorrowpanel #tomorrowheader").find("img#tomorrowarrow").click();
    cy.get("#tomorrowpanel #tomorrowheader")
      .find("img#tomorrowarrow")
      .should("have.attr", "src", "https://todolistme.net/images/arrow_up.png");

    // 5.6: Click on blue arrow
    cy.get("#tomorrowpanel #tomorrowheader").find("img#tomorrowarrow").click();
    cy.get("#tomorrowpanel #tomorrowheader")
      .find("img#tomorrowarrow")
      .should(
        "have.attr",
        "src",
        "https://todolistme.net/images/arrow_down.png"
      );
  });

  it("6- Nominal case: The item scheduled for tomorrow which is in 'Tomorrow' part, will be on the to-do-items part after 1 day has passed ⏰", () => {
    // 6.1: Create new item in the To-do-items: TaskforTomorrow
    cy.get("#additempanel")
      .find("#newtodo")
      .type("TaskforTomorrow")
      .type("{enter}");

    // 6.2: Drag the item "TaskforTomorrow" to the Scheduled-items (Tomorrow category)
    cy.get("#todolistpanel #todo_0").drag("#tomorrowtitle", { force: true });

    /*
    Next to title "Tomorrow": (1)

    Inside the Scheduled-items:
      - There's a section with title : the title is tomorrow's date & Item  "TaskforTomorrow"  is just under the title
    */
    cy.get("#tomorrowpanel #tomorrowtitle ")
      .find("span#tomorrow_number")
      .should("have.text", "( 1 )");
    cy.get("#tomorrowitemspanel").find("li").should("have.length", 1);
    cy.get("#tomorrowitemspanel #todo_0")
      .find("span#mytodo_0")
      .should("have.text", "TaskforTomorrow");

    cy.wait(1000);

    // 6.3: Wait for 1 day and 1 hour to pass
    cy.tick(1 * 24 * 60 * 60 * 1000 + 1 * 60 * 60 * 1000, { log: true });
    // We did this step because we need to do an action in order for the cy.tick() to run
    cy.get("#sortselect").find("#sort0").click();

    /*
    Expected return: 

    TaskforTomorrow is no longer in Scheduled-items
    TaskforTomorrow is in the to-do-items
    */
    cy.get("#todolistpanel #todo_0")
      .find("span#mytodo_0")
      .should("have.text", "TaskforTomorrow");

    cy.get("#todolistpanel #mytodos").find("li").should("have.length", 1);
    cy.get("#tomorrowpanel #tomorrowtitle ")
      .find("span#tomorrow_number")
      .should("not.have.text");
  });

  it("6bis- Nominal case: The item scheduled for after-tomorrow which were in Later part becomes in Tomorrow part after 1 day is passed  🛠️", () => {
    // 6bis.1: Create new item in the To-do-items: TaskforTomorrow
    cy.get("#additempanel")
      .find("#newtodo")
      .type("TaskforTomorrow")
      .type("{enter}");

    // 6bis.2: Drag the item "TaskforTomorrow" to the Scheduled-items (Tomorrow category)
    cy.get("#todolistpanel #todo_0").drag("#tomorrowtitle", { force: true });
    /*
    Expected result:
    Next to title "Tomorrow": (1)

    Inside the Scheduled-items:
      - There's a section with title : the title is tomorrow's date & Item  "TaskforTomorrow"  is just under the title
  
    */
    cy.get("#tomorrowpanel #tomorrowtitle ")
      .find("span#tomorrow_number")
      .should("have.text", "( 1 )");
    cy.get("#tomorrowitemspanel").find("li").should("have.length", 1);
    cy.get("#tomorrowitemspanel ul li:eq(0)")
      .find("span")
      .should("have.text", "TaskforTomorrow");
    cy.wait(1000);

    // 6bis.3: Change the timestamp in the local storage so that "TaskforTomorrow" which is an item for tomorrow will become an item for to-do-items🛠️

    /*
    cy.window().then((win) => { ... });: This Cypress command gets the window object of the application. The window object represents the browser window and provides access to properties like localStorage.
    */
    cy.window().then((win) => {
      cy.log("I am here");

      /*
      localStorageKey: Specifies the key used to store data in local storage. Replace it with the actual key used by the application.
      localStorageData: Retrieves the data from local storage using the specified key.
      ASK: I TRIED TO REPLACE "your-local-storage-key" BY "productivityunit", BUT IT DIDNT WORK.
      */
      const localStorageKey = "productivityunit"; // Replace with the actual key
      const localStorageData = win.localStorage.getItem(localStorageKey);

      // Checks if there is data in local storage. If data exists, proceed with the modifications.
      if (localStorageData) {
        // Parse JSON data
        /*
        Local Storage Stores Strings: Local storage in web browsers is designed to store key-value pairs as strings. When you save data to local storage, it gets converted to a string representation, even if it's originally an object or another data type.
  
        JSON.parse() Converts String to Object: In JavaScript, the JSON.parse() function is used to parse a JSON-formatted string and convert it into a JavaScript object. This is necessary because JavaScript objects allow you to interact with the data in a structured way, accessing properties and modifying values.
  
        Structured Data Manipulation: Once you have the data as a JavaScript object (in this case, jsonData), you can easily navigate its structure, access specific properties, and make modifications. This is crucial when you want to update values within the data structure, such as changing timestamps or modifying other properties.
  
        In the context of your Cypress test script:
  
        Retrieve Data: You retrieve the data from local storage, which gives you a string (localStorageData).
  
        Convert to Object: The JSON.parse() step then converts this string into a JavaScript object (jsonData), making it easy to work with and manipulate the data in a structured manner.
  
        Update and Save: After making any necessary changes to the object, you can convert it back to a JSON-formatted string using JSON.stringify() and save it back to local storage. This step is important for persisting the changes you've made during the test.
  
        In summary, JSON.parse() is a crucial step to convert the string representation of your stored JSON data into a usable JavaScript object within your Cypress test script.
        */
        const jsonData = JSON.parse(localStorageData);
        cy.wait(1000);

        // Locates the "Test todo list" and "TaskforTomorrow" items within the parsed JSON data
        const testTodoList = jsonData.listmanager.lists.find(
          (list) => list.name === "Test%20todo%20list"
        );

        cy.log(JSON.stringify(testTodoList));
        cy.wait(1000);
        const taskForTomorrow = testTodoList.todos.find(
          (todo) => todo.name === "TaskforTomorrow"
        );
        cy.log(JSON.stringify(taskForTomorrow));

        // If "TaskforTomorrow" is found, updates the "dateadded" and "tomorrow" timestamps.
        if (taskForTomorrow) {
          // Update the "dateadded" timestamp
          taskForTomorrow.dateadded = taskForTomorrow.dateadded - 86400000;
          taskForTomorrow.tomorrow = taskForTomorrow.tomorrow;

          // Stringify and update local storage
          // Converts the modified JavaScript object back to a JSON string (updatedData) and updates the data in local storage with the new string.
          const updatedData = JSON.stringify(jsonData);
          win.localStorage.setItem(localStorageKey, updatedData);
        }
      }
    });
    // Optionally, you can reload the page to reflect the changes
    cy.reload();
  });
});
