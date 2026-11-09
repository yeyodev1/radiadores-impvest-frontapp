// Todo el copy y los datos fijos del negocio viven acá, no dentro de los componentes.
import type { Category, Segment } from '@/types'

export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://www.radiadoresimpvest.com').replace(/\/+$/, '')

export const BUSINESS = {
  name: 'Radiadores Impvest',
  tagline: 'Radiadores y Repuestos Automotrices',
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
  mission:
    'En Impvest ofrecemos autopartes de alta calidad, con amplio stock inmediato y confianza garantizada para tu vehículo o camión.',
  vision:
    'Ser la empresa #1 en Ecuador en comercializar autopartes, destacando por variedad, calidad, innovación y un servicio que marca la diferencia.',
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
  phone: string
  phoneIntl: string
}

export const BRANCHES: Branch[] = [
  { id: 'quito-norte', city: 'Quito', name: 'Quito Norte', address: 'Cap. Edmundo Chiriboga N47-346 y Gonzalo Salazar', phone: '099 642 9833', phoneIntl: '+593996429833' },
  { id: 'quito-sur', city: 'Quito', name: 'Quito Sur', address: 'S35B Oe7-87 y Hugo Díaz Romero OE7C', phone: '099 010 2495', phoneIntl: '+593990102495' },
  { id: 'valle-chillos', city: 'Sangolquí', name: 'Valle de los Chillos', address: 'Venezuela y Casimiro Nieto', phone: '098 573 8028', phoneIntl: '+593985738028' },
  { id: 'ambato', city: 'Ambato', name: 'Ambato', address: 'Av. Julio Jaramillo y Julio César Cañar', phone: '099 285 2108', phoneIntl: '+593992852108' },
  { id: 'guayaquil', city: 'Guayaquil', name: 'Guayaquil', address: 'Pedro Pablo Gómez 1333 y Carchi (esquina)', phone: '098 510 4594', phoneIntl: '+593985104594' },
]

export const SEGMENTS: { id: Segment | 'todos'; label: string }[] = [
  { id: 'todos', label: 'Todo' },
  { id: 'autos', label: 'Autos y SUV' },
  { id: 'vans-buses', label: 'Vans y buses' },
  { id: 'camiones', label: 'Camiones' },
  { id: 'maquinaria', label: 'Maquinaria' },
]

export const CATEGORIES: { id: Category; label: string; icon: string }[] = [
  { id: 'radiador', label: 'Radiadores', icon: 'fa-table-cells' },
  { id: 'intercooler', label: 'Intercoolers', icon: 'fa-wind' },
  { id: 'tanque', label: 'Tanques de radiador', icon: 'fa-box' },
  { id: 'herramienta', label: 'Herramientas', icon: 'fa-screwdriver-wrench' },
  { id: 'accesorio', label: 'Accesorios para radiadores', icon: 'fa-puzzle-piece' },
  { id: 'condensador', label: 'Condensadores', icon: 'fa-snowflake' },
  { id: 'enfriador-aceite', label: 'Enfriadores de aceite', icon: 'fa-oil-can' },
  { id: 'termostato', label: 'Termostatos', icon: 'fa-temperature-half' },
  { id: 'refrigerante', label: 'Refrigerantes', icon: 'fa-droplet' },
  { id: 'inyeccion', label: 'Insumos de inyección electrónica', icon: 'fa-microchip' },
  { id: 'calefaccion', label: 'Radiadores de calefacción', icon: 'fa-fire' },
]

export const categoryLabel = (id: string) => CATEGORIES.find((c) => c.id === id)?.label ?? id

// Sección "Productos" del inicio: 7 líneas, cada una abre la tienda filtrada.
export const PRODUCT_LINES: { category: Category; title: string; text: string; img: string }[] = [
  { category: 'radiador', title: 'Radiadores', text: 'Autos, SUV, vans, buses, camiones y maquinaria pesada.', img: '/products/RD-KW-008-sm.webp' },
  { category: 'intercooler', title: 'Intercoolers', text: 'Para motores turbo diésel y gasolina.', img: '/img/scenes/copper.webp' },
  { category: 'tanque', title: 'Tanques de radiador', text: 'Originales de alta resistencia. Nuestra especialidad desde 1994.', img: '/img/hero/tank-right.webp' },
  { category: 'accesorio', title: 'Accesorios y herramientas', text: 'Tapas, conexiones y todo para el taller.', img: '/img/scenes/exploded.webp' },
  { category: 'refrigerante', title: 'Refrigerantes', text: 'Líquidos para proteger tu motor todo el año.', img: '/img/scenes/fins.webp' },
  { category: 'inyeccion', title: 'Insumos de inyección electrónica', text: 'Limpieza y mantenimiento de inyectores.', img: '/img/scenes/assembled.webp' },
  { category: 'calefaccion', title: 'Calefacción', text: 'Radiadores de calefacción para cabina.', img: '/img/hero/radiator-full.webp' },
]

export const PROMISES = [
  'Entrega hoy o hasta 24 horas',
  'Más de 1000 radiadores e intercoolers para autos, camiones y maquinaria',
  'Garantía de fábrica',
  'Envíos seguros a cada rincón de Ecuador',
  'Soporte 24/7 en tus compras seguras',
  'Venta por mayor y menor',
]

export const HERO = {
  kicker: 'Importación directa desde 1994',
  hint: 'Desliza y lo abrimos para ti',
  // Lo que se lee cuando el radiador se abre (pedido del cliente).
  callouts: ['Tanques de radiador originales de alta resistencia', 'Panales reforzados y espesor grueso', 'Calidad única en el mercado'],
  close: { kicker: 'Un universo de radiadores', title: 'Más de 1000 modelos listos para salir hoy.' },
  stats: [
    { label: 'Modelos', value: '+1000' },
    { label: 'Sucursales', value: '5' },
    { label: 'Entrega máx.', value: '24 h' },
    { label: 'Desde', value: '1994' },
  ],
}

export const SHOP = {
  title: 'Elige tu repuesto 100% compatible',
  subtitle: 'El catálogo más amplio en sistemas de enfriamiento en Ecuador',
}

export const WHY_US = {
  // Video corto de clientes: cuando el cliente lo mande, ponerlo en public/video/ y escribir la ruta aquí.
  video: '',
  poster: '/img/scenes/sucursales.webp',
  points: [
    { icon: 'fa-medal', text: 'Somos expertos en radiadores: más de 30 años con una amplia trayectoria en el mundo automotriz.' },
    { icon: 'fa-boxes-stacked', text: 'Amplia variedad de productos de todas las marcas.' },
    { icon: 'fa-circle-check', text: 'Calidad 100% aprobada en todos nuestros productos importados.' },
    { icon: 'fa-truck-fast', text: 'Compras 100% seguras con envíos a todos los rincones de nuestro país.' },
  ],
}

// Reseñas reales de Google (una por sucursal). Pendientes de que el cliente las mande; vacío = la sección no las muestra.
export const REVIEWS: { author: string; branch: string; stars: number; text: string }[] = []

export const NAV = [
  { href: '/', label: 'Inicio' },
  { href: '/#nosotros', label: 'Nosotros' },
  { href: '/#productos', label: 'Productos' },
  { href: '/#tienda', label: 'Tienda' },
  { href: '/#sucursales', label: 'Sucursales' },
  { href: '/#ofertas', label: 'Ofertas por temporada' },
  { href: '/#por-que-nosotros', label: 'Por qué trabajar con nosotros' },
]

export const whatsappUrl = (message: string) =>
  `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`

export const mapsUrl = (branch: Branch) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `Radiadores Impvest ${branch.address}, ${branch.city}, Ecuador`,
  )}`
