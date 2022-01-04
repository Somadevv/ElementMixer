import { getCookie } from "../crsf_token.js";

export const Request = {
  settings: {
    csrftoken: getCookie("csrftoken"),
    route: window.location.protocol + "//" + window.location.host + "/api/",
    userId: JSON.parse(document.getElementById("user_id").textContent),
  },
  // GET Method
  getDataRequest: async (endpoint) => {
    const response = await fetch(
      `${Request.settings.route}${endpoint}/${Request.settings.userId}`
    );
    const data = response.json();
    return data;
  },
  // POST Method
  updateDataRequest: async (endpoint, body) => {
    const response = await fetch(
      `${Request.settings.route}${endpoint}/${Request.settings.userId}/`,
      {
        credentials: "include",
        method: "POST",
        headers: {
          "X-CSRFToken": Request.settings.csrftoken,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const content = await response.json();
    return content;
  },
};




