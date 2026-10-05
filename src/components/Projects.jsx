import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { projects } from '../content.js'
import Reveal, { Stagger, item } from './Reveal.jsx'

function TiltCard({ p, index }) {
  const ref = useRef(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 220, damping: 22 })
  const sry = useSpring(ry, { stiffness: 220, damping: 22 })
  const rotateX = useTransform(srx, (v) => `${v}deg`)
  const rotateY = useTransform(sry, (v) => `${v}deg`)

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    rx.set((0.5 - py) * 8)
    ry.set((px - 0.5) * 10)
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.article
      ref={ref}
      className={`project ${p.wide ? 'project--wide' : ''} ${p.image ? 'project--img' : ''}`}
      variants={item}
      style={{ rotateX, rotateY, '--c': p.color, perspective: 900 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ y: -6, boxShadow: '0 24px 48px -16px rgba(29,78,216,0.22), 0 8px 16px -8px rgba(11,18,32,0.08)' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="project__shine" />
      <div className="project__top">
        <span className="project__num">{String(index + 1).padStart(2, '0')} / {p.year}</span>
        <span className="project__status">
          <i /> {p.status}
        </span>
      </div>
      <div className="project__art">
        {p.image && <img src={p.image} alt={`${p.name} website`} loading="lazy" />}
        <span>{p.org}</span>
      </div>
      <div className="project__body">
        <h3>{p.name}</h3>
        {p.wide && <div className="project__org">{p.org}</div>}
        <p>{p.desc}</p>
      </div>
      <div className="project__tags">
        {p.tags.map((t) => (
          <span className="tag" key={t}>
            {t}
          </span>
        ))}
      </div>
    </motion.article>
  )
}

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow"><b>03</b> Projects</span>
          <h2 className="h2">{projects.heading}</h2>
          <p className="lead">{projects.sub}</p>
        </Reveal>
        <Stagger className="projects__grid" gap={0.1}>
          {projects.items.map((p, i) => (
            <TiltCard p={p} index={i} key={p.name} />
          ))}
        </Stagger>
      </div>
    </section>
  )
}
