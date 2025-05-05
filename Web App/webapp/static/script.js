// webapp/static/script.js
let tg = window.Telegram.WebApp;
tg.expand();

let btn = document.getElementById("click");
btn.onclick = () => {
  fetch("/click", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({user_id: tg.initDataUnsafe.user.id})
  });
};
