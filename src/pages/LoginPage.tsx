import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Alert,
  Stack,
} from '@mui/material'
import { Visibility, VisibilityOff, Settings } from '@mui/icons-material'
import { useAuthStore } from '@/store/authStore'
import LoginIllustration from '@/components/auth/LoginIllustration'

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, isLoading } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'demo@retechfin.com',
      password: 'demo123',
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(null)
      await login(data)
      navigate('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login')
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex' }}>
      {/* Lado Esquerdo - Dark Premium Gradient */}
      <Box
        sx={{
          flex: 1,
          background: `
            radial-gradient(circle at 20% 30%, rgba(67, 56, 202, 0.6) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(124, 58, 237, 0.55) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.5) 0%, transparent 60%),
            linear-gradient(135deg, #4338ca 0%, #7c3aed 40%, #a855f7 100%)
          `,
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 4,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '300px',
            background: 'linear-gradient(to left, rgba(67, 56, 202, 0.7) 0%, rgba(67, 56, 202, 0.5) 10%, rgba(67, 56, 202, 0.3) 25%, rgba(67, 56, 202, 0.15) 45%, rgba(67, 56, 202, 0.08) 70%, rgba(67, 56, 202, 0.03) 90%, transparent 100%)',
            zIndex: 1,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(ellipse at 25% 40%, rgba(255, 255, 255, 0.08) 0%, transparent 30%),
              radial-gradient(ellipse at 75% 60%, rgba(255, 255, 255, 0.04) 0%, transparent 30%),
              radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.2) 0%, transparent 50%)
            `,
            zIndex: 0,
          },
        }}
      >
        {/* Efeito de brilho animado suave */}
        <Box
          sx={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
            animation: 'gentlePulse 10s ease-in-out infinite',
            '@keyframes gentlePulse': {
              '0%, 100%': {
                transform: 'scale(1)',
                opacity: 0.4,
              },
              '50%': {
                transform: 'scale(1.05)',
                opacity: 0.6,
              },
            },
          }}
        />

        <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center', color: 'white' }}>
          {/* Logo com Liquid Glass */}
          <Box 
            sx={{ 
              mb: 4,
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              padding: '32px 48px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1.5,
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
              }}
            >
              <Box
                component="span"
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.08) 100%)',
                  backdropFilter: 'blur(15px)',
                  border: '1.5px solid rgba(255, 255, 255, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3 13H7L9 3L15 21L17 11H21"
                    stroke="rgba(255, 255, 255, 0.95)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#glow)"
                  />
                  <defs>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                </svg>
              </Box>
              ReTechFin
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                opacity: 0.95, 
                fontWeight: 400,
                textShadow: '0 1px 4px rgba(0, 0, 0, 0.15)',
              }}
            >
              Suas finanças, nossa missão
            </Typography>
          </Box>

          {/* Ilustração */}
          <LoginIllustration />
        </Box>
      </Box>

      {/* Lado Direito - Formulário com Liquid Glass */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#f8f9fa',
          padding: { xs: 3, sm: 4 },
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to right, rgba(102, 126, 234, 0.03) 0%, transparent 100px)',
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
          {/* Help Button */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
            <Link
              href="#"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                color: 'text.secondary',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              <Settings sx={{ fontSize: 18 }} />
              Precisa de ajuda?
            </Link>
          </Box>

          {/* Card do formulário com Liquid Glass */}
          <Box
            sx={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              padding: 4,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
              mb: 4,
            }}
          >
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: '#1a1a1a' }}>
                Acesse sua conta
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                Quer saber mais sobre nós?{' '}
                <Link href="#" sx={{ color: 'primary.main', textDecoration: 'none', fontWeight: 500 }}>
                  Clique aqui
                </Link>
              </Typography>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
              {error && (
                <Alert severity="error" onClose={() => setError(null)}>
                  {error}
                </Alert>
              )}

              <TextField
                {...register('email')}
                label="Endereço de e-mail"
                type="email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
                autoComplete="email"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    background: 'rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.8)',
                    },
                    '&.Mui-focused': {
                      background: 'rgba(255, 255, 255, 0.9)',
                    },
                  },
                }}
              />

              <TextField
                {...register('password')}
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
                autoComplete="current-password"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    background: 'rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.8)',
                    },
                    '&.Mui-focused': {
                      background: 'rgba(255, 255, 255, 0.9)',
                    },
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Link
                  href="#"
                  sx={{
                    color: 'primary.main',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Esqueceu a senha?
                </Link>
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={isLoading}
                sx={{
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.85) 50%, rgba(240, 147, 251, 0.9) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  py: 1.5,
                  boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 1) 0%, rgba(118, 75, 162, 0.95) 50%, rgba(240, 147, 251, 1) 100%)',
                    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                  },
                }}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </Stack>
          </form>
          </Box>

          {/* Informações de Demo com Liquid Glass */}
          <Box 
            sx={{ 
              mt: 4, 
              p: 2.5, 
              background: 'rgba(255, 255, 255, 0.5)',
              backdropFilter: 'blur(15px)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
            }}
          >
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1, fontWeight: 600 }}>
              <strong>Credenciais de demonstração:</strong>
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Email: demo@retechfin.com
              <br />
              Senha: demo123
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

