export class Inventory {
  inventory = ['yo', 'asd']
  listItems() {
    return console.log('inventory: ', this.inventory)
  }
  addItem = (item) => {
    this.inventory.push(item)
  }
  deleteItem(item) {
   this.inventory.pop(item)
  }
}

