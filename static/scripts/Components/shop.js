import { Request } from '../Services/API/fetchRequest.js'
import { animateValues } from '../Components/animateValues.js'
import { drawPlayerCredits } from '../main.js'
const selectors = {
  shopButton: document.querySelectorAll('.shopBuyButton'),
  quantityIncrement: document.querySelectorAll('.quantityIncrement'),
  quantityDecrement: document.querySelectorAll('.quantityDecrement'),
  quantityValue: document.querySelectorAll('.quantityValue'),
}

selectors.quantityIncrement.forEach((item) => {
  item.addEventListener('click', () => {
    item.previousElementSibling.innerHTML++
    item.previousElementSibling.previousElementSibling.style.opacity = 1
  })
})

selectors.quantityDecrement.forEach((item) => {
  item.style.opacity = 0.3
  item.addEventListener('click', () => {
    item.nextSibling.nextSibling.innerHTML <= 1
      ? (item.style.opacity = 0.3)
      : item.nextSibling.nextSibling.innerHTML--

    item.nextSibling.nextSibling.innerHTML == 1 && (item.style.opacity = 0.3)
  })
})

selectors.shopButton.forEach((item) => {
  item.addEventListener('click', () => {
    // name = item.previousElementSibling.childNodes[1].innerHTML
    // quantity = item.previousElementSibling.childNodes[5].childNodes[3].innerHTML

    Request.purchaseElements({
      name: item.previousElementSibling.childNodes[1].innerHTML,
      amount: parseInt(item.previousElementSibling.childNodes[5].childNodes[3].innerHTML),
    })

    const result = 50 * parseInt(item.previousElementSibling.childNodes[5].childNodes[3].innerHTML)
    animateValues.negativeValues(document.getElementById('amountToNegative'), 0, result, 1500)
    item.previousElementSibling.childNodes[5].childNodes[3].innerHTML = 1
    item.previousElementSibling.childNodes[5].childNodes[1].style.opacity = 0.2

    setInterval(() => {
      drawPlayerCredits(document.getElementById('playerCredits'))
    }, 1000)
  })
})

// const testy = document.getElementById('testy')

// testy.addEventListener('click', () => {
//   Request.testy()
// })
