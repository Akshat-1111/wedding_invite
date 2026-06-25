import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function getTimeLeft(target) {
  const now = new Date().getTime()
  const end = new Date(target).getTime()
  const diff = Math.max(0, end - now)
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function Countdown({ data }) {
  const [time, setTime] = useState(getTimeLeft(data.countdown_target))
  const [ticking, setTicking] = useState(null)
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeLeft(data.countdown_target))
      setTicking('seconds')
      setTimeout(() => setTicking(null), 150)
    }, 1000)
    return () => clearInterval(interval)
  }, [data.countdown_target])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: contentRef.current, start: 'top 80%', once: true }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const units = [
    { label: 'Days', labelHi: 'दिन', value: time.days },
    { label: 'Hours', labelHi: 'घंटे', value: time.hours },
    { label: 'Minutes', labelHi: 'मिनट', value: time.minutes },
    { label: 'Seconds', labelHi: 'सेकंड', value: time.seconds, tick: ticking === 'seconds' },
  ]

  return (
    <section ref={sectionRef} className="w-full py-16 px-6" style={{ background: 'linear-gradient(180deg, #F5EDE0 0%, #FAF7F2 100%)' }}>
      <div ref={contentRef} className="max-w-sm mx-auto text-center">
        {/* Label */}
        <p style={{ fontFamily: 'Lato', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A0784A', marginBottom: 6 }}>
          Counting Down To
        </p>
        <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 28, fontWeight: 300, color: '#8B3A52', marginBottom: 4 }}>
          The Wedding
        </h2>
        <p style={{ fontFamily: 'Hind', fontSize: 13, color: '#A0784A', marginBottom: 28 }}>
          शुभ मुहूर्त की प्रतीक्षा
        </p>

        {/* Timer grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {units.map(({ label, labelHi, value, tick }) => (
            <div key={label} style={{
              background: 'linear-gradient(160deg, #FAF3E8 0%, #F5E6D0 100%)',
              border: '1px solid rgba(201,169,110,0.35)',
              borderRadius: 12,
              padding: '14px 4px',
              boxShadow: '0 2px 12px rgba(139,58,82,0.06)',
            }}>
              <div
                style={{
                  fontFamily: 'Cormorant Garamond',
                  fontSize: 38,
                  fontWeight: 600,
                  lineHeight: 1,
                  background: 'linear-gradient(135deg, #C9A96E 0%, #E8C97A 50%, #A0784A 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  transition: 'transform 0.15s ease',
                  transform: tick ? 'scale(1.08)' : 'scale(1)',
                  display: 'block',
                }}
              >
                {String(value).padStart(2, '0')}
              </div>
              <p style={{ fontFamily: 'Lato', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A0784A', marginTop: 4 }}>
                {label}
              </p>
              <p style={{ fontFamily: 'Hind', fontSize: 10, color: '#C9A96E', marginTop: 1 }}>
                {labelHi}
              </p>
            </div>
          ))}
        </div>

        {/* Date reminder */}
        <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.4))' }} />
          <p style={{ fontFamily: 'Cormorant Garamond', fontStyle: 'italic', fontSize: 15, color: '#8B3A52' }}>
            20 August 2026, Indore
          </p>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(to left, transparent, rgba(201,169,110,0.4))' }} />
        </div>
      </div>
    </section>
  )
}
