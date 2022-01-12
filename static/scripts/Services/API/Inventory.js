import { Request } from "./fetchRequest.js";

export const Inventory = {
  fetchInventory: async (endpoint) => {
    return await Request.getDataRequest(endpoint);
  },
  updateInventory: async (endpoint, body) => {
    return await Request.updateDataRequest(endpoint, body);
  },
};


