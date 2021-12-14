import { Inventory } from "./inventory.js";
const inventory = new Inventory();

export class Buttons {
  constructor() {
    this.cachedDOM = {
      modal: document.getElementById("myModal"),
      openModal: document.querySelectorAll(".inventory-item"),
      close: document.querySelector(".closeButton"),
    };
  }
  buttons = () => {
    this.cachedDOM.openModal.forEach((element) => {
      element.addEventListener("click", () => {
        this.cachedDOM.modal.style.display = "block";
        // Render player inventory
      });
    });
  this.cachedDOM.close.onclick = () => {
    this.cachedDOM.modal.style.display = "none";
    
  };

  // When the user clicks anywhere outside of the openModal, close it
  window.onclick = (event) => {
    if (event.target == this.cachedDOM.modal) {
      this.cachedDOM.modal.style.display = "none";
    } 
  };
}}
