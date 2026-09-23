'use client'

import { motion, useAnimationFrame, useMotionValue } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import type { IconType } from 'react-icons'
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiRedux,
  SiTailwindcss,
  SiJavascript,
  SiNodedotjs,
  SiGraphql,
  SiDocker,
  SiPostgresql,
  SiMongodb,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa'

const MotionBox = motion(Box)

type Tech = { name: string; icon: IconType; color: string }

const row1: Tech[] = [
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },
  { name: 'Redux', icon: SiRedux, color: '#764ABC' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38BDF8' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
]

const row2: Tech[] = [
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'AWS', icon: FaAws, color: '#FF9900' },
]

function TechChip({ tech }: { tech: Tech }) {
  const Icon = tech.icon
  return (
    <Chip
      variant="outlined"
      avatar={
        <Avatar
          sx={{
            bgcolor: 'rgba(255,255,255,0.08)',
            border: `1px solid ${tech.color}55`,
            '& svg': { width: '55%', height: '55%' },
          }}
        >
          <Icon color={tech.color} />
        </Avatar>
      }
      label={tech.name}
      sx={{
        flexShrink: 0,
        height: 'auto',
        py: { xs: 0.5, md: 1 },
        px: 0.5,
        borderWidth: 2,
        borderColor: 'divider',
        bgcolor: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(8px)',
        '& .MuiChip-label': { fontWeight: 600, fontSize: { xs: '0.8rem', md: '0.95rem' } },
        '& .MuiAvatar-root': { width: { xs: 24, md: 40 }, height: { xs: 24, md: 40 }, fontSize: { xs: '0.65rem', md: '0.75rem' } },
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
        pb: { xs: 6, md: 10, lg: 14 },
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
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.1fr 0.9fr' },
            gap: { xs: 2, md: 5, lg: 8 },
            alignItems: 'center',
          }}
        >
          <Box sx={{ textAlign: { xs: 'center', md: 'left' }, order: { xs: 2, md: 1 } }}>
            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              sx={{ mb: { xs: 1.5, md: 3 } }}
            >
              <Chip
                label="Open to opportunities"
                variant="outlined"
                color="primary"
                sx={{
                  bgcolor: 'rgba(255,222,102,0.15)',
                  fontWeight: 600,
                  px: 1,
                  py: { xs: 1.5, md: 2.5 },
                  fontSize: { xs: '0.75rem', md: '0.875rem' },
                }}
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
                  mb: { xs: 1.5, md: 3 },
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  fontSize: { xs: '1.9rem', md: '3.25rem', lg: '3.75rem' },
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
                  mx: { xs: 'auto', md: 0 },
                  mb: { xs: 2, md: 4, lg: 6 },
                  maxWidth: '38rem',
                  color: 'text.secondary',
                  fontWeight: 400,
                  fontSize: { xs: '0.9375rem', md: '1.25rem' },
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
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: { xs: 'center', md: 'flex-start' },
                gap: { xs: 1.5, md: 2 },
              }}
            >
              <Button
                href="#about"
                variant="contained"
                color="primary"
                size="large"
                sx={{ px: { xs: 2.5, md: 4 }, py: { xs: 0.75, md: '0.9rem' } }}
              >
                About Me
              </Button>
              <Button
                href="#contact"
                variant="outlined"
                color="primary"
                size="large"
                sx={{ px: { xs: 2.5, md: 4 }, py: { xs: 0.75, md: '0.9rem' } }}
              >
                Get In Touch
              </Button>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              sx={{ mt: { xs: 1.5, md: 5, lg: 10 } }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  gap: { xs: 2, md: 4 },
                  flexWrap: 'wrap',
                }}
              >
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
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            sx={{ display: 'flex', justifyContent: 'center', order: { xs: 1, md: 2 } }}
          >
            <Avatar
              variant="rounded"
              src="/profile.png"
              alt="Bruno Mbachu"
              sx={{
                width: '100%',
                maxWidth: { xs: 150, sm: 320, md: 420 },
                aspectRatio: '1 / 1',
                height: 'auto',
                borderRadius: 4,
              }}
            />
          </MotionBox>
        </Box>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          sx={{ mt: { xs: 2, md: 6, lg: 10 }, display: 'flex', flexDirection: 'column', gap: 1 }}
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
        sx={{ position: 'absolute', bottom: { xs: 12, md: 24, lg: 40 }, left: '50%', transform: 'translateX(-50%)' }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <Typography
            variant="caption"
            sx={{ fontWeight: 500, color: 'text.secondary', display: { xs: 'none', md: 'block' } }}
          >
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
