import { alpha, Box, Typography, type SxProps, type Theme } from '@mui/material'
import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded'
import { APP_NAME, BRAND_SUFFIX } from '@/constants/app'
import { lp } from '@/theme/tokens'

type Props = {
  compact?: boolean
  sx?: SxProps<Theme>
}

export function AppLogo({ compact, sx }: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: compact ? 1 : 1.25,
        textDecoration: 'none',
        color: 'inherit',
        ...sx,
      }}
      component="div"
    >
      <Box
        sx={{
          width: compact ? 36 : 42,
          height: compact ? 36 : 42,
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, ${alpha(lp.neon, 0.2)} 0%, ${alpha(lp.neonDim, 0.15)} 100%)`,
          border: `1px solid ${alpha(lp.neon, 0.35)}`,
          boxShadow: `0 0 24px -8px ${alpha(lp.neon, 0.55)}`,
        }}
      >
        <ShowChartRoundedIcon sx={{ fontSize: compact ? 22 : 24, color: lp.neon }} />
      </Box>
      {!compact && (
        <Box>
          <Typography
            component="span"
            sx={{
              fontFamily: (t) => t.typography.h6.fontFamily,
              fontWeight: 800,
              fontSize: '0.9srem',
              letterSpacing: '-0.02em',
              color: 'text.primary',
            }}
          >
            {APP_NAME}
            <Typography
              component="span"
              sx={{
                ml: 0.75,
                fontSize: '0.625rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: lp.neonBright,
              }}
            >
              {BRAND_SUFFIX}
            </Typography>
          </Typography>
        </Box>
      )}
    </Box>
  )
}
