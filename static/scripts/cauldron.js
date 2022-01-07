import { Request } from "./Services/API/getRequest.js";

let inventoryElementSlot = document.getElementById("yo");
let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("closeButton")[0];
let cauldronSlots = document.querySelectorAll(".item");

// INSIDE INVENTORY CLICKS
// inventoryElementSlot.addEventListener("click", () => {
 
// });

span.onclick = () => {
  modal.style.display = "none";
};
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

cauldronSlots.forEach((item) => {
  item.addEventListener("click", async () => {
    modal.style.display = "block";
  });
});

let yo = await Request.getDataRequest('get-inventory')
console.log(yo[0].elementName)

// const getInventory = async () => {
//   let request = await Request.getDataRequest("get-inventory");
//   inventory = await request[0].elements;
//   let result = inventory.reduce((previousValue, currentValue) => {
//     return (
//       previousValue[currentValue] ? ++previousValue[currentValue] : (previousValue[currentValue] = 1),
//       previousValue
//     );
//   }, {});

//   return result;
// };
