import React from 'react';
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

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
  isPreorder?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  description,
  features,
  popular = false,
  buttonText,
  isPreorder = false,
}) => {
  return (
    <div
      className={`relative rounded-2xl bg-white shadow-xl border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
        popular ? 'border-orange-500' : 'border-blue-100'
      }`}
    >
      {popular && (
        <div className="absolute top-0 right-0 bg-orange-500 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
          Most Popular
        </div>
      )}

      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <div className="flex items-baseline mb-4">
          <span className="text-4xl font-extrabold text-gray-900">{price}</span>
          {price !== 'Free' && !isPreorder && (
            <span className="text-gray-500 ml-2 text-lg">/month</span>
          )}
          {isPreorder && (
            <span className="text-gray-500 ml-2 text-lg">forever</span>
          )}
        </div>
        <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>

        <Button
          className={`w-full py-3 text-lg font-semibold transition-all duration-200 ${
            popular
              ? 'bg-orange-500 hover:bg-orange-600 text-white'
              : 'bg-blue-100 text-blue-900 hover:bg-blue-200'
          }`}
          variant={popular ? 'default' : 'outline'}
        >
          {buttonText}
        </Button>

        <div className="mt-8 space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`mr-3 flex-shrink-0 ${
                  feature.included ? 'text-blue-500' : 'text-red-500'
                }`}
              >
                {feature.included ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <X className="h-5 w-5" />
                )}
              </div>
              <span
                className={`text-sm ${
                  feature.included ? 'text-gray-800' : 'text-gray-500'
                }`}
              >
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const PricingSection = () => {
  const freeFeatures: PricingFeature[] = [
    { text: "100 messages per month", included: true },
    { text: "Reply to messages directly", included: false },
    { text: "Export messages as PDF", included: false },
    { text: "Collect newsletter form data", included: false },
  ];

  const preorderFeatures: PricingFeature[] = [
    { text: "Unlimited messages", included: true },
    { text: "Reply to messages directly", included: true },
    { text: "Export messages as PDF", included: true },
    { text: "Collect newsletter form data", included: true },
    { text: "Lifetime access", included: true },
    { text: "All future features included", included: true },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto py-16 px-6 bg-gray-50">
      <PricingCard
        title="Free"
        price="Free"
        description="Basic features to get started"
        features={freeFeatures}
        buttonText="Get Started"
      />
      
      <PricingCard
        title="Pro"
        price="$15"
        description="Unlock all features with lifetime access"
        features={preorderFeatures}
        popular={true}
        buttonText="Preorder Now"
        isPreorder={true}
      />
    </div>
  );
};

export default PricingCard;