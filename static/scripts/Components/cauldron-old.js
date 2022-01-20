import { Request } from "../Services/API/fetchRequest.js";

const selectors = {
  modal: document.getElementById("myModal"),
  span: document.getElementsByClassName("closeButton")[0],
  inventoryList: document.querySelector(".inventoryList"),
  cauldronSlot: document.querySelectorAll(".cauldron-slot"),
  inventoryDeco: document.querySelectorAll(".inventoryModalDeco"),
  modalClearButton: document.getElementsByClassName("clearButton")[0],
  inventoryListItems: document.querySelectorAll("inventoryListItems"),
  inventoryImg: document.querySelectorAll(".inventoryImage"),
  mixButton: document.getElementById("mix"),
  successView: document.getElementById("success-container"),
  failedView: document.getElementById("failed-container"),
};

const handleModalMixClick = async () => {
  selectors.inventoryDeco.forEach((deco) => deco.classList.remove("selected-deco"));
  let cauldronElements = [];
  selectors.cauldronSlot.forEach((slot) => {
    cauldronElements.push(slot.childNodes[1].innerHTML);
  });

  let response = await Request.checkElements("check-elements", {
    combination: JSON.stringify(cauldronElements),
  });
  for (let i = 0; i < selectors.cauldronSlot.length; i++) {
    selectors.cauldronSlot[i].innerHTML = "";
  }
  console.log(response);
};

selectors.mixButton.addEventListener("click", async () => {
  handleModalMixClick();
});

// Cauldron slot onclick
selectors.cauldronSlot.forEach((item) => {
  item.addEventListener("click", async () => {
    selectors.modal.style.display = "block";
    const data = await drawInventory();
    selectors.inventoryList.innerHTML = data;
    const inventoryItem = document.querySelectorAll(".inventoryItem");

    inventoryItem.forEach((item) => {
      item.addEventListener("click", () => {
        for (let i = 0; i < selectors.cauldronSlot.length; i++) {
          // console.log(item.childNodes[7].innerHTML);
          if (!selectors.cauldronSlot[i].childNodes[0]) {
            addToCauldron(selectors.cauldronSlot[i], item.childNodes[1].innerHTML, item.childNodes[5].innerHTML);
            item.childNodes[7].innerHTML -= 1;
            selectors.inventoryDeco[i].classList.add("selected-deco");
            break;
          } else {
            continue;
          }
        }
        toggleButtonState();
      });
    });
  });
});
// Inventory item onclicks

// Toggle cauldron construct button
const toggleButtonState = () => {
  if (selectors.cauldronSlot[3].childNodes[0]) {
    selectors.mixButton.classList.remove("button-disabled");
  } else {
    selectors.mixButton.classList.add("button-disabled");
  }
};

const addToCauldron = (target, name, id) => {
  const img = document.createElement("img");
  const elementId = document.createElement("p");
  img.src = `/static/images/elements/${name}.png`;
  img.classList.add("cauldronTempImg");
  elementId.innerHTML = id;
  elementId.style.display = "none";
  target.appendChild(img);
  target.appendChild(elementId);
};

// Event listeners
selectors.span.addEventListener("click", () => {
  selectors.modal.style.display = "none";
});
window.onclick = (event) => {
  if (event.target == selectors.modal) {
    selectors.modal.style.display = "none";
  }
};
const handleModalClearClick = () => {
  selectors.cauldronSlot.forEach((item) => (item.innerHTML = ""));
  selectors.inventoryDeco.forEach((deco) => deco.classList.remove("selected-deco"));
  toggleButtonState();
};
selectors.modalClearButton.onclick = async () => {
  handleModalClearClick();
};

const drawInventory = async () => {
  toggleButtonState();
  const data = await Request.getPlayerInventory("get-inventory");
  let output = ``;

  for (let i = 0; i < data.length; i++) {
    output += `
    <li class="inventoryListItems" tabindex="1">
    <div class="inventoryItem inventory-slot-bg">
    <p class="invElementName" >${data[i].name}</p>
    <img src="/static/images/elements/${data[i].name}.png" class="inventoryImage" alt="inventory-slot">
    <p class="elementId disabled">${data[i].eleId}</p>
        <p class="amount" style="font-size: .90rem;">${data[i].amount}</p>
      </div>
    </li>`;
  }
  return output;
};
