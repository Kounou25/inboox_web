import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Copy, Mail, Eye, EyeOff, ArrowRight, Info, LogOut, User, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();
  const [hideApiKey, setHideApiKey] = useState(true);
  const [requests, setRequests] = useState(0);
  const [submissions, setSubmissions] = useState(0);
  const userEmail = localStorage.getItem("userEmail");

  const [user, setUser] = useState({
    name: "Jean Dupont",
    email: userEmail || "email@example.com",
    avatarUrl: "",
  });

  const [apiKey, setApiKey] = useState("");

  // Données simulées pour les graphiques (7 jours de la semaine)
  const requestData = [
    { name: "Lun", value: 50 },
    { name: "Mar", value: 80 },
    { name: "Mer", value: 60 },
    { name: "Jeu", value: 90 },
    { name: "Ven", value: 70 },
    { name: "Sam", value: 40 },
    { name: "Dim", value: requests },
  ];

  const submissionData = [
    { name: "Lun", value: 10 },
    { name: "Mar", value: 100 },
    { name: "Mer", value: 15 },
    { name: "Jeu", value: 25 },
    { name: "Ven", value: 18 },
    { name: "Sam", value: 12 },
    { name: "Dim", value: submissions },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch(`/api/users/userProfile/${userEmail}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const userResult = await userResponse.json();

        if (!userResponse.ok) {
          throw new Error(userResult.error || "Erreur lors de la récupération du profil");
        }

        setUser({
          name: userResult.full_name,
          email: userResult.email,
          avatarUrl: userResult.avatarUrl || "",
        });

        const userId = userResult.id;
        localStorage.setItem("uuid", userId);
        console.log(userId);
        const apiKeyResponse = await fetch(`/api/apiKeys/keyById/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const apiKeyResult = await apiKeyResponse.json();

        if (!apiKeyResponse.ok) {
          throw new Error(apiKeyResult.error || "Erreur lors de la récupération de la clé API");
        }

        setApiKey(apiKeyResult.key);
      } catch (error) {
        console.error("Erreur détaillée:", error);
        toast.error(error.message || "Erreur lors de la récupération des données");
      }
    };

    if (userEmail) {
      fetchUserData();
    }
  }, [userEmail]);

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
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col space-y-10"
        >
          {/* En-tête */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-white p-6 rounded-lg shadow-sm">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="flex items-center gap-3 bg-slate-100 p-3 rounded-lg"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback className="bg-blue-100 text-blue-800">
                    {user.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:flex items-center gap-2">
                  <p className="font-medium text-sm text-gray-800">{user.name}</p>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-1" />
                    <span className="text-xs text-green-700">Actif</span>
                  </div>
                </div>
              </motion.div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="gap-2 border-blue-300 text-blue-700 hover:bg-blue-50 transition-colors"
                  onClick={() => navigate("/mailsbox")}
                >
                  <MessageSquare size={18} />
                  <span className="hidden md:inline">Messages</span>
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 border-red-300 text-red-700 hover:bg-red-50 transition-colors"
                  onClick={handleLogout}
                >
                  <LogOut size={18} />
                  <span className="hidden md:inline">Déconnexion</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Statistiques avec Graphiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-blue-700">Requêtes API</CardTitle>
                  <CardDescription className="text-gray-600">Cette semaine</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={requestData}>
                      <XAxis dataKey="name" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                  <p className="text-2xl font-semibold text-blue-600 mt-4">{requests}</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-blue-700">Formulaires Soumis</CardTitle>
                  <CardDescription className="text-gray-600">Cette semaine</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={submissionData}>
                      <XAxis dataKey="name" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip />
                      <Bar dataKey="value" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                  <p className="text-2xl font-semibold text-blue-600 mt-4">{submissions}</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Profil utilisateur */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-blue-700">Profil Utilisateur</CardTitle>
              <CardDescription className="text-gray-600">Informations de votre compte</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700">Nom</label>
                  <Input
                    value={user.name}
                    readOnly
                    className="bg-gray-50 border-gray-200 text-gray-800 mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <Input
                    value={user.email}
                    readOnly
                    className="bg-gray-50 border-gray-200 text-gray-800 mt-1"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <User size={18} className="text-blue-600 mr-2" />
                <span className="text-sm text-blue-600">Compte standard</span>
              </div>
            </CardContent>
          </Card>

          {/* Clé API */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-blue-700">Votre Clé API</CardTitle>
              <CardDescription className="text-gray-600">
                Utilisez cette clé pour intégrer Inboox
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-3">
                <div className="relative flex-grow">
                  <Input
                    type={hideApiKey ? "password" : "text"}
                    value={apiKey}
                    className="pr-10 font-mono bg-gray-50 border-gray-200 text-gray-800"
                    readOnly
                  />
                  <button
                    className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-700 transition-colors"
                    onClick={() => setHideApiKey(!hideApiKey)}
                  >
                    {hideApiKey ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
                <Button
                  variant="outline"
                  className="border-blue-300 text-blue-700 hover:bg-blue-50 transition-colors"
                  onClick={copyApiKey}
                >
                  <Copy size={18} className="mr-2" />
                  Copier
                </Button>
              </div>
              <Alert className="bg-blue-50 border-blue-200">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-800">Important</AlertTitle>
                <AlertDescription className="text-blue-700">
                  Ne partagez jamais votre clé API publiquement.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Comment intégrer */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-blue-700">Comment Intégrer Inboox</CardTitle>
              <CardDescription className="text-gray-600">Étapes simples pour commencer</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
              {[
                {
                  step: 1,
                  title: "Configurez votre formulaire HTML",
                  desc: "Ajoutez l'attribut <code class='bg-gray-100 px-1 py-0.5 rounded'>data-inboox</code> à votre formulaire et incluez un champ email.",
                },
                {
                  step: 2,
                  title: "Intégrez votre clé API",
                  desc: "Configurez votre formulaire pour envoyer les données à notre API.",
                },
                {
                  step: 3,
                  title: "Testez votre formulaire",
                  desc: "Soumettez un test pour vérifier le bon fonctionnement.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold mr-4">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{item.title}</h3>
                    <p
                      className="text-gray-600 mt-1"
                      dangerouslySetInnerHTML={{ __html: item.desc }}
                    />
                  </div>
                </motion.div>
              ))}
              <motion.div whileHover={{ scale: 1.03 }}>
                <Button
                  variant="default"
                  className="bg-blue-600 hover:bg-blue-700 text-white group transition-colors"
                >
                  Voir la documentation complète
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;