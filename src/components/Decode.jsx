import { useEffect, useRef, useState } from 'react'

const GLYPHS = '!<>-_\\/[]{}—=+*^?#01'

/**
 * "Decode" text effect: characters scramble through glyphs then lock in
 * left-to-right. Inspired by terminal/hacker reveals but tuned to feel
 * precise rather than noisy.
 */
export default function Decode({ text, delay = 0, speed = 28, className = '' }) {
  const [chars, setChars] = useState(() => text.split('').map((c) => ({ c, done: false, show: '' })))
  const raf = useRef(0)

  useEffect(() => {
    const letters = text.split('')
    const start = performance.now() + delay
    const per = speed // ms per character lock
    const scrambleFrames = 6

    const tick = (now) => {
      const t = now - start
      let allDone = true
      const next = letters.map((c, i) => {
        if (c === ' ') return { c, done: true, show: ' ' }
        const lockAt = i * per + scrambleFrames * per
        const startAt = i * per
        if (t < startAt) {
          allDone = false
          return { c, done: false, show: '' }
        }
        if (t >= lockAt) return { c, done: true, show: c }
        allDone = false
        return { c, done: false, show: GLYPHS[Math.floor(Math.random() * GLYPHS.length)] }
      })
      setChars(next)
      if (!allDone) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [text, delay, speed])

  return (
    <span className={`decode ${className}`} aria-label={text}>
      {chars.map((ch, i) => (
        <span key={i} className={`decode__char ${ch.done ? '' : 'decode__char--scrambling'}`} aria-hidden="true">
          {ch.show || ' '}
        </span>
      ))}
    </span>
  )
}
