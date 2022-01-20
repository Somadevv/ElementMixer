import { Request } from "../Services/API/fetchRequest.js";

// Document object model selectors
const domSelectors = {
  modal: document.getElementById("myModal"),
  span: document.getElementsByClassName("closeButton")[0],
  inventoryList: document.querySelector(".inventoryList"),
  cauldronSlot: document.querySelectorAll(".cauldron-slot"),
  inventoryDeco: document.querySelectorAll(".inventoryModalDeco"),
  modalClearButton: document.getElementsByClassName("clearButton")[0],
  inventoryListItems: document.querySelectorAll("inventoryListItems"),
  inventoryImg: document.querySelectorAll(".inventoryImage"),
  blendButton: document.getElementById("blend"),
  failedView: document.getElementById("failedContainer"),
  playerCredits: document.getElementById("playerCredits"),
  amountTo: document.getElementById("amountTo"),
  discoveredNewContainer: document.getElementById("discoveredNewContainer"),
  discoveredNewName: document.getElementById("discoveredNewName"),
  discoveredNewImage: document.getElementById("discoveredNewImage"),
  discoveredNewReward: document.getElementById("discoveredNewReward"),
  discoveredNewClaimButton: document.getElementById("discoveredNewClaimButton"),

  discoveredContainer: document.getElementById("discoveredContainer"),
  discoveredImage: document.getElementById("discoveredImage"),
  discoveredName: document.getElementById("discoveredName"),
  discoveredClaimButton: document.getElementById("discoveredClaimButton"),
};

// Bad practice to set global variables, but it was unavoidable in this case.
const responseValues = {
  Element: null,
  Reward: null,
};

// Handle modal construct button
const handleBlendClick = async () => {
  // Remove the inventory decorators
  domSelectors.inventoryDeco.forEach((deco) => deco.classList.remove("selected-deco"));
  let cauldronElements = [];

  // Push each cauldron image to the cauldronElements array
  domSelectors.cauldronSlot.forEach((slot) => cauldronElements.push(slot.childNodes[1].innerHTML));
  domSelectors.blendButton.classList.add("button-disabled");

  let playerInfo = await Request.getPlayerInfo();
  let checkRecipe = await Request.checkCombination("check-elements", {
    combination: JSON.stringify(cauldronElements),
  });

  // Clear cauldron slots
  for (let i = 0; i < domSelectors.cauldronSlot.length; i++) {
    domSelectors.cauldronSlot[i].innerHTML = "";
  }

  // if the response contains 'Discovered' display relavant view modal
  if (checkRecipe.Discovered) {
    console.log(checkRecipe);
    responseValues.Reward = checkRecipe.Reward;
    domSelectors.discoveredNewContainer.classList.remove("disabled");
    drawDiscoveredNewImage(domSelectors.discoveredNewImage, checkRecipe.Discovered);
    domSelectors.discoveredNewName.innerHTML = `You found a new element!<br>${checkRecipe.Discovered}!`;
    domSelectors.discoveredNewReward.innerHTML = `${checkRecipe.Reward}`;
    // if the response contains 'Found' display relavant view modal
  } else if (checkRecipe.Found) {
    console.log(checkRecipe);
    domSelectors.discoveredContainer.classList.remove("disabled");
    drawDiscoveredNewImage(domSelectors.discoveredImage, checkRecipe.Found);
    domSelectors.discoveredName.innerHTML = `You found ${checkRecipe.Found}!`;
    // if none above, default to ->
  } else {
  }
  // handler to support modal view for when user discovers new element
  domSelectors.discoveredNewClaimButton.addEventListener("click", () => {
    domSelectors.discoveredNewContainer.classList.add("disabled");
    animateValue(
      domSelectors.playerCredits,
      playerInfo[0].credits - responseValues.Reward,
      playerInfo[0].credits,
      2000
    );
    domSelectors.amountTo.innerHTML = `+${responseValues.Reward}`;
    domSelectors.discoveredNewImage.innerHTML = "";
    domSelectors.discoveredNewName.innerHTML = "";
    domSelectors.discoveredNewReward.innerHTML = "";
  });
  // handler to support modal view for when user discovers an element they already own
  domSelectors.discoveredClaimButton.addEventListener("click", () => {
    domSelectors.discoveredContainer.classList.add("disabled");
    domSelectors.discoveredImage.innerHTML = "";
    domSelectors.discoveredName.innerHTML = "";
  });
};

// Animate integers from x to y, used to improve user experience
const animateValue = (obj, start, end, duration) => {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
};

// Handler for cauldron blend button
domSelectors.blendButton.addEventListener("click", async () => handleBlendClick());

// Toggle cauldron construct button
const toggleButtonState = () =>
  domSelectors.cauldronSlot[3].childNodes[0]
    ? domSelectors.blendButton.classList.remove("button-disabled")
    : domSelectors.blendButton.classList.add("button-disabled");

// Cauldron slot onclick
domSelectors.cauldronSlot.forEach((item) => {
  item.addEventListener("click", async () => {
    domSelectors.modal.style.display = "block";
    const data = await drawInventory();
    domSelectors.inventoryList.innerHTML = data;
    const inventoryItem = document.querySelectorAll(".inventoryItem");

    inventoryItem.forEach((item) => {
      item.childNodes[7].innerHTML <= 0 && (item.style.display = "none");
      item.addEventListener("click", () => {
        for (let i = 0; i < domSelectors.cauldronSlot.length; i++) {
          if (!domSelectors.cauldronSlot[i].childNodes[0]) {
            item.childNodes[7].innerHTML <= 0
              ? (item.style.display = "none")
              : (addToCauldron(
                  domSelectors.cauldronSlot[i],
                  item.childNodes[1].innerHTML,
                  item.childNodes[5].innerHTML
                ),
                (item.childNodes[7].innerHTML -= 1),
                domSelectors.inventoryDeco[i].classList.add("selected-deco"));
            // If the last cauldron slot contains a child node, close the modal
            domSelectors.cauldronSlot[3].childNodes.length >= 1 && (domSelectors.modal.style.display = "none");

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

// Draws discoveredImage to target
const drawDiscoveredNewImage = (target, src) => {
  const img = document.createElement("img");
  img.src = `/static/images/elements/${src}.png`;
  img.classList.add("cauldronTempImg");
  target.appendChild(img);
};

// Draws image from inventory to cauldron slot
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

// Closes inventory modal
domSelectors.span.addEventListener("click", () => {
  domSelectors.modal.style.display = "none";
});
// Closes inventory modal outside of the modal
window.onclick = (event) => {
  if (event.target == domSelectors.modal) {
    domSelectors.modal.style.display = "none";
  }
};

// Onclick handleer for modal clear button
const handleModalClearClick = async () => {
  domSelectors.cauldronSlot.forEach((item) => (item.innerHTML = ""));
  domSelectors.inventoryDeco.forEach((deco) => deco.classList.remove("selected-deco"));

  // Redraws user inventory (duplicate code)
  const data = await drawInventory();
  domSelectors.inventoryList.innerHTML = data;
  const inventoryItem = document.querySelectorAll(".inventoryItem");
  inventoryItem.forEach((item) => {
    item.childNodes[7].innerHTML <= 0 && (item.style.display = "none");
    item.addEventListener("click", () => {
      for (let i = 0; i < domSelectors.cauldronSlot.length; i++) {
        if (!domSelectors.cauldronSlot[i].childNodes[0]) {
          item.childNodes[7].innerHTML <= 0
            ? (item.style.display = "none")
            : (addToCauldron(
                domSelectors.cauldronSlot[i],
                item.childNodes[1].innerHTML,
                item.childNodes[5].innerHTML
              ),
              (item.childNodes[7].innerHTML -= 1),
              domSelectors.inventoryDeco[i].classList.add("selected-deco"));
          // If the last cauldron slot contains a child node, close the modal
          domSelectors.cauldronSlot[3].childNodes.length >= 1 && (domSelectors.modal.style.display = "none");
          break;
        } else {
          continue;
        }
      }

      toggleButtonState();
    });
  });
};

// Modal clear button
domSelectors.modalClearButton.onclick = async () => {
  handleModalClearClick();
};

// Draw inventory to DOM (inventory modal)
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
