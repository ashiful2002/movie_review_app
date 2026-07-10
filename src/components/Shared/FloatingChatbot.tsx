"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Database, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  queryRagAction,
  ingestMoviesAction,
  getUserRoleAction,
  IChatMessage
} from "@/app/_actions/rag.action";
import { toast } from "sonner";

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch user role on mount
    getUserRoleAction().then((role) => {
      if (typeof role === 'string') {
        setUserRole(role);
      } else {
        setUserRole(null);
      }
    });
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom of chat
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSyncData = async () => {
    try {
      setIsSyncing(true);
      const res = await ingestMoviesAction();
      if (res.success) {
        toast.success(`Data synced! Indexed ${res.indexedCount} records.`);
      } else {
        toast.error(`Sync failed: ${res.message}`);
      }
    } catch (error) {
      toast.error("An unexpected error occurred during sync.");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: IChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const responseMessage = await queryRagAction(text);
      setMessages((prev) => [...prev, responseMessage]);
    } catch (error) {
      toast.error("Failed to fetch response.");
    } finally {
      setIsTyping(false);
    }
  };

  const sampleQueries = ["Action movies", "Top rated movies", "Sci-fi adventures"];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <Card className="w-80 sm:w-96 h-[500px] flex flex-col shadow-2xl border-primary/20">
          <CardHeader className="p-4 border-b flex flex-row items-center justify-between bg-muted/50 rounded-t-xl space-y-0">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-primary" />
              AI Assistant
            </CardTitle>
            <div className="flex items-center gap-2">
              {(userRole === "admin" || userRole === "superAdmin") && (
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleSyncData}
                  disabled={isSyncing}
                  title="Sync Movie Data"
                >
                  {isSyncing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Database className="w-4 h-4" />
                  )}
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-muted-foreground">
                <MessageCircle className="w-12 h-12 opacity-20" />
                <p className="text-sm">Hi! How can I help you discover movies today?</p>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {sampleQueries.map((query) => (
                    <Button
                      key={query}
                      variant="secondary"
                      size="sm"
                      className="text-xs"
                      onClick={() => handleSendMessage(query)}
                    >
                      {query}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"
                    }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-muted rounded-tl-sm"
                      }`}
                  >
                    {msg.role === "user" ? (
                      msg.content
                    ) : (
                      <div
                        className="prose prose-sm dark:prose-invert"
                        dangerouslySetInnerHTML={{ __html: msg.content }}
                      />
                    )}
                  </div>
                  {msg.meta?.sourceMatch && (
                    <span className="text-[10px] text-muted-foreground mt-1 px-1">
                      {msg.meta.sourceMatch}
                    </span>
                  )}
                </div>
              ))
            )}
            {isTyping && (
              <div className="flex items-start">
                <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 text-sm flex gap-1 items-center">
                  <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          <CardFooter className="p-3 border-t bg-muted/20 rounded-b-xl">
            <form
              className="flex w-full items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
            >
              <Input
                placeholder="Ask about movies..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 rounded-full bg-background"
                disabled={isTyping}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!inputValue.trim() || isTyping}
                className="rounded-full shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          size="icon"
          className="w-14 h-14 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}
    </div>
  );
}
