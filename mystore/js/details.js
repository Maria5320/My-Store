window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"), 10);
  const product = products.find(p => p.id === id) || products[0];

  document.getElementById("productImage").src = product.image;
  document.getElementById("productImage").alt = product.name;
  document.getElementById("productCategory").innerHTML =
    `<i class="fas fa-tag"></i> ${product.category}`;
  document.getElementById("productName").textContent = product.name;
  document.getElementById("productPrice").textContent = formatPrice(product.price);
  document.getElementById("productDesc").textContent = product.desc;

  document.getElementById("addBtn").addEventListener("click", () => {
    handleAddToCart(product.id, document.getElementById("addBtn"));
  });
});
