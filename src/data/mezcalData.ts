export interface StoryBeat {
  id: string;
  clipIndex: number; // 1, 2, or 3
  timeRange: [number, number]; // Porcentaje del recorrido total (0 a 1)
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  drawerTitle: string;
  drawerDetails: { label: string; value: string }[];
  ctaText: string;
  ctaTarget: string;
}

export const STORY_BEATS: StoryBeat[] = [
  {
    id: "origen",
    clipIndex: 1,
    timeRange: [0.0, 0.25],
    eyebrow: "SANTA MARÍA QUIEGOLANI · SIERRA SUR, OAXACA",
    title: "El Origen: Donde el Agave Respira entre Nubes",
    subtitle: "Maestro Mezcalero Don Enrique · Zona Chontal Alta y Zapoteca",
    description:
      "Corporativo Casa El Huésped S.P.R. de R.L. rescata el mezcal ancestral y artesanal de Santa María Quiegolani. Seleccionamos únicamente magueyes maduros de 7 a 25 años con la mayor riqueza de azúcares y realizamos el corte al ras de la piña con limpieza absoluta.",
    tags: ["Etapa 1 · Selección (7–25 años)", "Etapa 2 · Corte al Ras", "Manantial Quiee Yelaag"],
    drawerTitle: "Historia, Filosofía y Palenques en Quiegolani",
    drawerDetails: [
      { label: "Maestro Mezcalero", value: "Don Enrique — Guardián de toda la cadena productiva Maguey-Mezcal." },
      { label: "Palenque Matriz", value: "Palenque Quiegolani Matriz — Río Pescado, Sierra Sur, Oaxaca." },
      { label: "Segundo Palenque", value: "Palenque Quiegolani — Río Vara, Sierra Sur, Oaxaca." },
      { label: "Misión", value: "Deleitar a nuestros clientes elaborando mezcal mediante proceso artesanal con las mejores materias primas y compromiso ambiental." },
      { label: "Visión", value: "Ser una empresa reconocida nacional e internacionalmente por cumplir los más altos estándares de calidad artesanal." },
      { label: "Filosofía", value: "Compromiso con el cliente, el consumidor, el medio ambiente y el trabajo en equipo." }
    ],
    ctaText: "Ver Historia y Filosofía Completa",
    ctaTarget: "drawer"
  },
  {
    id: "coccion",
    clipIndex: 1,
    timeRange: [0.25, 0.52],
    eyebrow: "ETAPA 3 · CORAZÓN DE FUEGO Y TIERRA",
    title: "96 Horas Bajo Tierra en Horno Cónico",
    subtitle: "Piedra de río al rojo vivo, leña de la sierra y tierra sellada",
    description:
      "Al cruzar el umbral del palenque, el cocimiento se realiza en un horno artesanal forrado de piedra en forma cónica bajo tierra. Se calienta con leña y piedra de río y es tapado con tierra durante 3 a 4 días (96 horas promedio) para caramelizar los azúcares del maguey.",
    tags: ["96 Horas de Cocción", "Horno Cónico Subterráneo", "Piedra de Río y Leña"],
    drawerTitle: "Del Fuego a la Molienda en Tahona",
    drawerDetails: [
      { label: "Etapa 3 · Cocción", value: "Horno cónico subterráneo forrado de piedra, calentado con leña y piedra de río durante 96 horas (3 a 4 días)." },
      { label: "Etapa 4 · Molienda", value: "Molino de piedra (tahona chilena) jalado por mular donde el maguey cocido se machaca hasta obtener el bagazo." },
      { label: "Perfil Sensorial", value: "El horneado lento bajo tierra imprime las notas ahumadas, dulces y terrosas características de Quiegolani." }
    ],
    ctaText: "Explorar Ficha del Horno y Tahona",
    ctaTarget: "drawer"
  },
  {
    id: "alambique",
    clipIndex: 2,
    timeRange: [0.52, 0.78],
    eyebrow: "ETAPAS 5 Y 6 · ALQUIMIA EN ROBLE Y COBRE",
    title: "Fermentación en Roble y Doble Destilación",
    subtitle: "Tinas de madera de roble y alambiques de cobre a fuego directo",
    description:
      "El bagazo reposa en tinas de madera de roble en mezcla homogénea con agua de manantial según la temperatura ambiente. Después pasa a alambiques de cobre calentados a fuego directo para obtener el mezcal ordinario y finalmente una segunda destilación de pureza cristalina.",
    tags: ["Tinas de Madera de Roble", "Alambique de Cobre", "Doble Destilación"],
    drawerTitle: "Servicios Integrales de Cadena Maguey-Mezcal (B2B)",
    drawerDetails: [
      { label: "1. Cultivo en Campo", value: "Venta de Maguey Sazón maduro y Venta de Hijuelos de Maguey." },
      { label: "2. Producción", value: "Venta de mezcal artesanal por litro o lote de nuestras variedades." },
      { label: "3. Maquila y Envasado", value: "Servicio de Envasadores (Maquila), Comercializadores y Desarrollo integral de marcas propias." }
    ],
    ctaText: "Ver Servicios de Maquila y B2B",
    ctaTarget: "drawer"
  },
  {
    id: "servido",
    clipIndex: 3,
    timeRange: [0.78, 1.0],
    eyebrow: "EL RITUAL DEL HUÉSPED · LÍNEA 1 (45°) Y LÍNEA 2 (40°)",
    title: "La Grandeza de un Buen Mezcal en tu Copa",
    subtitle: "Espadín Joven, Reposado, Añejo, Tobalá Silvestre y Ediciones Especiales",
    description:
      "Servido en jícara tradicional o copa de cristal sobre piedra volcánica. Descubre las etiquetas oficiales de Corporativo Casa El Huésped graduadas a 45° y 40° Alc. Vol., disponibles en presentaciones de 750 ml, 200 ml y 50 ml.",
    tags: ["Línea 1 · 45° Alc. Vol.", "Línea 2 · 40° Alc. Vol.", "750 ml · 200 ml · 50 ml"],
    drawerTitle: "Especificaciones de Envasado y Graduación",
    drawerDetails: [
      { label: "Línea 1 Clásica (750 ml)", value: "Joven Espadín (45°), Joven Tobalá (45°), Reposado Espadín (40°) y Espadín Añejo (40°)." },
      { label: "Línea 2 Suave (750 ml · 40°)", value: "Joven Espadín (40°) y Joven Abocado con Gusano (40°)." },
      { label: "Formatos 200 ml y 50 ml (40°)", value: "Añejo Espadín, Joven Abocado con Gusano, Joven Espadín, Reposado Espadín y Joven Tobalá." },
      { label: "Silvestres de Temporada", value: "Mezcal Tepeztate (hasta 25 años de maduración), Mezcal Cuish/Cirial y Mezcal Jabalí." }
    ],
    ctaText: "Ir al Catálogo de Botellas Abajo",
    ctaTarget: "#catalogo"
  }
];

export const BOTTLES_CATALOG = [
  {
    name: "Joven Espadín",
    line: "Línea 1 (45°) y Línea 2 (40°)",
    abv: "45° / 40° % Alc. Vol.",
    color: "Cristalino Transparente",
    aroma: "Fuerte y franco al agave cocido",
    flavor: "Intenso con sabores dulces a maguey",
    notes: "Húmedas y frescas de tierra mojada",
    sizes: "750 ml · 200 ml · 50 ml",
    accent: "#D4AF37"
  },
  {
    name: "Joven Tobalá Silvestre",
    line: "Línea 1 (45°) y Línea 2 (40°)",
    abv: "45° / 40° % Alc. Vol.",
    color: "Cristalino Transparente",
    aroma: "Fuerte, floral y herbáceo de montaña",
    flavor: "Intenso con sabores cítricos y dulces",
    notes: "Húmedas y frescas de alta sierra",
    sizes: "750 ml · 200 ml · 50 ml",
    accent: "#C87D32"
  },
  {
    name: "Reposado Espadín",
    line: "Línea 1 y Línea 2",
    abv: "40° % Alc. Vol.",
    color: "Amarillo Ámbar Brillante",
    aroma: "Ligero y cálido",
    flavor: "Suave con toque a caramelo",
    notes: "Frescas a madera de roble",
    sizes: "750 ml · 200 ml · 50 ml",
    accent: "#B87333"
  },
  {
    name: "Espadín Añejo",
    line: "Línea 1 y Línea 2",
    abv: "40° % Alc. Vol.",
    color: "Café Oscuro Profundo",
    aroma: "Ligero y elegante",
    flavor: "Suave con un toque a vainilla",
    notes: "Frescas a vainilla y roble tostado",
    sizes: "750 ml · 200 ml · 50 ml",
    accent: "#8B5A2B"
  },
  {
    name: "Joven Abocado con Gusano",
    line: "Línea 2 Tradicional",
    abv: "40° % Alc. Vol.",
    color: "Dorado pálido cristalino",
    aroma: "Fuerte con carácter tradicional oaxaqueño",
    flavor: "Equilibrado, sedoso y dulce al paladar",
    notes: "Agave horneado y notas salinas suaves",
    sizes: "750 ml · 200 ml · 50 ml",
    accent: "#C59B27"
  },
  {
    name: "Ediciones Silvestres: Tepeztate, Cuish y Jabalí",
    line: "Reserva del Maestro Don Enrique",
    abv: "45° % Alc. Vol.",
    color: "Cristalino con perlas persistentes",
    aroma: "Complejo, mineral y salvaje de barranca",
    flavor: "Explosión herbal y mineral de agaves silvestres",
    notes: "Lotes limitados de la Sierra Sur y Altos de Oaxaca",
    sizes: "Lotes Especiales 750 ml",
    accent: "#6E8B74"
  }
];

export const POINTS_OF_SALE = [
  { name: "Mezcalia", city: "CDMX · Roma Norte", address: "Av. Sonora 119, Roma Nte., 06700 Ciudad de México (Tel: 55 5286 7292)" },
  { name: "Hotel María Condesa Mezcalería", city: "CDMX · Condesa", address: "Atlixco 132, Col. Condesa, Ciudad de México" },
  { name: "Cantina La Manifestación", city: "CDMX · Tabacalera", address: "Av. de la República 135, Col. Tabacalera, Ciudad de México" },
  { name: "Restaurante Guría Polanco", city: "CDMX · Polanco", address: "Av. Homero 1500, Col. Polanco II, Ciudad de México" },
  { name: "Cantina La Posada del Sancho", city: "CDMX · Polanco", address: "Av. Ejército Nacional 364, Col. Polanco, Ciudad de México" },
  { name: "Hotel J Towers", city: "CDMX · Nápoles", address: "Calle Texas 17, Col. Nápoles, Ciudad de México" },
  { name: "Cantina La Reata de Oro", city: "CDMX · San Pedro de los Pinos", address: "Av. Patriotismo 272, San Pedro de los Pinos, Ciudad de México" },
  { name: "Club de Golf Los Encinos", city: "Estado de México · Lerma", address: "Km. 44.5 Carretera Libre México – Toluca, EDOMEX" },
  { name: "Restaurante Bar Azelin", city: "Oaxaca de Juárez · Reforma", address: "Calle Emilio Carranza 1503, Col. Reforma, Oaxaca de Juárez" },
  { name: "Mercado del Mezcal", city: "Oaxaca de Juárez · Centro", address: "Calle Miguel Hidalgo 1811-C, Centro, Oaxaca de Juárez" },
  { name: "Restaurante Linaje y Lumbre", city: "Ocotlán de Morelos, Oaxaca", address: "Cocina de humo tradicional (@linajeylumbre), Ocotlán de Morelos" },
  { name: "Chaneque Company & Mondo Mezcaleros", city: "Distribuidores Autorizados", address: "jayala@mondomezcaleros.com · jvallecillo@montomezcaleros.com · @elchaneque_co" }
];