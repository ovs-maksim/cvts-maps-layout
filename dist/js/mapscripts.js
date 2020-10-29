let loadingFrameText = $("<div>").addClass('loading-frame__text').html('Название ресурса');
let loadingFramePic = $("<div>").addClass('loading-frame__pic');
let loadingFrame = $("<div>").addClass('loading-frame').append(loadingFramePic).append(loadingFrameText);
$('body').append(loadingFrame);

loadingFrame.fadeOut(1000, function() {
  this.remove();
});;const fullMenuCloseButton = document.querySelector('#fullMenuCloseButton');
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
};const groupList = [
  {
    id: 1,
    name: 'Группа 1',
    key: 'groupone',
    layers: []
  },
  {
    id: 2,
    name: 'Группа 2',
    key: 'grouptwo',
    layers: []
  },
  {
    id: 3,
    name: 'Группа 3',
    key: 'groupthree',
    layers: []
  }
]

for (var i = 0; i < groupList.length; i++) { // Для каждой группы из этого массива
  
  const group = groupList[i];
  const groupName = group.name;
  const groupKey = group.key;

  let topmenuItemClass = () => {
    if (groupName == 'Группа 1') return 'menu__item menu__item_active'
    else return 'menu__item'
  }

  let fullmenuItemClass = () => {
    if (groupName == 'Группа 1') return 'fullmenu__item fullmenu__item_active'
    else return 'fullmenu__item'
  }

  let fullmenuDesktopItemClass = () => {
    if (groupName == 'Группа 1') return 'fullmenu-desktop__item fullmenu-desktop__item_active'
    else return 'fullmenu-desktop__item'
  }

  $('#menu-list').append(`
  <li class='${topmenuItemClass()}' id="${groupKey}">
    <button class="menu__btn">${groupName}</button>
  </li>
  `)

  $('#fullmenu-list').append(`
  <li class="${fullmenuItemClass()}" id="${groupKey}-full">
    <button class="fullmenu__link">${groupName}</button>
  </li>
  `)

  $('#fullmenu-desktop-list').append(`
  <li class="${fullmenuDesktopItemClass()}" id="${groupKey}-full-desktop">
    <button class="fullmenu-desktop__link">${groupName}</button>
  </li>
  `)

}


// ставим или убираем активный класс при нажатии на пункт меню
const switchLayersVisibility = function(e) {
  e.preventDefault();
  groupTargetId = e.currentTarget.id.split('-')[0];

  $(`#${groupTargetId}`).toggleClass('menu__item_active');
  $(`#${groupTargetId}-full`).toggleClass('fullmenu__item_active');
  $(`#${groupTargetId}-full-desktop`).toggleClass('fullmenu-desktop__item_active');
}

$('.menu__item').on('click', function(e) {
  switchLayersVisibility(e);
})

$('.fullmenu__item').on('click', function(e) {
  switchLayersVisibility(e);
})

$('.fullmenu-desktop__item').on('click', function(e) {
  switchLayersVisibility(e);
})