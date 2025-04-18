import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Copy, Eye, EyeOff, ArrowRight, Info, LogOut, User, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();
  const [hideApiKey, setHideApiKey] = useState(true);
  const [emailData, setEmailData] = useState([]); // State for email data
  const userEmail = localStorage.getItem("userEmail");

  const [user, setUser] = useState({
    name: "John Doe", // Changed default name to an English equivalent
    email: userEmail || "email@example.com",
    avatarUrl: "",
    id: "",
  });

  const [apiKey, setApiKey] = useState("");

  // Fetch user data and API key
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
          throw new Error(userResult.error || "Error fetching profile");
        }

        const updatedUser = {
          name: userResult.full_name,
          email: userResult.email,
          avatarUrl: userResult.avatarUrl || "",
          id: userResult.id,
        };
        setUser(updatedUser);
        localStorage.setItem("uuid", userResult.id);

        const apiKeyResponse = await fetch(`/api/apiKeys/keyById/${userResult.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const apiKeyResult = await apiKeyResponse.json();

        if (!apiKeyResponse.ok) {
          throw new Error(apiKeyResult.error || "Error fetching API key");
        }

        setApiKey(apiKeyResult.key);
      } catch (error) {
        console.error("Detailed error:", error);
        toast.error(error.message || "Error fetching data");
      }
    };

    if (userEmail) {
      fetchUserData();
    }
  }, [userEmail]);

  // Fetch email data from the endpoint with user.id as dependency
  useEffect(() => {
    const fetchEmailData = async () => {
      if (!user.id) return; // Do nothing if user.id is not yet defined

      try {
        const response = await fetch(
          `http://localhost:3000/api/messages/emailCount/${user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error fetching email data");
        }

        const result = await response.json();
        // Transform data to match Recharts expected format
        const formattedData = result.data.map((item) => ({
          name: item.day_name.substring(0, 3), // Shorten day name (e.g., "Monday" -> "Mon")
          value: item.total_sent,
        }));
        setEmailData(formattedData);
      } catch (error) {
        console.error("Error:", error);
        toast.error("Error fetching email data");
      }
    };

    fetchEmailData();
  }, [user.id]); // Dependency on user.id to ensure it’s available

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    toast.success("API key copied to clipboard");
  };

  const handleLogout = () => {
    toast.success("Logout successful");
    navigate("/");
  };

  // Calculate total received messages for display
  const totalMessages = emailData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col space-y-10"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap✔-6 bg-white p-6 rounded-lg shadow-sm">
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
                    <span className="text-xs text-green-700">Active</span>
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
                  <span className="hidden md:inline">Logout</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Statistics with Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-blue-700">Received Messages</CardTitle>
                  <CardDescription className="text-gray-600">This week</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={emailData}>
                      <XAxis dataKey="name" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                  <p className="text-2xl font-semibold text-blue-600 mt-4">{totalMessages}</p>
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
                  <CardTitle className="text-lg text-blue-700">Received Messages</CardTitle>
                  <CardDescription className="text-gray-600">This week</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={emailData}>
                      <XAxis dataKey="name" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip />
                      <Bar dataKey="value" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                  <p className="text-2xl font-semibold text-blue-600 mt-4">{totalMessages}</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* User Profile */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-blue-700">User Profile</CardTitle>
              <CardDescription className="text-gray-600">Your account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700">Name</label>
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
                <span className="text-sm text-blue-600">Standard Account</span>
              </div>
            </CardContent>
          </Card>

          {/* API Key */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-blue-700">Your API Key</CardTitle>
              <CardDescription className="text-gray-600">
                Use this key to integrate Inboox
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
                  Copy
                </Button>
              </div>
              <Alert className="bg-blue-50 border-blue-200">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-800">Important</AlertTitle>
                <AlertDescription className="text-blue-700">
                  Never share your API key publicly.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* How to Integrate */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-blue-700">How to Integrate Inboox</CardTitle>
              <CardDescription className="text-gray-600">Simple steps to get started</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
              {[
                {
                  step: 1,
                  title: "Set up your HTML form",
                  desc: "Add the <code class='bg-gray-100 px-1 py-0.5 rounded'>data-inboox</code> attribute to your form and include an email field.",
                },
                {
                  step: 2,
                  title: "Integrate your API key",
                  desc: "Configure your form to send data to our API.",
                },
                {
                  step: 3,
                  title: "Test your form",
                  desc: "Submit a test to verify it works correctly.",
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
                  View full documentation
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