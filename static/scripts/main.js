const desktopBackground = document.querySelector('.home-container');
const mobileBackground = document.querySelector('.toggle-mobile');
const mobileQuery = window.matchMedia("(max-width: 768px)");
const backGeneratoe = document.qu


const checkQuery = (query) => {
  query.matches
    ? (mobileBackground.classList.remove('disabled'))
    : (mobileBackground.classList.add('disabled'));
};

// On document load
document.addEventListener("DOMContentLoaded", function (event) {
  // MOBILE QUERY LISTENER
  checkQuery(mobileQuery);
  mobileQuery.addListener(checkQuery);
});
