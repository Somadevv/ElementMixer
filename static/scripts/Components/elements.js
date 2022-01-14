import { Request } from "../Services/API/fetchRequest.js";

const cachedElements = {
  elementSlot: document.querySelectorAll(".element-slot"),
  toggleShopView: document.getElementById("toggleShop"),
  elementsList: document.getElementById("elements-list"),
};
export const drawElements = async () => {
    const data = await getElements();
    cachedElements.elementsList.innerHTML = data;
  };
const getElements = async () => {
  const data = await Request.getElements();
  let output = ``;

  for (let i = 0; i < data.length; i++) {
    output += `
      <div>
      <p class="elementName" >${data[i].name}</p>
            <img src="/static/images/elements/${data[i].name}.png" class="invImg" alt="inventory-slot">
      </div>`;
  }
  return output;
};
