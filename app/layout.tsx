import AuthProvider from '@/context/AuthContext';
import ToasterContext from '@/context/ToasterContext';
import { Rubik } from 'next/font/google';
import Navigation from './(site)/components/navigation/Navigation';
import './globals.css';
const rubik = Rubik({ subsets: ['latin-ext'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  ////tsx
  return (
    <html lang="pl">
      <body style={rubik.style} className="overflow-x-hidden bg-skin-main-bg">
        <Navigation />
        <AuthProvider>
          <ToasterContext />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
