// Body background color array
const bodyBackgroundColorArray = ["#dad3c1", "#808080", "#dab0a4", "#781e1e"];
let currentColorIndex = 0;
var newBodyBackgroundColor = bodyBackgroundColorArray[currentColorIndex];
console.log(newBodyBackgroundColor);

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

    // changing body background color
    currentColorIndex =
      (currentColorIndex + 1) % bodyBackgroundColorArray.length;
    console.log(currentColorIndex);
    var newBodyBackgroundColor = bodyBackgroundColorArray[currentColorIndex];
    root.style.setProperty("--body-background-color", newBodyBackgroundColor);
    console.log(newBodyBackgroundColor);
  });
});
