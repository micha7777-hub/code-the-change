import { motion } from 'framer-motion'
import { connect, site } from '../content.js'
import Reveal, { Stagger, item } from './Reveal.jsx'
import { Icon } from './Icons.jsx'

export default function Connect() {
  return (
    <section className="section" id="connect">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow"><b>06</b> How to connect</span>
          <h2 className="h2">{connect.heading}</h2>
          <p className="lead">{connect.sub}</p>
        </Reveal>

        <div className="connect__grid">
          <Stagger className="steps" gap={0.1}>
            {connect.steps.map((s) => (
              <motion.div className="step" key={s.n} variants={item}>
                <span className="step__n">{s.n}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </motion.div>
            ))}
          </Stagger>

          <Stagger className="links" gap={0.08}>
            {connect.links.map((l) => {
              const I = Icon[l.icon] || Icon.arrow
              const external = l.href.startsWith('http')
              return (
                <motion.a
                  className={`link-card ${l.primary ? 'link-card--primary' : ''}`}
                  key={l.label}
                  href={l.href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                  variants={item}
                >
                  <div className="link-card__head">
                    <div className="link-card__icon">
                      <I />
                    </div>
                    <Icon.arrow className="link-card__arrow" style={{ width: 18, height: 18 }} />
                  </div>
                  <div>
                    <div className="link-card__label">{l.label}</div>
                    <div className="link-card__handle">{l.handle}</div>
                  </div>
                </motion.a>
              )
            })}
          </Stagger>
        </div>

        <Reveal className="cta-band">
          <div>
            <h3>Ready to build something that matters?</h3>
            <p>Come to the next meeting. Bring a laptop, or just bring yourself.</p>
          </div>
          <a href={site.joinUrl} target="_blank" rel="noreferrer" className="btn btn--primary">
            Join on DVCsync <Icon.arrow className="arrow" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
