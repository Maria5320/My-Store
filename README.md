# My-Store

An e-commerce website I built during my frontend training.

I wanted to practice building a real multi-page project, not just single pages. So I created a small online store with product listing, product details, a working cart, and a login page.

## What it does

- Browse products and filter them by category
- Search for products
- View product details
- Add items to cart (saved with LocalStorage so it doesn't disappear when you refresh)
- Change quantity or remove items from the cart
- Simple login form with validation
- Fully responsive on mobile and desktop

## Pages

| Page | What it is |
|------|------------|
| `index.html` | Home page with featured products |
| `products.html` | All products + search + filters |
| `product-details.html` | Single product page |
| `cart.html` | Shopping cart |
| `login.html` | Login form |
| `about.html` | About the store |

## Tech I used

- HTML5
- CSS3 (Flexbox, CSS Variables, Media Queries)
- Vanilla JavaScript (DOM, LocalStorage, Events)
- Font Awesome for icons
- Google Fonts (Poppins & Inter)

No frameworks. Just plain HTML, CSS, and JavaScript.

## Project structure

```
mystore/
├── index.html
├── products.html
├── product-details.html
├── cart.html
├── login.html
├── about.html
├── css/
│   └── style.css
├── js/
│   ├── store.js
│   ├── products.js
│   ├── products-page.js
│   ├── details.js
│   ├── cart.js
│   ├── home.js
│   └── login.js
└── README.md
```

## How to run it

1. Clone the repo
2. Open `index.html` in your browser

Or use Live Server in VS Code if you prefer.

## What I learned from this project

- How to structure a multi-page frontend project
- Using LocalStorage to keep data between pages
- Writing reusable functions instead of repeating code
- Making a clean responsive layout with pure CSS
- Handling user interactions (add to cart, filters, search)

## Author

Maria Raafat  
Frontend Developer in training
