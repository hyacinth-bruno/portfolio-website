import { createTheme, alpha } from '@mui/material/styles'

// Mirrors the HSL custom properties in globals.css so MUI and Tailwind
// render the same dark navy / gold palette.
const colors = {
  background: '#1A212D',
  foreground: '#FFFFFF',
  muted: '#B4BCCA',
  mutedForeground: '#D2D7DF',
  border: '#3D475C',
  accent: '#FFDE66',
  accentHover: '#FFD84D',
  accentContrast: '#1A212D',
  success: '#21C45D',
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: colors.background,
      paper: colors.background,
    },
    text: {
      primary: colors.foreground,
      secondary: colors.mutedForeground,
    },
    primary: {
      main: colors.accent,
      dark: colors.accentHover,
      contrastText: colors.accentContrast,
    },
    success: {
      main: colors.success,
    },
    divider: colors.border,
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: "'Libre Franklin', -apple-system, sans-serif",
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          '&.Mui-focusVisible': {
            outline: `2px solid ${colors.accent}`,
            outlineOffset: 2,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 9999,
          fontWeight: 600,
          padding: '0.9rem 2rem',
        },
      },
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: colors.accentHover,
              boxShadow: `0 10px 25px -5px ${alpha(colors.accent, 0.4)}`,
            },
          },
        },
        {
          props: { variant: 'outlined', color: 'primary' },
          style: {
            borderWidth: 2,
            '&:hover': {
              borderWidth: 2,
              backgroundColor: colors.accent,
              color: colors.accentContrast,
            },
          },
        },
        {
          props: { variant: 'text', color: 'primary' },
          style: {
            fontWeight: 600,
            '&:hover': {
              backgroundColor: 'transparent',
              color: colors.accent,
            },
          },
        },
      ],
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 9999,
          fontWeight: 600,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontSize: '0.75rem',
          fontWeight: 700,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: `2px solid ${colors.border}`,
          backgroundColor: alpha('#FFFFFF', 0.03),
          backgroundImage: 'none',
          backdropFilter: 'blur(8px)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.border,
            borderWidth: 2,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.accent,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.accent,
            borderWidth: 2,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: colors.mutedForeground,
        },
      },
    },
  },
})

export default theme
