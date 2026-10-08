document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".feature, .stat");
  if (!items.length || !("IntersectionObserver" in window)) return;

  items.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(14px)";
    el.style.transition = "opacity .5s ease, transform .5s ease";
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(el => observer.observe(el));
});
