export interface RoomContent {
  id: string;
  navLabel: string;
  stopNumber: string;
  hudTag: string;
  hudTitle: string;
  hudCaption: string;
  buttonText: string;
}

export const HUD_STOPS: RoomContent[] = [
  {
    id: "historia",
    navLabel: "Historia",
    stopNumber: "01 / 04",
    hudTag: "SANTA MARÍA QUIEGOLANI, OAXACA",
    hudTitle: "Palenque Quiegolani: El origen de nuestro mezcal",
    hudCaption: "Zona Chontal Alta y Zapoteca de la Sierra Sur de Oaxaca. Maestro Mezcalero Don Enrique.",
    buttonText: "Entrar a Nuestra Historia",
  },
  {
    id: "procesos-horno",
    navLabel: "Procesos",
    stopNumber: "02 / 04",
    hudTag: "SELECCIÓN, CORTE Y COCCIÓN",
    hudTitle: "Horno cónico de tierra y piedra de río",
    hudCaption: "Magueyes maduros de 7 a 25 años cocidos con leña bajo tierra de 3 a 4 días (96 horas).",
    buttonText: "Ver los 6 Procesos Artesanales",
  },
  {
    id: "servicios",
    navLabel: "Servicios",
    stopNumber: "03 / 04",
    hudTag: "ALAMBIQUE DE COBRE Y COMERCIALIZADORA",
    hudTitle: "Productores de Maguey, Mezcal, Envasadores y Comercializadores",
    hudCaption: "Molienda en molino de piedra, fermentación en tinas de roble y doble destilación en cobre.",
    buttonText: "Ver Servicios y Palenques",
  },
  {
    id: "lineas",
    navLabel: "Línea 1 y 2",
    stopNumber: "04 / 04",
    hudTag: "LA RIQUEZA DE NUESTRA TIERRA",
    hudTitle: "Nuestros Mezcales: Línea 1 (45°) y Línea 2 (40°)",
    hudCaption: "Espadín Joven, Reposado, Añejo, Abocado con Gusano, Tobalá y Tepeztate.",
    buttonText: "Entrar al Catálogo de Botellas",
  },
];

export const HISTORIA_LITERAL = {
  corporativo: "Corporativo Casa el Huésped S.P.R. DE R.L.",
  historia:
    "Corporativo Casa el Huésped S.P.R. DE R.L. surge con la inquietud y la idea de rescatar y dar a conocer el mezcal ancestral y artesanal producido en la zona Chontal Alta y Zapoteca de la sierra sur del estado de Oaxaca, en específico de la localidad de Santa María Quiegolani. Somos un corporativo con experiencia en la elaboración de mezcal artesanal, una realidad que se construye día a día tomando en cuenta las necesidades y los gustos de la gente, ofrecemos un mezcal lleno de historia, cultura y respeto a la naturaleza.",
  vision:
    "Ser una empresa competitiva y reconocida en la producción y venta de mezcal artesanal, comprometidos a cumplir las exigencias de nuestros clientes y consumidores, alcanzando los más altos estándares de calidad y consolidándonos en el mercado nacional e internacional.",
  mision:
    "Somos una empresa dedicada al cultivo, producción, envasado y comercialización de mezcal artesanal, buscamos deleitar a nuestros clientes y consumidores, elaborando un producto a través de un proceso artesanal utilizando las mejores materias primas que garanticen la calidad y nuestro compromiso con el medio ambiente.",
  filosofia:
    "El compromiso con el cliente, el consumidor y el medio ambiente así como el trabajo en equipo es nuestra prioridad.",
  maestro: 'Nuestro Maestro Mezcalero "Don Enrique"',
  palenques: [
    "Palenque Quiegolani Matriz - Río Pescado",
    "Palenque Quiegolani - Río Vara",
  ],
};

export const PROCESOS_LITERALES = [
  {
    paso: "01",
    nombre: "Selección",
    texto:
      "Se escogen únicamente magueyes maduros con mayor riqueza en azúcares para un mejor sabor y aroma del mezcal, la edad promedio de corte es de 7 años.",
  },
  {
    paso: "02",
    nombre: "Corte",
    texto:
      "Nuestro personal tiene el mayor cuidado para realizar esta actividad tomando en cuenta el corte al ras de la piña y cuidando la limpieza de la misma.",
  },
  {
    paso: "03",
    nombre: "Cocción",
    texto:
      "El cocimiento se hace en un horno artesanal forrado de piedra en forma cónica bajo tierra, se calienta con leña y piedra de río y es tapado con tierra, este periodo lleva de 3 a 4 días (96 horas) promedio.",
  },
  {
    paso: "04",
    nombre: "Molienda",
    texto:
      "Se realiza en un molino de piedra que a su vez es jalado por un mular, el maguey se acomoda alrededor del molino y se empieza a machacar, el producto resultante se le conoce como bagazo.",
  },
  {
    paso: "05",
    nombre: "Fermentación",
    texto:
      "La fermentación del maguey molido (bagazo) se realiza en tinas de maderas de roble, donde se hace una mezcla homogénea entre los líquidos y el mosto (bagazo), el tiempo de duración depende de la temperatura ambiente.",
  },
  {
    paso: "06",
    nombre: "Destilación",
    texto:
      "Se realiza en alambiques de cobre calentados a fuego directo, una vez llenados estos se tapan para que inicie el proceso de evaporización y condensación teniendo como resultado el mezcal ordinario y posteriormente se realiza la segunda destilación.",
  },
];

export const SERVICIOS_LITERALES = [
  "Venta de Maguey Sazón",
  "Venta de Hijuelos de Maguey",
  "Venta de mezcal",
  "Envasadores (Maquila)",
  "Comercializadores",
  "Desarrollo de marcas",
];

export const MEZCALES_CATA = [
  {
    nombre: "Joven Espadín",
    maguey: "Espadín (Angustifolia haw) — 7 Años",
    riqueza: "45° % Alc. Vol. (Línea 1) / 40° % Alc. Vol. (Línea 2)",
    color: "Cristalino Transparente",
    aroma: "Fuerte",
    sabor: "Intenso con sabores dulces a maguey",
    notas: "Húmedas y Frescas",
    imagen: "/images/brand/recurso-001.png",
  },
  {
    nombre: "Reposado Espadín",
    maguey: "Espadín (Angustifolia haw) — 7 Años",
    riqueza: "40° % Alc. Vol.",
    color: "Dorado suave",
    aroma: "Ligero",
    sabor: "Suave con toque a caramelo",
    notas: "Frescas a madera",
    imagen: "/images/brand/recurso-004.png",
  },
  {
    nombre: "Espadín Añejo",
    maguey: "Espadín (Angustifolia haw) — 7 Años",
    riqueza: "40° % Alc. Vol.",
    color: "Café oscuro",
    aroma: "Ligero",
    sabor: "Suave con un toque a vainilla",
    notas: "Frescas a vainilla",
    imagen: "/images/brand/botella200-001.png",
  },
  {
    nombre: "Joven Abocado con Gusano",
    maguey: "Espadín (Angustifolia haw) — 7 Años",
    riqueza: "40° % Alc. Vol.",
    color: "Ámbar cristalino",
    aroma: "Herbal y maguey cocido",
    sabor: "Intenso tradicional con gusano de maguey",
    notas: "Tierra húmeda y humo suave",
    imagen: "/images/brand/recurso-001.png",
  },
  {
    nombre: "Joven Tobalá",
    maguey: "Tobalá Silvestre (Potatorum) — 10 Años",
    riqueza: "45° % Alc. Vol. / 40° % Alc. Vol.",
    color: "Cristalino Transparente",
    aroma: "Floral y silvestre",
    sabor: "Alta concentración de azúcares, riqueza en sabor y aroma",
    notas: "Silvestres de altura",
    imagen: "/images/brand/botella200-001.png",
  },
  {
    nombre: "Mezcal Tepeztate",
    maguey: "Tepeztate Silvestre (Agave Marmorata) — 15 a 25 Años",
    riqueza: "45° % Alc. Vol.",
    color: "Cristalino Transparente",
    aroma: "Aroma y sabor único",
    sabor: "Maguey silvestre de peñasco con máxima riqueza en azúcares",
    notas: "Minerales y herbales intensas",
    imagen: "/images/brand/recurso-004.png",
  },
];

export const LINEAS_PRESENTACIONES = [
  {
    titulo: "Línea 1 — 45º % Alc. Vol.",
    presentaciones: [
      "750 ml: Joven Espadín, Reposado Espadín, Añejo Espadín, Joven Abocado con Gusano, Joven Tobalá, Tepeztate",
      "200 ml y 50 ml: Presentaciones artesanales de degustación",
    ],
    fichaUrl: "https://elhuesped.com.mx/",
  },
  {
    titulo: "Línea 2 — 40º % Alc. Vol. (750 ml)",
    presentaciones: ["Joven Abocado con gusano", "Joven Espadín"],
    fichaUrl: "https://elhuesped.com.mx/fichas/linea2/linea2_750ml.pdf",
  },
  {
    titulo: "Línea 2 — 40º y 45º (200 ml)",
    presentaciones: [
      "Añejo espadín",
      "Joven abocado con gusano",
      "Joven espadín",
      "Reposado espadín",
      "Joven tobalá",
    ],
    fichaUrl: "https://elhuesped.com.mx/fichas/linea2/linea2_200ml.pdf",
  },
  {
    titulo: "Línea 2 — 40º (50 ml)",
    presentaciones: [
      "Añejo espadín",
      "Joven abocado con gusano",
      "Joven espadín",
      "Reposado espadín",
      "Joven tobalá",
    ],
    fichaUrl: "https://elhuesped.com.mx/fichas/linea2/linea2_50ml.pdf",
  },
];

export const PUNTOS_DE_VENTA = [
  {
    nombre: "Mezcalia",
    direccion: "Av. Sonora 119, Roma Nte., 06700 Ciudad de México, CDMX — Tel: 01 55 5286 7292",
  },
  {
    nombre: "Restaurante Bar Azelin",
    direccion: "Calle Emilio Carranza 1503, Col. Reforma, Oaxaca de Juárez, Oaxaca",
  },
  {
    nombre: "Hotel María Condesa Mezcalería",
    direccion: "Atlixco 132, Col. Condesa, CDMX",
  },
  {
    nombre: "Cantina La Manifestación",
    direccion: "Av. De la República 135, Col. Tabacalera, CDMX",
  },
  {
    nombre: "Restaurante Guría Polanco",
    direccion: "Av. Homero 1500, Col. Polanco II, CDMX",
  },
  {
    nombre: "Club de Golf Los Encinos",
    direccion: "Km. 44.5 Carretera libre México - Toluca, EDOMEX",
  },
  {
    nombre: "Cantina La Posada del Sancho",
    direccion: "Av. Ejército Nacional 364, Col. Polanco, CDMX",
  },
  {
    nombre: "Hotel J Towers",
    direccion: "Calle Texas 17, Col. Nápoles, CDMX",
  },
  {
    nombre: "Cantina La Reata de Oro",
    direccion: "Av. Patriotismo 272, San Pedro de los Pinos, CDMX",
  },
  {
    nombre: "Mondo Mezcaleros",
    direccion: "Contacto: jayala@mondomezcaleros.com / jvallecillo@montomezcaleros.com",
  },
  {
    nombre: "Mercado del Mezcal",
    direccion: "Calle Miguel Hidalgo 1811-C, Centro, Oaxaca de Juárez, Oaxaca",
  },
  {
    nombre: "Linaje y Lumbre (Cocina de Humo)",
    direccion: "Ocotlán de Morelos, Oaxaca",
  },
];
