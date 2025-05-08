let count = Number(localStorage.getItem("clickCount")) || 0;
const counter = document.getElementById("counter");
const coin = document.getElementById("coin");

// Обновляем текст при загрузке
counter.textContent = count;

// Создаём аудио
const clickSound = new Audio("static/audio/click.mp3"); // укажи путь к звуку

if (coin) {
  coin.onclick = () => {
    count++;
    counter.textContent = count;
    localStorage.setItem("clickCount", count);

    // Вибрация на телефоне (только через navigator.vibrate)
    if (navigator.vibrate) navigator.vibrate(50);

    // Воспроизвести звук
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
  };
}

// Переключение страниц
function navigate(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(`${page}-page`)?.classList.add("active");

  document.querySelectorAll(".nav-button").forEach(btn => btn.classList.remove("active"));
  document.querySelector(`.nav-button[data-tab="${page}"]`)?.classList.add("active");
}