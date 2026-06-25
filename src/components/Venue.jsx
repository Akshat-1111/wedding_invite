import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Venue({ data }) {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: contentRef.current, start: 'top 85%', once: true }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleDirections = () => {
    window.open(data.venue.map_url, '_blank', 'noopener,noreferrer')
  }

  return (
    <section ref={sectionRef} className="w-full py-16 px-6" style={{ background: '#FAF7F2' }}>
      <div ref={contentRef} className="max-w-sm mx-auto">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <p style={{ fontFamily: 'Lato', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A0784A', marginBottom: 6 }}>
            Join Us At
          </p>
          <h2 style={{ fontFamily: 'Hind', fontSize: 22, fontWeight: 500, color: '#8B3A52', marginBottom: 2 }}>
            विवाह स्थल
          </h2>
          <p style={{ fontFamily: 'Cormorant Garamond', fontStyle: 'italic', fontSize: 20, color: '#C9A96E' }}>
            The Venue
          </p>
        </div>

        {/* Venue card */}
        <div style={{
          background: 'linear-gradient(160deg, #FAF3E8 0%, #F5E6D0 100%)',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 8px 40px rgba(139,58,82,0.10)',
        }}>
          {/* Map embed */}
          <div style={{ width: '100%', height: 200, background: '#E8D8C8', overflow: 'hidden', position: 'relative' }}>
            <iframe
              title="Venue Map"
              src={data.venue.map_embed_url}
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Fallback if embed fails */}
            <div
              style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'linear-gradient(to bottom, transparent 60%, rgba(250,243,232,0.3))',
              }}
            />
          </div>

          {/* Venue details */}
          <div style={{ padding: '20px 20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: '#FFF8E8',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, fontSize: 18,
              }}>
                📍
              </div>
              <div>
                <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: 22, fontWeight: 600, color: '#8B3A52', lineHeight: 1.2, marginBottom: 4 }}>
                  {data.venue.name}
                </h3>
                <p style={{ fontFamily: 'Lato', fontSize: 12, color: '#7a5a3a', lineHeight: 1.6 }}>
                  {data.venue.address}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.4), transparent)', marginBottom: 16 }} />

            {/* Events recap */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20 }}>

              {[
                { emoji: '🌼', name: 'Haldi & Sangeet', date: '19 August 2026' },
                { emoji: '💍', name: 'Wedding Ceremony', date: '20 August 2026' },
              ].map(e => (
                <div key={e.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 14 }}>{e.emoji}</span>
                  <span style={{ fontFamily: 'Cormorant Garamond', fontSize: 15, color: '#5a3a28' }}>{e.name}</span>
                  <span style={{ marginLeft: 'auto', fontFamily: 'Lato', fontSize: 11, color: '#A0784A' }}>{e.date}</span>
                </div>
              ))}
            </div>

            {/* Directions button */}
            <button
              onClick={handleDirections}
              style={{
                width: '100%',
                padding: '14px 0',
                borderRadius: 12,
                border: 'none',
                background: 'linear-gradient(135deg, #C9A96E 0%, #E8C97A 50%, #A0784A 100%)',
                color: '#FAF7F2',
                fontFamily: 'Lato',
                fontSize: 12,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(201,169,110,0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              <span>🗺️</span> Get Directions
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}