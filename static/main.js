window.addEventListener("DOMContentLoaded", () => {
  if (Telegram?.WebApp?.expand) Telegram.WebApp.expand();

  // Встряхиваем Telegram WebView на iOS
  window.scrollTo(0, 1);
  window.scrollTo(0, 0);

  // Анимация для пересчёта layout
  setTimeout(() => {
    document.body.style.transform = "scale(1)";
  }, 150);
});



let count = 0;
const counter = document.getElementById("counter");
const coin = document.getElementById("coin");

if (coin) {
  coin.onclick = () => {
    count++;
    counter.textContent = count;

    // Вибрация на телефоне
    if (navigator.vibrate) navigator.vibrate(50);
  };
}

// Переключение страниц
function navigate(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(`${page}-page`).classList.add("active");

  // Переключение активной кнопки
  document.querySelectorAll(".nav-button").forEach(btn => btn.classList.remove("active"));
  document.querySelector(`.nav-button[data-tab="${page}"]`)?.classList.add("active");
}

// 🛠 Исправление бага на iOS WebView (перерисовать меню)
function refreshNavBar() {
  const nav = document.querySelector(".nav-bar");
  if (nav) {
    nav.style.display = "none";
    requestAnimationFrame(() => {
      nav.style.display = "flex";
    });
  }
}

// Обновить после загрузки и когда Telegram разворачивает WebApp
window.addEventListener("load", refreshNavBar);
window.addEventListener("focus", refreshNavBar);
