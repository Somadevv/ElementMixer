import { Request } from './Services/API/fetchRequest.js'
import { animateValues } from './Components/animateValues.js'
const cachedElements = {
  desktopBackground: document.querySelector('.home-container'),
  mobileBackground: document.querySelector('.toggle-mobile'),
  mobileQuery: window.matchMedia('(max-width: 767px)'),
  playerCredits: document.getElementById('playerCredits'),
  stripeMobile: document.getElementById('stripe-mobile'),
}

export const drawPlayerCredits = async (target) => {
  let data = await Request.getPlayerInfo()
  target.innerHTML = await data[0].credits
}
;(() => {
  const checkQuery = (query) => {
    query.matches
      ? (cachedElements.mobileBackground.classList.remove('disabled'),
        cachedElements.stripeMobile.classList.remove('disabled'))
      : (cachedElements.mobileBackground.classList.add('disabled'),
        cachedElements.stripeMobile.classList.add('disabled'))
  }

  const givePlayerReward = async () => {
    await fetch(`../../../app/api/add-reward/${JSON.parse(document.getElementById('user_id').textContent)}`)
  }

  const rewardGameLoop = () => {
    let timeleft = 180
    let html = `<img src="../../static/images/game/icons/cauldron_icon-min.webp" width="25px" height="25px">x150 | <i class="fa-regular fa-clock"></i> `
    let timer = setInterval(function () {
      if (timeleft <= 0) {
        clearInterval(timer)
        rewardGameLoop()
        givePlayerReward()
        setTimeout(() => {
          animateValues.positiveValues(document.getElementById('amountTo'), 0, 75, 2000)
          drawPlayerCredits(cachedElements.playerCredits)
        }, 100)
        setTimeout(() => {
          document.getElementById('amountTo').innerHTML = ''
        }, 1000)
      } else {
        document.getElementById('countdown').innerHTML = html + timeleft
      }
      timeleft -= 1
    }, 1000)
  }
  // On document load
  document.addEventListener('DOMContentLoaded', async function (event) {
    drawPlayerCredits(cachedElements.playerCredits)
    rewardGameLoop()
    checkQuery(cachedElements.mobileQuery)
    cachedElements.mobileQuery.addListener(checkQuery)
  })
})()
