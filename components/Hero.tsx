'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
      {/* Geometric background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-block rounded-full border-2 border-accent bg-accent/15 px-4 py-1.5 text-sm font-semibold text-accent">
              Open to opportunities
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl"
          >
            Hi, I&apos;m <span className="text-accent">Bruno Mbachu</span>
            <br />
            Frontend Engineer
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground md:text-xl"
          >
            Building scalable React and TypeScript applications in product-driven environments. 
            Focused on usability, performance, and maintainable UI with hands-on collaboration across teams.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#projects"
              className="group relative overflow-hidden rounded-full bg-accent px-8 py-4 font-semibold text-background transition-all hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/30 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span className="relative z-10">View My Work</span>
            </a>
            <a
              href="#contact"
              className="rounded-full border-2 border-accent bg-background px-8 py-4 font-semibold text-accent transition-all hover:bg-accent hover:text-background focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Get In Touch
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-20"
          >
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                <span className="font-medium">5+ Years Experience</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                <span className="font-medium">Based in Hamm, Germany</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="h-6 w-4 rounded-full border-2 border-accent"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="mx-auto mt-1 h-2 w-1 rounded-full bg-accent"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
