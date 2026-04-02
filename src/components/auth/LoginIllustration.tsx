import { alpha, Box, useTheme } from '@mui/material'
import { colorTemplate } from '@/theme/colorTemplate'
import { glow, lp } from '@/theme/tokens'

/**
 * Mock visual alinhado ao card “Instância ativa” do LP Meu n8n (neon + elevated + glow ring).
 */
export default function LoginIllustration() {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  return (
    <Box
      sx={{
        position: 'relative',
        mt: 2,
        overflow: 'hidden',
        borderRadius: 3,
        border: 1,
        borderColor: 'divider',
        bgcolor: isDark ? lp.elevated : alpha(theme.palette.grey[900], 0.04),
        p: 3,
        boxShadow: isDark ? glow.ring : 'none',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          right: -72,
          top: -72,
          width: 220,
          height: 220,
          borderRadius: '50%',
          bgcolor: alpha(lp.neon, 0.12),
          filter: 'blur(48px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          left: -56,
          bottom: -48,
          width: 180,
          height: 180,
          borderRadius: '50%',
          bgcolor: alpha(colorTemplate.illustration.accent, colorTemplate.illustration.accentAlpha),
          filter: 'blur(40px)',
        }}
      />

      <Box sx={{ position: 'relative' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: lp.neon,
                boxShadow: `0 0 12px ${lp.neon}`,
              }}
            />
            <Box component="span" sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'text.secondary' }}>
              Painel ativo
            </Box>
          </Box>
          <Box
            component="span"
            sx={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: 10,
              px: 1,
              py: 0.25,
              borderRadius: 1,
                bgcolor: (t) => alpha(t.palette.common.white, t.palette.mode === 'dark' ? 0.06 : 0.08),
              color: 'primary.light',
            }}
          >
            admin.retechfin
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'center', py: 3 }}>
          {['Entradas', 'Planejar', 'Metas'].map((label, i) => (
            <Box
              key={label}
              sx={{
                px: 2,
                py: 1.5,
                borderRadius: 2,
                border: `1px solid ${i === 0 ? alpha(lp.neon, 0.35) : alpha(theme.palette.divider, 1)}`,
                bgcolor: (t) =>
                  i === 0
                    ? alpha(t.palette.common.black, t.palette.mode === 'dark' ? 0.45 : 0.06)
                    : alpha(t.palette.common.black, t.palette.mode === 'dark' ? 0.2 : 0.04),
                boxShadow: i === 0 ? `0 0 24px -8px ${alpha(lp.neon, 0.45)}` : 'none',
                textAlign: 'center',
                minWidth: 100,
              }}
            >
              <Box sx={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'text.disabled' }}>
                {i === 0 ? 'Hoje' : i === 1 ? 'Mês' : 'Família'}
              </Box>
              <Box sx={{ mt: 0.5, fontWeight: 700, color: 'text.primary', fontSize: '0.9rem' }}>{label}</Box>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1 }}>
          {[
            { k: 'Saldo visão', v: '—' },
            { k: 'Meta mês', v: '—' },
            { k: 'Status', v: 'OK' },
          ].map((row) => (
            <Box
              key={row.k}
              sx={{
                borderRadius: 2,
                border: 1,
                borderColor: 'divider',
                bgcolor: (t) => alpha(t.palette.common.black, t.palette.mode === 'dark' ? 0.35 : 0.04),
                px: 1.5,
                py: 1,
              }}
            >
              <Box sx={{ fontSize: 10, color: 'text.disabled' }}>{row.k}</Box>
              <Box sx={{ fontFamily: (t) => t.typography.h6.fontFamily, fontWeight: 800, fontSize: '1.1rem', color: lp.neonBright }}>{row.v}</Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
