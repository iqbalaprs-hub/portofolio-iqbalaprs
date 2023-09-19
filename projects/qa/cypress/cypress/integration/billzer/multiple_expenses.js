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

  it("1.Nominal case: User cannot remove all the expense field. Each form must have at least 1 expense field", function () {
    // 1.1: Expected result: By default a form has 1 expense field
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .should("have.length", "1");

    // 1.2: Click on "more" in Person1
    // Expected result: Person1 has 2 expense input
    cy.get(".calc .userwrap").eq(0).find(".pluswrap").click();
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .should("have.length", "2");

    // 1.3: Click on the minus icon of Person1
    // Expected result: Person1 has 1 expense input
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".minus")
      .click();

    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .should("have.length", "1");

    // 1.4: Click on the minus icon of Person1
    /*
    Expected result:
    Alert appear saying: "You can not delete all input fields of a person. If that person had no expenses for the group, leave it to 0"
    Person1 has 1 expense input
    */
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find(".minus")
      .click();

    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .should("have.length", "1");

    cy.on("window:alert", (Text) => {
      expect(Text).to.contains(
        "You can not delete all input fields of a person. If that person had no expenses for the group, leave it to 0"
      );
    });
  });

  it("2.Nominal case: User can calculate if only one person paid and he has multiple expenses", function () {
    // 2.1: Type in the first expense amount of Person1: 100
    // Expected result: The total sum next to the Person1 name is 100
    cy.get(".calc .inputwrap").eq(0).find("input.price").type("100");
    cy.get(".calc .userwrap").find(".total").should("have.value", "100");

    // 2.2: Click on button"more" of Person1
    // Expected result: A second expense field is created
    cy.get(".calc .userwrap").eq(0).find(".pluswrap").click();
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .should("have.length", "2");

    // 2.3: Type in the second expense name of Person1: Food
    cy.get(".calc .inputwrap").eq(1).find("input.was").type("Food");

    // 2.4: Type in the second expense amount of Person1: 150
    // Expected result: The total sum next to the Person1 name is 250
    cy.get(".calc .inputwrap").eq(1).find("input.price").type("150");
    cy.get(".calc .userwrap").find(".total").should("have.value", "250");

    // 2.5: Click on button"more" of Person1
    // Expected result: A third expense field is created
    cy.get(".calc .userwrap").eq(0).find(".pluswrap").click();
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .should("have.length", "3");

    // 2.6: Type in the second expense name of Person1: Gas
    cy.get(".calc .inputwrap").eq(2).find("input.was").type("Gas");

    // 2.7: Type in the second expense amount of Person1: 34.554
    // Expected result: The total sum next to the Person1 name is 284.55
    cy.get(".calc .inputwrap").eq(2).find("input.price").type("34.554");
    cy.get(".calc .userwrap").find(".total").should("have.value", "284.55");

    // 2.8: Click on the button "Calculate &Save!"
    /*
    Expected result: 
    Calculation is done and a box appears saying:
      - Person2 owns 94.85 to Person1
      - Person3 owns 94.85 to Person1
    Note: All numbers are rounded by 2 decimal value
    */
    cy.get("#submitbutton").click();

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

  it("3.Nominal case: User can calculate if one person paid multiple expenses, while all other persons have one expense", function () {
    // 3.1: Type in the first expense amount of Person1: 100
    // Expected result: The total sum next to the Person1 name is 100
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find("input.price")
      .type("100");
    cy.get(".calc .userwrap").eq(0).find(".total").should("have.value", "100");

    // 3.2: Click on button"more" of Person1
    // Expected result: A second expense field is created
    cy.get(".calc .userwrap").eq(0).find(".pluswrap").click();
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .should("have.length", "2");

    // 3.3: Type in the second expense name of Person1: Food
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(1)
      .find("input.was")
      .type("Food");

    // 3.4: Type in the second expense amount of Person1: 150
    // Expected result: The total sum next to the Person1 name is 250
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(1)
      .find("input.price")
      .type("150");
    cy.get(".calc .userwrap").eq(0).find(".total").should("have.value", "250");

    // 3.5: Click on button"more" of Person1
    // Expected result: A third expense field is created
    cy.get(".calc .userwrap").eq(0).find(".pluswrap").click();
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .should("have.length", "3");

    // 3.6: Type in the third expense name of Person1: Gas
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(2)
      .find("input.was")
      .type("Gas");

    // 3.7: Type in the third expense amount of Person1: 34.554
    // Expected result: The total sum next to the Person1 name is 284.55
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(2)
      .find("input.price")
      .type("34.554");
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".total")
      .should("have.value", "284.55");

    // 3.8: Type in the first expense amount of Person2: 55.3
    // Expected result: The total sum next to the Person2 name is 55.3
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(0)
      .find("input.price")
      .type("55.3");
    cy.get(".calc .userwrap").eq(1).find(".total").should("have.value", "55.3");

    // 3.9: Type in the first expense amount of Person3: 1000
    // Expected result: The total sum next to the Person3 name is 1000
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(0)
      .find("input.price")
      .type("1000");
    cy.get(".calc .userwrap").eq(2).find(".total").should("have.value", "1000");

    // 3.10: Click on the button "Calculate &Save!"
    /*
    Expected result:
    Calculation is done and a box appears saying:
      - Person1 owns 162.07 to Person3
      - Person2 owns 391.32 to Person3
    Note: All numbers are rounded by 2 decimal values
    */
    cy.get("#submitbutton").click();

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

  it("4.Nominal case: User can calculate if all persons have multiple expenses and their total expense are different", function () {
    // 4.1: Type in the first expense amount of Person1: 100
    // Expected result: The total sum next to the Person1 name is 100
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find("input.price")
      .type("100");
    cy.get(".calc .userwrap").eq(0).find(".total").should("have.value", "100");

    // 4.2: Click on button"more" of Person1
    // Expected result: A second expense field is created
    cy.get(".calc .userwrap").eq(0).find(".pluswrap").click();
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .should("have.length", "2");

    // 4.3: Type in the second expense name of Person1: Food
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(1)
      .find("input.was")
      .type("Food");

    // 4.4: Type in the second expense amount of Person1: 150
    // Expected result: The total sum next to the Person1 name is 250
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(1)
      .find("input.price")
      .type("150");
    cy.get(".calc .userwrap").eq(0).find(".total").should("have.value", "250");

    // 4.5: Click on button"more" of Person1
    // Expected result: A third expense field is created
    cy.get(".calc .userwrap").eq(0).find(".pluswrap").click();
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .should("have.length", "3");

    // 4.6: Type in the third expense name of Person1: Gas
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(2)
      .find("input.was")
      .type("Gas");

    // 4.7: Type in the third expense amount of Person1: 34.554
    // Expected result: The total sum next to the Person1 name is 284.55
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(2)
      .find("input.price")
      .type("34.554");
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".total")
      .should("have.value", "284.55");

    // 4.8: Type in the first expense amount of Person2: 55.3
    // Expected result: The total sum next to the Person2 name is 55.3
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(0)
      .find("input.price")
      .type("55.3");
    cy.get(".calc .userwrap").eq(1).find(".total").should("have.value", "55.3");

    // 4.9: Click on button"more" of Person2
    // Expected result: A second expense field is created
    cy.get(".calc .userwrap").eq(1).find(".pluswrap").click();
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .should("have.length", "2");

    // 4.10: Type in the second expense name of Person2: Food
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(1)
      .find("input.was")
      .type("Food");

    // 4.11: Type in the second expense amount of Person2: 100
    // Expected result: The total sum next to the Person2 name is 155.3
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(1)
      .find("input.price")
      .type("100");
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".total")
      .should("have.value", "155.3");

    // 4.12: Click on button"more" of Person2
    // Expected result: A third expense field is created
    cy.get(".calc .userwrap").eq(1).find(".pluswrap").click();
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .should("have.length", "3");

    // 4.13: Type in the third expense name of Person2: Gas
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(2)
      .find("input.was")
      .type("Gas");

    // 4.14: Type in the third expense amount of Person2: 5.78
    // Expected result: The total sum next to the Person2 name is 161.08
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(2)
      .find("input.price")
      .type("5.78");
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".total")
      .should("have.value", "161.08");

    // 4.15: Type in the first expense amount of Person3: 1000
    // Expected result: The total sum next to the Person3 name is 1000
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(0)
      .find("input.price")
      .type("1000");
    cy.get(".calc .userwrap").eq(2).find(".total").should("have.value", "1000");

    // 4.16: Click on button"more" of Person3
    // Expected result: A second expense field is created
    cy.get(".calc .userwrap").eq(2).find(".pluswrap").click();
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .should("have.length", "2");

    // 4.17: Type in the second expense name of Person3: Food
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(1)
      .find("input.was")
      .type("Food");

    // 4.18: Type in the second expense amount of Person3: 1
    // Expected result: The total sum next to the Person3 name is 1001
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(1)
      .find("input.price")
      .type("1");
    cy.get(".calc .userwrap").eq(2).find(".total").should("have.value", "1001");

    // 4.19: Click on button"more" of Person3
    // Expected result: A third expense field is created
    cy.get(".calc .userwrap").eq(2).find(".pluswrap").click();
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .should("have.length", "3");

    // 4.20: Type in the third expense name of Person3: Gas
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(2)
      .find("input.was")
      .type("Gas");

    // 4.21: Type in the third expense amount of Person3: 3.127
    // Expected result: The total sum next to the Person3 name is 1004.13
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(2)
      .find("input.price")
      .type("3.127");
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".total")
      .should("have.value", "1004.13");

    // 4.22: Click on the button "Calculate &Save!"
    /*
    Expected result: 
    Calculation is done and a box appears saying:
      - Person1 owns 198.7 to Person3
      - Person2 owns 322.17 to Person3
    Note: All numbers are rounded by 2 decimal values
    */
    cy.get("#submitbutton").click();

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
    // 5.1: Type in the first expense amount of Person1: 0
    // Expected result: The total sum next to the Person1 name is 0
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find("input.price")
      .type("0");
    cy.get(".calc .userwrap").eq(0).find(".total").should("have.value", "0");

    // 5.2: Click on button"more" of Person1
    // Expected result: A second expense field is created
    cy.get(".calc .userwrap").eq(0).find(".pluswrap").click();
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .should("have.length", "2");

    // 5.3: Type in the second expense name of Person1: Food
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(1)
      .find("input.was")
      .type("Food");

    // 5.4: Type in the second expense amount of Person1: 0
    // Expected result: The total sum next to the Person1 name is 0
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(1)
      .find("input.price")
      .type("0");
    cy.get(".calc .userwrap").eq(0).find(".total").should("have.value", "0");

    // 5.5: Click on button"more" of Person1
    // Expected result: A third expense field is created
    cy.get(".calc .userwrap").eq(0).find(".pluswrap").click();
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .should("have.length", "3");

    // 5.6: Type in the third expense name of Person1: Gas
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(2)
      .find("input.was")
      .type("Gas");

    // 5.7: Type in the third expense amount of Person1: 0
    // Expected result: The total sum next to the Person1 name is 0
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(2)
      .find("input.price")
      .type("0");
    cy.get(".calc .userwrap").eq(0).find(".total").should("have.value", "0");

    // 5.8: Type in the first expense amount of Person2: 0
    // Expected result: The total sum next to the Person2 name is 0
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(0)
      .find("input.price")
      .type("0");
    cy.get(".calc .userwrap").eq(1).find(".total").should("have.value", "0");

    // 5.9: Click on button"more" of Person2
    // Expected result: A second expense field is created
    cy.get(".calc .userwrap").eq(1).find(".pluswrap").click();
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .should("have.length", "2");

    // 5.10: Type in the second expense name of Person2: Food
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(1)
      .find("input.was")
      .type("Food");

    // 5.11: Type in the second expense amount of Person2: 100
    // Expected result: The total sum next to the Person2 name is 0
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(1)
      .find("input.price")
      .type("0");
    cy.get(".calc .userwrap").eq(1).find(".total").should("have.value", "0");

    // 5.12: Click on button"more" of Person2
    // Expected result: A third expense field is created
    cy.get(".calc .userwrap").eq(1).find(".pluswrap").click();
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .should("have.length", "3");

    // 5.13: Type in the third expense name of Person2: Gas
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(2)
      .find("input.was")
      .type("Gas");

    // 5.14: Type in the third expense amount of Person2: 0
    // Expected result: The total sum next to the Person2 name is 0
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(2)
      .find("input.price")
      .type("0");
    cy.get(".calc .userwrap").eq(1).find(".total").should("have.value", "0");

    // 5.15: Type in the first expense amount of Person3: 0
    // Expected result: The total sum next to the Person3 name is 0
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(0)
      .find("input.price")
      .type("0");
    cy.get(".calc .userwrap").eq(2).find(".total").should("have.value", "0");

    // 5.16: Click on button"more" of Person3
    // Expected result: A second expense field is created
    cy.get(".calc .userwrap").eq(2).find(".pluswrap").click();
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .should("have.length", "2");

    // 5.17: Type in the second expense name of Person3: Food
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(1)
      .find("input.was")
      .type("Food");

    // 5.18: Type in the second expense amount of Person3: 0
    // Expected result: The total sum next to the Person3 name is 0
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(1)
      .find("input.price")
      .type("0");
    cy.get(".calc .userwrap").eq(2).find(".total").should("have.value", "0");

    // 5.19: Click on button"more" of Person3
    // Expected result: A third expense field is created
    cy.get(".calc .userwrap").eq(2).find(".pluswrap").click();
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .should("have.length", "3");

    // 5.20: Type in the third expense name of Person3: Gas
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(2)
      .find("input.was")
      .type("Gas");

    // 5.21: Type in the third expense amount of Person3: 0
    // Expected result: The total sum next to the Person3 name is 0
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(2)
      .find("input.price")
      .type("0");
    cy.get(".calc .userwrap").eq(2).find(".total").should("have.value", "0");

    // 5.22: Click on the button "Calculate &Save!"
    /*
    Expected result: A sentence under the title "Who pays whom how much" appears saying: No results to display, your group is even or there is no data
    */
    cy.get("#submitbutton").click();
    cy.get(".the-return")
      .find(".initialwarning")
      .should(
        "have.text",
        "No results to display, your group is even or there is no data"
      );
  });

  it("6.Nominal case: User cannot calculate if all persons have the same total expenses", function () {
    // 6.1: Type in the first expense amount of Person1: 100
    // Expected result: The total sum next to the Person1 name is 100
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find("input.price")
      .type("100");
    cy.get(".calc .userwrap").eq(0).find(".total").should("have.value", "100");

    // 6.2: Click on button"more" of Person1
    // Expected result: A second expense field is created
    cy.get(".calc .userwrap").eq(0).find(".pluswrap").click();
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .should("have.length", "2");

    // 6.3: Type in the second expense name of Person1: Food
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(1)
      .find("input.was")
      .type("Food");

    // 6.4: Type in the second expense amount of Person1: 30
    // Expected result: The total sum next to the Person1 name is 130
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(1)
      .find("input.price")
      .type("30");
    cy.get(".calc .userwrap").eq(0).find(".total").should("have.value", "130");

    // 6.5: Click on button"more" of Person1
    // Expected result: A third expense field is created
    cy.get(".calc .userwrap").eq(0).find(".pluswrap").click();
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .should("have.length", "3");

    // 6.6: Type in the third expense name of Person1: Gas
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(2)
      .find("input.was")
      .type("Gas");

    // 6.7: Type in the third expense amount of Person1: 20
    // Expected result: The total sum next to the Person1 name is 150
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(2)
      .find("input.price")
      .type("20");
    cy.get(".calc .userwrap").eq(0).find(".total").should("have.value", "150");

    // 6.8: Type in the first expense amount of Person2: 100
    // Expected result: The total sum next to the Person2 name is 100
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(0)
      .find("input.price")
      .type("100");
    cy.get(".calc .userwrap").eq(1).find(".total").should("have.value", "100");

    // 6.9: Click on button"more" of Person2
    // Expected result: A second expense field is created
    cy.get(".calc .userwrap").eq(1).find(".pluswrap").click();
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .should("have.length", "2");

    // 6.10: Type in the second expense name of Person2: Food
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(1)
      .find("input.was")
      .type("Food");

    // 6.11: Type in the second expense amount of Person2: 25
    // Expected result: The total sum next to the Person2 name is 125
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(1)
      .find("input.price")
      .type("25");
    cy.get(".calc .userwrap").eq(1).find(".total").should("have.value", "125");

    // 6.12: Click on button"more" of Person2
    // Expected result: A third expense field is created
    cy.get(".calc .userwrap").eq(1).find(".pluswrap").click();
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .should("have.length", "3");

    // 6.13: Type in the third expense name of Person2: Gas
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(2)
      .find("input.was")
      .type("Gas");

    // 6.14: Type in the third expense amount of Person2: 25
    // Expected result: The total sum next to the Person2 name is 150
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(2)
      .find("input.price")
      .type("25");
    cy.get(".calc .userwrap").eq(1).find(".total").should("have.value", "150");

    // 6.15: Type in the first expense amount of Person3: 100
    // Expected result: The total sum next to the Person3 name is 100
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(0)
      .find("input.price")
      .type("100");
    cy.get(".calc .userwrap").eq(2).find(".total").should("have.value", "100");

    // 6.16: Click on button"more" of Person3
    // Expected result:
    cy.get(".calc .userwrap").eq(2).find(".pluswrap").click();
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .should("have.length", "2");

    // 6.17: Type in the second expense name of Person3: Food
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(1)
      .find("input.was")
      .type("Food");

    // 6.18: Type in the second expense amount of Person3: 10
    // Expected result: The total sum next to the Person3 name is 110
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(1)
      .find("input.price")
      .type("10");
    cy.get(".calc .userwrap").eq(2).find(".total").should("have.value", "110");

    // 6.19: Click on button"more" of Person2
    // Expected result: A third expense field is created
    cy.get(".calc .userwrap").eq(2).find(".pluswrap").click();
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .should("have.length", "3");

    // 6.20: Type in the third expense name of Person3: Gas
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(2)
      .find("input.was")
      .type("Gas");

    // 6.21: Type in the third expense amount of Person3: 40
    // Expected result: The total sum next to the Person3 name is 150
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(2)
      .find("input.price")
      .type("40");
    cy.get(".calc .userwrap").eq(2).find(".total").should("have.value", "150");

    // 6.22: Click on the button "Calculate &Save!"
    // Expected result: A sentence under the title "Who pays whom how much" appears saying: No results to display, your group is even or there is no data
    cy.get("#submitbutton").click();
    cy.get(".the-return")
      .find(".initialwarning")
      .should(
        "have.text",
        "No results to display, your group is even or there is no data"
      );
  });

  it("7.Nominal case: User can choose and select any specific expense field and remove it with only one click. Expense fields are not removed by order (example: newest to oldest)", function () {
    // 7.1: Type in the first expense amount of Person1: 100
    // Expected result: The total sum next to the Person1 name is 100
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(0)
      .find("input.price")
      .type("100");
    cy.get(".calc .userwrap").eq(0).find(".total").should("have.value", "100");

    // 7.2: Click on button"more" of Person1
    // Expected result: A second expense field is created
    cy.get(".calc .userwrap").eq(0).find(".pluswrap").click();
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .should("have.length", "2");

    // 7.3: Type in the second expense name of Person1: Food
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(1)
      .find("input.was")
      .type("Food");

    // 7.4: Type in the second expense amount of Person1: 30
    // Expected result: The total sum next to the Person1 name is 130
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(1)
      .find("input.price")
      .type("30");
    cy.get(".calc .userwrap").eq(0).find(".total").should("have.value", "130");

    // 7.5: Click on button"more" of Person1
    // Expected result: A third expense field is created
    cy.get(".calc .userwrap").eq(0).find(".pluswrap").click();
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .should("have.length", "3");

    // 7.6: Type in the third expense name of Person1: Gas
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(2)
      .find("input.was")
      .type("Gas");

    // 7.7: Type in the third expense amount of Person1: 20
    // Expected result: The total sum next to the Person1 name is 150
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(2)
      .find("input.price")
      .type("20");
    cy.get(".calc .userwrap").eq(0).find(".total").should("have.value", "150");

    // 7.8: Type in the first expense amount of Person2: 100
    // Expected result: The total sum next to the Person2 name is 100
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(0)
      .find("input.price")
      .type("100");
    cy.get(".calc .userwrap").eq(1).find(".total").should("have.value", "100");

    // 7.9: Click on button"more" of Person2
    // Expected result: A second expense field is created
    cy.get(".calc .userwrap").eq(1).find(".pluswrap").click();
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .should("have.length", "2");

    // 7.10: Type in the second expense name of Person2: Food
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(1)
      .find("input.was")
      .type("Food");

    // 7.11: Type in the second expense amount of Person2: 25
    // Expected result: The total sum next to the Person2 name is 125
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(1)
      .find("input.price")
      .type("25");
    cy.get(".calc .userwrap").eq(1).find(".total").should("have.value", "125");

    // 7.12: Click on button"more" of Person2
    // Expected result: A third expense field is created
    cy.get(".calc .userwrap").eq(1).find(".pluswrap").click();
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .should("have.length", "3");

    // 7.13:Type in the third expense name of Person2: Gas
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(2)
      .find("input.was")
      .type("Gas");

    // 7.14: Type in the third expense amount of Person2: 25
    // Expected result: The total sum next to the Person2 name is 150
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(2)
      .find("input.price")
      .type("25");
    cy.get(".calc .userwrap").eq(1).find(".total").should("have.value", "150");

    // 7.15: Type in the first expense amount of Person3: 100
    // Expected result: The total sum next to the Person3 name is 100
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(0)
      .find("input.price")
      .type("100");
    cy.get(".calc .userwrap").eq(2).find(".total").should("have.value", "100");

    // 7.16: Click on button"more" of Person3
    // Expected result: A second expense field is created
    cy.get(".calc .userwrap").eq(2).find(".pluswrap").click();
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .should("have.length", "2");

    // 7.17: Type in the second expense name of Person3: Food
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(1)
      .find("input.was")
      .type("Food");

    // 7.18: Type in the second expense amount of Person3: 10
    // Ecpected result: The total sum next to the Person3 name is 110
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(1)
      .find("input.price")
      .type("10");
    cy.get(".calc .userwrap").eq(2).find(".total").should("have.value", "110");

    // 7.19: Click on button"more" of Person3
    // Expected result: A third expense field is created
    cy.get(".calc .userwrap").eq(2).find(".pluswrap").click();
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .should("have.length", "3");

    // 7.20: Type in the third expense name of Person3: Gas
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(2)
      .find("input.was")
      .type("Gas");

    // 7.21: Type in the third expense amount of Person3: 40
    // Expected result: The total sum next to the Person3 name is 150
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(2)
      .find("input.price")
      .type("40");
    cy.get(".calc .userwrap").eq(2).find(".total").should("have.value", "150");

    // 7.22: Click on the minus icon of the second expense field of Person2 (Gas, 25)
    // Expected result: The total sum next to the Person2 name is 125
    cy.get(".calc .userwrap")
      .eq(1)
      .find(".inputwrap")
      .eq(2)
      .find(".minus")
      .click();
    cy.get(".calc .userwrap").eq(1).find(".total").should("have.value", "125");

    // 7.23: Click on the minus icon of the first expense field of Person3 (Ticket, 100)
    // Expected result: The total sum next to the Person3 name is 50
    cy.get(".calc .userwrap")
      .eq(2)
      .find(".inputwrap")
      .eq(0)
      .find(".minus")
      .click();
    cy.get(".calc .userwrap").eq(2).find(".total").should("have.value", "50");

    // 7.24: Click on the minus icon of the second expense field of Person1 (Food, 30)
    // Expected result: The total sum next to the Person1 name is 120
    cy.get(".calc .userwrap")
      .eq(0)
      .find(".inputwrap")
      .eq(1)
      .find(".minus")
      .click();
    cy.get(".calc .userwrap").eq(0).find(".total").should("have.value", "120");

    // 7.25: Click on the button "Calculate &Save!"
    /*
    Expected result: 
    Calculation is done and a box appears saying:
      - Person3 owns 21.67 to Person1
      - Person3 owns 26.67 to Person2
    */
    cy.get("#submitbutton").click();

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
