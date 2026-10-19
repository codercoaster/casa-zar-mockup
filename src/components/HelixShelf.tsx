import { useEffect, useRef, useState } from 'react'
import {
  motion,
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
  const [size, setSize] = useState({ w: 180, radius: 360, pitch: 64 })
  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth
      const w = vw < 640 ? 132 : vw < 1024 ? 160 : 186
      setSize({ w, radius: w * (vw < 640 ? 1.55 : 1.95), pitch: w * 0.34 })
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

function Helix() {
  const trackRef = useRef<HTMLDivElement>(null)
  const { w, radius, pitch } = useHelixSize()
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 })

  const rotateY = useTransform(progress, p => -p * LAST * STEP)
  const y = useTransform(progress, p => -p * LAST * pitch)
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

  const book = books[active]

  return (
    <div ref={trackRef} className="helix-track" style={{ height: `${books.length * 28 + 100}vh` }}>
      <div className="helix-sticky">
        <div className="helix-stage" style={{ ['--book-w' as string]: `${w}px` }}>
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
      </div>
    </div>
  )
}

function HelixItem({ book, index, radius, pitch, rotateY, onSelect, isActive }: {
  book: Book; index: number; radius: number; pitch: number
  rotateY: MotionValue<number>; onSelect: () => void; isActive: boolean
}) {
  const angle = index * STEP
  const facing = useTransform(rotateY, r => Math.max(0, Math.cos(((angle + r) * Math.PI) / 180)))
  const opacity = useTransform(facing, f => 0.3 + f * 0.7)
  const filter = useTransform(facing, f => `sepia(${(1 - f) * 0.5}) brightness(${0.7 + f * 0.3})`)

  return (
    <div
      className="helix-item"
      style={{ transform: `translateY(${index * pitch}px) rotateY(${angle}deg) translateZ(${radius}px)` }}
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
        <motion.span className="book-front" style={{ opacity, filter }}><BookCover book={book} /></motion.span>
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
