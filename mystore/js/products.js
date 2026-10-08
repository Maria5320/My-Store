const products = [
  { id: 1, name: "Wireless Headphones", price: 79.99, category: "Electronics",
    image: "https://i.ebayimg.com/images/g/8i0AAOSw6ZBnYjvg/s-l1600.webp",
    desc: "Over-ear wireless headphones with active noise cancellation and 30-hour battery life." },
  { id: 2, name: "Smart Watch", price: 129.99, category: "Electronics",
    image: "https://i0.wp.com/zohaira.com/wp-content/uploads/2021/02/01FT5005-3.jpg?fit=600%2C600&ssl=1",
    desc: "Track your workouts, heart rate, and notifications with this lightweight smart watch." },
  { id: 3, name: "Running Shoes", price: 59.99, category: "Fashion",
    image: "https://i.ebayimg.com/images/g/IwQAAeSwl6Zp8w9A/s-l1600.webp",
    desc: "Breathable mesh running shoes designed for comfort on long distances." },
  { id: 4, name: "Leather Backpack", price: 89.99, category: "Fashion",
    image: "https://img.kwcdn.com/product/fancy/97961a09-360b-49db-9500-30cce575f9a2.jpg?imageView2/2/w/800/q/70/format/avif",
    desc: "Durable leather backpack with padded laptop compartment and multiple pockets." },
  { id: 5, name: "Coffee Maker", price: 45.99, category: "Home",
    image: "https://m.media-amazon.com/images/I/714dYkJf3kL._AC_SL1500_.jpg",
    desc: "Programmable coffee maker that brews a fresh pot in under 8 minutes." },
  { id: 6, name: "Desk Lamp", price: 24.99, category: "Home",
    image: "https://m.media-amazon.com/images/I/41oocCF5LbL._AC_SL1056_.jpg",
    desc: "Adjustable LED desk lamp with three brightness levels and USB charging port." },
  { id: 7, name: "Yoga Mat", price: 19.99, category: "Sports",
    image: "https://m.media-amazon.com/images/I/618NUbCko8L._AC_SL1267_.jpg",
    desc: "Non-slip yoga mat with extra cushioning, perfect for home workouts." },
  { id: 8, name: "Water Bottle", price: 14.99, category: "Sports",
    image: "https://m.media-amazon.com/images/I/61aymmyYTqL._AC_SX679_.jpg",
    desc: "Insulated stainless steel bottle that keeps drinks cold for 24 hours." },
  { id: 9, name: "Bluetooth Speaker", price: 39.99, category: "Electronics",
    image: "https://img-1.kwcdn.com/product/fancy/15f2d32e-0e89-4f18-8725-2e9ebf6d5a40.jpg?imageView2/2/w/800/q/70/format/avif",
    desc: "Portable Bluetooth speaker with rich bass and 12-hour playtime." },
  { id: 10, name: "Sunglasses", price: 29.99, category: "Fashion",
    image: "https://www.mytheresa.com/image/1094/1238/100/49/P00977681.jpg",
    desc: "UV-protective polarized sunglasses with a classic frame." },
  { id: 11, name: "Ceramic Mug Set", price: 22.99, category: "Home",
    image: "https://img.kwcdn.com/product/fancy/f8692741-af84-41d1-bee0-acbdc6846b5c.jpg?imageView2/2/w/800/q/70/format/avif",
    desc: "Set of four handcrafted ceramic mugs, dishwasher and microwave safe." },
  { id: 12, name: "Resistance Bands", price: 17.99, category: "Sports",
    image: "https://m.media-amazon.com/images/I/61aBE7ch+bL._AC_SY300_SX300_QL70_ML2_.jpg",
    desc: "Set of five resistance bands for strength training at any fitness level." }
];


function productCardHTML(product) {
  return `
    <div class="product-card">
      <a href="product-details.html?id=${product.id}">
        <img class="thumb" src="${product.image}" alt="${product.name}"
             onerror="this.onerror=null;this.src='https://picsum.photos/seed/${product.id}/400/400';">
        <span class="category-tag"><i class="fas fa-tag"></i> ${product.category}</span>
        <h3>${product.name}</h3>
      </a>
      <div class="price">${formatPrice(product.price)}</div>
      <button class="add-btn" onclick="handleAddToCart(${product.id}, this)">
        <i class="fas fa-cart-plus"></i> Add to Cart
      </button>
    </div>
  `;
}

function handleAddToCart(id, btnEl) {
  addToCart(id);
  if (btnEl) {
    const original = btnEl.innerHTML;
    btnEl.classList.add("added");
    btnEl.innerHTML = '<i class="fas fa-check"></i> Added';
    setTimeout(() => {
      btnEl.classList.remove("added");
      btnEl.innerHTML = original;
    }, 1200);
  }
}
