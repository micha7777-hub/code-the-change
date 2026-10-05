# Code the Change — DVC

Club website for Code the Change at Diablo Valley College. Built with Vite, React, and Framer Motion.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Edit the content

Everything on the page comes from one file: `src/content.js`.

| What to change | Where |
| --- | --- |
| Club name, email, phone, address, logo, DVCsync join link | `site` |
| Featured next event + event timeline | `meetings.next`, `meetings.timeline` |
| Hero headline, facts row (chapter / meeting day / room) | `hero` |
| Rotating words in the hero sentence | `rotatingWords` |
| Stats counters | `stats` |
| About text and the four benefit cards | `about` |
| Meeting day, time, room, upcoming events | `meetings` |
| Project cards | `projects.items` |
| Team members (name, role, optional `bio`, `major`, `links`) | `team.members` |
| This semester's project (overview, roles, stack, features, 13-week timeline, launch date) | `semester` |
| Discord / Instagram / LinkedIn / Email links and the three steps | `connect` |

### Team photos

Drop one image per member into `src/assets/team/`, named after the member in lowercase with dashes:

```
Evan Honggo Widjojo  ->  src/assets/team/evan-honggo-widjojo.jpg
Nicholas Nurwinata   ->  src/assets/team/nicholas-nurwinata.png
```

That is all. The site matches files to names automatically (jpg, jpeg, png, webp, avif). Square images around 400×400 look best. Members without a photo show their initials. To use a different file for someone, set `photo: '/team/whatever.jpg'` on that member (files under `public/`).

### Other images

- `public/logo.jpg` — club logo (nav, footer). `public/favicon.png` is generated from it.
- `public/gallery/` — meeting photos, event posters, and project screenshots pulled from DVCsync. Reference them as `/gallery/filename.jpg` in `content.js` (About photos, `meetings.next.image`, `projects.items[].image`).

## Structure

```
src/
  content.js          all text and links
  styles.css          design tokens + all styles
  App.jsx             page order
  components/
    Nav.jsx           sticky nav, scroll progress bar, sliding active pill, mobile menu
    Hero.jsx          hero section + marquee
    HeroCanvas.jsx    animated network background (mouse-reactive)
    Decode.jsx        glyph-scramble headline reveal
    Reveal.jsx        scroll-in animation helpers
    CountUp.jsx       number counters
    Semester.jsx      this semester's project: countdown, feature grid, scroll-filling timeline
    Team.jsx          orbit stage + clickable profile panel
    About.jsx / Meetings.jsx / Projects.jsx / Connect.jsx / Footer.jsx
```

## Deploy

Vercel: import the repo, framework "Vite", build `npm run build`, output `dist`.
