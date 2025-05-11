import { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [telegramId, setTelegramId] = useState('test-user-001') // fallback для браузера
  const [username, setUsername] = useState('dev')
  const [balance, setBalance] = useState(null) // null = "не загружено"
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const tg = window.Telegram?.WebApp?.initDataUnsafe
    if (tg?.user?.id) {
      setTelegramId(tg.user.id.toString())
      setUsername(tg.user.username || 'unknown')
    }
  }, [])

  useEffect(() => {
    if (!telegramId) return

    setIsLoading(true)

    fetch(`/register?telegram_id=${telegramId}&username=${username}`, {
      method: 'POST'
    })
      .then(() => fetch(`/balance/${telegramId}`))
      .then(res => res.json())
      .then(data => {
        setBalance(data.balance ?? 0)
        setIsLoading(false)
      })
      .catch(err => {
        console.error('UserContext error:', err)
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
      value={{ telegramId, username, balance, setBalance, updateBalance, isLoading }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
