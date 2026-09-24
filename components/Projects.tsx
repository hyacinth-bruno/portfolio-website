'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import NorthEastOutlinedIcon from '@mui/icons-material/NorthEastOutlined'

const MotionBox = motion(Box)
const MotionCard = motion(Card)

const projects = [
  {
    title: 'ProcureAI',
    subtitle: 'AI Procurement Assistant',
    description:
      'AI assistant powered by the Claude API that parses every response into structured summaries, findings, risk flags, and next steps for enterprise procurement teams.',
    image: '/projects/procureai.png',
    stack: ['React', 'TypeScript', 'Claude API'],
    href: 'https://procure-ai-rouge.vercel.app/',
  },
  {
    title: 'ProcureLearn',
    subtitle: 'Gamified AI Learning Platform',
    description:
      'Scenario-based micro-learning app for AI adoption with 5 modules, an XP system, streaks, and progress rings, built entirely client-side with Framer Motion.',
    image: '/projects/procurelearn.png',
    stack: ['React', 'TypeScript', 'Framer Motion'],
    href: 'https://procurelearn-qk9g.vercel.app/',
  },
  {
    title: 'Battery Dashboard',
    subtitle: 'Real-Time EV Storage Monitoring',
    description:
      'Real-time high-voltage battery monitoring dashboard streaming live telemetry over WebSocket, with z-score anomaly detection for cell health and imbalance.',
    image: '/projects/battery-dashboard.png',
    stack: ['FastAPI', 'WebSocket', 'Next.js'],
    href: 'https://battery-dashboard-pi.vercel.app/',
  },
  {
    title: 'DocFlow',
    subtitle: 'Async Document Processing Pipeline',
    description:
      'Async document pipeline with real-time SSE progress, retry/backoff, a dead-letter queue, and a lightweight RAG chat grounded in uploaded documents.',
    image: '/projects/docflow.png',
    stack: ['FastAPI', 'Next.js', 'MongoDB'],
    href: 'https://frontend-nu-sable-42.vercel.app/',
  },
  {
    title: 'Portfolio Website',
    subtitle: 'This Site, Built From Scratch',
    description:
      'This portfolio itself — a Next.js and MUI site with a dark, gold-accented theme, animated interactions, and a structured Hire Me email pipeline built with Resend.',
    image: '/projects/portfolio.png',
    stack: ['Next.js', 'TypeScript', 'MUI'],
    href: 'https://bruno-mbachu-portfolio.vercel.app/',
  },
  {
    title: 'Developer Portal',
    subtitle: 'Backstage-Based Internal Developer Portal',
    description:
      'Self-service developer portal with a custom Scaffolder workflow for microservice creation, real-time SSE progress tracking, GitHub rate-limit protection, and automated repo/catalog registration.',
    image: '/projects/backstage.png',
    stack: ['React', 'TypeScript', 'Backstage'],
    href: 'https://backstage-drab.vercel.app/',
  },
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <Box component="section" id="projects" ref={ref} sx={{ position: 'relative', py: 16 }}>
      <Box sx={{ maxWidth: 'lg', mx: 'auto', px: 3 }}>
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          sx={{ mb: 8, textAlign: 'center' }}
        >
          <Typography
            variant="h2"
            sx={{ mb: 2, fontWeight: 700, letterSpacing: '-0.02em', fontSize: { xs: '2.5rem', md: '3rem' } }}
          >
            Featured <Box component="span" sx={{ color: 'primary.main' }}>Projects</Box>
          </Typography>
          <Typography variant="h6" component="p" sx={{ mx: 'auto', maxWidth: '42rem', color: 'text.secondary', fontWeight: 400 }}>
            A selection of things I&apos;ve designed and built, from AI tools and automations to full-stack web apps.
          </Typography>
        </MotionBox>

        <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' } }}>
          {projects.map((project, index) => (
            <MotionCard
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
            >
              <Box
                component="a"
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} live project`}
                sx={{
                  position: 'relative',
                  display: 'block',
                  width: '100%',
                  aspectRatio: '1280 / 533',
                  overflow: 'hidden',
                  borderBottom: '2px solid',
                  borderColor: 'divider',
                }}
              >
                <Image src={project.image} alt={`${project.title} screenshot`} fill style={{ objectFit: 'cover', objectPosition: 'top' }} />
              </Box>

              <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <Typography sx={{ fontWeight: 700, fontSize: '1.1rem' }}>{project.title}</Typography>
                <Typography variant="body2" sx={{ mb: 1.5, color: 'primary.main', fontWeight: 600 }}>
                  {project.subtitle}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2.5, color: 'text.secondary', lineHeight: 1.6 }}>
                  {project.description}
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2.5 }}>
                  {project.stack.map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
                      size="small"
                      sx={{
                        bgcolor: 'rgba(255,222,102,0.08)',
                        color: 'primary.main',
                        border: '1px solid',
                        borderColor: 'rgba(255,222,102,0.25)',
                        fontSize: '0.75rem',
                      }}
                    />
                  ))}
                </Box>

                <Box
                  component="a"
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    mt: 'auto',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.5,
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    color: 'text.primary',
                    textDecoration: 'none',
                    width: 'fit-content',
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  View project
                  <NorthEastOutlinedIcon sx={{ fontSize: 16 }} />
                </Box>
              </CardContent>
            </MotionCard>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
