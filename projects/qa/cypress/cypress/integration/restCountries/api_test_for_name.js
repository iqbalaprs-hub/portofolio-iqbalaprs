/// <reference types="Cypress" />

describe("API test for endpoint GET /name/{name}", () => {
  it("1- Test the property 'common name' with basic normal endpoint", () => {
    cy.request("GET", "https://restcountries.com/v3.1/name/sweden").then(
      (response) => {
        // Assertion 1: Response is 200
        expect(response.status).to.equal(200);

        // Assertion 2: The array contains only one object (one country)
        cy.wrap(response.body).should("have.length", 1);

        // Assertion 3: This one country is Sweden (common name "Sweden" and official name "Kingdom of Sweden")
        const sweden = response.body[0];
        expect(sweden.name.common).to.equal("Sweden");
        expect(sweden.name.official).to.equal("Kingdom of Sweden");

        // Assertion 4: All the properties related to Sweden are present
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
        /*
      So, for each property in the expectedProperties array, the code checks if the sweden object has that property. If any of the properties are missing, the test would fail, indicating that the API response does not contain the expected properties for the country represented by sweden. This is a way to ensure that the response contains all the essential properties you anticipate
      */
        expectedProperties.forEach((property) => {
          expect(sweden).to.have.property(property);
        });
      }
    );
  });

  it("2- Test the property 'official name' and that the endpoint /name/{name} is case-insensitive", () => {
    cy.request(
      "GET",
      "https://restcountries.com/v3.1/name/RePubliC of AustrIa"
    ).then((response) => {
      // Assertion 1: Response is 200
      expect(response.status).to.equal(200);

      // Assertion 2: The array contains only one object (one country)
      cy.wrap(response.body).should("have.length", 1);

      // Assertion 3: This one country is Austria (common name "Austria" and official name "Republic of Austria")
      const austria = response.body[0];
      expect(austria.name.common).to.equal("Austria");
      expect(austria.name.official).to.equal("Republic of Austria");

      // Assertion 4: All the properties related to Austria are present
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
        expect(austria).to.have.property(property);
      });
    });
  });

  it("3- Test that the endpoint does not read the property 'nativeName' which is in the section 'name' ", () => {
    cy.request({
      method: "GET",
      url: "https://restcountries.com/v3.1/name/Republik%20Österreich",
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

  it("4- Test the property 'altspelling' and that the endpoint performs a substring match and can have a correct response even if it is written in a language other than the english language", () => {
    cy.request("GET", "https://restcountries.com/v3.1/name/Հայաստ").then(
      (response) => {
        // Assertion 1: Response is 200
        expect(response.status).to.equal(200);

        // Assertion 2: The array contains only one object (one country)
        cy.wrap(response.body).should("have.length", 1);

        // Assertion 3: This one country is Armenia (altspelling "Հայաստանի Հանրապետություն"). This endpoint is present only in nativeName and altspelling
        const armenia = response.body[0];
        expect(armenia.name.common).to.equal("Armenia");
        expect(armenia.name.official).to.equal("Republic of Armenia");
        expect(armenia.altSpellings).to.deep.equal([
          "AM",
          "Hayastan",
          "Republic of Armenia",
          "Հայաստանի Հանրապետություն",
        ]);

        // Assertion 4: All the properties related to Armenia are present
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
          expect(armenia).to.have.property(property);
        });
      }
    );
  });

  it("5- Test if the endpoint can give us more than one country", () => {
    cy.request("GET", "https://restcountries.com/v3.1/name/congo").then(
      (response) => {
        // Assertion 1: Response is 200
        expect(response.status).to.equal(200);

        // Assertion 2: The array contains 2 objects (two countries)
        cy.wrap(response.body).should("have.length", 2);

        // Assertion 3: The countries are "Republic of the Congo" and "Democratic Republic of the Congo"
        const republicCongo = response.body[0];
        expect(republicCongo.name.common).to.equal("Republic of the Congo");
        expect(republicCongo.name.official).to.equal("Republic of the Congo");

        const DRCongo = response.body[1];
        expect(DRCongo.name.common).to.equal("DR Congo");
        expect(DRCongo.name.official).to.equal(
          "Democratic Republic of the Congo"
        );

        // Assertion 4: All the properties related to  "Republic of the Congo" and "Democratic Republic of the Congo" are present
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
          expect(republicCongo).to.have.property(property);
        });

        expectedProperties.forEach((property) => {
          expect(DRCongo).to.have.property(property);
        });
      }
    );
  });

  it("6- Test the property 'common name' using a query parameter 'fullText=true' with a basic normal endpoint", () => {
    cy.request(
      "GET",
      "https://restcountries.com/v3.1/name/Sweden?fullText=true"
    ).then((response) => {
      // Assertion 1: Response is 200
      expect(response.status).to.equal(200);

      // Assertion 2: The array contains only one object (one country)
      cy.wrap(response.body).should("have.length", 1);

      // Assertion 3: This one country is Sweden (common name "Sweden" and official name "Kingdom of Sweden")
      const sweden = response.body[0];
      expect(sweden.name.common).to.equal("Sweden");
      expect(sweden.name.official).to.equal("Kingdom of Sweden");

      // Assertion 4: All the properties related to Sweden are present
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
        expect(sweden).to.have.property(property);
      });
    });
  });

  it("7- Test that the endpoint with an incomplete name, using query parameter 'fullText=true' will give an error response. Thus the endpoint should performs a perfect match in order to have a correct response", () => {
    cy.request({
      method: "GET",
      url: "https://restcountries.com/v3.1/name/Swede?fullText=true",
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

  it("8- Test that the endpoint performs a case-insensitive perfect match", () => {
    cy.request(
      "GET",
      "https://restcountries.com/v3.1/name/auStriA?fullText=true"
    ).then((response) => {
      // Assertion 1: Response is 200
      expect(response.status).to.equal(200);

      // Assertion 2: The array contains only one object (one country)
      cy.wrap(response.body).should("have.length", 1);

      // Assertion 3: This one country is Austria (common name "Austria" and official name "Republic of Austria")
      const austria = response.body[0];
      expect(austria.name.common).to.equal("Austria");
      expect(austria.name.official).to.equal("Republic of Austria");

      // Assertion 4: All the properties related to Austria are present
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
        expect(austria).to.have.property(property);
      });
    });
  });

  it("9- Test the property 'official name' using a query parameter 'fullText=true'", () => {
    cy.request(
      "GET",
      "https://restcountries.com/v3.1/name/Republic of Austria?fullText=true"
    ).then((response) => {
      // Assertion 1: Response is 200
      expect(response.status).to.equal(200);

      // Assertion 2: The array contains only one object (one country)
      cy.wrap(response.body).should("have.length", 1);

      // Assertion 3: This one country is Austria (common name "Austria" and official name "Republic of Austria")
      const austria = response.body[0];
      expect(austria.name.common).to.equal("Austria");
      expect(austria.name.official).to.equal("Republic of Austria");

      // Assertion 4: All the properties related to Austria are present
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
        expect(austria).to.have.property(property);
      });
    });
  });

  it("10- Test that the endpoint using the query parameter 'fullText=true' will not read the property 'altspellings' which will give an error response", () => {
    cy.request({
      method: "GET",
      url: "https://restcountries.com/v3.1/name/Oesterreich?fullText=true",
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

  it("11- Test the query parameter 'fields' and get only 3 properties 'region' and 'subregion'", () => {
    cy.request(
      "GET",
      "https://restcountries.com/v3.1/name/sweden?fields=region,subregion"
    ).then((response) => {
      // Assertion 1: Response is 200
      expect(response.status).to.equal(200);

      // Assertion 2: The array contains only one object (one country)
      cy.wrap(response.body).should("have.length", 1);

      // Assertion 3: This one country is Sweden  ("region": "Europe",  "subregion": "Northern Europe")
      const sweden = response.body[0];
      expect(sweden.region).to.equal("Europe");
      expect(sweden.subregion).to.equal("Northern Europe");

      // Assertion 4: Only properties (region and subregion) related to Sweden are present
      const expectedProperties = ["region", "subregion"];

      expectedProperties.forEach((property) => {
        expect(sweden).to.have.property(property);
      });
    });
  });
});
