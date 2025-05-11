import '../styles/earn.css'
import { useUser } from '../context/UserContext'
import { useEffect } from 'react'

export default function Earn() {
  const { balance, telegramId, updateBalance } = useUser()

  useEffect(() => {
    console.log("👋 Earn page loaded.")
    console.log("🆔 telegramId =", telegramId)
  }, [telegramId])

  const handleClick = async () => {
    console.log("🟡 Coin clicked by:", telegramId)
    if (!telegramId) {
      console.warn("⛔ No telegramId, aborting click.")
      return
    }

    if (navigator.vibrate) navigator.vibrate(50)

    try {
      const res = await fetch(`/click?telegram_id=${telegramId}`, { method: 'POST' })
      const data = await res.json()
      console.log("✅ Click registered:", data)
      await updateBalance()
    } catch (err) {
      console.error("❌ Click failed:", err)
    }
  }

  return (
    <div className="page earn-page">
      <div className="earn-count">{balance}</div>
      <img
        src="/image/earn/coin.png"
        alt="coin"
        className="earn-coin"
        onClick={handleClick}
      />
    </div>
  )
}
