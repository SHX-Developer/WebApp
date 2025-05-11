function setVh() {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}
setVh();
window.addEventListener('resize', setVh);

window.Telegram.WebApp.ready();

const tg = window.Telegram.WebApp.initDataUnsafe;
const telegramId = tg?.user?.id?.toString();
const username = tg?.user?.username || "unknown";

const counter = document.getElementById("counter");
const coin = document.getElementById("coin");
const clickSound = new Audio("static/audio/click.mp3");

// Регистрация пользователя
fetch(`/register?telegram_id=${telegramId}&username=${username}`, {
  method: "POST"
})
  .then(res => res.json())
  .then(() => {
    // Получаем актуальный баланс
    return fetch(`/balance/${telegramId}`);
  })
  .then(res => res.json())
  .then(data => {
    counter.textContent = data.balance ?? 0;
  })
  .catch(err => console.error("Ошибка при регистрации/загрузке баланса:", err));

if (coin) {
  coin.onclick = async () => {
    if (navigator.vibrate) navigator.vibrate(50);
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});

    try {
      const res = await fetch(`/click?telegram_id=${telegramId}`, { method: "POST" });
      const data = await res.json();
      counter.textContent = data.balance ?? 0;
    } catch (err) {
      console.error("Ошибка при клике:", err);
    }
  };
}

function navigate(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(`${page}-page`)?.classList.add("active");

  document.querySelectorAll(".nav-button").forEach(btn => btn.classList.remove("active"));
  document.querySelector(`.nav-button[data-tab="${page}"]`)?.classList.add("active");
}

navigate('home');
