import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
   Spotlight roster (desktop): one large portrait on the left that
   crossfades as you move across the names on the right.
   ──────────────────────────────────────────────────────────── */
function Portrait({ m, id }) {
  const src = photoFor(m)
  const [broken, setBroken] = useState(false)
  const showImg = src && !broken
  return (
    <motion.div
      className={`spot__img ${showImg ? '' : 'spot__img--initials'}`}
      key={id}
      initial={{ opacity: 0, scale: 1.06, clipPath: 'inset(100% 0 0 0)' }}
      animate={{ opacity: 1, scale: 1, clipPath: 'inset(0% 0 0 0)' }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {showImg ? <img src={src} alt={m.name} onError={() => setBroken(true)} /> : <span>{initials(m.name)}</span>}
    </motion.div>
  )
}

function TeamSpotlight({ members, onOpen }) {
  const [active, setActive] = useState(0)
  const m = members[active]
  const id = memberId(m, active)
  return (
    <div className="container">
      <Reveal className="section-head">
        <span className="eyebrow">
          <b>05</b> Our team
        </span>
        <h2 className="h2">{team.heading}</h2>
        <p className="lead">
          {team.sub} Hover a name to see who it is, click to meet them.{' '}
          <a href={team.rosterUrl} target="_blank" rel="noreferrer" className="lead__link">
            Full roster on DVCsync ↗
          </a>
        </p>
      </Reveal>

      <div className="spot">
        <Reveal className="spot__left" y={20}>
          <div className="spot__sticky">
            <div className="spot__frame">
              <AnimatePresence mode="sync" initial={false}>
                <Portrait m={m} id={id} key={id} />
              </AnimatePresence>
              <div className="spot__counter mono">
                {String(active + 1).padStart(2, '0')} / {String(members.length).padStart(2, '0')}
              </div>
            </div>
            <div className="spot__meta">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="tag">{m.role}</span>
                  <h3>{m.name}</h3>
                  {m.major && <p>{m.major}</p>}
                </motion.div>
              </AnimatePresence>
              <button type="button" className="btn btn--ghost btn--sm" onClick={() => onOpen(active)}>
                Meet {m.name.split(' ')[0]} <Icon.arrow className="arrow" />
              </button>
            </div>
          </div>
        </Reveal>

        <Stagger className="spot__list" gap={0.03}>
          {members.map((p, i) => (
            <motion.div key={memberId(p, i)} variants={item}>
              <button
                type="button"
                className={`spot__row ${i === active ? 'spot__row--active' : ''}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => onOpen(i)}
              >
                <span className="spot__num mono">{String(i + 1).padStart(2, '0')}</span>
                <span className="spot__name">{p.name}</span>
                <span className="spot__major">{p.major}</span>
                <span className="spot__role mono">{p.role}</span>
                <span className="spot__arrow">
                  <Icon.arrow />
                </span>
              </button>
            </motion.div>
          ))}
        </Stagger>
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
              {m.major && <div className="member__major">{m.major}</div>}
            </div>
          </motion.button>
        ))}
      </Stagger>
    </div>
  )
}

const useSimpleMode = () => {
  const query = '(max-width: 900px)'
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
    <section className="section section--tint dots" id="team">
      {simple ? <TeamSimple members={members} onOpen={setOpen} /> : <TeamSpotlight members={members} onOpen={setOpen} />}
      <AnimatePresence>
        {open !== null && <Profile key="profile" m={members[open]} id={memberId(members[open], open)} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  )
}
