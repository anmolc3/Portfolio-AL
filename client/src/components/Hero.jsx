import { useEffect, useRef } from 'react'
import LiquidGlassTitle from './LiquidGlassTitle'
import GlassLiquidButton from './GlassLiquidButton'

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

        <h1 className="hero-title clean-title">DuoPortFolio</h1>

        <p className="hero-subtitle">
          We craft immersive digital experiences with clean code,<br />
          bold design, and obsessive attention to detail.
        </p>

        <div className="hero-actions">
          <GlassLiquidButton 
            text="View My Work" 
            href="#projects" 
            viewBoxSize={30}
            svgPath="M14.217,19.707l-1.112,2.547c-0.427,0.979-1.782,0.979-2.21,0l-1.112-2.547c-0.99-2.267-2.771-4.071-4.993-5.057L1.73,13.292c-0.973-0.432-0.973-1.848,0-2.28l2.965-1.316C6.974,8.684,8.787,6.813,9.76,4.47l1.126-2.714c0.418-1.007,1.81-1.007,2.228,0L14.24,4.47c0.973,2.344,2.786,4.215,5.065,5.226l2.965,1.316c0.973,0.432,0.973,1.848,0,2.28l-3.061,1.359C16.988,15.637,15.206,17.441,14.217,19.707z"
          />
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
