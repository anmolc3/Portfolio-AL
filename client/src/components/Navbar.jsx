import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className="navbar-one" style={{ position: 'sticky', top: '1rem', margin: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div className="glass-container" style={{ display: 'flex', 'height': '3rem', width: 'auto', justifyContent: 'center', alignItems: 'center', '--filter': 'url(#liquid-glass-two)', padding: '0 2rem', gap: '2rem', fontSize: '0.9rem' }}>
        <a href="#hero" style={{ color: 'inherit', textDecoration: 'none' }}>Home</a>
        <a href="#about" style={{ color: 'inherit', textDecoration: 'none' }}>About</a>
        <a href="#projects" style={{ color: 'inherit', textDecoration: 'none' }}>Service</a>
        <a href="#contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</a>
      </div>
    </nav>
  )
}
