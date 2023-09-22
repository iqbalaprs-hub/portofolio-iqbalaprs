/// <reference types="Cypress" />

describe("Main page of Billzer: typing data for the Calculation page", () => {
  beforeEach(() => {
    // Prereq: BILLZER page is already opened
    cy.visit("https://billzer.com/");

    // Sometimes, there's a Cookie Consent Popup that appears. We should close it before continuing the tests
    // The Cookie Consent Popup takes a bit of time to appear
    cy.wait(1000);
    // Here, I retrieved the body instead of directly the button, so that cypress doesn't throw an error if the Cookie Consent Popup doesn't appear
    cy.get("body").then(($body) => {
      // Check if the Accept all cookies button exists
      if ($body.find("button#ez-accept-all").length > 0) {
        // If the button exists, click on it to close the Cookie Consent Popup
        cy.get("button#ez-accept-all").click();
      }
    });
  });

  it("1.Nominal case: User creates a Calculation using valid name consisting of letters (Lowercase and uppercase) in the Name input", () => {
    /*
    1.1: Expected result:
    Default number of member is 3
    Placeholder of name is "Roadtrip
    */
    cy.get(".input-hg").should("have.value", "3");
    cy.get("#text").should("have.attr", "placeholder", "e.g. Roadtrip");

    // 1.2: Type in the Name input: Trip
    cy.get("#text").type("Trip");

    // 1.3: Click the button GO
    cy.get("#go").click();

    /*
    1.3: Expected result:
    You are successfully taken to the Calculation page
    At the top of the page, I see the name "Trip"
    There are 3 members forms to fill
    */
    cy.get("#occasion").should("have.text", "Trip");
    cy.get(".calc").find(".userwrap").should("have.length", 3);
  });

  it("2.Nominal case: User creates a Calculation using valid name consisting of special characters, numbers and spaces) in the Name input", () => {
    // 2.1: Type in the Name input: 12345                     !@#$%^&*()_+-{}|:?><
    cy.get("#text").type("12345                     !@#$%^&*()_+-{}|:?><");

    // 2.2: Click the button GO
    cy.get("#go").click();

    /*
    2.2: Expected result:
    You are successfully taken to the Calculation page
    At the top of the page, I see the name "12345                     !@#$%^&*()_+-{}|:?><"
    There are 3 members forms to fill
    */
    cy.get(".calc").find(".userwrap").should("have.length", 3);
    cy.get("#occasion").should(
      "have.text",
      "12345                     !@#$%^&*()_+-{}|:?><"
    );
    // BUG: Spaces are ignored. The Calculation name is: "12345!@#$%^&*()_+-{}|:?><"
  });

  it("3.Nominal case: User creates a Calculation while leaving the Name input empty", () => {
    // 3.1: Leave Name input empty

    // 3.2: Click the button GO
    cy.get("#go").click();

    /*
    3.2: Expected result:
    You are successfully taken to the Calculation page
    At the top of the page, I do not see any name
    There are 3 members forms to fill
    */
    cy.get("#occasion").should("have.text", "");
    cy.get(".calc").find(".userwrap").should("have.length", 3);
  });

  it("4.Edge case: User creates a Calculation with a name consisting of 40 characters in the Name input", () => {
    // 4.1: Type in the Name input: Theycannot enter more than 40 characters
    cy.get("#text").type("Theycannot enter more than 40 characters");
    cy.wait(1000);
    cy.get("#text").should(
      "have.value",
      "Theycannot enter more than 40 characters"
    );

    // 4.2: Click the button GO
    cy.get("#go").click();

    /*
    4.2: Expected result:
    You are successfully taken to the Calculation page
    At the top of the page, I see the name "Theycannot enter more than 40 characters"
    There are 3 members forms to fill
    */
    cy.get("#occasion").should(
      "have.text",
      "Theycannot enter more than 40 characters"
    );
    cy.get(".calc").find(".userwrap").should("have.length", 3);
  });

  it("5.Edge case: User cannot create a Calculation with a name consisting of more than 40 characters in the Name input ", () => {
    // 5.1: Type in the Name input: Theycannot enter more than 40 characters in this input name
    cy.get("#text").type(
      "Theycannot enter more than 40 characters in this input name"
    );
    // 5.1: Expected result: After 40 characters, the input does not take more characters. It stops after the word "characters"
    cy.get("#text").should(
      "have.value",
      "Theycannot enter more than 40 characters"
    );

    // 5.2: Click the button GO
    cy.get("#go").click();

    /*
    5.2: Expected result:
    You are successfully taken to the Calculation page
    At the top of the page, I see the name "Theycannot enter more than 40 characters"
    There are 3 members forms to fill
    */
    cy.get("#occasion").should(
      "have.text",
      "Theycannot enter more than 40 characters"
    );
    cy.get(".calc").find(".userwrap").should("have.length", 3);
  });

  it("6.Edge case: User creates a Calculation with a name written in Arabic language in the Name input ", () => {
    // 6.1: Type in the Name input: رحلة اجازة
    cy.get("#text").type("رحلة اجازة");

    // 6.2: Click the button GO
    cy.get("#go").click();

    /*
    6.2: Expected result:
    You are successfully taken to the Calculation page
    At the top of the page, I see the name "رحلة اجازة"
    There are 3 members forms to fill
    */
    cy.get(".calc").find(".userwrap").should("have.length", 3);
    cy.get("#occasion").should("have.text", "رحلة اجازة");
  });

  it("7.Nominal case: User creates a Calculation with 10 members", () => {
    // 7.1: Type in the Member count input: 10
    cy.get(".input-hg").clear().type("10");

    // 7.2: Type in the Name input: Trip
    cy.get("#text").type("Trip");

    // 7.3: Click the button GO
    cy.get("#go").click();

    /*
    7.3: Expected results:
    You are successfully taken to the Calculation page
    At the top of the page, I see the name "Trip"
    There are 10 members forms to fill
    */
    cy.get("#occasion").contains("Trip");
    cy.get(".calc").find(".userwrap").should("have.length", 10);
  });

  it("8.Edge case: User creates a Calculation by writing a plus sign with a number 10", () => {
    // Type in the Member count input: +10
    // cy.get(".input-hg").clear().type("{+}10");
    // cy.get(".input-hg").should("have.value", "+10");
    // cy.get("#text").type("Trip");
    // cy.get("#go").click();
    // cy.get("#occasion").contains("Trip");
    // cy.get(".calc").find(".userwrap").should("have.length", 10);
  });

  it("8.Nominal case: User creates a Calculation with 40 members", () => {
    // 8.1: Type in the Member count input: 40
    cy.get(".input-hg").clear().type("40");

    // 8.2: Type in the Name input: Trip
    cy.get("#text").type("Trip");

    // 8.3: Click the button GO
    cy.get("#go").click();

    /*
    8.3: Expected results:
    You are successfully taken to the Calculation page
    At the top of the page, I see the name "Trip"
    There are 40 members forms to fill
    */
    cy.get("#occasion").should("have.text", "Trip");
    cy.get(".calc").find(".userwrap").should("have.length", 40);
  });

  it("9.Nominal case: User creates a Calculation with 2 members", () => {
    // 9.1: Type in the Member count input: 2
    cy.get(".input-hg").clear().type("2");

    // 9.2: Type in the Name input: Trip
    cy.get("#text").type("Trip");

    // 9.3: Click the button GO
    cy.get("#go").click();

    /*
    9.3: Expected result:
    You are successfully taken to the Calculation page
    At the top of the page, I see the name "Trip"
    There are 2 members forms to fill
    */
    cy.get("#occasion").should("have.text", "Trip");
    cy.get(".calc").find(".userwrap").should("have.length", 2);
  });

  it("10.Nominal case: User cannot create a Calculation with invalid number of members (Invalid number are less than 2 or greater than 40 or decimal number)", () => {
    // 10.1: Type in the Name input: Trip
    cy.get("#text").type("Trip");

    // 10.2: Type in the Member count input: 41
    cy.get(".input-hg").clear().type("41");

    // 10.3: Click the button GO
    cy.get("#go").click();

    // 10.3: Expected result:
    // A tooltip appears saying "Value must be less than or equal to 40"
    // Since this is a browser-specific tooltip (it's not present in the HTML), I used the solution from https://stackoverflow.com/a/71242279/471461
    cy.get(".input-hg").then(($input) => {
      expect($input[0].validationMessage).to.include(
        "Value must be less than or equal to 40"
      );
    });

    // 10.4: Type in the Member count input: 1
    cy.get(".input-hg").clear().type("1");

    // 10.5: Click the button GO
    cy.get("#go").click();

    // 10.5: Expected result:
    // A tooltip appears saying "Value must be greater than or equal to 2"
    // Since this is a browser-specific tooltip (it's not present in the HTML), I used the solution from https://stackoverflow.com/a/71242279/471461
    cy.get(".input-hg").then(($input) => {
      expect($input[0].validationMessage).to.include(
        "Value must be greater than or equal to 2"
      );
    });

    // 10.6: Type in the Member count input: -10
    cy.get(".input-hg").clear().type("-10");

    // 10.7: Click the button GO
    cy.get("#go").click();

    // 10.7: Expected result:
    // A tooltip appears saying "Value must be greater than or equal to 2"
    // Since this is a browser-specific tooltip (it's not present in the HTML), I used the solution from https://stackoverflow.com/a/71242279/471461
    cy.get(".input-hg").then(($input) => {
      expect($input[0].validationMessage).to.include(
        "Value must be greater than or equal to 2"
      );
    });

    // 10.8: Type in the Member count input: 39.5
    cy.get(".input-hg").clear().type("39.5");

    // 10.9: Click the button GO
    cy.get("#go").click();

    // 10.9: Expected result:
    // A tooltip appears saying "Please enter a valid value. The two nearest values are 39 and 40"
    // Since this is a browser-specific tooltip (it's not present in the HTML), I used the solution from https://stackoverflow.com/a/71242279/471461
    cy.get(".input-hg").then(($input) => {
      expect($input[0].validationMessage).to.include(
        "Please enter a valid value. The two nearest valid values are 39 and 40"
      );
    });
  });

  it("11.Edge case: User cannot create a Calculation with letters in the Member count input", () => {
    // 11.1: Type in the Name input: Trip
    cy.get("#text").type("Trip");

    // 11.2: Type in the Member count input: qwertyuioplkjhgfdsazxcvbnm
    cy.get(".input-hg").clear().type("qwertyuioplkjhgfdsazxcvbnm");

    // 11.2: Expected result: Member count input is empty
    cy.get(".input-hg").should("have.text", "");

    // BUG:
    // 11.3: Click the button GO
    cy.get("#go").click();

    // 11.3: Expected result:
    // A tooltip appears saying "Please enter a number."
    // Since this is a browser-specific tooltip (it's not present in the HTML), I used the solution from https://stackoverflow.com/a/71242279/471461
    cy.get(".input-hg").then(($input) => {
      expect($input[0].validationMessage).to.include("Please enter a number.");
    });

    // BUG 1: Member count input should not contain "e".
    // BUG 2: Cypress and Chrome works differently. Cypress do NOT write "e" in the member count input. On the contrary, Chrome write write "e" in the member count input
    // BUG 3: A page does not need to be created only for this notification  A tooltip  is sufficient
  });

  it("12.Edge case: User cannot create a Calculation with an empty Member count input", () => {
    // 12.1: Type spaces in the Member count input
    cy.get(".input-hg").clear().type("      ");

    // 12.1: Expected result: Member count input is empty
    cy.get(".input-hg").should("have.text", "");

    // 12.2: Type in the Name input: Trip
    cy.get("#text").type("Trip");

    // 12.3: Click the button GO
    cy.get("#go").click();

    // 12.3: Expected result:
    // A tooltip appears saying "Please enter a number."
    // Since this is a browser-specific tooltip (it's not present in the HTML), I used the solution from https://stackoverflow.com/a/71242279/471461
    cy.get(".input-hg").then(($input) => {
      expect($input[0].validationMessage).to.include("Please enter a number.");
    });

    // BUG: A page does not need to be created only for this notification  A tooltip saying "Only groups between 2 and 40 people are allowed." is sufficient
  });

  it("13.Nominal case: User is using the arrows to choose the number  in the Member count input", () => {
    // 13.1: Default number of member is 3
    // 13.1: Placeholder of name is "Roadtrip"
    cy.get(".input-hg").should("have.value", "3");
    cy.get("#text").should("have.attr", "placeholder", "e.g. Roadtrip");

    // 13.2: Click the blue minus button once
    // 13.2: Expected result:The number decreases by 1 and displays the number 2 in the Member count input
    cy.get('[type="button"][value="-"]').click();
    cy.get(".input-hg").should("have.value", "2");

    // 13.3: Click the blue minus button ten times
    // 13.3: Expected results: The number doesn't decrease and stop at 2 in the Member count input
    for (let i = 0; i < 10; i++) {
      cy.get('[type="button"][value="-"]').click();
    }
    cy.get(".input-hg").should("have.value", "2");

    // 13.4: Click the blue plus button until it reaches 40
    // 13.4: Expected results: the number displayed is 40  in the Member count input
    for (let i = 0; i < 38; i++) {
      cy.get('[type="button"][value="+"]').click();
    }
    cy.get(".input-hg").should("have.value", "40");

    // 13.5: Click the blue plus button 10 times
    // 13.5: Expected results: the number doesn't increase more and stop at 40  in the Member count input
    for (let i = 0; i < 10; i++) {
      cy.get('[type="button"][value="+"]').click();
    }
    cy.get(".input-hg").should("have.value", "40");

    // 13.6: Type in the Name input: Trip
    cy.get("#text").type("Trip");

    // 13.7: Click the button GO
    cy.get("#go").click();

    /*
    13.7: Expected results:
    You are successfully taken to the Calculation page
    At the top of the page, I see the name "Trip"
    There are 40 members forms to fill
    */
    cy.get("#occasion").contains("Trip");
    cy.get(".calc").find(".userwrap").should("have.length", 40);
  });
});
