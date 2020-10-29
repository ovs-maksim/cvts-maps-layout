const fullMenuCloseButton = document.querySelector('#fullMenuCloseButton');
const fullMenuDesktopCloseButton = document.querySelector('#fullMenuDesktopCloseButton');
const fullMenu = document.querySelector('.fullmenu');
const hamburgerButton = document.querySelector('.hamburger-menu');
const hamburgerButtonDesktop = document.querySelector('.hamburger-menu-desktop');
const fullMenuLink = document.querySelectorAll('.fullmenu__item');
const desktopMenu = $('.fullmenu-desktop');
let isMenuHidden;

const touchMenu = TouchMenuLA({
  target: document.getElementById('fullmenu'),
  width: 300,
  disableSlide: true
});

// Закрытие полноэкранного меню по кнопке Х
fullMenuCloseButton.addEventListener('click', function(e) {
  e.preventDefault();
  touchMenu.close();
});

// Открытие полноэкранного меню по кнопке "гамбургер"
hamburgerButton.addEventListener('click', function(e) {
  e.preventDefault();
  touchMenu.open();
});

hamburgerButtonDesktop.addEventListener('click', function(e) {
  toggleDesktopMenu(e);
});

fullMenuDesktopCloseButton.addEventListener('click', function(e) {
  toggleDesktopMenu(e);
});

const toggleDesktopMenu = (e = null) => {
  if (e) e.preventDefault();
  desktopMenu.toggleClass('fullmenu-desktop_hidden');
  isMenuHidden = desktopMenu.hasClass('fullmenu-desktop_hidden');
  return isMenuHidden;
}