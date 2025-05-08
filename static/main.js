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
