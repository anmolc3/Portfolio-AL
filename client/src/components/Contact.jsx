import { useState } from 'react'
import LiquidButton from './LiquidButton'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errMsg, setErrMsg] = useState('')

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')
    setErrMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.detail || 'Something went wrong')
      }
      setStatus('success')
    } catch (err) {
      setErrMsg(err.message)
      setStatus('error')
    }
  }

  return (
    <section className="section contact-section" id="contact">
      <div className="glass-container-sharp-corner card-three section-inner contact-inner">
        <span className="section-tag">Let's Talk</span>
        <h2 className="section-title">
          Ready to build<br /><em>something great?</em>
        </h2>

        {status === 'success' ? (
          <div className="form-success">
            <h3>Message sent! 🎉</h3>
            <p>Thanks for reaching out. We'll get back to you soon.</p>
          </div>
        ) : (
          <form className="contact-form" id="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                placeholder=" "
                required
                value={form.name}
                onChange={handleChange}
                disabled={status === 'loading'}
              />
              <label htmlFor="name">Your Name</label>
            </div>
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                placeholder=" "
                required
                value={form.email}
                onChange={handleChange}
                disabled={status === 'loading'}
              />
              <label htmlFor="email">Email Address</label>
            </div>
            <div className="form-group">
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder=" "
                required
                value={form.message}
                onChange={handleChange}
                disabled={status === 'loading'}
              />
              <label htmlFor="message">Your Message</label>
            </div>

            {status === 'error' && (
              <div className="form-error">⚠ {errMsg}</div>
            )}

            <LiquidButton 
              text={status === 'loading' ? 'Sending…' : 'Send Message ↗'}
              width={250}
              className="liquid-submit"
            />
          </form>
        )}
      </div>
    </section>
  )
}
