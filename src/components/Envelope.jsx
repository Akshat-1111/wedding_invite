import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Envelope({ data }) {
  const sectionRef = useRef(null)
  const flapRef = useRef(null)
  const cardRef = useRef(null)
  const envelopeRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=180%',
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        }
      })

      tl.to(flapRef.current, {
        rotateX: -180,
        duration: 1,
        ease: 'power2.inOut',
      }, 0)

      tl.fromTo(cardRef.current,
        { y: 60, opacity: 0 },
        { y: -160, opacity: 1, duration: 1.2, ease: 'power3.out' },
        0.6
      )

      tl.to(envelopeRef.current, {
        opacity: 0, scale: 0.92, duration: 0.6, ease: 'power2.in',
      }, 1.6)

      tl.to(overlayRef.current, { opacity: 0, duration: 0.4 }, 1.8)

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  /*
    ENVELOPE STRUCTURE (real envelope logic):
    ┌─────────────────────┐  ← top of wrapper (y=0)
    │   FLAP (triangle    │    tip points DOWN, hinge at top
    │        ▼            │    zIndex: 4
    ├─────────────────────┤  ← y=130 (flap height)
    │                     │
    │   BODY (rectangle)  │    zIndex: 3
    │   with side folds   │
    │                     │
    └─────────────────────┘  ← bottom of wrapper

    The body has NO top triangle fold visible — that's a separate
    "bottom flap" shape inside the body at the bottom half only.
    The top of the body is a clean straight edge.
  */

  const W = 300   // envelope width
  const FLAP_H = 130  // flap triangle height
  const H = FLAP_H + 210  // body = 210px > flap

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #F5E6E0 0%, #FAF0E8 60%, #F0D8CC 100%)' }}
    >
      <CornerDecor position="top-left" />
      <CornerDecor position="top-right" />
      <CornerDecor position="bottom-left" />
      <CornerDecor position="bottom-right" />

      <div
        ref={envelopeRef}
        style={{ position: 'relative', width: W, height: H, marginTop: 80 }}
      >
        {/* ── BACK of envelope (darkest, behind all) ── */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(180deg, #C8B870 0%, #B8A458 100%)',
          borderRadius: '4px 4px 10px 10px',
          border: '1px solid rgba(160,120,50,0.6)',
          boxShadow: '0 12px 48px rgba(80,50,10,0.35)',
          zIndex: 1,
        }} />

        {/* Side borders + bg behind flap area */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: FLAP_H,
          background: 'linear-gradient(180deg, #EDE0C4 0%, #E8D9B8 100%)',
          border: '1px solid rgba(201,169,110,0.6)',
          borderBottom: 'none',
          zIndex: 2,
          pointerEvents: 'none',
        }} />

        {/* ── FLAP: downward triangle, hinge at top ── */}
        <div
          ref={flapRef}
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: W, height: FLAP_H,
            zIndex: 4,
            transformStyle: 'preserve-3d',
            transformOrigin: 'top center',
          }}
        >
          {/* Front of flap */}
          <div style={{
            position: 'absolute', inset: 0,
            clipPath: `polygon(0 0, ${W}px 0, ${W / 2}px ${FLAP_H}px)`,
            background: 'linear-gradient(170deg, #E8D5A8 0%, #F0E2C0 60%, #EDD8B0 100%)',
            backfaceVisibility: 'hidden',
          }} />
          {/* Back of flap (shown when open) */}
          <div style={{
            position: 'absolute', inset: 0,
            clipPath: `polygon(0 0, ${W}px 0, ${W / 2}px ${FLAP_H}px)`,
            background: 'linear-gradient(0deg, #F5EAD8 0%, #EDD8B0 100%)',
            transform: 'rotateX(180deg) scaleX(-1)',
            backfaceVisibility: 'hidden',
          }} />

          {/* Wax seal at tip */}
          <div style={{
            position: 'absolute',
            bottom: -22,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 20,
            width: 44, height: 44,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 38% 35%, #9B4A5A, #6B2030)',
            boxShadow: '0 2px 12px rgba(100,30,40,0.45), inset 0 1px 2px rgba(255,200,180,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid rgba(180,100,80,0.3)',
          }}>
            <img
              src={data.logo_image}
              alt="DM seal"
              style={{
                width: 30, height: 30,
                objectFit: 'contain',
                filter: 'brightness(0) invert(1)',
                opacity: 0.9,
              }}
            />
          </div>
        </div>

        {/* ── BODY: solid rectangle below flap ── */}
        <div style={{
          position: 'absolute',
          top: FLAP_H,
          left: 0, right: 0,
          height: H - FLAP_H,
          background: 'linear-gradient(180deg, #F2E8CE 0%, #EAD9B0 100%)',
          borderRadius: '0 0 10px 10px',
          borderLeft: '1px solid rgba(180,140,60,0.5)',
          borderRight: '1px solid rgba(180,140,60,0.5)',
          borderBottom: '1px solid rgba(180,140,60,0.5)',
          zIndex: 3,
          overflow: 'hidden',
        }}>
          {/* Left inner fold triangle */}
          <div style={{
            position: 'absolute', top: 0, left: 0,
            width: 0, height: 0,
            borderTop: `${(H - FLAP_H) / 2}px solid rgba(140,100,40,0.13)`,
            borderRight: `${W / 2}px solid transparent`,
          }} />
          {/* Right inner fold triangle */}
          <div style={{
            position: 'absolute', top: 0, right: 0,
            width: 0, height: 0,
            borderTop: `${(H - FLAP_H) / 2}px solid rgba(140,100,40,0.13)`,
            borderLeft: `${W / 2}px solid transparent`,
          }} />
          {/* Bottom fold point */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0,
            width: 0, height: 0,
            borderBottom: `${(H - FLAP_H) / 2}px solid rgba(140,100,40,0.1)`,
            borderRight: `${W / 2}px solid transparent`,
          }} />
          <div style={{
            position: 'absolute', bottom: 0, right: 0,
            width: 0, height: 0,
            borderBottom: `${(H - FLAP_H) / 2}px solid rgba(140,100,40,0.1)`,
            borderLeft: `${W / 2}px solid transparent`,
          }} />
        </div>

        {/* ── PARCHMENT CARD ── */}
        <div
          ref={cardRef}
          className="parchment"
          style={{
            position: 'absolute',
            width: 260, height: 320,
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%) translateY(60px)',
            zIndex: 8,
            opacity: 0,
            borderRadius: 8,
            border: '1px solid rgba(201,169,110,0.35)',
            boxShadow: '0 8px 32px rgba(100,60,20,0.18)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '24px 20px',
          }}
        >
          <FloralTop />
          <div style={{ textAlign: 'center', marginTop: 8 }}>
            <p style={{ fontFamily: 'Cormorant Garamond', fontSize: 11, color: '#A0784A', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>
              Together with their families
            </p>
            <p style={{ fontFamily: 'Cormorant Garamond', fontStyle: 'italic', fontSize: 15, color: '#8B3A52', marginBottom: 8, lineHeight: 1.4 }}>
              request the pleasure<br />of your company
            </p>
            <div style={{ width: 80, height: 1, background: 'linear-gradient(to right, transparent, #C9A96E, transparent)', margin: '8px auto' }} />
            <p style={{ fontFamily: 'Cormorant Garamond', fontSize: 13, color: '#A0784A', letterSpacing: '0.08em' }}>
              at the wedding celebration of
            </p>
            <p style={{ fontFamily: 'Cormorant Garamond', fontSize: 22, fontWeight: 600, color: '#8B3A52', marginTop: 6, lineHeight: 1.2 }}>
              Deep &amp; Meenal
            </p>
          </div>
          <FloralBottom />
        </div>
      </div>

      {/* Scroll hint */}
      <div className="bounce-gentle" style={{ position: 'absolute', bottom: 40, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <p style={{ fontFamily: 'Lato', fontSize: 11, color: '#A0784A', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          Scroll to open
        </p>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12l7 7 7-7" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div ref={overlayRef} className="absolute inset-0 bg-blush pointer-events-none" style={{ zIndex: -1 }} />
    </section>
  )
}

function FloralTop() {
  return (
    <svg width="200" height="60" viewBox="0 0 200 60" fill="none">
      <circle cx="100" cy="30" r="6" fill="#E8A020" opacity="0.7" />
      <ellipse cx="100" cy="18" rx="4" ry="8" fill="#C9A96E" opacity="0.5" />
      <ellipse cx="100" cy="42" rx="4" ry="8" fill="#C9A96E" opacity="0.5" />
      <ellipse cx="88" cy="30" rx="4" ry="8" fill="#C9A96E" opacity="0.5" transform="rotate(90 88 30)" />
      <ellipse cx="112" cy="30" rx="4" ry="8" fill="#C9A96E" opacity="0.5" transform="rotate(90 112 30)" />
      <path d="M80 30 Q60 20 40 25 Q55 28 50 35 Q65 28 80 30" fill="#8B3A52" opacity="0.3" />
      <circle cx="42" cy="25" r="3" fill="#E8A020" opacity="0.5" />
      <circle cx="55" cy="18" r="2" fill="#C9A96E" opacity="0.5" />
      <circle cx="68" cy="22" r="2" fill="#8B3A52" opacity="0.4" />
      <path d="M120 30 Q140 20 160 25 Q145 28 150 35 Q135 28 120 30" fill="#8B3A52" opacity="0.3" />
      <circle cx="158" cy="25" r="3" fill="#E8A020" opacity="0.5" />
      <circle cx="145" cy="18" r="2" fill="#C9A96E" opacity="0.5" />
      <circle cx="132" cy="22" r="2" fill="#8B3A52" opacity="0.4" />
      <path d="M30 28 Q25 20 20 25 Q28 22 30 28" fill="#A0784A" opacity="0.4" />
      <path d="M170 28 Q175 20 180 25 Q172 22 170 28" fill="#A0784A" opacity="0.4" />
    </svg>
  )
}

function FloralBottom() {
  return (
    <svg width="180" height="40" viewBox="0 0 180 40" fill="none" style={{ display: 'block', margin: '8px auto 0' }}>
      <path d="M90 5 Q70 15 50 12 Q65 18 60 25 Q75 15 90 5" fill="#8B3A52" opacity="0.2" />
      <path d="M90 5 Q110 15 130 12 Q115 18 120 25 Q105 15 90 5" fill="#8B3A52" opacity="0.2" />
      <circle cx="90" cy="8" r="5" fill="#E8A020" opacity="0.5" />
      <ellipse cx="90" cy="3" rx="3" ry="5" fill="#C9A96E" opacity="0.4" />
      <ellipse cx="84" cy="8" rx="3" ry="5" fill="#C9A96E" opacity="0.4" transform="rotate(60 84 8)" />
      <ellipse cx="96" cy="8" rx="3" ry="5" fill="#C9A96E" opacity="0.4" transform="rotate(-60 96 8)" />
      <circle cx="55" cy="14" r="3" fill="#E8A020" opacity="0.4" />
      <circle cx="125" cy="14" r="3" fill="#E8A020" opacity="0.4" />
      <path d="M30 20 Q20 12 10 15 Q22 14 25 22 Q28 14 30 20" fill="#A0784A" opacity="0.35" />
      <path d="M150 20 Q160 12 170 15 Q158 14 155 22 Q152 14 150 20" fill="#A0784A" opacity="0.35" />
    </svg>
  )
}

function CornerDecor({ position }) {
  const styles = {
    'top-left': { top: 12, left: 12, transform: 'none' },
    'top-right': { top: 12, right: 12, transform: 'rotate(90deg)' },
    'bottom-left': { bottom: 12, left: 12, transform: 'rotate(-90deg)' },
    'bottom-right': { bottom: 12, right: 12, transform: 'rotate(180deg)' },
  }[position]

  return (
    <div style={{ position: 'absolute', opacity: 0.28, ...styles }}>
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
        <path d="M2 2 Q2 25 25 25 Q2 25 2 48" stroke="#C9A96E" strokeWidth="1" fill="none" />
        <circle cx="5" cy="5" r="2" fill="#E8A020" />
        <circle cx="14" cy="10" r="1.5" fill="#C9A96E" />
        <circle cx="10" cy="18" r="1.5" fill="#8B3A52" />
        <path d="M8 2 Q14 8 10 14" stroke="#C9A96E" strokeWidth="0.8" fill="none" />
        <path d="M2 10 Q8 14 6 20" stroke="#C9A96E" strokeWidth="0.8" fill="none" />
      </svg>
    </div>
  )
}