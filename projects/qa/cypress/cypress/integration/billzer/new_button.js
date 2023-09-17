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

  it("Nominal case: Return to the Main page for a new Calculation", function () {
    // Click on the "New" icon
    cy.get(".icon-doc-new").click();
    // User is returned to the Main page https://billzer.com/
    cy.url().should("eq", "https://billzer.com/");
  });
});
