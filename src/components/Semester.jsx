import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { semester } from '../content.js'
import Reveal, { Stagger, item } from './Reveal.jsx'
import { Icon } from './Icons.jsx'

const DAY = 86400000

/* Live countdown to launch */
function Countdown({ to }) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60000)
    return () => clearInterval(id)
  }, [])
  const diff = Math.max(0, new Date(to).getTime() - now)
  const days = Math.floor(diff / DAY)
  const hours = Math.floor((diff % DAY) / 3600000)
  const mins = Math.floor((diff % 3600000) / 60000)
  const Unit = ({ v, l }) => (
    <div className="count__unit">
      <div className="count__v">{String(v).padStart(2, '0')}</div>
      <div className="count__l">{l}</div>
    </div>
  )
  return (
    <div className="count">
      <Unit v={days} l="days" />
      <span className="count__sep">:</span>
      <Unit v={hours} l="hrs" />
      <span className="count__sep">:</span>
      <Unit v={mins} l="min" />
    </div>
  )
}

/* Four-step progress bar, status from today's date */
function Milestones({ steps }) {
  const now = Date.now()
  const doneIdx = steps.findIndex((s) => new Date(s.end + 'T23:59:59').getTime() > now)
  const current = doneIdx === -1 ? steps.length : doneIdx
  return (
    <div className="ms">
      {steps.map((s, i) => {
        const state = i < current ? 'done' : i === current ? 'now' : 'next'
        return (
          <div className={`ms__step ms__step--${state}`} key={s.title}>
            <div className="ms__bar">
              <motion.div
                className="ms__fill"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: state === 'done' ? 1 : state === 'now' ? 0.5 : 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <div className="ms__label">{s.title}</div>
            <div className="ms__state mono">{state === 'done' ? 'Done' : state === 'now' ? 'In progress' : 'Upcoming'}</div>
          </div>
        )
      })}
    </div>
  )
}

export default function Semester() {
  const s = semester
  return (
    <section className="section" id="semester">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">
            <b>04</b> {s.eyebrow}
          </span>
          <h2 className="h2">{s.heading}</h2>
          <p className="lead">{s.sub}</p>
        </Reveal>

        <Reveal className="sem__hero">
          <div className="sem__hero-bg" />
          <div className="sem__hero-grid">
            <div className="sem__hero-main">
              <span className="sem__chip">
                <span className="dot" /> In development
              </span>
              <div className="sem__facts">
                <div className="fact">
                  <span className="fact__label">Client</span>
                  <span className="fact__value">
                    {s.client.name} · {s.client.type}
                  </span>
                </div>
                <div className="fact">
                  <span className="fact__label">Project lead</span>
                  <span className="fact__value">{s.lead}</span>
                </div>
                <div className="fact">
                  <span className="fact__label">Timeline</span>
                  <span className="fact__value">{s.period.label}</span>
                </div>
              </div>
              <span className="eyebrow sem__goal-label">The goal</span>
              <p className="sem__goal">{s.goal}</p>
              <div className="sem__stack">
                {s.stack.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="sem__hero-side">
              <span className="eyebrow">{s.launch.label}</span>
              <div className="sem__launch-date">Dec 13</div>
              <Countdown to={s.launch.date} />
              {s.showLive && (
                <a href={s.liveUrl} target="_blank" rel="noreferrer" className="btn btn--ghost btn--sm">
                  Open the app <Icon.arrow className="arrow" />
                </a>
              )}
            </div>
          </div>
        </Reveal>

        <Stagger className="sem__highlights" gap={0.08}>
          {s.highlights.map((h) => {
            const I = Icon[h.icon] || Icon.spark
            return (
              <motion.div className="feature" key={h.title} variants={item}>
                <div className="feature__icon">
                  <I />
                </div>
                <h4>{h.title}</h4>
                <p>{h.text}</p>
              </motion.div>
            )
          })}
        </Stagger>

        <Reveal className="sem__progress" delay={0.1}>
          <Milestones steps={s.milestones} />
          <a href={s.cta.href} target="_blank" rel="noreferrer" className="btn btn--primary">
            {s.cta.label} <Icon.arrow className="arrow" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
