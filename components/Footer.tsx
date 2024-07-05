import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background text-text">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Reflow</h3>
            <p className="text-sm">Reset your rhythm, boost your productivity.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/features" className="text-sm hover:text-accent">Features</Link></li>
              <li><Link href="/about" className="text-sm hover:text-accent">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-accent">LinkedIn</a></li>
              <li><a href="#" className="text-sm hover:text-accent">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-200 text-center text-sm">
          © {new Date().getFullYear()} Reflow. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;