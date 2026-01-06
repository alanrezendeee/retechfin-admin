import { Box } from '@mui/material'

/**
 * Ilustração premium com ícone moderno de crescimento financeiro
 * Design de nível mundial com glassmorphism avançado
 */
export default function LoginIllustration() {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 500,
        height: 400,
        position: 'relative',
        mt: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
        padding: '20px',
      }}
    >
      {/* Círculo grande central com Liquid Glass premium */}
      <Box
        sx={{
          position: 'absolute',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%)',
          border: '1.5px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(35px)',
          boxShadow: `
            0 10px 40px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.08) inset,
            0 1px 0 rgba(255, 255, 255, 0.15) inset
          `,
          animation: 'float 12s ease-in-out infinite',
          zIndex: 2,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          '@keyframes float': {
            '0%, 100%': {
              transform: 'translate(-50%, -50%) translateY(0px) scale(1)',
            },
            '50%': {
              transform: 'translate(-50%, -50%) translateY(-20px) scale(1.02)',
            },
          },
        }}
      >
        {/* Ícone moderno de crescimento financeiro */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 120,
            height: 120,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'gentleBounce 5s ease-in-out infinite',
            '@keyframes gentleBounce': {
              '0%, 100%': {
                transform: 'translate(-50%, -50%) scale(1)',
              },
              '50%': {
                transform: 'translate(-50%, -50%) scale(1.02)',
              },
            },
          }}
        >
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Gradiente moderno para o gráfico */}
              <linearGradient id="chartGradient" x1="60" y1="100" x2="60" y2="20" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#10b981" stopOpacity="1" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="1" />
              </linearGradient>
              
              {/* Gradiente para o círculo */}
              <linearGradient id="circleGradient" x1="60" y1="0" x2="60" y2="120" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="1" />
              </linearGradient>
              
              {/* Filtro de brilho */}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Gráfico de crescimento - barras */}
            <g transform="translate(20, 80)">
              {/* Barra 1 */}
              <rect x="0" y="-25" width="12" height="25" rx="2" fill="url(#chartGradient)" opacity="0.8" />
              {/* Barra 2 */}
              <rect x="18" y="-40" width="12" height="40" rx="2" fill="url(#chartGradient)" opacity="0.9" />
              {/* Barra 3 */}
              <rect x="36" y="-55" width="12" height="55" rx="2" fill="url(#chartGradient)" opacity="1" />
              {/* Barra 4 */}
              <rect x="54" y="-65" width="12" height="65" rx="2" fill="url(#chartGradient)" opacity="1" />
            </g>

            {/* Linha de tendência crescente */}
            <path
              d="M 25 85 Q 40 70, 55 50 Q 70 30, 95 15"
              stroke="url(#chartGradient)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              filter="url(#glow)"
            />

            {/* Círculo no topo (meta alcançada) */}
            <circle
              cx="95"
              cy="15"
              r="10"
              fill="url(#circleGradient)"
              filter="url(#glow)"
            />
            <circle
              cx="95"
              cy="15"
              r="6"
              fill="rgba(255, 255, 255, 0.9)"
            />

            {/* Partículas de crescimento */}
            {[
              { x: 30, y: 75 },
              { x: 48, y: 60 },
              { x: 66, y: 45 },
              { x: 84, y: 30 },
            ].map((point, i) => (
              <circle
                key={i}
                cx={point.x}
                cy={point.y}
                r="2"
                fill="rgba(255, 255, 255, 0.6)"
                opacity={0.8 - i * 0.15}
              />
            ))}
          </svg>
        </Box>
      </Box>

      {/* Círculos decorativos com Liquid Glass */}
      {[
        { top: '10%', right: '15%', size: 90, delay: 0.5 },
        { bottom: '15%', left: '10%', size: 70, delay: 1 },
        { bottom: '20%', right: '20%', size: 80, delay: 1.5 },
        { top: '20%', left: '15%', size: 55, delay: 0.7 },
        { top: '5%', right: '5%', size: 40, delay: 2 },
        { bottom: '5%', left: '5%', size: 45, delay: 2.5 },
      ].map((circle, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            ...(circle.top && { top: circle.top }),
            ...(circle.bottom && { bottom: circle.bottom }),
            ...(circle.left && { left: circle.left }),
            ...(circle.right && { right: circle.right }),
            width: circle.size,
            height: circle.size,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(25px)',
            boxShadow: `
              0 4px 16px rgba(0, 0, 0, 0.15),
              0 0 0 1px rgba(255, 255, 255, 0.06) inset,
              0 1px 0 rgba(255, 255, 255, 0.12) inset
            `,
            animation: `float ${8 + i}s ease-in-out infinite ${circle.delay}s`,
            zIndex: 1,
          }}
        />
      ))}

      {/* Partículas sutis */}
      {[...Array(10)].map((_, i) => {
        const angle = (i * 36) * (Math.PI / 180)
        const radius = 200 + (i % 3) * 20
        const x = 50 + Math.cos(angle) * (radius / 10)
        const y = 50 + Math.sin(angle) * (radius / 10)
        
        return (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              width: i % 3 === 0 ? 4 : 3,
              height: i % 3 === 0 ? 4 : 3,
              borderRadius: '50%',
              background: `rgba(255, 255, 255, ${0.12 + (i % 3) * 0.04})`,
              boxShadow: '0 0 4px rgba(255, 255, 255, 0.3)',
              top: `${y}%`,
              left: `${x}%`,
              animation: `gentleTwinkle ${3.5 + (i * 0.2)}s ease-in-out infinite ${i * 0.15}s`,
              zIndex: 1,
              '@keyframes gentleTwinkle': {
                '0%, 100%': {
                  opacity: 0.06,
                  transform: 'scale(0.7)',
                },
                '50%': {
                  opacity: 0.35,
                  transform: 'scale(1.2)',
                },
              },
            }}
          />
        )
      })}

      {/* Efeito de brilho suave de fundo */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          height: '90%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 50%, transparent 75%)',
          animation: 'softPulse 10s ease-in-out infinite',
          filter: 'blur(40px)',
          zIndex: 0,
          '@keyframes softPulse': {
            '0%, 100%': {
              opacity: 0.2,
              transform: 'translate(-50%, -50%) scale(1)',
            },
            '50%': {
              opacity: 0.5,
              transform: 'translate(-50%, -50%) scale(1.1)',
            },
          },
        }}
      />
    </Box>
  )
}
