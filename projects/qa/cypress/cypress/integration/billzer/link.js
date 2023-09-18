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

    // Type in expense's amount in Person1: 100
    cy.get(".calc .inputwrap").eq(0).find("input.price").type("100");
  });

  it("Nominal case: User gets the link of the calculation form the green sentence replacing the orange bar", function () {
    // Find the orange bar
    cy.get(".savediv2")
      .find(".save2")
      .should(
        "have.text",
        "Unsaved changes. Hit the calculate button below or click here."
      )
      .click();

    // Click on the orange bar
    cy.get(".savediv2").click();

    // Alert bar appear saying "Saved. Result is at the bottom.  Use this link to share or edit with your friends:  (link)"
    cy.on("window:alert", (Text) => {
      expect(Text).to.contains(
        "Saved. Result is at the bottom.  Use this link to share or edit with your friends"
      );
    });

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

    // Copy the link from the green sentence, compare it to the  URL
    // The link extracted and the URL are the same
    cy.get(".savediv")
      .find(".save")
      .invoke("text")
      .then((text) => {
        const words = text.split(" ");
        const extractedURL = words[words.length - 1];
        cy.log(words.length);
        cy.log(extractedURL);
        cy.url().should("include", extractedURL);
      });

    // Type in expense's amount in Person1: 1001
    cy.get(".calc .inputwrap").eq(0).find("input.price").type("1");

    // Find the orange bar
    cy.get(".savediv2")
      .find(".save2")
      .should(
        "have.text",
        "Unsaved changes. Hit the calculate button below or click here."
      )
      .click();

    // Click on the orange bar
    cy.get(".savediv2").click();

    // Alert bar appear saying "Saved. Result is at the bottom.  Use this link to share or edit with your friends:  (link)"
    cy.on("window:alert", (Text) => {
      expect(Text).to.contains(
        "Saved. Result is at the bottom.  Use this link to share or edit with your friends"
      );
    });

    // Calculation is done and a box appears saying:
    // Person2 owns 333.67 to Person1
    cy.get(".the-return .ergi")
      .eq(0)
      .find(".deb")
      .should("have.text", "Person2");
    cy.get(".the-return .ergi")
      .eq(0)
      .find("div.pfeilanfang")
      .should("have.text", "333.67");
    cy.get(".the-return .ergi")
      .eq(0)
      .find("div.cred")
      .should("have.text", "Person1");

    // Person3 owns 333.67 to Person1
    cy.get(".the-return .ergi")
      .eq(1)
      .find(".deb")
      .should("have.text", "Person3");
    cy.get(".the-return .ergi")
      .eq(1)
      .find("div.pfeilanfang")
      .should("have.text", "333.67");
    cy.get(".the-return .ergi")
      .eq(1)
      .find("div.cred")
      .should("have.text", "Person1");

    // Copy the link from the green sentence, compare it to the  URL
    // The link extracted and the URL are the same
    cy.get(".savediv")
      .find(".save")
      .invoke("text")
      .then((text) => {
        const words = text.split(" ");
        const extractedURL = words[words.length - 1];
        cy.log(words.length);
        cy.log(extractedURL);
        cy.url().should("include", extractedURL);
      });
  });

  it("Nominal case: User gets the link of the calculation form the Copy! icon", function () {
    // Click the Button "Calculate & Save!"
    cy.get("#submitbutton").click();

    // Alert bar appears saying that it is saved and carry a link of the page
    cy.get(".savediv").find(".save").contains("Saved");

    cy.get("#shareurl")
      .invoke("val")
      .then((inputValue) => {
        cy.log(inputValue);
        cy.url().should("include", inputValue);
      });

    // Type in expense's amount in Person1: 1001
    cy.get(".calc .inputwrap").eq(0).find("input.price").type("1");

    // Click the Button "Calculate & Save!"
    cy.get("#submitbutton").click();

    // Alert bar appears saying that it is saved and carry a link of the page
    cy.get(".savediv").find(".save").contains("Saved");

    cy.get("#shareurl")
      .invoke("val")
      .then((inputValue) => {
        cy.log(inputValue);
        cy.url().should("include", inputValue);
      });
  });
});
