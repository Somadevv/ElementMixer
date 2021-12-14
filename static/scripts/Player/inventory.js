import { Inventory } from "../Components/inventory.js";

class PlayerInventory extends Inventory {
  constructor() {
    super();
    if (!PlayerInventory.instance) {
      this._data = ['slap'];
      PlayerInventory.instance = this;
    } else {
      throw () => {
        console.log("Cannot create new instance");
      };
    }
  } // End of constructor()


}

const instance = new PlayerInventory();
Object.freeze(instance);

export default instance;
