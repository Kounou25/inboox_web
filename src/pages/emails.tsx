import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Reply, Send, Search, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Pour la navigation

const MessagesPageEnhanced = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: 1,
      fullName: "Jean Dupont",
      subject: "Demande d'information",
      email: "jean.dupont@example.com",
      message: "Bonjour, je voudrais plus d'infos sur vos services.",
      sentDate: "2025-04-07",
    },
    {
      id: 2,
      fullName: "Marie Curie",
      subject: "Problème technique",
      email: "marie.curie@example.com",
      message: "J'ai rencontré un bug sur votre plateforme.",
      sentDate: "2025-04-06",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [messageToDelete, setMessageToDelete] = useState(null); // Pour la confirmation de suppression

  const filteredMessages = messages.filter(
    (msg) =>
      msg.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id) => {
    setMessages(messages.filter((msg) => msg.id !== id));
    setSelectedMessage(null);
    setMessageToDelete(null); // Ferme le popup de confirmation
    toast.success("Message supprimé avec succès");
  };

  const handleSendReply = () => {
    if (!replyMessage.trim()) {
      toast.error("Veuillez écrire un message avant d'envoyer.");
      return;
    }
    toast.success(`Réponse envoyée à ${selectedMessage.email}`);
    setReplyMessage("");
    setSelectedMessage(null);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50">
      <div className="container mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(-1)} // Retour à la page précédente
                  className="text-white hover:bg-indigo-700"
                >
                  <ArrowLeft size={20} />
                </Button>
                <CardTitle className="text-3xl font-bold">Boîte de Réception</CardTitle>
              </div>
            </div>
            <p className="text-sm opacity-80">Gérez vos messages avec style et simplicité</p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6 flex items-center gap-2">
              <Search size={20} className="text-gray-500" />
              <Input
                placeholder="Rechercher par nom, sujet ou email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
            </div>

            <div className="grid gap-4">
              {filteredMessages.length === 0 ? (
                <p className="text-center text-gray-500">Aucun message trouvé.</p>
              ) : (
                filteredMessages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card
                      className="hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedMessage(msg)}
                    >
                      <CardContent className="p-4 flex flex-col md:flex-row justify-between items-start gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-indigo-700">{msg.subject}</h3>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">{msg.fullName}</span> - {msg.email}
                          </p>
                          <p className="text-gray-700 mt-1 truncate">{msg.message}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <p className="text-xs text-gray-500">{msg.sentDate}</p>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedMessage(msg);
                              }}
                            >
                              <Reply size={16} className="text-blue-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                setMessageToDelete(msg); // Ouvre le popup de confirmation
                              }}
                            >
                              <Trash2 size={16} className="text-red-600" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Popup des détails du message */}
        {selectedMessage && (
          <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="text-2xl text-indigo-700">{selectedMessage.subject}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-700">De</Label>
                    <p className="mt-1 font-medium">{selectedMessage.fullName}</p>
                  </div>
                  <div>
                    <Label className="text-gray-700">Email</Label>
                    <p className="mt-1">{selectedMessage.email}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-gray-700">Message</Label>
                  <p className="mt-1 bg-gray-100 p-3 rounded-md">{selectedMessage.message}</p>
                </div>
                <div>
                  <Label className="text-gray-700">Envoyé le</Label>
                  <p className="mt-1">{selectedMessage.sentDate}</p>
                </div>
                <div>
                  <Label htmlFor="reply" className="text-gray-700">
                    Votre réponse
                  </Label>
                  <Textarea
                    id="reply"
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Écrivez votre réponse ici..."
                    className="mt-1"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setSelectedMessage(null)}>
                    Annuler
                  </Button>
                  <Button onClick={handleSendReply}>
                    <Send size={16} className="mr-2" />
                    Envoyer
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Popup de confirmation de suppression */}
        {messageToDelete && (
          <Dialog open={!!messageToDelete} onOpenChange={() => setMessageToDelete(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirmer la suppression</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Voulez-vous vraiment supprimer le message "{messageToDelete.subject}" de{" "}
                  {messageToDelete.fullName} ?
                </p>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setMessageToDelete(null)}>
                    Annuler
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(messageToDelete.id)}
                  >
                    <Trash2 size={16} className="mr-2" />
                    Supprimer
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default MessagesPageEnhanced;