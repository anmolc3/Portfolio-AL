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

  const projectsFallback = [
    { 
      id: 1, 
      title: 'EdZure Legal', 
      description: 'Comprehensive legal services platform featuring secure client onboarding, case management, and seamless integrations.', 
      tags: ['React', 'Firebase', 'Tailwind'], 
      live_url: 'https://edzurelegal.com',
      image_url: '/assets/edzure_legal.png'
    },
    { 
      id: 2, 
      title: 'RSA Crane Service', 
      description: 'Corporate website for a heavy-machinery and crane service provider featuring dynamic service catalogs.', 
      tags: ['React', 'Node.js', 'PostgreSQL'], 
      live_url: 'https://rsacraneservice.com',
      image_url: '/assets/rsa_crane.png'
    }
  ]

  const displayProjects = projectsFallback

  return (
    <section className="section projects-section" id="projects">
      <div className="section-inner" style={{ perspective: '1000px' }}>
        <span className="section-tag">Selected Work</span>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 className="section-title" style={{ marginBottom: 0 }}>
            Projects that<br /><em>speak for themselves</em>
          </h2>
          <a href="#all-projects" className="btn btn-ghost" style={{ fontSize: '0.9rem', padding: '0.6rem 1.2rem', height: 'auto', width: 'auto' }}>
            Open all projects ↗
          </a>
        </div>

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
