import type { Metadata } from 'next';
import './globals.css';
import { Vortex } from '@/components/ui/vortex';

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
      <body className="antialiased bg-black">
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <Vortex backgroundColor="#000000" baseHue={25} rangeY={140} particleCount={650} baseSpeed={0.1} rangeSpeed={1.2} baseRadius={1} rangeRadius={2.5} />
        </div>
        {children}
      </body>
    </html>
  );
}

