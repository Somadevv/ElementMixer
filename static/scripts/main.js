import * as inventory from "./Components/inventory.js";


const cachedElements = {
  desktopBackground: document.querySelector(".home-container"),
  mobileBackground: document.querySelector(".toggle-mobile"),
  mobileQuery: window.matchMedia("(max-width: 768px)"),
};

const checkQuery = (query) => {
  query.matches
    ? cachedElements.mobileBackground.classList.remove("disabled")
    : cachedElements.mobileBackground.classList.add("disabled");
};

// On document load
document.addEventListener("DOMContentLoaded", function (event) {
  // MOBILE QUERY LISTENER
  checkQuery(cachedElements.mobileQuery);
  cachedElements.mobileQuery.addListener(checkQuery);
});


const render = (inventory) => {
  const list = inventory.getItems().map(x => {
    let listItem = document.createElement("li");
    listItem.appendChild(document.createTextNode(x));
    return listItem
    
  })
  
  const ul = document.createElement("ul");
  ul.append(list);
  return ul;
};





// makeUL(array) {
//   let ul = document.createElement("ul");
//   for (let i = 0; i < array.length; i++) {
//     let listItem = document.createElement("li");
//     listItem.appendChild(document.createTextNode(array[i]));
//     ul.appendChild(listItem);
//   }

//   return ul;
// }
