import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Meetings from './components/Meetings.jsx'
import Projects from './components/Projects.jsx'
import Semester from './components/Semester.jsx'
import Team from './components/Team.jsx'
import Connect from './components/Connect.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Meetings />
        <Projects />
        <Semester />
        <Team />
        <Connect />
      </main>
      <Footer />
    </>
  )
}
