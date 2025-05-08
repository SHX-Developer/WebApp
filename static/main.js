let count = Number(localStorage.getItem("clickCount")) || 0;
const counter = document.getElementById("counter");
const coin = document.getElementById("coin");

counter.textContent = count;

function handleClick(event) {
  event.preventDefault();
  count++;
  counter.textContent = count;
  localStorage.setItem("clickCount", count); // сохраняем

  if (navigator.vibrate) navigator.vibrate(50);

  // Анимация монеты
  coin.style.transform = "scale(0.92)";
  setTimeout(() => coin.style.transform = "scale(1)", 100);

}

if ('ontouchstart' in window) {
  coin.addEventListener("touchstart", handleClick);
} else {
  coin.addEventListener("mousedown", handleClick);
}

function navigate(tab) {
  // Переключение страниц
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(`${tab}-page`).classList.add("active");

  // Обновить активную кнопку
  document.querySelectorAll(".nav-button").forEach(btn => {
    btn.classList.remove("active");
    if (btn.dataset.tab === tab) {
      btn.classList.add("active");
    }
  });
}

