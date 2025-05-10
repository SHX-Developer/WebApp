from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base

# SQLite URL
DATABASE_URL = "sqlite:///./app.db"

# Создание движка
engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)

# Создание сессии
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Инициализация базы (создание таблиц)
def init_db():
    print("📦 Initializing database...")
    Base.metadata.create_all(bind=engine)
