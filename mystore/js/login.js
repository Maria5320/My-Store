function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    showToast("Please fill in both fields", "fa-triangle-exclamation");
    return;
  }
  if (!email.includes("@")) {
    showToast("Please enter a valid email", "fa-triangle-exclamation");
    return;
  }

  loginUser(email);
  showToast("Welcome back!", "fa-circle-check");

  
  const next = new URLSearchParams(window.location.search).get("next");
  const target = next === "cart.html" ? "cart.html" : "index.html";
  setTimeout(() => { window.location.href = target; }, 900);
}

document.addEventListener("DOMContentLoaded", () => {
  if (new URLSearchParams(window.location.search).get("next") === "cart.html") {
    showToast("Please login to complete your order", "fa-lock");
  }

  const passwordInput = document.getElementById("password");
  if (passwordInput) {
    passwordInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") login();
    });
  }
});