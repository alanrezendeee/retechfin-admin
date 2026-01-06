import { Box, Container, Typography, Button, Paper } from '@mui/material'
import { useAuthStore } from '@/store/authStore'
import { useNavigate } from 'react-router-dom'

export default function DashboardPage() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
      <Container maxWidth="lg">
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Bem-vindo, {user?.name}!
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
            Você está autenticado. O dashboard será implementado nas próximas fases.
          </Typography>
          <Button variant="contained" color="primary" onClick={handleLogout}>
            Sair
          </Button>
        </Paper>
      </Container>
    </Box>
  )
}

