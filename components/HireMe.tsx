'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined'
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined'
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined'
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined'
import { FaWhatsapp } from 'react-icons/fa'

const MotionBox = motion(Box)

const projectTypes = [
  { value: 'web', title: 'Web Application', subtitle: 'Full-stack web apps & platforms', icon: <DesktopWindowsOutlinedIcon sx={{ fontSize: 20 }} /> },
  { value: 'ai', title: 'AI Solution', subtitle: 'AI assistants, RAG & automation', icon: <PsychologyOutlinedIcon sx={{ fontSize: 20 }} /> },
  { value: 'internal', title: 'Internal Tool', subtitle: 'Portals, dashboards & workflows', icon: <StorageOutlinedIcon sx={{ fontSize: 20 }} /> },
  { value: 'other', title: 'Other', subtitle: 'Something different', icon: <MoreHorizOutlinedIcon sx={{ fontSize: 20 }} /> },
]

const contactMethods = [
  { value: 'whatsapp', label: 'WhatsApp', icon: <FaWhatsapp size={16} /> },
  { value: 'email', label: 'Email', icon: <EmailOutlinedIcon sx={{ fontSize: 16 }} /> },
  { value: 'phone', label: 'Phone', icon: <LocalPhoneOutlinedIcon sx={{ fontSize: 16 }} /> },
]

export default function HireMe() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const [projectType, setProjectType] = useState('ai')
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [sameNumberWhatsApp, setSameNumberWhatsApp] = useState(true)
  const [selectedMethods, setSelectedMethods] = useState<string[]>(['whatsapp'])
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const toggleMethod = (value: string) => {
    setSelectedMethods((prev) => (prev.includes(value) ? prev.filter((m) => m !== value) : [...prev, value]))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    const projectLabel = projectTypes.find((p) => p.value === projectType)?.title ?? ''
    const preferredMethods = selectedMethods
      .map((m) => contactMethods.find((c) => c.value === m)?.label)
      .filter((label): label is string => Boolean(label))

    try {
      const res = await fetch('/api/hire-me', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          sameNumberWhatsApp,
          projectType: projectLabel,
          description,
          preferredMethods,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send request')
      }

      setStatus('sent')
      setDescription('')
      setName('')
      setEmail('')
      setPhone('')
      setSelectedMethods(['whatsapp'])
      setProjectType('ai')
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  return (
    <Box component="section" id="hire-me" ref={ref} sx={{ position: 'relative', py: 16 }}>
      <Box sx={{ maxWidth: 'lg', mx: 'auto', px: 3 }}>
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          sx={{ mb: 8, textAlign: 'center' }}
        >
          <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.1em' }}>
            Send a Request
          </Typography>
          <Typography
            variant="h2"
            sx={{ mt: 1, mb: 2, fontWeight: 700, letterSpacing: '-0.02em', fontSize: { xs: '2.5rem', md: '3rem' } }}
          >
            Tell Me About Your <Box component="span" sx={{ color: 'primary.main' }}>Project</Box>
          </Typography>
          <Typography variant="h6" component="p" sx={{ mx: 'auto', mb: 3, maxWidth: '42rem', color: 'text.secondary', fontWeight: 400 }}>
            Share what you need and I&apos;ll get back to you with the best solution.
          </Typography>

          <Button
            href="/api/resume"
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            color="primary"
            startIcon={<DownloadOutlinedIcon />}
          >
            Download CV
          </Button>
        </MotionBox>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
        <Card component="form" onSubmit={handleSubmit}>
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Box sx={{ display: 'grid', gap: { xs: 5, md: 6 }, gridTemplateColumns: { xs: '1fr', md: '1.1fr 0.9fr' } }}>
              {/* Project details */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  pr: { md: 5 },
                  borderRight: { xs: 'none', md: '1px solid' },
                  borderColor: { md: 'divider' },
                }}
              >
                <Typography sx={{ mb: 2, fontWeight: 600 }}>What do you want me to build?</Typography>
                <RadioGroup value={projectType} onChange={(e) => setProjectType(e.target.value)}>
                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 4 }}>
                    {projectTypes.map((opt) => {
                      const selected = projectType === opt.value
                      return (
                        <Box
                          key={opt.value}
                          component="label"
                          sx={{
                            position: 'relative',
                            cursor: 'pointer',
                            border: '2px solid',
                            borderColor: selected ? 'primary.main' : 'divider',
                            borderRadius: 2,
                            p: 2.5,
                            minHeight: 120,
                            bgcolor: selected ? 'rgba(255,222,102,0.08)' : 'transparent',
                            boxShadow: selected ? '0 0 0 3px rgba(255,222,102,0.15)' : 'none',
                            transition: 'border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease',
                            '&:hover': { borderColor: 'primary.main' },
                          }}
                        >
                          <Radio
                            value={opt.value}
                            size="small"
                            sx={{ position: 'absolute', top: 8, right: 8, p: 0 }}
                          />
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 40,
                              height: 40,
                              borderRadius: 1.5,
                              mb: 2,
                              bgcolor: selected ? 'rgba(255,222,102,0.15)' : 'rgba(255,255,255,0.06)',
                              color: selected ? 'primary.main' : 'text.secondary',
                            }}
                          >
                            {opt.icon}
                          </Box>
                          <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', pr: 3 }}>{opt.title}</Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                            {opt.subtitle}
                          </Typography>
                        </Box>
                      )
                    })}
                  </Box>
                </RadioGroup>

                <Typography sx={{ mb: 1.5, fontWeight: 600 }}>Describe your project</Typography>
                <TextField
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell me more about what you need..."
                  fullWidth
                  multiline
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    '& .MuiInputBase-root': { height: '100%', alignItems: 'flex-start' },
                    '& .MuiInputBase-input': { height: '100% !important', overflow: 'auto' },
                  }}
                  slotProps={{ htmlInput: { maxLength: 2000 } }}
                />
                <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', mt: 0.5, color: 'text.secondary' }}>
                  {description.length}/2000
                </Typography>
              </Box>

              {/* Contact info */}
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                  label="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  required
                  fullWidth
                  sx={{ mb: 3 }}
                />
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  fullWidth
                  sx={{ mb: 3 }}
                />
                <TextField
                  label="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+49 151 2345 6789"
                  fullWidth
                  sx={{ mb: 1.5 }}
                />
                <Box
                  component="label"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    border: '2px solid',
                    borderColor: sameNumberWhatsApp ? 'primary.main' : 'divider',
                    bgcolor: sameNumberWhatsApp ? 'rgba(255,222,102,0.08)' : 'transparent',
                    borderRadius: 999,
                    px: 1.5,
                    py: 0.5,
                    cursor: 'pointer',
                    mb: 4,
                  }}
                >
                  <Checkbox
                    checked={sameNumberWhatsApp}
                    onChange={(e) => setSameNumberWhatsApp(e.target.checked)}
                    size="small"
                    sx={{ p: 0 }}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Same number on WhatsApp
                  </Typography>
                </Box>

                <Typography sx={{ fontWeight: 600 }}>How should I reach you?</Typography>
                <Typography variant="body2" sx={{ mb: 1.5, color: 'text.secondary' }}>
                  Pick any that work
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 4 }}>
                  {contactMethods.map((method) => {
                    const selected = selectedMethods.includes(method.value)
                    return (
                      <Chip
                        key={method.value}
                        icon={method.icon}
                        label={method.label}
                        onClick={() => toggleMethod(method.value)}
                        variant="outlined"
                        clickable
                        sx={{
                          borderWidth: 2,
                          borderColor: selected ? 'primary.main' : 'divider',
                          bgcolor: selected ? 'rgba(255,222,102,0.08)' : 'transparent',
                          color: selected ? 'primary.main' : 'text.primary',
                          fontWeight: 600,
                          '& .MuiChip-icon': { color: selected ? 'primary.main' : 'text.secondary' },
                        }}
                      />
                    )
                  })}
                </Box>

                <Box sx={{ mt: 'auto' }}>
                  {status === 'sent' && (
                    <Alert severity="success" onClose={() => setStatus('idle')} sx={{ mb: 2 }}>
                      Request sent! I&apos;ll get back to you within 24 hours.
                    </Alert>
                  )}
                  {status === 'error' && (
                    <Alert severity="error" onClose={() => setStatus('idle')} sx={{ mb: 2 }}>
                      {errorMessage}
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    disabled={status === 'sending'}
                    endIcon={status === 'sending' ? undefined : <ArrowForwardIcon />}
                    startIcon={status === 'sending' ? <CircularProgress size={18} color="inherit" /> : undefined}
                  >
                    {status === 'sending' ? 'Sending...' : 'Send Request'}
                  </Button>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
        </motion.div>
      </Box>
    </Box>
  )
}
