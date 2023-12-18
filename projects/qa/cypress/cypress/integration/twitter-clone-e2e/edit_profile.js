/// <reference types="Cypress" />

describe("Feature: Edit profile", () => {
  beforeEach(() => {
    // Prereq.: The database is empty. There are no users in the database
    cy.exec(".\\cypress\\scripts\\twitter-clone-e2e\\clear_mongo.bat");

    /*
        Import the data in "twitter clone test data/9- EDIT PROFILE" in mongoDb
        The data contains:
            (1) User John (username: john; email: john@gmail.com; password: Clonejohn23)
            (2) User Johnny (username: johnny; email: johnny@gmail.com; password: Clonejohnny23)
      */
    cy.exec(
      ".\\cypress\\scripts\\twitter-clone-e2e\\import_data_to_mongo.bat users .\\cypress\\fixtures\\twitter-clone-e2e\\edit_profile\\twitter-clone-db.users.json"
    );
    cy.exec(
      ".\\cypress\\scripts\\twitter-clone-e2e\\import_data_to_mongo.bat profiles .\\cypress\\fixtures\\twitter-clone-e2e\\edit_profile\\twitter-clone-db.profiles.json"
    );
    cy.exec(
      ".\\cypress\\scripts\\twitter-clone-e2e\\import_data_to_mongo.bat tweets .\\cypress\\fixtures\\twitter-clone-e2e\\edit_profile\\twitter-clone-db.tweets.json"
    );

    // Prereq.: Open Twitter-Clone and sign in as John
    cy.visit(Cypress.env("twitterCloneBaseUrl"));
    cy.SignInTwitterClone("john", "Clonejohn23");
  });

  it("1- Nominal case: The user can change his name ", () => {
    // 1.1: The user clicks on his personal menu located in the navigation bar
    cy.get("button#menu-button--menu").click();

    // 1.2: The user enters his profile
    cy.get("a#option-0--menu--1").click();

    // Expected result: The user's profile has name "John" and username "@john"
    cy.get('div[class*="Profile___StyledDiv4"]')
      .find("img")
      .next()
      .should("have.text", "John");
    cy.get('div[class*="Profile___StyledDiv4"]')
      .find('span[class*="Profile___StyledSpan2"]')
      .should("have.text", "@john");

    // 1.3: The user clicks on "edit profile" button
    cy.get('a[class*="EditProfileButton"]').click();

    // 1.4: The user changes his name from "John" to "Rony"
    cy.get('form[class*="StyledForm"]')
      .contains("label", "Name:")
      .next("input")
      .clear();
    cy.get('form[class*="StyledForm"]')
      .contains("label", "Name:")
      .next("input")
      .type("Rony");

    // 1.5: The user clicks on "Update profile" button
    cy.get('button[class*="SaveButton"]').click();

    // Expected result: A green sentence appears "Profile successfully updated!"
    cy.get('div[class*="EditProfile"]')
      .find('div[class*="FeedbackMessage"]')
      .should("have.text", "Profile successfully updated!")
      .should("have.css", "color", "rgb(62, 142, 65)");

    // 1.6: The user Clicks on "Go back" button
    cy.get('button[class*="CancelButton"]').click();

    /*
    Expected result:
        The user is in his profile

        The name of his profile changed to "Rony"
    */
    cy.get('div[class*="Profile___StyledDiv4"]')
      .find("img")
      .next()
      .should("have.text", "Rony");
    cy.get('div[class*="Profile___StyledDiv4"]')
      .find('span[class*="Profile___StyledSpan2"]')
      .should("have.text", "@john");

    // 1.7: The user clicks on "All profiles" in the navigation bar
    cy.get('nav[class*="MainNav"]').contains("a", "All profiles").click();

    // Expected result: The name of the profile with username "@john" has also changed to "Rony"
    cy.get('ul[class*="ProfilesList"]')
      .find("li:nth-child(1)")
      .find('div[class*="TextContainer"]')
      .find("p:nth-child(1)")
      .should("have.text", "Rony");

    cy.get('ul[class*="ProfilesList"]')
      .find("li:nth-child(1)")
      .find('div[class*="TextContainer"]')
      .find("p:nth-child(2)")
      .should("have.text", "@john");

    // 1.8: The user clicks on "Home"
    cy.get("ul").contains("a", "Home").click();

    // Expected result: The name of the profile with username "@john" has also changed to "Rony"
    // Name of the author
    cy.get('div[class*="Homepage"]')
      .find('div[class*="TweetUserGroup"]')
      .find('span[class*="TweetUserName"]')
      .should("have.text", "Rony");

    // Username of the author
    cy.get('div[class*="Homepage"]')
      .find('div[class*="TweetUserGroup"]')
      .find("span:nth-child(2)")
      .should("have.text", "@john");

    // 1.9: The user clicks on personal menu
    cy.get("button#menu-button--menu").click();

    // Expected result: The name is updated to "Rony"
    cy.get('div[class*="MenuPopover"]')
      .find("div:nth-child(1) p:nth-child(1)")
      .should("have.text", "Rony");
    cy.get('div[class*="MenuPopover"]')
      .find("div:nth-child(1) p:nth-child(2)")
      .should("have.text", "@john");
  });

  it("2- Edge case: The user can change his name and have the same name as another user", () => {
    // 2.1: The user clicks on his personal menu located in the navigation bar
    cy.get("button#menu-button--menu").click();

    // 2.2: The user enters his profile
    cy.get("a#option-0--menu--1").click();

    cy.wait(1000);
    // 2.3: The user clicks on "edit profile" button
    cy.get('a[class*="EditProfileButton"]').click();

    // 2.4: The user changes his name from "John" to "Johnny"
    cy.get('form[class*="StyledForm"]')
      .contains("label", "Name:")
      .next("input")
      .clear();
    cy.get('form[class*="StyledForm"]')
      .contains("label", "Name:")
      .next("input")
      .type("Johnny");

    // 2.5: The user clicks on "Update profile" button
    cy.get('button[class*="SaveButton"]').click();

    // Expected result: A green sentence appears "Profile successfully updated!"
    cy.get('div[class*="EditProfile"]')
      .find('div[class*="FeedbackMessage"]')
      .should("have.text", "Profile successfully updated!")
      .should("have.css", "color", "rgb(62, 142, 65)");

    // 2.6: The user Clicks on "Go back" button
    cy.get('button[class*="CancelButton"]').click();

    /*
    Expected result:
    The user is in his profile

    The name of his profile changed to "Johnny"
    */
    cy.get('div[class*="Profile___StyledDiv4"]')
      .find("img")
      .next()
      .should("have.text", "Johnny");
    cy.get('div[class*="Profile___StyledDiv4"]')
      .find('span[class*="Profile___StyledSpan2"]')
      .should("have.text", "@john");
  });

  it("3- Edge case: The user cannot leave the name empty", () => {
    // 3.1: The user clicks on his personal menu located in the navigation bar
    cy.get("button#menu-button--menu").click();

    // 3.2: The user enters his profile
    cy.get("a#option-0--menu--1").click();

    // 3.3: The user clicks on "edit profile" button
    cy.get('a[class*="EditProfileButton"]').click();

    // 3.4: The user leaves the name textbox empty
    cy.get('form[class*="StyledForm"]')
      .contains("label", "Name:")
      .next("input")
      .clear();

    // Expected result: The name textbox is empty
    cy.get('form[class*="StyledForm"]')
      .contains("label", "Name:")
      .next("input")
      .should("have.value", "");

    // 3.5: The user clicks on "Update profile" button
    cy.get('button[class*="SaveButton"]').click();

    // Expected result: A red sentence appears: ""name" is not allowed to be empty"
    cy.get('div[class*="EditProfile"]')
      .find('div[class*="FeedbackMessage"]')
      .should("have.text", '"name" is not allowed to be empty')
      .should("have.css", "color", "rgb(226, 61, 104)");

    // 3.6: The user clicks on "Go back" button
    cy.get('button[class*="CancelButton"]').click();

    /*
    Expected result:
    The user is in his profile
    The name of the profile is still "John"
    */
    cy.get('div[class*="Profile___StyledDiv4"]')
      .find("img")
      .next()
      .should("have.text", "John");
    cy.get('div[class*="Profile___StyledDiv4"]')
      .find('span[class*="Profile___StyledSpan2"]')
      .should("have.text", "@john");

    // 3.7: The user clicks on "edit profile" button
    cy.get('a[class*="EditProfileButton"]').click();

    // Expected result: The name textbox contains "John" which is the original name
    cy.get('form[class*="StyledForm"]')
      .contains("label", "Name:")
      .next("input")
      .should("have.value", "John");
  });

  it("4- Nominal case: The user can change his bio", () => {
    // 4.1: The user clicks on his personal menu located in the navigation bar
    cy.get("button#menu-button--menu").click();

    // 4.2: The user enters his profile
    cy.get("a#option-0--menu--1").click();

    // 4.3: The user clicks on "edit profile" button
    cy.get('a[class*="EditProfileButton"]').click();

    // 4.4: The user writes in bio textbox: "Blood type A+   Age 23"
    cy.get('form[class*="StyledForm"]')
      .contains("label", "Bio:")
      .next("input")
      .type("Blood type A+   Age 23");

    // 4.5: The user clicks on "Update profile" button
    cy.get('button[class*="SaveButton"]').click();

    // Expected result: A green sentence appears "Profile successfully updated!"
    cy.get('div[class*="EditProfile"]')
      .find('div[class*="FeedbackMessage"]')
      .should("have.text", "Profile successfully updated!")
      .should("have.css", "color", "rgb(62, 142, 65)");

    // 4.6: The user clicks on "Go back" button
    cy.get('button[class*="CancelButton"]').click();

    /*
    Expected result:
    The user is in his profile
    The bio "Blood type A+   Age 23" appears on the profile
    */
    cy.get('div[class*="Profile___StyledDiv4"]')
      .find("img")
      .next()
      .should("have.text", "John");
    cy.get('div[class*="Profile___StyledDiv4"]')
      .find('span[class*="Profile___StyledSpan2"]')
      .should("have.text", "@john");
    cy.get('div[class*="Profile___StyledDiv5"] > div:first').should(
      "have.text",
      "Blood type A+   Age 23"
    );

    // 4.7: The user clicks on "All profiles" in the navigation bar
    cy.get('nav[class*="MainNav"]').contains("a", "All profiles").click();

    // Expected result: The profile with username "@john" has the bio  "Blood type A+   Age 23"
    cy.get('ul[class*="ProfilesList"]')
      .find("li:nth-child(1)")
      .find('div[class*="TextContainer"]')
      .find("p:nth-child(2)")
      .should("have.text", "@john");
    cy.get('ul[class*="ProfilesList"]')
      .find("li:nth-child(1)")
      .find('div[class*="TextContainer"]')
      .find("p:nth-child(3)")
      .should("have.text", "Blood type A+   Age 23");
  });

  it("5- Nominal case: The user can change his location", () => {
    // 5.1: The user clicks on his personal menu located in the navigation bar
    cy.get("button#menu-button--menu").click();

    // 5.2: The user enters his profile
    cy.get("a#option-0--menu--1").click();

    // 5.3: The user clicks on "edit profile" button
    cy.get('a[class*="EditProfileButton"]').click();

    // 5.4: The user writes in the location textbox: "Boulevard street 10+"
    cy.get('form[class*="StyledForm"]')
      .contains("label", "Location:")
      .next("input")
      .type("Boulevard street 10+");

    // 5.5: The user clicks on "Update profile" button
    cy.get('button[class*="SaveButton"]').click();

    // Expected result: A green sentence appears "Profile successfully updated!"
    cy.get('div[class*="EditProfile"]')
      .find('div[class*="FeedbackMessage"]')
      .should("have.text", "Profile successfully updated!")
      .should("have.css", "color", "rgb(62, 142, 65)");

    // 5.6: The user clicks on "Go back" button
    cy.get('button[class*="CancelButton"]').click();

    /*
    Expected result:
        The user is in his profile
        The location "Boulevard street 10+" appears on the profile
    */
    cy.get('div[class*="Profile___StyledDiv4"]')
      .find('span[class*="Profile___StyledSpan2"]')
      .should("have.text", "@john");
    cy.get('div[class*="Profile___StyledDiv6"] > div:first').should(
      "have.text",
      " Boulevard street 10+"
    );
  });

  it("6- Nominal case: The user can change his website", () => {
    // 6.1: The user clicks on his personal menu located in the navigation bar
    cy.get("button#menu-button--menu").click();

    // 6.2: The user enters his profile
    cy.get("a#option-0--menu--1").click();

    // 6.3: The user clicks on "edit profile" button
    cy.get('a[class*="EditProfileButton"]').click();

    // 6.4: The user writes in the website textbox: john.com
    cy.get('form[class*="StyledForm"]')
      .contains("label", "Website:")
      .next("input")
      .type("john.com");

    // 6.5: The user clicks on "Update profile" button
    cy.get('button[class*="SaveButton"]').click();

    // Expected result: A green sentence appears "Profile successfully updated!"
    cy.get('div[class*="EditProfile"]')
      .find('div[class*="FeedbackMessage"]')
      .should("have.text", "Profile successfully updated!")
      .should("have.css", "color", "rgb(62, 142, 65)");

    // 6.6: The user clicks on "Go back" button
    cy.get('button[class*="CancelButton"]').click();

    /*
    Expected result:
    The user is in his profile
    The website "john.com" appears on the profile
    */
    cy.get('div[class*="Profile___StyledDiv4"]')
      .find('span[class*="Profile___StyledSpan2"]')
      .should("have.text", "@john");
    cy.get('div[class*="Profile___StyledDiv6"] > div:first').should(
      "have.text",
      " john.com"
    );
  });

  it("7- Edge case: The user must write a valid URL as his website", () => {
    // 7.1: The user clicks on his personal menu located in the navigation bar
    cy.get("button#menu-button--menu").click();

    // 7.2: The user enters his profile
    cy.get("a#option-0--menu--1").click();

    // 7.3: The user clicks on "edit profile" button
    cy.get('a[class*="EditProfileButton"]').click();

    // 7.4: The user writes in the website textbox: john.com
    cy.get('form[class*="StyledForm"]')
      .contains("label", "Website:")
      .next("input")
      .type("john.com");

    // 7.5: The user clicks on "Update profile" button
    cy.get('button[class*="SaveButton"]').click();

    // Expected result: A green sentence appears "Profile successfully updated!"
    cy.get('div[class*="EditProfile"]')
      .find('div[class*="FeedbackMessage"]')
      .should("have.text", "Profile successfully updated!")
      .should("have.css", "color", "rgb(62, 142, 65)");

    // 7.6: The user writes in the website textbox: john
    cy.get('form[class*="StyledForm"]')
      .contains("label", "Website:")
      .next("input")
      .clear();
    cy.get('form[class*="StyledForm"]')
      .contains("label", "Website:")
      .next("input")
      .type("john");

    // 7.7: The user clicks on "Update profile" button
    cy.get('button[class*="SaveButton"]').click();

    // Expected result: A red sentence appears: ""website" must be a valid url"
    cy.get('div[class*="EditProfile"]')
      .find('div[class*="FeedbackMessage"]')
      .should("have.text", '"website" must be a valid url')
      .should("have.css", "color", "rgb(226, 61, 104)");

    // 7.8: The user clicks on "Go back" button
    cy.get('button[class*="CancelButton"]').click();

    /*
    Expected result:
    The user is in his profile
    The website "john.com" appears instead of "john"on the profile
    */
    cy.get('div[class*="Profile___StyledDiv4"]')
      .find('span[class*="Profile___StyledSpan2"]')
      .should("have.text", "@john");
    cy.get('div[class*="Profile___StyledDiv6"] > div:first').should(
      "have.text",
      " john.com"
    );
  });

  it("8- Edge case: The user cannot leave the website textbox empty after it had contained a URL ", () => {
    // 8.1: The user clicks on his personal menu located in the navigation bar
    cy.get("button#menu-button--menu").click();

    // 8.2: The user enters his profile
    cy.get("a#option-0--menu--1").click();

    // 8.3: The user clicks on "edit profile" button
    cy.get('a[class*="EditProfileButton"]').click();

    // 8.4: The user writes in the website textbox: john.com
    cy.get('form[class*="StyledForm"]')
      .contains("label", "Website:")
      .next("input")
      .type("john.com");

    // 8.5: The user clicks on "Update profile" button
    cy.get('button[class*="SaveButton"]').click();

    // Expected result: A green sentence appears "Profile successfully updated!"
    cy.get('div[class*="EditProfile"]')
      .find('div[class*="FeedbackMessage"]')
      .should("have.text", "Profile successfully updated!")
      .should("have.css", "color", "rgb(62, 142, 65)");

    // 8.6:The user empty the website textbox
    cy.get('form[class*="StyledForm"]')
      .contains("label", "Website:")
      .next("input")
      .clear();

    // 8.7: The user clicks on "Update profile" button
    cy.get('button[class*="SaveButton"]').click();

    // Expected result: A red sentence appears: "Profile validation failed: website: Website must be a valid URL"
    cy.get('div[class*="EditProfile"]')
      .find('div[class*="FeedbackMessage"]')
      .should(
        "have.text",
        "Profile validation failed: website: Website must be a valid URL"
      )
      .should("have.css", "color", "rgb(226, 61, 104)");

    // 8.8: The user clicks on "Go back" button
    cy.get('button[class*="CancelButton"]').click();

    // Expected result: The website "john.com" appears in his profile
    cy.get('div[class*="Profile___StyledDiv4"]')
      .find('span[class*="Profile___StyledSpan2"]')
      .should("have.text", "@john");
    cy.get('div[class*="Profile___StyledDiv6"] > div:first').should(
      "have.text",
      " john.com"
    );
  });

  it("9- Nominal case: The user can change his avatar", () => {
    // 9.1: The user clicks on his personal menu located in the navigation bar
    cy.get("button#menu-button--menu").click();

    // 9.2: The user enters his profile
    cy.get("a#option-0--menu--1").click();

    cy.wait(1000);
    // 9.3: The user clicks on "edit profile" button
    cy.get('a[class*="EditProfileButton"]').click();

    // 9.4: The user writes in the avatar textbox: "https://fastly.picsum.photos/id/237/200/300" (This URL gives a photo of a black dog)
    cy.get('form[class*="StyledForm"]')
      .contains("label", "Avatar (URL):")
      .next("input")
      .type("https://picsum.photos/id/237/200/300", { delay: 50 });

    // 9.5: The user clicks on "Update profile" button
    cy.get('button[class*="SaveButton"]').click();

    cy.wait(1000);

    // Expected result: A green sentence appears "Profile successfully updated!"
    cy.get('div[class*="EditProfile"]')
      .find('div[class*="FeedbackMessage"]')
      .should("have.text", "Profile successfully updated!")
      .should("have.css", "color", "rgb(62, 142, 65)");

    // 9.6: The user clicks on "Go back" button
    cy.get('button[class*="CancelButton"]').click();
    cy.wait(3000);

    /*
    Expected result:
    The user is in his profile
    The avatar has a photo of a black dog
    */
    cy.get('div[class*="Profile___StyledDiv4"]')
      .find('span[class*="Profile___StyledSpan2"]')
      .should("have.text", "@john");
    // This is a simple method to assert if the image is present or not. "Natural width" is the original width of the image (without being affected by ratio and other factors). The image of the black dog has a natural width of 200px. In the assertion below, we are assertingif the image present has 200px
    cy.get('div[class*="Profile___StyledDiv4"]')
      .find("img")
      .then(($img) => {
        expect($img[0].naturalWidth).to.equal(200);
      });

    // 9.7: The user clicks on "All profiles" in the navigation bar
    cy.get('nav[class*="MainNav"]').contains("a", "All profiles").click();

    cy.wait(2000);

    // Expected result: The profile with the username "@john" have a photo of a black dog in the avatar
    cy.get('ul[class*="ProfilesList"]')
      .find("li:nth-child(1)")
      .find('div[class*="TextContainer"]')
      .find("p:nth-child(2)")
      .should("have.text", "@john");

    cy.get('ul[class*="ProfilesList"]')
      .find("li:nth-child(1)")
      .find('div[class*="FlexContainer"]')
      .find("img")
      .then(($img) => {
        expect($img[0].naturalWidth).to.equal(200);
      });

    // 9.8: The user clicks on "Home" in the navigation bar
    cy.get("ul").contains("a", "Home").click();

    cy.wait(2000);

    // Expected result: The tweet has a photo of a black dog in his avatar
    cy.get('div[class*="Homepage"]')
      .find("ul li:nth-child(1)")
      .find("img")
      .then(($img) => {
        expect($img[0].naturalWidth).to.equal(200);
      });

    // 9.9: Expected result: The user's personal menu has a photo of a black dog
    cy.get('button[data-cy="auth-nav-dropdown-button"]')
      .find("img")
      .should("exist");
  });

  it("10- Edge case: The user can add a valid URL , which doesn't give anything, as the avatar", () => {
    // 10.1: The user clicks on his personal menu located in the navigation bar
    cy.get("button#menu-button--menu").click();

    // 10.2: The user enters his profile
    cy.get("a#option-0--menu--1").click();

    cy.wait(1000);
    // 10.3: The user clicks on "edit profile" button
    cy.get('a[class*="EditProfileButton"]').click();

    // 10.4: The user writes in the avatar textbox: john.com (This URL does not give anything)
    cy.get('form[class*="StyledForm"]')
      .contains("label", "Avatar (URL):")
      .next("input")
      .type("john.com", { delay: 50 });

    // 10.5: The user clicks on "Update profile" button
    cy.get('button[class*="SaveButton"]').click();

    cy.wait(1000);
    // Expected result: A green sentence appears "Profile successfully updated!"
    cy.get('div[class*="EditProfile"]')
      .find('div[class*="FeedbackMessage"]')
      .should("have.text", "Profile successfully updated!")
      .should("have.css", "color", "rgb(62, 142, 65)");

    // 10.6: The user clicks on "Go back" button
    cy.get('button[class*="CancelButton"]').click();

    cy.wait(3000);

    /*
    Expected result:
    The user is in his profile
    There is no new photo for the avatar. It has instead the sentence "John's avatar"
    */
    cy.get('div[class*="Profile___StyledDiv4"]')
      .find('span[class*="Profile___StyledSpan2"]')
      .should("have.text", "@john");
    // This is a simple method to assert if the image is present or not. "Natural width" is the original width of the image (without being affected by ratio and other factors). SInce no image should be present, the natural width should be zero
    cy.get('div[class*="Profile___StyledDiv4"]')
      .find("img")
      .then(($img) => {
        expect($img[0].naturalWidth).to.equal(0);
      });

    // 10.7: The user clicks on "All profiles" in the navigation bar
    cy.get('nav[class*="MainNav"]').contains("a", "All profiles").click();

    /*
    The profile with the username "@john" do not have a photo in his avatar. It has instead the sentence "John's avatar"
    */
    cy.get('ul[class*="ProfilesList"]')
      .find("li:nth-child(1)")
      .find('div[class*="TextContainer"]')
      .find("p:nth-child(2)")
      .should("have.text", "@john");

    cy.get('ul[class*="ProfilesList"]')
      .find("li:nth-child(1)")
      .find('div[class*="FlexContainer"]')
      .find("img")
      .then(($img) => {
        expect($img[0].naturalWidth).to.equal(0);
      });

    // 10.8: The user clicks on "Home" in the navigation bar
    cy.get("ul").contains("a", "Home").click();

    cy.wait(2000);

    // Expected result: The tweet has no photo in his avatar. It has instead the sentence "User Avatar"
    cy.get('div[class*="Homepage"]')
      .find("ul li:nth-child(1)")
      .find("img")
      .then(($img) => {
        expect($img[0].naturalWidth).to.equal(0);
      });
  });

  it("11- Edge case: The user cannot add an invalid URL as the avatar", () => {
    // 11.1: The user clicks on his personal menu located in the navigation bar
    cy.get("button#menu-button--menu").click();

    // 11.2: The user enters his profile
    cy.get("a#option-0--menu--1").click();

    cy.wait(1000);
    // 11.3: The user clicks on "edit profile" button
    cy.get('a[class*="EditProfileButton"]').click();

    // 11.4: The user writes in the avatar textbox: john
    cy.get('form[class*="StyledForm"]')
      .contains("label", "Avatar (URL):")
      .next("input")
      .type("john", { delay: 50 });

    // 11.5: The user clicks on "Update profile" button
    cy.get('button[class*="SaveButton"]').click();

    // Expected result: A red sentence appears: ""avatar" must be a valid url"
    cy.get('div[class*="EditProfile"]')
      .find('div[class*="FeedbackMessage"]')
      .should("have.text", '"avatar" must be a valid url')
      .should("have.css", "color", "rgb(226, 61, 104)");
  });

  it("12- Nominal case: The user can change the background image", () => {
    // 12.1: The user clicks on his personal menu located in the navigation bar
    cy.get("button#menu-button--menu").click();

    // 12.2: The user enters his profile
    cy.get("a#option-0--menu--1").click();

    cy.wait(1000);
    // 12.3: The user clicks on "edit profile" button
    cy.get('a[class*="EditProfileButton"]').click();

    // 12.4: The user writes in the background image textbox: https://picsum.photos/id/866/600/400  (This URL gives the photo of moutain with snow)
    cy.get('form[class*="StyledForm"]')
      .contains("label", "Background image (URL):")
      .next("input")
      .type("https://picsum.photos/id/866/600/400", { delay: 50 });

    cy.get('button[class*="SaveButton"]').click();

    cy.wait(1000);
    // Expected result: A green sentence appears "Profile successfully updated!"
    cy.get('div[class*="EditProfile"]')
      .find('div[class*="FeedbackMessage"]')
      .should("have.text", "Profile successfully updated!")
      .should("have.css", "color", "rgb(62, 142, 65)");

    // 12.5: The user clicks on "Go back" button
    cy.get('button[class*="CancelButton"]').click();

    cy.wait(3000);

    /*
    Expected result:
    The user is in his profile
    The background image is now a moutain with snow
    */
    cy.get('div[class*="BackgroundContainer"]')
      .find("img")
      .then(($img) => {
        expect($img[0].naturalWidth).to.equal(600);
      });
  });

  it("13- Edge case: The user can add a valid URL , which doesn't give anything, as the background image", () => {
    // 13.1: The user clicks on his personal menu located in the navigation bar
    cy.get("button#menu-button--menu").click();

    // 13.2: The user enters his profile
    cy.get("a#option-0--menu--1").click();

    cy.wait(1000);
    // 13.3: The user clicks on "edit profile" button
    cy.get('a[class*="EditProfileButton"]').click();

    // 13.4: The user writes in the background image textbox: john.com (This URL does not give anything)
    cy.get('form[class*="StyledForm"]')
      .contains("label", "Background image (URL):")
      .next("input")
      .type("john.com", { delay: 50 });

    // 13.5: The user clicks on "Update profile" button
    cy.get('button[class*="SaveButton"]').click();
    cy.wait(1000);

    // Expected result: A green sentence appears "Profile successfully updated!"
    cy.get('div[class*="EditProfile"]')
      .find('div[class*="FeedbackMessage"]')
      .should("have.text", "Profile successfully updated!")
      .should("have.css", "color", "rgb(62, 142, 65)");

    // 13.6: The user clicks on "Go back" button
    cy.get('button[class*="CancelButton"]').click();

    cy.wait(3000);

    /*
    Expected result:
    The user is in his profile
    The background image is now a moutain with snow
    */
    cy.get('div[class*="BackgroundContainer"]')
      .find("img")
      .then(($img) => {
        expect($img[0].naturalWidth).to.equal(0);
      });
  });

  it("14- Edge case: The user cannot add an invalid URL as the background image", () => {
    // 14.1: The user clicks on his personal menu located in the navigation bar
    cy.get("button#menu-button--menu").click();

    // 14.2: The user enters his profile
    cy.get("a#option-0--menu--1").click();

    cy.wait(1000);
    // 14.3: The user clicks on "edit profile" button
    cy.get('a[class*="EditProfileButton"]').click();

    // 14.4: The user writes in the background image textbox: john.com (This URL does not give anything)
    cy.get('form[class*="StyledForm"]')
      .contains("label", "Background image (URL):")
      .next("input")
      .type("john", { delay: 50 });

    // 14.5: The user clicks on "Update profile" button
    cy.get('button[class*="SaveButton"]').click();
    cy.wait(1000);

    // Expected result: A red sentence appears ""backgroundImage" must be a valid url"
    cy.get('div[class*="EditProfile"]')
      .find('div[class*="FeedbackMessage"]')
      .should("have.text", '"backgroundImage" must be a valid url')
      .should("have.css", "color", "rgb(226, 61, 104)");
  });

  it("15- Edge case: The user can remove the avatar", () => {
    // 15.1: The user clicks on his personal menu located in the navigation bar
    cy.get("button#menu-button--menu").click();

    // 15.2: The user enters his profile
    cy.get("a#option-0--menu--1").click();

    cy.wait(1000);
    // 15.3: The user clicks on "edit profile" button
    cy.get('a[class*="EditProfileButton"]').click();

    // 15.4: The user writes in the avatar textbox: "https://fastly.picsum.photos/id/237/200/300" (This URL gives a photo of a black dog)
    cy.get('form[class*="StyledForm"]')
      .contains("label", "Avatar (URL):")
      .next("input")
      .type("https://picsum.photos/id/237/200/300", { delay: 50 });

    // 15.5: The user clicks on "Update profile" button
    cy.get('button[class*="SaveButton"]').click();

    cy.wait(1000);

    // 15.6: The user clicks on "Go back" button
    cy.get('button[class*="CancelButton"]').click();
    cy.wait(3000);

    /*
    Expected result:
    The user is in his profile
    The avatar has a photo of a black dog
    */
    cy.get('div[class*="Profile___StyledDiv4"]')
      .find('span[class*="Profile___StyledSpan2"]')
      .should("have.text", "@john");
    cy.get('div[class*="Profile___StyledDiv4"]')
      .find("img")
      .then(($img) => {
        expect($img[0].naturalWidth).to.equal(200);
      });

    // 15.7: The user clicks on "edit profile" button
    cy.get('a[class*="EditProfileButton"]').click();

    // 15.8:  The user leaves the avatar textbox empty
    cy.get('form[class*="StyledForm"]')
      .contains("label", "Avatar (URL):")
      .next("input")
      .clear();

    // 15.9: The user clicks on "Update profile" button
    cy.get('button[class*="SaveButton"]').click();

    cy.wait(1000);

    // Expected result: A green sentence appears "Profile successfully updated!"
    cy.get('div[class*="EditProfile"]')
      .find('div[class*="FeedbackMessage"]')
      .should("have.text", "Profile successfully updated!")
      .should("have.css", "color", "rgb(62, 142, 65)");
  });

  it("16- Edge case: The user cannot leave the background image textbox empty after it has contained a URL", function () {
    // 16.1: The user clicks on his personal menu located in the navigation bar
    cy.get("button#menu-button--menu").click();

    // 16.2: The user enters his profile
    cy.get("a#option-0--menu--1").click();

    cy.wait(1000);
    // 16.3: The user clicks on "edit profile" button
    cy.get('a[class*="EditProfileButton"]').click();

    // 16.4: The user writes in the background image textbox: https://picsum.photos/id/866/600/400  (This URL gives the photo of moutain with snow)
    cy.get('form[class*="StyledForm"]')
      .contains("label", "Background image (URL):")
      .next("input")
      .type("https://picsum.photos/id/866/600/400", { delay: 50 });

    // 16.5: The user clicks on "Update profile" button
    cy.get('button[class*="SaveButton"]').click();

    cy.wait(1000);

    // 16.6: The user clicks on "Go back" button
    cy.get('button[class*="CancelButton"]').click();

    cy.wait(3000);

    /*
    Expected result:
    The user is in his profile
    The background image is now a moutain with snow
    */
    cy.get('div[class*="BackgroundContainer"]')
      .find("img")
      .then(($img) => {
        expect($img[0].naturalWidth).to.equal(600);
      });

    // 16.7: The user clicks on "edit profile" button
    cy.get('a[class*="EditProfileButton"]').click();

    // 16.8: The user leaves the background image textbox empty
    cy.get('form[class*="StyledForm"]')
      .contains("label", "Background image (URL):")
      .next("input")
      .clear();

    // 16.9: The user clicks on "Update profile" button
    cy.get('button[class*="SaveButton"]').click();

    cy.wait(1000);

    // Expected result: A green sentence appears "Profile successfully updated!"
    cy.get('div[class*="EditProfile"]')
      .find('div[class*="FeedbackMessage"]')
      .should("have.text", "Profile successfully updated!")
      .should("have.css", "color", "rgb(62, 142, 65)");
  });
});
