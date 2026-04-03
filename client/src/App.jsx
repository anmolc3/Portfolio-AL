import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ThemeToggle from './components/ThemeToggle'
import LiquidHeroBackground from './components/LiquidHeroBackground'

export default function App() {
  return (
    <>
      <ThemeToggle />
      {/* SVG filter definitions — liquid glass effect */}
      <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          {/* Bubble/Titles */}
          <filter id="bubble-water" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.25" numOctaves="4" seed="12" result="bubbles" />
            <feDiffuseLighting in="bubbles" lighting-color="#ffffff" surfaceScale="2" result="diffuse">
               <feDistantLight azimuth="225" elevation="60" />
            </feDiffuseLighting>
            <feComposite in="diffuse" in2="SourceAlpha" operator="in" result="diffuse-clip" />
            <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="edge-blur" />
            <feSpecularLighting in="edge-blur" surfaceScale="5" specularConstant="1.5" specularExponent="30" lighting-color="#ffffff" result="specular">
              <fePointLight x="-50" y="-100" z="200" />
            </feSpecularLighting>
            <feComposite in="specular" in2="SourceAlpha" operator="in" result="specular-clip" />
            <feTurbulence type="turbulence" baseFrequency="0.015 0.012" numOctaves="1" seed="5" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" result="warped" />
            <feMerge>
              <feMergeNode in="warped" />
              <feMergeNode in="diffuse-clip" />
              <feMergeNode in="specular-clip" />
            </feMerge>
          </filter>
          <filter id="liquid-distort" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.015 0.012" numOctaves="1" seed="5" result="noise" />
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

          {/* Liquid Glass — Advanced Bit Packing (Cubiq) */}
          {/* Liquid Glass — Smooth Wavy Morphing (Light Theme Optimized) */}
          <filter id="liquid-glass-morph" x="-30%" y="-30%" width="160%" height="160%">
            {/* 1. Create the gooey merged shape from the icon solids */}
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -14" result="goo-solid" />
            
            {/* 2. Generate a crystal clear glass body by drastically lowering opacity */}
            {/* Set Alpha to 5% so it's fully transparent like water */}
            <feColorMatrix in="goo-solid" type="matrix" values="1.2 0 0 0 0  0 1.2 0 0 0  0 0 1.2 0 0  0 0 0 0.05 0" result="glass-body" />
            
            {/* 3. Extract the alpha mask for lighting generation */}
            <feColorMatrix in="goo-solid" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0" result="goo-alpha" />
            
            {/* 4. Inner refraction edge (mimics fresnel/thickness of glass) */}
            <feMorphology in="goo-alpha" operator="erode" radius="3" result="eroded" />
            <feGaussianBlur in="eroded" stdDeviation="4" result="eroded-blur" />
            <feComposite in="goo-alpha" in2="eroded-blur" operator="out" result="edge" />
            {/* Color the edge pure white with 80% opacity */}
            <feColorMatrix in="edge" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.8 0" result="glass-edge" />
            
            {/* 5. 3D Specular Highlight (The wet/glossy reflections) */}
            <feGaussianBlur in="goo-alpha" stdDeviation="5" result="spec-depth" />
            <feSpecularLighting in="spec-depth" surfaceScale="7" specularConstant="1.2" specularExponent="40" lighting-color="#ffffff" result="spec">
              <fePointLight x="-50" y="-100" z="250" />
            </feSpecularLighting>
            <feComposite in="spec" in2="goo-alpha" operator="in" result="spec-cut" />

            {/* 6. Bottom shadow for realistic floating liquid (shadow ONLY, no solid fill) */}
            <feGaussianBlur in="goo-alpha" stdDeviation="15" result="shadow-blur" />
            <feOffset in="shadow-blur" dx="0" dy="10" result="shadow-offset" />
            <feFlood flood-color="#fb4268" flood-opacity="0.15" result="shadow-color" />
            <feComposite in="shadow-color" in2="shadow-offset" operator="in" result="shadow" />
            
            {/* 7. Strip the opaque white background away to reveal crystal liquid! */}
            {/* White becomes transparent, Black stays opaque. Anti-aliasing preserved. */}
            <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -0.333 -0.333 -0.333 1 0" result="extracted-icons" />
            <feComposite in="extracted-icons" in2="goo-alpha" operator="in" result="masked-icons" />
            
            {/* 8. Merge all layers: Shadow -> Glass Body -> Edge -> Specular -> Crisp Icons */}
            <feMerge>
              <feMergeNode in="shadow" />
              <feMergeNode in="glass-body" />
              <feMergeNode in="glass-edge" />
              <feMergeNode in="spec-cut" />
              <feMergeNode in="masked-icons" />
            </feMerge>
          </filter>
          <filter id="depth-blur" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>

          {/* Genuine Water Refraction Distorter for the NavBar Backdrop */}
          <filter id="water-ripple">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.8 0" in="noise" result="coloredNoise" />
            <feDisplacementMap in="SourceGraphic" in2="coloredNoise" scale="25" xChannelSelector="R" yChannelSelector="G" result="displaced" />
          </filter>
          {/* GENUINE DISPLACEMENT LIQUID GLASS FILTERS (From User) */}
          <filter id="liquid-glass" colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
            <feImage x="0" y="0" preserveAspectRatio="none" result="map" href="data:image/svg+xml,<svg viewBox='0% 0% 100% 100%' xmlns='http://www.w3.org/2000/svg'><rect width='100%' height='100%' x='0' y='0' fill='gray' rx='22' ry='22' stroke='green' stroke-width='7' style='filter: contrast(2)'/></svg>"></feImage>
            <feGaussianBlur in="map" stdDeviation="1.5" result="blur" />
            <feDisplacementMap in="SourceGraphic" in2="blur" id="Greenchannel" result="dispGreen" scale="-50" xChannelSelector="G" yChannelSelector="R" />
          </filter>

          <filter id="liquid-glass-two" colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
            <feImage x="0" y="0" preserveAspectRatio="none" result="map" href="data:image/svg+xml,<svg viewBox='0% 0% 100% 100%' xmlns='http://www.w3.org/2000/svg'><rect width='100%' height='100%' x='0' y='0' fill='gray' rx='22' ry='22' stroke='green' stroke-width='5' style='filter: blur(3px) contrast(2)'/></svg>"></feImage>
            <feDisplacementMap in="SourceGraphic" in2="map" id="Greenchannel-two" result="dispGreen" scale="-70" xChannelSelector="G" yChannelSelector="R" />
          </filter>

          <filter id="thick-liquid-glass" colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
            <feImage x="0" y="0" preserveAspectRatio="none" result="map" href="data:image/svg+xml,<svg viewBox='0% 0% 100% 100%' xmlns='http://www.w3.org/2000/svg'><defs><linearGradient id='red-green-stroke' x1='0%' y1='0%' x2='0%' y2='100%'><stop offset='0%' stop-color='green'/><stop offset='100%' stop-color='green'/></linearGradient></defs><rect width='100%' height='100%' fill='gray' rx='22' ry='22' stroke='url(%23red-green-stroke)' stroke-width='5' style='filter:blur(5px) contrast(2)'/></svg>"></feImage>
            <feDisplacementMap in="SourceGraphic" in2="map" id="redchannel-one" result="dispRed" scale="-100" xChannelSelector="G" yChannelSelector="R"></feDisplacementMap>
          </filter>

          <filter id="melted-liquid-glass-angled" colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
            <feImage x="0" y="0" preserveAspectRatio="none" result="map" href="data:image/svg+xml,<svg viewBox='0 0 100% 100%' xmlns='http://www.w3.org/2000/svg'><defs><linearGradient id='red-green-stroke' x1='0%' y1='0%' x2='0%' y2='100%'><stop offset='0%' stop-color='red'/><stop offset='100%' stop-color='green'/></linearGradient></defs><rect width='100%' height='100%' fill='gray' rx='40' ry='40' stroke='url(%23red-green-stroke)' stroke-width='15' style='filter:blur(3px)'/></svg>"></feImage>
            <feDisplacementMap in="SourceGraphic" in2="map" id="redchannel-two" result="dispRed" scale="-50" xChannelSelector="R" yChannelSelector="G"></feDisplacementMap>
          </filter>

          <filter id="liquid-glass-stretchy-angled" colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
            <feImage x="0" y="0" preserveAspectRatio="none" result="map" href="data:image/svg+xml,<svg viewBox='0% 0% 100% 100%' xmlns='http://www.w3.org/2000/svg'><defs><linearGradient id='red-green-stroke' x1='0%' y1='0%' x2='0%' y2='100%'><stop offset='0%' stop-color='red'/><stop offset='100%' stop-color='green'/></linearGradient></defs><rect width='100%' height='100%' fill='gray' rx='40' ry='40' stroke='url(%23red-green-stroke)' stroke-width='5' style='filter:blur(3px)'/></svg>"></feImage>
            <feDisplacementMap in="SourceGraphic" in2="map" id="redchannel-three" result="dispRed" scale="-70" xChannelSelector="R" yChannelSelector="G"></feDisplacementMap>
          </filter>

          <filter id="liquid-glass-stretchy-angled-radius-0rem" colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
            <feImage x="0" y="0" preserveAspectRatio="none" result="map" href="data:image/svg+xml,<svg viewBox='0 0 100% 100%' xmlns='http://www.w3.org/2000/svg'><defs><linearGradient id='red-grad' x1='0%' y1='0%' x2='0%' y2='0%'><stop offset='0%' stop-color='%230000'/><stop offset='100%' stop-color='red'/></linearGradient><linearGradient id='green-grad' x1='0%' y1='0%' x2='0%' y2='100%'><stop offset='0%' stop-color='%230000'/><stop offset='100%' stop-color='green'/></linearGradient></defs><rect rx='0%' ry='0%' width='100%' height='100%' fill='black'/><rect rx='0%' ry='0%' width='100%' height='100%' fill='url(%23red-grad)'/><rect rx='0%' ry='0%' width='100%' height='100%' fill='url(%23green-grad)'/><rect rx='0%' ry='0%' width='100%' height='100%' fill='hsl(0 0% 50% / 1)' style='filter:blur(5px)'/></svg>"></feImage>
            <feDisplacementMap in="SourceGraphic" in2="map" id="redchannel-four" result="dispRed" scale="-100" xChannelSelector="R" yChannelSelector="G"></feDisplacementMap>
          </filter>
        </defs>
      </svg>

      <LiquidHeroBackground />
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
