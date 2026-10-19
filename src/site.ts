export const WHATSAPP = '56977489244'
export const INSTAGRAM = 'https://www.instagram.com/casa.zar/'
export const FACEBOOK = 'https://www.facebook.com/ZarBarrioItalia/'
export const MAPS = 'https://www.google.com/maps/search/?api=1&query=Condell+1653,+%C3%91u%C3%B1oa,+Santiago'

export const waLink = (text = 'Hola Casa Zar') =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`
