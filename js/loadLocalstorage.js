document.addEventListener('DOMContentLoaded', () => {
  const archiveArray = []

  window.onload = function () {
    if (localStorage.getItem('already-loaded') === null) {
      localStorage.setItem('already-loaded', true)
      localStorage.setItem('dark-mode', false)
      localStorage.setItem('archive', JSON.stringify(archiveArray))
      localStorage.setItem('world', true)
      localStorage.setItem('health', true)
      localStorage.setItem('sports', true)
      localStorage.setItem('business', true)
      localStorage.setItem('travel', true)

      window.location.reload()
    }
  }
})
