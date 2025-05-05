from flask import Flask, request, render_template

app = Flask(__name__)

# Главная страница
@app.route("/")
def index():
    return render_template("index.html")  # HTML-страница кликера

# Обработка клика
@app.route("/click", methods=["POST"])
def click():
    data = request.json
    user_id = data.get("user_id")
    print(f"👆 Клик от пользователя: {user_id}")
    return {"status": "ok"}

# Запуск локально (не нужен на Render, но пусть будет)
if __name__ == "__main__":
    app.run(port=5000)
