import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar-one ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="glass-container navbar-container">
        <a href="#hero">Home</a>
        <a href="#about">About</a>
        <a href="#projects">Service</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  )
}
