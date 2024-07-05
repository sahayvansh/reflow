// components/AnimatedContent.tsx
'use client';

import { motion } from "framer-motion";
import { FeatureCard } from "./FeatureCard";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export const AnimatedContent = () => {
  return (
    <>
      <motion.h1 
        className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-secondary py-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Reflow
      </motion.h1>
      <motion.p 
        className="text-lg text-center mb-12 text-text"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Reset your rhythm, boost your productivity.
      </motion.p>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <FeatureCard title="Pomodoro Timer" description="Focus on your tasks with customizable work sessions">
          <Link href="/timer" passHref>
            <Button variant="outline" className="w-full text-gray-700 border-accent hover:bg-accent hover:text-white">Start Timer</Button>
          </Link>
        </FeatureCard>
        
        <FeatureCard title="Smart Breaks" description="AI-powered break suggestions to help you recharge">
          <Link href="/breaks" passHref>
            <Button variant="outline" className="w-full text-gray-700 border-accent hover:bg-accent hover:text-white">Explore Breaks</Button>
          </Link>
        </FeatureCard>
        
        <FeatureCard title="Task Management" description="Organize and prioritize your tasks efficiently">
          <Link href="/tasks" passHref>
            <Button variant="outline" className="w-full text-gray-700 border-accent hover:bg-accent hover:text-white">Manage Tasks</Button>
          </Link>
        </FeatureCard>
      </motion.div>
    </>
  );
};