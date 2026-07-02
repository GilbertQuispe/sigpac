import type { Metadata } from "next";
import { Poppins } from "next/font/google";
//import './globales.css' // <- ESTA LÍNEA ES TODO
import "./globals.css";

//***carge */
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
// ... <body className={inter.className}>

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "SIGPAC | Sistema de Gestión",
  description: "Sistema de Gestión de Prácticas Clínicas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${poppins.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}

/*import type { Metadata } from 'next'
import './globales.css' // <- ESTA LÍNEA ES TODO

export const metadata: Metadata = {
  title: 'SIGPAC',
  description: 'Sistema de Gestión de Prácticas Clínicas',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-[var(--color-white)] text-[var(--color-dark-1)] font-sans">
        {children}
      </body>
    </html>
  )
}
*/