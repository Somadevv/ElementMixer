import { getCookie } from "../crsf_token.js";

export const Request = {
  settings: {
    csrftoken: getCookie("csrftoken"),
    route: window.location.protocol + "//" + window.location.host + "/api/",
    userId: JSON.parse(document.getElementById("user_id").textContent),
  },
  // GET Method
  getPlayerInventory: async (endpoint) => {
    const response = await fetch(`${Request.settings.route}${endpoint}/${Request.settings.userId}`);
    const data = response.json();
    return data;
  },
  // POST Method
  updatePlayer: async (endpoint, body) => {
    const response = await fetch(`${Request.settings.route}${endpoint}/${Request.settings.userId}/`, {
      credentials: "include",
      method: "POST",
      headers: {
        "X-CSRFToken": Request.settings.csrftoken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const content = await response.json();
    return content;
  },
  checkElements: async (endpoint, body) => {
    const response = await fetch(`${Request.settings.route}${endpoint}`, {
      credentials: "include",
      method: "POST",
      headers: {
        "X-CSRFToken": Request.settings.csrftoken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const content = await response.json();
    return content;
  },
  getElements: async () => {
    const response = await fetch("../../../../app/api/list-elements");
    const data = response.json()
    return data;
  }, 

};


// const postSomeData = () => {
//   Request.updatePlayer("update-inventory", {
//     "playerId": Request.settings.userId,
//     "name": "Air",
//     "amount": 40,
//   });
// };
// postSomeData()
