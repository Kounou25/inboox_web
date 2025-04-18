import React from 'react';
import { Check, X } from 'lucide-react';

interface ComparisonFeature {
  name: string;
  inboox: boolean;
  formspree: boolean;
  netlifyForms: boolean;
  formKeep: boolean;
}

const ComparisonSection = () => {
  const comparisonFeatures: ComparisonFeature[] = [
    {
      name: "Backend-free configuration",
      inboox: true,
      formspree: true,
      netlifyForms: true,
      formKeep: true
    },
    {
      name: "Email alerts for new submissions",
      inboox: true,
      formspree: true, // Formspree can send email notifications
      netlifyForms: true, // Netlify Forms supports email notifications
      formKeep: true // FormKeep supports email notifications
    },
    {
      name: "Dashboard for submission storage",
      inboox: true,
      formspree: false, // Formspree focuses on email, no native dashboard
      netlifyForms: true, // Netlify provides a dashboard
      formKeep: true // FormKeep provides a dashboard
    },
    {
      name: "Easy integration",
      inboox: true,
      formspree: true,
      netlifyForms: false, // Requires Netlify hosting
      formKeep: true
    },
    {
      name: "Compatible with any website",
      inboox: true,
      formspree: true,
      netlifyForms: false, // Tied to Netlify platform
      formKeep: true
    },
    {
      name: "Framework-independent",
      inboox: true,
      formspree: true,
      netlifyForms: false, // Works best within Netlify ecosystem
      formKeep: false // May require specific setup
    }
  ];

  return (
    <section id="comparison" className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          How <span className="text-gradient-blue">Inboox</span> compares
        </h2>
        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
          See why Inboox stands out for storing form submissions on a dashboard with email alerts, all without a backend.
        </p>
        
        <div className="max-w-5xl mx-auto overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-4 text-left font-semibold text-gray-700 border-b">Feature</th>
                <th className="p-4 text-center font-semibold text-blue-600 border-b">Inboox</th>
                <th className="p-4 text-center font-semibold text-gray-700 border-b">Formspree</th>
                <th className="p-4 text-center font-semibold text-gray-700 border-b">Netlify Forms</th>
                <th className="p-4 text-center font-semibold text-gray-700 border-b">FormKeep</th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((feature, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="p-4 border-b text-gray-700">{feature.name}</td>
                  <td className="p-4 border-b text-center">
                    {feature.inboox ? 
                      <Check className="inline-block h-5 w-5 text-green-500" /> : 
                      <X className="inline-block h-5 w-5 text-red-500" />}
                  </td>
                  <td className="p-4 border-b text-center">
                    {feature.formspree ? 
                      <Check className="inline-block h-5 w-5 text-green-500" /> : 
                      <X className="inline-block h-5 w-5 text-red-500" />}
                  </td>
                  <td className="p-4 border-b text-center">
                    {feature.netlifyForms ? 
                      <Check className="inline-block h-5 w-5 text-green-500" /> : 
                      <X className="inline-block h-5 w-5 text-red-500" />}
                  </td>
                  <td className="p-4 border-b text-center">
                    {feature.formKeep ? 
                      <Check className="inline-block h-5 w-5 text-green-500" /> : 
                      <X className="inline-block h-5 w-5 text-red-500" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;