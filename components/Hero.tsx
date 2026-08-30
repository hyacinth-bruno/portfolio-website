'use client'

import { motion, useAnimationFrame, useMotionValue } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

const MotionBox = motion(Box)

type Tech = { name: string; mark: string; color: string }

const row1: Tech[] = [
  { name: 'React', mark: 'Re', color: '#61DAFB' },
  { name: 'TypeScript', mark: 'TS', color: '#3178C6' },
  { name: 'Next.js', mark: 'N', color: '#FFFFFF' },
  { name: 'Redux', mark: 'Rx', color: '#764ABC' },
  { name: 'Tailwind CSS', mark: 'Tw', color: '#38BDF8' },
  { name: 'JavaScript', mark: 'Js', color: '#F7DF1E' },
]

const row2: Tech[] = [
  { name: 'Node.js', mark: 'Nd', color: '#339933' },
  { name: 'GraphQL', mark: 'Gq', color: '#E10098' },
  { name: 'Docker', mark: 'Dk', color: '#2496ED' },
  { name: 'PostgreSQL', mark: 'Pg', color: '#4169E1' },
  { name: 'MongoDB', mark: 'Mo', color: '#47A248' },
  { name: 'AWS', mark: 'AWS', color: '#FF9900' },
]

function TechChip({ tech }: { tech: Tech }) {
  return (
    <Chip
      variant="outlined"
      avatar={
        <Avatar
          sx={{
            bgcolor: `${tech.color}22`,
            color: tech.color,
            border: `1px solid ${tech.color}55`,
          }}
        >
          {tech.mark}
        </Avatar>
      }
      label={tech.name}
      sx={{
        flexShrink: 0,
        height: 'auto',
        py: 1,
        px: 0.5,
        borderWidth: 2,
        borderColor: 'divider',
        bgcolor: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(8px)',
        '& .MuiChip-label': { fontWeight: 600, fontSize: '0.95rem' },
      }}
    />
  )
}

function MarqueeRow({ items, direction = 1, speed = 30 }: { items: Tech[]; direction?: 1 | -1; speed?: number }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const [paused, setPaused] = useState(false)
  const [loopWidth, setLoopWidth] = useState(0)

  useEffect(() => {
    if (trackRef.current) {
      setLoopWidth(trackRef.current.scrollWidth / 2)
    }
  }, [])

  useAnimationFrame((_, delta) => {
    if (paused || !loopWidth) return
    let next = x.get() - direction * speed * (delta / 1000)
    if (next <= -loopWidth) next += loopWidth
    if (next > 0) next -= loopWidth
    x.set(next)
  })

  return (
    <Box
      sx={{
        overflow: 'hidden',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div ref={trackRef} style={{ x, display: 'flex', width: 'max-content', gap: '1rem' }}>
        {[...items, ...items].map((tech, i) => (
          <TechChip key={`${tech.name}-${i}`} tech={tech} />
        ))}
      </motion.div>
    </Box>
  )
}

export default function Hero() {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        pt: '80px',
      }}
    >
      {/* Geometric background elements */}
      <Box sx={{ position: 'absolute', inset: 0, zIndex: -1 }}>
        <Box
          sx={{
            position: 'absolute',
            right: 0,
            top: 80,
            height: 384,
            width: 384,
            borderRadius: '50%',
            bgcolor: 'primary.main',
            opacity: 0.05,
            filter: 'blur(64px)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: 384,
            width: 384,
            borderRadius: '50%',
            bgcolor: 'primary.main',
            opacity: 0.05,
            filter: 'blur(64px)',
          }}
        />
      </Box>

      <Box sx={{ maxWidth: 'lg', mx: 'auto', px: 3, width: '100%' }}>
        <Box sx={{ mx: 'auto', maxWidth: '56rem', textAlign: 'center' }}>
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            sx={{ mb: 3 }}
          >
            <Chip
              label="Open to opportunities"
              variant="outlined"
              color="primary"
              sx={{ bgcolor: 'rgba(255,222,102,0.15)', fontWeight: 600, px: 1, py: 2.5, fontSize: '0.875rem' }}
            />
          </MotionBox>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Typography
              variant="h1"
              sx={{
                mb: 3,
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                fontSize: { xs: '2.75rem', md: '3.75rem', lg: '4.5rem' },
              }}
            >
              Hi, I&apos;m <Box component="span" sx={{ color: 'primary.main' }}>Bruno Mbachu</Box>
              <br />
              Frontend Engineer
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Typography
              variant="h6"
              component="p"
              sx={{
                mx: 'auto',
                mb: 6,
                maxWidth: '42rem',
                color: 'text.secondary',
                fontWeight: 400,
                fontSize: { xs: '1.125rem', md: '1.25rem' },
              }}
            >
              Building scalable React and TypeScript applications in product-driven environments.
              Focused on usability, performance, and maintainable UI with hands-on collaboration across teams.
            </Typography>
          </motion.div>

          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 2 }}
          >
            <Button href="#about" variant="contained" color="primary" size="large">
              About Me
            </Button>
            <Button href="#contact" variant="outlined" color="primary" size="large">
              Get In Touch
            </Button>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            sx={{ mt: 10 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    height: 8,
                    width: 8,
                    borderRadius: '50%',
                    bgcolor: 'success.main',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  }}
                />
                <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  5+ Years Experience
                </Typography>
              </Box>
              <Box sx={{ height: 16, width: '1px', bgcolor: 'divider', display: { xs: 'none', sm: 'block' } }} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    height: 8,
                    width: 8,
                    borderRadius: '50%',
                    bgcolor: 'success.main',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  }}
                />
                <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  Based in Hamm, Germany
                </Typography>
              </Box>
            </Box>
          </MotionBox>
        </Box>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          sx={{ mx: 'auto', mt: 8, maxWidth: '64rem', display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <MarqueeRow items={row1} direction={1} speed={30} />
          <MarqueeRow items={row2} direction={-1} speed={30} />
        </MotionBox>
      </Box>

      {/* Scroll indicator */}
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        sx={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)' }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <Typography variant="caption" sx={{ fontWeight: 500, color: 'text.secondary' }}>
            Scroll to explore
          </Typography>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            style={{
              height: 24,
              width: 16,
              borderRadius: 9999,
              border: '2px solid #FFDE66',
            }}
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={{
                margin: '4px auto 0',
                height: 8,
                width: 4,
                borderRadius: 9999,
                backgroundColor: '#FFDE66',
              }}
            />
          </motion.div>
        </Box>
      </MotionBox>
    </Box>
  )
}
