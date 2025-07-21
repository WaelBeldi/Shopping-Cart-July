// Toggle menu
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

function toggleMenu() {
  navMenu.classList.toggle('active');
}

navToggle.addEventListener("click", toggleMenu)

// Toggle cart
const cartDropdown = document.getElementById('cart-dropdown');
const cartBtn = document.getElementById('cart-btn');
const cartClose = document.getElementById('cart-close');

function toggleCart() {
  cartDropdown.classList.toggle('active');
}

cartBtn.addEventListener("click", toggleCart);
cartClose.addEventListener("click", toggleCart);

// Toggle heart
const heartButtons = document.querySelectorAll('.heart-icon');

for (let i = 0; i < heartButtons.length; i++) {
  heartButtons[i].addEventListener("click", function() {
    heartButtons[i].classList.toggle('liked');
  });
}

// Cart functionality
let cart = [];
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const cartItems = document.getElementById('cart-items');

const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
for (let i = 0; i < addToCartButtons.length; i++) {
  addToCartButtons[i].addEventListener("click", function() {
    const productId = this.getAttribute('data-id');
    const productName = this.getAttribute('data-name');
    const productPrice = Number(this.getAttribute('data-price'));
    const productImage = this.getAttribute('data-image');
  
    addToCart(productId, productName, productPrice, productImage);

    console.log(cart); // For debugging purposes
  });
}

function addToCart(id, name, price, image) {
  // Check if the product is already in the cart
  let existingProduct = null

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      existingProduct = cart[i];
      break;
    }
  }

  if (existingProduct) {
    // If the product is already in the cart, increase the quantity
    existingProduct.quantity++;
  } else {
    // If the product is not in the cart, add it
    cart.push({
      id: id,
      name: name,
      price: price,
      image: image,
      quantity: 1
    });
  }

  updateCartDisplay()
}

function updateCartDisplay() {
  let totalItems = 0;

  for (let i = 0; i < cart.length; i++) {
    totalItems += cart[i].quantity;
  }

  cartCount.textContent = totalItems;

  // Update display of cart items
  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
  } else {
    cartItems.innerHTML = "";
    for (let i = 0; i < cart.length; i++) {
      let item = cart[i];
      cartItems.innerHTML += "<div class='cart-item'>item</div>";
    }
  }
}

updateCartDisplay()