import { Request } from "./getRequest.js";

export const Inventory = {
  fetchInventory: async (endpoint) => {
    return await Request.getDataRequest(endpoint);
  },
  updateInventory: async (endpoint, body) => {
    return await Request.updateDataRequest(endpoint, body);
  },
};

const data = {
  playerId: Request.settings.userId,
  elements: [4, 4, 4, 1, 1, 1, 1, 1],
};
// let updateInventory = await Inventory.updateInventory("update-inventory", data);
// let getInventory = await Inventory.fetchInventory("get-inventory", data);
// console.log(getInventory[0].elements);

// const result = await inventory.reduce((acc, curr) => (acc[curr] = (acc[curr] || 0) + 1, acc), {})
