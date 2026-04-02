/**
 * Sistema de cores — edite apenas este arquivo para alterar toda a identidade visual.
 *
 * Estrutura semântica (primary / secondary / surface / …) com os valores atuais preservados.
 */
export const colorTemplate = {
  /** Marca — verde neon (equivalente a primary no MUI) */
  primary: {
    main: '#00e676',
    light: '#69f0ae',
    dark: '#00c853',
    contrastText: '#000000',
    /** Terceira parada no gradiente do título da tela de login */
    gradientEnd: '#6ee7b7',
  },

  /** Secundário (tons mais profundos do verde) */
  secondary: {
    dark: '#009624',
  },

  /** Superfícies — tema escuro (default do app) */
  surface: {
    app: '#050506',
    elevated: '#0c0e12',
    drawerLight: '#fafafa',
  },

  /** Modo claro (poucos pontos do MUI) */
  light: {
    background: '#f4f4f5',
    paper: '#ffffff',
    textPrimary: '#09090b',
  },

  /** Bordas */
  border: {
    subtle: 'rgba(255, 255, 255, 0.08)',
    strong: 'rgba(255, 255, 255, 0.1)',
    onLight: 'rgba(9, 9, 11, 0.08)',
    onLight12: 'rgba(9,9,11,0.12)',
  },

  /** App bar / drawer — linhas divisórias */
  chrome: {
    appBarBorderDark: 'rgba(255,255,255,0.05)',
    appBarBorderLight: 'rgba(9,9,11,0.06)',
    drawerBorderDark: 'rgba(255,255,255,0.05)',
    drawerBorderLight: 'rgba(9,9,11,0.06)',
  },

  /** Escala zinc (texto secundário / tooltips) */
  neutral: {
    zinc100: '#f4f4f5',
    zinc300: '#d4d4d8',
    zinc400: '#a1a1aa',
    zinc500: '#71717a',
    zinc600: '#52525b',
    zinc900: '#18181b',
  },

  common: {
    black: '#000000',
    white: '#ffffff',
  },

  /** Seleção de texto no documento */
  selection: {
    backgroundAlpha: 0.3,
    foreground: '#ffffff',
  },

  /** Detalhe decorativo na ilustração do login (blur) — valor anterior preservado */
  illustration: {
    accent: '#10b981',
    accentAlpha: 0.1,
  },
} as const

export type ColorTemplate = typeof colorTemplate

/** Converte #RRGGBB para RGB — usado para glow alinhado ao primary.main */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace('#', '')
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  }
}

/** Glow “neon” derivado da cor primary.main (mesma fórmula que antes, agora centralizada). */
export function buildGlowFromPrimary(primaryHex: string) {
  const { r, g, b } = hexToRgb(primaryHex)
  return {
    ring: `0 0 0 1px rgba(${r}, ${g}, ${b}, 0.25), 0 0 60px -12px rgba(${r}, ${g}, ${b}, 0.45)`,
    btn: `0 0 40px -8px rgba(${r}, ${g}, ${b}, 0.65), 0 8px 32px -12px rgba(0, 0, 0, 0.9)`,
  }
}
