import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import Providers from './providers';
import './globals.css';
import 'primeicons/primeicons.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  title: 'Cuido Mi Negocio',
  description: 'SE+ Cuido Mi Negocio v2',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={dmSans.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
