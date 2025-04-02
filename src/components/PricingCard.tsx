
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: PricingFeature[];
  popular?: boolean;
  buttonText: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  description,
  features,
  popular = false,
  buttonText,
}) => {
  return (
    <div className={`relative rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${popular ? 'border-2 border-blue-600 scale-105 md:scale-110' : 'border border-gray-200'}`}>
      {popular && (
        <div className="absolute top-0 right-0">
          <div className="bg-accent font-medium text-white px-4 py-1 rounded-bl-lg text-sm">
            Most Popular
          </div>
        </div>
      )}

      <div className="p-6 md:p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
        <div className="mb-4">
          <span className="text-3xl font-bold">{price}</span>
          {price !== 'Free' && <span className="text-gray-500 ml-1">/month</span>}
        </div>
        <p className="text-gray-600 mb-6">{description}</p>

        <Button 
          className={`w-full ${popular ? 'bg-accent hover:bg-accent/90 text-white' : ''}`}
          variant={popular ? 'default' : 'outline'}
        >
          {buttonText}
        </Button>

        <div className="mt-8 space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <div className={`mt-1 mr-3 flex-shrink-0 ${feature.included ? 'text-blue-600' : 'text-gray-400'}`}>
                <Check className="h-4 w-4" />
              </div>
              <span className={feature.included ? 'text-gray-700' : 'text-gray-500'}>
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
