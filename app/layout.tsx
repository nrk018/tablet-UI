import type { Metadata } from 'next';
import './globals.css';
import { GradientDots } from '@/components/ui/gradient-dots';

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
        <div className="fixed inset-0 -z-10">
          <GradientDots backgroundColor="#000000" dotSize={8} spacing={14} duration={60} colorCycleDuration={10} />
        </div>
        {children}
      </body>
    </html>
  );
}

