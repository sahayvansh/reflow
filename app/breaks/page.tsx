"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReactMarkdown from 'react-markdown';
import AmbientSoundPlayer from '@/components/AmbientSoundPlayer';
import PomodoroStatus from '@/components/PomodoroStatus';
import MiniGame from '@/components/MiniGame';

import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(apiKey);

const model: GenerativeModel = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

const generationConfig = {
  temperature: 0.7,
  topP: 0.8,
  topK: 40,
  maxOutputTokens: 1024,
};

const presetPrompts = [
  "Quick 5-minute energy boost",
  "15-minute relaxation technique",
  "Physical activity for desk workers",
  "Creative inspiration break"
];

export default function BreaksPage() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (prompt: string) => {
    setIsLoading(true);
    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });
      
      const contextPrompt = `
        As a productivity-focused AI assistant for the Reflow app, provide a specific and actionable break suggestion for the following prompt: "${prompt}".
        The suggestion should be concise, practical, and aimed at enhancing the user's productivity and well-being.
        Use Markdown formatting for headers and bold text.
      `;
      
      const result = await chatSession.sendMessage(contextPrompt);
      setResponse(result.response.text());
    } catch (error) {
      console.error("Error fetching response:", error);
      setResponse("An error occurred while fetching the response.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-text bg-grain">
      <Header />
      <div className="container mx-auto mt-10 p-4 flex-grow">
        <div className="flex gap-4 max-w-6xl mx-auto">
          <div className="w-1/4">
            <PomodoroStatus />
            <AmbientSoundPlayer />
          </div>
          <Card className="w-2/4 bg-[#e7d4b5]">
            <CardHeader>
              <CardTitle className="text-3xl text-zinc-700 font-bold text-center">Smart Breaks</CardTitle>
              <CardDescription className="text-center text-text">Explore AI-powered break suggestions to help you recharge and boost productivity.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  placeholder="Enter your prompt here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full h-32 bg-background text-black"
                />
                <Button 
                  onClick={() => handleSubmit(input)}
                  className="w-full bg-accent text-slate-500 hover:bg-accent hover:text-zinc-700" 
                  disabled={isLoading || !input}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Get Custom Break Suggestion"
                  )}
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  {presetPrompts.map((prompt, index) => (
                    <Button
                      key={index}
                      onClick={() => handleSubmit(prompt)}
                      variant="outline"
                      className="text-sm text-zinc-900"
                      disabled={isLoading}
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              </div>
              {response && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2 text-text">AI Suggestion:</h3>
                  <div className="bg-background p-4 rounded-md text-black">
                    <ReactMarkdown>{response}</ReactMarkdown>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          <div className="w-1/4">
            <MiniGame />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}