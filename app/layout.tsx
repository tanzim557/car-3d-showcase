import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AERO // GT-800 Hypercar 3D Interactive Showcase',
  description:
    'Experience the next generation hypercar in an interactive real-time 3D showroom with photorealistic lighting, dynamic part hotspots, and specs exploration.',
  keywords: ['3D car showcase', 'WebGL', 'React Three Fiber', 'Next.js', 'automotive configurator'],
  authors: [{ name: 'Aero Dynamics' }],
};

export const viewport: Viewport = {
  themeColor: '#08090C',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#08090C] text-white antialiased overflow-hidden select-none">
        {children}
      </body>
    </html>
  );
}
