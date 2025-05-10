from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base
import os

# Получаем строку подключения из переменной окружения
DATABASE_URL = os.getenv("DATABASE_URL")

# Создаём движок подключения
engine = create_engine(DATABASE_URL)

# Создаём сессию
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Создаём таблицы (если не существуют)
def init_db():
    Base.metadata.create_all(bind=engine)
