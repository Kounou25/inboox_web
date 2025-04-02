
import React from 'react';
import { Copy } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface CodeSnippetProps {
  language: string;
  code: string;
  fileName?: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ language, code, fileName }) => {
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code copied to clipboard",
      description: "You can now paste it into your project",
    });
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-md my-3">
      <div className="bg-gray-900 text-white p-3 text-sm font-mono flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          {fileName && <span>{fileName}</span>}
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-gray-400 hover:text-white"
          onClick={copyToClipboard}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
      <div className="bg-gray-800 p-6 text-left overflow-x-auto">
        <pre className="text-sm md:text-base font-mono text-gray-300 whitespace-pre-wrap">
          {code}
        </pre>
      </div>
    </div>
  );
};

export default CodeSnippet;
