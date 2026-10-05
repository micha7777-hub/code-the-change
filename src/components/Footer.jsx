import { site, connect } from '../content.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <a href="#top" className="brand">
            <img className="brand__logo" src={site.logo} alt="" width="36" height="36" />
            <span>{site.name}</span>
            <span className="brand__school">{site.schoolShort}</span>
          </a>
          <p className="footer__addr">
            {site.address}
            <br />
            {site.email} · {site.phone}
          </p>
        </div>
        <div className="footer__links">
          {connect.links.map((l) => (
            <a key={l.label} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
              {l.label}
            </a>
          ))}
        </div>
        <div className="footer__copy">
          © {new Date().getFullYear()} {site.name} · {site.school}
        </div>
      </div>
    </footer>
  )
}
