-- db/init.sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    telegram_id BIGINT UNIQUE,
    clicks INT DEFAULT 0
);
