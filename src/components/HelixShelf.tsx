import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { books, type Book } from '../data/books'
import { BookCover } from './BookCover'
import { SectionHead } from './Sections'
import { waLink } from '../site'

const ITEMS_PER_TURN = 7
const STEP = 360 / ITEMS_PER_TURN
const LAST = books.length - 1

const askFor = (b: Book) => waLink(`Hola Casa Zar, quisiera consultar por "${b.title.join(' ')}".`)
const number = (i: number) => `N.º ${String(i + 1).padStart(3, '0')}`

function useHelixSize() {
  const [size, setSize] = useState({ w: 180, radius: 360, pitch: 64, reach: LAST })
  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth
      const w = vw < 640 ? 132 : vw < 1024 ? 160 : 186
      const pitch = w * 0.34
      // Books further than a viewport from the active one are off-stage; skip rendering them
      setSize({ w, radius: w * (vw < 640 ? 1.55 : 1.95), pitch, reach: Math.ceil(window.innerHeight / pitch) })
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return size
}

export function HelixShelf() {
  const reduce = useReducedMotion()
  return (
    <section className="section section-helix" id="hallazgos">
      <SectionHead
        numeral="III"
        title="Hallazgos recientes"
        note="Piezas ilustrativas. Consulte disponibilidad por WhatsApp o en Instagram."
      />
      {reduce ? <StaticShelf /> : <Helix />}
    </section>
  )
}

const SWIPE_QUERY = '(max-width: 640px)'
const subscribeSwipe = (cb: () => void) => {
  const mq = window.matchMedia(SWIPE_QUERY)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}

// Phones browse the helix by swiping; scroll-driven 3D was too heavy while the page itself scrolled
function Helix() {
  const swipe = useSyncExternalStore(subscribeSwipe, () => window.matchMedia(SWIPE_QUERY).matches)
  return swipe ? <SwipeHelix /> : <ScrollHelix />
}

function ScrollHelix() {
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 })
  const pos = useTransform(progress, p => p * LAST)
  const [active, setActive] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', p => setActive(Math.round(p * LAST)))

  const goTo = (i: number) => {
    const el = trackRef.current
    if (!el) return
    const idx = Math.max(0, Math.min(LAST, i))
    const top = el.getBoundingClientRect().top + window.scrollY
    const travel = el.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + (idx / LAST) * travel, behavior: 'smooth' })
  }

  return (
    <div ref={trackRef} className="helix-track" style={{ height: `${books.length * 28 + 100}vh` }}>
      <div className="helix-sticky">
        <HelixScene pos={pos} active={active} goTo={goTo} />
      </div>
    </div>
  )
}

function SwipeHelix() {
  const pos = useMotionValue(0)
  const [active, setActive] = useState(0)
  useMotionValueEvent(pos, 'change', p => setActive(Math.max(0, Math.min(LAST, Math.round(p)))))
  const drag = useRef<{ x: number; pos: number; t: number; v: number } | null>(null)
  const moved = useRef(false)

  const settle = (target: number) => {
    animate(pos, Math.max(0, Math.min(LAST, target)), { type: 'spring', stiffness: 170, damping: 26 })
  }
  const goTo = (i: number) => { if (!moved.current) settle(i) }

  // One book per this many px of finger travel
  const span = () => Math.min(window.innerWidth * 0.45, 180)

  const handlers = {
    onPointerDown: (e: React.PointerEvent) => {
      pos.stop()
      drag.current = { x: e.clientX, pos: pos.get(), t: e.timeStamp, v: 0 }
      moved.current = false
    },
    onPointerMove: (e: React.PointerEvent) => {
      const d = drag.current
      if (!d) return
      const dx = e.clientX - d.x
      if (Math.abs(dx) > 6) moved.current = true
      const next = Math.max(-0.4, Math.min(LAST + 0.4, d.pos - dx / span()))
      const dt = e.timeStamp - d.t
      if (dt > 0) d.v = (next - pos.get()) / dt
      d.t = e.timeStamp
      pos.set(next)
    },
    onPointerUp: () => {
      const d = drag.current
      drag.current = null
      if (!d || !moved.current) return
      // Fling: project ~150ms of velocity ahead before snapping to the nearest book
      settle(Math.round(pos.get() + d.v * 150))
    },
    onPointerCancel: () => {
      drag.current = null
      settle(Math.round(pos.get()))
    },
  }

  return (
    <div className="helix-swipe">
      <HelixScene pos={pos} active={active} goTo={goTo} stageProps={handlers} />
    </div>
  )
}

function HelixScene({ pos, active, goTo, stageProps }: {
  pos: MotionValue<number>; active: number; goTo: (i: number) => void
  stageProps?: React.HTMLAttributes<HTMLDivElement>
}) {
  const { w, radius, pitch, reach } = useHelixSize()
  const rotateY = useTransform(pos, p => -p * STEP)
  const y = useTransform(pos, p => -p * pitch)
  const book = books[active]

  return (
    <>
      <div className="helix-stage" style={{ ['--book-w' as string]: `${w}px` }} {...stageProps}>
        <motion.div className="helix" style={{ rotateY, y }}>
          {books.map((b, i) => (
            <HelixItem
              key={i}
              book={b}
              index={i}
              radius={radius}
              pitch={pitch}
              rotateY={rotateY}
              onSelect={() => goTo(i)}
              isActive={i === active}
              hidden={Math.abs(i - active) > reach}
            />
          ))}
        </motion.div>
      </div>

      <div className="helix-caption">
        <div className="helix-meta" aria-live="polite">
          <p className="find-no">{number(active)}</p>
          <h3>{book.title.join(' ')}</h3>
          <p className="find-meta">{book.author} · {book.meta}</p>
        </div>
        <div className="helix-controls">
          <button type="button" className="round-btn" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Libro anterior">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
          </button>
          <span className="counter">{active + 1} / {books.length}</span>
          <button type="button" className="round-btn" onClick={() => goTo(active + 1)} disabled={active === LAST} aria-label="Libro siguiente">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
          </button>
          <a className="btn btn-solid" href={askFor(book)} target="_blank" rel="noopener">Consultar</a>
        </div>
      </div>
    </>
  )
}

function HelixItem({ book, index, radius, pitch, rotateY, onSelect, isActive, hidden }: {
  book: Book; index: number; radius: number; pitch: number
  rotateY: MotionValue<number>; onSelect: () => void; isActive: boolean; hidden: boolean
}) {
  const angle = index * STEP
  const facing = useTransform(rotateY, r => Math.max(0, Math.cos(((angle + r) * Math.PI) / 180)))
  // Only opacity animates per frame: it is composited, whereas a changing filter repaints the cover
  const opacity = useTransform(facing, f => 0.3 + f * 0.7)
  const shade = useTransform(facing, f => (1 - f) * 0.45)

  return (
    <div
      className="helix-item"
      style={{
        transform: `translateY(${index * pitch}px) rotateY(${angle}deg) translateZ(${radius}px)`,
        visibility: hidden ? 'hidden' : undefined,
      }}
    >
      <motion.button
        type="button"
        className={`book ${isActive ? 'is-active' : ''}`}
        onClick={onSelect}
        tabIndex={-1}
        aria-hidden="true"
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      >
        <motion.span className="book-front" style={{ opacity }}>
          <BookCover book={book} />
          <motion.span className="book-shade" style={{ opacity: shade }} />
        </motion.span>
        <span className="book-back" style={{ background: book.bg }} />
      </motion.button>
    </div>
  )
}

function StaticShelf() {
  return (
    <ul className="static-shelf">
      {books.map((b, i) => (
        <li key={i}>
          <a href={askFor(b)} target="_blank" rel="noopener">
            <BookCover book={b} />
            <span className="find-no">{number(i)}</span>
            <span className="static-title">{b.title.join(' ')}</span>
            <span className="find-meta">{b.author}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}
