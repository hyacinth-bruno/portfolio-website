'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import SvgIcon from '@mui/material/SvgIcon'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'

const MotionBox = motion(Box)
const MotionCard = motion(Card)

function GitHubIcon(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </SvgIcon>
  )
}

function LinkedInIcon(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </SvgIcon>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Construct mailto link
    const mailtoLink = `mailto:mbachubruno.chidozie@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`
    window.location.href = mailtoLink
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactRows = [
    {
      icon: <EmailOutlinedIcon color="primary" />,
      label: 'Email',
      value: 'mbachubruno.chidozie@gmail.com',
      href: 'mailto:mbachubruno.chidozie@gmail.com',
    },
    {
      icon: <LocalPhoneOutlinedIcon color="primary" />,
      label: 'Phone',
      value: '+49 179 222 5853',
      href: 'tel:+491792225853',
    },
  ]

  return (
    <Box component="section" id="contact" ref={ref} sx={{ position: 'relative', py: 16 }}>
      <Box sx={{ maxWidth: 'lg', mx: 'auto', px: 3 }}>
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          sx={{ mb: 8, textAlign: 'center' }}
        >
          <Typography variant="h2" sx={{ mb: 2, fontWeight: 700, letterSpacing: '-0.02em', fontSize: { xs: '2.5rem', md: '3rem' } }}>
            Let&apos;s <Box component="span" sx={{ color: 'primary.main' }}>Connect</Box>
          </Typography>
          <Typography variant="h6" component="p" sx={{ mx: 'auto', maxWidth: '42rem', color: 'text.secondary', fontWeight: 400 }}>
            Open to new opportunities and collaborations. Feel free to reach out!
          </Typography>
        </MotionBox>

        <Box sx={{ mx: 'auto', maxWidth: 'md' }}>
          <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', lg: '2fr 3fr' } }}>
            {/* Contact Info */}
            <MotionCard
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              sx={{ height: 'fit-content' }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                  Get in Touch
                </Typography>

                <List disablePadding>
                  {contactRows.map((row) => (
                    <ListItem key={row.label} disableGutters alignItems="flex-start" sx={{ mb: 1 }}>
                      <ListItemIcon
                        sx={{
                          minWidth: 44,
                          height: 44,
                          width: 44,
                          borderRadius: 2,
                          bgcolor: 'rgba(255,222,102,0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {row.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={row.label}
                        secondary={
                          <Box
                            component="a"
                            href={row.href}
                            sx={{
                              color: 'text.secondary',
                              fontWeight: 500,
                              textDecoration: 'underline',
                              textUnderlineOffset: '4px',
                              '&:hover': { color: 'primary.main' },
                            }}
                          >
                            {row.value}
                          </Box>
                        }
                        slotProps={{ primary: { sx: { fontWeight: 600, mb: 0.5 } } }}
                      />
                    </ListItem>
                  ))}
                  <ListItem disableGutters alignItems="flex-start">
                    <ListItemIcon
                      sx={{
                        minWidth: 44,
                        height: 44,
                        width: 44,
                        borderRadius: 2,
                        bgcolor: 'rgba(255,222,102,0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <LocationOnOutlinedIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Location"
                      secondary="Hamm, Germany"
                      slotProps={{
                        primary: { sx: { fontWeight: 600, mb: 0.5 } },
                        secondary: { sx: { color: 'text.secondary', fontWeight: 500 } },
                      }}
                    />
                  </ListItem>
                </List>

                <Divider sx={{ my: 4, borderWidth: 1 }} />

                <Typography sx={{ mb: 2, fontWeight: 600 }}>Connect With Me</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <IconButton
                    component="a"
                    href="https://github.com/hyacinth-bruno"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit Bruno's GitHub profile"
                    sx={{
                      height: 48,
                      width: 48,
                      borderRadius: 2,
                      border: '2px solid',
                      borderColor: 'divider',
                      '&:hover': { borderColor: 'primary.main', color: 'primary.main' },
                    }}
                  >
                    <GitHubIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    component="a"
                    href="https://linkedin.com/in/bruno-mbachu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit Bruno's LinkedIn profile"
                    sx={{
                      height: 48,
                      width: 48,
                      borderRadius: 2,
                      border: '2px solid',
                      borderColor: 'divider',
                      '&:hover': { borderColor: 'primary.main', color: 'primary.main' },
                    }}
                  >
                    <LinkedInIcon fontSize="small" />
                  </IconButton>
                </Box>
              </CardContent>
            </MotionCard>

            {/* Contact Form */}
            <MotionBox
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                  id="name"
                  name="name"
                  label="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  fullWidth
                  placeholder="Your name"
                />

                <TextField
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  fullWidth
                  placeholder="your.email@example.com"
                />

                <TextField
                  id="message"
                  name="message"
                  label="Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  fullWidth
                  multiline
                  rows={6}
                  placeholder="Tell me about your project or opportunity..."
                />

                <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
                  Send Message
                </Button>
              </Box>
            </MotionBox>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
