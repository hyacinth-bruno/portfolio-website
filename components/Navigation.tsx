'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = ['About', 'Skills', 'Projects', 'Contact']

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : ''
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex h-20 items-center justify-between">
          <a href="#" className="text-xl font-semibold tracking-tight">
            <span className="text-accent">Bruno</span> Mbachu
          </a>

          <div className="hidden gap-8 md:flex">
            {navItems.map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground focus-visible:text-accent"
              >
                {item}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          <motion.a
            href="#contact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="rounded-full border-2 border-accent bg-background px-6 py-2 text-sm font-semibold text-accent transition-all hover:bg-accent hover:text-background focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Get In Touch
          </motion.a>
        </div>
      </div>
    </motion.nav>
  )
}
