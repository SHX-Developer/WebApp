import { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [telegramId, setTelegramId] = useState('test-user-001')
  const [username, setUsername] = useState('dev')
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    const tg = window.Telegram?.WebApp?.initDataUnsafe
    if (tg?.user?.id) {
      setTelegramId(tg.user.id.toString())
      setUsername(tg.user.username || 'unknown')
    }
  }, [])

  useEffect(() => {
    // Регистрация и загрузка баланса
    fetch(`/register?telegram_id=${telegramId}&username=${username}`, {
      method: 'POST',
    })
      .then(() => fetch(`/balance/${telegramId}`))
      .then(res => res.json())
      .then(data => setBalance(data.balance ?? 0))
      .catch(err => console.error('UserContext error:', err))
  }, [telegramId])

  const updateBalance = async () => {
    const res = await fetch(`/balance/${telegramId}`)
    const data = await res.json()
    setBalance(data.balance ?? 0)
  }

  return (
    <UserContext.Provider
      value={{ telegramId, username, balance, setBalance, updateBalance }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
