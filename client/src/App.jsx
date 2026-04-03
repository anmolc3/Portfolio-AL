import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      {/* SVG filter definitions — liquid glass effect */}
      <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="bubble-water" x="-20%" y="-20%" width="140%" height="140%">
            {/* Water droplets texture */}
            <feTurbulence type="fractalNoise" baseFrequency="0.25" numOctaves="4" seed="12" result="bubbles" />
            <feDiffuseLighting in="bubbles" lighting-color="#ffffff" surfaceScale="2" result="diffuse">
               <feDistantLight azimuth="225" elevation="60" />
            </feDiffuseLighting>
            <feComposite in="diffuse" in2="SourceAlpha" operator="in" result="diffuse-clip" />
            {/* Edge highlights/glint */}
            <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="edge-blur" />
            <feSpecularLighting in="edge-blur" surfaceScale="5" specularConstant="1.5" specularExponent="30" lighting-color="#ffffff" result="specular">
              <fePointLight x="-50" y="-100" z="200" />
            </feSpecularLighting>
            <feComposite in="specular" in2="SourceAlpha" operator="in" result="specular-clip" />
            {/* Surface warp */}
            <feTurbulence type="turbulence" baseFrequency="0.015 0.012" numOctaves="2" seed="5" result="noise">
               <animate attributeName="seed" dur="15s" values="5; 100; 5" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" result="warped" />
            {/* Final Combine */}
            <feMerge>
              <feMergeNode in="warped" />
              <feMergeNode in="diffuse-clip" />
              <feMergeNode in="specular-clip" />
            </feMerge>
          </filter>
          <filter id="liquid-distort" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.015 0.012" numOctaves="3" seed="5" result="noise">
              <animate attributeName="baseFrequency" dur="20s" values="0.015 0.012; 0.018 0.015; 0.015 0.012" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="35" xChannelSelector="R" yChannelSelector="G" result="displaced" />
            <feGaussianBlur in="displaced" stdDeviation="0.4" result="blurred" />
            <feComposite in="blurred" in2="SourceGraphic" operator="atop" />
          </filter>
          <filter id="glow-filter" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur1" />
            <feGaussianBlur stdDeviation="16" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glass-3d" x="-20%" y="-20%" width="140%" height="140%">
            {/* Bevel thickness */}
            <feMorphology operator="dilate" radius="1" in="SourceAlpha" result="thickened" />
            <feGaussianBlur in="thickened" stdDeviation="2" result="blur" />
            {/* Lighting for the bevel/specular effect */}
            <feSpecularLighting in="blur" surfaceScale="4" specularConstant="1.2" specularExponent="35" lighting-color="#ffffff" result="specular">
              <fePointLight x="-50" y="-100" z="400" />
            </feSpecularLighting>
            <feComposite in="specular" in2="SourceAlpha" operator="in" result="specular-clip" />
            {/* Inner shadow for depth */}
            <feOffset dx="2" dy="2" in="SourceAlpha" result="offset" />
            <feGaussianBlur in="offset" stdDeviation="3" result="offset-blur" />
            <feComposite in="offset-blur" in2="SourceAlpha" operator="out" result="inner-shadow" />
            {/* Combine everything */}
            <feMerge>
              <feMergeNode in="inner-shadow" />
              <feMergeNode in="SourceGraphic" />
              <feMergeNode in="specular-clip" />
            </feMerge>
          </filter>
          <filter id="depth-blur" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
        </defs>
      </svg>

      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
