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
import { Agentation } from "agentation";
gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    // Mobile: use touch events for ScrollTrigger
    ScrollTrigger.config({ ignoreMobileResize: true })

    // Refresh on fonts load
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh()
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
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
      <Footer data={data} />
      {process.env.NODE_ENV === "development" && <Agentation />}
    </main>
  )
}
