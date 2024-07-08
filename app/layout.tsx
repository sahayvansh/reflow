import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import "./globals.css";
import { TimerProvider } from '@/components/TimerContext';

const inter = Inter({ subsets: ["latin"] });

// interface Metadata {
//   title: string;
//   description: string;
// }

// const metadata: Metadata = {
//   title: "Reflow",  
//   description: "Reset your Rhythm",  
// };

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <TimerProvider>
          {children}
        </TimerProvider>
      </body>
    </html>
  );
}