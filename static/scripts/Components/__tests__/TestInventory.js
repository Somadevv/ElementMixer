import { Inventory } from "../inventory.js";

test("The list should give us two items", () => {
  const inv = new Inventory();
  const items = inv.listItems();
  expect(items.length).toBe(2);
});

test("Adding something to the list", () => {
  const inv = new Inventory();
  expect(inv.listItems().length).toBe(2);
  inv.addItem("Something");
  expect(inv.listItems().length).toBe(3);
});

test("remove an item", () => {
  const inv = new Inventory();
  expect(inv.listItems().length).toBe(2);
  inv.deleteItem("yo");
  expect(inv.listItems().length).toBe(1);
});

test("");
// Test render function passes correct inventory