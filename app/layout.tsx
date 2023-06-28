'use client';

import AuthProvider from '@/context/AuthContext';
import ToasterContext from '@/context/ToasterContext';
import { useLayoutState } from '@/context/layoutState';
import { clsx } from 'clsx';
import Footer from './(site)/components/Footer';
import Navbar from './(site)/components/Navbar';
import './globals.css';

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
        className={clsx(
          'bg-skin-fill',
          currentMode === 'NORMAL' ? null : 'theme-contrast',
          currentFontSize === 'NORMAL'
            ? null
            : currentFontSize === 'BIGGER'
            ? 'theme-font-size-bigger'
            : 'theme-font-size-biggest'
        )}
      >
        <Navbar />
        <AuthProvider>
          <ToasterContext />
          {children}
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
