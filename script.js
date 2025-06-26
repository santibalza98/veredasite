
function toggleMenu() {
  const menu = document.querySelector('.nav-menu');
  menu.classList.toggle('active');
}

// Close the menu when a nav link is clicked
document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const menu = document.querySelector('.nav-menu');
      if (menu && menu.classList.contains('active')) {
        menu.classList.remove('active');
      }
    });
  });
});
