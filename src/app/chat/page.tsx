"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Trash2, Bot, User, Loader2, AlertCircle } from "lucide-react";
import ModelSelector from "@/components/ModelSelector";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [model, setModel] = useState("gpt-3.5-turbo");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const apiKey = localStorage.getItem("openai_api_key") || "";
    const userMessage: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, model, apiKey }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || "Failed to get response");
      } else {
        setMessages([...newMessages, { role: "assistant", content: data.choices[0].message.content }]);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  const clearConversation = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-900/50">
        <div>
          <h1 className="text-lg font-semibold text-white">AI Chat</h1>
          <p className="text-xs text-gray-500">Multi-turn conversations with AI</p>
        </div>
        <div className="flex items-center gap-3">
          <ModelSelector value={model} onChange={setModel} />
          <button
            onClick={clearConversation}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            title="Clear conversation"
          >
            <Trash2 size={16} />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center py-16">
            <div className="p-4 bg-blue-500/10 rounded-full mb-4">
              <Bot className="text-blue-400" size={32} />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Start a Conversation</h2>
            <p className="text-gray-400 max-w-sm">Ask me anything! I can help with questions, writing, analysis, and much more.</p>
          </div>
        )}
        
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.role === "assistant" && (
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center">
                <Bot className="text-blue-400" size={16} />
              </div>
            )}
            <div
              className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                message.role === "user"
                  ? "bg-blue-600 text-white rounded-tr-sm"
                  : "bg-gray-800 text-gray-100 rounded-tl-sm"
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
            {message.role === "user" && (
              <div className="flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                <User className="text-gray-300" size={16} />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center">
              <Bot className="text-blue-400" size={16} />
            </div>
            <div className="bg-gray-800 px-4 py-3 rounded-2xl rounded-tl-sm">
              <Loader2 className="text-gray-400 animate-spin" size={16} />
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            <AlertCircle size={16} />
            {error}
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-4 border-t border-gray-800 bg-gray-900/50">
        <form onSubmit={handleSubmit} className="flex gap-3 items-end">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message... (Enter to send, Shift+Enter for new line)"
            className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 resize-none focus:outline-none focus:border-blue-500 min-h-[48px] max-h-[200px]"
            rows={1}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="flex-shrink-0 p-3 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-xl transition-colors"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
