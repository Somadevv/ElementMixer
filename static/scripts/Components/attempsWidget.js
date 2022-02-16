const selectors = {
    attempsWidgetContent: document.getElementById('attempsWidgetContent'),
    cauldronSlot: document.querySelectorAll(".cauldron-slot"),
}
export const something = (x) => {
    const li = document.createElement('li')
    x.forEach((item) => (
        li.innerHTML += `<img src="../../static/images/game/elements/${item}-min.webp" alt="${item} image" class="attempts-image">`
        
    ))
    selectors.attempsWidgetContent.appendChild(li)
}

