import { createTheme, alpha } from '@mui/material/styles'
import type { PaletteMode } from '@mui/material'
import { fonts, glow, lp } from './tokens'

declare module '@mui/material/styles' {
  interface Palette {
    neon: {
      main: string
      bright: string
      dim: string
    }
  }
  interface PaletteOptions {
    neon?: {
      main: string
      bright: string
      dim: string
    }
  }
}

function paletteForMode(mode: PaletteMode) {
  const isDark = mode === 'dark'
  return {
    mode,
    primary: {
      main: lp.neon,
      light: lp.neonBright,
      dark: lp.neonDim,
      contrastText: lp.black,
    },
    secondary: {
      main: lp.neonDim,
      light: lp.neonBright,
      dark: '#009624',
      contrastText: lp.black,
    },
    neon: {
      main: lp.neon,
      bright: lp.neonBright,
      dim: lp.neonDim,
    },
    background: {
      default: isDark ? lp.surface : '#f4f4f5',
      paper: isDark ? lp.elevated : '#ffffff',
    },
    text: {
      primary: isDark ? lp.zinc100 : '#09090b',
      secondary: isDark ? lp.zinc400 : lp.zinc600,
      disabled: isDark ? alpha(lp.zinc500, 0.5) : alpha(lp.zinc600, 0.5),
    },
    divider: isDark ? lp.border : 'rgba(9, 9, 11, 0.08)',
    action: {
      active: isDark ? lp.zinc300 : lp.zinc600,
      hover: isDark ? alpha('#ffffff', 0.05) : alpha(lp.black, 0.04),
      selected: isDark ? alpha(lp.neon, 0.12) : alpha(lp.neon, 0.16),
      disabled: isDark ? alpha('#fff', 0.2) : alpha(lp.black, 0.26),
      disabledBackground: isDark ? alpha('#fff', 0.08) : alpha(lp.black, 0.08),
    },
  }
}

export function createAppTheme(mode: PaletteMode) {
  const isDark = mode === 'dark'

  return createTheme({
    palette: paletteForMode(mode),
    typography: {
      fontFamily: fonts.body,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
      h1: { fontFamily: fonts.display, fontWeight: 800 },
      h2: { fontFamily: fonts.display, fontWeight: 800 },
      h3: { fontFamily: fonts.display, fontWeight: 700 },
      h4: { fontFamily: fonts.display, fontWeight: 700 },
      h5: { fontFamily: fonts.display, fontWeight: 700 },
      h6: { fontFamily: fonts.display, fontWeight: 600 },
      subtitle1: { fontWeight: 500 },
      subtitle2: { fontWeight: 600 },
      button: { textTransform: 'none', fontWeight: 600 },
    },
    shape: { borderRadius: 12 },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: isDark ? lp.surface : '#f4f4f5',
            backgroundImage: isDark
              ? `radial-gradient(ellipse 80% 50% at 50% -20%, ${alpha(lp.neon, 0.12)}, transparent),
                 radial-gradient(circle at 80% 60%, ${alpha(lp.neonDim, 0.06)}, transparent 50%)`
              : 'none',
            backgroundAttachment: 'fixed',
          },
          '::selection': {
            backgroundColor: alpha(lp.neon, 0.3),
            color: '#fff',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 12, fontWeight: 700 },
          containedPrimary: {
            color: lp.black,
            background: `linear-gradient(90deg, ${lp.neonDim} 0%, ${lp.neon} 100%)`,
            boxShadow: glow.btn,
            '&:hover': {
              background: `linear-gradient(90deg, ${lp.neonDim} 0%, ${lp.neon} 100%)`,
              filter: 'brightness(1.08)',
              boxShadow: glow.btn,
            },
          },
          outlined: {
            borderColor: isDark ? lp.borderStrong : 'rgba(9,9,11,0.12)',
            '&:hover': {
              borderColor: alpha(lp.neon, 0.4),
              backgroundColor: isDark ? alpha('#fff', 0.04) : alpha(lp.neon, 0.06),
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            ...(isDark && {
              border: `1px solid ${lp.border}`,
            }),
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? alpha(lp.surface, 0.72) : alpha('#fff', 0.72),
            backdropFilter: 'blur(20px)',
            borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(9,9,11,0.06)'}`,
            boxShadow: 'none',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: isDark ? lp.surface : '#fafafa',
            borderRight: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(9,9,11,0.06)'}`,
            backgroundImage: 'none',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            marginBottom: 4,
            '&.Mui-selected': {
              backgroundColor: alpha(lp.neon, isDark ? 0.12 : 0.14),
              border: `1px solid ${alpha(lp.neon, 0.35)}`,
              boxShadow: isDark ? glow.ring : 'none',
              '&:hover': {
                backgroundColor: alpha(lp.neon, isDark ? 0.16 : 0.18),
              },
            },
          },
        },
      },
      MuiTextField: {
        defaultProps: { variant: 'outlined', size: 'medium' },
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 12,
              backgroundColor: isDark ? alpha('#000', 0.35) : alpha(lp.black, 0.02),
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: isDark ? lp.borderStrong : 'rgba(9,9,11,0.12)',
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: isDark ? lp.elevated : lp.zinc900,
            border: `1px solid ${lp.border}`,
            fontSize: 12,
          },
        },
      },
    },
  })
}
