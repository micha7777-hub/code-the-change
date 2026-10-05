import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { nav, site } from '../content.js'
import { Icon } from './Icons.jsx'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const [pill, setPill] = useState({ left: 0, width: 0, visible: false })
  const linksRef = useRef(null)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 })

  // nav background on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // active section tracking
  useEffect(() => {
    const sections = nav.map((n) => document.getElementById(n.id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
        else if (window.scrollY < 200) setActive('')
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.2, 0.5] },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  // slide pill under the active link
  useEffect(() => {
    const el = linksRef.current?.querySelector(`[data-id="${active}"]`)
    if (!el) return setPill((p) => ({ ...p, visible: false }))
    setPill({ left: el.offsetLeft, width: el.offsetWidth, visible: true })
  }, [active])

  const hoverPill = (e) => {
    const el = e.currentTarget
    setPill({ left: el.offsetLeft, width: el.offsetWidth, visible: true })
  }
  const resetPill = () => {
    const el = linksRef.current?.querySelector(`[data-id="${active}"]`)
    if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth, visible: true })
    else setPill((p) => ({ ...p, visible: false }))
  }

  return (
    <>
      <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <motion.div className="nav__progress" style={{ scaleX: progress }} />
        <div className="container nav__inner">
          <a href="#top" className="brand" aria-label={`${site.name} home`}>
            <img className="brand__logo" src={site.logo} alt="" width="36" height="36" />
            <span>{site.name}</span>
            <span className="brand__school">{site.schoolShort}</span>
          </a>

          <nav className="nav__links" ref={linksRef} onMouseLeave={resetPill} aria-label="Primary">
            <motion.span
              className="nav__pill"
              animate={{ left: pill.left, width: pill.width, opacity: pill.visible ? 1 : 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 34 }}
            />
            {nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                data-id={n.id}
                className={`nav__link ${active === n.id ? 'nav__link--active' : ''}`}
                onMouseEnter={hoverPill}
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="nav__cta">
            <a href={site.joinUrl} target="_blank" rel="noreferrer" className="btn btn--primary btn--sm">
              Join us <Icon.arrow className="arrow" />
            </a>
            <button
              className={`nav__burger ${open ? 'nav__burger--open' : ''}`}
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <span />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav__mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)}>
                {n.label}
              </a>
            ))}
            <a href={site.joinUrl} target="_blank" rel="noreferrer" className="btn btn--primary" style={{ marginTop: 16, justifyContent: 'center' }} onClick={() => setOpen(false)}>
              Join us <Icon.arrow className="arrow" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
