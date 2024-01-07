// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// I took the advice about cy.tab() from "https://www.programsbuzz.com/article/how-press-tab-key-cypress" and I also did "npm install cypress-real-events --save-dev"
require("cypress-plugin-tab");

// https://www.youtube.com/watch?v=v_3-H00N5Go
// https://www.youtube.com/watch?v=T1xpl1_A2dU
//https://reflect.run/articles/testing-drag-and-drop-workflows-using-cypress/#:~:text=You%20can%20add%20drag%2Dand,cypress%2Ddrag%2Ddrop%20plugin.&text=Then%2C%20add%20the%20following%20line,cypress%2Ddrag%2Ddrop%22)%3B
require("@4tw/cypress-drag-drop");

/*                                   TODOLISTME PROJECT                          */

// This function works only if you select the date 2 days after today
// NOTE: "td.ui-datepicker-current-day" is the tomorrow day
// This is related to todolistme project
Cypress.Commands.add("pickDate2dayslaterInTodolistme", () => {
  cy.get("table.ui-datepicker-calendar td.ui-datepicker-current-day").then(
    ($today) => {
      // Select all the <td> after the current <td>
      const $nextTd = $today.nextAll("td");
      // Select the parent of the current <td> which is the <tr>
      const $parentTd = $today.parent();
      // Select all the <tr> after the current <tr>
      const $nextTr = $parentTd.nextAll("tr");

      // CHECK IF THERE IS ANOTHER NEXT <TR> IN THE CURRENT TABLE PAGE CALENDAR. IF THERE IS, IT MEANS THAT THERE MUST AT LEAST ONE <TD> IN THE NEXT <TR>
      if ($nextTr.length >= 1) {
        // Case 1: Check if there is 1 or more <td> after the current <td> in the current <tr> and the next <td> is NOT empty and disabled
        if ($nextTd.length >= 1) {
          cy.wrap($nextTd)
            .eq(0)
            .should("not.have.class", "ui-state-disabled")
            .then(() => {
              cy.wrap($nextTd).eq(0).find("a").click();
            });
        }

        //  Case 2: Check if there is no <td> after the current <td> in the current <tr>, go to the next <tr> and select the first <td>
        else if ($nextTd.length === 0) {
          cy.wrap($nextTr).eq(0).find("td:first-child a").click();
        }
      }

      // CHECK IF THERE ARE NO <TR> AFTER THE CURRENT <TR>
      else {
        // Case 1: Check if there is 1 or more <td> after the current <td> in the current <tr>, and the next <td> is NOT empty and disabled

        if (
          $nextTd.length >= 1 &&
          !$nextTd.eq(0).hasClass("ui-state-disabled")
        ) {
          cy.wrap($nextTd).eq(0).find("a").click();
        }

        // cy.wrap($nextTd)
        //   .eq(0)
        //   .should("not.have.class", "ui-state-disabled")
        //   .then(() => {
        //     cy.wrap($nextTd).eq(0).find("a").click();
        //   });

        // Case 2: Check if there is 1 or more <td> after the current <td> in the current <tr> and the next <td> is empty and disabled.Thus go to the next calendar page and select the first NON-disabled <td> in the first <tr>
        else {
          cy.wrap($nextTd)
            .eq(0)
            .should("have.class", "ui-state-disabled")
            .then(() => {
              cy.get("div.hasDatepicker a.ui-datepicker-next").click();

              // Find the first <td> who is NOT disabled in the next month
              cy.get("table.ui-datepicker-calendar")
                .find("tr")
                .eq(1)
                .find("td:not(.ui-state-disabled)")
                .first()
                .click();
            });
        }
      }
    }
  );
});

/*                                  TWITTER-CLONE END-TO-END TESTING PROJECT                           */

// This function shows the expected result of a sign Up in twitter-clone
Cypress.Commands.add("assertSuccesfullSignUp", () => {
  // Expected result: The user is automatically signed in
  cy.get('a[data-cy="nav-signin-link"]').should("not.exist");

  // Expected result: The user is taken to "Home" page
  cy.get("ul").contains("a", "Home").should("have.class", "active");

  // Expected result: The Sign Up button in the navigation bar disappears
  cy.get('a[data-cy="nav-signup-link"]').should("not.exist");
});

// This function shows the expected result of signing in as John in twitter-clone
Cypress.Commands.add("assertSuccesfullSignIn", () => {
  // Expected result: The user enters his account (the user is signed-in)
  cy.get("reach-portal")
    .children("div")
    .first()
    .children("div")
    .first()
    .children("p")
    .first()
    .should("have.text", "John");

  cy.get("reach-portal")
    .children("div")
    .first()
    .children("div")
    .first()
    .children("p")
    .eq(1)
    .should("have.text", "@john");

  // Expected result: The user is taken to the “Home” page
  cy.get("ul").contains("a", "Home").should("have.class", "active");

  // Expected result: The “Sign In” button in the navigation bar disappears (Only anonymous user can see the “Sign In” button in the navigation bar
  cy.get('a[data-cy="nav-signin-link"]').should("not.exist");
});

// This is all the steps to sign In in twitter-clone
Cypress.Commands.add("signInTwitterClone", (emailOrUsername, password) => {
  // Click on Sign In button
  cy.get('a[data-cy="nav-signin-link"]').click();
  // Write Email or username
  cy.get('form[data-cy="signin-form"]')
    .find('input[data-cy="signin-username-input"]')
    .type(emailOrUsername);
  // Write Password
  cy.get('form[data-cy="signin-form"]')
    .find('input[data-cy="signin-password-input"]')
    .type(password);
  // Click on Sign submit button
  cy.get('form[data-cy="signin-form"]')
    .find('button[data-cy="signin-button"]')
    .click();
});

// It will get the current date in this particular formmat (day month year; for example: 15 December 2023)
Cypress.Commands.add("getCurrentDate", () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    currentDate
  );
  const year = currentDate.getFullYear();

  const formattedDate = `${day} ${month} ${year}`;

  return formattedDate;
});

// This function shows the user John tweeting "Hello everyone" in twitter-clone
Cypress.Commands.add("johnTweetingHelloEveryoneInTwitterClone", () => {
  // The user clicks on the "Tweet" button in the navigation bar
  cy.contains("button", "Tweet").click();
  // The user types in the text box: "Hello everyone"
  cy.get('div[class*="DialogContent"]').find("textarea").type("Hello everyone");
  // The user clicks on the tweet submit button
  cy.get('div[class*="DialogContent"]')
    .find('button:contains("Tweet")')
    .click();
});

Cypress.Commands.add(
  "checkIfAllFiveUsersJohnPaulRonyKevinJuliaAreInThePageAllProfilesAndSortedFromOldestTopToNewestBottomInTwitterClone",
  () => {
    /*
    There are 5 users displayed with their name and username, and they are sorted from oldest member to newest member (left to right; top to bottom)
        John  @john
        Paul  @paul
        Rony  @rony
        Kevin  @kevin
        Julia     @julia
    */
    cy.get('ul[class*="ProfilesList"]')
      .should("have.length", 1)
      .find("li")
      .should("have.length", 5);

    cy.get('ul[class*="ProfilesList"]')
      .find("li:nth-child(1)")
      .find('div[class*="TextContainer"]')
      .find("p:nth-child(1)")
      .should("have.text", "John");

    cy.get('ul[class*="ProfilesList"]')
      .find("li:nth-child(1)")
      .find('div[class*="TextContainer"]')
      .find("p:nth-child(2)")
      .should("have.text", "@john");

    cy.get('ul[class*="ProfilesList"]')
      .find("li:nth-child(2)")
      .find('div[class*="TextContainer"]')
      .find("p:nth-child(1)")
      .should("have.text", "Paul");

    cy.get('ul[class*="ProfilesList"]')
      .find("li:nth-child(2)")
      .find('div[class*="TextContainer"]')
      .find("p:nth-child(2)")
      .should("have.text", "@paul");

    cy.get('ul[class*="ProfilesList"]')
      .find("li:nth-child(3)")
      .find('div[class*="TextContainer"]')
      .find("p:nth-child(1)")
      .should("have.text", "Rony");

    cy.get('ul[class*="ProfilesList"]')
      .find("li:nth-child(3)")
      .find('div[class*="TextContainer"]')
      .find("p:nth-child(2)")
      .should("have.text", "@rony");

    cy.get('ul[class*="ProfilesList"]')
      .find("li:nth-child(4)")
      .find('div[class*="TextContainer"]')
      .find("p:nth-child(1)")
      .should("have.text", "Kevin");

    cy.get('ul[class*="ProfilesList"]')
      .find("li:nth-child(4)")
      .find('div[class*="TextContainer"]')
      .find("p:nth-child(2)")
      .should("have.text", "@kevin");

    cy.get('ul[class*="ProfilesList"]')
      .find("li:nth-child(5)")
      .find('div[class*="TextContainer"]')
      .find("p:nth-child(1)")
      .should("have.text", "Julia");

    cy.get('ul[class*="ProfilesList"]')
      .find("li:nth-child(5)")
      .find('div[class*="TextContainer"]')
      .find("p:nth-child(2)")
      .should("have.text", "@julia");
  }
);

/*                                  TWITTER-CLONE END-TO-END TESTING PROJECT                           */

// Sign in as John in order to get John's token and ID
Cypress.Commands.add(
  "signInAsJohnAndGetTokenAndIdAsJohnInTwitterCloneApiTesting",
  (callback) => {
    cy.request({
      method: "POST",
      url: "http://localhost:3001/api/auth/login",
      body: {
        username: "John",
        password: "Clonejohn23",
      },
    }).then((loginResponse) => {
      let johnToken = loginResponse.body.token;
      let johnId = loginResponse.body.user._id;

      // Execute the callback with the values
      callback(johnToken, johnId);
    });
  }
);

// Sign in as Rony in order to get Rony's token and ID
Cypress.Commands.add(
  "signInAsRonyAndGetTokenAndIdAsRonyInTwitterCloneApiTesting",
  (callback) => {
    cy.request({
      method: "POST",
      url: "http://localhost:3001/api/auth/login",
      body: {
        username: "rony",
        password: "Clonerony23",
      },
    }).then((loginResponse) => {
      let ronyToken = loginResponse.body.token;
      let ronyId = loginResponse.body.user._id;

      // Execute the callback with the values
      callback(ronyToken, ronyId);
    });
  }
);

// Sign in as John in order to get John's token and ID and then create a tweet using John's token in order to get this tweet's ID and tweet author ID
Cypress.Commands.add(
  "signInAsJohnAndGetTokenAndIdAndCreateTweetAndGetTweetIdAndAuthorIdInTwitterCloneApiTesting",
  (callback) => {
    cy.request({
      method: "POST",
      url: "http://localhost:3001/api/auth/login",
      body: {
        username: "John",
        password: "Clonejohn23",
      },
    }).then((johnLoginResponse) => {
      const johnToken = johnLoginResponse.body.token;
      const johnId = johnLoginResponse.body.user._id;

      cy.request({
        method: "POST",
        url: "http://localhost:3001/api/tweets",
        body: {
          text: "Hello",
        },
        headers: {
          Authorization: `Bearer ${johnToken}`,
        },
      }).then((tweetResponse) => {
        const tweetId = tweetResponse.body.tweet._id;
        const tweetAuthorId = tweetResponse.body.tweet.author;

        // Execute the callback with the values
        callback(johnToken, johnId, tweetId, tweetAuthorId);
      });
    });
  }
);
