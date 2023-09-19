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
    */
    cy.get(".calc .userwrap").eq(0).find("input.name").type("Person1");
    cy.get(".calc .userwrap").eq(1).find("input.name").type("Person2");
    cy.get(".calc .userwrap").eq(2).find("input.name").type("Person3");
    cy.get(".calc .inputwrap").eq(0).find("input.was").type("Ticket");
    cy.get(".calc .inputwrap").eq(1).find("input.was").type("Ticket");
    cy.get(".calc .inputwrap").eq(2).find("input.was").type("Ticket");
  });

  it("1: Nominal case: Return to the Main page for a new Calculation", function () {
    // 1.1: Click on the "New" icon
    // Expected result: User is returned to the Main page https://billzer.com/
    cy.get(".icon-doc-new").click();
    cy.url().should("eq", "https://billzer.com/");
  });
});
