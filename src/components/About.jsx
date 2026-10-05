import { motion } from 'framer-motion'
import { about, stats } from '../content.js'
import Reveal, { Stagger, item } from './Reveal.jsx'
import CountUp from './CountUp.jsx'
import { Icon } from './Icons.jsx'

function trackMouse(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="about__grid">
          <div>
            <Reveal>
              <div className="section-head" style={{ marginBottom: 28 }}>
                <span className="eyebrow"><b>01</b> What we are</span>
                <h2 className="h2">{about.heading}</h2>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="about__body">
              {about.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Reveal>
          </div>

          <Stagger className="pillars">
            {about.pillars.map((p) => {
              const I = Icon[p.icon] || Icon.spark
              return (
                <motion.div className="pillar" key={p.title} variants={item} onMouseMove={trackMouse}>
                  <div className="pillar__icon">
                    <I />
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </motion.div>
              )
            })}
          </Stagger>
        </div>

        <Reveal className="about__photos" delay={0.05}>
          <figure className="photo photo--tall">
            <img src={about.photos[0].src} alt={about.photos[0].alt} loading="lazy" />
          </figure>
          <figure className="photo photo--wide">
            <img src={about.photos[1].src} alt={about.photos[1].alt} loading="lazy" />
          </figure>
          <figure className="photo">
            <img src={about.photos[2].src} alt={about.photos[2].alt} loading="lazy" />
          </figure>
          <div className="photo photo--caption">
            <div className="photo__big">{about.photoCaption.big}</div>
            <div className="photo__small">{about.photoCaption.small}</div>
          </div>
        </Reveal>

        <Reveal className="stats" delay={0.1}>
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat__value">
                <CountUp value={s.value} suffix={s.suffix} />
              </div>
              <div className="stat__label">{s.label}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
