let currentCategory = "All";
let currentSearch = "";

function renderProductsList() {
  const container = document.getElementById("productsContainer");
  const filtered = products.filter(p => {
    const matchesCategory = currentCategory === "All" || p.category === currentCategory;
    const matchesSearch = p.name.toLowerCase().includes(currentSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <i class="fas fa-box-open"></i>
        <p>No products match your search.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(productCardHTML).join("");
}

function buildFilterChips() {
  const categories = ["All", ...new Set(products.map(p => p.category))];
  const wrap = document.getElementById("categoryFilters");
  wrap.innerHTML = categories.map(cat => `
    <button class="filter-chip ${cat === currentCategory ? "active" : ""}" data-cat="${cat}">
      ${cat}
    </button>
  `).join("");

  wrap.querySelectorAll(".filter-chip").forEach(btn => {
    btn.addEventListener("click", () => {
      currentCategory = btn.dataset.cat;
      wrap.querySelectorAll(".filter-chip").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderProductsList();
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  buildFilterChips();

  // Pick up a search term passed from the navbar search box (products.html?search=...)
  const params = new URLSearchParams(window.location.search);
  const incomingSearch = params.get("search");
  const searchInput = document.getElementById("searchInput");

  if (incomingSearch && searchInput) {
    currentSearch = incomingSearch;
    searchInput.value = incomingSearch;
  }

  renderProductsList();

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearch = e.target.value;
      renderProductsList();
    });
  }
});
