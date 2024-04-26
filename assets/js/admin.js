async function fetchSmartphones() {
  const response = await fetch('https://dummyjson.com/products');
  const data = await response.json();
  return data.products;
}

async function displaySmartphones() {
  const smartphonesContainer = document.querySelector('#smartphones');
  const smartphones = await fetchSmartphones();

  let smartphonesHTML = '';

  smartphones.forEach(smartphone => {
      smartphonesHTML += `
          <div class="telefon">
              <h2>${smartphone.title}</h2>
              <img src="${smartphone.thumbnail}" alt="${smartphone.title}">
              <p>Fiyat: ${smartphone.price}</p>
              <p>Stok: ${smartphone.stock}</p>
              <button class="addToCart" data-id="${smartphone.id}">Sepete Ekle</button>
              <button class="removeFromCart" data-id="${smartphone.id}">Sepetten Çıkar</button> <!-- Yeni buton -->
          </div>
      `;
  });

  smartphonesContainer.innerHTML = smartphonesHTML;

  // Sepete Ekle Butonlarına Olay Dinleyicisi Ekleme
  const addToCartButtons = document.querySelectorAll('.addToCart');
  addToCartButtons.forEach(button => {
      button.addEventListener('click', addToCart);
  });

  // Sepetten Çıkar Butonlarına Olay Dinleyicisi Ekleme
  const removeFromCartButtons = document.querySelectorAll('.removeFromCart');
  removeFromCartButtons.forEach(button => {
      button.addEventListener('click', removeFromCart);
  });
}

// Sepete Ekleme Fonksiyonu
function addToCart(event) {
  const phoneId = event.target.dataset.id;
  console.log(`Ürün ID ${phoneId} sepete eklendi.`);
  
  // Sepet öğelerini yerel depolamadan alma veya varsayılan olarak boş bir dizi oluşturma
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Eğer ürün zaten sepete eklenmişse, sayısını arttır; değilse yeni bir öğe olarak ekle
  const existingIndex = cartItems.findIndex(item => item.id === phoneId);
  if (existingIndex !== -1) {
    cartItems[existingIndex].quantity++; // Ürünün sayısını arttır
  } else {
    cartItems.push({ id: phoneId, quantity: 1 }); // Yeni ürünü sepete ekle
  }

  // Güncellenmiş sepet öğelerini tekrar yerel depolamaya kaydet
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Sepetten Çıkarma Fonksiyonu
function removeFromCart(event) {
  const phoneId = event.target.dataset.id;
  console.log(`Ürün ID ${phoneId} sepetten çıkarıldı.`);
  
  // Sepet öğelerini yerel depodan alma veya varsayılan olarak boş bir dizi oluşturma
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Eğer ürün sepete eklenmişse, sayısını azalt; eğer sayı 0 ise ürünü tamamen kaldır
  const existingIndex = cartItems.findIndex(item => item.id === phoneId);
  if (existingIndex !== -1) {
    if (cartItems[existingIndex].quantity > 1) {
      cartItems[existingIndex].quantity--; // Ürünün sayısını azalt
    } else {
      cartItems.splice(existingIndex, 1); // Ürünü sepetten kaldır
    }
  }

  // Güncellenmiş sepet öğelerini tekrar yerel depolamaya kaydet
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

displaySmartphones();

// Menü İşlevleri
const closeMenuBtn = document.querySelector('#closeMenu');
const openMenuBtn = document.querySelector('#openMenu');
const navPanelContainer = document.querySelector('.nav__panel-container');

function toggleMenu() {
  navPanelContainer.classList.toggle('expanded');
}

closeMenuBtn.addEventListener('click', toggleMenu);
openMenuBtn.addEventListener('click', toggleMenu);
navPanelContainer.addEventListener('click', (e) => {
  e.currentTarget === e.target && toggleMenu();
});
