/// <reference types="Cypress" />

describe("My Second Test Suite", function () {
  beforeEach(() => {
    cy.visit("https://billzer.com/");
    // Default number of member is 3
    cy.get(".input-hg").should("have.value", "3");
    // Type in the Name input: Trip
    cy.get("#text").type("Trip");

    // Click the button GO
    cy.get("#go").click();

    // At the top of the page, I see the name "Trip"
    // There are 3 members forms to fill
    cy.get("#occasion").contains("Trip");
    cy.get(".calc").find(".userwrap").should("have.length", 3);

    // Type in Person's name in form 1: Person1
    cy.get(".calc .userwrap").eq(0).find("input.name").type("Person1");
    // Type in Person's name in form 2: Person2
    cy.get(".calc .userwrap").eq(1).find("input.name").type("Person2");
    // Type in Person's name in form 3: Person3
    cy.get(".calc .userwrap").eq(2).find("input.name").type("Person3");

    // Type in expense's name in form1: Ticket
    cy.get(".calc .inputwrap").eq(0).find("input.was").type("Ticket");
    // Type in expense's name in form2: Ticket
    cy.get(".calc .inputwrap").eq(1).find("input.was").type("Ticket");
    // Type in expense's name in form3: Ticket
    cy.get(".calc .inputwrap").eq(2).find("input.was").type("Ticket");
  });

  it("Edge case: User cannot calculate if nobody paid ", function () {
    // Type in expense's amount in Person1: 0
    cy.get(".calc .inputwrap").eq(0).find("input.price").type("0");
    // Type in expense's amount in Person2: 0
    cy.get(".calc .inputwrap").eq(1).find("input.price").type("0");
    // Type in expense's amount in Person3: 0
    cy.get(".calc .inputwrap").eq(2).find("input.price").type("0");

    // Click the Button "Calculate & Save!"
    cy.get("#submitbutton").click();

    // A sentence under the title "Who pays whom how much" appears saying: No results to display, your group is even or there is no data
    cy.get(".the-return")
      .find(".initialwarning")
      .should(
        "have.text",
        "No results to display, your group is even or there is no data"
      );
  });

  it("Nominal case: User calculates if only one person paid", function () {
    // Type in expense's amount in Person1: 100
    cy.get(".calc .inputwrap").eq(0).find("input.price").type("100");
    // Type in expense's amount in Person2: 0
    cy.get(".calc .inputwrap").eq(1).find("input.price").type("0");
    // Type in expense's amount in Person3: 0
    cy.get(".calc .inputwrap").eq(2).find("input.price").type("0");

    // Click the Button "Calculate & Save!"
    cy.get("#submitbutton").click();

    // Calculation is done and a box appears saying:
    // Person2 owns 33.33 to Person1
    cy.get(".the-return .ergi")
      .eq(0)
      .find(".deb")
      .should("have.text", "Person2");
    cy.get(".the-return .ergi")
      .eq(0)
      .find("div.pfeilanfang")
      .should("have.text", "33.33");
    cy.get(".the-return .ergi")
      .eq(0)
      .find("div.cred")
      .should("have.text", "Person1");

    // Person3 owns 33.33 to Person1
    cy.get(".the-return .ergi")
      .eq(1)
      .find(".deb")
      .should("have.text", "Person3");
    cy.get(".the-return .ergi")
      .eq(1)
      .find("div.pfeilanfang")
      .should("have.text", "33.33");
    cy.get(".the-return .ergi")
      .eq(1)
      .find("div.cred")
      .should("have.text", "Person1");
  });

  it("Nominal case: User calculates if 3 persons paid and 2 of them paid identically", function () {
    // Type in expense's amount in Person1: 100
    cy.get(".calc .inputwrap").eq(0).find("input.price").type("100");
    // Type in expense's amount in Person2: 50
    cy.get(".calc .inputwrap").eq(1).find("input.price").type("50");
    // Type in expense's amount in Person3: 50
    cy.get(".calc .inputwrap").eq(2).find("input.price").type("50");

    // Click the Button "Calculate & Save!"
    cy.get("#submitbutton").click();

    // Calculation is done and a box appears saying:
    // Person2 owns 16.67 to Person1
    cy.get(".the-return .ergi")
      .eq(0)
      .find(".deb")
      .should("have.text", "Person2");
    cy.get(".the-return .ergi")
      .eq(0)
      .find("div.pfeilanfang")
      .should("have.text", "16.67");
    cy.get(".the-return .ergi")
      .eq(0)
      .find("div.cred")
      .should("have.text", "Person1");

    // Person3 owns 16.67 to Person1
    cy.get(".the-return .ergi")
      .eq(1)
      .find(".deb")
      .should("have.text", "Person3");
    cy.get(".the-return .ergi")
      .eq(1)
      .find("div.pfeilanfang")
      .should("have.text", "16.67");
    cy.get(".the-return .ergi")
      .eq(1)
      .find("div.cred")
      .should("have.text", "Person1");
  });

  it("Nominal case: User calculates if 3 persons paid differently", function () {
    // Type in expense's amount in Person1: 100
    cy.get(".calc .inputwrap").eq(0).find("input.price").type("100");
    // Type in expense's amount in Person2: 50
    cy.get(".calc .inputwrap").eq(1).find("input.price").type("50");
    // Type in expense's amount in Person3: 20
    cy.get(".calc .inputwrap").eq(2).find("input.price").type("20");

    // Click the Button "Calculate & Save!"
    cy.get("#submitbutton").click();

    // Calculation is done and a box appears saying:
    // Person2 owns 6.67 to Person1
    cy.get(".the-return .ergi")
      .eq(0)
      .find(".deb")
      .should("have.text", "Person2");
    cy.get(".the-return .ergi")
      .eq(0)
      .find("div.pfeilanfang")
      .should("have.text", "6.67");
    cy.get(".the-return .ergi")
      .eq(0)
      .find("div.cred")
      .should("have.text", "Person1");

    // Person3 owns 36.67 to Person1
    cy.get(".the-return .ergi")
      .eq(1)
      .find(".deb")
      .should("have.text", "Person3");
    cy.get(".the-return .ergi")
      .eq(1)
      .find("div.pfeilanfang")
      .should("have.text", "36.67");
    cy.get(".the-return .ergi")
      .eq(1)
      .find("div.cred")
      .should("have.text", "Person1");
  });

  it("Nominal case: User calculates if 3 persons paid identically", function () {
    // Type in expense's amount in Person1: 100
    cy.get(".calc .inputwrap").eq(0).find("input.price").type("100");
    // Type in expense's amount in Person2: 100
    cy.get(".calc .inputwrap").eq(1).find("input.price").type("100");
    // Type in expense's amount in Person3: 100
    cy.get(".calc .inputwrap").eq(2).find("input.price").type("100");

    // Click the Button "Calculate & Save!"
    cy.get("#submitbutton").click();

    // A sentence under the title "Who pays whom how much" appears saying: No results to display, your group is even or there is no data
    cy.get(".the-return")
      .find(".initialwarning")
      .should(
        "have.text",
        "No results to display, your group is even or there is no data"
      );
  });

  it("Nominal case: User calculates if number added are decimals", function () {
    // Type in expense's amount in Person1: 100
    cy.get(".calc .inputwrap").eq(0).find("input.price").type("100");
    // Type in expense's amount in Person2: 50.5
    cy.get(".calc .inputwrap").eq(1).find("input.price").type("50.5");
    // Type in expense's amount in Person3: 30.4545
    cy.get(".calc .inputwrap").eq(2).find("input.price").type("30.4545");

    // Click the Button "Calculate & Save!"
    cy.get("#submitbutton").click();

    // Calculation is done and a box appears saying:
    // Person2 owns 9.82 to Person1
    cy.get(".the-return .ergi")
      .eq(0)
      .find(".deb")
      .should("have.text", "Person2");
    cy.get(".the-return .ergi")
      .eq(0)
      .find("div.pfeilanfang")
      .should("have.text", "9.82");
    cy.get(".the-return .ergi")
      .eq(0)
      .find("div.cred")
      .should("have.text", "Person1");

    // Person3 owns 29.87 to Person1
    cy.get(".the-return .ergi")
      .eq(1)
      .find(".deb")
      .should("have.text", "Person3");
    cy.get(".the-return .ergi")
      .eq(1)
      .find("div.pfeilanfang")
      .should("have.text", "29.87");
    cy.get(".the-return .ergi")
      .eq(1)
      .find("div.cred")
      .should("have.text", "Person1");
  });

  it("Edge case: User cannot calculate if a negative number is entered", function () {
    // Type in expense's amount in Person1: -
    cy.get(".calc .inputwrap").eq(0).find("input.price").type("-");

    cy.on("window:alert"),
      (str) => {
        expect(str).to.equal(
          "Please enter numbers correctly: 1234.56 (for numbers with decimals) or 1234 (for numbers without decimals)"
        );
      };
  });
});
