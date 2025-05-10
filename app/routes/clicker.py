from fastapi import APIRouter, Depends, HTTPException, Form
from sqlalchemy.orm import Session
from database import SessionLocal
from models import User, Click
from datetime import datetime
from fastapi import Query

router = APIRouter()

# Получение сессии БД
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Регистрация пользователя
@router.post("/register")
def register_user(
    telegram_id: str = Query(...),
    username: str = Query(""),
    ref_code: str = Query(None),
    db: Session = Depends(get_db)
):
    # Проверка: существует ли пользователь
    user = db.query(User).filter(User.telegram_id == telegram_id).first()
    if user:
        return {"message": "User already registered", "balance": user.balance}

    # Создание нового пользователя
    new_user = User(
        telegram_id=telegram_id,
        username=username,
        ref_code=telegram_id[:8],  # пример генерации кода
        invited_by=ref_code
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User registered", "balance": new_user.balance}

# Обработка клика
@router.post("/click")
def click(
    telegram_id: str = Query(...),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.telegram_id == telegram_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.balance += 1
    click = Click(user_id=user.id, amount=1, timestamp=datetime.utcnow())
    db.add(click)
    db.commit()
    return {"message": "Click registered", "balance": user.balance}


# Получение баланса
@router.get("/balance/{telegram_id}")
def get_balance(telegram_id: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.telegram_id == telegram_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"balance": user.balance}

# Отладочный маршрут (опционально)
@router.get("/debug/users")
def get_all_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return [
        {"telegram_id": u.telegram_id, "username": u.username, "balance": u.balance}
        for u in users
    ]
