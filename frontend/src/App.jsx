import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Tasks from './pages/Tasks'
import Earn from './pages/Earn'
import Referrals from './pages/Referrals'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import { useUser } from './context/UserContext'

export default function App() {
  const { isLoading } = useUser()

  if (isLoading) {
    return (
      <div className="page" style={{ color: 'white', textAlign: 'center', paddingTop: '40vh' }}>
        Загрузка...
      </div>
    )
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/earn" element={<Earn />} />
        <Route path="/referrals" element={<Referrals />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  )
}
