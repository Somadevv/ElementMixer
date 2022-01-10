(() => {
  const cachedElements = {
    desktopBackground: document.querySelector(".home-container"),
    mobileBackground: document.querySelector(".toggle-mobile"),
    mobileQuery: window.matchMedia("(max-width: 768px)"),
  };

  const checkQuery = (query) => {
    query.matches
      ? (cachedElements.mobileBackground.classList.remove("disabled"))
      : cachedElements.mobileBackground.classList.add("disabled");
  };


  // On document load
  document.addEventListener("DOMContentLoaded", function (event) {
    checkQuery(cachedElements.mobileQuery);
    cachedElements.mobileQuery.addListener(checkQuery);
  });
})();
