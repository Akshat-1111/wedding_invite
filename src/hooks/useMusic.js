import { useEffect, useRef, useState } from 'react'

export function useMusic(url) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const triedRef = useRef(false)

  useEffect(() => {
    const audio = new Audio(url)
    audio.loop = true
    audio.volume = 0.4
    audioRef.current = audio

    const tryPlay = () => {
      if (triedRef.current) return
      triedRef.current = true
      audio.play()
        .then(() => setPlaying(true))
        .catch(() => {
          triedRef.current = false
        })
    }

    tryPlay()

    const events = ['touchstart', 'click', 'keydown']
    events.forEach(e => document.addEventListener(e, tryPlay, { once: true, passive: true }))

    return () => {
      audio.pause()
      audio.src = ''
      events.forEach(e => document.removeEventListener(e, tryPlay))
    }
  }, [url])

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      await audio.play().catch(() => {})
      setPlaying(true)
    }
  }

  return { playing, toggle }
}
