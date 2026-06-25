import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Footer({ data }) {
  const [playing, setPlaying] = useState(false)
  const [audioReady, setAudioReady] = useState(false)
  const audioRef = useRef(null)
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    // Init audio
    const audio = new Audio(data.music_url)
    audio.loop = true
    audio.volume = 0.4
    audioRef.current = audio
    
    audio.addEventListener('canplaythrough', () => setAudioReady(true))
    audio.addEventListener('error', () => setAudioReady(false))

    // Browsers block autoplay in production without user interaction.
    // We try to play immediately, and if blocked, we wait for the first touch/scroll.
    let initialPlay = false;
    const tryPlay = () => {
      if (!initialPlay) {
        audio.play().then(() => {
          initialPlay = true;
          setPlaying(true);
          ['click', 'touchstart', 'scroll'].forEach(evt => 
            document.removeEventListener(evt, tryPlay)
          );
        }).catch(e => {
          // Autoplay blocked, silently wait for interaction
        });
      }
    };

    tryPlay();

    ['click', 'touchstart', 'scroll'].forEach(evt => 
      document.addEventListener(evt, tryPlay, { passive: true })
    );

    return () => {
      audio.pause()
      audio.src = ''
      ['click', 'touchstart', 'scroll'].forEach(evt => 
        document.removeEventListener(evt, tryPlay)
      );
    }
  }, [data.music_url])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: contentRef.current, start: 'top 90%', once: true }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const toggleMusic = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      try {
        await audio.play()
        setPlaying(true)
      } catch {
        // autoplay blocked — user tap handled this
      }
    }
  }

  return (
    <footer
      ref={sectionRef}
      className="relative w-full py-16 px-6 overflow-hidden mandala-bg"
      style={{ background: 'linear-gradient(160deg, #3d1a1a 0%, #2a1010 100%)' }}
    >
      {/* Gold top border */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(to right, transparent, #C9A96E, #E8A020, #C9A96E, transparent)' }} />

      <div ref={contentRef} className="relative z-10 max-w-sm mx-auto text-center">
        {/* Logo */}
        <div style={{ width: 80, height: 80, margin: '0 auto 20px', opacity: 0.9 }}>
          <img
            src={data.logo_image}
            alt="D & M"
            style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'brightness(0) invert(1) sepia(1) saturate(1.5) hue-rotate(5deg)' }}
          />
        </div>

        {/* Names */}
        <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 36, fontWeight: 300, color: '#E8C97A', lineHeight: 1.1, marginBottom: 6 }}>
          Deep &amp; Meenal
        </h2>

        {/* Date */}
        <p style={{ fontFamily: 'Lato', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.7)', marginBottom: 20 }}>
          19 – 20 August 2026 · Indore
        </p>

        {/* Gold divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.5))' }} />
          <span style={{ color: '#E8A020', fontSize: 16 }}>✦</span>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(to left, transparent, rgba(201,169,110,0.5))' }} />
        </div>

        {/* Tagline */}
        <p style={{ fontFamily: 'Hind', fontSize: 15, color: 'rgba(232,201,122,0.85)', lineHeight: 1.7, marginBottom: 6 }}>
          {data.tagline}
        </p>
        <p style={{ fontFamily: 'Cormorant Garamond', fontStyle: 'italic', fontSize: 16, color: 'rgba(201,169,110,0.7)', marginBottom: 32 }}>
          {data.tagline_en}
        </p>

        {/* Music toggle */}
        <div style={{ marginBottom: 36 }}>
          <button
            onClick={toggleMusic}
            className={playing ? 'music-pulse' : ''}
            style={{
              width: 56, height: 56, borderRadius: '50%',
              background: playing
                ? 'linear-gradient(135deg, #8B3A52, #C9A96E)'
                : 'rgba(201,169,110,0.15)',
              border: '1px solid rgba(201,169,110,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, cursor: 'pointer', margin: '0 auto 10px',
              transition: 'all 0.3s ease',
            }}
            aria-label={playing ? 'Mute music' : 'Play music'}
          >
            {playing ? '🎵' : '🔇'}
          </button>
          <p style={{ fontFamily: 'Lato', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.5)' }}>
            {playing ? 'Tap to mute' : 'Tap for music'}
          </p>
        </div>

        {/* Marigold divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(232,160,32,0.2)' }} />
          <span style={{ fontSize: 16 }}>🌼</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(232,160,32,0.2)' }} />
        </div>

        {/* Made with love */}
        <p style={{ fontFamily: 'Lato', fontSize: 11, color: 'rgba(201,169,110,0.4)', letterSpacing: '0.08em' }}>
          Made with ❤️ for Deep &amp; Meenal
        </p>
      </div>

      {/* Gold bottom border */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(to right, transparent, #C9A96E, #E8A020, #C9A96E, transparent)' }} />
    </footer>
  )
}