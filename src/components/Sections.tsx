import { FACEBOOK, INSTAGRAM, MAPS, waLink } from '../site'

const WA_PIEZA = waLink('Hola Casa Zar, quisiera consultar por una pieza.')

export function Symbols() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <symbol id="z-mono" viewBox="27 27 48 48">
        <path d="M30 27H73V31L38 71H70L73 63H75L72 75H27V71L62 31H34L31 38H29Z M40 49H62V53H40Z" />
      </symbol>
    </svg>
  )
}

export function SectionHead({ numeral, title, note }: { numeral: string; title: string; note?: string }) {
  return (
    <header className="section-head reveal">
      <span className="numeral">{numeral}</span>
      <h2>{title}</h2>
      <div className="rule" aria-hidden="true"><span>❦</span></div>
      {note && <p className="section-note">{note}</p>}
    </header>
  )
}

export function Header() {
  return (
    <header className="site-header">
      <a className="brand" href={import.meta.env.BASE_URL} aria-label="Casa Zar, inicio">
        <span className="brand-mark"><svg><use href="#z-mono" /></svg></span>
        <span className="brand-name">Casa Zar</span>
      </a>
      <nav className="nav" aria-label="Principal">
        <a href="#la-casa">La Casa</a>
        <a href="#que-encontraras">Qué encontrarás</a>
        <a href="#hallazgos">Hallazgos</a>
        <a href="#servicios">Servicios</a>
        <a href="#visitanos">Visítanos</a>
      </nav>
    </header>
  )
}

const DUST = [
  ['12%', '70%', '14s', '3px'], ['22%', '30%', '18s', '2px'], ['35%', '80%', '16s', '4px'], ['48%', '20%', '20s', '2px'],
  ['63%', '75%', '15s', '3px'], ['74%', '35%', '19s', '2px'], ['85%', '65%', '17s', '3px'], ['92%', '25%', '21s', '2px'],
]

export function Hero() {
  return (
    <section className="hero">
      <div className="dust" aria-hidden="true">
        {DUST.map(([x, y, d, s], i) => (
          <span key={i} style={{ '--x': x, '--y': y, '--d': d, '--s': s } as React.CSSProperties} />
        ))}
      </div>

      <svg className="seal" viewBox="0 0 240 240" role="img" aria-label="Sello de Casa Zar">
        <defs>
          <path id="ring" d="M120,24 a96,96 0 1,1 0,192 a96,96 0 1,1 0,-192" />
        </defs>
        <g className="seal-frame">
          <circle cx="120" cy="120" r="116" strokeWidth="1.2" />
          <circle cx="120" cy="120" r="111" strokeWidth="0.6" />
          <circle cx="120" cy="120" r="82" strokeWidth="1" />
          <circle cx="120" cy="120" r="77" strokeWidth="0.8" strokeDasharray="1 3" />
        </g>
        <g className="seal-ring">
          <text><textPath href="#ring" textLength="596" lengthAdjust="spacing">CASA ZAR ✦ LIBROS · ANTIGÜEDADES · COLECCIONABLES ✦ </textPath></text>
        </g>
        <use href="#z-mono" className="seal-z" x="83" y="79" width="74" height="74" />
        <text className="seal-star" x="120" y="74" textAnchor="middle">✦</text>
        <text className="seal-sub" x="120" y="175" textAnchor="middle">BARRIO ITALIA</text>
      </svg>

      <p className="eyebrow">Libros · Antigüedades · Coleccionables</p>
      <h1 className="hero-title">Un laberinto de libros,<br /><em>objetos y memorias</em></h1>
      <p className="hero-lead">Desde un departamento donde había que tocar el timbre, hasta una esquina de Barrio Italia donde cada estante guarda una historia.</p>
      <div className="hero-cta">
        <a className="btn btn-solid" href="#visitanos">Visítanos</a>
        <a className="btn btn-ghost" href={WA_PIEZA} target="_blank" rel="noopener">Escríbenos</a>
      </div>
      <a className="scroll-hint" href="#la-casa" aria-label="Seguir leyendo">❦</a>
    </section>
  )
}

export function LaCasa() {
  return (
    <section className="section" id="la-casa">
      <SectionHead numeral="I" title="La Casa" />
      <div className="columns reveal">
        <p className="lead">Casa Zar comenzó como un secreto bien guardado: un departamento en Apoquindo, repleto de estantes, cajas y libros, al que solo se llegaba tocando el timbre. Quien entraba encontraba un mundo aparte, ordenado por la memoria prodigiosa de su librero, historiador de formación.</p>
        <p>Con los años la casa creció y se mudó a la esquina de Condell con Mujica, en Barrio Italia. Hoy es un laberinto de pasillos donde conviven primeras ediciones, revistas de otra época, mapas, postales, objetos de bronce y pequeñas rarezas que esperan a su próximo dueño.</p>
        <p>Aquí no se viene solo a comprar: se viene a perderse un rato, conversar, preguntar por ese libro que nadie más tiene y salir con algo que no se sabía que se buscaba.</p>
      </div>
      <blockquote className="quote reveal">
        <p>«Una especie de laberinto con libros y antigüedades.»</p>
        <cite>— Así la describió la prensa</cite>
      </blockquote>
    </section>
  )
}

export function QueEncontraras() {
  return (
    <section className="section section-alt" id="que-encontraras">
      <SectionHead numeral="II" title="Qué encontrarás" />
      <div className="pillars">
        <article className="pillar reveal">
          <svg className="icon" viewBox="0 0 48 48" aria-hidden="true"><path d="M6 10c6-2 12-2 18 2 6-4 12-4 18-2v28c-6-2-12-2-18 2-6-4-12-4-18-2z M24 12v28" /></svg>
          <h3>Libros</h3>
          <p>Literatura, historia, ciencias, infantiles y revistas. Primeras ediciones, tomos empastados y títulos agotados hace décadas.</p>
        </article>
        <article className="pillar reveal">
          <svg className="icon" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="26" r="13" /><path d="M24 17v9l6 4 M20 9h8 M24 9v4 M14 39l-3 4 M34 39l3 4" /></svg>
          <h3>Antigüedades</h3>
          <p>Relojes, bronces, vajilla, cámaras, máquinas de escribir y objetos con pátina que cuentan cómo se vivía antes.</p>
        </article>
        <article className="pillar reveal">
          <svg className="icon" viewBox="0 0 48 48" aria-hidden="true"><rect x="8" y="10" width="26" height="18" rx="1" /><path d="M14 34h26V16 M12 15l9 7 9-7" /><circle cx="36" cy="38" r="5" /><path d="M36 35.5v5 M33.5 38h5" /></svg>
          <h3>Coleccionables</h3>
          <p>Postales, sellos, monedas, afiches, discos y curiosidades para quienes saben que el detalle lo es todo.</p>
        </article>
      </div>
    </section>
  )
}

export function Servicios() {
  const items = [
    ['Venta', 'Libros, antigüedades y coleccionables seleccionados pieza a pieza.'],
    ['Compra', 'Tasamos bibliotecas completas, colecciones y objetos. Vamos a domicilio.'],
    ['Intercambio', 'Trae lo que ya leíste y llévate algo nuevo. Bueno, nuevo para ti.'],
    ['Consignación', 'Exhibimos y vendemos tus piezas en la tienda y en nuestras redes.'],
  ]
  return (
    <section className="section section-alt" id="servicios">
      <SectionHead numeral="IV" title="Compra, venta, intercambio y consignación" />
      <ol className="services reveal">
        {items.map(([t, d]) => (
          <li key={t}><span className="svc-mark">✦</span><div><h3>{t}</h3><p>{d}</p></div></li>
        ))}
      </ol>
    </section>
  )
}

export function Envios() {
  return (
    <section className="section" id="envios">
      <SectionHead numeral="V" title="Envíos y pagos" />
      <div className="ship reveal">
        <div className="ship-card">
          <p className="ship-label">Envíos</p>
          <h3>A todo Chile y al extranjero</h3>
          <p>Embalamos cada pieza con el cuidado que merece: papel, cartón y paciencia.</p>
        </div>
        <div className="ship-card">
          <p className="ship-label">Pagos</p>
          <h3>Transferencia, efectivo y tarjetas</h3>
          <p>Reserva tu pieza por mensaje y coordina el pago antes del envío.</p>
        </div>
      </div>
    </section>
  )
}

export function Visitanos() {
  return (
    <section className="section section-dark" id="visitanos">
      <SectionHead numeral="VI" title="Visítanos" />
      <div className="visit reveal">
        <div className="visit-info">
          <p className="visit-label">Dirección</p>
          <p className="visit-big">Condell 1653</p>
          <p>Esquina Mujica · Barrio Italia, Ñuñoa · Santiago</p>

          <p className="visit-label">Horario</p>
          <dl className="hours">
            <dt>Lunes a viernes</dt><dd>11:00 – 20:00</dd>
            <dt>Sábado</dt><dd>14:00 – 20:00</dd>
            <dt>Domingo</dt><dd>Cerrado</dd>
          </dl>

          <a className="bookmark" href={WA_PIEZA} target="_blank" rel="noopener">
            Escríbenos por WhatsApp <span aria-hidden="true">→</span>
          </a>
        </div>

        <a className="plan" href={MAPS} target="_blank" rel="noopener" aria-label="Abrir ubicación en Google Maps">
          <svg viewBox="0 0 200 200" aria-hidden="true" className="compass">
            <circle cx="100" cy="100" r="88" />
            <circle cx="100" cy="100" r="80" strokeDasharray="1 4" />
            <path className="compass-needle" d="M100 28 L110 100 L100 172 L90 100Z" />
            <path d="M28 100 L100 92 L172 100 L100 108Z" className="compass-cross" />
            <text x="100" y="20" textAnchor="middle">N</text>
          </svg>
          <span className="plan-label">Abrir en el mapa</span>
        </a>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <svg className="footer-mark" aria-hidden="true"><use href="#z-mono" /></svg>
      <p className="footer-name">Casa Zar</p>
      <p className="footer-tag">Libros · Antigüedades · Coleccionables</p>
      <nav className="footer-links" aria-label="Redes">
        <a href={INSTAGRAM} target="_blank" rel="noopener">Instagram</a>
        <a href={FACEBOOK} target="_blank" rel="noopener">Facebook</a>
        <a href={waLink()} target="_blank" rel="noopener">WhatsApp</a>
      </nav>
      <p className="colophon">Compuesto en Cormorant y EB Garamond, impreso en pantalla en Barrio Italia.</p>
    </footer>
  )
}
