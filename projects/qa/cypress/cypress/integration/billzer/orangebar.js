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

  it("Nominal case: Both blue button (Calculate & Save!) and orange bar appears when changin number", function () {
    //          --------------------        FIRST CHANGE: CHANGE A NUMBER   -----------------------------------------

    // Button (submitbutton!) appears
    cy.get("#submitbutton");

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
  });

  it("Nominal case: Both blue button (Calculate & Save!) and orange bar appears when clicking on button more and minus button", function () {
    //          --------------------        SECOND CHANGE: CLICK ON THE BUTTON MORE AND THE BUTTON MINUS   -----------------------------------------

    // Click on Button (submitbutton!)
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

    // Click on button"more" of Person1
    cy.get(".calc .userwrap").eq(0).find(".pluswrap").click();

    // Button (submitbutton!) appears
    cy.get("#submitbutton");

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

    // Click on minus button to remove the second expense of Person1
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(1)
      .find(".minus")
      .click();

    // Button (submitbutton!) appears
    cy.get("#submitbutton");

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
  });

  it("Nominal case: Both blue button (Calculate & Save!) and orange bar appears when excluding a person from an expense", function () {
    //          --------------------        THIRD CHANGE: EXCLUDE A PERSON   -----------------------------------------

    // Click on Button (submitbutton!)
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

    // Exclude Person1 from the expense of Person1
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

    // Button (submitbutton!) appears
    cy.get("#submitbutton");

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
    // Person2 owns 50 to Person1
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

    // Person3 owns 50 to Person1
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

  it("Nominal case: Both blue button (Calculate & Save!) and orange bar appears when changing expense name", function () {
    // Click on Button (submitbutton!)
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

    // Change the first expense name of Person1 from "Ticket" to "food"
    cy.get(".calc .inputwrap").eq(0).find("input.was").clear().type("Food");

    // Button (submitbutton!) appears
    cy.get("#submitbutton");

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
  });

  it("Nominal case: Both blue button (Calculate & Save!) and orange bar appears when changing person name", function () {
    // Click on Button (submitbutton!)
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

    // Type in Person's name in form 1: Guy1
    cy.get(".calc .userwrap").eq(0).find("input.name").clear().type("Guy1");

    // Button (submitbutton!) appears
    cy.get("#submitbutton");

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
      .should("have.text", "Guy1");

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
      .should("have.text", "Guy1");
  });
});
