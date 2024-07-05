// components/AnimatedContent.tsx
'use client';

import { motion } from "framer-motion";
import { FeatureCard } from "./FeatureCard";
import { Button } from "@/components/ui/button";

export const AnimatedContent = () => {
  return (
    <>
    <motion.h1 
      className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 py-2"
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
          <Button variant="outline" className="w-full text-accent border-accent hover:bg-accent hover:text-white">Start Timer</Button>
        </FeatureCard>
        
        <FeatureCard title="Smart Breaks" description="AI-powered break suggestions to help you recharge">
          <Button variant="outline" className="w-full text-accent border-accent hover:bg-accent hover:text-white">Explore Breaks</Button>
        </FeatureCard>
        
        <FeatureCard title="Task Management" description="Organize and prioritize your tasks efficiently">
          <Button variant="outline" className="w-full text-accent border-accent hover:bg-accent hover:text-white">Manage Tasks</Button>
        </FeatureCard>
      </motion.div>
    </>
  );
};