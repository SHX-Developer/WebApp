# bot/main.py
from aiogram import Bot, Dispatcher, types
from aiogram.types import WebAppInfo, KeyboardButton, ReplyKeyboardMarkup
from aiogram.utils import executor
import os

TOKEN = os.getenv("BOT_TOKEN")
WEBAPP_URL = os.getenv("WEBAPP_URL")

bot = Bot(token=TOKEN)
dp = Dispatcher(bot)

@dp.message_handler(commands="start")
async def start(msg: types.Message):
    keyboard = ReplyKeyboardMarkup(resize_keyboard=True)
    keyboard.add(KeyboardButton("Играть в кликер", web_app=WebAppInfo(url=WEBAPP_URL)))
    await msg.answer("Привет! Нажми кнопку ниже, чтобы начать игру 👇", reply_markup=keyboard)

if __name__ == "__main__":
    executor.start_polling(dp)
