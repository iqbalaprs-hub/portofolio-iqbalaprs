/// <reference types="Cypress" />

describe("Link", () => {
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
    - Type in the expense amount of the "ticket" in Person1: 100
    */
    cy.get(".calc .userwrap").eq(0).find("input.name").type("Person1");
    cy.get(".calc .userwrap").eq(1).find("input.name").type("Person2");
    cy.get(".calc .userwrap").eq(2).find("input.name").type("Person3");
    cy.get(".calc .inputwrap").eq(0).find("input.was").type("Ticket");
    cy.get(".calc .inputwrap").eq(1).find("input.was").type("Ticket");
    cy.get(".calc .inputwrap").eq(2).find("input.was").type("Ticket");
    cy.get(".calc .inputwrap").eq(0).find("input.price").type("100");
  });

  it("1.Nominal case: User gets the link of the calculation form the green sentence replacing the orange bar", () => {
    // 1.1: Find the orange bar
    cy.get(".savediv2")
      .find(".save2")
      .should(
        "have.text",
        "Unsaved changes. Hit the calculate button below or click here."
      )
      .click();
    cy.get(".savediv2").click();

    // 1.1: Expected result: Alert appears saying that it is saved and carry a link of the page
    cy.on("window:alert", (Text) => {
      expect(Text).to.contains(
        "Saved. Result is at the bottom.  Use this link to share or edit with your friends"
      );
    });

    /*
    1.1: Expected result:
    calculation us done and box appears saying:
      -Person2 owns 33.3 to person1
      -Person3 owns 33.33 to Person1
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

    // 1.2: Copy the link from the green sentence, compare it to the  URL
    // 1.2: Expected result: The link extracted and the URL are the same
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

    // 1.3: Type in expense's amount in Person1: 1001
    cy.get(".calc .inputwrap").eq(0).find("input.price").type("1");

    // 1.3: Expected result:  Orange bar appear
    cy.get(".savediv2")
      .find(".save2")
      .should(
        "have.text",
        "Unsaved changes. Hit the calculate button below or click here."
      )
      .click();

    // 1.4 Click on the orange bar
    cy.get(".savediv2").click();

    // 1.4: Expected result: Alert appear saying
    cy.on("window:alert", (Text) => {
      expect(Text).to.contains(
        "Saved. Result is at the bottom.  Use this link to share or edit with your friends"
      );
    });

    // 1.4: Expected result: Calculation is done and a box appears saying:
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

    // 1.4: Expected result: Alert appears saying that it is saved and carry a link of the page
    cy.get(".savediv").find(".save").contains("Saved");
    // 1.4: Expected result: The orange bar turn to a green sentence containing the word "Saved" with the link of the page. The link extracted and the URL are the same
    let extractedURL = "";
    cy.get(".savediv")
      .find(".save")
      .invoke("text")
      .then((text) => {
        const words = text.split(" ");
        extractedURL = words[words.length - 1];
        cy.log(words.length);
        cy.log(extractedURL);
        cy.url().should("include", extractedURL);
        cy.log(extractedURL);
        // 1.5: Go to the main page and try the link extracted from the green sentence
        // 1.5: Expected result:It is showing the page related to this link
        cy.visit("https://billzer.com/");
        cy.visit("https://" + extractedURL);
      });
  });

  it.only("2.Nominal case: User gets the link of the calculation form the Copy! icon", () => {
    // 2.1: Click the Button "Calculate & Save!"
    cy.get("#submitbutton").click();
    // 2.1: Expected result: A box under the calculation appears and gives  you the option to copy the link
    cy.get("#shareurl")
      .invoke("val")
      .then((inputValue) => {
        cy.log(inputValue);
        cy.url().should("include", inputValue);
        // 2.2: Go to the main page and paste the link of the box in the URL
        // 2.2: Expected result: It is showing the page related to this link
        cy.visit("https://billzer.com/");
        cy.visit("https://" + inputValue);
      });

    // 2.3: Type in expense's amount in Person1: 1001
    cy.get(".calc .inputwrap").eq(0).find("input.price").type("1");

    // 2.4: Click the Button "Calculate & Save!"
    cy.get("#submitbutton").click();

    // 2.4: Expected result: A box under the calculation appears and gives  you the option to copy the link
    cy.get("#shareurl")
      .invoke("val")
      .then((inputValue) => {
        cy.log(inputValue);
        cy.url().should("include", inputValue);
        // 2.5: Go to the main page and paste the link of the box in the URL
        // 2.5: Expected result: It is showing the page related to this link
        cy.visit("https://billzer.com/");
        cy.visit("https://" + inputValue);
      });
  });
});
