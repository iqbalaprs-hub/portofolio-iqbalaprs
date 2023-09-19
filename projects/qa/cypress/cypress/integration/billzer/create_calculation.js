/// <reference types="Cypress" />

describe("Main page of Billzer: typing data for the Calculation page", function () {
  beforeEach(() => {
    // Prereq: BILLZER page is already opened
    cy.visit("https://billzer.com/");
  });

  it("1.Nominal case: User creates a Calculation using valid name consisting of letters (Lowercase and uppercase) in the Name input", function () {
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
    cy.get("#occasion").contains("Trip");
    cy.get(".calc").find(".userwrap").should("have.length", 3);
  });

  it("2.Nominal case: User creates a Calculation using valid name consisting of special characters, numbers and spaces) in the Name input", function () {
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
    // BUG: Spaces are ignored. The Calculation name is: "12345!@#$%^&*()_+-{}|:?><"
    cy.get("#occasion").contains(
      "12345                     !@#$%^&*()_+-{}|:?><"
    );
  });

  it("3.Nominal case: User creates a Calculation while leaving the Name input empty", function () {
    // 3.1: Leave Name input empty

    // 3.2: Click the button GO
    cy.get("#go").click();

    /*
    3.2: Expected result:
    You are successfully taken to the Calculation page
    At the top of the page, I do not see any name
    There are 3 members forms to fill
    */
    cy.get("#occasion").should("have.value", "");
    cy.get(".calc").find(".userwrap").should("have.length", 3);
  });

  it("4.Edge case: User creates a Calculation with a name consisting of 40 characters in the Name input", function () {
    // 4.1: Type in the Name input: Theycannot enter more than 40 characters
    cy.get("#text").type("Theycannot enter more than 40 characters");
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
    cy.get("#occasion").contains("Theycannot enter more than 40 characters");
    cy.get(".calc").find(".userwrap").should("have.length", 3);
  });

  it("5.Edge case: User cannot create a Calculation with a name consisting of more than 40 characters in the Name input ", function () {
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
    Expected result:
    You are successfully taken to the Calculation page
    At the top of the page, I see the name "Theycannot enter more than 40 characters"
    There are 3 members forms to fill
    */
    cy.get("#occasion").contains("Theycannot enter more than 40 characters");
    cy.get(".calc").find(".userwrap").should("have.length", 3);
  });

  it("6.Edge case: User creates a Calculation with a name written in Arabic language in the Name input ", function () {
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
    cy.get("#occasion").contains("رحلة اجازة");
  });

  it("7.Nominal case: User creates a Calculation with 10 members", function () {
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

  it("8.Edge case: User creates a Calculation by writing a plus sign with a number 10", function () {
    // Type in the Member count input: +10
    // cy.get(".input-hg").clear().type("{+}10");
    // cy.get(".input-hg").should("have.value", "+10");
    // cy.get("#text").type("Trip");
    // cy.get("#go").click();
    // cy.get("#occasion").contains("Trip");
    // cy.get(".calc").find(".userwrap").should("have.length", 10);
  });

  it("9.Nominal case: User creates a Calculation with 40 members", function () {
    // 9.1: Type in the Member count input: 40
    cy.get(".input-hg").clear().type("40");

    // 9.2: Type in the Name input: Trip
    cy.get("#text").type("Trip");

    // 9.3: Click the button GO
    cy.get("#go").click();

    /*
    9.3: Expected results:
    You are successfully taken to the Calculation page
    At the top of the page, I see the name "Trip"
    There are 40 members forms to fill
    */
    cy.get("#occasion").contains("Trip");
    cy.get(".calc").find(".userwrap").should("have.length", 40);
  });

  it("10.Nominal case: User creates a Calculation with 2 members", function () {
    // 10.1: Type in the Member count input: 2
    cy.get(".input-hg").clear().type("2");

    // 10.2: Type in the Name input: Trip
    cy.get("#text").type("Trip");

    // 10.3: Click the button GO
    cy.get("#go").click();

    /*
    10.3: Expected result:
    You are successfully taken to the Calculation page
    At the top of the page, I see the name "Trip"
    There are 2 members forms to fill
    */
    cy.get("#occasion").contains("Trip");
    cy.get(".calc").find(".userwrap").should("have.length", 2);
  });

  it.only("My SecondTest case", function () {
    cy.get(".input-hg").clear().type("41");
    cy.get("#go").click();
  });

  it("16.Nominal case: User is using the arrows to choose the number  in the Member count input", function () {
    // 16.1: Default number of member is 3
    // 16.1: Placeholder of name is "Roadtrip"
    cy.get(".input-hg").should("have.value", "3");
    cy.get("#text").should("have.attr", "placeholder", "e.g. Roadtrip");

    // 16.2: Click the blue minus button once
    // 16.2: Expected result:The number decreases by 1 and displays the number 2 in the Member count input
    cy.get('[type="button"][value="-"]').click();
    cy.get(".input-hg").should("have.value", "2");

    // 16.3: Click the blue minus button ten times
    // 16.3: Expected results: The number doesn't decrease and stop at 2 in the Member count input
    for (let i = 0; i < 10; i++) {
      cy.get('[type="button"][value="-"]').click();
    }
    cy.get(".input-hg").should("have.value", "2");

    // 16.4: Click the blue plus button until it reaches 40
    // 16.4: Expected results: the number displayed is 40  in the Member count input
    for (let i = 0; i < 38; i++) {
      cy.get('[type="button"][value="+"]').click();
    }
    cy.get(".input-hg").should("have.value", "40");

    // 16.5: Click the blue plus button 10 times
    // 16.5: Expected results: the number doesn't increase more and stop at 40  in the Member count input
    for (let i = 0; i < 10; i++) {
      cy.get('[type="button"][value="+"]').click();
    }
    cy.get(".input-hg").should("have.value", "40");

    // 16.6: Type in the Name input: Trip
    cy.get("#text").type("Trip");

    // 16.7: Click the button GO
    cy.get("#go").click();

    /*
    16.7: Expected results:
    You are successfully taken to the Calculation page
    At the top of the page, I see the name "Trip"
    There are 40 members forms to fill
    */
    cy.get("#occasion").contains("Trip");
    cy.get(".calc").find(".userwrap").should("have.length", 40);
  });
});
