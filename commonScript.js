// Accordion behavior

const accordionItemList = document.getElementsByClassName("accordion-item");
for (const accordionItem of accordionItemList) {
  const accordionTitle = accordionItem.querySelector(".accordion-title");
  accordionTitle.addEventListener("click", function () {
    accordionItem.classList.toggle("open");
  });
}
