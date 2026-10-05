import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { hero, rotatingWords, site, projects } from '../content.js'
import HeroCanvas from './HeroCanvas.jsx'
import Decode from './Decode.jsx'
import { Icon } from './Icons.jsx'

const fade = (delay) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
})

function Rotator({ words }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % words.length), 2600)
    return () => clearInterval(id)
  }, [words.length])
  return (
    <span className="rotator">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default function Hero() {
  const marqueeItems = [
    ...projects.items.filter((p) => p.status === 'Shipped').map((p) => p.name),
    'Workshops',
    'Mentorship',
    'Hackathons',
    'Open to all majors',
  ]
  const doubled = [...marqueeItems, ...marqueeItems]

  return (
    <>
      <section className="hero" id="top">
        <HeroCanvas />
        <div className="hero__fade" />

        <div className="container hero__inner">
          <motion.div className="hero__facts" {...fade(0.1)}>
            {hero.facts.map((f) => (
              <div className="fact" key={f.label}>
                <span className="fact__label">{f.label}</span>
                <span className="fact__value">{f.value}</span>
              </div>
            ))}
          </motion.div>

          <div className="hero__body">
            <motion.div className="hero__eyebrow" {...fade(0.25)}>
              <span className="dot" />
              {hero.eyebrow}
            </motion.div>

            <h1 className="hero__title">
              <span className="line">
                <Decode text={hero.headline[0]} delay={350} speed={34} />
              </span>
              <span className="line accent">
                <Decode text={hero.headline[1]} delay={700} speed={40} />
              </span>
            </h1>

            <motion.p className="hero__sub" {...fade(1.1)}>
              {hero.sub.split('nonprofits')[0]}
              <Rotator words={rotatingWords} />
              {hero.sub.split('nonprofits')[1]}
            </motion.p>

            <motion.div className="hero__ctas" {...fade(1.3)}>
              <a
                href={hero.primaryCta.href}
                target={hero.primaryCta.external ? '_blank' : undefined}
                rel={hero.primaryCta.external ? 'noreferrer' : undefined}
                className="btn btn--primary"
              >
                {hero.primaryCta.label} <Icon.arrow className="arrow" />
              </a>
              <a href={hero.secondaryCta.href} className="btn btn--ghost">
                {hero.secondaryCta.label}
              </a>
            </motion.div>
          </div>

          <motion.div className="hero__foot" {...fade(1.5)}>
            <span>{site.school}</span>
            <a href="#about" className="hero__scroll">
              Scroll <Icon.down />
            </a>
          </motion.div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {doubled.map((t, i) => (
            <span className="marquee__item" key={i}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </>
  )
}
