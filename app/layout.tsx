import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dust-Rose 2077 | Robot Control System',
  description: 'Futuristic post-apocalyptic combat robot control interface',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

