// Todo el copy y los datos fijos del negocio viven acá, no dentro de los componentes.
import type { Segment } from '@/types'

export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://www.radiadoresimpvest.com').replace(/\/+$/, '')

export const BUSINESS = {
  name: 'Radiadores Impvest',
  since: 1994,
  phoneDisplay: '099 873 8671',
  phoneAlt: '098 793 5938',
  phoneAltIntl: '+593987935938',
  phoneIntl: '+593998738671',
  whatsapp: '593998738671',
  email: 'impvest@hotmail.com',
  instagram: 'https://www.instagram.com/radiadores_impvest/',
  facebook: 'https://www.facebook.com/impvestradiadores/',
  tiktok: 'https://www.tiktok.com/@radiadores_impvest',
  claim: 'Más que radiadores, somos el impulso que mantiene a Ecuador en movimiento.',
  hours: [
    { days: 'Lunes a viernes', time: '8:30 a 17:30' },
    { days: 'Sábado', time: '8:30 a 12:30' },
    { days: 'Domingo', time: 'Cerrado' },
  ],
}

export interface Branch {
  id: string
  city: string
  name: string
  address: string
}

export const BRANCHES: Branch[] = [
  { id: 'quito-norte', city: 'Quito', name: 'Quito Norte', address: 'Cap. Edmundo Chiriboga N47-346 y Gonzalo Salazar' },
  { id: 'quito-sur', city: 'Quito', name: 'Quito Sur', address: 'S35B Oe7-87 y Hugo Díaz Romero OE7C' },
  { id: 'valle-chillos', city: 'Sangolquí', name: 'Valle de los Chillos', address: 'Venezuela y Casimiro Nieto' },
  { id: 'ambato', city: 'Ambato', name: 'Ambato', address: 'Av. Julio Jaramillo y Julio César Cañar' },
  { id: 'guayaquil', city: 'Guayaquil', name: 'Guayaquil', address: 'Pedro Pablo Gómez 1333 y Carchi (esquina)' },
]

export const SEGMENTS: { id: Segment | 'todos'; label: string }[] = [
  { id: 'todos', label: 'Todo' },
  { id: 'autos', label: 'Autos y SUV' },
  { id: 'vans-buses', label: 'Vans y buses' },
  { id: 'camiones', label: 'Camiones' },
  { id: 'maquinaria', label: 'Maquinaria' },
]

export const CATEGORIES = [
  { id: 'radiador', label: 'Radiador' },
  { id: 'intercooler', label: 'Intercooler' },
  { id: 'parte', label: 'Parte de radiador' },
  { id: 'accesorio', label: 'Accesorio' },
] as const

export const PROMISES = [
  'Entrega el mismo día o máximo 24 horas',
  '+1000 radiadores para autos, camiones y maquinaria',
  'Garantía de fábrica bajo normas internacionales',
  'Envíos a cada rincón del Ecuador',
  'Soporte 24/7 para tus compras',
  'Al por mayor y menor',
]

export const VALUES = [
  { icon: 'fa-bolt', title: 'Mismo día o 24 h', text: 'La rapidez es parte de nuestro ADN.' },
  { icon: 'fa-shield-halved', title: 'Garantía de fábrica', text: 'Normas internacionales, respaldo real.' },
  { icon: 'fa-headset', title: 'Soporte 24/7', text: 'Para tus requerimientos y compras.' },
  { icon: 'fa-lock', title: 'Compra 100% segura', text: 'Tu pedido queda registrado con código.' },
  { icon: 'fa-truck-fast', title: 'Entrega en tu puerta', text: 'Envíos a cada rincón del país.' },
]

export const HERO = {
  kicker: 'Importación directa desde 1994',
  title: ['Ecuador no', 'se detiene.', 'Tu motor tampoco.'],
  body: 'Radiadores, intercoolers y partes para autos, camiones y maquinaria. Entrega el mismo día o máximo en 24 horas.',
  beats: [
    { kicker: 'Por dentro', title: 'Ingeniería que inspira confianza.', body: 'Garantía de fábrica sólida bajo normas internacionales. Mira lo que instalas antes de comprarlo.' },
    { kicker: 'Así trabaja un radiador', title: 'El calor entra. El frío sale.', body: 'El refrigerante cruza el núcleo y vuelve a su temperatura. Nosotros hacemos lo mismo con tu urgencia.' },
  ],
  close: { kicker: 'Un universo de radiadores', title: 'Más de 1000 modelos listos para salir hoy.' },
  stats: [
    { label: 'Modelos', value: '+1000' },
    { label: 'Sucursales', value: '5' },
    { label: 'Entrega máx.', value: '24 h' },
    { label: 'Desde', value: '1994' },
  ],
  callouts: ['Tanque lateral de alta resistencia', 'Núcleo de aluminio con aletas', 'Tapas y conexiones selladas'],
}

export const NAV = [
  { href: '/#catalogo', label: 'Catálogo' },
  { href: '/#destacados', label: 'Destacados' },
  { href: '/#sucursales', label: 'Sucursales' },
  { href: '/#nosotros', label: 'Nosotros' },
]

export const whatsappUrl = (message: string) =>
  `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`

export const mapsUrl = (branch: Branch) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `Radiadores Impvest ${branch.address}, ${branch.city}, Ecuador`,
  )}`
