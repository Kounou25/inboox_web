
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface Testimonial {
  content: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

const TestimonialsSection = () => {
  const testimonials: Testimonial[] = [
    {
      content: "Inboox a révolutionné notre processus de gestion des formulaires. Plus besoin de créer un backend complexe, juste pour collecter des emails !",
      author: "Sophie Martin",
      role: "Développeuse Frontend",
      company: "Digitize",
      avatar: "/placeholder.svg"
    },
    {
      content: "J'ai intégré l'API Inboox en moins de 5 minutes et mes formulaires de contact fonctionnent parfaitement. Un vrai gain de temps !",
      author: "Thomas Dubois",
      role: "Freelance Web",
      company: "Indépendant",
      avatar: "/placeholder.svg"
    },
    {
      content: "Notre équipe peut maintenant se concentrer sur l'expérience utilisateur au lieu de perdre du temps avec la configuration de backend pour les formulaires.",
      author: "Marie Laurent",
      role: "Product Manager",
      company: "TechStart",
      avatar: "/placeholder.svg"
    }
  ];

  return (
    <section id="testimonials" className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Ce que disent nos <span className="text-gradient-blue">utilisateurs</span>
        </h2>
        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Découvrez pourquoi les développeurs choisissent Inboox pour gérer leurs formulaires de contact.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border border-gray-200 hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="mb-4 flex-grow">
                    <p className="text-gray-700 italic">"{testimonial.content}"</p>
                  </div>
                  <div className="flex items-center mt-4">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                      <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
