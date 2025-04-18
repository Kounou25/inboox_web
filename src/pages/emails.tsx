import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Reply, Send, Search, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { List, AutoSizer } from "react-virtualized";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const MessagesPageEnhanced = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch messages from the API
  useEffect(() => {
    const fetchMessages = async () => {
      const uuid = localStorage.getItem("uuid");
      if (!uuid) {
        toast.error("No user identifier found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/api/messages/${uuid}`);
        const data = await response.json();
        const formattedMessages = data.map((msg) => ({
          id: msg.id,
          fullName: msg.sender_name,
          subject: msg.subject,
          email: msg.to_email,
          message: msg.body,
          sentDate: new Date(msg.sent_at).toISOString().split("T")[0],
          isRead: msg.isRead || false, // Simuler un état lu/non lu
        }));
        setMessages(formattedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
        toast.error("Error loading messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const filteredMessages = messages.filter(
    (msg) =>
      msg.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/messages/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("Message ID is required");
        } else if (response.status === 404) {
          throw new Error(result.error || "Message not found");
        } else {
          throw new Error(result.error || "Failed to delete message");
        }
      }

      setMessages(messages.filter((msg) => msg.id !== id));
      setSelectedMessage(null);
      setMessageToDelete(null);
      toast.success(result.message || "Message deleted successfully");
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error(error.message || "Failed to delete message");
    }
  };

  const handleSendReply = () => {
    if (!replyMessage.trim()) {
      toast.error("Please write a message before sending.");
      return;
    }
    toast.success(`Reply sent to ${selectedMessage.email}`);
    setReplyMessage("");
    setSelectedMessage(null);
  };

  const rowRenderer = ({ index, key, style }) => {
    const msg = filteredMessages[index];
    return (
      <div key={key} style={style}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card
            className={`hover:shadow-lg transition-shadow duration-200 cursor-pointer border-l-4 ${
              msg.isRead ? "border-gray-200" : "border-blue-500"
            } bg-white`}
            onClick={() => setSelectedMessage(msg)}
          >
            <CardContent className="p-4 flex flex-col md:flex-row justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg text-gray-900 truncate">{msg.subject}</h3>
                  {!msg.isRead && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">{msg.fullName}</span> -{" "}
                  <span className="truncate-email">{msg.email}</span>
                </p>
                <p className="text-gray-600 mt-1 truncate text-sm">{msg.message}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <p className="text-xs text-gray-400">{msg.sentDate}</p>
                <div className="flex gap-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedMessage(msg);
                          }}
                          className="hover:bg-blue-100"
                        >
                          <Reply size={16} className="text-blue-600" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Répondre</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setMessageToDelete(msg);
                          }}
                          className="hover:bg-red-100"
                        >
                          <Trash2 size={16} className="text-red-600" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Supprimer</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-100">
      <style>
        {`
          .truncate-email {
            display: inline-block;
            max-width: 250px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            vertical-align: middle;
          }
          .search-container {
            position: relative;
            max-width: 400px;
            width: 100%;
          }
          .search-icon {
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            color: #6b7280;
          }
          .search-input {
            padding-left: 36px;
            border-radius: 8px;
            border: 1px solid #d1d5db;
            transition: border-color 0.2s;
          }
          .search-input:focus {
            border-color: #3b82f6;
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
          }
        `}
      </style>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-xl border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(-1)}
                  className="text-white hover:bg-indigo-800 transition-colors"
                >
                  <ArrowLeft size={20} />
                </Button>
                <CardTitle className="text-2xl font-bold tracking-tight">Boîte de réception</CardTitle>
              </div>
            </div>
            <p className="text-sm opacity-90 mt-1">Gérez vos messages avec élégance</p>
          </CardHeader>
          <CardContent className="p-6 bg-white">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
                ></motion.div>
              </div>
            ) : (
              <>
                <div className="mb-6 search-container">
                  <Search size={20} className="search-icon" />
                  <Input
                    placeholder="Rechercher par nom, sujet ou email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                </div>

                <div className="grid gap-4" style={{ height: "600px" }}>
                  {filteredMessages.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-500 text-lg">Aucun message trouvé.</p>
                      <p className="text-gray-400 text-sm mt-2">Essayez de modifier votre recherche.</p>
                    </div>
                  ) : (
                    <AutoSizer>
                      {({ height, width }) => (
                        <List
                          width={width}
                          height={height}
                          rowCount={filteredMessages.length}
                          rowHeight={120}
                          rowRenderer={rowRenderer}
                          overscanRowCount={5}
                        />
                      )}
                    </AutoSizer>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Message details popup */}
        {selectedMessage && (
          <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
            <DialogContent className="sm:max-w-[700px] rounded-lg bg-white shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-semibold text-gray-900">{selectedMessage.subject}</DialogTitle>
              </DialogHeader>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-gray-600 font-medium">Expéditeur</Label>
                    <p className="mt-1 font-semibold text-gray-900">{selectedMessage.fullName}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600 font-medium">Email</Label>
                    <p className="mt-1 text-gray-700">{selectedMessage.email}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-gray-600 font-medium">Message</Label>
                  <p className="mt-2 bg-gray-50 p-4 rounded-lg text-gray-800 leading-relaxed">{selectedMessage.message}</p>
                </div>
                <div>
                  <Label className="text-gray-600 font-medium">Date d'envoi</Label>
                  <p className="mt-1 text-gray-700">{selectedMessage.sentDate}</p>
                </div>
                <div>
                  <Label htmlFor="reply" className="text-gray-600 font-medium">
                    Votre réponse
                  </Label>
                  <Textarea
                    id="reply"
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Écrivez votre réponse ici..."
                    className="mt-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    rows={5}
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedMessage(null)}
                    className="border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={handleSendReply}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Send size={16} className="mr-2" />
                    Envoyer
                  </Button>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}

        {/* Delete confirmation popup */}
        {messageToDelete && (
          <Dialog open={!!messageToDelete} onOpenChange={() => setMessageToDelete(null)}>
            <DialogContent className="sm:max-w-md rounded-lg bg-white shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-gray-900">Confirmer la suppression</DialogTitle>
              </DialogHeader>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <p className="text-gray-600 leading-relaxed">
                  Voulez-vous vraiment supprimer le message "<span className="font-medium">{messageToDelete.subject}</span>" de{" "}
                  <span className="font-medium">{messageToDelete.fullName}</span> ?
                </p>
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setMessageToDelete(null)}
                    className="border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    Annuler
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(messageToDelete.id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 size={16} className="mr-2" />
                    Supprimer
                  </Button>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default MessagesPageEnhanced;