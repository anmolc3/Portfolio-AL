import { useFetch } from '../hooks/useFetch'
import LiquidButton from './LiquidButton'

function ProjectCard({ project }) {
  return (
    <div className="glass-container card-two project-card" id={`project-${project.id}`} style={{ '--filter': 'url(#liquid-glass-stretchy-angled-radius-0rem)' }}>
      <div
        className="project-img"
        style={{ background: project.gradient }}
      />
      <div className="project-info">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-tags">
          {project.tags.map(tag => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        {(project.live_url || project.github_url) && (
          <div className="project-links">
            {project.live_url && (
              <div style={{ pointerEvents: 'auto' }}>
                <LiquidButton text="Live ↗" href={project.live_url} width={120} height={40} />
              </div>
            )}
            {project.github_url && (
              <div style={{ pointerEvents: 'auto' }}>
                <LiquidButton text="GitHub" href={project.github_url} width={120} height={40} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function ProjectSkeleton() {
  return (
    <div className="project-skeleton">
      <div className="skel-img" />
      <div className="skel-body">
        <div className="skel-line w60" />
        <div className="skel-line w80" />
        <div className="skel-line w40" />
      </div>
    </div>
  )
}

export default function Projects() {
  const { data: projects, loading, error } = useFetch('/api/projects')

  // Fallback data if API unavailable
  const fallback = [
    { id: 1, title: 'EdZure Legal Platform', description: 'Full-stack legal services platform with Firebase, React and real-time document processing.', tags: ['React', 'Firebase', 'Node.js'], gradient: 'linear-gradient(135deg,#6C63FF,#EA2E00)' },
    { id: 2, title: '3D Product Visualizer', description: 'Interactive WebGL product configurator with real-time material and lighting control.', tags: ['Three.js', 'GLSL', 'WebGL'], gradient: 'linear-gradient(135deg,#00D4FF,#6C63FF)' },
    { id: 3, title: 'AI Analytics Dashboard', description: 'Real-time analytics powered by machine learning with animated data visualisations.', tags: ['Next.js', 'Python', 'D3.js'], gradient: 'linear-gradient(135deg,#EA2E00,#FF6B6B)' },
  ]

  const displayProjects = projects || (error ? fallback : null)

  return (
    <section className="section projects-section" id="projects">
      <div className="glass-container-sharp-corner card-three section-inner">
        <span className="section-tag">Selected Work</span>
        <h2 className="section-title">
          Projects that<br /><em>speak for themselves</em>
        </h2>

        <div className="projects-grid">
          {loading && Array.from({ length: 3 }).map((_, i) => <ProjectSkeleton key={i} />)}
          {displayProjects && displayProjects.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      </div>
    </section>
  )
}
