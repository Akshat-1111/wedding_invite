import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Story({ data }) {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%', once: true }
        }
      )

      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(card,
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%', once: true }
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="w-full py-16 px-6" style={{ background: 'linear-gradient(180deg, #FAF7F2 0%, #F5EDE0 100%)' }}>
      {/* Header */}
      <div ref={headerRef} style={{ textAlign: 'center', marginBottom: 36 }}>
        <p style={{ fontFamily: 'Lato', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A0784A', marginBottom: 6 }}>
          Their Journey
        </p>
        <h2 style={{ fontFamily: 'Hind', fontSize: 26, fontWeight: 500, color: '#8B3A52', marginBottom: 2 }}>
          हमारी कहानी
        </h2>
        <p style={{ fontFamily: 'Cormorant Garamond', fontStyle: 'italic', fontSize: 20, color: '#C9A96E' }}>
          Our Story
        </p>
      </div>

      {/* Vertical cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 400, margin: '0 auto' }}>
        {data.story.map((item, i) => (
          <div
            key={i}
            ref={el => cardsRef.current[i] = el}
            style={{
              background: 'linear-gradient(160deg, #FAF3E8 0%, #F5E6D0 100%)',
              border: '1px solid rgba(201,169,110,0.4)',
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(139,58,82,0.08)',
            }}
          >
            {/* Image */}
            <div style={{ width: '100%', aspectRatio: '4/3', overflow: 'hidden', background: '#E8D8C8', position: 'relative' }}>
              <img
                src={item.image_url}
                alt={item.title}
                loading="lazy"
                onError={e => { e.target.style.display = 'none' }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center' }}
              />
              {/* Placeholder shown behind image */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: -1,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(160deg, #F5E6D0, #EDD8B0)',
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 48, marginBottom: 8 }}>💕</div>
                  <p style={{ fontFamily: 'Cormorant Garamond', fontStyle: 'italic', fontSize: 14, color: '#A0784A' }}>
                    Photo coming soon
                  </p>
                </div>
              </div>
            </div>

            {/* Text */}
            <div style={{ padding: '20px 22px 26px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <div style={{ width: 20, height: 1, background: '#C9A96E' }} />
                <p style={{ fontFamily: 'Hind', fontSize: 11, color: '#C9A96E', letterSpacing: '0.08em' }}>
                  {item.title_hi}
                </p>
              </div>
              <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: 26, fontWeight: 600, color: '#8B3A52', marginBottom: 10, lineHeight: 1.2 }}>
                {item.title}
              </h3>
              <p style={{ fontFamily: 'Lato', fontSize: 13, color: '#5a3a28', lineHeight: 1.75 }}>
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom marigold divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 40 }}>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, #E8A020)' }} />
        <span style={{ fontSize: 18 }}>🌼</span>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(to left, transparent, #E8A020)' }} />
      </div>
    </section>
  )
}