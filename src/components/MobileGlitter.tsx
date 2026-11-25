import { useEffect, useRef } from "react"

interface Particle {
    x: number
    y: number
    size: number
    baseAlpha: number
    twinkleSpeed: number
    twinklePhase: number
    vy: number
    vx: number
    color: string
    isStar: boolean
}

interface MobileGlitterProps {
    /** Quantidade de partículas glitter (padrão: 45) */
    count?: number
    /** Ativar ou desativar o efeito facilmente */
    enabled?: boolean
}

/**
 * Componente modular de efeito Glitter / Partículas cintilantes exclusivo para Mobile.
 * Sobrepõe suavemente a imagem de fundo com estrelas e pontos de luz cintilantes dourados/champagne.
 * 
 * Para desativar ou remover: basta desmarcar ou remover este componente no Background.tsx.
 */
export default function MobileGlitter({ count = 45, enabled = true }: MobileGlitterProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        if (!enabled) return

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationFrameId: number
        let width = 0
        let height = 0

        // Paleta elegante e luxuosa: champagne, dourado suave, branco diamante e leve toque rosé
        const colors = [
            "255, 238, 204", // Champagne suave
            "255, 218, 160", // Ouro clássico suave
            "255, 255, 255", // Branco brilhante
            "245, 205, 180", // Ouro rosé suave
        ]

        const handleResize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            width = window.innerWidth
            height = window.innerHeight
            canvas.width = width * dpr
            canvas.height = height * dpr
            ctx.scale(dpr, dpr)
        }

        handleResize()
        window.addEventListener("resize", handleResize)

        const createParticle = (initY?: number): Particle => {
            const isStar = Math.random() < 0.28 // ~28% viram estrelas de 4 pontas ao cintilar
            return {
                x: Math.random() * width,
                y: initY !== undefined ? initY : Math.random() * height,
                size: isStar ? 1.6 + Math.random() * 2.2 : 0.8 + Math.random() * 1.5,
                baseAlpha: 0.15 + Math.random() * 0.3,
                twinkleSpeed: 0.02 + Math.random() * 0.035,
                twinklePhase: Math.random() * Math.PI * 2,
                vy: -0.15 - Math.random() * 0.35, // movimento flutuante suave subindo
                vx: (Math.random() - 0.5) * 0.2,
                color: colors[Math.floor(Math.random() * colors.length)],
                isStar,
            }
        }

        const particles: Particle[] = Array.from({ length: count }, () => createParticle())

        // Desenha uma estrela cintilante de 4 pontas (formato de brilho de joia/glitter)
        const drawSparkle = (cx: number, cy: number, size: number) => {
            ctx.beginPath()
            // Cruz alongada e suave
            ctx.moveTo(cx, cy - size)
            ctx.quadraticCurveTo(cx, cy, cx + size, cy)
            ctx.quadraticCurveTo(cx, cy, cx, cy + size)
            ctx.quadraticCurveTo(cx, cy, cx - size, cy)
            ctx.quadraticCurveTo(cx, cy, cx, cy - size)
            ctx.closePath()
            ctx.fill()
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height)

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i]

                p.y += p.vy
                p.x += p.vx + Math.sin(p.twinklePhase) * 0.12
                p.twinklePhase += p.twinkleSpeed

                // Efeito cintilante não-linear (pico brilhante rápido como um piscar de glitter)
                const sineWave = (Math.sin(p.twinklePhase) + 1) / 2
                const shine = Math.pow(sineWave, 2.8)
                const currentAlpha = Math.min(1, p.baseAlpha + shine * 0.75)

                // Reinicia partícula ao sair do topo ou laterais
                if (p.y < -15 || p.x < -15 || p.x > width + 15) {
                    particles[i] = createParticle(height + 10)
                    continue
                }

                ctx.save()
                ctx.fillStyle = `rgba(${p.color}, ${currentAlpha})`
                ctx.shadowColor = `rgba(${p.color}, ${Math.min(1, currentAlpha)})`
                ctx.shadowBlur = p.isStar ? 6 : 3

                if (p.isStar && shine > 0.35) {
                    // Estrela de 4 pontas quando o brilho está no ápice
                    const starSize = p.size * (1 + shine * 1.2)
                    drawSparkle(p.x, p.y, starSize)
                } else {
                    // Ponto de luz circular suave
                    ctx.beginPath()
                    ctx.arc(p.x, p.y, p.size * (0.8 + shine * 0.4), 0, Math.PI * 2)
                    ctx.fill()
                }

                ctx.restore()
            }

            animationFrameId = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener("resize", handleResize)
            cancelAnimationFrame(animationFrameId)
        }
    }, [count, enabled])

    if (!enabled) return null

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full -z-10 xl:hidden pointer-events-none"
            style={{ mixBlendMode: "screen" }}
            aria-hidden="true"
        />
    )
}
