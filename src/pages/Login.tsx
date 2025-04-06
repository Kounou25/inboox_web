import React, { useState } from "react"; // Ajout de useState
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Veuillez entrer une adresse email valide"),
  password: z.string().min(1, "Le mot de passe est requis"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Nouvel état pour le chargement
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true); // Début du chargement
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de la connexion');
      }

      localStorage.setItem('userEmail', result.user.email);
      toast.success('Connexion réussie !');

      switch (result.user.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'user':
          navigate('/dashboard');
          break;
        default:
          navigate('/dashboard');
      }
    } catch (error) {
      console.error('Erreur détaillée:', error);
      toast.error(error.message || 'Une erreur est survenue lors de la connexion');
    } finally {
      setIsLoading(false); // Fin du chargement
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col items-center">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gradient-blue">Connectez-vous à Inboox</h1>
          <p className="text-gray-600 mt-2">Bienvenue! Entrez vos identifiants pour accéder à votre compte</p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="vous@exemple.com" 
                      {...field} 
                      disabled={isLoading} // Désactive l'input pendant le chargement
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="********" 
                      {...field} 
                      disabled={isLoading} // Désactive l'input pendant le chargement
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end">
              <Link to="#" className="text-sm text-blue-600 hover:underline">
                Mot de passe oublié?
              </Link>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading} // Désactive le bouton pendant le chargement
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Connexion...
                </div>
              ) : (
                "Se connecter"
              )}
            </Button>
          </form>
        </Form>
        
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Vous n'avez pas de compte?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Inscrivez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;