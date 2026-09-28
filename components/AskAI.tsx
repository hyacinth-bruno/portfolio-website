'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Chip from '@mui/material/Chip'
import Alert from '@mui/material/Alert'
import Divider from '@mui/material/Divider'
import CircularProgress from '@mui/material/CircularProgress'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import CloseIcon from '@mui/icons-material/Close'
import { alpha } from '@mui/material/styles'

const MotionPanel = motion(Box)
const MotionDiv = motion.div

export const OPEN_ASK_AI_EVENT = 'open-ask-ai'

type JobFitResult = {
  requirements: { requirement: string; match: 'strong' | 'partial' | 'weak' | 'none'; evidence: string }[]
  overallFit: 'strong' | 'good' | 'moderate' | 'weak'
  summary: string
}

const matchColor: Record<string, { bg: string; border: string; text: string }> = {
  strong: { bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.35)', text: '#4ade80' },
  good: { bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.35)', text: '#4ade80' },
  partial: { bg: 'rgba(255,222,102,0.12)', border: 'rgba(255,222,102,0.35)', text: '#ffde66' },
  moderate: { bg: 'rgba(255,222,102,0.12)', border: 'rgba(255,222,102,0.35)', text: '#ffde66' },
  weak: { bg: 'rgba(248,113,113,0.12)', border: 'rgba(248,113,113,0.35)', text: '#f87171' },
  none: { bg: 'rgba(148,163,184,0.12)', border: 'rgba(148,163,184,0.35)', text: '#94a3b8' },
}

export default function AskAI() {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<'ask' | 'job'>('ask')
  const [question, setQuestion] = useState('')
  const [jobInput, setJobInput] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [answer, setAnswer] = useState('')
  const [jobFit, setJobFit] = useState<JobFitResult | null>(null)

  useEffect(() => {
    const openWidget = () => setOpen(true)
    window.addEventListener(OPEN_ASK_AI_EVENT, openWidget)
    return () => window.removeEventListener(OPEN_ASK_AI_EVENT, openWidget)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')
    setAnswer('')
    setJobFit(null)

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mode === 'ask' ? { question } : { jobInput }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      if (data.type === 'job-fit') {
        setJobFit(data.ranking)
      } else {
        setAnswer(data.answer)
      }
      setStatus('idle')
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  const canSubmit = mode === 'ask' ? question.trim().length > 0 : jobInput.trim().length > 0

  return (
    <Box sx={{ position: 'fixed', bottom: { xs: 16, sm: 24 }, right: { xs: 16, sm: 24 }, zIndex: 1300 }}>
      <AnimatePresence>
        {open && (
          <MotionPanel
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            sx={{
              position: 'absolute',
              bottom: { xs: 'calc(100% + 12px)', sm: 'calc(100% + 16px)' },
              right: 0,
              width: 'min(400px, calc(100vw - 32px))',
              maxHeight: 'min(640px, calc(100vh - 120px))',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              borderRadius: 4,
              border: '2px solid',
              borderColor: 'divider',
              bgcolor: (theme) => alpha(theme.palette.background.default, 0.98),
              backdropFilter: 'blur(20px)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.55)',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 2.5,
                py: 2,
                borderBottom: '1px solid',
                borderColor: 'divider',
                flexShrink: 0,
              }}
            >
              <Box>
                <Typography sx={{ fontWeight: 700 }}>Ask My AI Assistant</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Grounded in my bio &amp; GitHub projects
                </Typography>
              </Box>
              <IconButton size="small" aria-label="Close panel" onClick={() => setOpen(false)}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>

            <Box sx={{ px: 2.5, pt: 1.5, flexShrink: 0 }}>
              <Tabs
                value={mode}
                onChange={(_, value) => {
                  setMode(value)
                  setStatus('idle')
                  setErrorMessage('')
                  setAnswer('')
                  setJobFit(null)
                }}
                variant="fullWidth"
                sx={{ minHeight: 0 }}
              >
                <Tab value="ask" label="Ask a Question" sx={{ fontWeight: 600, minHeight: 0, fontSize: '0.8rem' }} />
                <Tab value="job" label="Check Job Fit" sx={{ fontWeight: 600, minHeight: 0, fontSize: '0.8rem' }} />
              </Tabs>
            </Box>

            <Box sx={{ px: 2.5, py: 2, overflowY: 'auto', flexGrow: 1 }}>
              <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {mode === 'ask' ? (
                  <TextField
                    label="Your question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="e.g. What has Bruno built with the Claude API?"
                    fullWidth
                    multiline
                    minRows={3}
                    size="small"
                    slotProps={{ htmlInput: { maxLength: 1000 } }}
                  />
                ) : (
                  <TextField
                    label="Job posting URL or description"
                    value={jobInput}
                    onChange={(e) => setJobInput(e.target.value)}
                    placeholder="Paste a job posting link, or paste the job description text directly"
                    fullWidth
                    multiline
                    minRows={4}
                    size="small"
                    slotProps={{ htmlInput: { maxLength: 20000 } }}
                  />
                )}

                {status === 'error' && (
                  <Alert severity="error" onClose={() => setStatus('idle')}>
                    {errorMessage}
                  </Alert>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!canSubmit || status === 'loading'}
                  startIcon={status === 'loading' ? <CircularProgress size={16} color="inherit" /> : undefined}
                >
                  {status === 'loading' ? 'Thinking...' : mode === 'ask' ? 'Ask' : 'Check Fit'}
                </Button>
              </Box>

              {answer && (
                <>
                  <Divider sx={{ my: 2.5, borderWidth: 1 }} />
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                    {answer.split('\n').filter(Boolean).map((paragraph, i) => (
                      <Typography key={i} variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                        {paragraph}
                      </Typography>
                    ))}
                  </Box>
                </>
              )}

              {jobFit && (
                <>
                  <Divider sx={{ my: 2.5, borderWidth: 1 }} />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 1.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      Overall fit:
                    </Typography>
                    <Chip
                      size="small"
                      label={jobFit.overallFit}
                      sx={{
                        textTransform: 'capitalize',
                        fontWeight: 700,
                        bgcolor: matchColor[jobFit.overallFit]?.bg,
                        color: matchColor[jobFit.overallFit]?.text,
                        border: '1px solid',
                        borderColor: matchColor[jobFit.overallFit]?.border,
                      }}
                    />
                  </Box>
                  <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary', lineHeight: 1.7 }}>
                    {jobFit.summary}
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {jobFit.requirements.map((req, i) => (
                      <Box
                        key={i}
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          border: '1px solid',
                          borderColor: 'divider',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1.5, mb: 0.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {req.requirement}
                          </Typography>
                          <Chip
                            size="small"
                            label={req.match}
                            sx={{
                              flexShrink: 0,
                              textTransform: 'capitalize',
                              fontWeight: 600,
                              bgcolor: matchColor[req.match]?.bg,
                              color: matchColor[req.match]?.text,
                              border: '1px solid',
                              borderColor: matchColor[req.match]?.border,
                            }}
                          />
                        </Box>
                        <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                          {req.evidence}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </>
              )}
            </Box>
          </MotionPanel>
        )}
      </AnimatePresence>

      <MotionDiv initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
        <IconButton
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
          sx={{
            width: 56,
            height: 56,
            bgcolor: 'primary.main',
            color: '#0a0a0a',
            boxShadow: '0 8px 24px rgba(255,222,102,0.35)',
            '&:hover': { bgcolor: 'primary.main', opacity: 0.9 },
          }}
        >
          {open ? <CloseIcon /> : <AutoAwesomeOutlinedIcon />}
        </IconButton>
      </MotionDiv>
    </Box>
  )
}
