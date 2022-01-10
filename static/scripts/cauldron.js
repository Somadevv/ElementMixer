import { Request } from "./Services/API/getRequest.js";

const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("closeButton")[0];
const cauldronSlot = document.querySelectorAll(".cauldron-slot");
const inventoryList = document.querySelector(".inventoryList");

// INSIDE INVENTORY CLICKS
// inventoryElementSlot.addEventListener("click", () => {

// });

span.onclick = () => {
  modal.classList.display = "none";
};
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

cauldronSlot.forEach((item) => {
  item.addEventListener("click", async () => {
    const data = await drawInventory();
    modal.style.display = "block";
    inventoryList.innerHTML = data;
    const inventoryItem = document.querySelectorAll(".cell");
    inventoryItem.forEach((item) => {
      item.addEventListener("click", () => addToCauldron());
    });
  });
});


const drawInventory = async () => {
  const data = await Request.getDataRequest("get-inventory");
  let output = ``;

  for (let i = 0; i < data.length; i++) {
    output += `
    <li id="alive">
    <div class="cell inventory-slot-bg">
    <p>${data[i].name}</p>
        <img src="/static/images/${data[i].name}.png" class="invImg" alt="inventory-slot">
        <p class="amount" style="font-size: .75rem;">${data[i].amount}</p>
      
    </div> </li>`;
  }
  return output;
};
