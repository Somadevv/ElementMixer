import { Request } from "../Services/API/fetchRequest.js";

const cachedElements = {
  elementSlot: document.querySelectorAll(".element-slot"),
  toggleShopView: document.getElementById("toggleShop"),
  elementsList: document.getElementById("tableListing"),
};

export const drawElements = async () => {
  const data = await Request.getElements();
};
