import { Request } from "../Services/API/fetchRequest.js";

const selectors = {
  shopButton: document.querySelectorAll(".shopBuyButton"),
  quantityIncrement: document.querySelectorAll(".quantityIncrement"),
  quantityDecrement: document.querySelectorAll(".quantityDecrement"),
  quantityValue: document.querySelectorAll(".quantityValue"),
};

selectors.quantityIncrement.forEach((item) => {
  // if the count is 1 or lower then stop count, else continue
  item.addEventListener("click", () => {
    item.previousElementSibling.innerHTML++;
    item.previousElementSibling.previousElementSibling.style.opacity = 1;
  });
});

selectors.quantityDecrement.forEach((item) => {
  item.style.opacity = 0.3;
  item.addEventListener("click", () => {
    if (item.nextSibling.nextSibling.innerHTML <= 1) {
      item.style.opacity = 0.3;
    } else {
      item.nextSibling.nextSibling.innerHTML--;
    }
    if (item.nextSibling.nextSibling.innerHTML == 1) {
      item.style.opacity = 0.3;
    }
  });
});

selectors.shopButton.forEach((item) => {
  item.addEventListener("click", () => {
    Request.purchaseElements({
      name: item.previousElementSibling.previousElementSibling.innerHTML,
      amount: item.previousElementSibling.childNodes[5].innerHTML,
    });

    item.previousElementSibling.childNodes[5].innerHTML = 1;
    item.previousElementSibling.childNodes[3].style.opacity = 0.3;
  });
});
