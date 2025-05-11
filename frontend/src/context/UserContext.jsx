import { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [telegramId, setTelegramId] = useState(null)
  const [username, setUsername] = useState(null)
  const [balance, setBalance] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isTelegram, setIsTelegram] = useState(false)

  // Абсолютный путь к backend
  const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

  useEffect(() => {
    const tg = window.Telegram?.WebApp?.initDataUnsafe

    if (tg?.user?.id) {
      setTelegramId(tg.user.id.toString())
      setUsername(tg.user.username || 'unknown')
      setIsTelegram(true)
    } else {
      console.warn("⛔ Not in Telegram WebApp")
      setIsTelegram(false)
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    console.log("🟢 TRY register:", telegramId)

    if (!telegramId) {
      console.warn("⛔ No telegramId, skipping registration.")
      setIsLoading(false)
      return
    }

    fetch(`${API_BASE}/register?telegram_id=${telegramId}&username=${username}`, {
      method: 'POST',
    })
      .then(res => res.json())
      .then(data => {
        console.log("✅ Registered:", data)
        setBalance(data.balance ?? 0)
        setIsLoading(false)
      })
      .catch(err => {
        console.error("⛔ Registration error:", err)
        setIsLoading(false)
      })
  }, [telegramId])

  const updateBalance = async () => {
    try {
      const res = await fetch(`${API_BASE}/balance/${telegramId}`)
      const data = await res.json()
      setBalance(data.balance ?? 0)
    } catch (err) {
      console.error('Ошибка при обновлении баланса:', err)
    }
  }

  return (
    <UserContext.Provider
      value={{ telegramId, username, balance, setBalance, updateBalance, isLoading, isTelegram }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
