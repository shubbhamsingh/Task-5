// --- 1. Product Data (Simulating API) ---
const products = [
  {
    id: 1,
    name: "Wireless Noise Cancelling Headphones",
    price: 299,
    category: "Audio",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Mechanical Gaming Keyboard",
    price: 149,
    category: "Gaming",
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Smart Fitness Watch",
    price: 199,
    category: "Wearables",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Ultra HD 4K Monitor",
    price: 450,
    category: "Display",
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
];

// --- 2. Initialize App ---
const productGrid = document.getElementById("product-grid");
const cartItemsContainer = document.getElementById("cart-items");
const cartCountEl = document.getElementById("cart-count");
const cartTotalEl = document.getElementById("cart-total");
const cartSidebar = document.getElementById("cart-sidebar");
const overlay = document.getElementById("overlay");

// Load cart from LocalStorage or empty array
let cart = JSON.parse(localStorage.getItem("techGearCart")) || [];

// Render Products on Load
function displayProducts() {
  productGrid.innerHTML = products
    .map(
      (product) => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
            <div class="product-info">
                <span class="category">${product.category}</span>
                <h3 class="product-title">${product.name}</h3>
                <div class="price-row">
                    <span class="price">$${product.price}</span>
                    <button onclick="addToCart(${product.id})" class="add-btn">
                        <i class="fas fa-plus"></i> Add
                    </button>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

// --- 3. Cart Functionality ---
function addToCart(id) {
  const product = products.find((p) => p.id === id);
  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    existingItem.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartUI();
  showToast(`Added ${product.name} to cart`);
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCartUI();
}

function updateCartUI() {
  // Save to LocalStorage
  localStorage.setItem("techGearCart", JSON.stringify(cart));

  // Update Badge
  cartCountEl.innerText = cart.reduce((acc, item) => acc + item.qty, 0);

  // Update Total Price
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  cartTotalEl.innerText = `$${total.toFixed(2)}`;

  // Render Cart Items
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<div class="empty-cart-msg">Your cart is empty 😔</div>`;
  } else {
    cartItemsContainer.innerHTML = cart
      .map(
        (item) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <h4>${item.name}</h4>
                    <p>$${item.price} x ${item.qty}</p>
                    <span class="remove-item" onclick="removeFromCart(${item.id})">Remove</span>
                </div>
            </div>
        `
      )
      .join("");
  }
}

// --- 4. UI Interactions ---
function toggleCart() {
  cartSidebar.classList.toggle("active");
  overlay.classList.toggle("active");
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
  } else {
    alert("Thank you for your purchase! (Demo)");
    cart = [];
    updateCartUI();
    toggleCart();
  }
}

// Initialize
displayProducts();
updateCartUI();
