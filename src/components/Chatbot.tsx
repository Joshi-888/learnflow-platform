import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "./ui/button";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

const faqResponses: Record<string, string> = {
  "pricing": "Our courses range from ₹459 to ₹2,499 individually. Bundle packs offer up to 75% savings! Check our Bundles page for the best deals.",
  "refund": "We offer a 30-day money-back guarantee on all courses. If you're not satisfied, contact support for a full refund.",
  "certificate": "Yes! Upon completing all videos in a course, you'll receive a verifiable certificate of completion that you can share on LinkedIn.",
  "duration": "Course access is lifetime. Once enrolled, you can learn at your own pace with no time limits.",
  "support": "Our support team is available 24/7 via email at support@techacademy.com. Premium members get priority chat support.",
  "bundle": "Bundles combine multiple related courses at a discounted price. Our Full Stack Bundle includes React, Node.js, TypeScript & SQL courses — saving you over 75%!",
  "payment": "We accept credit/debit cards, UPI, net banking, and popular wallets. EMI options available on select banks.",
};

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("price") || lower.includes("cost") || lower.includes("fee")) return faqResponses.pricing;
  if (lower.includes("refund") || lower.includes("money back")) return faqResponses.refund;
  if (lower.includes("certificate") || lower.includes("credential")) return faqResponses.certificate;
  if (lower.includes("duration") || lower.includes("access") || lower.includes("expire") || lower.includes("lifetime")) return faqResponses.duration;
  if (lower.includes("help") || lower.includes("support") || lower.includes("contact")) return faqResponses.support;
  if (lower.includes("bundle") || lower.includes("combo") || lower.includes("pack")) return faqResponses.bundle;
  if (lower.includes("payment") || lower.includes("pay") || lower.includes("emi")) return faqResponses.payment;
  if (lower.includes("hi") || lower.includes("hello") || lower.includes("hey")) return "Hello! 👋 I'm TechAcademy's assistant. Ask me about courses, pricing, bundles, certificates, or refunds!";
  return "I can help with pricing, bundles, certificates, refunds, access duration, and payments. Could you rephrase your question?";
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, text: "Hi! 👋 I'm TechAcademy Assistant. How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now(), text: input.trim(), sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTimeout(() => {
      const reply: Message = { id: Date.now() + 1, text: getBotResponse(userMsg.text), sender: "bot" };
      setMessages((prev) => [...prev, reply]);
    }, 600);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-105"
        aria-label="Open chat"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[420px] w-[340px] flex-col overflow-hidden rounded-xl border bg-card shadow-2xl sm:w-[380px]">
          {/* Header */}
          <div className="flex items-center gap-2 bg-accent px-4 py-3">
            <Bot className="h-5 w-5 text-accent-foreground" />
            <div>
              <p className="text-sm font-semibold text-accent-foreground">TechAcademy Assistant</p>
              <p className="text-[10px] text-accent-foreground/70">Typically replies instantly</p>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${msg.sender === "bot" ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"}`}>
                  {msg.sender === "bot" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                </div>
                <div
                  className={`max-w-[75%] rounded-lg px-3 py-2 text-xs leading-relaxed ${
                    msg.sender === "bot"
                      ? "bg-muted text-foreground"
                      : "bg-accent text-accent-foreground"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 rounded-md border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <Button type="submit" size="icon" className="h-8 w-8 bg-accent text-accent-foreground hover:bg-accent/90">
                <Send className="h-3.5 w-3.5" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
