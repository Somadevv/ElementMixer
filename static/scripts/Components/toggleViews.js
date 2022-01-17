import { drawElements } from "./elements.js";

// Repeated code, i know, i'm sorry!

// DOM Element selectors
const cachedEls = {
  cauldronContainer: document.getElementById("cauldron-container"),
  shopContainer: document.getElementById("shop-container"),
  elementsContainer: document.getElementById("elements-container"),
  toggleCauldron: document.getElementById("toggleCauldron"),
  toggleElements: document.getElementById("toggleElements"),
  toggleShop: document.getElementById("toggleShop"),
  shopSlots: document.querySelectorAll(".shop-slot"),
};

// Switch case to trigger each event
const toggleView = (view) => {
  switch (view) {
    case "cauldron":
      cachedEls.shopContainer.classList.add("disabled");
      cachedEls.elementsContainer.classList.add("disabled");
      cachedEls.cauldronContainer.classList.remove("disabled");
      break;
    case "elements":
      cachedEls.shopContainer.classList.add("disabled");
      cachedEls.cauldronContainer.classList.add("disabled");
      cachedEls.elementsContainer.classList.remove("disabled");
      break;
    case "shop":
      cachedEls.cauldronContainer.classList.add("disabled");
      cachedEls.elementsContainer.classList.add("disabled");
      cachedEls.shopContainer.classList.remove("disabled");
      break;
  }
};

// toggleView() usage(s)
cachedEls.toggleShop.addEventListener("click", () => {
  cachedEls.toggleShop.classList.add("active");
  cachedEls.toggleElements.classList.remove("active");
  cachedEls.toggleCauldron.classList.remove("active");
  toggleView("shop");
});
cachedEls.toggleCauldron.addEventListener("click", () => {
  cachedEls.toggleCauldron.classList.add("active");
  cachedEls.toggleShop.classList.remove("active");
  cachedEls.toggleElements.classList.remove("active");
  toggleView("cauldron");
});
cachedEls.toggleElements.addEventListener("click", () => {
  // drawElements();
  cachedEls.toggleCauldron.classList.remove("active");
  cachedEls.toggleShop.classList.remove("active");
  cachedEls.toggleElements.classList.add("active");
  toggleView("elements");
});
