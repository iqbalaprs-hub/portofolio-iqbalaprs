/// <reference types="Cypress" />

describe("API test for endpoint GET /demonym/{demonym}", () => {
  it("1- Test the property 'demonyms' with basic normal endpoint", () => {
    cy.request("GET", "https://restcountries.com/v3.1/demonym/Peruvian").then(
      (response) => {
        // Assertion 1: Response is 200
        expect(response.status).to.equal(200);

        // Assertion 2: The array contains only one object (one country)
        cy.wrap(response.body).should("have.length", 1);

        /*
        Assertion 3:
        This one country is Peru ("demonyms": {
            "eng": {
                "f": "Peruvian",
                "m": "Peruvian"
            },
            "fra": {
                "f": "Péruvienne",
                "m": "Péruvien"
            })
        */
        const peru = response.body[0];
        expect(peru.demonyms.eng).to.include({
          f: "Peruvian",
          m: "Peruvian",
        });
        cy.log(JSON.stringify(peru.demonyms.eng));

        // Assertion 4: All the properties related to Peru are present
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
          expect(peru).to.have.property(property);
        });
      }
    );
  });

  it("2- Test the property 'demonyms' by showing that the endpoint can perform a case-insensitive substring match", () => {
    cy.request("GET", "https://restcountries.com/v3.1/demonym/perUvIa").then(
      (response) => {
        // Assertion 1: Response is 200
        expect(response.status).to.equal(200);

        // Assertion 2: The array contains only one object (one country)
        cy.wrap(response.body).should("have.length", 1);

        /*
        Assertion 3:
        This one country is Peru ("demonyms": {
            "eng": {
                "f": "Peruvian",
                "m": "Peruvian"
            },
            "fra": {
                "f": "Péruvienne",
                "m": "Péruvien"
            })
        */
        const peru = response.body[0];
        expect(peru.demonyms.eng).to.include({
          f: "Peruvian",
          m: "Peruvian",
        });
        cy.log(JSON.stringify(peru.demonyms.eng));
      }
    );
  });

  it("3- Test the property 'demonyms' by showing that the endpoint can read a language other than the english language", () => {
    cy.request("GET", "https://restcountries.com/v3.1/demonym/éruvienne").then(
      (response) => {
        // Assertion 1: Response is 200
        expect(response.status).to.equal(200);

        // Assertion 2: The array contains only one object (one country)
        cy.wrap(response.body).should("have.length", 1);

        /*
        Assertion 3:
        This one country is Peru ("demonyms": {
            "eng": {
                "f": "Peruvian",
                "m": "Peruvian"
            },
            "fra": {
                "f": "Péruvienne",
                "m": "Péruvien"
            })
        */
        const peru = response.body[0];
        expect(peru.demonyms.fra).to.include({
          f: "Péruvienne",
          m: "Péruvien",
        });
        cy.log(JSON.stringify(peru.demonyms.fra));
      }
    );
  });

  it("4- Test the property 'demonyms' by showing that the endpoint can give us more than one country", () => {
    cy.request("GET", "https://restcountries.com/v3.1/demonym/congo").then(
      (response) => {
        // Assertion 1: Response is 200
        expect(response.status).to.equal(200);

        // Assertion 2: The array contains only one object (one country)
        cy.wrap(response.body).should("have.length", 2);

        /*
    The countries are:
        - Republic of the Congo ("demonyms": {
            "eng": {
                "f": "Congolese",
                "m": "Congolese"
            },
            "fra": {
                "f": "Congolaise",
                "m": "Congolais"
            })
        - DR Congo ("demonyms": {
            "eng": {
                "f": "Congolese",
                "m": "Congolese"
            },
            "fra": {
                "f": "Congolaise",
                "m": "Congolais"
            })
    */
        const republicCongo = response.body[0];
        expect(republicCongo.demonyms.eng).to.include({
          f: "Congolese",
          m: "Congolese",
        });
        cy.log(JSON.stringify(republicCongo.demonyms.eng));

        const DRCongo = response.body[1];
        expect(DRCongo.demonyms.eng).to.include({
          f: "Congolese",
          m: "Congolese",
        });
        cy.log(JSON.stringify(DRCongo.demonyms.eng));
      }
    );
  });

  it("5- Test the query parameter 'fields' and get only 2 properties 'cca2' and 'cioc'", () => {
    cy.request(
      "GET",
      "https://restcountries.com/v3.1/demonym/Peruvian?fields=cca2,cioc"
    ).then((response) => {
      // Assertion 1: Response is 200
      expect(response.status).to.equal(200);

      // Assertion 2: The array contains only one object (one country)
      cy.wrap(response.body).should("have.length", 1);

      // Assertion 3: This one country is Peru ("cca2": "PE",  "cioc": "PER")
      const peru = response.body[0];
      expect(peru.cca2).to.equal("PE");
      expect(peru.cioc).to.equal("PER");
      cy.log(JSON.stringify(peru.cca2));
      cy.log(JSON.stringify(peru.cioc));

      // Assertion 4: Only properties (cca2, cioc) related to Peru are present
      const expectedProperties = ["cca2", "cioc"];

      expectedProperties.forEach((property) => {
        expect(peru).to.have.property(property);
      });
    });
  });
});
