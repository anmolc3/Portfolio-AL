import React, { useState, useEffect, useRef } from 'react';
import { liquidMetalFragmentShader, ShaderMount } from "https://esm.sh/@paper-design/shaders";

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const containerRef = useRef(null);
  const shaderRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Remove any previous shader mount if it exists
    if (shaderRef.current) {
        // ShaderMount doesn't seem to have a clear destroy in the snippet, 
        // but we can clear the container
        containerRef.current.innerHTML = '';
    }

    try {
        shaderRef.current = new ShaderMount(
            containerRef.current,
            liquidMetalFragmentShader,
            {
                u_repetition: 1.5,
                u_softness: 0.5,
                u_shiftRed: 0.3,
                u_shiftBlue: 0.3,
                u_distortion: 0,
                u_contour: 0,
                u_angle: 100,
                u_scale: 1.5,
                u_shape: 1,
                u_offsetX: 0.1,
                u_offsetY: -0.1
            },
            undefined,
            0.6
        );
    } catch (e) {
        console.error("Shader failed to load:", e);
    }

    // Load theme from localStorage or system
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        setIsDarkMode(false);
        document.body.classList.add('light-mode');
    }
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
        document.body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="theme-toggle-wrapper">
      <div 
        id="liquid-metal" 
        onClick={toggleTheme}
        title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {/* Dedicated container for the shader to prevent it from clearing UI elements */}
        <div className="shader-container" ref={containerRef} />
        
        <div className="outline">
          <div className="sign-container">
            {isDarkMode ? (
              /* Half Moon */
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sign">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            ) : (
              /* Sun */
              <svg viewBox="0 0 24 24" fill="none" stroke="#ffcc00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sign">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            )}
          </div>
          <svg className="svg-icon-branding" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M843.968 896a51.072 51.072 0 0 1-51.968-52.032V232H180.032A51.072 51.072 0 0 1 128 180.032c0-29.44 22.528-52.032 52.032-52.032h663.936c29.44 0 52.032 22.528 52.032 52.032v663.936c0 29.44-22.528 52.032-52.032 52.032z" fill="rgba(255,255,255,0.1)"></path>
            <path d="M180.032 896a49.92 49.92 0 0 1-36.48-15.616c-20.736-20.8-20.736-53.76 0-72.832L807.616 143.616c20.864-20.8 53.76-20.8 72.832 0 20.8 20.8 20.8 53.76 0 72.768L216.384 880.384a47.232 47.232 0 0 1-36.352 15.616z" fill="rgba(255,255,255,0.1)"></path>
          </svg>
        </div>
      </div>
      
      <style>{`
        .theme-toggle-wrapper {
          position: fixed;
          top: 1.5rem;
          right: 1.5rem;
          z-index: 2000;
        }

        #liquid-metal {
          position: relative;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        #liquid-metal:hover {
          transform: scale(1.1);
        }

        .shader-container {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          overflow: hidden;
          z-index: 0;
        }

        #liquid-metal::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 44px;
          height: 44px;
          background: linear-gradient(#444, #000);
          border-radius: 50%;
          box-shadow: inset 0 0.1rem 0.1rem 0.1rem rgba(255, 255, 255, 0.3);
          z-index: -1;
        }

        .outline {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1;
          pointer-events: none;
        }

        .sign-container {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10;
        }

        .sign {
          width: 20px;
          height: 20px;
          filter: drop-shadow(0 0 5px rgba(255,255,255,0.3));
        }

        .outline::before {
          content: "";
          position: absolute;
          inset: 0;
          padding: 2px;
          border-radius: inherit;
          background: conic-gradient(from 180deg, blue, purple, red, purple, blue);
          filter: grayscale(1);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask-composite: exclude;
          transition: all 0.3s ease;
        }

        #liquid-metal:hover .outline::before {
          filter: grayscale(0);
        }

        .svg-icon-branding {
          width: 24px;
          opacity: 0.1;
          z-index: 2;
        }
      `}</style>
    </div>
  );
}
