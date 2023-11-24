/// <reference types="Cypress" />

describe("API test for endpoint GET /lang/{language}", () => {
  it("1- Request for a country by its languages (normal usage)", () => {
    cy.request("GET", "https://restcountries.com/v3.1/lang/Russian").then(
      (response) => {
        // Assertion 1: Response is 200
        expect(response.status).to.equal(200);

        // Assertion 2: The array contains 7 objects (Seven countries)
        cy.wrap(response.body).should("have.length", 7);
        cy.log("There are 7 countries");

        /*
            Assertion 3:
            The countries are:
                - Kazakhstan
                - Uzbekistan
                - Tajikistan
                - Russia
                - Turkmenistan
                - Kyrgyzstan
                - Belarus
        */

        response.body.forEach((country, index) => {
          // Access the different properties
          const commonName = country.name.common;
          const language = country.languages;

          cy.log(`Common Name ${index + 1}: ${commonName}`);
          cy.log(`language ${index + 1}:`);
          cy.log(JSON.stringify(language));
        });
      }
    );
  });

  it("2- Test the property 'languages' by showing that the endpoint performs a case-insensitive match against the country's languages and it gives more than one country", () => {
    cy.request("GET", "https://restcountries.com/v3.1/lang/rUssIan").then(
      (response) => {
        // Assertion 1: Response is 200
        expect(response.status).to.equal(200);

        // Assertion 2: The array contains 7 objects (Seven countries)
        cy.wrap(response.body).should("have.length", 7);
        cy.log("There are 7 countries");

        /*
             Assertion 3:
             The countries are:
                 - Kazakhstan
                 - Uzbekistan
                 - Tajikistan
                 - Russia
                 - Turkmenistan
                 - Kyrgyzstan
                 - Belarus
         */
        response.body.forEach((country, index) => {
          // Access the different properties
          const commonName = country.name.common;
          const language = country.languages;

          cy.log(`Common Name ${index + 1}: ${commonName}`);
          cy.log(`language ${index + 1}:`);
          cy.log(JSON.stringify(language));
        });
      }
    );
  });

  it("3- Test the property 'languages' by showing that the endpoint performs a perfect match against the country's languages. We removed one letter and it will give an error response of 404", () => {
    cy.request({
      method: "GET",
      url: "https://restcountries.com/v3.1/lang/rUssIa",
      failOnStatusCode: false, // Do not fail the test on non-2xx status codes
    }).then((response) => {
      // Assertion 1: Response is 404
      expect(response.status).to.eq(404);

      // Assertion 2: The message is "Not Found"
      expect(response.body).to.deep.equal({
        status: 404,
        message: "Not Found",
      });
    });
    cy.wait(1000);
  });

  it("4- Test the property 'languages' by showing that the endpoint, which is a language's abbreviation, performs a case-insensitive match against the country's language abbreviation", () => {
    cy.request("GET", "https://restcountries.com/v3.1/lang/hyE").then(
      (response) => {
        // Assertion 1: Response is 200
        expect(response.status).to.equal(200);

        // Assertion 2: The array contains only one object (one country)
        cy.wrap(response.body).should("have.length", 1);
        cy.log("There is only 1 country");

        /*
        Assertion 3:
        This one country is Armenia ("languages": {
            "hye": "Armenian"
        })
        */
        const armenia = response.body[0];
        expect(armenia.name.common).to.equal("Armenia");
        // expect(armenia.languages).to.equal("hye: Armenian");
        expect(armenia.languages).to.include({
          hye: "Armenian",
        });
        cy.log(JSON.stringify(armenia.languages));
      }
    );
  });

  it("5- Test the property 'languages' by showing that the endpoint, which is the language's abbreviation, must be perfect match. We removed a letter, thus it will give us an error response of 404", () => {
    cy.request({
      method: "GET",
      url: "https://restcountries.com/v3.1/lang/hy",
      failOnStatusCode: false, // Do not fail the test on non-2xx status codes
    }).then((response) => {
      // Assertion 1: Response is 404
      expect(response.status).to.eq(404);

      // Assertion 2: The message is "Not Found"
      expect(response.body).to.deep.equal({
        status: 404,
        message: "Not Found",
      });
    });
  });

  it("6- Test the property 'languages' by showing that the endpoint, which is the language's abbreviation, can give more than one country", () => {
    cy.request("GET", "https://restcountries.com/v3.1/lang/rus").then(
      (response) => {
        // Assertion 1: Response is 200
        expect(response.status).to.equal(200);

        // Assertion 2: The array contains 7 objects (Seven countries)
        cy.wrap(response.body).should("have.length", 7);
        cy.log("There are 7 countries");

        /*
               Assertion 3:
               The countries are:
                   - Kazakhstan
                   - Uzbekistan
                   - Tajikistan
                   - Russia
                   - Turkmenistan
                   - Kyrgyzstan
                   - Belarus
           */
        response.body.forEach((country, index) => {
          // Access the different properties
          const commonName = country.name.common;
          const language = country.languages;

          cy.log(`Common Name ${index + 1}: ${commonName}`);
          cy.log(`language ${index + 1}:`);
          cy.log(JSON.stringify(language));
        });
      }
    );
  });

  it("7- Test the query parameter 'fields' and get 2 properties 'name' and 'cca2' ", () => {
    cy.request(
      "GET",
      "https://restcountries.com/v3.1/lang/Russian?fields=name,cca2"
    ).then((response) => {
      // Assertion 1: Response is 200
      expect(response.status).to.equal(200);

      // Assertion 2: The array contains 7 objects (Seven countries)
      cy.wrap(response.body).should("have.length", 7);
      cy.log("There are 7 countries");

      /*
        The countries are:
            - Kazakhstan
            - Uzbekistan
            - Tajikistan
            - Russia
            - Turkmenistan
            - Kyrgyzstan
            - Belarus
        */
      response.body.forEach((country, index) => {
        // Access the different properties
        const commonName = country.name.common;

        cy.log(`Common Name ${index + 1}: ${commonName}`);
      });

      //   Only 2 properties name and cca2 related to the 7 countries is present
      const expectedProperties = ["name", "cca2"];

      // This code is using the forEach method to iterate over each element in the response.body array. In this case, each element represents a country in the JSON response. The (country, index) parameters in the callback function represent the current country object and its index in the array
      response.body.forEach((country, index) => {
        // Check if each expected property exists for the current country
        // Within the outer loop, there's another loop using forEach, this time iterating over the expectedProperties array. This array contains the names of properties that are expected to exist for each country (in this case, "name" and "capital")
        expectedProperties.forEach((property) => {
          // This line uses the Chai assertion library, which is commonly used with Cypress. It checks whether the country object has the specified property (property). If the property exists, the test continues; otherwise, it fails
          expect(country).to.have.property(property);
          // This line logs a message using cy.log(). It indicates that the specific property (property) exists for the current country (Country ${index + 1})
          cy.log(`Country ${index + 1}: ${property} exists`);
        });
      });
    });
  });
});
