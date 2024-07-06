import React from 'react';
import Link from 'next/link';
// import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
    return (
      <header className="bg-background shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1>

          <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-secondary">Reflow</Link>
        </h1>
          <div className="space-x-4">
            <Link href="/features" className="text-text hover:text-accent">Features</Link>
            <Link href="/about" className="text-text hover:text-accent">About</Link>
            <Link href="/dashboard" className="text-text hover:text-accent">Dashboard</Link>
            {/* <Button className="text-zinc-900 border-accent hover:bg-accent hover:text-black">
              Sign In
            </Button> */}
          </div>
        </nav>
      </header>
    );
  };

export default Header;