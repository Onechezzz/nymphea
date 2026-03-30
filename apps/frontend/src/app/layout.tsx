import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'AURA MYTHOS — Discover Your Essence',
  description: 'Personal perfume selection through an intelligent quiz experience',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#1a2e1e',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
