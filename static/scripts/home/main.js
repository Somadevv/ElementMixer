;(() => {
  const selectors = {
    mobileQuery: window.matchMedia('(max-width: 768px)'),
    mobileNavbar: document.getElementById('mobile-navbar'),
  }

  const checkQuery = (query) => {
    if (query.matches) {
      selectors.mobileNavbar.classList.remove('disabled')
    } else {
      selectors.mobileNavbar.classList.add('disabled')
    }
  }

  const hamburger = document.querySelector('.hamburger')
  const navMenu = document.querySelector('.nav-menu')
  const navLink = document.querySelectorAll('.nav-link')

  hamburger.addEventListener('click', mobileMenu)
  navLink.forEach((n) => n.addEventListener('click', closeMenu))

  function mobileMenu() {
    hamburger.classList.toggle('active')
    navMenu.classList.toggle('active')
  }

  function closeMenu() {
    hamburger.classList.remove('active')
    navMenu.classList.remove('active')
  }

  // On document load
  document.addEventListener('DOMContentLoaded', async function (event) {
    checkQuery(selectors.mobileQuery)
    selectors.mobileQuery.addListener(checkQuery)
  })
})()
