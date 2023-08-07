'use client';

import AuthProvider from '@/context/AuthContext';
import ToasterContext from '@/context/ToasterContext';
import { useLayoutState } from '@/context/layoutState';
import { clsx } from 'clsx';
import { Rubik } from 'next/font/google';
import Footer from './(site)/components/Footer';
import Navigation from './(site)/components/navigation/Navigation';
import './globals.css';
const rubik = Rubik({ subsets: ['latin-ext'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  ////logic
  const currentMode = useLayoutState().getLayoutMode();
  const currentFontSize = useLayoutState().getFontSize();

  ////tsx
  return (
    <html lang="pl">
      <body
        style={rubik.style}
        className={clsx(
          'bg-skin-main-bg',
          currentMode === 'NORMAL' ? null : 'theme-contrast',
          currentFontSize === 'NORMAL'
            ? null
            : currentFontSize === 'BIGGER'
            ? 'theme-font-size-bigger'
            : 'theme-font-size-biggest'
        )}
      >
        <a href="#main_content" className="skip-link">
          Przejdź do treści
        </a>
        <Navigation />
        <AuthProvider>
          <ToasterContext />
          {children}
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
