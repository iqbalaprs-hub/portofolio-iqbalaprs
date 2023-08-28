var currentIndex = 0;
// Body background color array
const bodyBackgroundColorArray = ["#dad3c1", "#808080", "#dab0a4", "#781e1e"];
var newBodyBackgroundColor = bodyBackgroundColorArray[currentIndex];
console.log(newBodyBackgroundColor);

// Section background color array
var sectionBackgroundColorArray = ["#f9f4e5", "#D3D3D3", "#fecdbe", "#d11414"];
var newSectionBackgroundColor = sectionBackgroundColorArray[currentIndex];

// Normal text font color
var normalTextColorArray = ["#2b2925", "#fff", "#191412", "#fdfafa"];
var newNormalTextColor = normalTextColorArray[currentIndex];

// Getting access to root
var root = document.querySelector(":root");
console.log(root);
var rootStyles = getComputedStyle(root);
console.log(rootStyles);

// Getting access to button
const buttons = document.querySelectorAll("[data-carousel-button]");

// Click event
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // Changing slide
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;

    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]");

    const activeSlide = slides.querySelector("[data-active]");

    let newIndex = [...slides.children].indexOf(activeSlide) + offset;

    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    slides.children[newIndex].dataset.active = true;

    delete activeSlide.dataset.active;

    currentIndex = (currentIndex + 1) % bodyBackgroundColorArray.length;
    console.log(currentIndex);

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
  });
});
