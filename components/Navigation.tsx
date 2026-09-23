'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import SplitCTA from './SplitCTA'

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

  const navItems = ['About', 'Contact']

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
        <Typography
          component="a"
          href="#"
          variant="h6"
          sx={{
            fontWeight: 600,
            letterSpacing: '-0.02em',
            textDecoration: 'none',
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

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, mr: 2 }}>
          {navItems.map((item, index) => (
            <MotionButton
              key={item}
              href={`#${item.toLowerCase()}`}
              variant="text"
              color="primary"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              sx={{ color: 'text.secondary', fontWeight: 600, borderRadius: 2, px: 2 }}
            >
              {item}
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
