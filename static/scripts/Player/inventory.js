import { Inventory } from "../Components/inventory.js";
let inventory = new Inventory();
let inventoryItem = document.getElementById("item");


export class PlayerInventory extends Inventory {
  render() {
    inventoryItem.innerHTML = inventory.inventory
    
  }
}
PlayerInventory.prototype.render();
