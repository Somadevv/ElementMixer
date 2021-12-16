import { Inventory } from "../Components/inventory.js";

class PlayerInventory extends Inventory {
  constructor() {
    super();
    if (!PlayerInventory.instance) {
      this._data = ['fire', 'water'];
      PlayerInventory.instance = this;
    } else {
      throw () => {
        console.log("Cannot create new instance");
      };
    }
  } 


}

const instance = new PlayerInventory();
Object.freeze(instance);

export default instance;
