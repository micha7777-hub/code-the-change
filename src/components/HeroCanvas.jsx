import { useEffect, useRef } from 'react'

/**
 * Animated network background for the hero.
 * - A field of drifting nodes connected by faint lines (blue on white)
 * - A soft dot-grid underneath
 * - Mouse proximity brightens links and gently repels nodes
 * - Everything scales with DPR and pauses when off-screen
 */
export default function HeroCanvas() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0
    let h = 0
    let dpr = 1
    let nodes = []
    let raf = 0
    let running = true
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 }

    const BLUE = [29, 78, 216]
    const SKY = [14, 165, 233]

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      dpr = Math.min(2, window.devicePixelRatio || 1)
      w = rect.width
      h = rect.height
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    const seed = () => {
      const count = Math.round(Math.min(110, Math.max(40, (w * h) / 14000)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 1.2 + Math.random() * 1.8,
        hue: Math.random() < 0.8 ? BLUE : SKY,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.tx = e.clientX - rect.left
      mouse.ty = e.clientY - rect.top
    }
    const onLeave = () => {
      mouse.tx = -9999
      mouse.ty = -9999
    }

    const LINK = 130
    const MOUSE_R = 180

    const draw = (t) => {
      if (!running) return
      ctx.clearRect(0, 0, w, h)

      // smooth mouse
      mouse.x += (mouse.tx - mouse.x) * 0.08
      mouse.y += (mouse.ty - mouse.y) * 0.08

      // soft radial glow following the mouse
      if (mouse.tx > -1000) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 320)
        g.addColorStop(0, 'rgba(29,78,216,0.07)')
        g.addColorStop(1, 'rgba(29,78,216,0)')
        ctx.fillStyle = g
        ctx.fillRect(0, 0, w, h)
      }

      // update nodes
      for (const n of nodes) {
        if (!reduce) {
          n.x += n.vx
          n.y += n.vy
          // gentle repel from mouse
          const dx = n.x - mouse.x
          const dy = n.y - mouse.y
          const d2 = dx * dx + dy * dy
          if (d2 < MOUSE_R * MOUSE_R) {
            const d = Math.sqrt(d2) || 1
            const f = (1 - d / MOUSE_R) * 0.35
            n.x += (dx / d) * f
            n.y += (dy / d) * f
          }
        }
        if (n.x < -20) n.x = w + 20
        if (n.x > w + 20) n.x = -20
        if (n.y < -20) n.y = h + 20
        if (n.y > h + 20) n.y = -20
      }

      // links
      ctx.lineWidth = 1
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 > LINK * LINK) continue
          const d = Math.sqrt(d2)
          let alpha = (1 - d / LINK) * 0.22
          // brighten near mouse
          const mx = (a.x + b.x) / 2 - mouse.x
          const my = (a.y + b.y) / 2 - mouse.y
          const md = Math.sqrt(mx * mx + my * my)
          if (md < MOUSE_R) alpha += (1 - md / MOUSE_R) * 0.35
          ctx.strokeStyle = `rgba(${BLUE[0]},${BLUE[1]},${BLUE[2]},${alpha})`
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }

      // nodes
      for (const n of nodes) {
        const pulse = 0.75 + 0.25 * Math.sin(t / 900 + n.phase)
        const [r, g, b] = n.hue
        ctx.fillStyle = `rgba(${r},${g},${b},${0.55 * pulse})`
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    const io = new IntersectionObserver(([e]) => {
      running = e.isIntersecting
      if (running) raf = requestAnimationFrame(draw)
      else cancelAnimationFrame(raf)
    })

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove, { passive: true })
    canvas.parentElement.addEventListener('mouseleave', onLeave)
    io.observe(canvas)
    raf = requestAnimationFrame(draw)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      canvas.parentElement?.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return <canvas ref={ref} className="hero__canvas" aria-hidden="true" />
}
