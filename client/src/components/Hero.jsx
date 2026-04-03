import { useEffect, useRef } from 'react'
import LiquidGlassTitle from './LiquidGlassTitle'
import LiquidButton from './LiquidButton'

function AnimatedStat({ target, suffix }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let start = null
    const duration = 1800

    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      el.textContent = Math.floor(eased * target)
      if (progress < 1) requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        requestAnimationFrame(step)
        observer.disconnect()
      }
    }, { threshold: 0.5 })

    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <div className="stat">
      <span className="stat-number" ref={ref}>0</span>
      <span className="stat-plus">{suffix}</span>
      <span className="stat-label">
        {target === 35 && 'Projects Done'}
        {target === 4  && 'Years Exp.'}
        {target === 98 && 'Happy Clients'}
      </span>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="grid-overlay" />

      <div className="hero-content">
        <p className="hero-eyebrow">
          <span className="eyebrow-dot" />
          Available for work
        </p>

        <LiquidGlassTitle text="DuoPortFolio" />

        <p className="hero-subtitle">
          We craft immersive digital experiences with clean code,<br />
          bold design, and obsessive attention to detail.
        </p>

        <div className="hero-actions">
          <LiquidButton text="View My Work ↗" href="#projects" />
        </div>

        <div className="hero-stats">
          <AnimatedStat target={35} suffix="+" />
          <div className="stat-divider" />
          <AnimatedStat target={4} suffix="+" />
          <div className="stat-divider" />
          <AnimatedStat target={98} suffix="%" />
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  )
}
