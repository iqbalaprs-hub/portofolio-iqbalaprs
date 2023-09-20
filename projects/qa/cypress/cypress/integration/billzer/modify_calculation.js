/// <reference types="Cypress" />

describe("My Second Test Suite", function () {
  beforeEach(() => {
    // Prereq: the user visits the page "https://billzer.com/"
    cy.visit("https://billzer.com/");

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
    - Type in expense's amount in Person1: 100

    NOTE: Both button "Calculate & Save!" and the orange bar "Unsaved changes. Hit the calculate button below or click here" appear once you make any change in any form
    */
    cy.get(".calc .userwrap").eq(0).find("input.name").type("Person1");
    cy.get(".calc .userwrap").eq(1).find("input.name").type("Person2");
    cy.get(".calc .userwrap").eq(2).find("input.name").type("Person3");
    cy.get(".calc .inputwrap").eq(0).find("input.was").type("Ticket");
    cy.get(".calc .inputwrap").eq(1).find("input.was").type("Ticket");
    cy.get(".calc .inputwrap").eq(2).find("input.was").type("Ticket");
    cy.get(".calc .inputwrap").eq(0).find("input.price").type("100");
  });

  it("1.Nominal case: Both blue button (Calculate & Save!) and orange bar appears when changing number", function () {
    //          --------------------        FIRST CHANGE: CHANGE A NUMBER   -----------------------------------------

    // 1.1: Click on "Calculate & Save!"
    // Note: We had to do it so that we can show that changing number will activate the orange bar and the blue button
    cy.get("#submitbutton").click();

    // 1.2: Type in expense amount in Person1: 120
    // 1.2: Expected result: Both blue button and orange bar reappear
    cy.get(".calc .inputwrap").eq(0).find("input.price").clear().type("120");
    // Blue button
    cy.get("#submitbutton").should("be.visible");
    // Orange bar
    cy.get(".savediv2")
      .find(".save2")
      .should(
        "have.text",
        "Unsaved changes. Hit the calculate button below or click here."
      );

    // 1.2: Expected result: The box calculation result disappears
    cy.get(".the-return")
      .find(".changed h1")
      .should(($h1) => {
        expect($h1.text().trim()).to.be.empty;
      });

    // 1.3: Click on "Calculate & Save!"
    // 1.3: Expected result: The green sentence saying that it is saved appears
    cy.get("#submitbutton").click();
    cy.get(".savediv").find(".save").contains("Saved");

    /*
      1.3: Expected result:
      Calculation is done and a box appears saying:
        - Person2 owns 40 to Person1
        - Person3 owns 40 to Person1
      */
    cy.get(".the-return .ergi")
      .eq(0)
      .find(".deb")
      .should("have.text", "Person2");
    cy.get(".the-return .ergi")
      .eq(0)
      .find("div.pfeilanfang")
      .should("have.text", "40");
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
      .should("have.text", "40");
    cy.get(".the-return .ergi")
      .eq(1)
      .find("div.cred")
      .should("have.text", "Person1");
  });

  it("2.Nominal case: Both blue button (Calculate & Save!) and orange bar appears when clicking on button more and minus button", function () {
    //          --------------------        SECOND CHANGE: CLICK ON THE BUTTON MORE AND THE BUTTON MINUS   -----------------------------------------

    // 2.1: Click on "Calculate & Save!"
    // Note: We had to do it so that we can show the clicking on "more" will activate the orange bar and the blue button
    cy.get("#submitbutton").click();

    // 2.2: Click on button"more" of Person1
    cy.get(".calc .userwrap").eq(0).find(".pluswrap").click();
    // 2.2: Expected result: Both blue button and orange bar reappear
    // Blue button
    cy.get("#submitbutton").should("be.visible");
    // Orange bar
    cy.get(".savediv2")
      .find(".save2")
      .should(
        "have.text",
        "Unsaved changes. Hit the calculate button below or click here."
      );

    // 2.2: Expected result: The box calculation result disappears
    cy.get(".the-return")
      .find(".changed h1")
      .should(($h1) => {
        expect($h1.text().trim()).to.be.empty;
      });

    // 2.3: Click on "Calculate & Save!"
    // 2.3: Expected result: The green sentence saying that it is saved appears
    cy.get("#submitbutton").click();
    cy.get(".savediv").find(".save").contains("Saved");

    /*
    2.3: Expected result:
    Calculation is done and a box appears saying:
      - Person2 owns 33.33 to Person1
      - Person3 owns 33.33 to Person1
    */
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

    // 2.4: Click on minus button to remove the second expense of Person1
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(1)
      .find(".minus")
      .click();

    cy.get("#submitbutton");
    cy.get(".savediv2")
      .find(".save2")
      .should(
        "have.text",
        "Unsaved changes. Hit the calculate button below or click here."
      )
      .click();

    // 2.4: Expected result: Both blue button and orange bar reappear
    // Blue button
    cy.get("#submitbutton").should("be.visible");
    // Orange bar
    cy.get(".savediv2")
      .find(".save2")
      .should(
        "have.text",
        "Unsaved changes. Hit the calculate button below or click here."
      );

    // 2.4: Expected result: The box calculation result disappears
    cy.get(".the-return")
      .find(".changed h1")
      .should(($h1) => {
        expect($h1.text().trim()).to.be.empty;
      });

    // 2.5: Click on "Calculate & Save!"
    // 2.5: Expected result: The green sentence saying that it is saved appears
    cy.get("#submitbutton").click();
    cy.get(".savediv").find(".save").contains("Saved");

    /*
    2.5: Expected result:
    Calculation is done and a box appears saying:
      - Person2 owns 33.33 to Person1
      - Person3 owns 33.33 to Person1
    */
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

  it("3.Nominal case: Both blue button (Calculate & Save!) and orange bar appears when excluding a person from an expense", function () {
    //          --------------------        THIRD CHANGE: EXCLUDE A PERSON   -----------------------------------------

    // 3.1: Click on "Calculate & Save!"
    // Note: We had to do it so that we can show the clicking on "more" will activate the orange bar and the blue button
    cy.get("#submitbutton").click();

    // 3.2: Exclude Person1 from the expense of Person1
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

    // 3.2: Expected result: Both blue button and orange bar reappear
    // Blue button
    cy.get("#submitbutton").should("be.visible");
    // Orange bar
    cy.get(".savediv2")
      .find(".save2")
      .should(
        "have.text",
        "Unsaved changes. Hit the calculate button below or click here."
      );

    // 3.2: Expected result: The box calculation result disappears
    cy.get(".the-return")
      .find(".changed h1")
      .should(($h1) => {
        expect($h1.text().trim()).to.be.empty;
      });

    // 3.3: Click on "Calculate & Save!"
    // 3.3: Expected result: The green sentence saying that it is saved appears
    cy.get("#submitbutton").click();
    cy.get(".savediv").find(".save").contains("Saved");

    /*
    3.3: Expected result:
    Calculation is done and a box appears saying:
      - Person2 owns 50 to Person1
      - Person3 owns 50 to Person1
    */
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

  it("4.Nominal case: Both blue button (Calculate & Save!) and orange bar appears when changing expense name", function () {
    // 4.1: Click on "Calculate & Save!"
    // Note: We had to do it so that we can show the clicking on "more" will activate the orange bar and the blue button
    cy.get("#submitbutton").click();

    // 4.2: Change the first expense name of Person1 from "Ticket" to "food"
    cy.get(".calc .inputwrap").eq(0).find("input.was").clear().type("Food");

    // 4.2: Expected result: Both blue button and orange bar reappear
    // Blue button
    cy.get("#submitbutton").should("be.visible");
    // Orange bar
    cy.get(".savediv2")
      .find(".save2")
      .should(
        "have.text",
        "Unsaved changes. Hit the calculate button below or click here."
      );

    // 4.2: Expected result: The box calculation result disappears
    cy.get(".the-return")
      .find(".changed h1")
      .should(($h1) => {
        expect($h1.text().trim()).to.be.empty;
      });

    // 4.3: Click on "Calculate & Save!"
    // 4.3: Expected result: The green sentence saying that it is saved appears
    cy.get("#submitbutton").click();
    cy.get(".savediv").find(".save").contains("Saved");

    /*
    4.3: Expected result:
    Calculation is done and a box appears saying:
      - Person2 owns 33.33 to Person1
      - Person3 owns 33.33 to Person1
    */
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

  it("5.Nominal case: Both blue button (Calculate & Save!) and orange bar appears when changing person name", function () {
    // 5.1: Click on "Calculate & Save!"
    // Note: We had to do it so that we can show the clicking on "more" will activate the orange bar and the blue button

    cy.get("#submitbutton").click();

    // 5.2: Change the first person name of Person1 from "Person1" to "Guy1"
    cy.get(".calc .userwrap").eq(0).find("input.name").clear().type("Guy1");

    // 5.2: Expected result: Both blue button and orange bar reappear
    // Blue button
    cy.get("#submitbutton").should("be.visible");
    // Orange bar
    cy.get(".savediv2")
      .find(".save2")
      .should(
        "have.text",
        "Unsaved changes. Hit the calculate button below or click here."
      );

    // 5.2: Expected result: The box calculation result disappears
    cy.get(".the-return")
      .find(".changed h1")
      .should(($h1) => {
        expect($h1.text().trim()).to.be.empty;
      });

    // 5.3: Click on "Calculate & Save!"
    // 5.3: Expected result: The green sentence saying that it is saved appears
    cy.get("#submitbutton").click();
    cy.get(".savediv").find(".save").contains("Saved");

    /*
    5.3: Expected result:
    Calculation is done and a box appears saying:
      - Person2 owns 33.33 to Guy1
      - Person3 owns 33.33 to Guy1
    */
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
      .should("have.text", "Guy1");

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
      .should("have.text", "Guy1");
  });
});
