'use client'

import { useCallback, useEffect, useRef } from 'react'

type UseSoundOptions = {
  /**
   * Whether the audio should play automatically on mount
   */
  autoPlay?: boolean
  /**
   * Delay in milliseconds before playing
   */
  delay?: number
  /**
   * Whether the audio should loop
   */
  loop?: boolean
  /**
   * Volume from 0 to 1
   */
  volume?: number
}

const defaultOptions: Required<UseSoundOptions> = {
  delay: 0,
  volume: 0.5,
  loop: false,
  autoPlay: true
}

/**
 * Loads an audio file and returns imperative play and stop controls, with optional
 * autoplay, looping, volume, and delay.
 * @param {string} file - The URL or path of the audio file to play.
 * @param {UseSoundOptions} [options] - Playback options (volume, loop, delay, autoPlay).
 * @returns {{ play: () => void; stop: () => void }} Imperative handlers to play and stop the sound.
 */
export function useSound(file: string, options: UseSoundOptions = {}) {
  const { delay, volume, loop, autoPlay } = {
    ...defaultOptions,
    ...options
  }

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const timeoutRef = useRef<null | number>(null)

  const stop = useCallback(() => {
    if (timeoutRef.current) {
      globalThis.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.volume = 0
      audioRef.current.currentTime = 0
    }
  }, [])

  const play = useCallback(() => {
    if (!audioRef.current) return

    if (timeoutRef.current) {
      globalThis.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    const runPlayback = () => {
      if (!audioRef.current) return
      audioRef.current.volume = volume
      audioRef.current.loop = loop
      audioRef.current.play().catch((error: unknown) => {
        console.error('Error playing audio:', error)
      })
    }

    if (delay > 0) {
      timeoutRef.current = globalThis.setTimeout(runPlayback, delay)
    } else {
      runPlayback()
    }
  }, [delay, loop, volume])

  useEffect(() => {
    audioRef.current = new Audio(file)

    if (autoPlay) {
      play()
    }

    return () => {
      stop()
      audioRef.current = null
    }
  }, [file, autoPlay, play, stop])

  return {
    play,
    stop
  }
}
