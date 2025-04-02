
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeatureCard from '@/components/FeatureCard';
import IntegrationDemo from '@/components/IntegrationDemo';
import PricingCard from '@/components/PricingCard';
import FaqAccordion from '@/components/FaqAccordion';
import Footer from '@/components/Footer';
import { ArrowRight, Code, Mail, Shield, Zap, Clock, BarChart, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  // Features data
  const features = [
    {
      icon: Code,
      title: 'No Backend Required',
      description: 'Focus on your frontend and let Inboox handle all your form submissions.'
    },
    {
      icon: Mail,
      title: 'Email Notifications',
      description: 'Receive email notifications for every form submission instantly.'
    },
    {
      icon: Shield,
      title: 'Spam Protection',
      description: 'Advanced spam filtering to keep your inbox clean and relevant.'
    },
    {
      icon: Zap,
      title: 'Blazing Fast',
      description: 'Optimized for speed with global CDN for reliable form handling.'
    },
    {
      icon: Clock,
      title: 'Setup in Minutes',
      description: 'Get started quickly with simple integration for any website.'
    },
    {
      icon: BarChart,
      title: 'Analytics Dashboard',
      description: 'Track form submissions and user engagement with detailed analytics.'
    },
    {
      icon: Settings,
      title: 'Customizable',
      description: 'Tailor your form handling with custom redirects, validations and more.'
    },
    {
      icon: Shield,
      title: 'GDPR Compliant',
      description: 'All data processing follows the latest data protection regulations.'
    }
  ];

  // Pricing data
  const pricingPlans = [
    {
      title: 'Free',
      price: 'Free',
      description: 'For small projects and testing.',
      features: [
        { text: '100 submissions/month', included: true },
        { text: 'Email notifications', included: true },
        { text: 'Basic spam protection', included: true },
        { text: 'Single form', included: true },
        { text: 'API access', included: false },
        { text: 'Custom redirects', included: false },
        { text: 'File uploads', included: false },
        { text: 'Priority support', included: false },
      ],
      buttonText: 'Get Started',
    },
    {
      title: 'Pro',
      price: '$15',
      description: 'For professional websites and small businesses.',
      features: [
        { text: '5,000 submissions/month', included: true },
        { text: 'Email notifications', included: true },
        { text: 'Advanced spam protection', included: true },
        { text: 'Unlimited forms', included: true },
        { text: 'API access', included: true },
        { text: 'Custom redirects', included: true },
        { text: 'File uploads (5MB)', included: true },
        { text: 'Priority support', included: false },
      ],
      buttonText: 'Go Pro',
      popular: true,
    },
    {
      title: 'Business',
      price: '$49',
      description: 'For high-volume websites and businesses.',
      features: [
        { text: 'Unlimited submissions', included: true },
        { text: 'Email notifications', included: true },
        { text: 'Enterprise-grade spam protection', included: true },
        { text: 'Unlimited forms', included: true },
        { text: 'API access', included: true },
        { text: 'Custom redirects', included: true },
        { text: 'File uploads (20MB)', included: true },
        { text: 'Priority support', included: true },
      ],
      buttonText: 'Contact Sales',
    },
  ];

  // FAQ data
  const faqs = [
    {
      question: 'How does Inboox work?',
      answer: 'Inboox provides an API endpoint that you can use as the action attribute in your HTML forms or as a fetch URL in JavaScript. When your users submit the form, the data is sent to our servers, validated, and forwarded to your email. No backend code is required on your part.',
    },
    {
      question: 'Do I need to create an account?',
      answer: 'Yes, you need to create a free account to get your unique form endpoint. This helps us prevent spam and allows you to manage your form submissions in one place.',
    },
    {
      question: 'How secure is my data?',
      answer: 'Security is our top priority. All data is encrypted in transit with SSL and at rest. We follow industry best practices for data security and compliance.',
    },
    {
      question: 'Can I use custom domains for form endpoints?',
      answer: 'Yes, on our Business plan, you can use your own domain for form endpoints (e.g., forms.yourdomain.com).',
    },
    {
      question: 'Do you support file uploads?',
      answer: 'Yes, file uploads are supported on our paid plans. The Free plan does not include file upload capabilities.',
    },
    {
      question: 'How do I handle form validation?',
      answer: 'You can use HTML5 validation attributes (required, pattern, etc.) for basic client-side validation. Inboox also provides server-side validation to ensure data integrity.',
    },
    {
      question: 'Can I customize the success/error page after form submission?',
      answer: 'Yes, you can specify custom redirect URLs for success and error cases. You can also use JavaScript to handle form submissions programmatically.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main>
        <HeroSection />
        
        {/* Features Section */}
        <section id="features" className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Everything you need for <span className="text-gradient-blue">painless</span> form handling
            </h2>
            <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Simplify your development process with a complete set of tools designed to make form handling effortless.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        
        {/* Pricing Section */}
        <section id="pricing" className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Simple, transparent <span className="text-gradient-blue">pricing</span>
            </h2>
            <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Choose the plan that works best for your needs. No hidden fees or surprises.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <PricingCard
                  key={index}
                  title={plan.title}
                  price={plan.price}
                  description={plan.description}
                  features={plan.features}
                  popular={plan.popular}
                  buttonText={plan.buttonText}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section id="faq" className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Frequently Asked <span className="text-gradient-blue">Questions</span>
            </h2>
            
            <FaqAccordion faqs={faqs} />
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-blue text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to simplify your form handling?
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
              Join thousands of developers who trust Inboox for their form submissions. Get started for free, no credit card required.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white hover:bg-gray-100 text-blue-700 px-8 py-6 text-lg">
                Create Free Account
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg group">
                Contact Sales
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
