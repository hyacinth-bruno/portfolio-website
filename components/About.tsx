'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" ref={ref} className="relative py-32">
      <div className="container mx-auto px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="mb-6 text-5xl font-bold tracking-tight">
              About <span className="text-accent">Me</span>
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-muted">
              <p>
                I'm a Frontend Engineer with 5+ years of experience building scalable React and TypeScript 
                applications in product-driven environments. Currently working at Redcare Pharmacy in Cologne, 
                Germany, where I lead frontend development for complex product interfaces.
              </p>
              <p>
                My expertise lies in creating usable, performant, and maintainable UIs while collaborating 
                closely with product managers, designers, and backend teams. I've delivered complex dashboards, 
                workflows, and tools at scale in e-commerce and enterprise settings.
              </p>
              <p>
                Recently, I reduced WCAG violations by 70% across a 6-market e-commerce platform through 
                systematic accessibility improvements, demonstrating my commitment to building inclusive 
                web experiences for all users.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="rounded-2xl border border-border bg-background/50 p-8 backdrop-blur-sm">
              <h3 className="mb-6 text-2xl font-semibold">What I Do</h3>
              <div className="space-y-6">
                {[
                  {
                    title: 'Product Development',
                    description: 'Leading development of React/TypeScript interfaces integrating complex data and workflows',
                  },
                  {
                    title: 'Performance & Accessibility',
                    description: 'Optimizing web vitals and ensuring WCAG compliance across multi-market platforms',
                  },
                  {
                    title: 'UI/UX Implementation',
                    description: 'Designing intuitive components with clear visual hierarchy and responsive layouts',
                  },
                  {
                    title: 'Team Collaboration',
                    description: 'Working closely with product, design, and backend teams to deliver scalable solutions',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1 h-2 w-2 rounded-full bg-accent transition-all group-hover:scale-150" />
                      <div>
                        <h4 className="mb-1 font-semibold text-foreground">{item.title}</h4>
                        <p className="text-sm text-muted">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              <a
                href="https://github.com/hyacinth-bruno"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background/50 px-6 py-4 text-center font-medium transition-all hover:border-accent hover:text-accent"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/bruno-mbachu/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-accent bg-accent/10 px-6 py-4 text-center font-medium text-accent transition-all hover:bg-accent hover:text-background"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
