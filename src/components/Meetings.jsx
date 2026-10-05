import { meetings } from '../content.js'
import Reveal from './Reveal.jsx'
import { Icon } from './Icons.jsx'

export default function Meetings() {
  const { schedule, location, next, timeline } = meetings
  return (
    <section className="section section--tint dots" id="meetings">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow"><b>02</b> Meetings</span>
          <h2 className="h2">{meetings.heading}</h2>
          <p className="lead">{meetings.sub}</p>
        </Reveal>

        <div className="meet__grid">
          <Reveal className="card meet__schedule">
            <div className="grid-bg" />
            <div className="glow" />
            <span className="eyebrow">
              <Icon.clock style={{ width: 14, height: 14 }} /> When
            </span>
            <div className="meet__day">{schedule.day}</div>
            <div className="meet__time">{schedule.time}</div>
            <div className="meet__cadence">{schedule.cadence}</div>
          </Reveal>

          <Reveal className="card meet__location" delay={0.12}>
            <span className="eyebrow">
              <Icon.pin style={{ width: 14, height: 14 }} /> Where
            </span>
            <div className="meet__loc-main">{location.room}</div>
            <div className="meet__loc-sub">
              {location.building && (
                <>
                  {location.building}
                  <br />
                </>
              )}
              {location.campus}
            </div>
            <div className="meet__loc-notes">
              <div className="meet__loc-note">
                <Icon.pin /> Student Life Office · 321 Golf Club Road
              </div>
              <div className="meet__loc-note">
                <Icon.clock /> Doors open a few minutes early — come say hi
              </div>
            </div>
            <div className="meet__map">
              <a href={location.mapUrl} target="_blank" rel="noreferrer" className="btn btn--ghost btn--sm">
                Open in Maps <Icon.arrow className="arrow" />
              </a>
            </div>
          </Reveal>
        </div>

        <div className="meet__bottom">
          <Reveal className="card meet__next" delay={0.1}>
            <a href={next.href} target="_blank" rel="noreferrer" className="meet__next-img" aria-label={`${next.title} on DVCsync`}>
              <img src={next.image} alt="" loading="lazy" />
            </a>
            <div className="meet__next-body">
              <span className="eyebrow">Next up</span>
              <h3>{next.title}</h3>
              <div className="meet__next-meta">
                <span>
                  <Icon.clock /> {next.date} · {next.time}
                </span>
                <span>
                  <Icon.pin /> {next.where}
                </span>
              </div>
              <p>{next.blurb}</p>
              <a href={next.href} target="_blank" rel="noreferrer" className="btn btn--primary btn--sm">
                RSVP on DVCsync <Icon.arrow className="arrow" />
              </a>
            </div>
          </Reveal>

          <Reveal className="card meet__upcoming" delay={0.18}>
            <div className="meet__upcoming-head">
              <span className="eyebrow">Events</span>
              <a href={meetings.allEventsUrl} target="_blank" rel="noreferrer" className="meet__all">
                All events <Icon.arrow className="arrow" />
              </a>
            </div>
            <div className="meet__list">
              {timeline.map((u, i) => (
                <a className="meet__row" key={i} href={u.href} target="_blank" rel="noreferrer">
                  <span className="date">{u.date}</span>
                  <span className="title">{u.title}</span>
                  <span className="tag">{u.tag}</span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
