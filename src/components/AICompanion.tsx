import { useState, useRef, useEffect } from 'react';
import { X, MessageSquare, Send, Sparkles, Smile, Disc, RefreshCw } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface AICompanionProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AICompanion({ isOpen, onClose }: AICompanionProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: "Hey love, welcome to my digital space. I'm your Vibe Guide. Tell me how you're feeling right now, or what kind of energy you're carrying today, and I'd love to share some lyrics, recommend a song, or answer anything you'd like to know about my musical journey, upcoming autumn tour, and merchandise."
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const suggestions = [
    "Cozy song for a rainy Sunday",
    "Tell me about 'If I'm Being Honest'",
    "Where is she performing on tour?",
    "What are her musical influences?"
  ];

  // Auto Scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg = textToSend.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          chatHistory: messages
        })
      });

      const resData = await response.json();
      if (response.ok && resData.text) {
        setMessages(prev => [...prev, { role: 'model', text: resData.text }]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            role: 'model',
            text: "The signal faded for a second. I am still here, basking in the warm acoustics. Let's try sending that beautiful thought again."
          }
        ]);
      }
    } catch (err) {
      console.error("AI chat communication error:", err);
      setMessages(prev => [
        ...prev,
        {
          role: 'model',
          text: "I couldn't quite hear you over the guitar resonance. Let's reconnect and try that again, love."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([
      {
        role: 'model',
        text: "The slate is clean, love. Tell me what is on your mind, what vibe you're seeking, or any questions about my music."
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="ai-companion-drawer">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" onClick={onClose} />

      {/* Slide-out Panel */}
      <div className="absolute inset-y-0 right-0 max-w-lg w-full bg-earth-moss border-l border-earth-moss-light shadow-2xl flex flex-col h-full animate-fade-in">
        {/* Drawer Header */}
        <div className="p-5 border-b border-earth-moss-light/35 flex items-center justify-between bg-earth-moss-dark/50">
          <div className="flex items-center space-x-2.5">
            <Sparkles className="h-5 w-5 text-earth-gold animate-pulse" />
            <div>
              <h3 className="font-serif text-base font-bold text-earth-linen uppercase tracking-wider">MALIA'S AI VIBE GUIDE</h3>
              <span className="text-[9px] font-mono text-earth-gold uppercase tracking-widest block mt-0.5">Powered by Gemini AI</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={resetChat}
              className="p-1.5 text-earth-linen-dark hover:text-earth-gold rounded hover:bg-earth-moss-light transition-all"
              title="Clean Slate / Reset Chat"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button onClick={onClose} className="p-1.5 text-earth-linen-dark hover:text-earth-linen rounded hover:bg-earth-moss-light transition-all">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Conversation Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4" ref={scrollRef}>
          {messages.map((msg, idx) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={idx}
                className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-4 space-y-1.5 shadow-md ${
                    isUser
                      ? 'bg-earth-terracotta text-earth-linen'
                      : 'bg-earth-moss-dark border border-earth-moss-light/45 text-earth-linen-dark'
                  }`}
                >
                  <p className="text-[10px] font-mono tracking-widest uppercase opacity-75">
                    {isUser ? 'You' : 'Vibe Guide'}
                  </p>
                  <p className="font-serif italic text-xs md:text-sm leading-relaxed whitespace-pre-line leading-6">
                    {msg.text}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Typewriter Loading state */}
          {isLoading && (
            <div className="flex justify-start animate-pulse">
              <div className="max-w-[80%] rounded-lg p-4 bg-earth-moss-dark border border-earth-moss-light/35 text-earth-linen-dark space-y-2">
                <p className="text-[10px] font-mono tracking-widest uppercase opacity-75">Vibe Guide</p>
                <div className="flex items-center space-x-1 py-1">
                  <div className="w-2 h-2 bg-earth-gold rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-earth-gold rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-earth-gold rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggestion Prompts */}
        {messages.length === 1 && !isLoading && (
          <div className="px-5 pb-2 space-y-2">
            <span className="text-[10px] font-mono text-earth-linen-dark uppercase tracking-widest block">Suggested Vibes</span>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((sug) => (
                <button
                  key={sug}
                  onClick={() => handleSend(sug)}
                  className="px-3 py-2 bg-earth-moss-dark hover:bg-earth-moss border border-earth-moss-light/45 text-[11px] font-mono text-earth-gold hover:text-earth-linen rounded-md text-left transition-all max-w-full truncate"
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Form Box */}
        <div className="p-5 border-t border-earth-moss-light/30 bg-earth-moss-dark/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Tell me your mood or ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1 p-3 bg-earth-moss-dark border border-earth-moss-light focus:border-earth-gold rounded font-sans text-xs md:text-sm text-earth-linen focus:outline-none"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-3 bg-earth-terracotta hover:bg-earth-terracotta-light text-earth-linen disabled:bg-earth-moss disabled:text-earth-linen-dark disabled:border-earth-moss-light disabled:cursor-not-allowed rounded transition-all"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          <span className="block text-[9px] font-mono text-earth-linen-dark text-center mt-2 tracking-widest uppercase">
            Let her lyrics guide your emotional unfolding.
          </span>
        </div>
      </div>
    </div>
  );
}
