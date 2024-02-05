// Accordion behavior

// const accordionItemList = document.getElementsByClassName("accordion-item");
// for (const accordionItem of accordionItemList) {
//   const accordionTitle = accordionItem.querySelector(".accordion-title");
//   accordionTitle.addEventListener("click", function () {
//     accordionItem.classList.toggle("open");
//   });
// }

// Purpose of the code below: when a link in the table of contents is clicked, the script prevents the default behavior, calculates the position of the target element, and smoothly scrolls the window to the position of the target element on the screen.
document.addEventListener("DOMContentLoaded", function () {
  // This selects all elements with the class table-of-contents-section-title, which are the links in the table of contents
  const links = document.querySelectorAll(".table-of-contents-section-title");

  // Iterates through each link
  links.forEach((link) => {
    // Adds a click event listener to each link
    link.addEventListener("click", function (event) {
      // Prevents the default behavior of the link, which is to navigate to a new page or anchor
      event.preventDefault();
      // Gets the target element's ID by extracting it from the href attribute of the clicked link
      // The substring(1) is used to remove the '#' character.
      const targetId = this.getAttribute("href").substring(1);
      // Gets the target element using its ID
      const targetElement = document.getElementById(targetId);

      // Checks if the target element exists
      if (targetElement) {
        // Calculates the offset from the top of the document to the target element
        const offsetTop = targetElement.offsetTop;
        // Adjusted for a 115px offset from the top
        const scrollPosition = offsetTop - 115;

        // Scrolls the window to the calculated position with a smooth scrolling behavior
        window.scrollTo({
          top: scrollPosition,
          behavior: "smooth",
        });
      }
    });
  });
});
