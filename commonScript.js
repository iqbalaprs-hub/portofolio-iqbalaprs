// Accordion behavior

const accordionItemList = document.getElementsByClassName("accordion-item");
for (const accordionItem of accordionItemList) {
  accordionItem.addEventListener("click", function () {
    accordionItem.classList.toggle("open");
  });
}
