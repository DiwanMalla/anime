"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  X,
  Send,
  Loader2,
  Bot,
  User,
  ChevronRight,
  Filter,
  Mic,
  MicOff,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Message {
  role: "user" | "assistant";
  content: string;
  filters?: any;
}

export default function AniGenie() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I am your AniGenie. Tell me what kind of anime you're in the mood for, and I'll find it for you! ✨",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = "en-US";

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
          setIsListening(false);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
            setIsListening(false);
        };
      }
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/anigenie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: userMessage,
          history: messages.slice(-5).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) throw new Error("Failed to chat");

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.message,
          filters: data.filters,
        },
      ]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, my magic is a bit weak right now. Try again?",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = (filters: any) => {
    const params = new URLSearchParams();
    if (filters.genre) params.set("genre", filters.genre);
    if (filters.tag) params.set("tag", filters.tag);
    if (filters.year) params.set("year", filters.year.toString());
    if (filters.status) params.set("status", filters.status);
    if (filters.format) params.set("format", filters.format);
    if (filters.search) params.set("q", filters.search);

    router.push(`/search?${params.toString()}`);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-[320px] sm:w-[400px] h-[500px] bg-anime-dark/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-anime-purple/30 to-anime-cyan/30 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-anime-purple flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-none">AniGenie</h3>
                  <span className="text-[10px] text-anime-cyan font-mono animate-pulse">Powered by Nemotron</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            {/* Chat Content */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth hide-scrollbar"
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                      msg.role === "user"
                        ? "bg-anime-purple text-white rounded-tr-none"
                        : "bg-white/5 border border-white/10 text-gray-200 rounded-tl-none"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1 opacity-50 text-[10px] font-bold uppercase tracking-wider">
                      {msg.role === "user" ? (
                        <>YOU <User className="h-2.5 w-2.5" /></>
                      ) : (
                        <><Bot className="h-2.5 w-2.5" /> GENIE</>
                      )}
                    </div>
                    <p className="whitespace-pre-wrap leading-relaxed">
                      {msg.content}
                    </p>

                    {msg.filters && (
                      <button
                        onClick={() => applyFilters(msg.filters)}
                        className="mt-3 w-full flex items-center justify-center gap-2 bg-anime-cyan/20 hover:bg-anime-cyan/30 border border-anime-cyan/30 py-2 rounded-xl text-xs font-bold text-anime-cyan transition-all group"
                      >
                        <Filter className="h-3.5 w-3.5" />
                        Apply Search Filters
                        <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none">
                    <Loader2 className="h-4 w-4 text-anime-cyan animate-spin" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-black/20">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder={isListening ? "Listening..." : "Ask for recommendations..."}
                  className={`w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-anime-purple/50 pr-24 text-white transition-all ${
                    isListening ? "border-anime-cyan/50 ring-1 ring-anime-cyan/20" : ""
                  }`}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <button
                    onClick={toggleListening}
                    className={`p-2 rounded-xl transition-all ${
                        isListening 
                        ? "bg-anime-cyan text-black animate-pulse" 
                        : "bg-white/5 text-gray-400 hover:text-white"
                    }`}
                    title={isListening ? "Stop Listening" : "Voice Input"}
                  >
                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="p-2 bg-anime-purple rounded-xl text-white hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-anime-purple to-anime-cyan flex items-center justify-center shadow-[0_0_20px_rgba(196,78,255,0.4)] border border-white/20 group relative"
      >
        <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <Sparkles className="h-6 w-6 text-white" />
        )}
        
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-sky-500 border border-white/20"></span>
          </span>
        )}
      </motion.button>
    </div>
  );
}
