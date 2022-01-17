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

// const getElements = async () => {
//   const data = await Request.getElements();
//   let html = ``;

//   data &&
//     data.forEach(
//       (x) =>
//         (html += `<div><p class="elementName" >${x.name}</p>
//         <img src="/static/images/elements/${x.name}.png" alt="inventory-slot">
//         </div>`)
//     );

//   return html;
// };
