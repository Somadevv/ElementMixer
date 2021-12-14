export class Inventory {
  constructor() {
      this._data = [];
  }
  listItems() {
    console.log('inventory: ', this._data)
    return this._data
  }
  addItem = (item) => {
    this._data.push(item)
  }
  deleteItem(item) {
   this._data.pop(item)
  }
}





