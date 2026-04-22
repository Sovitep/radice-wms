import type {Metadata} from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-open-sans',
});

export const metadata: Metadata = {
  title: 'RaDiCe WMS Repository',
  description: 'Discover projects and researches within RaDiCe.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={openSans.variable}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
