
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-24 px-4">
      <div className="container mx-auto flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl leading-tight mb-6">
          Forms that <span className="text-gradient-blue">just work</span>,<br />
          without any backend code
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8">
          Inboox handles form submissions, validation, and email delivery so you can focus on building beautiful frontends.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Button className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg">
            Get Started Free
          </Button>
          <Button variant="outline" className="px-8 py-6 text-lg group">
            See How It Works
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        
        <div className="relative w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl">
          <div className="bg-gray-900 text-white p-3 text-sm font-mono flex items-center">
            <div className="flex space-x-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span>ContactForm.jsx</span>
          </div>
          <div className="bg-gray-800 p-6 text-left overflow-x-auto">
            <pre className="text-sm md:text-base font-mono text-gray-300">
{`// No backend needed!
<form action="https://api.inboox.dev/forms/your-form-id" method="POST">
  <input type="text" name="name" placeholder="Your name" required />
  <input type="email" name="email" placeholder="Your email" required />
  <textarea name="message" placeholder="Your message"></textarea>
  <button type="submit">Send Message</button>
</form>`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
