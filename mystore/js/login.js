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

  showToast("Welcome back!", "fa-circle-check");
}

document.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("password");
  if (passwordInput) {
    passwordInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") login();
    });
  }
});
