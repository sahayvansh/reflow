"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-text bg-grain">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl py-4 font-bold mb-4 bg-clip-text text-transparent bg-secondary"
          >
            Welcome to Reflow
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-xl mb-8"
          >
            Boost your productivity with smart time management.
          </motion.p>
          <Link href="/dashboard">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-accent text-slate-500 hover:bg-accent-dark">
                Get Started
              </Button>
            </motion.div>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
} 