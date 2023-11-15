/// <reference types="Cypress" />

describe("API test for endpoint GET /alpha/{code}", () => {
  it("1- Test the property 'cca2' with basic normal endpoint", () => {
    cy.request("GET", "https://restcountries.com/v3.1/alpha/US").then(
      (response) => {
        // Assertion 1: Response is 200
        expect(response.status).to.equal(200);

        // Assertion 2: The array contains only one object (one country)
        cy.wrap(response.body).should("have.length", 1);

        // Assertion 3: This one country is United States ("cca2": "US", "ccn3": "840", "cca3": "USA", "cioc": "USA")
        const usa = response.body[0];
        expect(usa.name.common).to.equal("United States");
        expect(usa.name.official).to.equal("United States of America");
        expect(usa.cca2).to.equal("US");
        expect(usa.ccn3).to.equal("840");
        expect(usa.cca3).to.equal("USA");
        expect(usa.cioc).to.equal("USA");

        // Assertion 4: All the properties related to United States are present
        const expectedProperties = [
          "name",
          "tld",
          "cca2",
          "ccn3",
          "cca3",
          "cioc",
          "independent",
          "status",
          "unMember",
          "currencies",
          "idd",
          "capital",
          "altSpellings",
          "region",
          "subregion",
          "languages",
          "translations",
          "latlng",
          "landlocked",
          "borders",
          "area",
          "demonyms",
          "flag",
          "maps",
          "population",
          "gini",
          "fifa",
          "car",
          "timezones",
          "continents",
          "flags",
          "coatOfArms",
          "startOfWeek",
          "capitalInfo",
          "postalCode",
        ];

        expectedProperties.forEach((property) => {
          expect(usa).to.have.property(property);
        });
      }
    );
    cy.wait(1000);
  });

  it("2- Test the property 'ccn3' with basic normal endpoint", () => {
    cy.request("GET", "https://restcountries.com/v3.1/alpha/076").then(
      (response) => {
        // Assertion 1: Response is 200
        expect(response.status).to.equal(200);

        // Assertion 2: The array contains only one object (one country)
        cy.wrap(response.body).should("have.length", 1);

        // Assertion 3: This one country is Brazil ("cca2": "BR",  "ccn3": "076", "cca3": "BRA",  "cioc": "BRA")
        const brazil = response.body[0];
        expect(brazil.name.common).to.equal("Brazil");
        expect(brazil.name.official).to.equal("Federative Republic of Brazil");
        expect(brazil.cca2).to.equal("BR");
        expect(brazil.ccn3).to.equal("076");
        expect(brazil.cca3).to.equal("BRA");
        expect(brazil.cioc).to.equal("BRA");

        // Assertion 4: All the properties related to Brazil are present
        const expectedProperties = [
          "name",
          "tld",
          "cca2",
          "ccn3",
          "cca3",
          "cioc",
          "independent",
          "status",
          "unMember",
          "currencies",
          "idd",
          "capital",
          "altSpellings",
          "region",
          "subregion",
          "languages",
          "translations",
          "latlng",
          "landlocked",
          "borders",
          "area",
          "demonyms",
          "flag",
          "maps",
          "population",
          "gini",
          "fifa",
          "car",
          "timezones",
          "continents",
          "flags",
          "coatOfArms",
          "startOfWeek",
          "capitalInfo",
          "postalCode",
        ];

        expectedProperties.forEach((property) => {
          expect(brazil).to.have.property(property);
        });
      }
    );
    cy.wait(1000);
  });

  it("3- Test the property 'cca3' with basic normal endpoint", () => {
    cy.request("GET", "https://restcountries.com/v3.1/alpha/CHL").then(
      (response) => {
        // Assertion 1: Response is 200
        expect(response.status).to.equal(200);

        // Assertion 2: The array contains only one object (one country)
        cy.wrap(response.body).should("have.length", 1);

        // Assertion 3: This one country is Chile ("cca2": "CL",  "ccn3": "152", "cca3": "CHL", "cioc": "CHI")
        const chile = response.body[0];
        expect(chile.name.common).to.equal("Chile");
        expect(chile.name.official).to.equal("Republic of Chile");
        expect(chile.cca2).to.equal("CL");
        expect(chile.ccn3).to.equal("152");
        expect(chile.cca3).to.equal("CHL");
        expect(chile.cioc).to.equal("CHI");

        // Assertion 4: All the properties related to Chile are present
        const expectedProperties = [
          "name",
          "tld",
          "cca2",
          "ccn3",
          "cca3",
          "cioc",
          "independent",
          "status",
          "unMember",
          "currencies",
          "idd",
          "capital",
          "altSpellings",
          "region",
          "subregion",
          "languages",
          "translations",
          "latlng",
          "landlocked",
          "borders",
          "area",
          "demonyms",
          "flag",
          "maps",
          "population",
          "gini",
          "fifa",
          "car",
          "timezones",
          "continents",
          "flags",
          "coatOfArms",
          "startOfWeek",
          "capitalInfo",
          "postalCode",
        ];

        expectedProperties.forEach((property) => {
          expect(chile).to.have.property(property);
        });
      }
    );
    cy.wait(1000);
  });

  it("4- Test the property 'cioc' with basic normal endpoint", () => {
    cy.request("GET", "https://restcountries.com/v3.1/alpha/UAE").then(
      (response) => {
        // Assertion 1: Response is 200
        expect(response.status).to.equal(200);

        // Assertion 2: The array contains only one object (one country)
        cy.wrap(response.body).should("have.length", 1);

        // Assertion 3: This one country is United Arab Emirates ("cca2": "AE", "ccn3": "784", "cca3": "ARE",  "cioc": "UAE")
        const uae = response.body[0];
        expect(uae.name.common).to.equal("United Arab Emirates");
        expect(uae.name.official).to.equal("United Arab Emirates");
        expect(uae.cca2).to.equal("AE");
        expect(uae.ccn3).to.equal("784");
        expect(uae.cca3).to.equal("ARE");
        expect(uae.cioc).to.equal("UAE");

        // Assertion 4: All the properties related to United Arab Emirates are present
        const expectedProperties = [
          "name",
          "tld",
          "cca2",
          "ccn3",
          "cca3",
          "cioc",
          "independent",
          "status",
          "unMember",
          "currencies",
          "idd",
          "capital",
          "altSpellings",
          "region",
          "subregion",
          "languages",
          "translations",
          "latlng",
          "landlocked",
          "borders",
          "area",
          "demonyms",
          "flag",
          "maps",
          "population",
          "gini",
          "fifa",
          "car",
          "timezones",
          "continents",
          "flags",
          "coatOfArms",
          "startOfWeek",
          "capitalInfo",
        ];

        expectedProperties.forEach((property) => {
          expect(uae).to.have.property(property);
        });
      }
    );
    cy.wait(1000);
  });

  it("5- Test the properties 'cca2', 'ccn3', 'cca3' and 'cioc' with basic normal endpoint and show that endpoint is case-insensitive", () => {
    cy.request("GET", "https://restcountries.com/v3.1/alpha/eS").then(
      (response) => {
        // Assertion 1: Response is 200
        expect(response.status).to.equal(200);

        // Assertion 2: The array contains only one object (one country)
        cy.wrap(response.body).should("have.length", 1);

        // Assertion 3: This one country is Spain ("cca2": "ES", "ccn3": "724",  "cca3": "ESP",  "cioc": "ESP")
        const spain = response.body[0];
        expect(spain.name.common).to.equal("Spain");
        expect(spain.name.official).to.equal("Kingdom of Spain");
        expect(spain.cca2).to.equal("ES");
        expect(spain.ccn3).to.equal("724");
        expect(spain.cca3).to.equal("ESP");
        expect(spain.cioc).to.equal("ESP");

        // Assertion 4: All the properties related to Spain are present
        const expectedProperties = [
          "name",
          "tld",
          "cca2",
          "ccn3",
          "cca3",
          "cioc",
          "independent",
          "status",
          "unMember",
          "currencies",
          "idd",
          "capital",
          "altSpellings",
          "region",
          "subregion",
          "languages",
          "translations",
          "latlng",
          "landlocked",
          "borders",
          "area",
          "demonyms",
          "flag",
          "maps",
          "population",
          "gini",
          "fifa",
          "car",
          "timezones",
          "continents",
          "flags",
          "coatOfArms",
          "startOfWeek",
          "capitalInfo",
          "postalCode",
        ];

        expectedProperties.forEach((property) => {
          expect(spain).to.have.property(property);
        });
      }
    );
    cy.wait(1000);
  });

  it("6- Test the properties 'cca2', 'ccn3', 'cca3' and 'cioc' by showing that the endpoint must be perfect match. An error message is expected", () => {
    cy.request({
      method: "GET",
      url: "https://restcountries.com/v3.1/alpha/72",
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

  it("7- Test the properties 'cca2', 'ccn3', 'cca3' and 'cioc' by showing that the endpoint with 1 letter gives a response error of 400", () => {
    cy.request({
      method: "GET",
      url: "https://restcountries.com/v3.1/alpha/e",
      failOnStatusCode: false, // Do not fail the test on non-2xx status codes
    }).then((response) => {
      // Assertion 1: Response is 400
      expect(response.status).to.eq(400);

      // Assertion 2: The message is "Bad Request"
      expect(response.body).to.deep.equal({
        status: 400,
        message: "Bad Request",
      });
    });
    cy.wait(1000);
  });

  it("8- Test the properties 'cca2', 'ccn3', 'cca3' and 'cioc' by showing that the endpoint with more than 3 letters gives a response error of 400", () => {
    cy.request({
      method: "GET",
      url: "https://restcountries.com/v3.1/alpha/e",
      failOnStatusCode: false, // Do not fail the test on non-2xx status codes
    }).then((response) => {
      // Assertion 1: Response is 400
      expect(response.status).to.eq(400);

      // Assertion 2: The message is "Bad Request"
      expect(response.body).to.deep.equal({
        status: 400,
        message: "Bad Request",
      });
    });
    cy.wait(1000);
  });

  it("9- Test the query parameter '/alpha?codes={code},{code},{code}' using a basic normal endpoint and show also that it is case-insensitive", () => {
    cy.request(
      "GET",
      "https://restcountries.com/v3.1/alpha?codes=170,No,eSt,pE"
    ).then((response) => {
      // Assertion 1: Response is 200
      expect(response.status).to.equal(200);

      // Assertion 2: The array contains only 4 objects (four countries)
      cy.wrap(response.body).should("have.length", 4);

      /*
        Assertion 3:
        The countries are:
            - Peru has the country code cca2: "PE"
            - Colombia has the country code ccn3: "170"
            - Estonia has the country code cca3 and cioc: "EST"
            - Spain has the country code  cca3 and cioc: "ESP"
        */

      const colombia = response.body[0];
      expect(colombia.name.common).to.equal("Colombia");
      expect(colombia.name.official).to.equal("Republic of Colombia");
      expect(colombia.ccn3).to.equal("170");

      const norway = response.body[1];
      expect(norway.name.common).to.equal("Norway");
      expect(norway.name.official).to.equal("Kingdom of Norway");
      expect(norway.cioc).to.equal("NOR");

      const peru = response.body[2];
      expect(peru.name.common).to.equal("Peru");
      expect(peru.name.official).to.equal("Republic of Peru");
      expect(peru.cca2).to.equal("PE");

      const estonia = response.body[3];
      expect(estonia.name.common).to.equal("Estonia");
      expect(estonia.name.official).to.equal("Republic of Estonia");
      expect(estonia.cca3).to.equal("EST");

      //   Assertion 4: All the properties related to Peru, Colombia, Estonia and Spain are present
      const expectedProperties = [
        "name",
        "tld",
        "cca2",
        "ccn3",
        "cca3",
        "cioc",
        "independent",
        "status",
        "unMember",
        "currencies",
        "idd",
        "capital",
        "altSpellings",
        "region",
        "subregion",
        "languages",
        "translations",
        "latlng",
        "landlocked",
        "borders",
        "area",
        "demonyms",
        "flag",
        "maps",
        "population",
        "gini",
        "fifa",
        "car",
        "timezones",
        "continents",
        "flags",
        "coatOfArms",
        "startOfWeek",
        "capitalInfo",
        "postalCode",
      ];

      const expectedProperties2 = [
        "name",
        "tld",
        "cca2",
        "ccn3",
        "cca3",
        "cioc",
        "independent",
        "status",
        "unMember",
        "currencies",
        "idd",
        "capital",
        "altSpellings",
        "region",
        "subregion",
        "languages",
        "translations",
        "latlng",
        "landlocked",
        "borders",
        "area",
        "demonyms",
        "flag",
        "maps",
        "population",
        "gini",
        "fifa",
        "car",
        "timezones",
        "continents",
        "flags",
        "coatOfArms",
        "startOfWeek",
        "capitalInfo",
      ];

      expectedProperties.forEach((property) => {
        expect(peru).to.have.property(property);
      });

      expectedProperties2.forEach((property) => {
        expect(colombia).to.have.property(property);
      });

      expectedProperties.forEach((property) => {
        expect(estonia).to.have.property(property);
      });

      expectedProperties.forEach((property) => {
        expect(norway).to.have.property(property);
      });
    });
    cy.wait(1000);
  });

  it("10- Test the query parameter '/alpha?codes={code},{code},{code}' by showing that  At least one code must be correct in order to have a correct response of 200", () => {
    cy.request(
      "GET",
      "https://restcountries.com/v3.1/alpha?codes=170,sp,e,p"
    ).then((response) => {
      // Assertion 1: Response is 200
      expect(response.status).to.equal(200);

      // Assertion 2: The array contains only one object (one country)
      cy.wrap(response.body).should("have.length", 1);

      // Assertion 3: This one country is Colombia ("cca2": "CO", "ccn3": "170", "cca3": "COL", "cioc": "COL")
      const colombia = response.body[0];
      expect(colombia.name.common).to.equal("Colombia");
      expect(colombia.name.official).to.equal("Republic of Colombia");
      expect(colombia.cca2).to.equal("CO");
      expect(colombia.ccn3).to.equal("170");
      expect(colombia.cca3).to.equal("COL");
      expect(colombia.cioc).to.equal("COL");

      // Assertion 4: All the properties related to Colombia are present
      const expectedProperties = [
        "name",
        "tld",
        "cca2",
        "ccn3",
        "cca3",
        "cioc",
        "independent",
        "status",
        "unMember",
        "currencies",
        "idd",
        "capital",
        "altSpellings",
        "region",
        "subregion",
        "languages",
        "translations",
        "latlng",
        "landlocked",
        "borders",
        "area",
        "demonyms",
        "flag",
        "maps",
        "population",
        "gini",
        "fifa",
        "car",
        "timezones",
        "continents",
        "flags",
        "coatOfArms",
        "startOfWeek",
        "capitalInfo",
      ];

      expectedProperties.forEach((property) => {
        expect(colombia).to.have.property(property);
      });
    });
    cy.wait(1000);
  });

  it("11- Test the query parameter '/alpha?codes={code},{code},{code}' by showing that repetition of codes does not affect the search", () => {
    cy.request(
      "GET",
      "https://restcountries.com/v3.1/alpha?codes=170,No,170,no"
    ).then((response) => {
      // Assertion 1: Response is 200
      expect(response.status).to.equal(200);

      // Assertion 2: The array contains 2 objects (Two countries)
      cy.wrap(response.body).should("have.length", 2);

      /*
        Assertion 3:
        This countries are:
         - Colombia ("cca2": "CO", "ccn3": "170", "cca3": "COL", "cioc": "COL")
         -  Norway ("cca2": "NO", "ccn3": "578", "cca3": "NOR", "cioc": "NOR")
        */
      const colombia = response.body[0];
      expect(colombia.name.common).to.equal("Colombia");
      expect(colombia.name.official).to.equal("Republic of Colombia");
      expect(colombia.cca2).to.equal("CO");
      expect(colombia.ccn3).to.equal("170");
      expect(colombia.cca3).to.equal("COL");
      expect(colombia.cioc).to.equal("COL");

      const norway = response.body[1];
      expect(norway.name.common).to.equal("Norway");
      expect(norway.name.official).to.equal("Kingdom of Norway");
      expect(norway.cca2).to.equal("NO");
      expect(norway.ccn3).to.equal("578");
      expect(norway.cca3).to.equal("NOR");
      expect(norway.cioc).to.equal("NOR");

      //  Assertion 4: All the properties related to Colombia and Norway are present
      const expectedProperties = [
        "name",
        "tld",
        "cca2",
        "ccn3",
        "cca3",
        "cioc",
        "independent",
        "status",
        "unMember",
        "currencies",
        "idd",
        "capital",
        "altSpellings",
        "region",
        "subregion",
        "languages",
        "translations",
        "latlng",
        "landlocked",
        "borders",
        "area",
        "demonyms",
        "flag",
        "maps",
        "population",
        "gini",
        "fifa",
        "car",
        "timezones",
        "continents",
        "flags",
        "coatOfArms",
        "startOfWeek",
        "capitalInfo",
        "postalCode",
      ];

      const expectedProperties2 = [
        "name",
        "tld",
        "cca2",
        "ccn3",
        "cca3",
        "cioc",
        "independent",
        "status",
        "unMember",
        "currencies",
        "idd",
        "capital",
        "altSpellings",
        "region",
        "subregion",
        "languages",
        "translations",
        "latlng",
        "landlocked",
        "borders",
        "area",
        "demonyms",
        "flag",
        "maps",
        "population",
        "gini",
        "fifa",
        "car",
        "timezones",
        "continents",
        "flags",
        "coatOfArms",
        "startOfWeek",
        "capitalInfo",
      ];

      expectedProperties2.forEach((property) => {
        expect(colombia).to.have.property(property);
      });

      expectedProperties.forEach((property) => {
        expect(norway).to.have.property(property);
      });
    });
    cy.wait(1000);
  });

  it("12- Test the query parameter '/alpha?codes={code},{code},{code}' by showing if all codes are wrong, it will give an error response of 404", () => {
    cy.request({
      method: "GET",
      url: "https://restcountries.com/v3.1/alpha?codes=17,o,eSar,p",
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
});
