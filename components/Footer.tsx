import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background text-text">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-2 text-slate-800">Reflow</h3>
            <p className="text-sm">Reset your rhythm, boost your productivity.</p>
          </div>
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-12">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-slate-800">Quick Links</h3>
              <ul className="space-y-1">
                {/* <li><Link href="/features" className="text-sm hover:text-accent">Features</Link></li> */}
                <li><Link href="/about" className="text-sm hover:text-accent">About Me</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-slate-800">Connect</h3>
              <ul className="space-y-1">
                <li><a href="https://www.linkedin.com/in/sahayvansh/" target="_blank" className="text-sm hover:text-accent">LinkedIn</a></li>
                <li><a href="https://github.com/sahayvansh" target="_blank" className="text-sm hover:text-accent">GitHub</a></li>
              </ul>
            </div>
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