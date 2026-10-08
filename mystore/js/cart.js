function renderCart() {
  const cart = getCart();
  const body = document.getElementById("cartBody");
  const totalEl = document.getElementById("cartTotal");
  const emptyEl = document.getElementById("cartEmpty");
  const tableEl = document.getElementById("cartTable");
  const summaryEl = document.getElementById("cartSummaryBox");

  if (cart.length === 0) {
    tableEl.style.display = "none";
    summaryEl.style.display = "none";
    emptyEl.style.display = "block";
    return;
  }

  tableEl.style.display = "table";
  summaryEl.style.display = "flex";
  emptyEl.style.display = "none";

  let total = 0;
  body.innerHTML = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return "";
    const lineTotal = product.price * item.qty;
    total += lineTotal;
    return `
      <tr>
        <td>
          <div class="cart-product">
            <img src="${product.image}" alt="${product.name}">
            <span>${product.name}</span>
          </div>
        </td>
        <td>${formatPrice(product.price)}</td>
        <td>
          <div class="qty-control">
            <button onclick="stepCartQty(${product.id}, -1)" aria-label="Decrease quantity"><i class="fas fa-minus"></i></button>
            <span>${item.qty}</span>
            <button onclick="stepCartQty(${product.id}, 1)" aria-label="Increase quantity"><i class="fas fa-plus"></i></button>
          </div>
        </td>
        <td>${formatPrice(lineTotal)}</td>
        <td>
          <button class="remove-btn" onclick="removeFromCart(${product.id}); renderCart();" title="Remove">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  }).join("");

  totalEl.textContent = formatPrice(total);
}

function stepCartQty(productId, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  const newQty = item.qty + delta;
  if (newQty < 1) {
    removeFromCart(productId);
  } else {
    setQty(productId, newQty);
  }
  renderCart();
}

function checkout() {
  const cart = getCart();
  if (cart.length === 0) return;

  // Checkout requires a logged-in user
  if (!isLoggedIn()) {
    showToast("Please login first to checkout", "fa-lock");
    setTimeout(() => { window.location.href = "login.html?next=cart.html"; }, 1200);
    return;
  }

  const items = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return null;
    return {
      name: product.name,
      price: product.price,
      qty: item.qty,
      lineTotal: product.price * item.qty
    };
  }).filter(Boolean);

  const order = {
    id: "INV-" + Date.now().toString().slice(-8),
    date: new Date().toISOString(),
    customer: getUser(),
    items: items,
    total: items.reduce((sum, i) => sum + i.lineTotal, 0)
  };

  localStorage.setItem(ORDER_KEY, JSON.stringify(order));
  saveCart([]);      // order placed, so the cart is emptied
  renderCart();
  showInvoice(order);
}

function showInvoice(order) {
  const date = new Date(order.date).toLocaleDateString("en-GB", {
    day: "2-digit", month: "long", year: "numeric"
  });

  const rows = order.items.map(i => `
    <tr>
      <td>${escapeHtml(i.name)}</td>
      <td>${i.qty}</td>
      <td>${formatPrice(i.price)}</td>
      <td>${formatPrice(i.lineTotal)}</td>
    </tr>
  `).join("");

  const overlay = document.createElement("div");
  overlay.className = "invoice-overlay";
  overlay.innerHTML = `
    <div class="invoice" role="dialog" aria-label="Invoice">
      <div class="invoice-head">
        <div class="invoice-brand"><i class="fas fa-bag-shopping"></i> MyStore</div>
        <div class="invoice-title">
          <h2>INVOICE</h2>
          <span>${order.id}</span>
        </div>
      </div>

      <div class="invoice-meta">
        <div>
          <small>Billed to</small>
          <strong>${escapeHtml(order.customer.name)}</strong>
          <span>${escapeHtml(order.customer.email)}</span>
        </div>
        <div>
          <small>Date</small>
          <strong>${date}</strong>
        </div>
      </div>

      <table class="invoice-table">
        <thead>
          <tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>

      <div class="invoice-totals">
        <div><span>Subtotal</span><span>${formatPrice(order.total)}</span></div>
        <div><span>Shipping</span><span>Free</span></div>
        <div class="invoice-grand"><span>Total</span><span>${formatPrice(order.total)}</span></div>
      </div>

      <p class="invoice-thanks"><i class="fas fa-circle-check"></i> Thank you for your order!</p>

      <div class="invoice-actions no-print">
        <button class="btn" onclick="window.print()"><i class="fas fa-print"></i> Print</button>
        <button class="btn invoice-close" onclick="closeInvoice()"><i class="fas fa-xmark"></i> Close</button>
      </div>
    </div>
  `;

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeInvoice();
  });
  document.body.appendChild(overlay);
}

function closeInvoice() {
  const overlay = document.querySelector(".invoice-overlay");
  if (overlay) overlay.remove();
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeInvoice();
});

window.addEventListener("DOMContentLoaded", renderCart);