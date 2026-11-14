"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  HISTORIA_LITERAL,
  PROCESOS_LITERALES,
  SERVICIOS_LITERALES,
  MEZCALES_CATA,
  LINEAS_PRESENTACIONES,
  PUNTOS_DE_VENTA,
} from "@/data/mezcalData";
import { X, ArrowUpRight, MapPin, Phone, Mail, FileText, ChevronDown, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 90;

interface ChapterBeat {
  id: string;
  chapterNum: string;
  eyebrow: string;
  titleRegular: string;
  titleItalic: string;
  description: string;
  ctaLabel: string;
  roomKey: string;
  align: "left" | "right" | "center";
  // Ventana de scroll (0 a 1) donde este capítulo aparece, se lee y desaparece antes de la transición
  start: number;
  peakIn: number;
  peakOut: number;
  end: number;
}

const CHAPTERS: ChapterBeat[] = [
  {
    id: "cap-1",
    chapterNum: "CAPÍTULO I — EL ORIGEN",
    eyebrow: "Santa María Quiegolani, Sierra Sur de Oaxaca",
    titleRegular: "Donde la niebla resguarda el ",
    titleItalic: "Palenque Ancestral",
    description:
      "Zona Chontal Alta y Zapoteca. Bajo el cuidado de nuestro Maestro Mezcalero Don Enrique, cada piña de maguey guarda el silencio de la montaña.",
    ctaLabel: "Explorar Nuestra Historia",
    roomKey: "historia",
    align: "left",
    start: 0.0,
    peakIn: 0.02,
    peakOut: 0.14,
    end: 0.21,
  },
  {
    id: "cap-2",
    chapterNum: "CAPÍTULO II — EL FUEGO SUBTERRÁNEO",
    eyebrow: "Selección, Corte y Cocción de 96 Horas",
    titleRegular: "Horno cónico de tierra y ",
    titleItalic: "piedra de río",
    description:
      "Magueyes maduros seleccionados por su riqueza en azúcares, cocidos bajo tierra con leña durante 3 a 4 días hasta transformar el corazón del agave.",
    ctaLabel: "Ver los 6 Procesos Artesanales",
    roomKey: "procesos-horno",
    align: "right",
    start: 0.28,
    peakIn: 0.34,
    peakOut: 0.48,
    end: 0.55,
  },
  {
    id: "cap-3",
    chapterNum: "CAPÍTULO III — EL COBRE Y EL ROBLE",
    eyebrow: "Molienda en Piedra y Doble Destilación",
    titleRegular: "El latido del ",
    titleItalic: "Alambique de Cobre",
    description:
      "Fermentación natural en tinas de madera de roble y doble destilación a fuego directo. Productores de maguey, mezcal, envasadores y comercializadores.",
    ctaLabel: "Conocer Servicios y Maquila",
    roomKey: "servicios",
    align: "left",
    start: 0.61,
    peakIn: 0.67,
    peakOut: 0.79,
    end: 0.85,
  },
  {
    id: "cap-4",
    chapterNum: "CAPÍTULO IV — LA CATA SERVIDA",
    eyebrow: "Línea 1 (45° Alc. Vol.) y Línea 2 (40° Alc. Vol.)",
    titleRegular: "La grandeza de ",
    titleItalic: "nuestra tierra",
    description:
      "Joven Espadín, Reposado, Añejo, Abocado con Gusano, Tobalá silvestre de 10 años y Tepeztate de 15 años.",
    ctaLabel: "Abrir Catálogo y Fichas Técnicas",
    roomKey: "lineas",
    align: "left",
    start: 0.88,
    peakIn: 0.92,
    peakOut: 0.99,
    end: 1.01,
  },
];

export default function ScrollWorldEngine() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);

  const [loadPercent, setLoadPercent] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [openRoom, setOpenRoom] = useState<string | null>(null);

  // Función de dibujo en <canvas> con encuadre adaptativo inteligente (Desktop vs Mobile)
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Calcular proporción tipo cover pero permitiendo más aire en móvil
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;

    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawWidth = width;
      drawHeight = width / imgRatio;
      offsetY = (height - drawHeight) * 0.5;
    } else {
      drawHeight = height;
      drawWidth = height * imgRatio;
      // En celular centramos ligeramente hacia el punto de interés de cada escena
      offsetX = (width - drawWidth) * 0.5;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();
  };

  // 1. PRELOADER (0% - 100%): Precargar los 135 fotogramas WebP en memoria RAM antes de habilitar el scroll
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const num = String(i).padStart(3, "0");
      img.src = `/sequence/frame_${num}.webp`;
      img.onload = () => {
        loadedCount++;
        const pct = Math.round((loadedCount / TOTAL_FRAMES) * 100);
        setLoadPercent(pct);
        if (i === 1) {
          imagesRef.current[0] = img;
          renderFrame(0);
        }
        if (loadedCount === TOTAL_FRAMES) {
          setIsReady(true);
          setTimeout(() => renderFrame(0), 50);
        }
      };
      img.onerror = () => {
        loadedCount++;
        const pct = Math.round((loadedCount / TOTAL_FRAMES) * 100);
        setLoadPercent(pct);
        if (loadedCount === TOTAL_FRAMES) setIsReady(true);
      };
      loadedImages[i - 1] = img;
    }

    imagesRef.current = loadedImages;

    const onResize = () => renderFrame(currentFrameRef.current);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // 2. LENIS SMOOTH SCROLL + GSAP SCROLLTRIGGER VINCULADO AL <CANVAS>
  useEffect(() => {
    if (!isReady) return;

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tickerFn = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    const playhead = { frame: 0 };

    const st = ScrollTrigger.create({
      trigger: trackRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.4,
      onUpdate: (self) => {
        const p = self.progress;
        setScrollProgress(p);
        const targetFrame = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.floor(p * (TOTAL_FRAMES - 1)))
        );
        if (targetFrame !== currentFrameRef.current) {
          currentFrameRef.current = targetFrame;
          renderFrame(targetFrame);
        }
      },
    });

    return () => {
      st.kill();
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
    };
  }, [isReady]);

  // Calcular opacidad y desplazamiento vertical (y: 30px -> 0 -> -20px) para cada capítulo según el progreso
  const getChapterStyle = (ch: ChapterBeat) => {
    const p = scrollProgress;
    if (p < ch.start || p > ch.end) {
      return {
        opacity: 0,
        transform: "translate3d(0, 28px, 0)",
        pointerEvents: "none" as const,
      };
    }
    if (p >= ch.start && p < ch.peakIn) {
      const t = (p - ch.start) / (ch.peakIn - ch.start);
      const y = (1 - t) * 28;
      return {
        opacity: t,
        transform: `translate3d(0, ${y.toFixed(1)}px, 0)`,
        pointerEvents: t > 0.5 ? ("auto" as const) : ("none" as const),
      };
    }
    if (p >= ch.peakIn && p <= ch.peakOut) {
      return {
        opacity: 1,
        transform: "translate3d(0, 0px, 0)",
        pointerEvents: "auto" as const,
      };
    }
    const t = (p - ch.peakOut) / (ch.end - ch.peakOut);
    const y = -t * 22;
    return {
      opacity: Math.max(0, 1 - t),
      transform: `translate3d(0, ${y.toFixed(1)}px, 0)`,
      pointerEvents: 1 - t > 0.5 ? ("auto" as const) : ("none" as const),
    };
  };

  const scrollToFraction = (fraction: number) => {
    setOpenRoom(null);
    if (!trackRef.current) return;
    const trackTop = trackRef.current.offsetTop;
    const scrollable = trackRef.current.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: trackTop + scrollable * fraction,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full bg-[#0B0A09] text-[#F4EFE6] select-none">
      {/* =====================================================================
          BLOQUE 1: PRELOADER DE AGENCIA (0% - 100%)
         ===================================================================== */}
      {!isReady && (
        <div className="fixed inset-0 z-50 bg-[#0B0A09] flex flex-col items-center justify-center px-6 text-center">
          <div className="w-16 h-16 rounded-full border border-[#C87D4B]/50 flex items-center justify-center mb-6 overflow-hidden bg-black/50">
            <img
              src="/images/brand/recurso-000.png"
              alt="Mezcal El Huésped"
              className="w-11 h-11 object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            <span className="font-serif-editorial text-xl text-[#D4AF37]">EH</span>
          </div>

          <p className="text-[11px] uppercase tracking-[0.35em] text-[#C87D4B] mb-2">
            Santa María Quiegolani · Oaxaca
          </p>
          <h1 className="font-serif-editorial text-3xl md:text-5xl text-[#F4EFE6] tracking-wide mb-8">
            Mezcal <span className="italic font-normal text-[#D4AF37]">El Huésped</span>
          </h1>

          <div className="w-64 md:w-80 h-[2px] bg-white/10 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-gradient-to-r from-[#C87D4B] to-[#D4AF37] transition-all duration-150"
              style={{ width: `${loadPercent}%` }}
            />
          </div>

          <div className="flex items-center gap-3 text-xs font-mono tracking-[0.2em] text-[#F4EFE6]/60">
            <span>PREPARANDO EXPERIENCIA INMERSIVA</span>
            <span className="text-[#D4AF37] font-semibold">{loadPercent}%</span>
          </div>
        </div>
      )}

      {/* =====================================================================
          BLOQUE 2: NAVBAR MINIMALISTA FIJO (SIN ENCIMARSE EN MÓVIL)
         ===================================================================== */}
      <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 md:px-10 py-3.5 bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-[4px]">
        <button
          onClick={() => scrollToFraction(0.02)}
          className="flex items-center gap-3 text-left"
        >
          <div className="w-9 h-9 rounded-full border border-[#C87D4B]/60 bg-black/70 flex items-center justify-center text-[#D4AF37] font-serif-editorial text-base">
            EH
          </div>
          <div>
            <span className="block font-serif-editorial text-sm md:text-lg tracking-[0.18em] uppercase text-[#F4EFE6] leading-tight">
              Mezcal El Huésped
            </span>
            <span className="block text-[9px] md:text-[10px] tracking-[0.24em] uppercase text-[#C87D4B]">
              Quiegolani · Oaxaca
            </span>
          </div>
        </button>

        {/* Enlaces centrales de capítulos (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7 text-[11px] uppercase tracking-[0.2em] text-[#F4EFE6]/80">
          <button onClick={() => scrollToFraction(0.05)} className="hover:text-[#D4AF37] transition">
            I. El Origen
          </button>
          <button onClick={() => scrollToFraction(0.40)} className="hover:text-[#D4AF37] transition">
            II. Cocción
          </button>
          <button onClick={() => scrollToFraction(0.72)} className="hover:text-[#D4AF37] transition">
            III. Destilación
          </button>
          <button onClick={() => scrollToFraction(0.95)} className="hover:text-[#D4AF37] transition">
            IV. Las Líneas
          </button>
          <button onClick={() => setOpenRoom("puntos")} className="hover:text-[#D4AF37] transition">
            Puntos de Venta
          </button>
        </nav>

        {/* Botón de WhatsApp integrado en el Navbar para que NUNCA tape las tarjetas de abajo en celular */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setOpenRoom("puntos")}
            className="lg:hidden px-2.5 py-1.5 rounded-full border border-white/20 text-[10px] uppercase tracking-wider text-[#F4EFE6]/90 bg-black/50"
          >
            Salas
          </button>
          <a
            href="https://wa.me/529511586485?text=Hola%20Mezcal%20El%20Hu%C3%A9sped,%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#C87D4B] hover:bg-[#d88c59] text-black font-semibold text-[10px] md:text-xs uppercase tracking-[0.14em] transition shadow-lg"
          >
            <Phone className="w-3 h-3" />
            <span>WhatsApp</span>
          </a>
        </div>
      </header>

      {/* =====================================================================
          BLOQUE 3: ESCENARIO PRINCIPAL CON HTML5 <CANVAS> + CAPÍTULOS FLOTANTES
         ===================================================================== */}
      <section ref={trackRef} className="relative w-full h-[550vh]">
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-[#0B0A09]">
          {/* El <canvas> HTML5 que dibuja los 135 fotogramas a 60fps sin parpadear */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full block pointer-events-none"
          />

          {/* Capa de grano cinematográfico (3.5%) que une tipografía y fotografía */}
          <div className="absolute inset-0 film-grain pointer-events-none z-10" />

          {/* Gradiente direccional suave para dar espacio negativo de lectura sin tapar el arte */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(180deg, rgba(11,10,9,0.55) 0%, rgba(11,10,9,0.05) 30%, rgba(11,10,9,0.12) 65%, rgba(11,10,9,0.88) 100%)",
            }}
          />

          {/* Capítulos con ritmo de aparición (entran en su escena y desaparecen en las caminatas) */}
          <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-5 md:px-12 flex items-end pb-10 md:pb-16 pointer-events-none">
            {CHAPTERS.map((ch) => {
              const style = getChapterStyle(ch);
              const alignClass =
                ch.align === "right"
                  ? "md:ml-auto"
                  : ch.align === "center"
                  ? "md:mx-auto"
                  : "md:mr-auto";

              return (
                <div
                  key={ch.id}
                  style={style}
                  className={`absolute bottom-8 md:bottom-14 left-5 right-5 md:left-auto md:right-auto md:w-[460px] ${alignClass} transition-none`}
                >
                  <div className="p-5 md:p-6 rounded-2xl bg-[#0B0A09]/60 backdrop-blur-md border border-white/15 shadow-2xl">
                    <div className="flex items-center justify-between text-[10px] tracking-[0.24em] uppercase text-[#C87D4B] mb-1.5">
                      <span>{ch.chapterNum}</span>
                      <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                    </div>

                    <p className="text-[11px] text-[#F4EFE6]/65 tracking-wider uppercase mb-1">
                      {ch.eyebrow}
                    </p>

                    <h2 className="font-serif-editorial text-2xl md:text-4xl text-[#F4EFE6] leading-[1.12] mb-2.5">
                      {ch.titleRegular}
                      <span className="italic font-normal text-[#D4AF37]">
                        {ch.titleItalic}
                      </span>
                    </h2>

                    <p className="text-xs md:text-sm text-[#F4EFE6]/80 leading-relaxed mb-4">
                      {ch.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-2.5">
                      <button
                        onClick={() => setOpenRoom(ch.roomKey)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F4EFE6] hover:bg-[#D4AF37] text-[#0B0A09] font-semibold text-xs uppercase tracking-[0.15em] transition"
                      >
                        <span>{ch.ctaLabel}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Barra lateral derecha con progreso de scroll y saltos de capítulo */}
          <div className="fixed right-4 md:right-7 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3">
            {[0.05, 0.40, 0.72, 0.95].map((pos, idx) => {
              const active =
                (idx === 0 && scrollProgress < 0.25) ||
                (idx === 1 && scrollProgress >= 0.25 && scrollProgress < 0.58) ||
                (idx === 2 && scrollProgress >= 0.58 && scrollProgress < 0.86) ||
                (idx === 3 && scrollProgress >= 0.86);
              return (
                <button
                  key={idx}
                  onClick={() => scrollToFraction(pos)}
                  className={`w-1.5 rounded-full transition-all duration-300 ${
                    active ? "h-8 bg-[#D4AF37]" : "h-2.5 bg-white/30 hover:bg-white/60"
                  }`}
                  aria-label={`Ir al capítulo ${idx + 1}`}
                />
              );
            })}
          </div>

          {/* Indicador inicial de deslizar */}
          {scrollProgress < 0.04 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 text-[10px] uppercase tracking-[0.26em] text-[#F4EFE6]/70 pointer-events-none">
              <span>Desliza suavemente</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#D4AF37] animate-bounce" />
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          BLOQUE 4: SECCIÓN ESTÁTICA EDITORIAL AL TERMINAR EL RECORRIDO (ESTILO PEAR)
         ===================================================================== */}
      <section className="relative z-20 bg-[#0B0A09] border-t border-white/10 py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#C87D4B]">
              Corporativo Casa el Huésped S.P.R. DE R.L.
            </span>
            <h2 className="font-serif-editorial text-3xl md:text-5xl text-[#F4EFE6] mt-2">
              Explora cada sala de <span className="italic text-[#D4AF37]">Nuestra Casa</span>
            </h2>
            <p className="text-sm text-[#F4EFE6]/70 mt-3">
              Selecciona cualquiera de los cuartos para consultar la información íntegra, fichas técnicas oficiales en PDF y puntos de venta en Oaxaca y CDMX.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                key: "historia",
                num: "01",
                title: "Nuestra Historia y Palenques",
                sub: "Visión, Misión, Filosofía y Maestro Don Enrique en Quiegolani.",
              },
              {
                key: "lineas",
                num: "02",
                title: "Línea 1 (45°) y Línea 2 (40°)",
                sub: "Espadín, Reposado, Añejo, Abocado con Gusano, Tobalá y Tepeztate.",
              },
              {
                key: "procesos-horno",
                num: "03",
                title: "Los 6 Procesos Artesanales",
                sub: "Selección, Corte, Cocción, Molienda, Fermentación y Destilación.",
              },
              {
                key: "puntos",
                num: "04",
                title: "Servicios y Puntos de Venta",
                sub: "Envasadores (Maquila), Venta de Maguey y centros de consumo.",
              },
            ].map((card) => (
              <button
                key={card.key}
                onClick={() => setOpenRoom(card.key)}
                className="text-left p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-[#C87D4B]/60 transition group flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono text-[#C87D4B]">{card.num}</span>
                  <h3 className="font-serif-editorial text-2xl text-[#F4EFE6] mt-2 mb-2 group-hover:text-[#D4AF37] transition">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#F4EFE6]/70 leading-relaxed">{card.sub}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-[#D4AF37] mt-6">
                  Abrir Sala <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          BLOQUE 5: LOS "CUARTITOS" (MODALES DE SALA COMPLETA)
         ===================================================================== */}
      {openRoom && (
        <div className="fixed inset-0 z-50 bg-[#0B0A09]/95 backdrop-blur-xl overflow-y-auto">
          <div className="max-w-5xl mx-auto px-5 md:px-8 py-8 md:py-14">
            <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-8 sticky top-0 bg-[#0B0A09]/90 backdrop-blur-md z-10 pt-2">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C87D4B]">
                  Mezcal El Huésped — Sala Interior
                </span>
                <h2 className="font-serif-editorial text-2xl md:text-4xl text-[#F4EFE6]">
                  {openRoom === "historia" && "Nuestra Historia, Palenques y Filosofía"}
                  {openRoom === "procesos-horno" && "Nuestros 6 Procesos Artesanales"}
                  {openRoom === "servicios" && "Comercializadora y Servicios"}
                  {openRoom === "lineas" && "Catálogo: Línea 1 (45°) y Línea 2 (40°)"}
                  {openRoom === "puntos" && "Puntos de Venta y Servicios"}
                </h2>
              </div>

              <button
                onClick={() => setOpenRoom(null)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-[#C87D4B] hover:text-black text-xs uppercase tracking-widest transition"
              >
                <X className="w-4 h-4" />
                <span>Cerrar</span>
              </button>
            </div>

            {openRoom === "historia" && (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] mb-2">
                    {HISTORIA_LITERAL.corporativo}
                  </p>
                  <p className="text-sm md:text-base leading-relaxed text-[#F4EFE6]/90">
                    {HISTORIA_LITERAL.historia}
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                    <h3 className="font-serif-editorial text-2xl text-[#D4AF37] mb-2">Visión</h3>
                    <p className="text-xs md:text-sm text-[#F4EFE6]/80 leading-relaxed">
                      {HISTORIA_LITERAL.vision}
                    </p>
                  </div>
                  <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                    <h3 className="font-serif-editorial text-2xl text-[#D4AF37] mb-2">Misión</h3>
                    <p className="text-xs md:text-sm text-[#F4EFE6]/80 leading-relaxed">
                      {HISTORIA_LITERAL.mision}
                    </p>
                  </div>
                  <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                    <h3 className="font-serif-editorial text-2xl text-[#D4AF37] mb-2">Filosofía</h3>
                    <p className="text-xs md:text-sm text-[#F4EFE6]/80 leading-relaxed">
                      {HISTORIA_LITERAL.filosofia}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {openRoom === "procesos-horno" && (
              <div className="grid md:grid-cols-2 gap-4">
                {PROCESOS_LITERALES.map((proc) => (
                  <div key={proc.paso} className="p-5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-xs font-mono text-[#C87D4B]">PROCESO {proc.paso}</span>
                    <h3 className="font-serif-editorial text-2xl text-[#F4EFE6] mt-1 mb-2">
                      {proc.nombre}
                    </h3>
                    <p className="text-xs md:text-sm text-[#F4EFE6]/80 leading-relaxed">
                      {proc.texto}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {openRoom === "servicios" && (
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {SERVICIOS_LITERALES.map((serv) => (
                    <div
                      key={serv}
                      className="p-5 rounded-xl bg-white/5 border border-white/15 flex items-center justify-between"
                    >
                      <span className="font-serif-editorial text-xl text-[#F4EFE6]">{serv}</span>
                      <span className="w-2 h-2 rounded-full bg-[#C87D4B]" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {openRoom === "lineas" && (
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {MEZCALES_CATA.map((m) => (
                    <div
                      key={m.nombre}
                      className="p-5 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#C87D4B]">
                          {m.maguey}
                        </span>
                        <h3 className="font-serif-editorial text-2xl text-[#F4EFE6] mt-1 mb-3">
                          {m.nombre}
                        </h3>
                        <ul className="space-y-1.5 text-xs text-[#F4EFE6]/80">
                          <li><strong className="text-[#D4AF37]">Riqueza:</strong> {m.riqueza}</li>
                          <li><strong className="text-[#D4AF37]">Color:</strong> {m.color}</li>
                          <li><strong className="text-[#D4AF37]">Aroma:</strong> {m.aroma}</li>
                          <li><strong className="text-[#D4AF37]">Sabor:</strong> {m.sabor}</li>
                          <li><strong className="text-[#D4AF37]">Notas:</strong> {m.notas}</li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  {LINEAS_PRESENTACIONES.map((lin) => (
                    <div key={lin.titulo} className="p-5 rounded-xl bg-white/5 border border-white/10">
                      <h4 className="font-serif-editorial text-xl text-[#F4EFE6] mb-2">{lin.titulo}</h4>
                      <ul className="text-xs text-[#F4EFE6]/75 space-y-1 mb-4">
                        {lin.presentaciones.map((p) => (
                          <li key={p}>• {p}</li>
                        ))}
                      </ul>
                      <a
                        href={lin.fichaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs text-[#D4AF37] uppercase tracking-wider font-semibold"
                      >
                        <FileText className="w-4 h-4" />
                        Descargar Ficha Técnica PDF
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {openRoom === "puntos" && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {PUNTOS_DE_VENTA.map((pv) => (
                    <div key={pv.nombre} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#C87D4B] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-serif-editorial text-xl text-[#F4EFE6]">{pv.nombre}</h4>
                        <p className="text-xs text-[#F4EFE6]/75 mt-0.5">{pv.direccion}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
