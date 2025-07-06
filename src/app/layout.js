import './globals.css';
import { Inter, Rajdhani } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ClientThemeProvider from '../components/ClientThemeProvider';

const rajdhani = Rajdhani({ subsets: ['latin'], weight: ['400', '700'] });
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Feedavana',
  description: 'Cyber, Startup & Crime news in real-time.',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${rajdhani.className} ${inter.className}`}>
      <head>
        {/* PWA-specific meta */}
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body>
        <AppRouterCacheProvider>
          <ClientThemeProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </ClientThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
