import { Request } from "../Services/API/fetchRequest.js";

const cachedElements = {
  modal: document.getElementById("myModal"),
  span: document.getElementsByClassName("closeButton")[0],
  inventoryList: document.querySelector(".inventoryList"),
  cauldronSlot: document.querySelectorAll(".cauldron-slot"),
  inventoryDeco: document.querySelectorAll(".inventoryModalDeco"),
  modalClearButton: document.getElementsByClassName("clearButton")[0],
  inventoryListItems: document.querySelectorAll("inventoryListItems"),
  inventoryImg: document.querySelectorAll(".inventoryImage"),
  mixButton: document.getElementById("mix"),
};
let cauldronElements = [];

cachedElements.mixButton.addEventListener("click", () => {
  cachedElements.cauldronSlot.forEach((slot) => {
    cauldronElements.push(slot.childNodes[1].innerHTML);
  
  });
  console.log(cauldronElements);
  Request.checkElements("check-elements", {
    combination: JSON.stringify(cauldronElements),
  });
});
cachedElements.cauldronSlot.forEach((item) => {
  item.addEventListener("click", async () => {
    const data = await drawInventory();
    cachedElements.modal.style.display = "block";
    cachedElements.inventoryList.innerHTML = data;
    const inventoryItem = document.querySelectorAll(".cell");
    inventoryItem.forEach((item) => {
      item.addEventListener("click", () => {
        for (let i = 0; i < cachedElements.cauldronSlot.length; i++) {
          // console.log(item.childNodes[7].innerHTML);
          if (!cachedElements.cauldronSlot[i].childNodes[0]) {
            addToCauldron(
              cachedElements.cauldronSlot[i],
              item.childNodes[1].innerHTML,
              item.childNodes[5].innerHTML
            );
            item.childNodes[7].innerHTML -= 1;
            cachedElements.inventoryDeco[i].classList.add("selected-deco");
            break;
          } else {
            continue;
          }
        }
      });
    });
  });
});
const addToCauldron = (target, name, id) => {
  const img = document.createElement("img");
  const elementId = document.createElement("p");
  img.src = `/static/images/elements/${name}.png`;
  img.classList.add("cauldronTempImg");
  elementId.innerHTML = id;
  target.appendChild(img);
  target.appendChild(elementId);
};

// Event listeners
cachedElements.span.addEventListener("click", () => {
  cachedElements.modal.style.display = "none";
});
window.onclick = (event) => {
  if (event.target == cachedElements.modal) {
    cachedElements.modal.style.display = "none";
  }
};
cachedElements.modalClearButton.onclick = () => {
  cachedElements.cauldronSlot.forEach((item) => (item.innerHTML = ""));
  cachedElements.inventoryDeco.forEach((deco) => deco.classList.remove("selected-deco"));
};

const drawInventory = async () => {
  const data = await Request.getPlayerInventory("get-inventory");
  let output = ``;

  for (let i = 0; i < data.length; i++) {
    output += `
    <li class="inventoryListItems" tabindex="1">
    <div class="cell inventory-slot-bg">
    <p class="invElementName" >${data[i].name}</p>
    <img src="/static/images/elements/${data[i].name}.png" class="inventoryImage" alt="inventory-slot">
    <p class="elementId disabled">${data[i].elementId}</p>
        <p class="amount" style="font-size: .90rem;">${data[i].amount}</p>
      </div>
    </li>`;
  }
  return output;
};
