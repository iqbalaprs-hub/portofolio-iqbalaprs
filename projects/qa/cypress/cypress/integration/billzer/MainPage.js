/// <reference types="Cypress" />

describe("Main page of Billzer: typing data for the Calculation page", function () {
  beforeEach(() => {
    cy.visit("https://billzer.com/");
  });
  it("Nominal case: User creates a Calculation using valid name consisting of letters (Lowercase and uppercase) in the Name input", function () {
    cy.get(".input-hg").should("have.value", "3");
    cy.get("#text").should("have.attr", "placeholder", "e.g. Roadtrip");

    cy.get("#text").type("Trip");
    cy.get("#go").click();

    cy.get("#occasion").contains("Trip");
    cy.get(".calc").find(".userwrap").should("have.length", 3);
  });

  it("Nominal case: User creates a Calculation using valid name consisting of special characters, numbers and spaces) in the Name input", function () {
    cy.get("#text").type("12345                     !@#$%^&*()_+-{}|:?><");
    cy.get("#go").click();

    cy.get(".calc").find(".userwrap").should("have.length", 3);
    cy.get("#occasion").contains(
      "12345                     !@#$%^&*()_+-{}|:?><"
    );
  });

  it("Nominal case: User creates a Calculation while leaving the Name input empty", function () {
    cy.get("#go").click();

    cy.get("#occasion").should("have.value", "");
    cy.get(".calc").find(".userwrap").should("have.length", 3);
  });

  it("Edge case: User creates a Calculation with a name consisting of 40 characters in the Name input", function () {
    cy.get("#text").type("Theycannot enter more than 40 characters");
    cy.get("#go").click();

    cy.get("#occasion").contains("Theycannot enter more than 40 characters");
    cy.get(".calc").find(".userwrap").should("have.length", 3);
  });

  it("Edge case: User cannot create a Calculation with a name consisting of more than 40 characters in the Name input ", function () {
    cy.get("#text").type(
      "Theycannot enter more than 40 characters in this input name"
    );
    cy.get("#go").click();

    cy.get(".calc").find(".userwrap").should("have.length", 3);
    cy.get("#occasion").contains(
      "Theycannot enter more than 40 characters in this input name"
    );
  });

  it("Edge case: User creates a Calculation with a name written in Arabic language in the Name input ", function () {
    cy.get("#text").type("رحلة اجازة");
    cy.get("#go").click();

    cy.get(".calc").find(".userwrap").should("have.length", 3);
    cy.get("#occasion").contains("رحلة اجازة");
  });

  it("Nominal case: User creates a Calculation with 10 members", function () {
    cy.get(".input-hg").clear().type("10");
    cy.get("#text").type("Trip");
    cy.get("#go").click();

    cy.get("#occasion").contains("Trip");
    cy.get(".calc").find(".userwrap").should("have.length", 10);
  });

  it("Edge case: User creates a Calculation by writing a plus sign with a number 10", function () {
    cy.get(".input-hg").clear().type("+10", { force: true });
    cy.get("#text").type("Trip");
    cy.get("#go").click();

    cy.get("#occasion").contains("Trip");
    cy.get(".calc").find(".userwrap").should("have.length", 10);
  });

  it("Nominal case: User creates a Calculation with 40 members", function () {
    cy.get(".input-hg").clear().type("40");
    cy.get("#text").type("Trip");
    cy.get("#go").click();

    cy.get("#occasion").contains("Trip");
    cy.get(".calc").find(".userwrap").should("have.length", 40);
  });

  it("Nominal case: User creates a Calculation with 2 members", function () {
    cy.get(".input-hg").clear().type("2");
    cy.get("#text").type("Trip");
    cy.get("#go").click();

    cy.get("#occasion").contains("Trip");
    cy.get(".calc").find(".userwrap").should("have.length", 2);
  });

  it("Nominal case: User is using the arrows to choose the number  in the Member count input", function () {
    cy.get(".input-hg").should("have.value", "3");
    cy.get("#text").should("have.attr", "placeholder", "e.g. Roadtrip");

    cy.get('[type="button"][value="-"]').click();
    cy.get(".input-hg").should("have.value", "2");

    for (let i = 0; i < 10; i++) {
      cy.get('[type="button"][value="-"]').click();
    }
    cy.get(".input-hg").should("have.value", "2");

    for (let i = 0; i < 38; i++) {
      cy.get('[type="button"][value="+"]').click();
    }
    cy.get(".input-hg").should("have.value", "40");

    for (let i = 0; i < 10; i++) {
      cy.get('[type="button"][value="+"]').click();
    }
    cy.get(".input-hg").should("have.value", "40");

    cy.get(".input-hg").clear().type("3");
    cy.get("#text").type("Trip");
    cy.get("#go").click();
  });
});
