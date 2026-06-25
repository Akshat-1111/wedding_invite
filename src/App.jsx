import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import data from './data/data.json'
import Envelope from './components/Envelope'
import Hero from './components/Hero'
import Invitation from './components/Invitation'
import Countdown from './components/Countdown'
import Timeline from './components/Timeline'
import Story from './components/Story'
import Venue from './components/Venue'
import Footer from './components/Footer'
import { useMusic } from './hooks/useMusic'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const { playing, toggle } = useMusic(data.music_url)

  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true })
    document.fonts.ready.then(() => ScrollTrigger.refresh())
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <main style={{ maxWidth: 430, margin: '0 auto', overflowX: 'hidden' }}>
      <Envelope data={data} />
      <Hero data={data} />
      <Invitation data={data} />
      <Countdown data={data} />
      <Timeline data={data} />
      <Story data={data} />
      <Venue data={data} />
      <Footer data={data} playing={playing} onToggle={toggle} />
    </main>
  )
}
