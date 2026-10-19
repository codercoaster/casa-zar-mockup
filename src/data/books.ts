// Fictional placeholder books for the shelf.
export type CoverStyle = 'cloth' | 'paperback' | 'academic' | 'marbled'

export type Book = {
  title: string[]
  author: string
  meta: string
  style: CoverStyle
  bg: string
  ink: string
  accent: string
}

const OX = '#6B1E23', LIB = '#2F3B2F', INK = '#1F1A17', BROWN = '#3B2A20', NAVY = '#24303F'
const GOLD = '#C9A46A', PAPER = '#F3EAD8', DEEP = '#E6D8BC', SEPIA = '#8A6A44'

export const books: Book[] = [
  { title: ['El último', 'tranvía'], author: 'Inés Valdebenito', meta: 'Novela · Santiago, 1952', style: 'cloth', bg: OX, ink: GOLD, accent: GOLD },
  { title: ['Cartografía', 'del silencio'], author: 'Tomás Arrieta', meta: 'Ensayo · Primera edición', style: 'paperback', bg: PAPER, ink: INK, accent: OX },
  { title: ['Guerra y', 'memoria', 'del sur'], author: 'Álvaro Medina', meta: 'Historia de Chile · 1987', style: 'academic', bg: SEPIA, ink: PAPER, accent: INK },
  { title: ['Marea', 'negra'], author: 'J. L. Fuenzalida', meta: 'Misterio · Colección de bolsillo', style: 'marbled', bg: LIB, ink: GOLD, accent: '#4F5F4A' },
  { title: ['Obras', 'completas', 'II'], author: 'Teresa de Arauco', meta: 'Tomo empastado · c. 1940', style: 'cloth', bg: NAVY, ink: GOLD, accent: GOLD },
  { title: ['Los trenes', 'del norte'], author: 'Hernán Rivas', meta: 'Autores chilenos · 1979', style: 'paperback', bg: DEEP, ink: OX, accent: LIB },
  { title: ['Valparaíso', 'en grabados'], author: 'Colección Puerto', meta: 'Láminas · c. 1910', style: 'academic', bg: '#5B6B55', ink: PAPER, accent: BROWN },
  { title: ['Fe', 'mágica'], author: 'R. R. Benavente', meta: 'Esoterismo · 1991', style: 'marbled', bg: INK, ink: GOLD, accent: '#3A2F28' },
  { title: ['Poemas', 'de la', 'cordillera'], author: 'Amalia Rojo', meta: 'Poesía · Edición numerada', style: 'cloth', bg: LIB, ink: GOLD, accent: GOLD },
  { title: ['Mensajes', 'de los sabios'], author: 'Bruno Vial', meta: 'Espiritualidad · 1994', style: 'paperback', bg: PAPER, ink: BROWN, accent: GOLD },
  { title: ['Crónicas', 'de la', 'Colonia'], author: 'Ediciones del Valle', meta: 'Historia · 1966', style: 'academic', bg: '#9A5A3C', ink: PAPER, accent: INK },
  { title: ['El caso', 'Condell'], author: 'Marta Ilabaca', meta: 'Novela negra · 1983', style: 'marbled', bg: OX, ink: PAPER, accent: '#4A1418' },
  { title: ['Diccionario', 'de botánica'], author: 'C. Gaete', meta: 'Antigüedades · c. 1890', style: 'cloth', bg: BROWN, ink: GOLD, accent: GOLD },
  { title: ['Canción', 'del agua'], author: 'Rosa Letelier', meta: 'Autores chilenos · 1971', style: 'paperback', bg: '#EFE6D2', ink: NAVY, accent: OX },
  { title: ['Atlas', 'antiguo', 'de Chile'], author: 'Instituto Geográfico', meta: 'Coleccionable · c. 1940', style: 'academic', bg: '#4B5A63', ink: PAPER, accent: INK },
  { title: ['Noche en', 'Barrio', 'Italia'], author: 'Pablo Zárate', meta: 'Novela · 2004', style: 'marbled', bg: NAVY, ink: GOLD, accent: '#33405A' },
  { title: ['Memorias', 'de un', 'viajero'], author: 'Jorge Hurtado', meta: 'Biografías · 1948', style: 'cloth', bg: '#4A2A22', ink: GOLD, accent: GOLD },
  { title: ['La contadora', 'de historias'], author: 'Eva Montecinos', meta: 'Autores chilenos · 1999', style: 'paperback', bg: PAPER, ink: OX, accent: GOLD },
  { title: ['Tratado de', 'música', 'popular'], author: 'Archivo Andino', meta: 'Música · 1958', style: 'academic', bg: '#7D3B33', ink: PAPER, accent: INK },
  { title: ['Rayo', 'azul'], author: 'Colección Bolsillo', meta: 'Ciencia ficción · 1969', style: 'marbled', bg: '#1E3A3A', ink: GOLD, accent: '#2C4C4A' },
  { title: ['Fábulas', 'ilustradas'], author: 'Esopo', meta: 'Infantil antiguo · c. 1920', style: 'cloth', bg: SEPIA, ink: PAPER, accent: PAPER },
]
