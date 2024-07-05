'use client';

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

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
      <Card className="bg-white shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-2 text-text">{title}</h2>
          <p className="text-sm text-gray-600 mb-4">{description}</p>
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
};