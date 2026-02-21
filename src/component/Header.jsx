import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <div>
      <header className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            Sanity
          </Link>
          
          <button 
            className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/" className="navbar-link" onClick={closeMenu}>
              Home
            </Link>
            <Link to="/blog" className="navbar-link" onClick={closeMenu}>
              Blog
            </Link>
            <a 
              href="https://sanitybackend-3.onrender.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="navbar-link"
              onClick={closeMenu}
            >
              Admin
            </a>
          </nav>
        </div>
      </header>
      <Outlet />
    </div>
  )
}

export default Header