"use client";

import React, { useEffect, useRef, useState } from "react";
import { STORY_BEATS, BOTTLES_CATALOG, POINTS_OF_SALE, StoryBeat } from "@/data/mezcalData";
import { Flame, Compass, Sparkles, MapPin, Phone, Mail, X, ChevronRight, Award, Layers } from "lucide-react";

export default function ScrollWorldEngine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = [
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
  ];

  const [activeClip, setActiveClip] = useState<number>(0); // 0, 1, 2
  const [activeBeat, setActiveBeat] = useState<StoryBeat>(STORY_BEATS[0]);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [navVisible, setNavVisible] = useState<boolean>(true);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [blobsReady, setBlobsReady] = useState<boolean[]>([false, false, false]);

  const lastScrollY = useRef<number>(0);
  const isSeeking = useRef<boolean[]>([false, false, false]);

  // 1. Cargar los 3 videos en memoria como Blob (Regla Step 6 de Scroll World para seek instantáneo)
  useEffect(() => {
    const isMobile = window.innerWidth <= 860;
    const sources = [1, 2, 3].map((i) =>
      isMobile ? `/videos/scene-${i}-mobile.mp4` : `/videos/scene-${i}.mp4`
    );

    sources.forEach(async (src, idx) => {
      try {
        const res = await fetch(src);
        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        const vid = videoRefs[idx].current;
        if (vid) {
          vid.src = blobUrl;
          vid.load();
          setBlobsReady((prev) => {
            const copy = [...prev];
            copy[idx] = true;
            return copy;
          });
        }
      } catch (e) {
        console.error("Error cargando video blob:", src, e);
      }
    });
  }, []);

  // 2. Sincronizar el Scroll con los 3 clips encadenados + Smart Sticky Navbar
  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      const currentY = window.scrollY;
      // Barra inteligente: se esconde al bajar y reaparece al instante al subir
      if (currentY < 80) {
        setNavVisible(true);
      } else if (currentY > lastScrollY.current + 6) {
        setNavVisible(false);
      } else if (currentY < lastScrollY.current - 6) {
        setNavVisible(true);
      }
      lastScrollY.current = currentY;

      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      const rawProgress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);

      setScrollProgress(rawProgress);

      // Determinar cuál de las 4 paradas narrativas está activa
      const foundBeat =
        STORY_BEATS.find(
          (b) => rawProgress >= b.timeRange[0] && rawProgress <= b.timeRange[1]
        ) || STORY_BEATS[STORY_BEATS.length - 1];
      setActiveBeat(foundBeat);

      // Dividir el progreso total (0 a 1) entre tus 3 videos continuos:
      // Clip 0: 0.00 -> 0.34 | Clip 1: 0.34 -> 0.67 | Clip 2: 0.67 -> 1.00
      const segmentSize = 1 / 3;
      const clipIdx = Math.min(Math.floor(rawProgress / segmentSize), 2);
      const localProgress = Math.min(
        Math.max((rawProgress - clipIdx * segmentSize) / segmentSize, 0),
        1
      );

      setActiveClip(clipIdx);

      // Seek-Coalescing: solo actualiza currentTime si el decodificador no está ocupado
      const vid = videoRefs[clipIdx].current;
      if (vid && vid.duration && !isSeeking.current[clipIdx]) {
        const targetTime = localProgress * (vid.duration - 0.05);
        if (Math.abs(vid.currentTime - targetTime) > 0.03) {
          isSeeking.current[clipIdx] = true;
          vid.currentTime = targetTime;
        }
      }
    };

    const onScrollPassive = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScrollPassive, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScrollPassive);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="bg-[#0B0A09] text-[#F5F0E6] min-h-screen font-sans selection:bg-[#C87D32] selection:text-black">
      {/* BARRA DE NAVEGACIÓN INTELIGENTE (Se oculta al bajar, reaparece al subir) */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ${
          navVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 bg-[#141210]/80 backdrop-blur-md border border-[#C87D32]/30 px-4 py-2 rounded-full">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C87D32] animate-pulse" />
            <span className="font-serif tracking-[0.22em] text-sm sm:text-base font-semibold text-[#F5F0E6]">
              MEZCAL EL HUÉSPED
            </span>
            <span className="hidden md:inline-block text-xs text-[#C87D32] border-l border-[#C87D32]/30 pl-3">
              QUIEGOLANI, OAXACA
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-1 bg-[#141210]/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-xs tracking-wider uppercase">
            <a href="#recorrido" className="px-3 py-1.5 rounded-full hover:bg-[#C87D32]/20 transition">
              El Recorrido
            </a>
            <a href="#catalogo" className="px-3 py-1.5 rounded-full hover:bg-[#C87D32]/20 transition">
              Línea 1 y 2
            </a>
            <a href="#servicios" className="px-3 py-1.5 rounded-full hover:bg-[#C87D32]/20 transition">
              Maquila B2B
            </a>
            <a href="#ubicaciones" className="px-3 py-1.5 rounded-full hover:bg-[#C87D32]/20 transition">
              Puntos de Venta
            </a>
          </nav>

          <a
            href="#contacto"
            className="bg-[#C87D32] hover:bg-[#d98e43] text-[#0B0A09] font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-full tracking-wider uppercase transition shadow-lg shadow-[#C87D32]/20"
          >
            Cotizar / Contacto
          </a>
        </div>
      </header>

      {/* MOTOR DE VUELO DE CÁMARA CONTROLADO POR SCROLL (550vh de recorrido suave) */}
      <section id="recorrido" ref={containerRef} className="relative h-[550vh] w-full">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0B0A09]">
          {/* Los 3 clips encadenados con tus fotogramas exactos como posters */}
          {[0, 1, 2].map((idx) => (
            <video
              key={idx}
              ref={videoRefs[idx]}
              poster={`/images/frames/frame-${idx + 1}.webp`}
              muted
              playsInline
              preload="auto"
              onSeeked={() => {
                isSeeking.current[idx] = false;
              }}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${
                activeClip === idx ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            />
          ))}

          {/* Viñeta cinematográfica oscura para que los textos siempre sean 100% legibles */}
          <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#0B0A09] via-[#0B0A09]/35 to-black/50 pointer-events-none" />

          {/* Riel lateral derecho de progreso (Indica en qué etapa del palenque estás) */}
          <div className="fixed right-5 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-end gap-3">
            {STORY_BEATS.map((beat, i) => {
              const isCurrent = activeBeat.id === beat.id;
              return (
                <div key={beat.id} className="flex items-center gap-2.5">
                  <span
                    className={`text-[11px] uppercase tracking-widest transition-all ${
                      isCurrent ? "text-[#C87D32] font-semibold opacity-100" : "text-white/40 opacity-60"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      isCurrent ? "w-8 bg-[#C87D32]" : "w-2 bg-white/30"
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* TARJETA EDITORIAL FLOTANTE EN CADA CORTE DEL VIDEO */}
          <div className="relative z-30 h-full max-w-7xl mx-auto px-5 sm:px-10 flex flex-col justify-end pb-12 sm:pb-16">
            <div className="max-w-2xl bg-[#12100E]/80 backdrop-blur-xl border border-[#C87D32]/30 rounded-2xl p-6 sm:p-8 shadow-2xl transition-all duration-500">
              <div className="flex items-center gap-2 text-[#C87D32] text-xs font-semibold tracking-[0.2em] uppercase mb-2">
                <Flame className="w-4 h-4" />
                <span>{activeBeat.eyebrow}</span>
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-[#F5F0E6] font-normal leading-tight mb-2">
                {activeBeat.title}
              </h1>

              <p className="text-xs sm:text-sm text-[#D4AF37] font-medium mb-3">
                {activeBeat.subtitle}
              </p>

              <p className="text-sm sm:text-base text-[#E2D9C8]/90 leading-relaxed mb-5">
                {activeBeat.description}
              </p>

              {/* Píldoras de datos clave */}
              <div className="flex flex-wrap gap-2 mb-6">
                {activeBeat.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-white/5 border border-white/15 text-[#F5F0E6] px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Botón interactivo para abrir el Drawer con toda la info real de ese corte */}
              <div className="flex flex-wrap items-center gap-4">
                {activeBeat.ctaTarget === "drawer" ? (
                  <button
                    onClick={() => setDrawerOpen(true)}
                    className="inline-flex items-center gap-2 bg-[#C87D32] hover:bg-[#d98e43] text-[#0B0A09] font-semibold text-xs sm:text-sm px-5 py-3 rounded-full uppercase tracking-wider transition"
                  >
                    <span>+ {activeBeat.ctaText}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <a
                    href={activeBeat.ctaTarget}
                    className="inline-flex items-center gap-2 bg-[#C87D32] hover:bg-[#d98e43] text-[#0B0A09] font-semibold text-xs sm:text-sm px-5 py-3 rounded-full uppercase tracking-wider transition"
                  >
                    <span>{activeBeat.ctaText}</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                )}

                <span className="text-xs text-white/50">
                  Recorrido del Palenque: {Math.round(scrollProgress * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PANEL LATERAL DESLIZABLE (DRAWER) PARA VER TODA LA INFORMACIÓN REAL DE CADA CORTE */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#14110F] border-l border-[#C87D32]/40 h-full p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#C87D32]">
                    Expediente Oficial · Casa El Huésped
                  </span>
                  <h3 className="font-serif text-2xl text-[#F5F0E6] mt-1">
                    {activeBeat.drawerTitle}
                  </h3>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {activeBeat.drawerDetails.map((item) => (
                  <div
                    key={item.label}
                    className="bg-white/5 border border-white/10 rounded-xl p-4"
                  >
                    <div className="text-xs uppercase tracking-wider text-[#C87D32] font-semibold mb-1">
                      {item.label}
                    </div>
                    <div className="text-sm text-[#F5F0E6]/90 leading-relaxed">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setDrawerOpen(false)}
              className="mt-8 w-full py-3 rounded-full bg-[#C87D32] text-black font-semibold text-sm uppercase tracking-wider"
            >
              Cerrar y Seguir Recorriendo el Palenque
            </button>
          </div>
        </div>
      )}

      {/* SECCIÓN CATÁLOGO COMPLETO: LÍNEA 1 (45°), LÍNEA 2 (40°) Y SILVESTRES */}
      <section id="catalogo" className="py-24 px-5 sm:px-10 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C87D32] font-semibold">
            GARANTIZAMOS UN PRODUCTO ARTESANAL Y DE CALIDAD
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#F5F0E6] mt-3 mb-4">
            Nuestras Expresiones: Línea 1 (45°) y Línea 2 (40°)
          </h2>
          <p className="text-[#E2D9C8]/80 text-sm sm:text-base">
            Elaboradas en Santa María Quiegolani por el Maestro Mezcalero Don Enrique. Disponibles en botellas de 750 ml, 200 ml y miniatura de 50 ml.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BOTTLES_CATALOG.map((bottle) => (
            <div
              key={bottle.name}
              className="bg-[#151210] border border-white/10 hover:border-[#C87D32]/60 rounded-2xl p-6 flex flex-col justify-between transition group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#C87D32] mb-3">
                  <span className="uppercase tracking-wider font-semibold">{bottle.line}</span>
                  <span className="bg-[#C87D32]/15 border border-[#C87D32]/40 px-2.5 py-0.5 rounded-full">
                    {bottle.abv}
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-[#F5F0E6] mb-4 group-hover:text-[#D4AF37] transition">
                  {bottle.name}
                </h3>

                <div className="space-y-2.5 text-sm text-[#E2D9C8]/85 border-t border-white/10 pt-4">
                  <p><strong className="text-white">Color:</strong> {bottle.color}</p>
                  <p><strong className="text-white">Aroma:</strong> {bottle.aroma}</p>
                  <p><strong className="text-white">Sabor:</strong> {bottle.flavor}</p>
                  <p><strong className="text-white">Notas:</strong> {bottle.notes}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-white/60">Presentaciones: {bottle.sizes}</span>
                <a href="#contacto" className="text-[#C87D32] font-semibold uppercase tracking-wider hover:underline">
                  Solicitar Ficha →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN SERVICIOS B2B Y CADENA MAGUEY-MEZCAL */}
      <section id="servicios" className="py-20 bg-[#120F0D] border-y border-white/10 px-5 sm:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C87D32] font-semibold">
              CADENA PRODUCTIVA COMPLETA MAGUEY-MEZCAL
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F5F0E6] mt-2">
              Servicios Integrales, Envasado (Maquila) y Desarrollo de Marcas
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "1. Venta de Maguey Sazón", desc: "Piñas maduras seleccionadas en la Sierra Sur de Oaxaca con máxima concentración de azúcares." },
              { title: "2. Venta de Hijuelos de Maguey", desc: "Planta seleccionada para cultivo y reforestación sustentable de predios mezcaleros." },
              { title: "3. Venta de Mezcal Artesanal", desc: "Comercialización de lotes certificados de nuestros palenques Río Pescado y Río Vara." },
              { title: "4. Envasadores (Maquila)", desc: "Servicio profesional de envasado en presentaciones de 750 ml, 200 ml y 50 ml." },
              { title: "5. Comercializadores", desc: "Distribución para restaurantes, hoteles, cantinas, clubes de golf y tiendas especializadas." },
              { title: "6. Desarrollo de Marcas", desc: "Acompañamiento integral desde el palenque en Quiegolani hasta tu propia botella en el mercado." }
            ].map((srv) => (
              <div key={srv.title} className="bg-[#1A1613] border border-white/10 rounded-xl p-6">
                <Layers className="w-6 h-6 text-[#C87D32] mb-3" />
                <h3 className="font-serif text-xl text-[#F5F0E6] mb-2">{srv.title}</h3>
                <p className="text-sm text-[#E2D9C8]/80 leading-relaxed">{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 12 PUNTOS DE VENTA Y CENTROS DE CONSUMO */}
      <section id="ubicaciones" className="py-24 px-5 sm:px-10 max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C87D32] font-semibold">
            DÓNDE ENCONTRARNOS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#F5F0E6] mt-2">
            Puntos de Venta y Centros de Consumo Oficiales
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {POINTS_OF_SALE.map((pos) => (
            <div key={pos.name} className="bg-[#151210] border border-white/10 rounded-xl p-5 flex gap-3.5">
              <MapPin className="w-5 h-5 text-[#C87D32] shrink-0 mt-1" />
              <div>
                <div className="text-xs text-[#C87D32] uppercase tracking-wider">{pos.city}</div>
                <h4 className="font-serif text-lg text-[#F5F0E6] font-medium">{pos.name}</h4>
                <p className="text-xs text-[#E2D9C8]/75 mt-1">{pos.address}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER Y CONTACTO DIRECTO CORPORATIVO CASA EL HUÉSPED */}
      <footer id="contacto" className="bg-[#080706] border-t border-[#C87D32]/30 py-16 px-5 sm:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-serif text-2xl text-[#F5F0E6] mb-3">
              Corporativo Casa El Huésped S.P.R. de R.L.
            </h3>
            <p className="text-sm text-[#E2D9C8]/75 leading-relaxed">
              Rescatando y dando a conocer el mezcal ancestral y artesanal producido en la zona Chontal Alta y Zapoteca de Santa María Quiegolani, Sierra Sur de Oaxaca.
            </p>
          </div>

          <div className="space-y-2 text-sm">
            <div className="text-xs uppercase tracking-widest text-[#C87D32] font-semibold mb-2">
              Oficina Corporativa y Teléfonos
            </div>
            <p className="flex items-center gap-2 text-[#E2D9C8]">
              <MapPin className="w-4 h-4 text-[#C87D32]" />
              Calle Álamos 921, Col. Reforma, Oaxaca de Juárez, C.P. 68050
            </p>
            <p className="flex items-center gap-2 text-[#E2D9C8]">
              <Phone className="w-4 h-4 text-[#C87D32]" />
              951 158 6485 · 951 165 6452
            </p>
            <p className="flex items-center gap-2 text-[#E2D9C8]">
              <Mail className="w-4 h-4 text-[#C87D32]" />
              info@elhuesped.com.mx
            </p>
          </div>

          <div className="space-y-2 text-sm">
            <div className="text-xs uppercase tracking-widest text-[#C87D32] font-semibold mb-2">
              Palenques y Comunidad
            </div>
            <p className="text-[#E2D9C8]/80">• Palenque Quiegolani Matriz — Río Pescado</p>
            <p className="text-[#E2D9C8]/80">• Palenque Quiegolani — Río Vara</p>
            <p className="text-[#C87D32] pt-2">Instagram: @mezcalelhuesped.oficial</p>
          </div>
        </div>
      </footer>
    </div>
  );
}