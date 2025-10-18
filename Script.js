const menuButton = document.getElementById('menu-button');
const sideMenu = document.getElementById('sideMenu');
const overlay = document.getElementById('overlay');

menuButton.addEventListener('click', () => {
  sideMenu.classList.toggle('open');
  overlay.classList.toggle('show');
});

overlay.addEventListener('click', () => {
  sideMenu.classList.remove('open');
  overlay.classList.remove('show');
});
