'use client';

import AuthProvider from '@/context/AuthContext';
import ToasterContext from '@/context/ToasterContext';
import { useLayoutState } from '@/context/layoutState';
import { useNavigationState } from '@/context/navigationState';
import { clsx } from 'clsx';
import { Rubik } from 'next/font/google';
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
  const {
    setIsAccessibilitySubmenuVisible_ToTrue:
      setIsAccessibilitySubmenuVisible_ToTrue,
  } = useNavigationState();

  ////tsx
  return (
    <html lang="pl">
      <body
        style={rubik.style}
        className={clsx(
          'bg-skin-main-bg overflow-x-hidden',

          // layout modes
          currentMode === 'LIGHT'
            ? null
            : currentMode === 'DARK'
            ? 'theme-dark'
            : 'theme-contrast',

          // font sizes
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
        <a
          href="#accessibility_navigation"
          className="skip-link"
          onClick={setIsAccessibilitySubmenuVisible_ToTrue}
        >
          Przejdź do narzędzi ułatwiających dostępność treści
        </a>
        <Navigation />
        <AuthProvider>
          <ToasterContext />
          {children}
        </AuthProvider>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
