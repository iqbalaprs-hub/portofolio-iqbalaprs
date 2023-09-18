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

    // Type in expense's amount in Person2: 100
    cy.get(".calc .inputwrap").eq(1).find("input.price").type("100");

    // Type in expense's amount in Person3: 100
    cy.get(".calc .inputwrap").eq(2).find("input.price").type("100");
  });

  it("Nominal case: User calculates the expenses by excluding Person1 from the expense Ticket of Person1", function () {
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

    //   The 2-Persons icon related to the expense "Ticket" of the form "Person1" is colored in orange
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .should("have.css", "color", "rgb(243, 156, 18)");

    // Click on Button (submitbutton!)
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

  it("Nominal case: User calculates the expenses by excluding Person1 and Person2 from the expense Ticket of the form Person1", function () {
    // Click on the 2-persons" icon of the expense "Ticket"of the form Person 1 and exclude both Person1 and Person2
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

    //   The 2-Persons icon related to the expense "Ticket" of the form "Person1" is colored in orange
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .should("have.css", "color", "rgb(243, 156, 18)");

    // Click on Button (submitbutton!)
    cy.get("#submitbutton").click();

    // Calculation is done and a box appears saying:
    // Person3 owns 33.33 to Person1
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

    // Person3 owns 33.33 to Person2
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

  it("Nominal case: User calculates the expenses by excluding Person1 from the expense Ticket of the form Person1 and the expense Ticket of the form  Person2", function () {
    // Click on the 2-persons" icon of the expense "Ticket"of the form Person1 and exclude Person1
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

    // The 2-Persons icon related to the expense "Ticket" of the form "Person1" is colored in orange
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .should("have.css", "color", "rgb(243, 156, 18)");

    // Click on the 2-persons" icon of the expense "Ticket" of  the form Person2 and exclude Person1
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

    // The 2-Persons icon related to the expense "Ticket" of the form "Person2" is colored in orange
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .should("have.css", "color", "rgb(243, 156, 18)");

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
  });

  it("Nominal case: User calculates the expenses by excluding Person1 from each expense in each of the three forms", function () {
    // Click on the 2-persons" icon of the expense "Ticket"of the form Person1 and exclude Person1
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

    // The 2-Persons icon related to the expense "Ticket" of the form "Person1" is colored in orange
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .should("have.css", "color", "rgb(243, 156, 18)");

    // Click on the 2-persons" icon of the expense "Ticket" of  the form Person2 and exclude Person1
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

    // The 2-Persons icon related to the expense "Ticket" of the form "Person2" is colored in orange
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .should("have.css", "color", "rgb(243, 156, 18)");

    // Click on the 2-persons" icon of the expense "Ticket" of  the form  person3 and exclude Person1
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

    // The 2-Persons icon related to the expense "Ticket" of the form "Person3" is colored in orange
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .should("have.css", "color", "rgb(243, 156, 18)");

    // Click on Button (submitbutton!)
    cy.get("#submitbutton").click();

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

  it("Nominal case: User calculates the expenses by excluding both Person1 and Person2 from all the expenses of all the forms", function () {
    // Click on the 2-persons" icon of the expense "Ticket" of the form Person1 and exclude both Person2 and Person3
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

    //   The 2-Persons icon related to the expense "Ticket" of the form "Person1" is colored in orange
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .should("have.css", "color", "rgb(243, 156, 18)");

    // Click on the 2-persons" icon of the expense "Ticket" of the form Person2 and exclude both Person2 and Person3
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

    //  The 2-Persons icon related to the expense "Ticket" of the form "Person2" is colored in orange
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .should("have.css", "color", "rgb(243, 156, 18)");

    // Click on the 2-persons" icon of the expense "Ticket" of the form Person3 and exclude both Person2 and Person3
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

    //  The 2-Persons icon related to the expense "Ticket" of the form "Person2" is colored in orange
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .should("have.css", "color", "rgb(243, 156, 18)");

    // Click on Button (submitbutton!)
    cy.get("#submitbutton").click();

    // Calculation is done and a box appears saying:
    // Person1 owns 100 to Person2
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

    // Person1 owns 100 to Person3
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

  it("Edge case: User cannot exclude all persons from an expense. At least one person should be included in each expense", function () {
    // Click on the 2-persons" icon of the expense "Ticket"of the form Person 1 and exclude both Person1 and Person2
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .click();

    //   Click on the 2-persons" icon of the expense "Ticket" of the form Person1 and exclude both Person1
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".checks .checkbox")
      .eq(0)
      .find(".icons")
      .click();

    //   Click on the 2-persons" icon of the expense "Ticket" of the form Person1 and exclude both Person2 and Person3
    // Bug: All persons related to an expense are removed. At least one person should be included in each expense
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

    //   The 2-Persons icon related to the expense "Ticket" of the form "Person1" is colored in orange
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .should("have.css", "color", "rgb(243, 156, 18)");
  });

  it("Nominal case: User can calculate even by mixing multiple expenses with include/exclude action", function () {
    // Click on button"more" of Person1
    cy.get(".calc .userwrap").eq(0).find(".pluswrap").click();

    // See how many expense input the Person1 have. Person1 has 2 expense input
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .should("have.length", "2");

    // Type in the second expense name of Person1: Food
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(1)
      .find("input.was")
      .type("Food");
    // Type in the second expense amount of Person1: 30
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(1)
      .find("input.price")
      .type("30");

    // Click on button"more" of Person1
    cy.get(".calc .userwrap").eq(0).find(".pluswrap").click();

    // See how many expense input the Person1 have. Person1 has 3 expense input
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .should("have.length", "3");

    // Type in the third expense name of Person1: Gas
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(2)
      .find("input.was")
      .type("Gas");
    // Type in the third expense amount of Person1: 20
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(2)
      .find("input.price")
      .type("20");

    // Click on button"more" of Person2
    cy.get(".calc .userwrap").eq(1).find(".pluswrap").click();

    // See how many expense input the Person1 have. Person2 has 2 expense input
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .should("have.length", "2");

    // Type in the second expense name of Person2: Food
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(1)
      .find("input.was")
      .type("Food");

    // Type in the second expense amount of Person2: 25
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(1)
      .find("input.price")
      .type("25");

    // Click on button"more" of Person2
    cy.get(".calc .userwrap").eq(1).find(".pluswrap").click();

    // See how many expense input the Person1 have. Person2 has 3 expense input
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .should("have.length", "3");

    // Type in the third expense name of Person2: Gas
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(2)
      .find("input.was")
      .type("Gas");
    // Type in the third expense amount of Person2: 25
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(2)
      .find("input.price")
      .type("25");

    // Click on button"more" of Person3
    cy.get(".calc .userwrap").eq(2).find(".pluswrap").click();

    // Type in the second expense name of Person3: Food
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(1)
      .find("input.was")
      .type("Food");

    // Type in the second expense amount of Person3: 10
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(1)
      .find("input.price")
      .type("10");

    // Click on button"more" of Person2
    cy.get(".calc .userwrap").eq(2).find(".pluswrap").click();

    // Type in the third expense name of Person3: Gas
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(2)
      .find("input.was")
      .type("Gas");
    // Type in the third expense amount of Person3: 40
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(2)
      .find("input.price")
      .type("40");

    // Click on the 2-persons" icon of the expense "Ticket"of the form Person1 and exclude both Person2 and Person3
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

    //  The 2-Persons icon related to the expense "Ticket" of the form "Person2" is colored in orange
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .should("have.css", "color", "rgb(243, 156, 18)");

    // Click on the 2-persons" icon of the expense "Gas" of the form Person1 and exclude Person2
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

    //  The 2-Persons icon related to the expense "Gas" of the form "Person1" is colored in orange
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(2)
      .find(".tooltyp")
      .should("have.css", "color", "rgb(243, 156, 18)");

    // Click on the 2-persons" icon of the expense "Food" of the form Person2 and exclude Person1
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

    //  The 2-Persons icon related to the expense "Food" of the form "Person2" is colored in orange
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(1)
      .find(".tooltyp")
      .should("have.css", "color", "rgb(243, 156, 18)");

    // Click on the 2-persons" icon of the expense "Ticket" of the form Person3 and exclude Person1
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

    //  The 2-Persons icon related to the expense "Ticket" of the form "Person1" is colored in orange
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .should("have.css", "color", "rgb(243, 156, 18)");

    // Click on the 2-persons" icon of the expense "Gas" of the form Person3 and exclude Person2
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

    //  The 2-Persons icon related to the expense "Gas" of the form "Person3" is colored in orange
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(2)
      .find(".tooltyp")
      .should("have.css", "color", "rgb(243, 156, 18)");

    // Click on Button (submitbutton!)
    cy.get("#submitbutton").click();

    // Calculation is done and a box appears saying:
    // Person1 owns 32.5 to Person2
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

    // Person1 owns 2.5 to Person3
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

  it("Nominal case: User can include a person after excluding him from an expense", function () {
    // Type in expense's amount in Person1: 150
    cy.get(".calc .inputwrap").eq(0).find("input.price").clear().type("150");

    // Click on Button (submitbutton!)
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

    // Click on the 2-persons" icon of the expense "Ticket" of the form Person1 and exclude Person1
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

    //  The 2-Persons icon related to the expense "Ticket" of the form "Person1" is colored in orange
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".tooltyp")
      .should("have.css", "color", "rgb(243, 156, 18)");

    // Click on Button (submitbutton!)
    cy.get("#submitbutton").click();

    // Calculation is done and a box appears saying:
    // Person2 owns 41.67 to Person1
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

    // Person3 owns 41.67 to Person1
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

    // Click on the 2-persons" icon of the expense "Ticket" of the form Person1 and include Person1
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".checks .checkbox")
      .eq(0)
      .find(".icons")
      .click();

    // Click on Button (submitbutton!)
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
});
