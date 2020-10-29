const groupList = [
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