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

window.addEventListener("DOMContentLoaded", renderCart);
