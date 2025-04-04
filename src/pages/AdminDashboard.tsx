
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BarChart3, 
  Users, 
  Settings, 
  LogOut, 
  Bell, 
  Search, 
  PlusCircle, 
  User,
  FileText,
  Mail
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent
} from "@/components/ui/chart";
import { 
  AreaChart, 
  Area, 
  BarChart, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Bar
} from "recharts";

// Données fictives pour le graphique
const recentData = [
  { name: "Jan", value: 400 },
  { name: "Fév", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Avr", value: 450 },
  { name: "Mai", value: 650 },
  { name: "Juin", value: 700 },
  { name: "Juil", value: 550 },
];

const userTypeData = [
  { name: "Gratuit", value: 400 },
  { name: "Premium", value: 300 },
  { name: "Entreprise", value: 200 },
];

// Liste d'utilisateurs fictive
const mockUsers = [
  { id: 1, name: "Thomas Durand", email: "thomas@example.com", status: "Actif", plan: "Premium" },
  { id: 2, name: "Marie Leroy", email: "marie@example.com", status: "Actif", plan: "Gratuit" },
  { id: 3, name: "Paul Dubois", email: "paul@example.com", status: "Inactif", plan: "Entreprise" },
  { id: 4, name: "Sophie Martin", email: "sophie@example.com", status: "Actif", plan: "Premium" },
  { id: 5, name: "Lucas Bernard", email: "lucas@example.com", status: "Actif", plan: "Gratuit" },
];

// Données de notifications fictives
const notifications = [
  { id: 1, title: "Nouvel utilisateur", message: "Paul Dubois vient de s'inscrire", time: "Il y a 10 minutes" },
  { id: 2, title: "Mise à jour système", message: "Maintenance planifiée ce weekend", time: "Il y a 1 heure" },
  { id: 3, title: "Alerte sécurité", message: "5 tentatives de connexion échouées", time: "Il y a 3 heures" },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Admin info
  const admin = {
    name: "Admin Système",
    email: "admin@inboox.com",
    avatarUrl: "",
  };
  
  // Stats
  const stats = {
    totalUsers: 1254,
    activeUsers: 876,
    monthlyRevenue: "12 450€",
    pendingSupport: 8,
  };
  
  const handleLogout = () => {
    toast.success("Déconnexion réussie");
    navigate('/');
  };
  
  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="flex">
        <div className="fixed w-64 h-screen bg-slate-800 text-white p-4 flex flex-col">
          <div className="py-6 flex items-center justify-center">
            <h1 className="text-2xl font-bold">Inboox Admin</h1>
          </div>
          
          <nav className="flex-1 space-y-1 mt-8">
            <a href="#" className="flex items-center space-x-2 p-3 mb-2 rounded-md bg-slate-700">
              <BarChart3 size={20} />
              <span>Dashboard</span>
            </a>
            <a href="#" className="flex items-center space-x-2 p-3 mb-2 rounded-md hover:bg-slate-700 transition-colors">
              <Users size={20} />
              <span>Utilisateurs</span>
            </a>
            <a href="#" className="flex items-center space-x-2 p-3 mb-2 rounded-md hover:bg-slate-700 transition-colors">
              <FileText size={20} />
              <span>Rapports</span>
            </a>
            <a href="#" className="flex items-center space-x-2 p-3 mb-2 rounded-md hover:bg-slate-700 transition-colors">
              <Mail size={20} />
              <span>Messages</span>
            </a>
            <a href="#" className="flex items-center space-x-2 p-3 mb-2 rounded-md hover:bg-slate-700 transition-colors">
              <Settings size={20} />
              <span>Paramètres</span>
            </a>
          </nav>
          
          <div className="mt-auto pb-6">
            <div className="flex items-center space-x-2 p-3 hover:bg-slate-700 rounded-md cursor-pointer" onClick={handleLogout}>
              <LogOut size={20} />
              <span>Déconnexion</span>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="ml-64 flex-1 p-8">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Tableau de bord administrateur</h1>
              <p className="text-gray-500">Bienvenue, {admin.name}</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Button variant="outline" size="icon" className="relative">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </span>
                </Button>
              </div>
              
              <div className="flex items-center space-x-3 bg-white p-2 rounded-lg border">
                <Avatar>
                  <AvatarImage src={admin.avatarUrl} alt={admin.name} />
                  <AvatarFallback className="bg-indigo-100 text-indigo-800">
                    {admin.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{admin.name}</p>
                  <p className="text-xs text-gray-500">{admin.email}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Utilisateurs</CardTitle>
                <CardDescription>Total</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold">{stats.totalUsers}</p>
                  <Users className="h-8 w-8 text-indigo-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Utilisateurs actifs</CardTitle>
                <CardDescription>Ce mois-ci</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold">{stats.activeUsers}</p>
                  <User className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Revenus</CardTitle>
                <CardDescription>Ce mois-ci</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold">{stats.monthlyRevenue}</p>
                  <BarChart3 className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Support</CardTitle>
                <CardDescription>Tickets en attente</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold">{stats.pendingSupport}</p>
                  <Mail className="h-8 w-8 text-amber-500" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Utilisateurs récents</CardTitle>
                <CardDescription>Croissance des nouveaux utilisateurs</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ChartContainer config={{}} className="h-full">
                  <AreaChart data={recentData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Répartition des utilisateurs</CardTitle>
                <CardDescription>Par type d'abonnement</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ChartContainer config={{}} className="h-full">
                  <BarChart data={userTypeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
          
          {/* Content Tabs */}
          <Tabs defaultValue="users" className="mb-8">
            <TabsList>
              <TabsTrigger value="users">Utilisateurs</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            
            <TabsContent value="users" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Rechercher un utilisateur..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Ajouter un utilisateur
                </Button>
              </div>
              
              <div className="rounded-md border">
                <div className="overflow-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Utilisateur
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Statut
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Abonnement
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredUsers.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-indigo-100 text-indigo-800 text-xs">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.plan}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                              Éditer
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-4">
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <Card key={notification.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start">
                        <div className="mr-4 mt-1">
                          <Bell className="h-8 w-8 text-slate-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">{notification.title}</h3>
                          <p className="text-sm text-gray-600">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
