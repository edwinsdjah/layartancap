import { Bebas_Neue, Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'font-awesome/css/font-awesome.min.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { ModalProvider } from '../context/ModalContext';
import ServiceWorkerRegister from './Components/ServiceWorkerRegister';

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Layar Tancap',
  description: 'Menancap di mana saja',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bebas.variable} antialiased`}
      >
        <ServiceWorkerRegister />
        <link rel='manifest' href='/manifest.json' />

        <ModalProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ModalProvider>
      </body>
    </html>
  );
}
