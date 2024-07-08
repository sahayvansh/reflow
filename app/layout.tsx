import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import "./globals.css";
import { TimerProvider } from '@/components/TimerContext';

const inter = Inter({ subsets: ["latin"] });

interface Metadata {
  title: string;
  description: string;
}

const metadata: Metadata = {
  title: "Reflow",  // Change this to your app's title
  description: "Reset your Rhythm",  // Change this to your app's description
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
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