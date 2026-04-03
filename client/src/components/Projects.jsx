import { useFetch } from '../hooks/useFetch'
import LiquidButton from './LiquidButton'

function ProjectCard({ project, index }) {
  return (
    <li 
      className="projects-stack-item" 
      style={{ '--i': index + 1 }}
    >
      <img 
        src={project.image_url || `https://picsum.photos/seed/${project.id}/200/200`} 
        alt={project.title} 
      />
      <div className="content">
        <div className="content-text">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
        <div className="content-links">
          {project.live_url && (
            <div style={{ pointerEvents: 'auto' }}>
              <LiquidButton text="Live" href={project.live_url} width={80} height={35} />
            </div>
          )}
          {project.github_url && (
            <div style={{ pointerEvents: 'auto' }}>
              <LiquidButton text="Repo" href={project.github_url} width={80} height={35} />
            </div>
          )}
        </div>
      </div>
    </li>
  )
}

function ProjectSkeleton() {
  return (
    <li className="projects-stack-item skeleton">
      <div className="skel-img" style={{ width: '90px', height: '90px' }} />
      <div className="content">
        <div className="content-text">
          <div className="skel-line w60" />
          <div className="skel-line w80" />
        </div>
      </div>
    </li>
  )
}

export default function Projects() {
  const { data: projects, loading, error } = useFetch('/api/projects')

  // Fallback data if API unavailable
  const fallback = [
    { id: 1, title: 'EdZure Legal Platform', description: 'Full-stack legal services platform with Firebase, React and real-time document processing.', tags: ['React', 'Firebase', 'Node.js'], gradient: 'linear-gradient(135deg,#6C63FF,#EA2E00)' },
    { id: 2, title: '3D Product Visualizer', description: 'Interactive WebGL product configurator with real-time material and lighting control.', tags: ['Three.js', 'GLSL', 'WebGL'], gradient: 'linear-gradient(135deg,#00D4FF,#6C63FF)' },
    { id: 3, title: 'AI Analytics Dashboard', description: 'Real-time analytics powered by machine learning with animated visualisations.', tags: ['Next.js', 'Python', 'D3.js'], gradient: 'linear-gradient(135deg,#EA2E00,#FF6B6B)' },
    { id: 4, title: 'Neural Canvas', description: 'Generative art platform using stable diffusion for unique digital assets.', tags: ['React', 'Python', 'AI'], gradient: 'linear-gradient(135deg,#6C63FF,#00D4FF)' },
  ]

  const displayProjects = projects || (error ? fallback : null)

  return (
    <section className="section projects-section" id="projects">
      <div className="section-inner" style={{ perspective: '1000px' }}>
        <span className="section-tag">Selected Work</span>
        <h2 className="section-title">
          Projects that<br /><em>speak for themselves</em>
        </h2>

        <ul className="projects-stack">
          {loading && Array.from({ length: 4 }).map((_, i) => <ProjectSkeleton key={i} />)}
          {displayProjects && displayProjects.map((p, idx) => (
            <ProjectCard key={p.id} project={p} index={idx} />
          ))}
        </ul>
      </div>
    </section>
  )
}
