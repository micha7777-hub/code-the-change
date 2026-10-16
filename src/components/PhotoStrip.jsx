import { gallery } from '../content.js'

/* Auto-scrolling strip of photo cards, pauses on hover */
export default function PhotoStrip() {
  const items = [...gallery.items, ...gallery.items]
  return (
    <section className="strip" aria-label="Photos from the club">
      <div className="strip__track">
        {items.map((g, i) => (
          <figure className="strip__card" key={i} style={{ '--r': `${g.rotate}deg` }}>
            <img src={g.src} alt={g.caption} loading="lazy" />
            <figcaption className="mono">{g.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
