'use client'

import Box from '@mui/material/Box'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import WorkOutlineIcon from '@mui/icons-material/WorkOutlineOutlined'

export default function SplitCTA({ size = 'medium' }: { size?: 'medium' | 'large' }) {
  const isLarge = size === 'large'

  const segmentSx = {
    display: 'flex',
    alignItems: 'center',
    gap: isLarge ? { xs: 0.75, sm: 1 } : { xs: 0.5, sm: 1 },
    px: isLarge ? { xs: 1.75, sm: 4 } : { xs: 1.1, sm: 3 },
    py: isLarge ? { xs: 1, sm: 1.6 } : { xs: 0.85, sm: 1.5 },
    color: 'primary.contrastText',
    textDecoration: 'none',
    fontWeight: 700,
    fontSize: isLarge ? { xs: '0.8rem', sm: '1rem' } : { xs: '0.68rem', sm: '0.9rem' },
    whiteSpace: 'nowrap',
    transition: 'background-color 0.2s ease',
    '&:hover': { bgcolor: 'rgba(26,33,45,0.08)' },
  } as const

  const iconSx = { fontSize: isLarge ? { xs: 18, sm: 22 } : { xs: 16, sm: 20 } } as const

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
        <EmailOutlinedIcon sx={iconSx} />
        Get In Touch
      </Box>

      <Box sx={{ width: '1px', my: isLarge ? { xs: 1.25, sm: 1.75 } : { xs: 1, sm: 1.5 }, bgcolor: 'rgba(26,33,45,0.35)' }} />

      <Box component="a" href="#hire-me" sx={segmentSx}>
        <WorkOutlineIcon sx={iconSx} />
        Hire Me
      </Box>
    </Box>
  )
}
