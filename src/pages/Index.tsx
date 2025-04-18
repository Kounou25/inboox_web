import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeatureCard from '@/components/FeatureCard';
import IntegrationDemo from '@/components/IntegrationDemo';
import PricingCard, { PricingSection } from '@/components/PricingCard';
import FaqAccordion from '@/components/FaqAccordion';
import TestimonialsSection from '@/components/TestimonialsSection';
import ComparisonSection from '@/components/ComparisonSection';
import Footer from '@/components/Footer';
import { ArrowRight, Code, Mail, Shield, Zap, Clock, BarChart, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  // Updated Features data to reflect dashboard storage and email alerts
  const features = [
    {
      icon: Mail,
      title: 'Email Alerts',
      description: 'Get notified instantly via email whenever a new form submission is received.'
    },
    {
      icon: Code,
      title: 'No Backend Required',
      description: 'Focus on your frontend while Inboox stores and manages your form submissions.'
    },
    {
      icon: Shield,
      title: 'Spam Protection',
      description: 'Advanced filtering to ensure only legitimate submissions reach your dashboard.'
    },
    {
      icon: Zap,
      title: 'Fast and Reliable',
      description: 'Optimized for speed with a global CDN for seamless form processing and storage.'
    },
    {
      icon: Clock,
      title: 'Setup in Minutes',
      description: 'Integrate quickly with any website and start collecting submissions effortlessly.'
    },
    {
      icon: BarChart, // Changed to BarChart to represent dashboard
      title: 'Dashboard Insights',
      description: 'View and manage all your form submissions in a user-friendly dashboard.'
    }
  ];

  // Updated FAQ data to reflect the new workflow
  const faqs = [
    {
      question: 'How does Inboox work?',
      answer: 'Inboox provides an API endpoint for your HTML forms or JavaScript fetch calls. When users submit a form, the data is sent to our servers, validated, stored securely, and displayed on your dashboard. You’ll also receive an email alert for each new submission—no backend code needed on your end.'
    },
    {
      question: 'Do I need to create an account?',
      answer: 'Yes, a free account is required to access your unique form endpoint and dashboard. This helps us secure your data and manage submissions effectively.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. Data is encrypted in transit with SSL and at rest. We adhere to industry-standard security and compliance practices to protect your submissions.'
    },
    {
      question: 'How do I handle form validation?',
      answer: 'Use HTML5 validation attributes (e.g., required, pattern) for client-side checks. Inboox also performs server-side validation before storing the data.'
    },
    {
      question: 'Can I customize the success/error page after form submission?',
      answer: 'Yes, you can set custom redirect URLs for success and error scenarios, or handle submissions programmatically with JavaScript.'
    },
    {
      question: 'How many form submissions can I receive?',
      answer: 'We’re in the launch phase, and our service is still evolving. Contact us to discuss your specific submission volume needs.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main>
        <HeroSection /> {/* Ensure HeroSection reflects the dashboard focus */}
        
        {/* Features Section */}
        <section id="features" className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Everything you need to <span className="text-gradient-blue">simplify</span> your forms
            </h2>
            <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Streamline your workflow with tools that store, manage, and notify you about form submissions effortlessly.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </section>
        
        <IntegrationDemo />
        
        <TestimonialsSection />
        
        <ComparisonSection />
        <PricingSection />
        
        {/* FAQ Section */}
        <section id="faq" className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Frequently <span className="text-gradient-blue">Asked</span> Questions
            </h2>
            
            <FaqAccordion faqs={faqs} />
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-blue text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to simplify your form management?
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
              Join developers trusting Inboox to store submissions and get real-time alerts. Start free—no credit card needed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white hover:bg-gray-100 text-blue-700 px-8 py-6 text-lg">
                Create a Free Account
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg group">
                Contact the Team
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;