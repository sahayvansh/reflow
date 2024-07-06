'use client';

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

interface FeatureCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, children }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="bg-{} shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-2 text-slate-300">{title}</h2>
          <p className="text-sm text-zinc-900 mb-4">{description}</p>
          <div className="w-full text-black border-accent hover:bg-accent hover:text-black">
            {children}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};