'use client'

import { useEffect, useState } from 'react'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Navigation from '@/components/Navigation'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

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
    <Box component="main" sx={{ position: 'relative', minHeight: '100vh' }}>
      {/* Cursor glow effect */}
      <Box
        sx={{
          pointerEvents: 'none',
          position: 'fixed',
          inset: 0,
          zIndex: 30,
          transition: 'opacity 0.3s ease',
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(253, 224, 71, 0.06), transparent 80%)`,
        }}
      />

      <Navigation />

      <Box sx={{ position: 'relative', zIndex: 10 }}>
        <Hero />
        <About />
        <Contact />
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          position: 'relative',
          zIndex: 10,
          borderTop: '2px solid',
          borderColor: 'divider',
          bgcolor: 'rgba(255,255,255,0.02)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Box
          sx={{
            maxWidth: 'lg',
            mx: 'auto',
            px: 3,
            py: 4,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary' }}>
            © {new Date().getFullYear()} Bruno Mbachu. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link
              href="https://github.com/hyacinth-bruno"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Bruno's GitHub profile"
              underline="hover"
              sx={{ fontWeight: 600, color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
            >
              GitHub
            </Link>
            <Link
              href="https://linkedin.com/in/bruno-mbachu/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Bruno's LinkedIn profile"
              underline="hover"
              sx={{ fontWeight: 600, color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
            >
              LinkedIn
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
