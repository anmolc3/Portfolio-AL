import { useFetch } from '../hooks/useFetch'

export default function About() {
  const { data: skills, loading, error } = useFetch('/api/skills')

  return (
    <section className="section about-section" id="about">
      <div className="section-inner">
        <span className="section-tag">About Me</span>
        <h2 className="section-title">
          Turning ideas into<br /><em>digital art</em>
        </h2>
        <p className="section-body">
          We are full-stack developer and creative technologist. I specialise in
          building high-performance web applications with a laser focus on user
          experience, micro-interactions, and visual storytelling — powered by
          React frontends and Python backends.
        </p>

        {loading && (
          <div className="skills-skeleton">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="skeleton-chip" style={{ width: `${60 + Math.random() * 50}px` }} />
            ))}
          </div>
        )}

        {error && (
          <div className="skills-grid">
            {['React', 'Python', 'FastAPI', 'PostgreSQL', 'TypeScript', 'Node.js', 'Three.js', 'GSAP', 'Figma', 'WebGL', 'Docker', 'Next.js'].map(s => (
              <div key={s} className="skill-chip">{s}</div>
            ))}
          </div>
        )}

        {skills && (
          <div className="skills-grid">
            {skills.map(skill => (
              <div key={skill.id} className="skill-chip">{skill.name}</div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
