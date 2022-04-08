// Animate integers from x to y, used to improve user experience
export const animateValues = {
  positiveValues: (obj, start, end, duration) => {
    obj.innerHTML = ''

    let startTimestamp = null
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      obj.innerHTML = '+' + parseInt(Math.floor(progress * (end - start) + start))

      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
    setInterval(() => {
      obj.innerHTML = ''
    }, 4000)
  },

  negativeValues: (obj, start, end, duration) => {
    obj.innerHTML = ''

    let startTimestamp = null
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      obj.innerHTML = '-' + parseInt(Math.floor(progress * (end - start) + start))

      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
    setInterval(() => {
      obj.innerHTML = ''
    }, 4000)
  },
}
