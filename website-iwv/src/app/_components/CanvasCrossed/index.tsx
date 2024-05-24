'use client'

import { useCallback, useEffect, useRef } from 'react'

import { useTheme } from '../../_providers/Theme'

const CanvasCrossed = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    if (canvas && ctx) {
      // Définir la taille de l'affichage
      const displayWidth = canvas.offsetWidth
      const displayHeight = canvas.offsetHeight

      // Définir une résolution plus élevée (par exemple 2x)
      const scale = 2

      canvas.width = displayWidth * scale
      canvas.height = displayHeight * scale

      // Ajuster le style du canvas pour la taille d'affichage
      canvas.style.width = `${displayWidth}px`
      canvas.style.height = `${displayHeight}px`

      // Ajuster l'échelle de context pour le rendu haute résolution
      ctx.scale(scale, scale)

      const { width, height } = canvas

      ctx.fillStyle = 'transparent'
      ctx.fillRect(0, 0, width, height)

      const root = document.documentElement
      // Utiliser getComputedStyle pour obtenir le style calculé de l'élément
      const computedStyle = getComputedStyle(root)
      // Récupérer la valeur de la variable CSS
      const themeBg = computedStyle.getPropertyValue('--theme-text').trim()

      // Fonction pour ajouter un pixel blanc de manière aléatoire
      const addRandomWhitePixel = () => {
        const x = Math.floor(Math.random() * (displayWidth - 1))
        const y = Math.floor(Math.random() * (displayHeight - 1))
        const shape = Math.floor(Math.random() * 4) // 0: cross, 1: circle, 2: square, 3: triangle

        switch (shape) {
          case 0: // Cross
            ctx.fillStyle = themeBg
            ctx.fillRect(x, y, 9, 1)
            ctx.fillRect(x + 4, y - 4, 1, 9)
            break
          case 1: // Circle
            ctx.strokeStyle = themeBg
            ctx.beginPath()
            ctx.arc(x, y, 3, 0, 2 * Math.PI)
            ctx.stroke()
            break
          case 2: // Square
            ctx.strokeStyle = themeBg
            ctx.strokeRect(x, y, 5, 5)
            break
          case 3: // Triangle
            ctx.strokeStyle = themeBg
            ctx.beginPath()
            ctx.moveTo(x, y - 3)
            ctx.lineTo(x - 3, y + 3)
            ctx.lineTo(x + 3, y + 3)
            ctx.closePath()
            ctx.stroke()
            break
        }
      }

      // Dessiner 10 pixels blancs
      for (let i = 0; i < 10; i++) {
        addRandomWhitePixel()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme])

  useEffect(() => {
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Cleanup pour éviter des écouteurs d'événements multiples
    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [theme, resizeCanvas])

  return <canvas ref={canvasRef} className={className}></canvas>
}

export default CanvasCrossed
