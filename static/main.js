
const tg = window.Telegram.WebApp;
tg.expand();
tg.ready();

let count = 0;
const counterElement = document.getElementById("counter");
const coin = document.getElementById("coin");

coin.onclick = () => {
    count++;
    counterElement.textContent = count;

    // Вибрация (если поддерживается)
    if (navigator.vibrate) {
        navigator.vibrate(100);
    }

    fetch("/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: tg.initDataUnsafe?.user?.id || "unknown" })
    });
};
