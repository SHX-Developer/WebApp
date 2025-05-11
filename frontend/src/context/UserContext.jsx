import { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [telegramId, setTelegramId] = useState(null)
  const [username, setUsername] = useState(null)
  const [balance, setBalance] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isTelegram, setIsTelegram] = useState(false)

  useEffect(() => {
    const tg = window.Telegram?.WebApp?.initDataUnsafe

    if (tg?.user?.id) {
      setTelegramId(tg.user.id.toString())
      setUsername(tg.user.username || 'unknown')
      setIsTelegram(true)
    } else {
      setIsTelegram(false)
      setIsLoading(false) // остановим "загрузку", чтобы App мог отреагировать
    }
  }, [])

  useEffect(() => {
    console.log("🟢 TRY register:", telegramId)
    if (!telegramId) return
  
    fetch(`/register?telegram_id=${telegramId}&username=${username}`, {
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
      const res = await fetch(`/balance/${telegramId}`)
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
