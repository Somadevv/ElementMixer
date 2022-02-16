import { Request } from "../Services/API/fetchRequest.js";
import { animateValues } from "./animateValues.js";
import { something } from "./attempsWidget.js";

// Document object model selectors
const selectors = {
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

// Object to hold temporary response values
const responseValues = {
  Element: null,
  Reward: null,
};

// Handle modal construct button
const handleBlendClick = async () => {
  // Remove the inventory decorators
  selectors.inventoryDeco.forEach((deco) => deco.classList.remove("selected-deco"));
  let cauldronElements = [];
  let cauldronAltValues = [];
  // Push each cauldron image to the cauldronElements array
  selectors.cauldronSlot.forEach((slot) => {
    cauldronElements.push(slot.childNodes[1].innerHTML);
    cauldronAltValues.push(slot.childNodes[0].alt);
  });
  selectors.blendButton.classList.add("button-disabled");

  let playerInfo = await Request.getPlayerInfo();
  let checkRecipe = await Request.checkCombination("check-elements", {
    combination: JSON.stringify(cauldronElements),
  });

  // Clear cauldron slots
  for (let i = 0; i < selectors.cauldronSlot.length; i++) {
    selectors.cauldronSlot[i].innerHTML = "";
  }

  // if the response contains 'Discovered' display relavant view modal
  if (checkRecipe.Discovered) {
    console.log(checkRecipe);
    responseValues.Reward = checkRecipe.Reward;
    selectors.discoveredNewContainer.classList.remove("disabled");
    drawDiscoveredNewImage(selectors.discoveredNewImage, checkRecipe.Discovered);
    selectors.discoveredNewName.innerHTML = `You found a new element! ${checkRecipe.Discovered}!`;
    selectors.discoveredNewReward.innerHTML = `${checkRecipe.Reward}`;
    // if the response contains 'Found' display relavant view modal
  } else if (checkRecipe.Found) {
    console.log(checkRecipe);
    selectors.discoveredContainer.classList.remove("disabled");
    drawDiscoveredNewImage(selectors.discoveredImage, checkRecipe.Found);
    selectors.discoveredName.innerHTML = `You found ${checkRecipe.Found}!`;
    // if none above, default to ->
  } else {
    // Create error notification
    const errorDiv = document.createElement("div");
    errorDiv.id = "noDiscoveryNotification";
    const target = document.getElementsByClassName("home-container")[0];
    errorDiv.innerHTML = "No element was found, try again!";
    target.appendChild(errorDiv);
  }
  // handler to support modal view for when user discovers new element
  selectors.discoveredNewClaimButton.addEventListener("click", () => {
    const incrementAmountValue = document.createElement("p");
    document.getElementById("amountTo").innerHTML = "";
    selectors.discoveredNewContainer.classList.add("disabled");
    animateValues(
      selectors.playerCredits,
      playerInfo[0].credits - responseValues.Reward,
      playerInfo[0].credits,
      2000
    );
    // selectors.amountTo.innerHTML = `+${responseValues.Reward}`;
    // Animation to display + reward
    incrementAmountValue.id = "incrementAmountValue";
    const target = document.getElementById("amountTo");
    incrementAmountValue.innerHTML = `+ ${checkRecipe.Reward}`;
    target.appendChild(incrementAmountValue);
    selectors.discoveredNewImage.innerHTML = "";
    selectors.discoveredNewName.innerHTML = "";
    selectors.discoveredNewReward.innerHTML = "";
  });
  // handler to support modal view for when user discovers an element they already own
  selectors.discoveredClaimButton.addEventListener("click", () => {
    selectors.discoveredContainer.classList.add("disabled");
    selectors.discoveredImage.innerHTML = "";
    selectors.discoveredName.innerHTML = "";
  });
};

// Handler for cauldron blend button
selectors.blendButton.addEventListener("click", async () => handleBlendClick());

// Toggle cauldron construct button
const toggleButtonState = () =>
  selectors.cauldronSlot[3].childNodes[0]
    ? selectors.blendButton.classList.remove("button-disabled")
    : selectors.blendButton.classList.add("button-disabled");

// selectors.cauldronSlot.forEach((item) => {
//   item.addEventListener("click", async () => {
//     console.log("asd")
//   })})

// Cauldron slot onclick
selectors.cauldronSlot.forEach((item) => {
  item.addEventListener("click", async () => {
    console.log("ads");
    selectors.modal.style.display = "block";
    const data = await drawInventory();
    selectors.inventoryList.innerHTML = data;
    const inventoryItem = document.querySelectorAll(".inventoryItem");

    inventoryItem.forEach((item) => {
      item.childNodes[7].innerHTML <= 0 && (item.style.display = "none");
      item.addEventListener("click", () => {
        for (let i = 0; i < selectors.cauldronSlot.length; i++) {
          if (!selectors.cauldronSlot[i].childNodes[0]) {
            item.childNodes[7].innerHTML <= 0
              ? (item.style.display = "none")
              : (addToCauldron(
                  selectors.cauldronSlot[i],
                  item.childNodes[1].innerHTML,
                  item.childNodes[5].innerHTML
                ),
                (item.childNodes[7].innerHTML -= 1),
                selectors.inventoryDeco[i].classList.add("selected-deco"));
            // If the last cauldron slot contains a child node, close the modal
            selectors.cauldronSlot[3].childNodes.length >= 1 && (selectors.modal.style.display = "none");

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
  img.src = `/static/images/game/elements/${src}-min.webp`;
  img.classList.add("cauldronTempImg");
  target.appendChild(img);
};

// Draws image from inventory to cauldron slot
const addToCauldron = (target, name, id) => {
  const img = document.createElement("img");
  const elementId = document.createElement("p");
  img.src = `/static/images/game/elements/${name}-min.webp`;
  img.classList.add("cauldronTempImg");
  img.alt = name;
  elementId.innerHTML = id;
  elementId.style.display = "none";
  target.appendChild(img);
  target.appendChild(elementId);
};

// Closes inventory modal
selectors.span.addEventListener("click", () => {
  selectors.modal.style.display = "none";
});
// Closes inventory modal outside of the modal
window.onclick = (event) => {
  if (event.target == selectors.modal) {
    selectors.modal.style.display = "none";
  }
};

// Onclick handleer for modal clear button
const handleModalClearClick = async () => {
  selectors.cauldronSlot.forEach((item) => (item.innerHTML = ""));
  selectors.inventoryDeco.forEach((deco) => deco.classList.remove("selected-deco"));

  // Redraws user inventory (duplicate code)
  const data = await drawInventory();
  selectors.inventoryList.innerHTML = data;
  const inventoryItem = document.querySelectorAll(".inventoryItem");
  inventoryItem.forEach((item) => {
    item.childNodes[7].innerHTML <= 0 && (item.style.display = "none");
    item.addEventListener("click", () => {
      for (let i = 0; i < selectors.cauldronSlot.length; i++) {
        if (!selectors.cauldronSlot[i].childNodes[0]) {
          item.childNodes[7].innerHTML <= 0
            ? (item.style.display = "none")
            : (addToCauldron(
                selectors.cauldronSlot[i],
                item.childNodes[1].innerHTML,
                item.childNodes[5].innerHTML
              ),
              (item.childNodes[7].innerHTML -= 1),
              selectors.inventoryDeco[i].classList.add("selected-deco"));
          // If the last cauldron slot contains a child node, close the modal
          selectors.cauldronSlot[3].childNodes.length >= 1 && (selectors.modal.style.display = "none");
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
selectors.modalClearButton.onclick = async () => {
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
    <img src="/static/images/game/elements/${data[i].name}-min.webp" class="inventoryImage" alt="inventory-slot">
    <p class="elementId disabled">${data[i].eleId}</p>
        <p class="amount" style="font-size: .90rem;">${data[i].amount}</p>
      </div>
    </li>`;
  }
  return output;
};
