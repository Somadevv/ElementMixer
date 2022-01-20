import { Request } from "./Services/API/fetchRequest.js";
(() => {
  const cachedElements = {
    desktopBackground: document.querySelector(".home-container"),
    mobileBackground: document.querySelector(".toggle-mobile"),
    mobileQuery: window.matchMedia("(max-width: 767px)"),
    playerCredits: document.getElementById("playerCredits"),
  };

  const checkQuery = (query) => {
    query.matches
      ? cachedElements.mobileBackground.classList.remove("disabled")
      : cachedElements.mobileBackground.classList.add("disabled");
  };

  const drawPlayerCredits = async () => {
    let data = await Request.getPlayerInfo()
    
    cachedElements.playerCredits.innerHTML = await data[0].credits
  };

  // On document load
  document.addEventListener("DOMContentLoaded", async function (event) {
  drawPlayerCredits();
    checkQuery(cachedElements.mobileQuery);
    cachedElements.mobileQuery.addListener(checkQuery);
  });
})();
