
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BarChart3, 
  Users, 
  Settings, 
  LogOut, 
  Bell, 
  Search, 
  User,
  FileText,
  Mail,
  Filter,
  Edit,
  Trash,
  MessageSquare,
  Database,
  Server
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
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
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Données pour les statistiques
const statsData = {
  totalUsers: 1254,
  activeUsers: 876,
  emailsSent: 8752,
  apiCalls: 124680,
};

// Données pour le graphique d'activité
const activityData = [
  { name: "Lun", emails: 145, calls: 230 },
  { name: "Mar", emails: 156, calls: 250 },
  { name: "Mer", emails: 202, calls: 310 },
  { name: "Jeu", emails: 189, calls: 280 },
  { name: "Ven", emails: 210, calls: 340 },
  { name: "Sam", emails: 102, calls: 110 },
  { name: "Dim", emails: 85, calls: 90 },
];

// Données de distribution des utilisateurs
const userDistributionData = [
  { name: "Gratuit", value: 650 },
  { name: "Premium", value: 450 },
  { name: "Entreprise", value: 154 },
];

// Données d'utilisation API par service
const apiUsageData = [
  { name: "Recherche", value: 38450 },
  { name: "Messagerie", value: 24680 },
  { name: "Stockage", value: 15320 },
  { name: "Authentification", value: 42300 },
  { name: "Autres", value: 3930 },
];

// Couleurs pour les graphiques
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Liste d'utilisateurs fictive
const mockUsers = [
  { id: 1, name: "Thomas Durand", email: "thomas@example.com", status: "Actif", plan: "Premium", lastActivity: "Aujourd'hui", apiCalls: 342, emailsSent: 15 },
  { id: 2, name: "Marie Leroy", email: "marie@example.com", status: "Actif", plan: "Gratuit", lastActivity: "Hier", apiCalls: 124, emailsSent: 3 },
  { id: 3, name: "Paul Dubois", email: "paul@example.com", status: "Inactif", plan: "Entreprise", lastActivity: "Il y a 3 jours", apiCalls: 0, emailsSent: 0 },
  { id: 4, name: "Sophie Martin", email: "sophie@example.com", status: "Actif", plan: "Premium", lastActivity: "Aujourd'hui", apiCalls: 215, emailsSent: 8 },
  { id: 5, name: "Lucas Bernard", email: "lucas@example.com", status: "Actif", plan: "Gratuit", lastActivity: "Il y a 2 jours", apiCalls: 78, emailsSent: 2 },
  { id: 6, name: "Julie Moreau", email: "julie@example.com", status: "Actif", plan: "Premium", lastActivity: "Aujourd'hui", apiCalls: 189, emailsSent: 11 },
  { id: 7, name: "Antoine Lefebvre", email: "antoine@example.com", status: "Inactif", plan: "Gratuit", lastActivity: "Il y a 5 jours", apiCalls: 12, emailsSent: 0 },
  { id: 8, name: "Camille Petit", email: "camille@example.com", status: "Actif", plan: "Entreprise", lastActivity: "Hier", apiCalls: 524, emailsSent: 32 },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
  
  // Admin info
  const admin = {
    name: "Admin Système",
    email: "admin@inboox.com",
    avatarUrl: "",
  };
  
  const handleLogout = () => {
    toast.success("Déconnexion réussie");
    navigate('/');
  };
  
  // Filtrer les utilisateurs en fonction des critères
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "active" && user.status === "Actif") ||
                         (statusFilter === "inactive" && user.status === "Inactif");
    
    const matchesPlan = planFilter === "all" ||
                       (planFilter === "free" && user.plan === "Gratuit") ||
                       (planFilter === "premium" && user.plan === "Premium") ||
                       (planFilter === "enterprise" && user.plan === "Entreprise");
    
    return matchesSearch && matchesStatus && matchesPlan;
  });

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
              <Mail size={20} />
              <span>Emails</span>
            </a>
            <a href="#" className="flex items-center space-x-2 p-3 mb-2 rounded-md hover:bg-slate-700 transition-colors">
              <Server size={20} />
              <span>API</span>
            </a>
            <a href="#" className="flex items-center space-x-2 p-3 mb-2 rounded-md hover:bg-slate-700 transition-colors">
              <FileText size={20} />
              <span>Rapports</span>
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
                  <p className="text-3xl font-bold">{statsData.totalUsers}</p>
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
                  <p className="text-3xl font-bold">{statsData.activeUsers}</p>
                  <User className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Emails envoyés</CardTitle>
                <CardDescription>Total</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold">{statsData.emailsSent}</p>
                  <Mail className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Appels API</CardTitle>
                <CardDescription>Total</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold">{statsData.apiCalls}</p>
                  <Server className="h-8 w-8 text-amber-500" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Activité hebdomadaire</CardTitle>
                <CardDescription>Emails et appels API</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="emails" fill="#8884d8" name="Emails" />
                    <Bar dataKey="calls" fill="#82ca9d" name="Appels API" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Distribution des utilisateurs</CardTitle>
                <CardDescription>Par type d'abonnement</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={userDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {userDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} utilisateurs`, 'Nombre']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Utilisation de l'API</CardTitle>
                <CardDescription>Par service</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={apiUsageData}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" name="Appels">
                      {apiUsageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Statistiques mensuelles</CardTitle>
                <CardDescription>Croissance du trafic API</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={[
                      {name: 'Jan', value: 24000},
                      {name: 'Fév', value: 26000},
                      {name: 'Mar', value: 32000},
                      {name: 'Avr', value: 34000},
                      {name: 'Mai', value: 38000},
                      {name: 'Juin', value: 42000},
                    ]}
                  >
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorValue)" name="Appels API" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          {/* Users Table */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Liste des utilisateurs</CardTitle>
              <CardDescription>Gérer les utilisateurs de la plateforme</CardDescription>
              
              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Rechercher un utilisateur..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="active">Actifs</SelectItem>
                      <SelectItem value="inactive">Inactifs</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={planFilter} onValueChange={setPlanFilter}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Abonnement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les plans</SelectItem>
                      <SelectItem value="free">Gratuit</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="enterprise">Entreprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Abonnement</TableHead>
                    <TableHead>Dernière activité</TableHead>
                    <TableHead>Appels API</TableHead>
                    <TableHead>Emails</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">
                        Aucun utilisateur trouvé.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-indigo-100 text-indigo-800 text-xs">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.status === 'Actif' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status}
                          </span>
                        </TableCell>
                        <TableCell>{user.plan}</TableCell>
                        <TableCell>{user.lastActivity}</TableCell>
                        <TableCell>{user.apiCalls}</TableCell>
                        <TableCell>{user.emailsSent}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                Actions
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="cursor-pointer flex items-center">
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Éditer</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer flex items-center">
                                <MessageSquare className="mr-2 h-4 w-4" />
                                <span>Contacter</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer flex items-center text-red-600">
                                <Trash className="mr-2 h-4 w-4" />
                                <span>Désactiver</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
