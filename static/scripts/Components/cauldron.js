import { Request } from "../Services/API/fetchRequest.js";

const cachedElements = {
  modal: document.getElementById("myModal"),
  span: document.getElementsByClassName("closeButton")[0],
  inventoryList: document.querySelector(".inventoryList"),
  cauldronSlot: document.querySelectorAll(".cauldron-slot"),
  inventoryDeco: document.querySelectorAll(".inventoryModalDeco"),
  modalClearButton: document.getElementsByClassName("clear")[0],
  inventoryListItems: document.querySelectorAll("inventoryListItems"),
  inventoryImg: document.querySelectorAll(".inventoryImage"),
};


cachedElements.cauldronSlot.forEach((item) => {
  item.addEventListener("click", async () => {
    const data = await drawInventory();
    cachedElements.modal.style.display = "block";
    cachedElements.inventoryList.innerHTML = data;
    const inventoryItem = document.querySelectorAll(".cell");
    inventoryItem.forEach((item) => {
      item.addEventListener("click", () => {
        for (let i = 0; i < cachedElements.cauldronSlot.length; i++) {
          if (!cachedElements.cauldronSlot[i].childNodes[0]) {
            addToCauldron(cachedElements.cauldronSlot[i], item.childNodes[1].innerHTML);
            item.childNodes[5].innerHTML -= 1;
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

// Event listeners
cachedElements.span.onclick = () => {
  cachedElements.modal.classList.display = "none";
};
window.onclick = (event) => {
  if (event.target == cachedElements.modal) {
    cachedElements.modal.style.display = "none";
  }
};
cachedElements.modalClearButton.onclick = () => {
  cachedElements.cauldronSlot.forEach((item) => (item.innerHTML = ""));
  cachedElements.inventoryDeco.forEach((deco) => deco.classList.remove("selected-deco"));
};

const addToCauldron = (target, src) => {
  const img = document.createElement("img");
  img.src = `/static/images/elements/${src}.png`;
  img.classList.add("cauldronTempImg");
  target.appendChild(img);
};

const drawInventory = async () => {
  const data = await Request.getPlayer("get-inventory");
  let output = ``;

  for (let i = 0; i < data.length; i++) {
    output += `
    <li class="inventoryListItems" tabindex="1">
    <div class="cell inventory-slot-bg">
    <p class="invElementName" >${data[i].name}</p>
          <img src="/static/images/elements/${data[i].name}.png" class="inventoryImage" alt="inventory-slot">
        <p class="amount" style="font-size: .90rem;">${data[i].amount}</p>
      </div>
    </li>`;
  }
  return output;
};
