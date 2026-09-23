'use client'

import Box from '@mui/material/Box'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import WorkOutlineIcon from '@mui/icons-material/WorkOutlineOutlined'

const segmentSx = {
  display: 'flex',
  alignItems: 'center',
  gap: { xs: 0.5, sm: 1 },
  px: { xs: 1.1, sm: 3 },
  py: { xs: 0.85, sm: 1.5 },
  color: 'primary.contrastText',
  textDecoration: 'none',
  fontWeight: 700,
  fontSize: { xs: '0.68rem', sm: '0.9rem' },
  whiteSpace: 'nowrap',
  transition: 'background-color 0.2s ease',
  '&:hover': { bgcolor: 'rgba(26,33,45,0.08)' },
} as const

export default function SplitCTA() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'stretch',
        borderRadius: 9999,
        overflow: 'hidden',
        background: 'linear-gradient(90deg, #FFE9A3 0%, #FFDE66 55%, #FFD84D 100%)',
      }}
    >
      <Box component="a" href="#contact" sx={segmentSx}>
        <EmailOutlinedIcon sx={{ fontSize: { xs: 16, sm: 20 } }} />
        Get In Touch
      </Box>

      <Box sx={{ width: '1px', my: { xs: 1, sm: 1.5 }, bgcolor: 'rgba(26,33,45,0.35)' }} />

      <Box component="a" href="#hire-me" sx={segmentSx}>
        <WorkOutlineIcon sx={{ fontSize: { xs: 16, sm: 20 } }} />
        Hire Me
      </Box>
    </Box>
  )
}
