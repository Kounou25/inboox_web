import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Copy, Mail, Eye, EyeOff, ArrowRight, Info, LogOut, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [hideApiKey, setHideApiKey] = useState(true);
  const apiKey = "inbx_JKlrEs9372Hp42Mx8zKv1Q6aBcDeF";
  const [requests, setRequests] = useState(0);
  const [submissions, setSubmissions] = useState(0);
  const userEmail = localStorage.getItem("userEmail");

  // État pour les données utilisateur
  const [user, setUser] = useState({
    name: "Jean Dupont", // Valeur par défaut avant chargement
    email: userEmail || "email@example.com",
    avatarUrl: "", // Empty for now, will use fallback
  });

  // Récupération du profil utilisateur
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/users/userProfile/${userEmail}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Erreur lors de la récupération du profil");
        }

        setUser({
          name: result.full_name,
          email: result.email,
          avatarUrl: result.avatarUrl || "",
        });
      } catch (error) {
        console.error("Erreur détaillée:", error);
        toast.error(error.message || "Erreur lors de la récupération du profil");
      }
    };

    if (userEmail) {
      fetchUserProfile();
    }
  }, [userEmail]);

  // Simuler des statistiques
  useEffect(() => {
    setRequests(Math.floor(Math.random() * 150) + 50);
    setSubmissions(Math.floor(Math.random() * 50) + 10);
  }, []);

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    toast.success("Clé API copiée dans le presse-papier");
  };

  const handleLogout = () => {
    toast.success("Déconnexion réussie");
    navigate("/");
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-3xl font-bold">Dashboard</h1>

            {/* User Profile and Logout */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 bg-slate-100 p-2 rounded-lg">
                <Avatar>
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback className="bg-blue-100 text-blue-800">
                    {user.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="font-medium text-sm">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              <Button variant="outline" className="gap-2" onClick={handleLogout}>
                <LogOut size={18} />
                <span className="hidden md:inline">Déconnexion</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Statistiques */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Requêtes API</CardTitle>
                <CardDescription>Ce mois-ci</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{requests}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Formulaires soumis</CardTitle>
                <CardDescription>Ce mois-ci</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{submissions}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Status</CardTitle>
                <CardDescription>Tout fonctionne correctement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <p className="text-green-700 font-medium">Actif</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profil utilisateur */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Profil utilisateur</CardTitle>
              <CardDescription>Informations de votre compte</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Nom</label>
                  <Input value={user.name} readOnly className="bg-gray-50" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <Input value={user.email} readOnly className="bg-gray-50" />
                </div>
              </div>
              <div className="flex items-center">
                <User size={18} className="text-blue-600 mr-2" />
                <span className="text-sm text-blue-600">Compte standard</span>
              </div>
            </CardContent>
          </Card>

          {/* Clé API */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Votre clé API</CardTitle>
              <CardDescription>Utilisez cette clé pour intégrer Inboox dans vos formulaires</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <div className="flex">
                  <div className="relative flex-grow">
                    <Input
                      type={hideApiKey ? "password" : "text"}
                      value={apiKey}
                      className="pr-10 font-mono"
                      readOnly
                    />
                    <button
                      className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setHideApiKey(!hideApiKey)}
                    >
                      {hideApiKey ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>
                  <Button variant="outline" className="ml-2" onClick={copyApiKey}>
                    <Copy size={18} className="mr-2" />
                    Copier
                  </Button>
                </div>

                <Alert className="bg-blue-50 border-blue-200">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertTitle className="text-blue-800">Important</AlertTitle>
                  <AlertDescription className="text-blue-700">
                    Ne partagez jamais votre clé API publiquement. Elle doit être utilisée uniquement dans vos environnements sécurisés.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          {/* Comment intégrer */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Comment intégrer Inboox</CardTitle>
              <CardDescription>Suivez ces étapes simples pour commencer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold mr-4">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium">Configurez votre formulaire HTML</h3>
                    <p className="text-gray-600 mt-1">
                      Ajoutez l'attribut <code className="bg-gray-100 px-1 py-0.5 rounded">data-inboox</code> à votre formulaire et incluez un champ email.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold mr-4">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium">Intégrez votre clé API</h3>
                    <p className="text-gray-600 mt-1">
                      Configurez votre formulaire pour envoyer les données à notre API en utilisant votre clé API.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold mr-4">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium">Testez votre formulaire</h3>
                    <p className="text-gray-600 mt-1">
                      Soumettez un test pour vous assurer que tout fonctionne correctement.
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <Button variant="default" className="group">
                    Voir la documentation complète
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;