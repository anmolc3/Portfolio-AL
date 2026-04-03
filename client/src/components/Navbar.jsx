import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <svg style={{ display: 'none' }}>
        <filter id="lensFilter" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves="2" seed="92" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
          <feDisplacementMap in="SourceGraphic" in2="blurred" scale="70" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      {/* Wrapper to hold positioning */}
      <nav className={`navbar-wrapper${scrolled ? ' navbar--scrolled' : ''}`} id="navbar">
        {/* User's Liquid Glass Container */}
        <div className="glass-container glass-container--nav">
          <div className="glass-filter-nav"></div>
          <div className="glass-overlay-nav"></div>
          <div className="glass-specular-nav"></div>
          <div className="glass-content-nav">
            <a href="#hero" className="nav-logo">AL</a>
            <ul className="nav-links">
              <li><a href="#hero">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
            <a href="#contact" className="nav-cta">Hire Me</a>
          </div>
        </div>
      </nav>
    </>
  )
}
