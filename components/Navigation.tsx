'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import SplitCTA from './SplitCTA'
import { OPEN_ASK_AI_EVENT } from './AskAI'

const MotionAppBar = motion(AppBar)
const MotionButton = motion(Button)

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Ask AI', onClick: () => window.dispatchEvent(new Event(OPEN_ASK_AI_EVENT)) },
  ]

  return (
    <MotionAppBar
      position="fixed"
      elevation={0}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      sx={{
        backgroundColor: isScrolled ? (theme) => alpha(theme.palette.background.default, 0.8) : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderBottom: isScrolled ? '1px solid' : '1px solid transparent',
        borderColor: 'divider',
        transition: 'all 0.3s ease',
      }}
    >
      <Toolbar disableGutters sx={{ maxWidth: 'lg', mx: 'auto', width: '100%', px: 3, height: 80 }}>
        <Box
          component="a"
          href="#"
          sx={{ display: 'flex', alignItems: 'center', gap: 1.25, textDecoration: 'none' }}
        >
          <Image src="/portfolio-logo-icon.png" alt="" width={36} height={36} style={{ height: 36, width: 'auto' }} priority />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: 'text.primary',
              fontSize: { xs: '1rem', sm: '1.25rem' },
              whiteSpace: 'nowrap',
            }}
          >
            <Box component="span" sx={{ color: 'primary.main' }}>
              Bruno
            </Box>{' '}
            Mbachu
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, mr: 2 }}>
          {navItems.map((item, index) => (
            <MotionButton
              key={item.label}
              href={'href' in item ? item.href : undefined}
              onClick={'onClick' in item ? item.onClick : undefined}
              variant="text"
              color="primary"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              sx={{ color: 'text.secondary', fontWeight: 600, borderRadius: 2, px: 2 }}
            >
              {item.label}
            </MotionButton>
          ))}
        </Box>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <SplitCTA />
        </motion.div>
      </Toolbar>
    </MotionAppBar>
  )
}
