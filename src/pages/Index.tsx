
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeatureCard from '@/components/FeatureCard';
import IntegrationDemo from '@/components/IntegrationDemo';
import FaqAccordion from '@/components/FaqAccordion';
import TestimonialsSection from '@/components/TestimonialsSection';
import ComparisonSection from '@/components/ComparisonSection';
import Footer from '@/components/Footer';
import { ArrowRight, Code, Mail, Shield, Zap, Clock, BarChart, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  // Features data
  const features = [
    {
      icon: Mail,
      title: 'Notifications par Email',
      description: 'Recevez instantanément les soumissions de vos formulaires par email.'
    },
    {
      icon: Code,
      title: 'Aucun Backend Requis',
      description: 'Concentrez-vous sur votre frontend et laissez Inboox gérer l\'envoi des emails.'
    },
    {
      icon: Shield,
      title: 'Protection Anti-Spam',
      description: 'Filtrage avancé pour garder votre boîte mail propre et pertinente.'
    },
    {
      icon: Zap,
      title: 'Rapide et Fiable',
      description: 'Optimisé pour la vitesse avec un CDN mondial pour un traitement fiable des formulaires.'
    },
    {
      icon: Clock,
      title: 'Configuration en Minutes',
      description: 'Commencez rapidement avec une intégration simple pour n\'importe quel site web.'
    },
    {
      icon: Settings,
      title: 'Personnalisable',
      description: 'Adaptez votre traitement de formulaire avec des redirections et validations personnalisées.'
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: 'Comment fonctionne Inboox ?',
      answer: 'Inboox fournit un point de terminaison API que vous pouvez utiliser comme attribut action dans vos formulaires HTML ou comme URL fetch en JavaScript. Lorsque vos utilisateurs soumettent le formulaire, les données sont envoyées à nos serveurs, validées et transmises à votre email. Aucun code backend n\'est requis de votre part.',
    },
    {
      question: 'Dois-je créer un compte ?',
      answer: 'Oui, vous devez créer un compte gratuit pour obtenir votre point de terminaison de formulaire unique. Cela nous aide à prévenir le spam et vous permet de gérer vos soumissions de formulaire en un seul endroit.',
    },
    {
      question: 'Mes données sont-elles sécurisées ?',
      answer: 'La sécurité est notre priorité absolue. Toutes les données sont chiffrées en transit avec SSL et au repos. Nous suivons les meilleures pratiques de l\'industrie pour la sécurité et la conformité des données.',
    },
    {
      question: 'Comment gérer la validation des formulaires ?',
      answer: 'Vous pouvez utiliser les attributs de validation HTML5 (required, pattern, etc.) pour une validation basique côté client. Inboox fournit également une validation côté serveur pour garantir l\'intégrité des données.',
    },
    {
      question: 'Puis-je personnaliser la page de succès/erreur après la soumission du formulaire ?',
      answer: 'Oui, vous pouvez spécifier des URL de redirection personnalisées pour les cas de succès et d\'erreur. Vous pouvez également utiliser JavaScript pour gérer les soumissions de formulaire de manière programmatique.',
    },
    {
      question: 'Combien de soumissions de formulaire puis-je recevoir ?',
      answer: 'Actuellement, nous sommes en phase de lancement et notre service est en développement. Contactez-nous pour discuter de vos besoins spécifiques.',
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
              Tout ce dont vous avez besoin pour <span className="text-gradient-blue">simplifier</span> vos formulaires
            </h2>
            <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Simplifiez votre processus de développement avec un ensemble d'outils conçus pour rendre la gestion des formulaires sans effort.
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
        
        {/* FAQ Section */}
        <section id="faq" className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Questions <span className="text-gradient-blue">Fréquentes</span>
            </h2>
            
            <FaqAccordion faqs={faqs} />
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-blue text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à simplifier la gestion de vos formulaires ?
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
              Rejoignez les développeurs qui font confiance à Inboox pour leurs soumissions de formulaires. Commencez gratuitement, aucune carte de crédit requise.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white hover:bg-gray-100 text-blue-700 px-8 py-6 text-lg">
                Créer un Compte Gratuit
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg group">
                Contacter l'Équipe
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
