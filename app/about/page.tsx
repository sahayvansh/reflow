"use client";
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Linkedin, Mail } from 'lucide-react';
import { FaGithub } from "react-icons/fa";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutMePage() {
  const handleRedirect = (url: string): void => {
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-zinc-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-secondary">About Me</h1>
        <Card className="max-w-3xl mx-auto">
          <CardContent className="p-6">
            <h2 className="text-2xl font-mono mb-4 text-center">Vansh Sahay</h2>
            <p className="mb-4">
              As an ambitious final year Engineering student, I am driven by a curiosity to understand the intricate workings of technology. 
              I am currently completing my bachelors degree in Computer and Communication Engineering at the esteemed Manipal Institute of Technology.
            </p>
            <p className="mb-4">
              Beyond academics, I find inspiration in the world of cinema and literature, appreciating their ability to shape our worldviews. 
              My goal is to leverage my engineering skills to contribute positively to society and continually grow as a professional.
            </p>
            <p className="mb-6">
              This website is a personal project aimed at enhancing my web development skills while addressing my own productivity challenges.
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={() => handleRedirect('https://www.github.com')}>
                <FaGithub className="mr-2 h-4 w-4" /> GitHub
              </Button>
              <Button variant="outline" onClick={() => handleRedirect('https://www.linkedin.com')}>
                <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
              </Button>
              <Button variant="outline" onClick={() => handleRedirect('mailto:someone@example.com')}>
                <Mail className="mr-2 h-4 w-4" /> Email
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}