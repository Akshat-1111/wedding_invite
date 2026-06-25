import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero({ data }) {
  const sectionRef = useRef(null)
  const logoRef = useRef(null)
  const namesRef = useRef(null)
  const subtitleRef = useRef(null)
  const dateRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        }
      })

      tl.fromTo(logoRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
      )
      tl.fromTo(namesRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.5'
      )
      tl.fromTo(subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      )
      tl.fromTo(dateRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.3'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Hero image */}
      <div className="absolute inset-0">
        <img
          src={data.hero_image}
          alt="Deep and Meenal"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        {/* Gradient overlay — bottom up, keeps faces visible */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(20,8,4,0.82) 0%, rgba(20,8,4,0.45) 45%, rgba(0,0,0,0.1) 100%)',
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pb-16 pt-24 w-full">
        {/* Logo monogram */}
        <div ref={logoRef} style={{ width: 110, height: 110, marginBottom: 20 }}>
          <img
            src={data.logo_image}
            alt="D & M monogram"
            style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'brightness(0) invert(1) sepia(1) saturate(2) hue-rotate(5deg)' }}
          />
        </div>

        {/* Names */}
        <div ref={namesRef}>
          <h1 style={{
            fontFamily: 'Cormorant Garamond',
            fontSize: 'clamp(52px, 15vw, 76px)',
            fontWeight: 300,
            color: '#FAF7F2',
            lineHeight: 1,
            letterSpacing: '0.02em',
          }}>
            <span style={{ color: '#E8C97A' }}>Deep</span>
            <span style={{ color: '#FAF7F2', fontSize: '0.55em', fontStyle: 'italic', display: 'block', margin: '4px 0' }}>&amp;</span>
            <span style={{ color: '#E8C97A' }}>Meenal</span>
          </h1>
        </div>

        {/* Hindi tagline */}
        <div ref={subtitleRef} style={{ marginTop: 20 }}>
          <p style={{
            fontFamily: 'Hind',
            fontSize: 14,
            color: 'rgba(255,255,255,0.75)',
            letterSpacing: '0.04em',
            marginBottom: 4,
          }}>
            {data.tagline}
          </p>
          <p style={{
            fontFamily: 'Cormorant Garamond',
            fontStyle: 'italic',
            fontSize: 15,
            color: 'rgba(232,201,122,0.8)',
          }}>
            {data.tagline_en}
          </p>
        </div>

        {/* Divider */}
        <div style={{
          width: 100, height: 1,
          background: 'linear-gradient(to right, transparent, #C9A96E, transparent)',
          margin: '20px auto',
        }} />

        {/* Date */}
        <div ref={dateRef}>
          <p style={{
            fontFamily: 'Lato',
            fontSize: 11,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.6)',
            marginBottom: 6,
          }}>
            Indore, Madhya Pradesh
          </p>
          <p style={{
            fontFamily: 'Cormorant Garamond',
            fontSize: 22,
            fontWeight: 500,
            color: '#E8C97A',
          }}>
            19 – 20 August 2026
          </p>
        </div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bounce-gentle">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12l7 7 7-7" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </section>
  )
}
