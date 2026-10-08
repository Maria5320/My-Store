const CART_KEY = "mystore_cart";
const USER_KEY = "mystore_user";
const ORDER_KEY = "mystore_last_order";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId, qty = 1) {
  const cart = getCart();
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty });
  }
  saveCart(cart);
  showToast("Added to cart");
}

function removeFromCart(productId) {
  const cart = getCart().filter(item => item.id !== productId);
  saveCart(cart);
}

function setQty(productId, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty = Math.max(1, qty);
  saveCart(cart);
}

function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll(".cart-count").forEach(el => {
    el.textContent = count;
  });
}

function formatPrice(n) {
  return "$" + Number(n).toFixed(2);
}

function showToast(message, icon = "fa-circle-check") {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), 2200);
}


function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => links.classList.toggle("open"));
}


function initNavSearch() {
  const form = document.querySelector(".nav-search");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = form.querySelector("input").value.trim();
    window.location.href = "products.html" + (q ? ("?search=" + encodeURIComponent(q)) : "");
  });
}


function markActiveNavLink() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    const href = a.getAttribute("href");
    if (href && href.toLowerCase() === path.toLowerCase()) {
      a.classList.add("active");
    }
  });
}


function getUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY));
  } catch (e) {
    return null;
  }
}

function isLoggedIn() {
  return getUser() !== null;
}

function loginUser(email) {
  const name = email.split("@")[0];
  localStorage.setItem(USER_KEY, JSON.stringify({ name, email }));
}

function logout() {
  localStorage.removeItem(USER_KEY);
  showToast("Logged out", "fa-right-from-bracket");
  setTimeout(() => { window.location.href = "index.html"; }, 900);
}


function updateAuthLink() {
  const link = document.querySelector('.nav-links a[href="login.html"]');
  if (!link || !isLoggedIn()) return;
  link.innerHTML = '<i class="fas fa-right-from-bracket"></i> Logout';
  link.setAttribute("href", "#");
  link.addEventListener("click", (e) => {
    e.preventDefault();
    logout();
  });
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  initNavToggle();
  initNavSearch();
  markActiveNavLink();
  updateAuthLink();
});