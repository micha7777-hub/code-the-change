// ─────────────────────────────────────────────────────────────
//  SITE CONTENT
//  Everything on the page is driven from this file.
//  Sources: DVCsync (dvc.campuslabs.com/engage/organization/codethechange)
//  and the previous site (codethechange.vercel.app).
// ─────────────────────────────────────────────────────────────

const DVCSYNC = 'https://dvc.campuslabs.com/engage/organization/codethechange'

export const site = {
  name: 'Code the Change',
  short: 'CTC',
  school: 'Diablo Valley College',
  schoolShort: 'DVC',
  tagline: 'Students using code to drive social change.',
  email: 'codethechangedvc@gmail.com',
  phone: '(925) 890-0178',
  address: 'Student Life Office · 321 Golf Club Road, Pleasant Hill, CA 94523',
  logo: '/logo.jpg',
  dvcsync: DVCSYNC,
  joinUrl: DVCSYNC, // every "Join" button goes here
  linktree: 'https://linktr.ee/codethechange',
}

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'meetings', label: 'Meetings' },
  { id: 'projects', label: 'Projects' },
  { id: 'semester', label: 'Fall 2026' },
  { id: 'team', label: 'Team' },
  { id: 'connect', label: 'Connect' },
]

export const hero = {
  eyebrow: 'Student-run · Diablo Valley College',
  headline: ['Code the', 'Change.'],
  sub:
    'We are a community of Diablo Valley College students who build real software for nonprofits — and learn to lead while doing it.',
  primaryCta: { label: 'Join the club', href: DVCSYNC, external: true },
  secondaryCta: { label: 'See our projects', href: '#projects' },
  facts: [
    { label: 'Chapter', value: 'Diablo Valley College' },
    { label: 'Meetings', value: 'Wednesdays · 4–5 PM' },
    { label: 'Location', value: 'MA-101' },
  ],
}

// Words that cycle in the hero sub-headline
export const rotatingWords = ['nonprofits', 'our community', 'animal rescues', 'schools abroad']

export const stats = [
  { value: 44, suffix: '+', label: 'Members on DVCsync' },
  { value: 4, suffix: '', label: 'Nonprofit partners' },
  { value: 3, suffix: '', label: 'Websites shipped' },
  { value: 50, suffix: '+', label: 'Students at our last meeting' },
]

export const about = {
  heading: 'Built by students. Built for the community.',
  body: [
    'Code the Change, as the name suggests, is a club where students use their coding and technical skills to drive social change. We gather enthusiastic students willing to share their talents and abilities to make a difference in the community.',
    'Each semester we collaborate with nonprofit organizations and support their mission with technical work — software development, website creation, and much more. Along the way you gain hands-on experience on real projects, sharpen your programming skills, and meet like-minded students who share your goals.',
  ],
  photos: [
    { src: '/gallery/meeting-portrait.jpg', alt: 'Code the Change members at a general meeting in MA-101' },
    { src: '/gallery/meeting-wide.jpg', alt: 'Full room at a Code the Change general meeting' },
    { src: '/gallery/meeting-4.jpg', alt: 'Members gathered for a team photo after a meeting' },
  ],
  photoCaption: { big: '50+', small: 'students at our last general meeting' },
  pillars: [
    {
      title: 'Resume',
      text: 'Hands-on project experience and volunteer work that shows real commitment.',
      icon: 'doc',
    },
    {
      title: 'Experience',
      text: 'Leadership roles and direct mentorship in modern tools and workflows.',
      icon: 'spark',
    },
    {
      title: 'Connections',
      text: 'A network of peers who care about both technology and service.',
      icon: 'people',
    },
    {
      title: 'Certificate',
      text: 'Formal recognition for your contribution to nonprofit projects.',
      icon: 'badge',
    },
  ],
}

export const meetings = {
  heading: 'Where to find us.',
  sub: 'General meetings are open to everyone — no coding experience required.',
  schedule: {
    day: 'Wednesday',
    time: '4:00 – 5:00 PM',
    cadence: 'General meetings · dates on DVCsync',
  },
  location: {
    room: 'MA-101',
    building: 'Math & Computer Science building',
    campus: 'Diablo Valley College, Pleasant Hill, CA',
    mapUrl: 'https://maps.google.com/?q=Diablo+Valley+College+Pleasant+Hill',
  },
  // The featured next event (shown with its cover image)
  next: {
    title: 'Second General Meeting',
    date: 'Wednesday, October 7',
    time: '4:00 – 5:00 PM',
    where: 'MA-101',
    blurb: 'Project explanation, group separation, icebreakers — and snacks.',
    image: '/gallery/gm2-fall-2026.jpg',
    href: 'https://dvc.campuslabs.com/engage/event/12842935',
  },
  // Past and upcoming, newest first
  timeline: [
    { date: 'Oct 7, 2026', title: 'Second General Meeting', tag: 'General', href: 'https://dvc.campuslabs.com/engage/event/12842935' },
    { date: 'Apr 23, 2024', title: 'Final Project Showcase', tag: 'Showcase', href: 'https://dvc.campuslabs.com/engage/news/301254' },
    { date: 'Mar 26, 2024', title: 'GM3 — Project research presentations', tag: 'General', href: 'https://dvc.campuslabs.com/engage/news/299278' },
  ],
  allEventsUrl: `${DVCSYNC}/events`,
}

export const projects = {
  heading: 'What we build.',
  sub: 'Every semester, small teams ship real software for real organizations.',
  items: [
    {
      name: 'California Pitbull Rescue',
      org: 'Nonprofit · Richmond, CA',
      desc: 'A full website for a volunteer-run 501(c)(3) that rescues at-risk pit bull-type dogs through fostering, education, and adoption programs.',
      tags: ['Website', 'Animal welfare'],
      status: 'Shipped',
      year: '2024',
      color: '#1d4ed8',
      image: '/gallery/pitbull-rescue.png',
    },
    {
      name: 'The Little House',
      org: 'Education initiative · Indonesia',
      desc: 'A website for an initiative serving 200+ underprivileged children across five learning centers.',
      tags: ['Website', 'Education'],
      status: 'Shipped',
      year: '2023',
      color: '#2563eb',
    },
    {
      name: 'Social Project Bali',
      org: 'Community organization · Bali',
      desc: 'A platform supporting education, environmental conservation, and community aid programs.',
      tags: ['Website', 'Environment'],
      status: 'Shipped',
      year: '2023',
      color: '#0ea5e9',
    },
    {
      name: 'Bercerita',
      org: 'English-language education · Indonesia',
      desc: 'A site helping Indonesian children build global competitiveness through English education.',
      tags: ['Website', 'Education'],
      status: 'Shipped',
      year: '2023',
      color: '#3b82f6',
    },
    {
      name: 'Your project here',
      org: 'Fall 2026',
      desc: 'We are placing members on new nonprofit teams this semester. Come to the next general meeting to pick yours.',
      tags: ['Open'],
      status: 'Recruiting',
      year: '2026',
      color: '#64748b',
      wide: true,
    },
  ],
}

export const team = {
  heading: 'The people behind it.',
  sub: 'Officers and project leads who keep the club running.',
  // PHOTOS: drop an image into src/assets/team/ named after the member
  // (e.g. aaron-timothy-soetopo.jpg) and it is picked up automatically.
  // `photo` is only needed to override that, e.g. photo: '/team/custom.jpg'.
  // Optional per member: bio, major, links: { linkedin, instagram, email, github }
  members: [
    {
      name: 'Aaron Timothy Soetopo',
      role: 'President',
      photo: '',
      bio: 'Runs the club and leads this semester’s IFGF Pinole Central App build.',
      links: {},
    },
    { name: 'Jayden Susanto', role: 'Treasurer', photo: '', bio: '', links: {} },
    { name: 'Ethan Muntu', role: 'Inter-Club Council Rep', photo: '', bio: '', links: {} },
    { name: 'Peikun Tsai', role: 'Advisor', photo: '', bio: '', links: {} },
    { name: 'Officer name', role: 'Vice President', photo: '', bio: '', links: {} },
    { name: 'Officer name', role: 'Secretary', photo: '', bio: '', links: {} },
    { name: 'Officer name', role: 'Marketing', photo: '', bio: '', links: {} },
    { name: 'Officer name', role: 'Project Lead', photo: '', bio: '', links: {} },
  ],
  rosterUrl: `${DVCSYNC}/roster`,
}

// ─────────────────────────────────────────────────────────────
//  THIS SEMESTER'S PROJECT
//  Source: "IFGF Pinole Central App – Full Build Roadmap" (updated Sept 20, 2026)
//  Phase status (done / in progress / upcoming) is computed from today's date.
// ─────────────────────────────────────────────────────────────
export const semester = {
  label: 'Fall 2026',
  eyebrow: 'This semester',
  heading: 'IFGF Pinole Central App.',
  sub: 'Our Fall 2026 nonprofit build: a church app for IFGF Pinole, launching Sunday, December 13.',
  client: { name: 'IFGF Pinole', type: 'Church · Pinole, CA' },
  lead: 'Aaron Timothy Soetopo',
  period: { start: '2026-07-06', end: '2026-12-13', label: 'Jul 6 – Dec 13, 2026' },
  launch: { date: '2026-12-13T10:00:00-08:00', label: 'Public launch Sunday' },
  // Flip these on when the client is ready to share them publicly.
  liveUrl: 'https://ifgf-pinole-central-app.vercel.app',
  showLive: false,
  // The goal, in one short paragraph
  goal:
    'Give IFGF Pinole one app where the congregation can find events, devotions and sermons, and where serving ministers can complete training for their team — all from a phone’s home screen.',
  stack: ['Next.js', 'Firebase', 'Tailwind CSS', 'Vercel'],
  // A few highlights, kept short on purpose
  highlights: [
    { title: 'Installable app', text: 'Works like a native app on iOS and Android.', icon: 'phone' },
    { title: 'Events, devotions, sermons', text: 'One place for everything the church shares weekly.', icon: 'calendar' },
    { title: 'Ministry training', text: 'Courses and progress tracking for serving teams.', icon: 'spark' },
  ],
  // Coarse progress: shown as a simple 4-step bar
  milestones: [
    { title: 'Foundation', end: '2026-07-26' },
    { title: 'Core features', end: '2026-10-25' },
    { title: 'Testing & polish', end: '2026-12-06' },
    { title: 'Launch', end: '2026-12-13' },
  ],
  cta: { label: 'Want to work on this? Apply for a team', href: 'https://forms.gle/zdyDu1A45vYFhv5B8' },
}

export const connect = {
  heading: 'Get involved.',
  sub: 'Three steps and you are in. No application, no experience required.',
  steps: [
    { n: '01', title: 'Join on DVCsync', text: 'Register as a member so you get every event and announcement from the college.' },
    { n: '02', title: 'Join the Discord', text: 'Project channels, help, and the fastest way to reach officers.' },
    { n: '03', title: 'Come to MA-101', text: 'Show up to a general meeting, meet the team, and fill out the application form to get placed on a project.' },
  ],
  links: [
    { label: 'DVCsync', handle: 'Register as a member', href: DVCSYNC, icon: 'sync', primary: true },
    { label: 'Discord', handle: 'discord.gg/Y9gaAMAg8n', href: 'https://discord.gg/Y9gaAMAg8n', icon: 'discord' },
    { label: 'Application form', handle: 'Apply for a project team', href: 'https://forms.gle/zdyDu1A45vYFhv5B8', icon: 'doc' },
    { label: 'Instagram', handle: '@codethechange_dvc', href: 'https://www.instagram.com/codethechange_dvc/', icon: 'instagram' },
    { label: 'LinkedIn', handle: 'Code the Change DVC', href: 'https://www.linkedin.com/company/code-the-changedvc/', icon: 'linkedin' },
    { label: 'Email', handle: 'codethechangedvc@gmail.com', href: 'mailto:codethechangedvc@gmail.com', icon: 'mail' },
  ],
}
