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
      content: "Inboox has revolutionized our form management process. No more need to create a complex backend just to collect emails!",
      author: "Sophie Martin",
      role: "Frontend Developer",
      company: "Digitize",
      avatar: "/placeholder.svg"
    },
    {
      content: "I integrated the Inboox API in less than 5 minutes, and my contact forms work perfectly. A real time-saver!",
      author: "Thomas Dubois",
      role: "Web Freelancer",
      company: "Independent",
      avatar: "https://img.freepik.com/photos-gratuite/heureux-homme-affaires-prospere-posant-exterieur_74855-2004.jpg?ga=GA1.1.1850963107.1741607734&semt=ais_country_boost&w=740"
    },
    {
      content: "Our team can now focus on user experience instead of wasting time on backend setup for forms.",
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
          What our <span className="text-gradient-blue">users</span> say
        </h2>
        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Discover why developers choose Inboox to manage their contact forms.
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