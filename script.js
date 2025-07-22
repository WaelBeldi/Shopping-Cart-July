// Toggle menu
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

function toggleMenu() {
  navMenu.classList.toggle("active");
}

navToggle.addEventListener("click", toggleMenu);

// Toggle cart
const cartDropdown = document.getElementById("cart-dropdown");
const cartBtn = document.getElementById("cart-btn");
const cartClose = document.getElementById("cart-close");

function toggleCart() {
  cartDropdown.classList.toggle("active");
}

cartBtn.addEventListener("click", toggleCart);
cartClose.addEventListener("click", toggleCart);

// Toggle heart
const heartButtons = document.querySelectorAll(".heart-icon");

for (let i = 0; i < heartButtons.length; i++) {
  heartButtons[i].addEventListener("click", function () {
    heartButtons[i].classList.toggle("liked");
  });
}

// Cart functionality
let cart = [];
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const cartItems = document.getElementById("cart-items");

const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
for (let i = 0; i < addToCartButtons.length; i++) {
  addToCartButtons[i].addEventListener("click", function () {
    const productId = this.getAttribute("data-id");
    const productName = this.getAttribute("data-name");
    const productPrice = Number(this.getAttribute("data-price"));
    const productImage = this.getAttribute("data-image");

    addToCart(productId, productName, productPrice, productImage);

    // console.log(cart); // For debugging purposes
  });
}

function addToCart(id, name, price, image) {
  // Check if the product is already in the cart
  let existingProduct = null;

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
      quantity: 1,
    });
  }

  updateCartDisplay();
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
      cartItems.innerHTML += `<div class="cart-item" data-id="${item.id}">
                <img
                  src="${item.image}"
                  alt="micro casque gaming"
                  class="cart-item-image"
                />
                <div class="cart-item-info">
                  <div class="cart-item-name">${item.name}</div>
                  <div class="cart-item-price">$${item.price}</div>
                </div>
                <div class="cart-item-quantity">
                  <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                  <span class="quantity-number">${item.quantity}</span>
                  <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                </div>
                <button class="remove-item" onclick="removeFromCart('${item.id}')">
                  <i class="fas fa-trash"></i>
                </button>
              </div>`;
    }
  }
  // Update total price
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    total += item.price * item.quantity;
  }
  cartTotal.textContent = total.toFixed(2);
}

// Remove item from cart with animation
function removeFromCart(id) {
  const itemDiv = document.querySelector(`.cart-item[data-id='${id}']`);
  if (itemDiv) {
    itemDiv.classList.add("removing");
    itemDiv.addEventListener("animationend", function handler() {
      itemDiv.removeEventListener("animationend", handler);
      actuallyRemoveFromCart(id);
    });
  } else {
    actuallyRemoveFromCart(id);
  }
}

function actuallyRemoveFromCart(id) {
  let newCart = [];
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id !== id) {
      newCart.push(cart[i]);
    }
  }
  cart = newCart;
  updateCartDisplay();
}

// Update quantity in cart
function updateQuantity(id, change) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      cart[i].quantity += change;
      if (cart[i].quantity === 0) {
        removeFromCart(id);
      } else {
        updateCartDisplay();
      }
      break;
    }
  }
}

updateCartDisplay();

// HTMLCollection vs NodeList
// HTMLCollection is live, NodeList is static
// HTMLCollection updates automatically when the DOM changes, NodeList does not
// Example of HTMLCollection
const productsGrid = document.getElementsByClassName("products-grid");
// const products = document.getElementsByClassName("product-card");
// console.log(products.length); // Live collection
// let newProduct = document.createElement("div");
// newProduct.className = "product-card";
// productsGrid[0].appendChild(newProduct); // This will update the HTMLCollection
// console.log(products.length)

// Example of NodeList
const products = document.querySelectorAll(".product-card");
console.log(products.length); // Static collection
let newProduct = document.createElement("div");
newProduct.className = "product-card";
// productsGrid[0].appendChild(newProduct);
console.log(document.querySelectorAll(".product-card").length)

// Newsletter subscription
const newsletterEmail = document.getElementById("newsletter-email");
const newsletterSubmit = document.getElementById("newsletter-submit");
const newsletterForm = document.getElementById("newsletter-form");

// If using a form
if (newsletterForm) {
  newsletterForm.addEventListener("submit", function(e) {
    e.preventDefault();
    console.log("Newsletter email:", newsletterEmail.value);
    // You can add your subscription logic here
  });
}

// If using a button
if (newsletterSubmit) {
  newsletterSubmit.addEventListener("click", function() {
    let emailValue = newsletterEmail.value;
    alert(`Newsletter email: ${emailValue}`);
    newsletterEmail.value = "";
  });
}
