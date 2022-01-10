import { Request } from "./Services/API/getRequest.js";

const cachedElements = {
  modal: document.getElementById("myModal"),
  span: document.getElementsByClassName("closeButton")[0],
  inventoryList: document.querySelector(".inventoryList"),
  cauldronSlot: document.querySelectorAll(".cauldron-slot"),
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
          cachedElements.cauldronSlot[i].childNodes[i] ? console.log("empty") : console.log("not empty");
        }

        // item.childNodes[5].innerHTML -= 1;
      });
    });
  });
});
cachedElements.span.onclick = () => {
  cachedElements.modal.classList.display = "none";
};
window.onclick = (event) => {
  if (event.target == cachedElements.modal) {
    cachedElements.modal.style.display = "none";
  }
};
// item.childNodes[1].innerHTML

const addToCauldron = (target, src) => {
  const img = document.createElement("img");
  img.src = `/static/images/${src}.png`;
  img.classList.add("invImg");
  target.appendChild(img);
};

const drawInventory = async () => {
  const data = await Request.getDataRequest("get-inventory");
  let output = ``;

  for (let i = 0; i < data.length; i++) {
    output += `
    <li id="alive" style="z-index: 5;">
    <div class="cell inventory-slot-bg" style="z-index: 4;">
    <p>${data[i].name}</p>
        <img src="/static/images/${data[i].name}.png" class="invImg" alt="inventory-slot">
        <p class="amount" style="font-size: .75rem;">${data[i].amount}</p>
      
    </div> </li>`;
  }
  return output;
};
