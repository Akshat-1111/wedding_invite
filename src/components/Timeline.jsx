import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const accentMap = {
  marigold: { bg: '#FFF8E8', border: '#E8A020', text: '#A06010', dot: '#E8A020' },
  rose: { bg: '#FFF0F3', border: '#8B3A52', text: '#6a2038', dot: '#8B3A52' },
  gold: { bg: '#FAF3E8', border: '#C9A96E', text: '#7a5030', dot: '#C9A96E' },
}

export default function Timeline({ data }) {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(card,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: i * 0.15,
            scrollTrigger: { trigger: card, start: 'top 85%', once: true }
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="w-full py-16 px-6" style={{ background: '#FAF7F2' }}>
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <p style={{ fontFamily: 'Lato', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A0784A', marginBottom: 6 }}>
            Save the Date
          </p>
          <h2 style={{ fontFamily: 'Hind', fontSize: 26, fontWeight: 500, color: '#8B3A52', marginBottom: 2 }}>
            शुभ कार्यक्रम
          </h2>
          <p style={{ fontFamily: 'Cormorant Garamond', fontStyle: 'italic', fontSize: 20, color: '#C9A96E' }}>
            The Celebrations
          </p>
        </div>

        {/* Vertical timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute', left: 28, top: 20, bottom: 20, width: 1,
            background: 'linear-gradient(to bottom, transparent, #C9A96E 20%, #C9A96E 80%, transparent)',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {data.events.map((event, i) => {
              const accent = accentMap[event.accent] || accentMap.gold
              return (
                <div
                  key={event.name}
                  ref={el => cardsRef.current[i] = el}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}
                >
                  {/* Timeline dot */}
                  <div style={{
                    width: 56, flexShrink: 0,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: '50%',
                      background: accent.bg,
                      border: `2px solid ${accent.border}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 20, boxShadow: `0 2px 12px ${accent.dot}30`,
                    }}>
                      {event.emoji}
                    </div>
                  </div>

                  {/* Card */}
                  <div style={{
                    flex: 1,
                    background: accent.bg,
                    border: `1px solid ${accent.border}50`,
                    borderRadius: 14,
                    padding: '14px 16px',
                    boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                      <h3 style={{
                        fontFamily: 'Cormorant Garamond', fontSize: 22, fontWeight: 600,
                        color: accent.text, lineHeight: 1,
                      }}>
                        {event.name}
                      </h3>
                      <span style={{ fontFamily: 'Hind', fontSize: 13, color: accent.dot }}>
                        {event.name_hi}
                      </span>
                    </div>
                    <p style={{
                      fontFamily: 'Lato', fontSize: 12, color: '#7a5a3a',
                      letterSpacing: '0.03em', marginBottom: 2,
                    }}>
                      {event.date}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 16, height: 1, background: accent.border }} />
                      <p style={{
                        fontFamily: 'Cormorant Garamond', fontStyle: 'italic',
                        fontSize: 15, color: accent.text,
                      }}>
                        {event.time}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Marigold divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 36 }}>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, #E8A020)' }} />
          <span style={{ fontSize: 18 }}>🌼</span>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(to left, transparent, #E8A020)' }} />
        </div>
      </div>
    </section>
  )
}
