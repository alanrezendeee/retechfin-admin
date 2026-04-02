/**
 * Tokens derivados de `colorTemplate.ts` — compatível com imports existentes (`lp`, `glow`).
 * Para mudar cores, edite apenas `src/theme/colorTemplate.ts`.
 */
import { buildGlowFromPrimary, colorTemplate } from './colorTemplate'

export const fonts = {
  body: '"DM Sans", ui-sans-serif, system-ui, sans-serif',
  display: '"Syne", ui-sans-serif, system-ui, sans-serif',
} as const

const { primary, surface, border, neutral, common } = colorTemplate

/** @deprecated Prefira `colorTemplate` em código novo; mantido para compatibilidade. */
export const lp = {
  surface: surface.app,
  elevated: surface.elevated,
  border: border.subtle,
  borderStrong: border.strong,
  neon: primary.main,
  neonBright: primary.light,
  neonDim: primary.dark,
  zinc100: neutral.zinc100,
  zinc300: neutral.zinc300,
  zinc400: neutral.zinc400,
  zinc500: neutral.zinc500,
  zinc600: neutral.zinc600,
  zinc900: neutral.zinc900,
  black: common.black,
} as const

export const glow = buildGlowFromPrimary(colorTemplate.primary.main)
