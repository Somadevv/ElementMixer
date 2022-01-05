import { Request } from "./Services/API/getRequest.js";

let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("closeButton")[0];
let cauldronSlots = document.querySelectorAll(".item");
let modalContent = document.getElementById("inventoryList");
let inventory;

span.onclick = () => {
  modal.style.display = "none";
};
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

const getInventory = async () => {
  let request = await Request.getDataRequest("get-inventory");
  inventory = await request[0].elements;
  let result = inventory.reduce((previousValue, currentValue) => {
    return (
      previousValue[currentValue] ? ++previousValue[currentValue] : (previousValue[currentValue] = 1),
      previousValue
    );
  }, {});

  return result;
};
/*
1) Convert api results into visual dom elements and append to an array
2) Append this array to the dom using the the createUnorderedList function


Create a function to convert data to dom card element, run loop using that funtion on every item in the results array? 
*/
const createUnorderedList = (array) => {
  var list = document.createElement("ul");
  for (let i = 0; i < array.length; i++) {
    let listItem = document.createElement("li");
    listItem.appendChild(document.createTextNode(array[i]));
    list.appendChild(listItem);
  }
  return list;
};

const drawInventory = async () => {
  // DRAW INVENTORY TO DOM
  let inventoryData = await getInventory();
  // Convert obj -> array
  let results = Object.entries(inventoryData);
  modalContent.appendChild(createUnorderedList(results));
};

// EVENT LISTENERS
cauldronSlots.forEach((item) => {
  item.addEventListener("click", async () => {
    modal.style.display = "block";
    // drawInventory();
  });
});

// let output = `<div>
//   <h3>${elementTitle}</h3>
//   <img>
//   <p> ${quantity} </p>
// </div>`

const getElements = async () => {
  let fetch = await Request.getDataRequest("get-elements");
  let results = await fetch;
  let array = await [];
  for (let i = 0; i < results.length; i++) {
    array.push(await (results[i].elementId && results[i].name));
  }
  return array;
};

let something = await getElements()
let somethingElse = await getInventory()

console.log("Elements: ",something)
cauldronSlots.forEach((item) => {
  item.addEventListener("click", () => (modal.style.display = "block"));
});

const convertToElement = async () => {
  let inventory = await getInventory();
  
  for (let i = 0; i < inventory.length; i++) {
    console.log(inventory[i])
  }

  // return console.log(yoooo);
};

// let elements = await getElements();
// let slap = document.getElementById("inventoryList");
// let container = document.createElement("div");
// let title = document.createElement("h3");
// let amount = document.createElement("p");
// let inv = Object.values(elements)
// title.appendChild(document.createTextNode(inv));
// container.appendChild(title);
// slap.appendChild(container);
// amount.appendChild(document.createTextNode(inv.quantity))
// slap.appendChild(amount)
convertToElement();
/* ELEMENTS
[
  { 
    elementId: 1,
    name: Fire
  },
  {
    elementId: 2,
    name: Water
  }
]
*/


let jasmin = await getInventory()

console.log("Inventory: ", jasmin)
