const tg = window.Telegram.WebApp;
tg.expand();
tg.ready();

let count = 0;
const counterElement = document.getElementById("counter");

function sendClick() {
    count += 1;
    counterElement.textContent = count;

    fetch("/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: tg.initDataUnsafe?.user?.id || "unknown" })
    })
    .then(res => res.json())
    .then(data => {
        console.log("Клик отправлен");
    });
}
