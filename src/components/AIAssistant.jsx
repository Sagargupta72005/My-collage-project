import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

function AIAssistant() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState("gemini");

  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Auto resize textarea
  const handleInput = (e) => {
    setInput(e.target.value);

    const el = textareaRef.current;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  // Format time
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Copy text
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleAsk = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      text: input,
      time: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setInput("");

    // reset height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      const res = await fetch(`http://localhost:5000/api/${provider}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userMessage.text }),
      });

      const data = await res.json();

      const aiMessage = {
        role: "ai",
        text: data.reply || "AI returned an empty response.",
        time: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Server error. Backend probably sleeping again.",
          time: new Date(),
        },
      ]);
    }

    setLoading(false);
  };

  // Enter to send
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  return (
    <div className="max-w-full h-full flex flex-col rounded-2xl overflow-hidden shadow-lg border bg-white">

      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center bg-white/80 backdrop-blur">
        <h2 className="font-semibold text-gray-800 flex items-center gap-2">
           AI Assistant
        </h2>

        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setProvider("gemini")}
            className={`px-3 py-1 text-sm rounded-md ${
              provider === "gemini"
                ? "bg-white shadow text-blue-600"
                : "text-gray-500"
            }`}
          >
            Gemini
          </button>
          <button
            onClick={() => setProvider("openai")}
            className={`px-3 py-1 text-sm rounded-md ${
              provider === "openai"
                ? "bg-white shadow text-green-600"
                : "text-gray-500"
            }`}
          >
            GPT
          </button>
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-gray-50">

        {messages.length === 0 && (
          <div className="text-center mt-20 text-gray-400">
            <p className="text-lg">💬 Ask anything</p>
            <p className="text-sm">Your AI is ready</p>
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {/* AI Avatar */}
            {msg.role === "ai" && (
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs">
                🤖
              </div>
            )}

            <div className="relative group max-w-[70%]">

              <div
                className={`px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap shadow ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-sm"
                    : "bg-white border text-gray-700 rounded-bl-sm"
                }`}
              >
                <ReactMarkdown
                  components={{
                    code: ({ children }) => (
                      <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">
                        {children}
                      </code>
                    ),
                    pre: ({ children }) => (
                      <pre className="bg-black text-white p-3 rounded-lg overflow-x-auto text-xs">
                        {children}
                      </pre>
                    ),
                  }}
                >
                  {msg.text}
                </ReactMarkdown>

                <div className="text-[10px] mt-1 opacity-60 text-right">
                  {formatTime(msg.time)}
                </div>
              </div>

              {/* Copy button */}
              {msg.role === "ai" && (
                <button
                  onClick={() => handleCopy(msg.text)}
                  className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition bg-white border text-xs px-2 py-1 rounded shadow"
                >
                  Copy
                </button>
              )}
            </div>

            {/* User Avatar */}
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">
                You
              </div>
            )}
          </div>
        ))}

        {/* Typing */}
        {loading && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs">
              🤖
            </div>
            <div className="bg-white border px-4 py-2 rounded-2xl text-sm text-gray-500 shadow flex gap-1">
              <span className="animate-bounce">•</span>
              <span className="animate-bounce delay-100">•</span>
              <span className="animate-bounce delay-200">•</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t bg-white">
        <div className="flex items-end gap-2 bg-gray-100 rounded-xl px-3 py-2">

          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            rows="1"
            className="flex-1 resize-none bg-transparent outline-none text-sm max-h-32 overflow-y-auto"
          />

          <button
            onClick={handleAsk}
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-white text-sm ${
              loading
                ? "bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700 active:scale-95"
            }`}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIAssistant;