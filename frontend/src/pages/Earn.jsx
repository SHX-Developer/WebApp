import '../styles/earn.css'
import { useUser } from '../context/UserContext'

export default function Earn() {
  const { balance, telegramId, updateBalance } = useUser()

  const handleClick = async () => {
    console.log("CLICKED!", telegramId)
    if (!telegramId) return
    await fetch(`/click?telegram_id=${telegramId}`, { method: 'POST' })
    await updateBalance()
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
