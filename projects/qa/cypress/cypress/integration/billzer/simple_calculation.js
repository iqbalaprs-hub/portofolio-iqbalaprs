/// <reference types="Cypress" />

describe("Feature: Simple Calculations", () => {
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

    /* 
    Prereq:
    The user typed in the Main page the following information:
    Member count input: 3
    Name input: Trip
    */
    cy.get(".input-hg").should("have.value", "3");
    cy.get("#text").type("Trip");
    cy.get("#go").click();

    /*
    Prereq:
    In the calculation page, the user:
    - Type in Person's name in form 1: Person1
    - Type in Person's name in form 2: Person2
    - Type in Person's name in form 3: Person3
    - Type in expense's name in form1: Ticket
    - Type in expense's name in form2: Ticket
    - Type in expense's name in form3: Ticket
    */
    cy.get(".calc .userwrap").eq(0).find("input.name").type("Person1");
    cy.get(".calc .userwrap").eq(1).find("input.name").type("Person2");
    cy.get(".calc .userwrap").eq(2).find("input.name").type("Person3");
    cy.get(".calc .inputwrap").eq(0).find("input.was").type("Ticket");
    cy.get(".calc .inputwrap").eq(1).find("input.was").type("Ticket");
    cy.get(".calc .inputwrap").eq(2).find("input.was").type("Ticket");
  });

  it("1.Edge case : Cannot determine amounts owed if nobody paid ", () => {
    // 1.1: Type in expense's amount in Person1: 0
    cy.get(".calc .inputwrap").eq(0).find("input.price").type("0");

    // 1.2: Type in expense's amount in Person2: 0
    cy.get(".calc .inputwrap").eq(1).find("input.price").type("0");

    // 1.3: Type in expense's amount in Person3: 0
    cy.get(".calc .inputwrap").eq(2).find("input.price").type("0");

    // 1.4: Click the Button "Calculate & Save!"
    /*
    Expected result:
    A sentence under the title "Who pays whom how much" appears saying: No results to display, your group is even or there is no data
    */
    cy.get("#submitbutton").click();
    cy.get(".the-return")
      .find(".initialwarning")
      .should(
        "have.text",
        "No results to display, your group is even or there is no data"
      );
  });

  it("2.Nominal case : Determine amounts owed if only one person paid", () => {
    // 2.1: Type in expense's amount in Person1: 100
    cy.get(".calc .inputwrap").eq(0).find("input.price").type("100");

    // 2.2: Type in expense's amount in Person2: 0
    cy.get(".calc .inputwrap").eq(1).find("input.price").type("0");

    // 2.3: Type in expense's amount in Person3: 0
    cy.get(".calc .inputwrap").eq(2).find("input.price").type("0");

    // 2.4: Click the Button "Calculate & Save!"
    /*
    Expected result:
    Calculation is done and a box appears saying:
      - Person2 owns 33.33 to Person1
      - Person3 owns 33.33 to Person1
    */
    cy.get("#submitbutton").click();

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

  it("3.Nominal case : Determine amounts owed if 3 persons paid and 2 of them paid identically", () => {
    // 3.1: Type in expense's amount in Person1: 100
    cy.get(".calc .inputwrap").eq(0).find("input.price").type("100");

    // 3.2: Type in expense's amount in Person2: 50
    cy.get(".calc .inputwrap").eq(1).find("input.price").type("50");

    // 3.3: Type in expense's amount in Person3: 50
    cy.get(".calc .inputwrap").eq(2).find("input.price").type("50");

    // 3.4: Click the Button "Calculate & Save!"
    /*
    Expected result:
    Calculation is done and a box appears saying:
      - Person2 owns 16.67 to Person1
      - Person3 owns 16.67 to Person1
    */
    cy.get("#submitbutton").click();

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

  it("4.Nominal case : Determine amounts owed if 3 persons paid differently", () => {
    // 4.1: Type in expense's amount in Person1: 100
    cy.get(".calc .inputwrap").eq(0).find("input.price").type("100");

    // 4.2: Type in expense's amount in Person2: 50
    cy.get(".calc .inputwrap").eq(1).find("input.price").type("50");

    // 4.3: Type in expense's amount in Person3: 20
    cy.get(".calc .inputwrap").eq(2).find("input.price").type("20");

    // 4.4: Click the Button "Calculate & Save!"
    /*
    Expected result:
    Calculation is done and a box appears saying:
      - Person2 owns 6.67 to Person1
      - Person3 owns 36.67 to Person1
    */
    cy.get("#submitbutton").click();

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

  it("5.Nominal case : Determine amounts owed if 3 persons paid identically", () => {
    // 5.1: Type in expense's amount in Person1: 100
    cy.get(".calc .inputwrap").eq(0).find("input.price").type("100");

    // 5.2: Type in expense's amount in Person2: 100
    cy.get(".calc .inputwrap").eq(1).find("input.price").type("100");

    // 5.3: Type in expense's amount in Person3: 100
    cy.get(".calc .inputwrap").eq(2).find("input.price").type("100");

    // 5.4: Click the Button "Calculate & Save!"
    /*
    Expected result:
    A sentence under the title "Who pays whom how much" appears saying: No results to display, your group is even or there is no data"
    */
    cy.get("#submitbutton").click();
    cy.get(".the-return")
      .find(".initialwarning")
      .should(
        "have.text",
        "No results to display, your group is even or there is no data"
      );
  });

  it("6.Nominal case : Determine amounts owed with decimal numbers", () => {
    // 6.1: Type in expense's amount in Person1: 100
    cy.get(".calc .inputwrap").eq(0).find("input.price").type("100");

    // 6.2: Type in expense's amount in Person2: 50.5
    cy.get(".calc .inputwrap").eq(1).find("input.price").type("50.5");

    // 6.3: Type in expense's amount in Person3: 30.4545
    cy.get(".calc .inputwrap").eq(2).find("input.price").type("30.4545");

    // Click the Button "Calculate & Save!"
    /*
    Expected result:
    Calculation is done and a box appears saying:
      - Person2 owns 9.82 to Person1
      - Person3 owns 29.87 to Person1
    */
    cy.get("#submitbutton").click();

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

  it("7.Edge case : Cannot determine amounts owed if a negative number is entered", () => {
    // 7.1 Type in expense's amount in Person1: -
    /* 
    7.1 Expected result :
        (1) Alert appears saying: "Please enter numbers correctly: 1234.56 (for numbers with decimals) or 1234 (for numbers without decimals)"
        (2) The expense amount is empty
     */
    // Stub the Alert so I can test later that it was called
    const stub = cy.stub();
    cy.on("window:alert", stub);

    cy.get(".calc .inputwrap")
      .eq(0)
      .find("input.price")
      .type("-")
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          "Please enter numbers correctly: 1234.56 (for numbers with decimals) or 1234 (for numbers without decimals)"
        );
      });

    /*
      7.1 Expected result :
      The expense amount is empty
      */
    cy.get(".calc .inputwrap")
      .eq(0)
      .find("input.price")
      .should("have.value", "");
  });
});
