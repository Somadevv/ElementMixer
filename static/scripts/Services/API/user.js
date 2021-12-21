import { getCookie } from "../crsf_token.js";


const settings = {
    csrftoken: getCookie("csrftoken"),
    HOST: window.location.host,
  };


class User {
    // FETCH PLAYER INVENTORY
  async getUser(userId) {
    const response = await fetch(
      `http://${settings.HOST}/api/get-inventory/${userId}`
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