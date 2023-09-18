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

  it("Nominal case: User cannot remove all the expense field. Each form must have at least 1 expense field", function () {
    // See how many expense input the Person1 have
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .should("have.length", "1");

    // Click on button"more" of Person1
    cy.get(".calc .userwrap").eq(0).find(".pluswrap").click();

    // See how many expense input the Person1 have. Person1 has 2 expense input
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .should("have.length", "2");

    // Click on minus button to remove the second expense of Person1
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".minus")
      .click();

    // See how many expense input the Person1 have. Person1 has 1 expense input
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .should("have.length", "1");

    // Click on minus button to remove the second expense of Person1
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".minus")
      .click();

    // See how many expense input the Person1 have
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .should("have.length", "1");

    // Alert bar appear saying: "You can not delete all input fields of a person. If that person had no expenses for the group, leave it to 0"
    cy.on("window:alert", (Text) => {
      expect(Text).to.contains(
        "You can not delete all input fields of a person. If that person had no expenses for the group, leave it to 0"
      );
    });
  });

  it("Nominal case: User can calculate if only one person paid and he has multiple expenses", function () {
    // Type in the first expense amount of Person1: 100
    cy.get(".calc .inputwrap").eq(0).find("input.price").type("100");
    // The total sum next to the Person1 name is 100
    cy.get(".calc .userwrap").find(".total").should("have.value", "100");

    // Click on button"more" of Person1
    cy.get(".calc .userwrap").eq(0).find(".pluswrap").click();

    // See how many expense input the Person1 have. Person1 has 2 expense input
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .should("have.length", "2");

    // Type in the second expense name of Person1: Food
    cy.get(".calc .inputwrap").eq(1).find("input.was").type("Food");
    // Type in the second expense amount of Person1: 150
    cy.get(".calc .inputwrap").eq(1).find("input.price").type("150");
    // The total sum next to the Person1 name is 250
    cy.get(".calc .userwrap").find(".total").should("have.value", "250");

    // Click on button"more" of Person1
    cy.get(".calc .userwrap").eq(0).find(".pluswrap").click();

    // See how many expense input the Person1 have. Person1 has 3 expense input
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .should("have.length", "3");

    // Type in the second expense name of Person1: Food
    cy.get(".calc .inputwrap").eq(2).find("input.was").type("Gas");
    // Type in the second expense amount of Person1: 150
    cy.get(".calc .inputwrap").eq(2).find("input.price").type("34.554");
    // The total sum next to the Person1 name is 250
    cy.get(".calc .userwrap").find(".total").should("have.value", "284.55");

    // Click on Button (submitbutton!)
    cy.get("#submitbutton").click();

    // Calculation is done and a box appears saying:
    // Person2 owns 94.85 to Person1
    cy.get(".the-return .ergi")
      .eq(0)
      .find(".deb")
      .should("have.text", "Person2");
    cy.get(".the-return .ergi")
      .eq(0)
      .find("div.pfeilanfang")
      .should("have.text", "94.85");
    cy.get(".the-return .ergi")
      .eq(0)
      .find("div.cred")
      .should("have.text", "Person1");

    // Person3 owns 94.85 to Person1
    cy.get(".the-return .ergi")
      .eq(1)
      .find(".deb")
      .should("have.text", "Person3");
    cy.get(".the-return .ergi")
      .eq(1)
      .find("div.pfeilanfang")
      .should("have.text", "94.85");
    cy.get(".the-return .ergi")
      .eq(1)
      .find("div.cred")
      .should("have.text", "Person1");
  });

  it("Nominal case: User can calculate if one person paid multiple expenses, while all other persons have one expense", function () {
    // Type in the first expense amount of Person1: 100
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find("input.price")
      .type("100");
    // The total sum next to the Person1 name is 100
    cy.get(".calc .userwrap").eq(0).find(".total").should("have.value", "100");

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
    // Type in the second expense amount of Person1: 150
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(1)
      .find("input.price")
      .type("150");
    // The total sum next to the Person1 name is 250
    cy.get(".calc .userwrap").eq(0).find(".total").should("have.value", "250");

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
    // Type in the third expense amount of Person1: 34.554
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(2)
      .find("input.price")
      .type("34.554");
    // The total sum next to the Person1 name is 284.55
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".total")
      .should("have.value", "284.55");

    // Type in the first expense amount of Person2: 55.3
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(0)
      .find("input.price")
      .type("55.3");

    // Type in the first expense amount of Person2: 55.3
    cy.get(".calc .userwrap").eq(1).find(".total").should("have.value", "55.3");

    // Type in the first expense amount of Person3: 1000
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(0)
      .find("input.price")
      .type("1000");

    // The total sum next to the Person3 name is 1000
    cy.get(".calc .userwrap").eq(2).find(".total").should("have.value", "1000");

    // Click on Button (submitbutton!)
    cy.get("#submitbutton").click();

    // Calculation is done and a box appears saying:
    // Person1 owns 162.07 to Person3
    cy.get(".the-return .ergi")
      .eq(0)
      .find(".deb")
      .should("have.text", "Person1");
    cy.get(".the-return .ergi")
      .eq(0)
      .find("div.pfeilanfang")
      .should("have.text", "162.07");
    cy.get(".the-return .ergi")
      .eq(0)
      .find("div.cred")
      .should("have.text", "Person3");

    // Person2 owns 391.32 to Person3
    cy.get(".the-return .ergi")
      .eq(1)
      .find(".deb")
      .should("have.text", "Person2");
    cy.get(".the-return .ergi")
      .eq(1)
      .find("div.pfeilanfang")
      .should("have.text", "391.32");
    cy.get(".the-return .ergi")
      .eq(1)
      .find("div.cred")
      .should("have.text", "Person3");
  });

  it("Nominal case: User can calculate if all persons have multiple expenses and their total expense are different", function () {
    // Type in the first expense amount of Person1: 100
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find("input.price")
      .type("100");
    // The total sum next to the Person1 name is 100
    cy.get(".calc .userwrap").eq(0).find(".total").should("have.value", "100");

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
    // Type in the second expense amount of Person1: 150
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(1)
      .find("input.price")
      .type("150");
    // The total sum next to the Person1 name is 250
    cy.get(".calc .userwrap").eq(0).find(".total").should("have.value", "250");

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
    // Type in the third expense amount of Person1: 34.554
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(2)
      .find("input.price")
      .type("34.554");
    // The total sum next to the Person1 name is 284.55
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".total")
      .should("have.value", "284.55");

    // Type in the first expense amount of Person2: 55.3
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(0)
      .find("input.price")
      .type("55.3");

    // The total sum next to the Person2 name is 55.3
    cy.get(".calc .userwrap").eq(1).find(".total").should("have.value", "55.3");

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

    // Type in the second expense amount of Person2: 100
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(1)
      .find("input.price")
      .type("100");

    // The total sum next to the Person2 name is 155.3
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".total")
      .should("have.value", "155.3");

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
    // Type in the third expense amount of Person2: 5.78
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(2)
      .find("input.price")
      .type("5.78");

    // The total sum next to the Person2 name is 155.3
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".total")
      .should("have.value", "161.08");

    // Type in the first expense amount of Person3: 1000
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(0)
      .find("input.price")
      .type("1000");

    // The total sum next to the Person3 name is 1000
    cy.get(".calc .userwrap").eq(2).find(".total").should("have.value", "1000");

    // Click on button"more" of Person3
    cy.get(".calc .userwrap").eq(2).find(".pluswrap").click();

    // Type in the second expense name of Person3: Food
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(1)
      .find("input.was")
      .type("Food");

    // Type in the second expense amount of Person3: 1
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(1)
      .find("input.price")
      .type("1");

    // The total sum next to the Person3 name is 1000
    cy.get(".calc .userwrap").eq(2).find(".total").should("have.value", "1001");

    // Click on button"more" of Person2
    cy.get(".calc .userwrap").eq(2).find(".pluswrap").click();

    // Type in the third expense name of Person3: Gas
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(2)
      .find("input.was")
      .type("Gas");
    // Type in the third expense amount of Person3: 3.127
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(2)
      .find("input.price")
      .type("3.127");

    // The total sum next to the Person3 name is 1000
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".total")
      .should("have.value", "1004.13");

    // Click on Button (submitbutton!)
    cy.get("#submitbutton").click();

    // Calculation is done and a box appears saying:
    // Person1 owns 198.7 to Person3
    cy.get(".the-return .ergi")
      .eq(0)
      .find(".deb")
      .should("have.text", "Person1");
    cy.get(".the-return .ergi")
      .eq(0)
      .find("div.pfeilanfang")
      .should("have.text", "198.7");
    cy.get(".the-return .ergi")
      .eq(0)
      .find("div.cred")
      .should("have.text", "Person3");

    // Person2 owns 322.17 to Person3
    cy.get(".the-return .ergi")
      .eq(1)
      .find(".deb")
      .should("have.text", "Person2");
    cy.get(".the-return .ergi")
      .eq(1)
      .find("div.pfeilanfang")
      .should("have.text", "322.17");
    cy.get(".the-return .ergi")
      .eq(1)
      .find("div.cred")
      .should("have.text", "Person3");
  });

  it("Edge case: User doesn't owe anything if all persons have multiple expenses but nobody paid", function () {
    // Type in the first expense amount of Person1: 0
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find("input.price")
      .type("0");
    // The total sum next to the Person1 name is 0
    cy.get(".calc .userwrap").eq(0).find(".total").should("have.value", "0");

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
    // Type in the second expense amount of Person1: 0
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(1)
      .find("input.price")
      .type("0");
    // The total sum next to the Person1 name is 0
    cy.get(".calc .userwrap").eq(0).find(".total").should("have.value", "0");

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
    // Type in the third expense amount of Person1: 0
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(2)
      .find("input.price")
      .type("0");
    // The total sum next to the Person1 name is 0
    cy.get(".calc .userwrap").eq(0).find(".total").should("have.value", "0");

    // Type in the first expense amount of Person2: 0
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(0)
      .find("input.price")
      .type("0");

    // The total sum next to the Person2 name is 0
    cy.get(".calc .userwrap").eq(1).find(".total").should("have.value", "0");

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

    // Type in the second expense amount of Person2: 100
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(1)
      .find("input.price")
      .type("0");

    // The total sum next to the Person2 name is 0
    cy.get(".calc .userwrap").eq(1).find(".total").should("have.value", "0");

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
    // Type in the third expense amount of Person2: 0
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(2)
      .find("input.price")
      .type("0");

    // The total sum next to the Person2 name is 0
    cy.get(".calc .userwrap").eq(1).find(".total").should("have.value", "0");

    // Type in the first expense amount of Person3: 0
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(0)
      .find("input.price")
      .type("0");

    // The total sum next to the Person3 name is 0
    cy.get(".calc .userwrap").eq(2).find(".total").should("have.value", "0");

    // Click on button"more" of Person3
    cy.get(".calc .userwrap").eq(2).find(".pluswrap").click();

    // Type in the second expense name of Person3: Food
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(1)
      .find("input.was")
      .type("Food");

    // Type in the second expense amount of Person3: 1
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(1)
      .find("input.price")
      .type("0");

    // The total sum next to the Person3 name is 0
    cy.get(".calc .userwrap").eq(2).find(".total").should("have.value", "0");

    // Click on button"more" of Person2
    cy.get(".calc .userwrap").eq(2).find(".pluswrap").click();

    // Type in the third expense name of Person3: Gas
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(2)
      .find("input.was")
      .type("Gas");
    // Type in the third expense amount of Person3: 0
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(2)
      .find("input.price")
      .type("0");

    // The total sum next to the Person3 name is 0
    cy.get(".calc .userwrap").eq(2).find(".total").should("have.value", "0");

    // Click on Button (submitbutton!)
    cy.get("#submitbutton").click();

    // A sentence under the title "Who pays whom how much" appears saying: No results to display, your group is even or there is no data
    cy.get(".the-return")
      .find(".initialwarning")
      .should(
        "have.text",
        "No results to display, your group is even or there is no data"
      );
  });

  it("Nominal case: User cannot calculate if all persons have the same total expenses", function () {
    // Type in the first expense amount of Person1: 100
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find("input.price")
      .type("100");
    // The total sum next to the Person1 name is 100
    cy.get(".calc .userwrap").eq(0).find(".total").should("have.value", "100");

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
    // The total sum next to the Person1 name is 130
    cy.get(".calc .userwrap").eq(0).find(".total").should("have.value", "130");

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
    // The total sum next to the Person1 name is 150
    cy.get(".calc .userwrap").eq(0).find(".total").should("have.value", "150");

    // Type in the first expense amount of Person2: 100
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(0)
      .find("input.price")
      .type("100");

    // The total sum next to the Person2 name is 100
    cy.get(".calc .userwrap").eq(1).find(".total").should("have.value", "100");

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

    // The total sum next to the Person2 name is 125
    cy.get(".calc .userwrap").eq(1).find(".total").should("have.value", "125");

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

    // The total sum next to the Person2 name is 150
    cy.get(".calc .userwrap").eq(1).find(".total").should("have.value", "150");

    // Type in the first expense amount of Person3: 100
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(0)
      .find("input.price")
      .type("100");

    // The total sum next to the Person3 name is 100
    cy.get(".calc .userwrap").eq(2).find(".total").should("have.value", "100");

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

    // The total sum next to the Person3 name is 110
    cy.get(".calc .userwrap").eq(2).find(".total").should("have.value", "110");

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

    // The total sum next to the Person3 name is 150
    cy.get(".calc .userwrap").eq(2).find(".total").should("have.value", "150");

    // Click on Button (submitbutton!)
    cy.get("#submitbutton").click();

    // A sentence under the title "Who pays whom how much" appears saying: No results to display, your group is even or there is no data
    cy.get(".the-return")
      .find(".initialwarning")
      .should(
        "have.text",
        "No results to display, your group is even or there is no data"
      );
  });

  it("Nominal case: User can choose and select any specific expense field and remove it with only one click. Expense fields are not removed by order (example: newest to oldest)", function () {
    // Type in the first expense amount of Person1: 100
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find("input.price")
      .type("100");
    // The total sum next to the Person1 name is 100
    cy.get(".calc .userwrap").eq(0).find(".total").should("have.value", "100");

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
    // The total sum next to the Person1 name is 130
    cy.get(".calc .userwrap").eq(0).find(".total").should("have.value", "130");

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
    // The total sum next to the Person1 name is 150
    cy.get(".calc .userwrap").eq(0).find(".total").should("have.value", "150");

    // Type in the first expense amount of Person2: 100
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(0)
      .find("input.price")
      .type("100");

    // The total sum next to the Person2 name is 100
    cy.get(".calc .userwrap").eq(1).find(".total").should("have.value", "100");

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

    // The total sum next to the Person2 name is 125
    cy.get(".calc .userwrap").eq(1).find(".total").should("have.value", "125");

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

    // The total sum next to the Person2 name is 150
    cy.get(".calc .userwrap").eq(1).find(".total").should("have.value", "150");

    // Type in the first expense amount of Person3: 100
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(0)
      .find("input.price")
      .type("100");

    // The total sum next to the Person3 name is 100
    cy.get(".calc .userwrap").eq(2).find(".total").should("have.value", "100");

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

    // The total sum next to the Person3 name is 110
    cy.get(".calc .userwrap").eq(2).find(".total").should("have.value", "110");

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

    // The total sum next to the Person3 name is 150
    cy.get(".calc .userwrap").eq(2).find(".total").should("have.value", "150");

    // Click on the minus icon of the second expense field of Person2 (Gas, 25)
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(2)
      .find(".minus")
      .click();

    // The total sum next to the Person2 name is 125
    cy.get(".calc .userwrap").eq(1).find(".total").should("have.value", "125");

    // Click on the minus icon of the first expense field of Person3 (Ticket, 100)
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(0)
      .find(".minus")
      .click();

    // The total sum next to the Person3 name is 50
    cy.get(".calc .userwrap").eq(2).find(".total").should("have.value", "50");

    // Click on the minus icon of the second expense field of Person1 (Food, 30)
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(1)
      .find(".minus")
      .click();

    // The total sum next to the Person1 name is 120
    cy.get(".calc .userwrap").eq(0).find(".total").should("have.value", "120");

    // Click on Button (submitbutton!)
    cy.get("#submitbutton").click();

    // Calculation is done and a box appears saying:
    // Person3 owns 21.67 to Person1
    cy.get(".the-return .ergi")
      .eq(0)
      .find(".deb")
      .should("have.text", "Person3");
    cy.get(".the-return .ergi")
      .eq(0)
      .find("div.pfeilanfang")
      .should("have.text", "21.67");
    cy.get(".the-return .ergi")
      .eq(0)
      .find("div.cred")
      .should("have.text", "Person1");

    // Person3 owns 26.67 to Person2
    cy.get(".the-return .ergi")
      .eq(1)
      .find(".deb")
      .should("have.text", "Person3");
    cy.get(".the-return .ergi")
      .eq(1)
      .find("div.pfeilanfang")
      .should("have.text", "26.67");
    cy.get(".the-return .ergi")
      .eq(1)
      .find("div.cred")
      .should("have.text", "Person2");
  });
});
