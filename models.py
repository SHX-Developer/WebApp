from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    telegram_id = Column(String, unique=True, nullable=False)
    username = Column(String)
    ref_code = Column(String, unique=True)
    invited_by = Column(String)
    balance = Column(Integer, default=0)
    league = Column(String, default="Bronze")
    created_at = Column(DateTime, default=datetime.utcnow)

    referrals = relationship(
        "Referral",
        back_populates="referrer",
        foreign_keys="[Referral.referrer_id]"
    )

    clicks = relationship("Click", back_populates="user")
    tasks = relationship("UserTask", back_populates="user")
    withdrawals = relationship("Withdrawal", back_populates="user")


class Referral(Base):
    __tablename__ = 'referrals'
    id = Column(Integer, primary_key=True)
    referrer_id = Column(Integer, ForeignKey('users.id'))
    referred_id = Column(Integer, ForeignKey('users.id'))
    bonus = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

    referrer = relationship(
        "User",
        back_populates="referrals",
        foreign_keys=[referrer_id]
    )


class Click(Base):
    __tablename__ = 'clicks'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    amount = Column(Integer, default=1)
    timestamp = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="clicks")


class Task(Base):
    __tablename__ = 'tasks'
    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    reward = Column(Integer, default=0)
    active = Column(Boolean, default=True)


class UserTask(Base):
    __tablename__ = 'user_tasks'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    task_id = Column(Integer, ForeignKey('tasks.id'))
    completed = Column(Boolean, default=False)
    completed_at = Column(DateTime)

    user = relationship("User", back_populates="tasks")


class Withdrawal(Base):
    __tablename__ = 'withdrawals'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    amount = Column(Integer, nullable=False)
    status = Column(String, default='pending')  # 'pending', 'approved', 'rejected'
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="withdrawals")
