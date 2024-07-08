import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
      <header className="bg-background shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1>
            <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-secondary">Reflow</Link>
          </h1>
          <div className="space-x-4">
            <Link href="/timer" className="text-text hover:text-accent">Timer</Link>
            <Link href="/tasks" className="text-text hover:text-accent">Tasks</Link>
            <Link href="/breaks" className="text-text hover:text-accent">Breaks</Link>
            <Link href="/dashboard" className="text-text hover:text-accent">Dashboard</Link>
          </div>
        </nav>
      </header>
    );
  };

export default Header;