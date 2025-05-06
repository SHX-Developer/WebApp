
let count = 0;
const counter = document.getElementById("counter");
const coin = document.getElementById("coin");

if (coin) {
    coin.onclick = () => {
        count++;
        counter.textContent = count;
        if (navigator.vibrate) navigator.vibrate(50);

        fetch("/click", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: "local_user" })
        });
    };
}

function navigate(page) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(`${page}-page`).classList.add("active");
}
