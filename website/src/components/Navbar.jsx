
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('theme') === 'dark'
  )
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'dark' : 'light'
    )
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  const links = [
    ['Home', '/'],
    ['Research', '/research'],
    ['Publications', '/publications'],
    ['Projects', '/projects'],
    ['CV', '/cv'],
    ['Contact', '/contact'],
  ]

  return (
    <header className="navbar">
      <nav className="nav-container" aria-label="Main navigation">
        <NavLink
          to="/"
          className="nav-brand"
          onClick={() => setMenuOpen(false)}
        >
          Rahul Kumar Kundu
        </NavLink>

        <div className="nav-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={darkMode ? 'Light mode' : 'Dark mode'}
          >
            {darkMode ? '☀' : '☾'}
          </button>

          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="main-menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        <div id="main-menu" className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {links.map(([label, path]) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
