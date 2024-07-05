import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-text bg-grain">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl py-4 font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent to-secondary">
            Welcome to Reflow
          </h1>
          <p className="text-xl mb-8">Boost your productivity with smart time management.</p>
          <Link href="/dashboard">
            <Button className="bg-accent text-white hover:bg-accent-dark">
              Get Started
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}