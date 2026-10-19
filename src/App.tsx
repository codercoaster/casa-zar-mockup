import { useEffect } from 'react'
import { HelixShelf } from './components/HelixShelf'
import { Envios, Footer, Header, Hero, LaCasa, QueEncontraras, Servicios, Symbols, Visitanos } from './components/Sections'

function usePageEffects() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const header = document.querySelector<HTMLElement>('.site-header')
    const ring = document.querySelector<SVGGElement>('.seal-ring')

    let ticking = false
    const onScroll = () => {
      const y = window.scrollY
      header?.classList.toggle('scrolled', y > 40)
      if (ring && !reduced) ring.style.setProperty('--ring-rot', `${y * 0.12}deg`)
      ticking = false
    }
    const handler = () => {
      if (!ticking) { requestAnimationFrame(onScroll); ticking = true }
    }
    window.addEventListener('scroll', handler, { passive: true })
    onScroll()

    const items = document.querySelectorAll('.reveal')
    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('is-visible'))
      return () => window.removeEventListener('scroll', handler)
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          io.unobserve(entry.target)
        }
      })
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 })
    items.forEach(el => io.observe(el))

    return () => {
      window.removeEventListener('scroll', handler)
      io.disconnect()
    }
  }, [])
}

// Anchor jumps that cross the helix fade the page out, jump instantly, then fade back in
const FADE_MS = 250

function useHelixSkip() {
  useEffect(() => {
    const veil = document.querySelector<HTMLElement>('.page-veil')
    let busy = false

    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]')
      const track = document.querySelector<HTMLElement>('.helix-track')
      const target = link && document.getElementById(link.hash.slice(1))
      if (!link || !track || !target || !veil) return

      const y = window.scrollY
      const trackTop = track.getBoundingClientRect().top + y
      const trackEnd = trackTop + track.offsetHeight - window.innerHeight
      const targetY = target.getBoundingClientRect().top + y
      const crosses = (targetY > y && y < trackEnd && targetY > trackEnd) || (targetY < y && y > trackTop && targetY < trackTop)
      if (!crosses) return

      e.preventDefault()
      if (busy) return
      busy = true
      veil.classList.add('is-on')
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'instant' })
        history.pushState(null, '', link.hash)
        // Wait two frames so the new scroll position is painted before revealing
        requestAnimationFrame(() => requestAnimationFrame(() => {
          veil.classList.remove('is-on')
          busy = false
        }))
      }, FADE_MS)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
}

export default function App() {
  usePageEffects()
  useHelixSkip()
  return (
    <>
      <Symbols />
      <Header />
      <div className="page-veil" aria-hidden="true" />
      <main>
        <Hero />
        <LaCasa />
        <QueEncontraras />
        <HelixShelf />
        <Servicios />
        <Envios />
        <Visitanos />
      </main>
      <Footer />
    </>
  )
}
