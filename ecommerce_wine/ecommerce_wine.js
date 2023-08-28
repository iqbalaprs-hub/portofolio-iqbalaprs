var currentIndex = 0;
// Body background color array
const bodyBackgroundColorArray = ["#dad3c1", "#808080", "#dab0a4", "#781e1e"];
var newBodyBackgroundColor = bodyBackgroundColorArray[currentIndex];
console.log(newBodyBackgroundColor);

// Section background color array
const sectionBackgroundColorArray = [
  "#f9f4e5",
  "#D3D3D3",
  "#fecdbe",
  "#d11414",
];
var newSectionBackgroundColor = sectionBackgroundColorArray[currentIndex];

// Normal text font color
const normalTextColorArray = ["#2b2925", "#fff", "#191412", "#fdfafa"];
var newNormalTextColor = normalTextColorArray[currentIndex];

// Hover background color array
const hoverBackgroundColorArray = ["#D3D3D3", "#fecdbe", "#d11414", "#f9f4e5"];
var newHoverBackgroundColor = hoverBackgroundColorArray[currentIndex];

// Hover text color
const hoverTextColorArray = ["#fff", "#191412", "#fdfafa", "#2b2925"];
var newHoverTextColor = hoverTextColorArray[currentIndex];

// Border color
const borderColorArray = ["#2b2925", "#fff", "#191412", "#fdfafa"];
var newBorderColor = borderColorArray[currentIndex];

// Hover border color
const hoverBorderColorArray = ["#fff", "#191412", "#fdfafa", "#2b2925"];
var newHoverBorderColor = hoverBorderColorArray[currentIndex];

// Getting access to root
var root = document.querySelector(":root");
console.log(root);
var rootStyles = getComputedStyle(root);
console.log(rootStyles);

var scrollContainer = document.querySelector(".slider");
// Getting access to button
const buttons = document.querySelectorAll("[data-carousel-button]");

// Get the width needed to scroll
const slideElement = document.querySelector(".slide");
const slideWidth = slideElement.offsetWidth;
console.log(slideWidth);
// Click event
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    scrollContainer.style.scrollBehavior = "smooth";
    // Changing slide
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;

    if ((offset == 1) & (currentIndex < 3)) {
      currentIndex = (currentIndex + 1) % bodyBackgroundColorArray.length;
      console.log(currentIndex);
      scrollContainer.scrollLeft += slideWidth;
    } else if ((offset != 1) & (currentIndex > 0)) {
      currentIndex = (currentIndex - 1) % bodyBackgroundColorArray.length;
      console.log(currentIndex);
      scrollContainer.scrollLeft -= slideWidth;
    }

    // changing body background color
    var newBodyBackgroundColor = bodyBackgroundColorArray[currentIndex];
    root.style.setProperty("--body-background-color", newBodyBackgroundColor);
    console.log(newBodyBackgroundColor);

    // Changing section background color
    var newSectionBackgroundColor = sectionBackgroundColorArray[currentIndex];
    root.style.setProperty(
      "--section-background-color",
      newSectionBackgroundColor
    );
    console.log(newSectionBackgroundColor);

    // Changing normal text color
    var newNormalTextColor = normalTextColorArray[currentIndex];
    root.style.setProperty("--normal-text-color", newNormalTextColor);
    console.log(newNormalTextColor);

    // Changing hover background color
    var newHoverBackgroundColor = hoverBackgroundColorArray[currentIndex];
    root.style.setProperty(
      "--button-hover-background-color",
      newHoverBackgroundColor
    );
    console.log(newHoverBackgroundColor);

    // Changing hover text color
    var newHoverTextColor = hoverTextColorArray[currentIndex];
    root.style.setProperty("--button-hover-text-color", newHoverTextColor);
    console.log(newHoverTextColor);

    // Changing border color
    var newBorderColor = borderColorArray[currentIndex];
    root.style.setProperty("--border-color", newBorderColor);
    console.log(newBorderColor);

    // Changing hover border color
    var newHoverBorderColor = hoverBorderColorArray[currentIndex];
    root.style.setProperty("--border-button-hover-color", newHoverBorderColor);
    console.log(newHoverBorderColor);
  });
});
