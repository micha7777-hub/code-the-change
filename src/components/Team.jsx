import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from 'framer-motion'
import { team } from '../content.js'
import { photoFor } from '../teamPhotos.js'
import Reveal, { Stagger, item } from './Reveal.jsx'
import { Icon } from './Icons.jsx'

const initials = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join('')

const clamp01 = (v) => Math.max(0, Math.min(1, v))
const easeOut = (t) => 1 - Math.pow(1 - t, 3)
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const memberId = (m, i) => `${m.name}-${i}`.replace(/\s+/g, '-').toLowerCase()

function Avatar({ m, refCb, layoutId }) {
  const src = photoFor(m)
  const [broken, setBroken] = useState(false)
  const showImg = src && !broken
  return (
    <div className={`avatar ${showImg ? 'avatar--photo' : ''}`} ref={refCb}>
      <motion.div className="avatar__inner" layoutId={layoutId} style={{ borderRadius: '50%' }}>
        {showImg ? <img src={src} alt={m.name} loading="lazy" onError={() => setBroken(true)} /> : initials(m.name)}
      </motion.div>
    </div>
  )
}

/* ────────────────────────────────────────────────────────────
   Profile panel — opened by clicking any member. The avatar
   morphs into the large portrait (shared layoutId).
   ──────────────────────────────────────────────────────────── */
function Profile({ m, id, onClose }) {
  const src = photoFor(m)
  const [broken, setBroken] = useState(false)
  const showImg = src && !broken
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  const links = Object.entries(m.links || {}).filter(([, v]) => v)

  return (
    <motion.div className="profile__backdrop" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
      <motion.div
        className="profile"
        role="dialog"
        aria-modal="true"
        aria-label={m.name}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <button className="profile__close" onClick={onClose} aria-label="Close">
          <Icon.close />
        </button>
        <motion.div
          className={`profile__photo ${showImg ? '' : 'profile__photo--initials'}`}
          layoutId={id}
          style={{ borderRadius: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {showImg ? <img src={src} alt={m.name} onError={() => setBroken(true)} /> : <span>{initials(m.name)}</span>}
        </motion.div>
        <div className="profile__body">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
            <span className="tag">{m.role}</span>
            <h3>{m.name}</h3>
            {m.major && <div className="profile__major">{m.major}</div>}
            <p>{m.bio || `${m.role} at Code the Change.`}</p>
            {links.length > 0 && (
              <div className="profile__links">
                {links.map(([k, v]) => {
                  const I = Icon[k] || Icon.arrow
                  const href = k === 'email' ? `mailto:${v}` : v
                  return (
                    <a key={k} href={href} target={k === 'email' ? undefined : '_blank'} rel="noreferrer" aria-label={k}>
                      <I />
                    </a>
                  )
                })}
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ────────────────────────────────────────────────────────────
   Scroll-driven stage (desktop):
   The heading sits at the centre of the viewport while every
   officer orbits it as a constellation. Scrolling pulls the
   heading up and spirals the avatars down into the roster grid.
   ──────────────────────────────────────────────────────────── */
function TeamStage({ members, onOpen }) {
  const wrapRef = useRef(null)
  const stageRef = useRef(null)
  const headRef = useRef(null)
  const glowRef = useRef(null)
  const ringRef = useRef(null)
  const ring2Ref = useRef(null)
  const leadRef = useRef(null)
  const eyebrowRef = useRef(null)
  const wordRefs = useRef([])
  const cardRefs = useRef([])
  const bgRefs = useRef([])
  const infoRefs = useRef([])
  const avRefs = useRef([])
  const lineRefs = useRef([])
  const layout = useRef(null)
  const intro = useRef(0)

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] })
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 })

  const words = team.heading.split(' ')

  const render = (v) => {
    const L = layout.current
    if (!L) return
    const reveal = Math.max(clamp01(v / 0.18), intro.current)
    const headT = easeInOut(clamp01((v - 0.22) / 0.38))
    const t = easeInOut(clamp01((v - 0.34) / 0.52))
    const spin = (1 - t) * 1.35 + v * 0.3

    const headDY = (L.cy - L.headCY) * (1 - headT)
    headRef.current.style.transform = `translate3d(0, ${headDY}px, 0)`
    wordRefs.current.forEach((w, i) => {
      const wt = easeOut(clamp01((reveal - i * 0.12) / 0.6))
      w.style.transform = `translate3d(0, ${(1 - wt) * 110}%, 0)`
    })
    eyebrowRef.current.style.opacity = easeOut(clamp01(reveal * 1.6))
    const leadT = easeOut(clamp01((v - 0.08) / 0.14))
    leadRef.current.style.opacity = leadT
    leadRef.current.style.transform = `translate3d(0, ${(1 - leadT) * 10}px, 0)`

    glowRef.current.style.opacity = 1 - headT
    glowRef.current.style.transform = `translate(-50%, -50%) scale(${0.85 + (1 - headT) * 0.15})`
    ringRef.current.style.opacity = (1 - t) * 0.9
    ringRef.current.setAttribute('r', L.R)
    ringRef.current.style.transform = `rotate(${spin * 20}deg)`
    ring2Ref.current.style.opacity = (1 - t) * 0.5
    ring2Ref.current.setAttribute('r', L.R * 1.16)
    ring2Ref.current.style.transform = `rotate(${-spin * 12}deg)`

    const pts = []
    L.cards.forEach((c, i) => {
      const ang = c.theta + spin
      const ox = L.cx + Math.cos(ang) * L.R
      const oy = L.cy + Math.sin(ang) * L.R
      const ti = easeInOut(clamp01((t - c.lag) / (1 - c.lag)))
      const dx = (ox - c.acx) * (1 - ti)
      const dy = (oy - c.acy) * (1 - ti)
      const settle = easeOut(clamp01((ti - 0.72) / 0.28))
      const card = cardRefs.current[i]
      card.style.transform = `translate3d(${dx}px, ${dy}px, 0)`
      card.classList.toggle('member--settled', ti > 0.97)
      bgRefs.current[i].style.opacity = settle
      bgRefs.current[i].style.transform = `scale(${0.94 + settle * 0.06})`
      infoRefs.current[i].style.opacity = settle
      infoRefs.current[i].style.transform = `translate3d(${(1 - settle) * -10}px, 0, 0)`
      avRefs.current[i].style.transform = `scale(${1 + (1 - ti) * 0.3})`
      pts.push({ x: c.acx + dx, y: c.acy + dy, ti })
    })

    pts.forEach((a, i) => {
      const b = pts[(i + 1) % pts.length]
      const line = lineRefs.current[i]
      line.setAttribute('x1', a.x)
      line.setAttribute('y1', a.y)
      line.setAttribute('x2', b.x)
      line.setAttribute('y2', b.y)
      line.style.opacity = (1 - Math.max(a.ti, b.ti)) * 0.55
    })
  }

  const measure = () => {
    const stage = stageRef.current
    if (!stage) return
    const sw = stage.clientWidth
    const sh = stage.clientHeight
    const head = headRef.current
    const headCY = head.offsetTop + head.offsetHeight / 2
    const R = Math.min(sw * 0.36, sh * 0.37)
    const n = members.length
    const cards = cardRefs.current.map((el, i) => {
      const av = avRefs.current[i]
      // avatar centre relative to the stage, walking the offsetParent chain up to the card
      let x = av.offsetLeft + av.offsetWidth / 2
      let y = av.offsetTop + av.offsetHeight / 2
      let node = av.offsetParent
      while (node && node !== el && node !== stage) {
        x += node.offsetLeft
        y += node.offsetTop
        node = node.offsetParent
      }
      if (node === el) {
        x += el.offsetLeft
        y += el.offsetTop
      }
      return {
        acx: x,
        acy: y,
        theta: (i / n) * Math.PI * 2 - Math.PI / 2,
        lag: (((i * 7) % n) / n) * 0.22,
      }
    })
    layout.current = { sw, sh, cx: sw / 2, cy: sh / 2, headCY, R, cards }
    render(p.get())
  }

  useLayoutEffect(() => {
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(stageRef.current)
    document.fonts?.ready.then(measure)

    let raf = 0
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || intro.current > 0) return
        io.disconnect()
        const start = performance.now()
        const tick = (now) => {
          intro.current = clamp01((now - start) / 1100)
          render(p.get())
          if (intro.current < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.5 },
    )
    io.observe(stageRef.current)

    return () => {
      ro.disconnect()
      io.disconnect()
      cancelAnimationFrame(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useMotionValueEvent(p, 'change', render)

  return (
    <div className="team-wrap" ref={wrapRef}>
      <div className="team-stage" ref={stageRef}>
        <div className="team-stage__glow" ref={glowRef} />
        <svg className="team-stage__svg" aria-hidden="true">
          <circle className="team-stage__ring team-stage__ring--outer" ref={ring2Ref} cx="50%" cy="50%" r="0" />
          <circle className="team-stage__ring" ref={ringRef} cx="50%" cy="50%" r="0" />
          {members.map((_, i) => (
            <line key={i} ref={(el) => (lineRefs.current[i] = el)} className="team-stage__line" />
          ))}
        </svg>

        <div className="team-stage__head" ref={headRef}>
          <span className="eyebrow" ref={eyebrowRef}>
            <b>05</b> Our team
          </span>
          <h2 className="h2">
            {words.map((w, i) => (
              <span key={i}>
                <span className="word-mask">
                  <span ref={(el) => (wordRefs.current[i] = el)}>{w}</span>
                </span>
                {i < words.length - 1 ? ' ' : ''}
              </span>
            ))}
          </h2>
          <p className="lead" ref={leadRef}>
            {team.sub} Click anyone to meet them.{' '}
            <a href={team.rosterUrl} target="_blank" rel="noreferrer" className="lead__link">
              Full roster on DVCsync ↗
            </a>
          </p>
        </div>

        <div className="container">
          <div className="team__grid team__grid--stage">
            {members.map((m, i) => (
              <button
                type="button"
                className="member member--stage"
                key={memberId(m, i)}
                ref={(el) => (cardRefs.current[i] = el)}
                onClick={() => onOpen(i)}
                style={{ '--float-delay': `${(i * 0.7) % 4}s` }}
                aria-label={`${m.name}, ${m.role}`}
              >
                <div className="member__bg" ref={(el) => (bgRefs.current[i] = el)} />
                <div className="member__av">
                  <Avatar m={m} refCb={(el) => (avRefs.current[i] = el)} layoutId={memberId(m, i)} />
                  <span className="member__tip">
                    {m.name} · {m.role}
                  </span>
                </div>
                <div className="member__info" ref={(el) => (infoRefs.current[i] = el)}>
                  <div className="member__name">{m.name}</div>
                  <div className="member__role">{m.role}</div>
                </div>
                <span className="member__view">View</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* Simple fallback: phones, short viewports, reduced motion */
function TeamSimple({ members, onOpen }) {
  return (
    <div className="container">
      <Reveal className="section-head">
        <span className="eyebrow">
          <b>05</b> Our team
        </span>
        <h2 className="h2">{team.heading}</h2>
        <p className="lead">{team.sub} Tap anyone to meet them.</p>
      </Reveal>
      <Stagger className="team__grid" gap={0.05}>
        {members.map((m, i) => (
          <motion.button type="button" className="member" key={memberId(m, i)} variants={item} onClick={() => onOpen(i)}>
            <Avatar m={m} layoutId={memberId(m, i)} />
            <div className="member__info">
              <div className="member__name">{m.name}</div>
              <div className="member__role">{m.role}</div>
            </div>
          </motion.button>
        ))}
      </Stagger>
    </div>
  )
}

const useSimpleMode = () => {
  const query = '(max-width: 900px), (max-height: 700px), (prefers-reduced-motion: reduce)'
  const [simple, setSimple] = useState(() => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false))
  useEffect(() => {
    const mq = window.matchMedia(query)
    const fn = (e) => setSimple(e.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])
  return simple
}

export default function Team() {
  const simple = useSimpleMode()
  const [open, setOpen] = useState(null)
  const members = team.members
  return (
    <section className={`section section--tint dots ${simple ? '' : 'section--stage'}`} id="team">
      {simple ? <TeamSimple members={members} onOpen={setOpen} /> : <TeamStage members={members} onOpen={setOpen} />}
      <AnimatePresence>
        {open !== null && <Profile key="profile" m={members[open]} id={memberId(members[open], open)} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  )
}
