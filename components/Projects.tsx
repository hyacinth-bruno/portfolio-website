'use client'

import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import NorthEastOutlinedIcon from '@mui/icons-material/NorthEastOutlined'
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded'
import CodeRoundedIcon from '@mui/icons-material/CodeRounded'
import type { PublicRepo } from '@/lib/github'

const MotionBox = motion(Box)
const MotionCard = motion(Card)

function formatRepoName(name: string): string {
  return name
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const [repos, setRepos] = useState<PublicRepo[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    let cancelled = false

    fetch('/api/github-projects')
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return
        if (data.error) throw new Error(data.error)
        setRepos(data.repos || [])
        setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [])

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
            Pulled live from my GitHub — a selection of things I&apos;ve designed and built, from AI tools and
            automations to full-stack web apps.
          </Typography>
        </MotionBox>

        {status === 'loading' && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress size={28} color="primary" />
          </Box>
        )}

        {status === 'error' && (
          <Alert severity="error" sx={{ maxWidth: 'sm', mx: 'auto' }}>
            Couldn&apos;t load projects from GitHub right now. Please try again later.
          </Alert>
        )}

        {status === 'ready' && repos.length === 0 && (
          <Typography sx={{ textAlign: 'center', color: 'text.secondary' }}>No public repositories found.</Typography>
        )}

        {status === 'ready' && repos.length > 0 && (
          <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' } }}>
            {repos.map((repo, index) => (
              <MotionCard
                key={repo.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                sx={{ display: 'flex', flexDirection: 'column' }}
              >
                <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1.5, mb: 1 }}>
                    <Typography
                      component="a"
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ fontWeight: 700, fontSize: '1.1rem', color: 'text.primary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
                    >
                      {formatRepoName(repo.name)}
                    </Typography>
                    {repo.stars > 0 && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0, color: 'text.secondary' }}>
                        <StarOutlineRoundedIcon sx={{ fontSize: 16 }} />
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                          {repo.stars}
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  <Typography variant="body2" sx={{ mb: 2.5, color: 'text.secondary', lineHeight: 1.6, flexGrow: 1 }}>
                    {repo.description || 'No description provided.'}
                  </Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2.5 }}>
                    {repo.language && (
                      <Chip
                        label={repo.language}
                        size="small"
                        sx={{
                          bgcolor: 'rgba(255,222,102,0.08)',
                          color: 'primary.main',
                          border: '1px solid',
                          borderColor: 'rgba(255,222,102,0.25)',
                          fontSize: '0.75rem',
                        }}
                      />
                    )}
                    {repo.topics.slice(0, 4).map((topic) => (
                      <Chip
                        key={topic}
                        label={topic}
                        size="small"
                        sx={{
                          bgcolor: 'rgba(255,255,255,0.04)',
                          color: 'text.secondary',
                          border: '1px solid',
                          borderColor: 'divider',
                          fontSize: '0.75rem',
                        }}
                      />
                    ))}
                  </Box>

                  <Box sx={{ mt: 'auto', display: 'flex', gap: 2.5 }}>
                    <Box
                      component="a"
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.5,
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        color: 'text.primary',
                        textDecoration: 'none',
                        '&:hover': { color: 'primary.main' },
                      }}
                    >
                      <CodeRoundedIcon sx={{ fontSize: 16 }} />
                      Code
                    </Box>
                    {repo.homepage && (
                      <Box
                        component="a"
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 0.5,
                          fontWeight: 600,
                          fontSize: '0.9rem',
                          color: 'text.primary',
                          textDecoration: 'none',
                          '&:hover': { color: 'primary.main' },
                        }}
                      >
                        Live
                        <NorthEastOutlinedIcon sx={{ fontSize: 16 }} />
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </MotionCard>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  )
}
