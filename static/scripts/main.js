import { Request } from "./Services/API/fetchRequest.js";
import { animateValues } from "./Components/animateValues.js";
(() => {
  const cachedElements = {
    desktopBackground: document.querySelector(".home-container"),
    mobileBackground: document.querySelector(".toggle-mobile"),
    mobileQuery: window.matchMedia("(max-width: 767px)"),
    playerCredits: document.getElementById("playerCredits"),
  };

  const checkQuery = (query) => {
    query.matches
      ? cachedElements.mobileBackground.classList.remove("disabled")
      : cachedElements.mobileBackground.classList.add("disabled");
  };

  const drawPlayerCredits = async () => {
    let data = await Request.getPlayerInfo()
    cachedElements.playerCredits.innerHTML = await data[0].credits
  };
  const givePlayerReward = async () => {
    const response = await fetch(`../../../app/api/add-reward/${JSON.parse(document.getElementById("user_id").textContent)}`)
    console.log(response)
  }

  const rewardGameLoop = () => {
    var timeleft = 50;
    var timer = setInterval(function(){
      if(timeleft <= 0){
        clearInterval(timer);
        rewardGameLoop()
        givePlayerReward()
        setTimeout(() => {
          drawPlayerCredits()
          
          animateValues(document.getElementById('amountTo'), 0, 100, 2000)
          
        },100);
        setTimeout(() => {
          
          document.getElementById('amountTo').innerHTML = ''
        }, 1000);
        
      } else {
        // animateValues(document.getElementById('countdown'), 0, 100, 2000)
        
        document.getElementById("countdown").innerHTML = timeleft;
      }
      timeleft -= 1;
    }, 1000);

  }
  // On document load
  document.addEventListener("DOMContentLoaded", async function (event) {
    
  drawPlayerCredits();
  
    rewardGameLoop();
  
  
    checkQuery(cachedElements.mobileQuery);
    cachedElements.mobileQuery.addListener(checkQuery);
  });
})();
