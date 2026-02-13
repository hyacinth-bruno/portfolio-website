'use client'

import { useEffect, useState } from 'react'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import Navigation from '@/components/Navigation'

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <main className="relative min-h-screen">
      {/* Cursor glow effect */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(253, 224, 71, 0.06), transparent 80%)`,
        }}
      />

      <Navigation />
      
      <div className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t-2 border-border bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm font-medium text-muted-foreground">
              © {new Date().getFullYear()} Bruno Mbachu. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="https://github.com/hyacinth-bruno"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-muted-foreground underline decoration-2 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent focus-visible:text-accent"
                aria-label="Visit Bruno's GitHub profile"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/bruno-mbachu/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-muted-foreground underline decoration-2 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent focus-visible:text-accent"
                aria-label="Visit Bruno's LinkedIn profile"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
