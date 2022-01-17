import { Request } from "../Services/API/fetchRequest.js";
(function () {
  "use strict";

  function Pagination() {
    const objJson = [
      { name: "Rain" },
      { name: "Sea" },
      { name: "Mud" },
      { name: "Dust" },
      { name: "Pressure" },
      { name: "Lava" },
      { name: "Energy" },
      { name: "Steam" },
      { name: "Wind" },
      { name: "Flood" },
      { name: "Plant" },
      { name: "Ocean" },
      { name: "Brick" },
      { name: "Gunpowder" },
      { name: "Atmosphere" },
      { name: "Obsidian" },
      { name: "Stone" },
      { name: "Earthquake" },
      { name: "Cloud" },
      { name: "Geyser" },
      { name: "Wave" },
      { name: "Hurricane" },
      { name: "Tobacco" },
      { name: "Swamp" },
      { name: "Moss" },
      { name: "Grass" },
      { name: "Coal" },
      { name: "Wall" },
      { name: "Explosion" },
      { name: "Volcano" },
      { name: "Ash" },
      { name: "Metal" },
      { name: "Sand" },
      { name: "Mountain" },
      { name: "Storm" },
      { name: "Fog" },
    
    ];

    const prevButton = document.getElementById("button_prev");
    const nextButton = document.getElementById("button_next");
    const clickPageNumber = document.querySelectorAll(".clickPageNumber");

    let current_page = 1;
    let records_per_page = 12;

    this.init = function () {
      changePage(1);
      pageNumbers();
      selectedPage();
      clickPage();
      addEventListeners();
    };

    let addEventListeners = function () {
      prevButton.addEventListener("click", prevPage);
      nextButton.addEventListener("click", nextPage);
    };

    let selectedPage = function () {
      let page_number = document.getElementById("page_number").getElementsByClassName("clickPageNumber");
      for (let i = 0; i < page_number.length; i++) {
        if (i == current_page - 1) {
          page_number[i].style.opacity = "1.0";
        } else {
          page_number[i].style.opacity = "0.3";
        }
      }
    };

    let checkButtonOpacity = function () {
      current_page == 1 ? prevButton.classList.add("opacity") : prevButton.classList.remove("opacity");
      current_page == numPages() ? nextButton.classList.add("opacity") : nextButton.classList.remove("opacity");
    };

    let changePage = function (page) {
      const listingTable = document.getElementById("listingTable");

      if (page < 1) {
        page = 1;
      }
      if (page > numPages() - 1) {
        page = numPages();
      }

      listingTable.innerHTML = "";

      //   for(var i = (page -1) * records_per_page; i < (page * records_per_page) && i < objJson.length; i++) {
      //       listingTable.innerHTML += "<div class='elementGridItem objectBlock'>" + objJson[i].name + "</div>";
      //   }
      for (var i = (page - 1) * records_per_page; i < page * records_per_page && i < objJson.length; i++) {
        listingTable.innerHTML += `<div class="elementGridItem">
            <p class="elementName" >${objJson[i].name}</p>
            <img class="elementGridImage" src="/static/images/elements/${objJson[i].name}.png" alt="inventory-slot">
            </div>`;
      }
      checkButtonOpacity();
      selectedPage();
    };

    let prevPage = function () {
      if (current_page > 1) {
        current_page--;
        changePage(current_page);
      }
    };

    let nextPage = function () {
      if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
      }
    };

    let clickPage = function () {
      document.addEventListener("click", function (e) {
        if (e.target.nodeName == "SPAN" && e.target.classList.contains("clickPageNumber")) {
          current_page = e.target.textContent;
          changePage(current_page);
        }
      });
    };

    let pageNumbers = function () {
      let pageNumber = document.getElementById("page_number");
      pageNumber.innerHTML = "";

      for (let i = 1; i < numPages() + 1; i++) {
        pageNumber.innerHTML += "<span class='paginator-button clickPageNumber'>" + i + "</span>";
      }
    };

    let numPages = function () {
      return Math.ceil(objJson.length / records_per_page);
    };
  }
  let pagination = new Pagination();
  pagination.init();
})();
