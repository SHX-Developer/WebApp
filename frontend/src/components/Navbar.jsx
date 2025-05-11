import { NavLink } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const navItems = [
    { to: '/', label: 'Home', icon: '/icons/navigations/Home.svg' },
    { to: '/tasks', label: 'Tasks', icon: '/icons/navigations/Tasks.svg' },
    { to: '/earn', label: 'Earn', icon: '/icons/navigations/Earn.svg' },
    { to: '/referrals', label: 'Referrals', icon: '/icons/navigations/Referrals.svg' },
    { to: '/profile', label: 'Profile', icon: '/icons/navigations/Profile.svg' },
  ]

  return (
    <nav className="nav-bar">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => 'nav-button' + (isActive ? ' active' : '')}
        >
          <img src={item.icon} alt={item.label} />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
