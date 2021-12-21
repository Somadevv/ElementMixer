import * as MAIN from "../../main.js";
import { getCookie } from "../crsf_token.js";

const settings = {
  csrftoken: getCookie("csrftoken"),
  HOST: window.location.host,
};

class Inventory {
  // FETCH PLAYER INVENTORY
  async getPlayerInventory(playerId) {
    const response = await fetch(
      `http://${settings.HOST}/api/get-inventory/${playerId}`
    );
    let data = response.json();
    return data;
  }
  // UPDATE PLAYER INVENTORY
  async updatePlayerInventory(id, playerId, elements) {
    const data = {
      playerId: playerId,
      elements: elements,
    };
    const response = await fetch(
      `http://${settings.HOST}/api/update-inventory/${id}/`,
      {
        credentials: "include",
        method: "POST",
        headers: {
          "X-CSRFToken": settings.csrftoken,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const content = await response.json();

    console.log(content);
  }
}

let firstUpdate = new Inventory();
let push = await firstUpdate.updatePlayerInventory(2, 2, [4, 4, 4, 4]);


// let player1Elements = new Inventory();
// let data = await player1Elements.fetchInventory(2);
// console.log("data: ", data[0].elements);
