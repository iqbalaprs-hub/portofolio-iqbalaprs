/// <reference types="Cypress" />

describe("Include and Exclude", () => {
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
    Prereq: The user typed in the Main page the following information:
    Member count input: 3
    Name input: Trip
    Clicked on the Button "GO"
    */
    cy.get(".input-hg").should("have.value", "3");
    cy.get("#text").type("Trip");
    cy.get("#go").click();

    /*
    Prereq: In the calculation page, the user:
      - Type in Person's name in form 1: Person1
      - Type in Person's name in form 2: Person2
      - Type in Person's name in form 3: Person3
      - Type in expense's name in form1: Ticket
      - Type in expense's name in form2: Ticket
      - Type in expense's name in form3: Ticket
      - Type in expense's amount in form1: 100
      - Type in expense's amount in form2: 100
      - Type in expense's amount in form3: 100
    */
    cy.get(".calc .userwrap").eq(0).find("input.name").type("Person1");
    cy.get(".calc .userwrap").eq(1).find("input.name").type("Person2");
    cy.get(".calc .userwrap").eq(2).find("input.name").type("Person3");
    cy.get(".calc .inputwrap").eq(0).find("input.was").type("Ticket");
    cy.get(".calc .inputwrap").eq(1).find("input.was").type("Ticket");
    cy.get(".calc .inputwrap").eq(2).find("input.was").type("Ticket");
    cy.get(".calc .inputwrap").eq(0).find("input.price").type("100");
    cy.get(".calc .inputwrap").eq(1).find("input.price").type("100");
    cy.get(".calc .inputwrap").eq(2).find("input.price").type("100");
  });

  it("1.Nominal case: Determine amounts owed by excluding Person1 from the expense Ticket of Person1", () => {
    // 1.1: Click on the 2-persons" icon of the expense "Ticket" of the form Person1 and exclude Person1
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .click();
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".checks .checkbox .icons")
      .eq(0)
      .click();

    //  1.1: expected result:  The 2-Persons icon related to the expense "Ticket" of the form "Person1" is colored in orange
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .should("have.css", "color", "rgb(243, 156, 18)");

    // 1.2: Click the Button "Calculate & Save!"
    /*
    Expected result:
    A box appears with title "Who pays whom how much"
    The result of the calculation:
      (1) Person2 owns 16.67 to Person1
      (2) Person3 owns 16.67 to Person1
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

  it("2.Nominal case: Determine amounts owed by excluding Person1 and Person2 from the expense Ticket of Person1", () => {
    // 2.1: Click on the 2-persons" icon of the expense "Ticket"of the form Person 1 and exclude both Person1 and Person2
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .click();
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".checks .checkbox")
      .eq(0)
      .find(".icons")
      .click();
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".checks .checkbox")
      .eq(1)
      .find(".icons")
      .click();

    //  2.1: Expected result:  The 2-Persons icon related to the expense "Ticket" of the form "Person1" is colored in orange
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .should("have.css", "color", "rgb(243, 156, 18)");

    // 2.2: Click the Button "Calculate & Save!"
    /*
    Expected result:
    A box appears with title "Who pays whom how much"
    The result of the calculation:
      (1) Person3 owns 33.33 to Person1
      (2) Person3 owns 33.33 to Person2
    */
    cy.get("#submitbutton").click();

    cy.get(".the-return .ergi")
      .eq(0)
      .find(".deb")
      .should("have.text", "Person3");
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
      .should("have.text", "Person2");
  });

  it("3.Nominal case: Determine amounts owed by excluding Person1 from the expense Ticket of Person1 and the expense Ticket of Person2", () => {
    // 3.1: Click on the 2-persons" icon of the expense "Ticket"of the form Person1 and exclude Person1
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .click();
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".checks .checkbox")
      .eq(0)
      .find(".icons")
      .click();

    // 3.1: expected result: The 2-Persons icon related to the expense "Ticket" of the form "Person1" is colored in orange
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .should("have.css", "color", "rgb(243, 156, 18)");

    // 3.2: Click on the 2-persons" icon of the expense "Ticket" of  the form Person2 and exclude Person1
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .click();
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(0)
      .find(".checks .checkbox")
      .eq(0)
      .find(".icons")
      .click();

    // 3.2: Expected result: The 2-Persons icon related to the expense "Ticket" of the form "Person2" is colored in orange
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .should("have.css", "color", "rgb(243, 156, 18)");

    // 3.3: Click the Button "Calculate & Save!"
    /*
    Expected result:
    A box appears with title "Who pays whom how much"
    The result of the calculation:
      (1) Person2 owns 33.33 to Person1
      (2) Person3 owns 33.33 to Person1
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

  it("4.Nominal case: Determine amounts owed by excluding Person1 from each expense in each of the three forms", () => {
    // 4.1: Click on the 2-persons" icon of the expense "Ticket"of the form Person1 and exclude Person1
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .click();
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".checks .checkbox")
      .eq(0)
      .find(".icons")
      .click();

    // 4.1: Expected result: The 2-Persons icon related to the expense "Ticket" of the form "Person1" is colored in orange
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .should("have.css", "color", "rgb(243, 156, 18)");

    // 4.2: Click on the 2-persons" icon of the expense "Ticket" of  the form Person2 and exclude Person1
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .click();
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(0)
      .find(".checks .checkbox")
      .eq(0)
      .find(".icons")
      .click();

    // 4.2: expected result: The 2-Persons icon related to the expense "Ticket" of the form "Person2" is colored in orange
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .should("have.css", "color", "rgb(243, 156, 18)");

    // 4.3: Click on the 2-persons" icon of the expense "Ticket" of  the form  person3 and exclude Person1
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .click();
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(0)
      .find(".checks .checkbox")
      .eq(0)
      .find(".icons")
      .click();

    // 4.3: Expected result: The 2-Persons icon related to the expense "Ticket" of the form "Person3" is colored in orange
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .should("have.css", "color", "rgb(243, 156, 18)");

    // 4.4: Click the Button "Calculate & Save!"
    /*
    Expected result:
    A box appears with title "Who pays whom how much"
    The result of the calculation:
      (1) Person2 owns 50 to Person1
      (2) Person3 owns 50 to Person1
    */
    cy.get("#submitbutton").click();

    cy.get(".the-return .ergi")
      .eq(0)
      .find(".deb")
      .should("have.text", "Person2");
    cy.get(".the-return .ergi")
      .eq(0)
      .find("div.pfeilanfang")
      .should("have.text", "50");
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
      .should("have.text", "50");
    cy.get(".the-return .ergi")
      .eq(1)
      .find("div.cred")
      .should("have.text", "Person1");
  });

  it("5.Nominal case: Determine amounts owed by excluding both Person1 and Person2 from all the expenses of all the forms", () => {
    // 5.1: Click on the 2-persons" icon of the expense "Ticket" of the form Person1 and exclude both Person2 and Person3
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .click();
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".checks .checkbox")
      .eq(1)
      .find(".icons")
      .click();
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".checks .checkbox")
      .eq(2)
      .find(".icons")
      .click();

    // 5.1: Expected result: The 2-Persons icon related to the expense "Ticket" of the form "Person1" is colored in orange
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .should("have.css", "color", "rgb(243, 156, 18)");

    // 5.2: Click on the 2-persons" icon of the expense "Ticket" of the form Person2 and exclude both Person2 and Person3
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .click();
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(0)
      .find(".checks .checkbox")
      .eq(1)
      .find(".icons")
      .click();
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(0)
      .find(".checks .checkbox")
      .eq(2)
      .find(".icons")
      .click();

    //  5.2: Expected result: The 2-Persons icon related to the expense "Ticket" of the form "Person2" is colored in orange
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .should("have.css", "color", "rgb(243, 156, 18)");

    // 5.3: Click on the 2-persons" icon of the expense "Ticket" of the form Person3 and exclude both Person2 and Person3
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .click();
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(0)
      .find(".checks .checkbox")
      .eq(1)
      .find(".icons")
      .click();
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(0)
      .find(".checks .checkbox")
      .eq(2)
      .find(".icons")
      .click();

    //  5.3: Expected result: The 2-Persons icon related to the expense "Ticket" of the form "Person2" is colored in orange
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .should("have.css", "color", "rgb(243, 156, 18)");

    // 5.4: Click the Button "Calculate & Save!"
    /*
    Expected result:
    A box appears with title "Who pays whom how much"
    The result of the calculation:
      (1) Person1 owns 100 to Person2
      (2) Person1 owns 100 to Person3
    */
    cy.get("#submitbutton").click();

    cy.get(".the-return .ergi")
      .eq(0)
      .find(".deb")
      .should("have.text", "Person1");
    cy.get(".the-return .ergi")
      .eq(0)
      .find("div.pfeilanfang")
      .should("have.text", "100");
    cy.get(".the-return .ergi")
      .eq(0)
      .find("div.cred")
      .should("have.text", "Person2");

    cy.get(".the-return .ergi")
      .eq(1)
      .find(".deb")
      .should("have.text", "Person1");
    cy.get(".the-return .ergi")
      .eq(1)
      .find("div.pfeilanfang")
      .should("have.text", "100");
    cy.get(".the-return .ergi")
      .eq(1)
      .find("div.cred")
      .should("have.text", "Person3");
  });

  it("6.Edge case: User cannot exclude all persons from an expense. At least one person should be included in each expense", () => {
    // 6.1: Click on the 2-persons" icon of the expense "Ticket" of the form Person1 and exclude both Person2 and Person3
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .click();
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".checks .checkbox")
      .eq(1)
      .find(".icons")
      .click();
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".checks .checkbox")
      .eq(2)
      .find(".icons")
      .click();

    // 6.1: Expected result: The 2-Persons icon related to the expense "Ticket" of the form "Person1" is colored in orange
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .should("have.css", "color", "rgb(243, 156, 18)");

    //  6.2: Click on the 2-persons" icon of the expense "Ticket" of the form Person1 and exclude  Person1
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".checks .checkbox")
      .eq(0)
      .find(".icons")
      .click();

    // 6.2: Expected result: It doesn't let the user exclude Person1
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".checks .checkbox")
      .eq(0)
      .find(".icons")
      .should("be.checked");
  });

  it("7.Nominal case: Determine amounts owed by mixing multiple expenses with include/exclude action", () => {
    // 7.1: Click on button "more" of Person1
    // Expected result: A second expense field is created
    cy.get(".calc .userwrap").eq(0).find(".pluswrap").click();
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .should("have.length", "2");

    // 7.2: Type in the second expense name of Person1: Food
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(1)
      .find("input.was")
      .type("Food");

    // 7.3: Type in the second expense amount of Person1: 30
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(1)
      .find("input.price")
      .type("30");

    // 7.4: Click on button"more" of Person1
    // Expected result: A third expense field is created
    cy.get(".calc .userwrap").eq(0).find(".pluswrap").click();
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .should("have.length", "3");

    // 7.5: Type in the third expense name of Person1: Gas
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(2)
      .find("input.was")
      .type("Gas");

    // 7.6: Type in the third expense amount of Person1: 20
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(2)
      .find("input.price")
      .type("20");

    // 7.7: Click on button"more" of Person2
    // Expected result: A second expense field is created
    cy.get(".calc .userwrap").eq(1).find(".pluswrap").click();
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .should("have.length", "2");

    // 7.8: Type in the second expense name of Person2: Food
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(1)
      .find("input.was")
      .type("Food");

    // 7.9: Type in the second expense amount of Person2: 25
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(1)
      .find("input.price")
      .type("25");

    // 7.10: Click on button"more" of Person2
    // Expected result: A third expense field is created
    cy.get(".calc .userwrap").eq(1).find(".pluswrap").click();
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .should("have.length", "3");

    // 7.11: Type in the third expense name of Person2: Gas
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(2)
      .find("input.was")
      .type("Gas");

    // 7.12: Type in the third expense amount of Person2: 25
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(2)
      .find("input.price")
      .type("25");

    // 7.13: Click on button"more" of Person3
    // Expected result: A second expense field is created
    cy.get(".calc .userwrap").eq(2).find(".pluswrap").click();
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .should("have.length", "2");

    // 7.14: Type in the second expense name of Person3: Food
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(1)
      .find("input.was")
      .type("Food");

    // 7.15: Type in the second expense amount of Person3: 10
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(1)
      .find("input.price")
      .type("10");

    // 7.16: Click on button"more" of Person2
    // A third expense field is created
    cy.get(".calc .userwrap").eq(2).find(".pluswrap").click();
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .should("have.length", "3");

    // 7.17: Type in the third expense name of Person3: Gas
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(2)
      .find("input.was")
      .type("Gas");

    // 7.18: Type in the third expense amount of Person3: 40
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(2)
      .find("input.price")
      .type("40");

    // 7.19: Click on the 2-persons" icon of the expense "Ticket"of the form Person1 and exclude both Person2 and Person3
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .click();
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".checks .checkbox")
      .eq(1)
      .find(".icons")
      .click();
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".checks .checkbox")
      .eq(2)
      .find(".icons")
      .click();

    //  7.19: Expected result: The 2-Persons icon related to the expense "Ticket" of the form "Person2" is colored in orange
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .should("have.css", "color", "rgb(243, 156, 18)");

    // 7.20: Click on the 2-persons" icon of the expense "Gas" of the form Person1 and exclude Person2
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(2)
      .find(".tooltyp")
      .click();
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(2)
      .find(".checks .checkbox")
      .eq(1)
      .find(".icons")
      .click();

    // 7.20: Expected result: The 2-Persons icon related to the expense "Gas" of the form "Person1" is colored in orange
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(2)
      .find(".tooltyp")
      .should("have.css", "color", "rgb(243, 156, 18)");

    // 7.21: Click on the 2-persons" icon of the expense "Food" of the form Person2 and exclude Person1
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(1)
      .find(".tooltyp")
      .click();
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(1)
      .find(".checks .checkbox")
      .eq(0)
      .find(".icons")
      .click();

    // 7.21: Expected result: The 2-Persons icon related to the expense "Food" of the form "Person2" is colored in orange
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(1)
      .find(".tooltyp")
      .should("have.css", "color", "rgb(243, 156, 18)");

    // 7.22: Click on the 2-persons" icon of the expense "Ticket" of the form Person3 and exclude Person1
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .click();
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(0)
      .find(".checks .checkbox")
      .eq(0)
      .find(".icons")
      .click();

    //  7.22: Expected result: The 2-Persons icon related to the expense "Ticket" of the form "Person1" is colored in orange
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .should("have.css", "color", "rgb(243, 156, 18)");

    // 7.23: Click on the 2-persons" icon of the expense "Gas" of the form Person3 and exclude Person2
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(2)
      .find(".tooltyp")
      .click();
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(2)
      .find(".checks .checkbox")
      .eq(1)
      .find(".icons")
      .click();

    // 7.23: Expected result: The 2-Persons icon related to the expense "Gas" of the form "Person3" is colored in orange
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(2)
      .find(".tooltyp")
      .should("have.css", "color", "rgb(243, 156, 18)");

    // 7.24: Click the Button "Calculate & Save!"
    /*
    Expected result:
    A box appears with title "Who pays whom how much"
    The result of the calculation:
      (1) Person1 owns 32.5 to Person2
      (2) Person1 owns 2.5 to Person3
    */
    cy.get("#submitbutton").click();

    cy.get(".the-return .ergi")
      .eq(0)
      .find(".deb")
      .should("have.text", "Person1");
    cy.get(".the-return .ergi")
      .eq(0)
      .find("div.pfeilanfang")
      .should("have.text", "32.5");
    cy.get(".the-return .ergi")
      .eq(0)
      .find("div.cred")
      .should("have.text", "Person2");

    cy.get(".the-return .ergi")
      .eq(1)
      .find(".deb")
      .should("have.text", "Person1");
    cy.get(".the-return .ergi")
      .eq(1)
      .find("div.pfeilanfang")
      .should("have.text", "2.5");
    cy.get(".the-return .ergi")
      .eq(1)
      .find("div.cred")
      .should("have.text", "Person3");
  });

  it("8.Nominal case: User can include a person after excluding him from an expense", () => {
    // 8.1: Expected result: The 2-Persons icon related to the expense "Ticket" of the form "Person1" is colored in grey
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .should("have.css", "color", "rgb(204, 204, 204)");

    // 8.2: Type in expense's amount in Person1: 150
    cy.get(".calc .inputwrap").eq(0).find("input.price").clear().type("150");

    // 8.3: Click the Button "Calculate & Save!"
    /*
    Expected result:
    A box appears with title "Who pays whom how much"
    The result of the calculation:
      (1) Person2 owns 16.67 to Person1
      (2) Person3 owns 16.67 to Person1
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

    // 8.4: Click on the 2-persons" icon of the expense "Ticket" of the form Person1 and exclude Person1
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .click();
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".checks .checkbox")
      .eq(0)
      .find(".icons")
      .click();

    // 8.4: Expected result: The 2-Persons icon related to the expense "Ticket" of the form "Person1" is colored in orange
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .should("have.css", "color", "rgb(243, 156, 18)");

    // 8.5: Click the Button "Calculate & Save!"
    /*
    Expected result:
    A box appears with title "Who pays whom how much"
    The result of the calculation:
      (1) Person2 owns 41.67 to Person1
      (2) Person3 owns 41.67 to Person1
    */
    cy.get("#submitbutton").click();

    cy.get(".the-return .ergi")
      .eq(0)
      .find(".deb")
      .should("have.text", "Person2");
    cy.get(".the-return .ergi")
      .eq(0)
      .find("div.pfeilanfang")
      .should("have.text", "41.67");
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
      .should("have.text", "41.67");
    cy.get(".the-return .ergi")
      .eq(1)
      .find("div.cred")
      .should("have.text", "Person1");

    // 8.6: Click on the 2-persons" icon of the expense "Ticket" of the form Person1 and include Person1
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".checks .checkbox")
      .eq(0)
      .find(".icons")
      .click();

    // 8.6: Expected result: The 2-Persons icon related to the expense "Ticket" of the form "Person1" is colored in grey
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .click();

    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .should("have.css", "color", "rgb(204, 204, 204)");

    // 8.7: Click the Button "Calculate & Save!"
    /*
    Expected result:
    A box appears with title "Who pays whom how much"
    The result of the calculation:
      (1) Person2 owns 16.67 to Person1
      (2) Person3 owns 16.67 to Person1
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
});
