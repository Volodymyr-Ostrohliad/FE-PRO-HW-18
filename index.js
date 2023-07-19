"use strict";

const productListLinks = document.querySelectorAll(".productList");

productListLinks.forEach(function (link) {
  link.addEventListener('click', function (event) {
    event.preventDefault();

    const typeCategory = this.nextElementSibling;
    const otherCategories = document.querySelectorAll('.typeCategory');

    otherCategories.forEach(function (category) {
      if (category !== typeCategory) {
        category.style.display = 'none';
        resetSubMenus(category);
      }
    });

    if (typeCategory.style.display === 'block') {
      typeCategory.style.display = 'none';
      resetSubMenus(typeCategory);
    } else {
      typeCategory.style.display = 'block';
    }
  });
});

const subCategoryLinks = document.querySelectorAll('.typeCategory > li > a');

subCategoryLinks.forEach(function (link) {
  link.addEventListener('click', function (event) {
    event.preventDefault();

    const subMenu = this.nextElementSibling;
    const otherSubMenus = document.querySelectorAll('.typeCategory ul');

    otherSubMenus.forEach(function (menu) {
      if (menu !== subMenu) {
        menu.style.display = 'none';
      }
    });

    if (subMenu.style.display === 'block') {
      subMenu.style.display = 'none';
      resetSubMenus(subMenu);
    } else {
      subMenu.style.display = 'block';
    }
  });
});

const menuContainer = document.querySelector('.container');

menuContainer.addEventListener('mouseleave', function () {
  const openCategories = document.querySelectorAll('.typeCategory');

  openCategories.forEach(function (category) {
    category.style.display = 'none';
    resetSubMenus(category);
  });
});

const buyButtons = document.querySelectorAll('.Product button');

buyButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    const shopWindows = document.querySelectorAll('.row');
    shopWindows.forEach(function (shopWindow) {
      shopWindow.style.display = 'flex';
    });
  });

});

function resetSubMenus(parentMenu) {
  const subMenus = parentMenu.querySelectorAll('.typeCategory ul');

  subMenus.forEach(function (subMenu) {
    subMenu.style.display = 'none';
  });
}
const purchasing = []


function onFormSubmit(event) {
  event.preventDefault()
  const { elements } = event.target
  const name = elements.name.value.trim()
  const amount = +elements.amount.value
  const city = elements.city.value
  const novaPoshta = elements.novaPoshta.value.trim()
  const radio = elements.radio.value
  const info = elements.info.value.trim()

  const errorElement = event.target.querySelector('.error')
  if (!name) {
    errorElement.innerText = 'Name cannot be empty'
    return
  }
  if (!novaPoshta) {
    errorElement.innerText = 'novaPoshta cannot be empty'
    return
  }
  if (!radio) {
    errorElement.innerText = 'Kind of payment cannot be empty'
    return
  }

  if (purchasing.some(p => p.name === name)) {
    errorElement.innerText = 'Such purchasing is already added'
    return
  }

  if (amount < 1 || amount > 1000000) {
    errorElement.innerText = 'Amount should be within 1 and 1000000'
    return
  }

  errorElement.innerText = ''
  addPurchasing(name, amount, city, novaPoshta, radio, info)
}

function addPurchasing(name, amount, city, novaPoshta, radio, info) {
  purchasing.push({
    name,
    amount,
    city,
    novaPoshta,
    radio,
    info
  })
  const shoppingListEl = document.querySelector('.shopping-list')
  const pElement = document.createElement('li')
  pElement.innerHTML = `<span>${'ПІБ:' + name} ${'Кількість:' + amount}, ${'Місто:' + city}, ${'Відділення:' + novaPoshta}, ${'Вид оплати:' + radio}, ${'Коментар:' + info}</span><button>X</button>`
  pElement.querySelector('button').onclick = () => {
    const msg = 'Are you sure you want to delete ' + name + 'from the list?'
    document.querySelector('.modal-dialog-text').innerHTML = msg
    document.querySelector('.modal-bg').style.display = ''

    document.querySelector('.yes-btn').onclick = () => {
      const itemIndexToDelete = purchasing.findIndex(p => p.name === name)
      purchasing.splice(itemIndexToDelete, 1)
      shoppingListEl.children[itemIndexToDelete].remove()

      document.querySelector('.modal-bg').style.display = 'none'
    }
  }
  shoppingListEl.append(pElement)
}

document.querySelector('.no-btn').onclick = () => {
  document.querySelector('.modal-bg').style.display = 'none'
}

document.querySelector('.modal-bg').onclick = () => {
  if (event.target.classList.contains('modal-bg')) {
    event.target.style.display = 'none'
  }
}