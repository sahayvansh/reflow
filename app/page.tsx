import { AnimatedContent } from "@/components/AnimatedContent";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-text bg-grain">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16">
          <AnimatedContent />
        </div>
      </main>
      <Footer />
    </div>
  );
}