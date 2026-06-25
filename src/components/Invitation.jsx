import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Invitation({ data }) {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            once: true,
          }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full py-16 px-6 flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(160deg, #FAF7F2 0%, #F5EDE0 100%)' }}>
      {/* Mandala watermark */}
      <div className="absolute inset-0 mandala-bg opacity-40 pointer-events-none" />

      <div ref={contentRef} className="relative parchment rounded-2xl shadow-lg border border-gold/30 w-full max-w-sm mx-auto px-8 py-10 text-center">
        {/* Top floral */}
        <TopFloral />

        <p style={{ fontFamily: 'Lato', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A0784A', marginBottom: 16 }}>
          — With Joy & Blessings —
        </p>

        <p style={{ fontFamily: 'Cormorant Garamond', fontSize: 16, color: '#5a3a28', lineHeight: 1.7, marginBottom: 8 }}>
          Together with their families
        </p>

        {/* Gold divider */}
        <GoldDivider />

        <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 38, fontWeight: 300, color: '#8B3A52', lineHeight: 1.1, margin: '14px 0' }}>
          Deep<br />
          <span style={{ fontSize: 18, fontStyle: 'italic', color: '#C9A96E' }}>&amp;</span><br />
          Meenal
        </h2>

        <GoldDivider />

        <p style={{ fontFamily: 'Cormorant Garamond', fontStyle: 'italic', fontSize: 17, color: '#5a3a28', lineHeight: 1.7, marginTop: 14 }}>
          request the pleasure<br />of your company
        </p>

        <p style={{ fontFamily: 'Cormorant Garamond', fontSize: 15, color: '#7a5a3a', marginTop: 10, lineHeight: 1.6 }}>
          at the celebration of their<br />
          <strong style={{ color: '#8B3A52', fontWeight: 600 }}>sacred union</strong>
        </p>

        {/* Hindi */}
        <p style={{ fontFamily: 'Hind', fontSize: 14, color: '#A0784A', marginTop: 14, letterSpacing: '0.04em' }}>
          आपकी उपस्थिति हमारे लिए<br />सबसे बड़ा आशीर्वाद है
        </p>

        {/* Venue teaser */}
        <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(201,169,110,0.3)' }}>
          <p style={{ fontFamily: 'Lato', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A0784A', marginBottom: 4 }}>
            Venue
          </p>
          <p style={{ fontFamily: 'Cormorant Garamond', fontSize: 16, color: '#5a3a28', fontWeight: 500 }}>
            {data.venue.name}
          </p>
          <p style={{ fontFamily: 'Lato', fontSize: 11, color: '#7a5a3a', marginTop: 2 }}>
            {data.venue.address}
          </p>
        </div>

        {/* Bottom floral */}
        <BottomFloral />
      </div>
    </section>
  )
}

function GoldDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '6px 0' }}>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, #C9A96E)' }} />
      <span style={{ color: '#E8A020', fontSize: 14 }}>✦</span>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(to left, transparent, #C9A96E)' }} />
    </div>
  )
}

function TopFloral() {
  return (
    <svg width="220" height="55" viewBox="0 0 220 55" fill="none" style={{ marginBottom: 10, display: 'block', margin: '0 auto 10px' }}>
      {/* Center cluster */}
      <circle cx="110" cy="28" r="7" fill="#E8A020" opacity="0.6" />
      <circle cx="110" cy="28" r="4" fill="#C9A96E" opacity="0.8" />
      {/* Petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <ellipse key={i} cx={110 + 13 * Math.cos(angle * Math.PI / 180)} cy={28 + 13 * Math.sin(angle * Math.PI / 180)} rx="3" ry="6" fill="#8B3A52" opacity="0.25" transform={`rotate(${angle} ${110 + 13 * Math.cos(angle * Math.PI / 180)} ${28 + 13 * Math.sin(angle * Math.PI / 180)})`} />
      ))}
      {/* Left branch */}
      <path d="M90 28 Q70 16 45 20 Q62 24 58 32 Q72 22 90 28" fill="#C9A96E" opacity="0.25" />
      <circle cx="46" cy="20" r="4" fill="#E8A020" opacity="0.55" />
      <circle cx="62" cy="13" r="2.5" fill="#8B3A52" opacity="0.4" />
      <circle cx="76" cy="18" r="2" fill="#C9A96E" opacity="0.5" />
      <path d="M38 24 Q28 14 18 18 Q30 16 32 26" fill="#A0784A" opacity="0.3" />
      {/* Right branch */}
      <path d="M130 28 Q150 16 175 20 Q158 24 162 32 Q148 22 130 28" fill="#C9A96E" opacity="0.25" />
      <circle cx="174" cy="20" r="4" fill="#E8A020" opacity="0.55" />
      <circle cx="158" cy="13" r="2.5" fill="#8B3A52" opacity="0.4" />
      <circle cx="144" cy="18" r="2" fill="#C9A96E" opacity="0.5" />
      <path d="M182 24 Q192 14 202 18 Q190 16 188 26" fill="#A0784A" opacity="0.3" />
      {/* Leaf tips */}
      <path d="M14 15 Q8 8 4 12 Q12 9 14 15" fill="#A0784A" opacity="0.35" />
      <path d="M206 15 Q212 8 216 12 Q208 9 206 15" fill="#A0784A" opacity="0.35" />
    </svg>
  )
}

function BottomFloral() {
  return (
    <svg width="180" height="40" viewBox="0 0 180 40" fill="none" style={{ marginTop: 16, display: 'block', margin: '16px auto 0' }}>
      <path d="M90 8 Q72 22 50 18 Q68 26 64 34 Q76 20 90 8" fill="#C9A96E" opacity="0.2" />
      <path d="M90 8 Q108 22 130 18 Q112 26 116 34 Q104 20 90 8" fill="#C9A96E" opacity="0.2" />
      <circle cx="90" cy="10" r="6" fill="#E8A020" opacity="0.5" />
      <circle cx="50" cy="20" r="3.5" fill="#8B3A52" opacity="0.4" />
      <circle cx="130" cy="20" r="3.5" fill="#8B3A52" opacity="0.4" />
      <path d="M28 22 Q18 14 8 18 Q20 16 22 24" fill="#A0784A" opacity="0.3" />
      <path d="M152 22 Q162 14 172 18 Q160 16 158 24" fill="#A0784A" opacity="0.3" />
    </svg>
  )
}