# webapp/app.py
from flask import Flask, request, render_template
import psycopg2
import os

app = Flask(__name__)

# Настройки подключения к базе
conn = psycopg2.connect(
    host="localhost",
    database="clicker_db",
    user="postgres",
    password="your_password"
)
cur = conn.cursor()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/click", methods=["POST"])
def click():
    data = request.json
    user_id = data.get("user_id")
    cur.execute("UPDATE users SET clicks = clicks + 1 WHERE telegram_id = %s", (user_id,))
    conn.commit()
    return {"status": "ok"}

if __name__ == "__main__":
    app.run(port=5000)
