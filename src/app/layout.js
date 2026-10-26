import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: { default: 'Demo SSR Next.js', template: '%s | Demo SSR' },
  description: 'Demo Server-Side Rendering oleh Kelompok 2',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        <main className="container">{children}</main>
        <footer className="footer">Demo SSR | Kelompok 2 | Next.js Rendering Methods</footer>
      </body>
    </html>
  );
}
