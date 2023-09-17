/// <reference types="Cypress" />

describe("Main page of Billzer: typing data for the Calculation page", function () {
  beforeEach(() => {
    cy.visit("https://billzer.com/");
  });
  it("Nominal case: User creates a Calculation using valid name consisting of letters (Lowercase and uppercase) in the Name input", function () {
    // Default number of member is 3
    cy.get(".input-hg").should("have.value", "3");
    // Placeholder of name is "Roadtrip
    cy.get("#text").should("have.attr", "placeholder", "e.g. Roadtrip");

    // Type in the Name input: Trip
    cy.get("#text").type("Trip");

    // Hover over the button "GO"
    // cy.get("#go")
    //   .trigger("mouseover")
    //   .should("have.css", "background-color")
    //   .should("equal", "rgb(88,214,141)");

    // Click the button GO
    cy.get("#go").click();

    // At the top of the page, I see the name "Trip"
    // There are 3 members forms to fill
    cy.get("#occasion").contains("Trip");
    cy.get(".calc").find(".userwrap").should("have.length", 3);
  });

  it("Nominal case: User creates a Calculation using valid name consisting of special characters, numbers and spaces) in the Name input", function () {
    // Type in the Name input: 12345                     !@#$%^&*()_+-{}|:?><
    cy.get("#text").type("12345                     !@#$%^&*()_+-{}|:?><");

    // Click the button GO
    cy.get("#go").click();

    // There are 3 members forms to fill
    cy.get(".calc").find(".userwrap").should("have.length", 3);

    // THIS IS A BUG: Spaces are ignored. The Calculation name is: "12345!@#$%^&*()_+-{}|:?><"
    cy.get("#occasion").contains(
      "12345                     !@#$%^&*()_+-{}|:?><"
    );
  });

  it("Nominal case: User creates a Calculation while leaving the Name input empty", function () {
    // Leave Name input empty
    // Click the button GO
    cy.get("#go").click();

    // At the top of the page, I do not see any name
    cy.get("#occasion").should("have.value", "");
    // There are 3 members forms to fill
    cy.get(".calc").find(".userwrap").should("have.length", 3);
  });

  it("Edge case: User creates a Calculation with a name consisting of 40 characters in the Name input", function () {
    // Type in the Name input: Theycannot enter more than 40 characters
    cy.get("#text").type("Theycannot enter more than 40 characters");
    cy.get("#text").should(
      "have.value",
      "Theycannot enter more than 40 characters"
    );
    // Click the button GO
    cy.get("#go").click();

    // At the top of the page, I see the name "Theycannot enter more than 40 characters"
    cy.get("#occasion").contains("Theycannot enter more than 40 characters");

    // There are 3 members forms to fill
    cy.get(".calc").find(".userwrap").should("have.length", 3);
  });

  it("Edge case: User cannot create a Calculation with a name consisting of more than 40 characters in the Name input ", function () {
    // Type in the Name input: Theycannot enter more than 40 characters in this input name
    cy.get("#text").type(
      "Theycannot enter more than 40 characters in this input name"
    );

    // After 40 characters, the input does not take more characters. It stops after the word "characters"
    cy.get("#text").should(
      "have.value",
      "Theycannot enter more than 40 characters"
    );

    // Click the button GO
    cy.get("#go").click();

    // At the top of the page, I see the name "Theycannot enter more than 40 characters"
    cy.get("#occasion").contains("Theycannot enter more than 40 characters");

    // There are 3 members forms to fill
    cy.get(".calc").find(".userwrap").should("have.length", 3);
  });

  it("Edge case: User creates a Calculation with a name written in Arabic language in the Name input ", function () {
    // Type in the Name input: رحلة اجازة
    cy.get("#text").type("رحلة اجازة");

    // Click the button GO
    cy.get("#go").click();

    // There are 3 members forms to fill
    cy.get(".calc").find(".userwrap").should("have.length", 3);

    // At the top of the page, I see the name "رحلة اجازة"
    cy.get("#occasion").contains("رحلة اجازة");
  });

  it("Nominal case: User creates a Calculation with 10 members", function () {
    // Type in the Member count input: 10
    cy.get(".input-hg").clear().type("10");

    // Type in the Name input: Trip
    cy.get("#text").type("Trip");

    // Click the button GO
    cy.get("#go").click();

    // At the top of the page, I see the name "Trip"
    cy.get("#occasion").contains("Trip");

    // There are 10 members forms to fill
    cy.get(".calc").find(".userwrap").should("have.length", 10);
  });

  it("Edge case: User creates a Calculation by writing a plus sign with a number 10", function () {
    // Type in the Member count input: +10
    cy.get(".input-hg").clear().type("{+}10");
    cy.get(".input-hg").should("have.value", "+10");
    cy.get("#text").type("Trip");
    cy.get("#go").click();

    cy.get("#occasion").contains("Trip");
    cy.get(".calc").find(".userwrap").should("have.length", 10);
  });

  it("Nominal case: User creates a Calculation with 40 members", function () {
    // Type in the Member count input: 40
    cy.get(".input-hg").clear().type("40");

    // Type in the Name input: Trip
    cy.get("#text").type("Trip");

    // Click the button GO
    cy.get("#go").click();

    // At the top of the page, I see the name "Trip"
    cy.get("#occasion").contains("Trip");
    // There are 40 members forms to fill
    cy.get(".calc").find(".userwrap").should("have.length", 40);
  });

  it("Nominal case: User creates a Calculation with 2 members", function () {
    // Type in the Member count input: 2
    cy.get(".input-hg").clear().type("2");

    // Type in the Name input: Trip
    cy.get("#text").type("Trip");

    // Click the button GO
    cy.get("#go").click();

    // At the top of the page, I see the name "Trip"
    cy.get("#occasion").contains("Trip");

    // There are 2 members forms to fill
    cy.get(".calc").find(".userwrap").should("have.length", 2);
  });

  it("Nominal case: User is using the arrows to choose the number  in the Member count input", function () {
    // Default number of member is 3
    cy.get(".input-hg").should("have.value", "3");
    // Placeholder of name is "Roadtrip"
    cy.get("#text").should("have.attr", "placeholder", "e.g. Roadtrip");

    // Click the blue minus button once
    cy.get('[type="button"][value="-"]').click();
    // The number decreases by 1 and displays the number 2 in the Member count input
    cy.get(".input-hg").should("have.value", "2");

    // Click the blue minus button ten times
    for (let i = 0; i < 10; i++) {
      cy.get('[type="button"][value="-"]').click();
    }
    // The number doesn't decrease and stop at 2 in the Member count input
    cy.get(".input-hg").should("have.value", "2");

    // Click the blue plus button until it reaches 40
    for (let i = 0; i < 38; i++) {
      cy.get('[type="button"][value="+"]').click();
    }

    // the number displayed is 40  in the Member count input
    cy.get(".input-hg").should("have.value", "40");

    // Click the blue plus button 10 times
    for (let i = 0; i < 10; i++) {
      cy.get('[type="button"][value="+"]').click();
    }

    // the number doesn't increase more and stop at 40  in the Member count input
    cy.get(".input-hg").should("have.value", "40");

    // Type  in the Member count input the number 3
    cy.get(".input-hg").clear().type("3");

    // Type in the Name input: Trip
    cy.get("#text").type("Trip");

    // Click the button GO
    cy.get("#go").click();
  });
});
