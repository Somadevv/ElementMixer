// Ugly code, I know, I'm sorry!
const ToggleViews = {
  // DOM Element selectors
  cachedElements: {
    cauldronContainer: document.getElementById("cauldron-container"),
    shopContainer: document.getElementById("shop-container"),
    tiersContainer: document.getElementById("tiers-container"),
    toggleCauldronView: document.getElementById("toggleCauldron"),
    toggleTiersView: document.getElementById("toggleTiers"),
    toggleShopView: document.getElementById("toggleShop"),
    shopSlots: document.querySelectorAll(".shop-slot"),
  },
  toggleView: (view) => {
    // Switch case to trigger each event
    switch (view) {
      case "cauldron":
        ToggleViews.cachedElements.shopContainer.classList.add("disabled");
        ToggleViews.cachedElements.tiersContainer.classList.add("disabled");
        ToggleViews.cachedElements.cauldronContainer.classList.remove("disabled");
        break;
      case "tiers":
        ToggleViews.cachedElements.shopContainer.classList.add("disabled");
        ToggleViews.cachedElements.cauldronContainer.classList.add("disabled");
        ToggleViews.cachedElements.tiersContainer.classList.remove("disabled");
        break;
      case "shop":
        ToggleViews.cachedElements.cauldronContainer.classList.add("disabled");
        ToggleViews.cachedElements.tiersContainer.classList.add("disabled");
        ToggleViews.cachedElements.shopContainer.classList.remove("disabled");
        break;
    }
  },
};
// toggleView() usage(s)
ToggleViews.cachedElements.toggleShopView.addEventListener("click", () => {
  ToggleViews.cachedElements.toggleShopView.classList.add("active");
  ToggleViews.cachedElements.toggleTiersView.classList.remove("active");
  ToggleViews.cachedElements.toggleCauldronView.classList.remove("active");
  ToggleViews.toggleView("shop");
});
ToggleViews.cachedElements.toggleCauldronView.addEventListener("click", () => {
  ToggleViews.cachedElements.toggleCauldronView.classList.add("active");
  ToggleViews.cachedElements.toggleShopView.classList.remove("active");
  ToggleViews.cachedElements.toggleTiersView.classList.remove("active");
  ToggleViews.toggleView("cauldron");
});
ToggleViews.cachedElements.toggleTiersView.addEventListener("click", () => {
  ToggleViews.cachedElements.toggleCauldronView.classList.remove("active");
  ToggleViews.cachedElements.toggleShopView.classList.remove("active");
  ToggleViews.cachedElements.toggleTiersView.classList.add("active");
  ToggleViews.toggleView("tiers");
});
