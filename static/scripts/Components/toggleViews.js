import { drawElements } from "./elements.js";

// Ugly code, I know, I'm sorry!
const ToggleViews = {
  // DOM Element selectors
  cachedElements: {
    cauldronContainer: document.getElementById("cauldron-container"),
    shopContainer: document.getElementById("shop-container"),
    elementsContainer: document.getElementById("elements-container"),
    toggleCauldronView: document.getElementById("toggleCauldron"),
    toggleElementsView: document.getElementById("toggleElements"),
    toggleShopView: document.getElementById("toggleShop"),
    shopSlots: document.querySelectorAll(".shop-slot"),
  },
  toggleView: (view) => {
    // Switch case to trigger each event
    switch (view) {
      case "cauldron":
        ToggleViews.cachedElements.shopContainer.classList.add("disabled");
        ToggleViews.cachedElements.elementsContainer.classList.add("disabled");
        ToggleViews.cachedElements.cauldronContainer.classList.remove("disabled");
        break;
      case "tiers":
        ToggleViews.cachedElements.shopContainer.classList.add("disabled");
        ToggleViews.cachedElements.cauldronContainer.classList.add("disabled");
        ToggleViews.cachedElements.elementsContainer.classList.remove("disabled");
        break;
      case "shop":
        ToggleViews.cachedElements.cauldronContainer.classList.add("disabled");
        ToggleViews.cachedElements.elementsContainer.classList.add("disabled");
        ToggleViews.cachedElements.shopContainer.classList.remove("disabled");
        break;
    }
  },
};
// toggleView() usage(s)
ToggleViews.cachedElements.toggleShopView.addEventListener("click", () => {
  ToggleViews.cachedElements.toggleShopView.classList.add("active");
  ToggleViews.cachedElements.toggleElementsView.classList.remove("active");
  ToggleViews.cachedElements.toggleCauldronView.classList.remove("active");
  ToggleViews.toggleView("shop");
});
ToggleViews.cachedElements.toggleCauldronView.addEventListener("click", () => {
  ToggleViews.cachedElements.toggleCauldronView.classList.add("active");
  ToggleViews.cachedElements.toggleShopView.classList.remove("active");
  ToggleViews.cachedElements.toggleElementsView.classList.remove("active");
  ToggleViews.toggleView("cauldron");
});
ToggleViews.cachedElements.toggleElementsView.addEventListener("click", () => {
  drawElements()
  ToggleViews.cachedElements.toggleCauldronView.classList.remove("active");
  ToggleViews.cachedElements.toggleShopView.classList.remove("active");
  ToggleViews.cachedElements.toggleElementsView.classList.add("active");
  ToggleViews.toggleView("tiers");
});
