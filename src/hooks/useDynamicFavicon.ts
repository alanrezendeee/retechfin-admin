import { useEffect } from 'react'
import { colorTemplate } from '@/theme/colorTemplate'

/**
 * Gera e injeta um favicon SVG fluorescente baseado em colorTemplate.primary.main.
 * Sempre que a cor mudar no template, re-renderizar o componente que usa este hook
 * atualizará o favicon automaticamente.
 */
export function useDynamicFavicon() {
  const color = colorTemplate.primary.main

  useEffect(() => {
    const svg = buildFaviconSvg(color)
    const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`

    let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']")
    if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      document.head.appendChild(link)
    }
    link.type = 'image/svg+xml'
    link.href = dataUrl
  }, [color])
}

function buildFaviconSvg(color: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <defs>
    <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Fundo arredondado escuro -->
  <rect width="32" height="32" rx="8" fill="#050506"/>

  <!-- Brilho de fundo sutil -->
  <rect width="32" height="32" rx="8" fill="${color}" fill-opacity="0.06"/>

  <!-- Linha de tendência (chart) com glow -->
  <polyline
    points="4,22 9,15 14,18 20,9 28,11"
    stroke="${color}"
    stroke-width="2.2"
    stroke-linecap="round"
    stroke-linejoin="round"
    fill="none"
    filter="url(#glow)"
  />

  <!-- Ponto final brilhante -->
  <circle cx="28" cy="11" r="2.2" fill="${color}" filter="url(#glow)"/>
</svg>`
}
