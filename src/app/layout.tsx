import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Mezcal El Huésped | Casa Productora Artesanal — Santa María Quiegolani, Oaxaca",
  description:
    "Productores de maguey y mezcal artesanal desde la Sierra Sur de Oaxaca. Palenques Río Pescado y Río Vara bajo la maestría de Don Enrique.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body className="bg-[#0B0A09] text-[#F4EFE6] antialiased selection:bg-[#C87D4B] selection:text-black">
        {children}
      </body>
    </html>
  );
}
