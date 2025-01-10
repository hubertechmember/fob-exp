import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

export const metadata = {
  title: 'Fobos VR',
  description: 'Terapia VR lęku społecznego',
};
