/// <reference types="Cypress" />

describe("API test for endpoint GET /lang/{language}", () => {
  it("1- Test the property 'languages' with endpoint, which is the language's name, as a basic normal endpoint", () => {
    cy.request("GET", "https://restcountries.com/v3.1/lang/Russian").then(
      (response) => {
        // Assertion 1: Response is 200
        expect(response.status).to.equal(200);

        // Assertion 2: The array contains 7 objects (Seven countries)
        cy.wrap(response.body).should("have.length", 7);

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
        const kyrgyzstan = response.body[0];
        expect(kyrgyzstan.name.common).to.equal("Kyrgyzstan");

        const russia = response.body[1];
        expect(russia.name.common).to.equal("Russia");

        const uzbekistan = response.body[2];
        expect(uzbekistan.name.common).to.equal("Uzbekistan");

        const kazakhstan = response.body[3];
        expect(kazakhstan.name.common).to.equal("Kazakhstan");

        const turkmenistan = response.body[4];
        expect(turkmenistan.name.common).to.equal("Turkmenistan");

        const belarus = response.body[5];
        expect(belarus.name.common).to.equal("Belarus");

        const tajikistan = response.body[6];
        expect(tajikistan.name.common).to.equal("Tajikistan");

        cy.log(JSON.stringify(kyrgyzstan.name.common));
        cy.log(JSON.stringify(kyrgyzstan.languages));
        cy.log(JSON.stringify(russia.name.common));
        cy.log(JSON.stringify(russia.languages));
        cy.log(JSON.stringify(uzbekistan.name.common));
        cy.log(JSON.stringify(uzbekistan.languages));
        cy.log(JSON.stringify(kazakhstan.name.common));
        cy.log(JSON.stringify(kazakhstan.languages));
        cy.log(JSON.stringify(turkmenistan.name.common));
        cy.log(JSON.stringify(turkmenistan.languages));
        cy.log(JSON.stringify(belarus.name.common));
        cy.log(JSON.stringify(belarus.languages));
        cy.log(JSON.stringify(tajikistan.name.common));
        cy.log(JSON.stringify(tajikistan.languages));
      }
    );
  });

  it("2- Test the property 'languages' by showing that the endpoint, which is the language's name, is case-insensitive and it gives more than one country", () => {
    cy.request("GET", "https://restcountries.com/v3.1/lang/rUssIan").then(
      (response) => {
        // Assertion 1: Response is 200
        expect(response.status).to.equal(200);

        // Assertion 2: The array contains 7 objects (Seven countries)
        cy.wrap(response.body).should("have.length", 7);

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
        const kyrgyzstan = response.body[0];
        expect(kyrgyzstan.name.common).to.equal("Kyrgyzstan");

        const russia = response.body[1];
        expect(russia.name.common).to.equal("Russia");

        const uzbekistan = response.body[2];
        expect(uzbekistan.name.common).to.equal("Uzbekistan");

        const kazakhstan = response.body[3];
        expect(kazakhstan.name.common).to.equal("Kazakhstan");

        const turkmenistan = response.body[4];
        expect(turkmenistan.name.common).to.equal("Turkmenistan");

        const belarus = response.body[5];
        expect(belarus.name.common).to.equal("Belarus");

        const tajikistan = response.body[6];
        expect(tajikistan.name.common).to.equal("Tajikistan");

        cy.log(JSON.stringify(kyrgyzstan.name.common));
        cy.log(JSON.stringify(kyrgyzstan.languages));
        cy.log(JSON.stringify(russia.name.common));
        cy.log(JSON.stringify(russia.languages));
        cy.log(JSON.stringify(uzbekistan.name.common));
        cy.log(JSON.stringify(uzbekistan.languages));
        cy.log(JSON.stringify(kazakhstan.name.common));
        cy.log(JSON.stringify(kazakhstan.languages));
        cy.log(JSON.stringify(turkmenistan.name.common));
        cy.log(JSON.stringify(turkmenistan.languages));
        cy.log(JSON.stringify(belarus.name.common));
        cy.log(JSON.stringify(belarus.languages));
        cy.log(JSON.stringify(tajikistan.name.common));
        cy.log(JSON.stringify(tajikistan.languages));
      }
    );
  });

  it("3- Test the property 'languages' by showing that the endpoint, which is the language's name, must have to be perfect match. We removed one letter and it wil give a error response of 404", () => {
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

  it("4- Test the property 'languages' by showing that the endpoint, which is the language's abbreviation, is case-insensitive", () => {
    cy.request("GET", "https://restcountries.com/v3.1/lang/hyE").then(
      (response) => {
        // Assertion 1: Response is 200
        expect(response.status).to.equal(200);

        // Assertion 2: The array contains only one object (one country)
        cy.wrap(response.body).should("have.length", 1);

        /*
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
    cy.wait(1000);
  });

  it("6- Test the property 'languages' by showing that the endpoint, which is the language's abbreviation, can give more than one country", () => {
    cy.request("GET", "https://restcountries.com/v3.1/lang/rus").then(
      (response) => {
        // Assertion 1: Response is 200
        expect(response.status).to.equal(200);

        // Assertion 2: The array contains 7 objects (Seven countries)
        cy.wrap(response.body).should("have.length", 7);

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
        const kyrgyzstan = response.body[0];
        expect(kyrgyzstan.name.common).to.equal("Kyrgyzstan");

        const russia = response.body[1];
        expect(russia.name.common).to.equal("Russia");

        const uzbekistan = response.body[2];
        expect(uzbekistan.name.common).to.equal("Uzbekistan");

        const kazakhstan = response.body[3];
        expect(kazakhstan.name.common).to.equal("Kazakhstan");

        const turkmenistan = response.body[4];
        expect(turkmenistan.name.common).to.equal("Turkmenistan");

        const belarus = response.body[5];
        expect(belarus.name.common).to.equal("Belarus");

        const tajikistan = response.body[6];
        expect(tajikistan.name.common).to.equal("Tajikistan");

        cy.log(JSON.stringify(kyrgyzstan.name.common));
        cy.log(JSON.stringify(kyrgyzstan.languages));
        cy.log(JSON.stringify(russia.name.common));
        cy.log(JSON.stringify(russia.languages));
        cy.log(JSON.stringify(uzbekistan.name.common));
        cy.log(JSON.stringify(uzbekistan.languages));
        cy.log(JSON.stringify(kazakhstan.name.common));
        cy.log(JSON.stringify(kazakhstan.languages));
        cy.log(JSON.stringify(turkmenistan.name.common));
        cy.log(JSON.stringify(turkmenistan.languages));
        cy.log(JSON.stringify(belarus.name.common));
        cy.log(JSON.stringify(belarus.languages));
        cy.log(JSON.stringify(tajikistan.name.common));
        cy.log(JSON.stringify(tajikistan.languages));
      }
    );
  });

  it("7- Test the query parameter 'fields' and get 1 property 'translations'", () => {
    cy.request(
      "GET",
      "https://restcountries.com/v3.1/lang/Russian?fields=name,cca2"
    ).then((response) => {
      // Assertion 1: Response is 200
      expect(response.status).to.equal(200);

      // Assertion 2: The array contains 7 objects (Seven countries)
      cy.wrap(response.body).should("have.length", 7);

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
      const kyrgyzstan = response.body[0];
      expect(kyrgyzstan.name.common).to.equal("Kyrgyzstan");
      expect(kyrgyzstan.name.official).to.equal("Kyrgyz Republic");
      expect(kyrgyzstan.cca2).to.equal("KG");

      const russia = response.body[1];
      expect(russia.name.common).to.equal("Russia");
      expect(russia.name.official).to.equal("Russian Federation");
      expect(russia.cca2).to.equal("RU");

      const uzbekistan = response.body[2];
      expect(uzbekistan.name.common).to.equal("Uzbekistan");
      expect(uzbekistan.name.official).to.equal("Republic of Uzbekistan");
      expect(uzbekistan.cca2).to.equal("UZ");

      const kazakhstan = response.body[3];
      expect(kazakhstan.name.common).to.equal("Kazakhstan");
      expect(kazakhstan.name.official).to.equal("Republic of Kazakhstan");
      expect(kazakhstan.cca2).to.equal("KZ");

      const turkmenistan = response.body[4];
      expect(turkmenistan.name.common).to.equal("Turkmenistan");
      expect(turkmenistan.name.official).to.equal("Turkmenistan");
      expect(turkmenistan.cca2).to.equal("TM");

      const belarus = response.body[5];
      expect(belarus.name.common).to.equal("Belarus");
      expect(belarus.name.official).to.equal("Republic of Belarus");
      expect(belarus.cca2).to.equal("BY");

      const tajikistan = response.body[6];
      expect(tajikistan.name.common).to.equal("Tajikistan");
      expect(tajikistan.name.official).to.equal("Republic of Tajikistan");
      expect(tajikistan.cca2).to.equal("TJ");

      cy.log(JSON.stringify(kyrgyzstan.name.common));
      cy.log(JSON.stringify(kyrgyzstan.cca2));
      cy.log(JSON.stringify(russia.name.common));
      cy.log(JSON.stringify(russia.cca2));
      cy.log(JSON.stringify(uzbekistan.name.common));
      cy.log(JSON.stringify(uzbekistan.cca2));
      cy.log(JSON.stringify(kazakhstan.name.common));
      cy.log(JSON.stringify(kazakhstan.cca2));
      cy.log(JSON.stringify(turkmenistan.name.common));
      cy.log(JSON.stringify(turkmenistan.cca2));
      cy.log(JSON.stringify(belarus.name.common));
      cy.log(JSON.stringify(belarus.cca2));
      cy.log(JSON.stringify(tajikistan.name.common));
      cy.log(JSON.stringify(tajikistan.cca2));

      //   Only 2 properties name and cca2 related to the 7 countries is present
      const expectedProperties = ["name", "cca2"];

      expectedProperties.forEach((property) => {
        expect(kyrgyzstan).to.have.property(property);
      });

      expectedProperties.forEach((property) => {
        expect(russia).to.have.property(property);
      });

      expectedProperties.forEach((property) => {
        expect(uzbekistan).to.have.property(property);
      });

      expectedProperties.forEach((property) => {
        expect(kazakhstan).to.have.property(property);
      });

      expectedProperties.forEach((property) => {
        expect(turkmenistan).to.have.property(property);
      });

      expectedProperties.forEach((property) => {
        expect(belarus).to.have.property(property);
      });

      expectedProperties.forEach((property) => {
        expect(tajikistan).to.have.property(property);
      });
    });
  });
});
